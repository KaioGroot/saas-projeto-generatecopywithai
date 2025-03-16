'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function TextoCompleto({ params }) {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [texto, setTexto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarTexto() {
            if (!currentUser) return;

            try {
                const textoRef = doc(db, 'textos', params.id);
                const textoDoc = await getDoc(textoRef);

                if (!textoDoc.exists()) {
                    throw new Error('Texto não encontrado');
                }

                const textoData = textoDoc.data();

                // Verificar se o texto pertence ao usuário atual
                if (textoData.userId !== currentUser.uid) {
                    throw new Error('Acesso não autorizado');
                }

                setTexto({
                    id: textoDoc.id,
                    ...textoData,
                });
            } catch (error) {
                console.error('Erro ao carregar texto:', error);
                alert('Erro ao carregar o texto. Você será redirecionado para o dashboard.');
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        }

        carregarTexto();
    }, [currentUser, params.id, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#16161d] text-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-4 text-lg">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!texto) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#16161d] text-white pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1e1e24] rounded-xl p-8 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-purple-400 mb-2">{texto.titulo}</h1>
                            <p className="text-gray-400">Criado em {texto.dataCriacao?.toDate().toLocaleDateString('pt-BR')}</p>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                        >
                            Voltar
                        </button>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="bg-[#16161d] p-6 rounded-lg">
                            <p className="whitespace-pre-wrap text-gray-300">{texto.texto}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            onClick={() => navigator.clipboard.writeText(texto.texto)}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                        >
                            Copiar Texto
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
