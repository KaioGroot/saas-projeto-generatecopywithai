'use client';
import { motion } from 'framer-motion';

export const metadata = {
    title: 'Sobre a Loja | Seu SaaS',
    description: 'Conheça mais sobre nossa plataforma de geração de textos com IA.',
    openGraph: {
        title: 'Sobre a Loja | Seu SaaS',
        description: 'Conheça mais sobre nossa plataforma de geração de textos com IA.',
        type: 'website',
    },
};

export default function SobreLojaLayout({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#16161d]"
        >
            <main className="container mx-auto px-4 py-8">{children}</main>

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
        </motion.div>
    );
}
