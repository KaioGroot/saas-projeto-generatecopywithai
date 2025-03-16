'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChartBarIcon, DocumentTextIcon, ClockIcon, StarIcon, CogIcon, ClipboardIcon, EyeIcon } from '@heroicons/react/24/outline';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const { isDarkMode } = useTheme();
    const [hasSubscription, setHasSubscription] = useState(false);
    const [loading, setLoading] = useState(true);
    const [textosGerados, setTextosGerados] = useState([]);
    const [showTextos, setShowTextos] = useState(false);
    const [estatisticas, setEstatisticas] = useState({
        totalTextos: 0,
        mediaCaracteres: 0,
        textosSalvos: 0,
        ultimaGeracao: null,
    });
    const [planoInfo, setPlanoInfo] = useState({
        nome: 'Carregando...',
        limiteMensal: 0,
        anunciosGerados: 0,
        diasParaRenovacao: 0,
    });
    const [textoExpandido, setTextoExpandido] = useState(null);

    useEffect(() => {
        carregarDados();
    }, [currentUser]);

    const carregarDados = async () => {
        if (!currentUser) return;
        try {
            // Carrega os textos
            const textosRef = collection(db, 'textos');
            const q = query(textosRef, where('userId', '==', currentUser.uid), orderBy('dataCriacao', 'desc'));
            const querySnapshot = await getDocs(q);
            const textos = [];
            let totalCaracteres = 0;

            querySnapshot.forEach((doc) => {
                const texto = { id: doc.id, ...doc.data() };
                textos.push(texto);
                totalCaracteres += texto.texto?.length || 0;
            });

            setTextosGerados(textos);
            setEstatisticas({
                totalTextos: textos.length,
                mediaCaracteres: textos.length ? Math.round(totalCaracteres / textos.length) : 0,
                textosSalvos: textos.length,
                ultimaGeracao: textos[0]?.dataCriacao?.toDate() || null,
            });

            // Verifica a assinatura usando a API
            const token = await currentUser.getIdToken();
            const response = await fetch('/api/subscription/check', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao verificar assinatura');
            }

            const data = await response.json();

            // Atualiza o estado da assinatura
            setHasSubscription(data.hasActiveSubscription);

            // Calcula textos do mês atual
            const textosDesteMes = textos.filter((texto) => {
                const dataTexto = texto.dataCriacao?.toDate();
                const hoje = new Date();
                return dataTexto && dataTexto.getMonth() === hoje.getMonth() && dataTexto.getFullYear() === hoje.getFullYear();
            }).length;

            // Define informações do plano com base na resposta da API
            if (data.hasActiveSubscription) {
                const hoje = new Date();
                const dataExpiracao = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate());
                const diasParaRenovacao = Math.ceil((dataExpiracao - hoje) / (1000 * 60 * 60 * 24));

                setPlanoInfo({
                    nome: 'Profissional',
                    limiteMensal: 100,
                    anunciosGerados: textos.length,
                    diasParaRenovacao: diasParaRenovacao,
                    dataExpiracao: dataExpiracao.toLocaleDateString(),
                    status: data.subscriptionStatus || 'active',
                    textosMes: textosDesteMes,
                });
            } else {
                setPlanoInfo({
                    nome: 'Gratuito',
                    limiteMensal: 3,
                    anunciosGerados: textos.length,
                    diasParaRenovacao: 0,
                    dataExpiracao: null,
                    status: 'inactive',
                    textosMes: textosDesteMes,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            toast.error('Erro ao carregar informações do plano');

            // Define valores padrão em caso de erro
            setHasSubscription(false);
            setPlanoInfo({
                nome: 'Gratuito',
                limiteMensal: 3,
                anunciosGerados: 0,
                diasParaRenovacao: 0,
                status: 'error',
                textosMes: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    const copiarTexto = (texto) => {
        navigator.clipboard
            .writeText(texto)
            .then(() => {
                toast.success('Texto copiado com sucesso!');
            })
            .catch(() => {
                toast.error('Erro ao copiar texto');
            });
    };

    if (loading) {
        return (
            <div
                className={`min-h-screen ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                } flex items-center justify-center transition-colors duration-300`}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                    <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Dashboard</h1>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bem-vindo, {currentUser?.displayName || currentUser?.email}</p>
                </div>

                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total de Textos</p>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                    {estatisticas.totalTextos}
                                </h3>
                            </div>
                            <DocumentTextIcon className="w-8 h-8 text-purple-500" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Média de Caracteres</p>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                    {estatisticas.mediaCaracteres}
                                </h3>
                            </div>
                            <ChartBarIcon className="w-8 h-8 text-purple-500" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Textos Salvos</p>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                    {estatisticas.textosSalvos}
                                </h3>
                            </div>
                            <StarIcon className="w-8 h-8 text-purple-500" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Última Geração</p>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                    {estatisticas.ultimaGeracao ? new Date(estatisticas.ultimaGeracao).toLocaleDateString() : 'N/A'}
                                </h3>
                            </div>
                            <ClockIcon className="w-8 h-8 text-purple-500" />
                        </div>
                    </motion.div>
                </div>

                {/* Seção de Plano */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-8 transition-colors duration-300`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Seu Plano</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Status: {planoInfo.status === 'active' ? 'Ativo' : planoInfo.status === 'inactive' ? 'Inativo' : 'Verificando...'}
                            </p>
                        </div>
                        {!hasSubscription && (
                            <Link
                                href="/dashboard/assinatura"
                                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-300 shadow-md"
                            >
                                Fazer Upgrade
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plano Atual</p>
                            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{planoInfo.nome}</p>
                        </div>
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Textos este mês</p>
                            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {planoInfo.textosMes} de {planoInfo.limiteMensal}
                            </p>
                        </div>
                        <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {hasSubscription ? 'Renovação em' : 'Limite Mensal'}
                            </p>
                            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {hasSubscription ? `${planoInfo.diasParaRenovacao} dias` : `${planoInfo.limiteMensal} textos`}
                            </p>
                        </div>
                        {hasSubscription && (
                            <div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Data de Expiração</p>
                                <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{planoInfo.dataExpiracao}</p>
                            </div>
                        )}
                    </div>
                    {/* Barra de Progresso */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                Uso mensal: {Math.round((planoInfo.textosMes / planoInfo.limiteMensal) * 100)}%
                            </span>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {planoInfo.textosMes}/{planoInfo.limiteMensal}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    planoInfo.textosMes / planoInfo.limiteMensal > 0.9
                                        ? 'bg-red-500'
                                        : planoInfo.textosMes / planoInfo.limiteMensal > 0.7
                                        ? 'bg-yellow-500'
                                        : 'bg-purple-500'
                                }`}
                                style={{
                                    width: `${Math.min((planoInfo.textosMes / planoInfo.limiteMensal) * 100, 100)}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Ações Rápidas */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                        href="/persuasivo"
                        className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 shadow-md text-center"
                    >
                        Gerar Novo Texto
                    </Link>
                    <button
                        onClick={() => setShowTextos(!showTextos)}
                        className={`flex-1 px-4 py-3 ${
                            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                        } rounded-lg transition-colors duration-300 shadow-md hover:bg-opacity-90`}
                    >
                        {showTextos ? 'Ocultar Textos' : 'Ver Textos Gerados'}
                    </button>
                </div>

                {/* Lista de Textos */}
                {showTextos && (
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg transition-colors duration-300`}>
                        <div className="p-6">
                            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Textos Gerados</h2>
                            <div className="space-y-4">
                                {textosGerados.map((texto, index) => (
                                    <motion.div
                                        key={texto.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{texto.titulo}</h3>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => copiarTexto(texto.texto)}
                                                    className="p-2 hover:bg-purple-100 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                                                    title="Copiar texto"
                                                >
                                                    <ClipboardIcon className="w-5 h-5 text-purple-500" />
                                                </button>
                                                <button
                                                    onClick={() => setTextoExpandido(textoExpandido === texto.id ? null : texto.id)}
                                                    className="p-2 hover:bg-purple-100 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                                                    title={textoExpandido === texto.id ? 'Recolher texto' : 'Expandir texto'}
                                                >
                                                    <EyeIcon className="w-5 h-5 text-purple-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {textoExpandido === texto.id ? texto.texto : `${texto.texto?.substring(0, 150)}...`}
                                        </p>
                                        <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
                                            <span>{texto.dataCriacao?.toDate().toLocaleDateString()}</span>
                                            {textoExpandido === texto.id && (
                                                <button
                                                    onClick={() => copiarTexto(texto.texto)}
                                                    className="text-purple-500 hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1"
                                                >
                                                    <ClipboardIcon className="w-4 h-4" />
                                                    <span>Copiar texto completo</span>
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
