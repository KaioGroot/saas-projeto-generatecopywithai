'use client';

import React, { useState, useEffect } from 'react';
import Gerarprompt from '@/action/gerarprompt';
import { Composition } from 'remotion';
import { Player } from '@remotion/player';
import { AbsoluteFill, Sequence } from 'remotion';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import TextosSalvos from '@/components/TextosSalvos';

export default function Persuasivo() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [textoGerado, setTextoGerado] = useState('');
    const [error, setError] = useState('');
    const [showTextosSalvos, setShowTextosSalvos] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser, router]);

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
            const response = await Gerarprompt(titulo, descricao);
            setTextoGerado(response);
        } catch (error) {
            setError('Erro ao gerar o texto. Tente novamente.');
            console.error('Erro ao gerar texto:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#16161d] text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-purple-500">Persuasivo</h1>
                    <button
                        onClick={() => setShowTextosSalvos(!showTextosSalvos)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
                    >
                        {showTextosSalvos ? 'Voltar' : 'Ver Textos Salvos'}
                    </button>
                </div>

                {showTextosSalvos ? (
                    <TextosSalvos />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#1e1e24] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                                Bem-vindo, {currentUser.displayName || currentUser.email}!
                            </h2>

                            <p className="text-lg mb-6">Aqui você pode gerar textos persuasivos para suas necessidades.</p>

                            <form onSubmit={gerar} className="space-y-4">
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-300">
                                        Nome do produto ou serviço
                                    </label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required
                                        className="mt-1 block w-full bg-[#16161d] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-300">
                                        Descrição do que você precisa
                                    </label>
                                    <textarea
                                        id="descricao"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                        rows={4}
                                        className="mt-1 block w-full bg-[#16161d] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Gerando...' : 'Gerar Texto'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-[#1e1e24] p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Texto Gerado</h2>

                            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-md text-sm">{error}</div>}

                            {textoGerado ? (
                                <div className="space-y-4">
                                    <div className="prose prose-invert max-w-none">
                                        <p className="whitespace-pre-wrap">{textoGerado}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(textoGerado)}
                                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
                                        >
                                            Copiar Texto
                                        </button>
                                        <button
                                            onClick={() => salvarTexto(textoGerado)}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                                        >
                                            Salvar Texto
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400">
                                    O texto gerado aparecerá aqui. Preencha o formulário à esquerda e clique em "Gerar Texto".
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
