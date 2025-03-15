'use client';
import React from 'react';

export default function Sobre() {
    return (
        <div className="min-h-screen bg-[#16161d] text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-8 text-purple-500">Sobre Nós</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <p className="text-lg">
                            Bem-vindo ao Persuasivo, sua plataforma de soluções inovadoras. Nossa missão é transformar ideias em realidade digital,
                            oferecendo ferramentas e serviços que impulsionam o sucesso do seu negócio.
                        </p>

                        <p className="text-lg">
                            Com uma equipe apaixonada por tecnologia e inovação, desenvolvemos soluções personalizadas que atendem às necessidades
                            específicas de cada cliente.
                        </p>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Nossos Valores</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="text-purple-400 mr-2">•</span>
                                    Inovação constante
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-400 mr-2">•</span>
                                    Qualidade em primeiro lugar
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-400 mr-2">•</span>
                                    Foco no cliente
                                </li>
                                <li className="flex items-center">
                                    <span className="text-purple-400 mr-2">•</span>
                                    Compromisso com resultados
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#1e1e24] p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Nossa História</h2>
                        <p className="text-lg mb-4">
                            Fundada em 2024, a Persuasivo nasceu da paixão por criar soluções tecnológicas que fazem a diferença. Ao longo dos anos,
                            construímos uma reputação sólida baseada em resultados e satisfação do cliente.
                        </p>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Nossa Equipe</h3>
                            <p className="text-lg">
                                Contamos com profissionais altamente qualificados e apaixonados por tecnologia, prontos para transformar suas ideias
                                em realidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
