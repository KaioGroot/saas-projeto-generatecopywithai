'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Importação dinâmica do MuxPlayer para evitar problemas de SSR
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

export default function SobreLoja() {
    return (
        <main className="container mx-auto px-4 py-8 bg-[#16161d]">
            {/* Conteúdo atual da página */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Sobre Nossa Plataforma</h1>
                <p className="text-gray-300 mb-6">
                    Somos uma plataforma inovadora que utiliza inteligência artificial para ajudar você a criar conteúdo de qualidade.
                </p>
            </div>

            {/* Seção de Recursos */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Por que escolher nossa plataforma?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#1e1e24] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-purple-500 mb-4">Tecnologia Avançada</h3>
                        <p className="text-gray-300">Utilizamos as mais recentes tecnologias de IA para gerar textos de alta qualidade.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#1e1e24] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-purple-500 mb-4">Interface Intuitiva</h3>
                        <p className="text-gray-300">Design moderno e fácil de usar, permitindo que você gere textos em poucos cliques.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-[#1e1e24] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-purple-500 mb-4">Suporte Premium</h3>
                        <p className="text-gray-300">Equipe dedicada para ajudar você a tirar o máximo proveito da plataforma.</p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
