import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function TextosSalvos() {
    const [textos, setTextos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            carregarTextos();
        }
    }, [currentUser]);

    const carregarTextos = async () => {
        try {
            const q = query(collection(db, 'textos'), where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const textosData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTextos(textosData);
        } catch (error) {
            console.error('Erro ao carregar textos:', error);
        } finally {
            setLoading(false);
        }
    };

    const copiarTexto = async (texto) => {
        try {
            await navigator.clipboard.writeText(texto);
            alert('Texto copiado para a área de transferência!');
        } catch (error) {
            console.error('Erro ao copiar texto:', error);
            alert('Erro ao copiar texto. Tente novamente.');
        }
    };

    const deletarTexto = async (id) => {
        try {
            await deleteDoc(doc(db, 'textos', id));
            setTextos(textos.filter((texto) => texto.id !== id));
        } catch (error) {
            console.error('Erro ao deletar texto:', error);
            alert('Erro ao deletar texto. Tente novamente.');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Carregando...</div>;
    }

    if (textos.length === 0) {
        return <div className="text-center py-4 text-gray-400">Nenhum texto salvo ainda.</div>;
    }

    return (
        <div className="space-y-4">
            {textos.map((texto) => (
                <motion.div key={texto.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1e1e24] p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-purple-400">{texto.titulo}</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => copiarTexto(texto.texto)}
                                className="text-sm px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
                            >
                                Copiar
                            </button>
                            <button
                                onClick={() => deletarTexto(texto.id)}
                                className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{texto.texto}</p>
                    <p className="text-sm text-gray-400 mt-2">Gerado em: {new Date(texto.dataCriacao.toDate()).toLocaleString()}</p>
                </motion.div>
            ))}
        </div>
    );
}
