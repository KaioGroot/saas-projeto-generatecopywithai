'use client';

import React, { useState, useEffect } from 'react';
import Gerarprompt from '@/action/gerarprompt';
import { Composition } from 'remotion';
import { Player } from '@remotion/player';
import { AbsoluteFill, Sequence } from 'remotion';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import TextosSalvos from '@/components/TextosSalvos';
import CategoriaPersuasivo from '@/components/CategoriaPersuasivo';

const LIMITE_MENSAGENS = 20;

export default function Persuasivo() {
    const { currentUser } = useAuth();
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [textoGerado, setTextoGerado] = useState('');
    const [error, setError] = useState('');
    const [showTextosSalvos, setShowTextosSalvos] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [mensagensRestantes, setMensagensRestantes] = useState(LIMITE_MENSAGENS);
    const [categoriaAtual, setCategoriaAtual] = useState(null);
    const [templateAtual, setTemplateAtual] = useState(null);

    useEffect(() => {
        let timeoutId;

        const checkAuth = async () => {
            console.log('Verificando autenticação...');

            if (!currentUser) {
                console.log('Usuário não autenticado, aguardando...');
                // Aguarda um pouco para dar tempo do Firebase inicializar
                timeoutId = setTimeout(() => {
                    if (!currentUser) {
                        console.log('Usuário ainda não autenticado, redirecionando...');
                        router.push('/login');
                    }
                }, 1500);
            } else {
                console.log('Usuário autenticado:', currentUser.email);
                setIsAuthChecking(false);
                await carregarContadorMensagens();
            }
        };

        checkAuth();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [currentUser, router]);

    const carregarContadorMensagens = async () => {
        try {
            const textosRef = collection(db, 'textos');
            const q = query(textosRef, where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const totalMensagens = querySnapshot.size;
            setMensagensRestantes(LIMITE_MENSAGENS - totalMensagens);
        } catch (error) {
            console.error('Erro ao carregar contador de mensagens:', error);
        }
    };

    // Mostra um loading enquanto verifica a autenticação
    if (isAuthChecking) {
        return (
            <div
                className={`min-h-screen ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                } pt-20 flex items-center justify-center transition-colors duration-300`}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                    <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // Se não houver usuário após a verificação, não renderiza o conteúdo
    if (!currentUser) {
        return null;
    }

    const salvarTexto = async (texto) => {
        try {
            await addDoc(collection(db, 'textos'), {
                userId: currentUser.uid,
                titulo: titulo,
                texto: texto,
                dataCriacao: serverTimestamp(),
            });
            alert('Texto salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar texto:', error);
            alert('Erro ao salvar texto. Tente novamente.');
        }
    };

    const gerar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTextoGerado('');

        try {
            // Verificar assinatura do usuário
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

            if (!data.hasActiveSubscription) {
                setError('Você precisa ter uma assinatura ativa para gerar textos. Por favor, faça upgrade do seu plano.');
                setLoading(false);
                return;
            }

            // Verificar limite de mensagens
            if (mensagensRestantes <= 0) {
                setError('Você atingiu o limite de mensagens. Faça upgrade do seu plano para gerar mais textos.');
                setLoading(false);
                return;
            }

            const promptResponse = await Gerarprompt(titulo, descricao);
            setTextoGerado(promptResponse);
            setMensagensRestantes((prev) => prev - 1);
        } catch (error) {
            setError('Erro ao gerar o texto. Tente novamente.');
            console.error('Erro ao gerar texto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTemplate = (template, categoria) => {
        setTemplateAtual(template);
        setCategoriaAtual(categoria);
        setTitulo(template);
        setDescricao(`Gere um texto persuasivo para ${template} seguindo as melhores práticas de ${categoria}`);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-20 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Textos Persuasivos</h1>
                        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Crie textos persuasivos profissionais para qualquer necessidade
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-2 rounded-lg shadow-md`}>
                            <span className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Mensagens restantes: </span>
                            <span className={mensagensRestantes <= 5 ? 'text-red-400' : 'text-green-400'}>{mensagensRestantes}</span>
                        </div>
                        <button
                            onClick={() => setShowTextosSalvos(!showTextosSalvos)}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-300 shadow-md"
                        >
                            {showTextosSalvos ? 'Voltar' : 'Ver Textos Salvos'}
                        </button>
                    </div>
                </div>

                {showTextosSalvos ? (
                    <TextosSalvos />
                ) : (
                    <>
                        <CategoriaPersuasivo onSelectTemplate={handleSelectTemplate} onSelectCategoria={setCategoriaAtual} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                        {templateAtual || 'Novo Texto'}
                                    </h2>
                                    {templateAtual && (
                                        <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                            {categoriaAtual}
                                        </span>
                                    )}
                                </div>

                                <form onSubmit={gerar} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="titulo"
                                            className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                        >
                                            Título ou Assunto
                                        </label>
                                        <input
                                            type="text"
                                            id="titulo"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            required
                                            className={`mt-1 block w-full ${
                                                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300`}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="descricao"
                                            className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                        >
                                            Instruções ou Detalhes
                                        </label>
                                        <textarea
                                            id="descricao"
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            required
                                            rows={4}
                                            className={`mt-1 block w-full ${
                                                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300`}
                                        />
                                        <p className="mt-2 text-sm text-gray-500">{descricao.length} caracteres | Recomendado: 100-300 caracteres</p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                    >
                                        {loading ? 'Gerando...' : 'Gerar Texto'}
                                    </button>
                                </form>
                            </div>

                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-colors duration-300`}>
                                <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Texto Gerado</h2>

                                {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-md text-sm">{error}</div>}

                                {textoGerado ? (
                                    <div className="space-y-4">
                                        <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                                            <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{textoGerado}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigator.clipboard.writeText(textoGerado)}
                                                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-300 shadow-md"
                                            >
                                                Copiar Texto
                                            </button>
                                            <button
                                                onClick={() => salvarTexto(textoGerado)}
                                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300 shadow-md"
                                            >
                                                Salvar Texto
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        O texto gerado aparecerá aqui. Preencha o formulário à esquerda e clique em Gerar Texto.
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
