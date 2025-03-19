'use client';

import { useEffect } from 'react';
import InstagramLoginButton from '@/components/InstagramLoginButton';
import InstagramUserData from '@/components/InstagramUserData';
import { FaInstagram, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function SocialPage() {
    useEffect(() => {
        // Obtém os parâmetros da URL
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const error = params.get('error');
        const token = params.get('token');

        // Se tiver sucesso e token, salva o token
        if (success === 'true' && token) {
            localStorage.setItem('instagram_access_token', token);
            // Remove os parâmetros da URL
            window.history.replaceState({}, '', '/social');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Cabeçalho */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
                            <FaInstagram className="text-white text-2xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Integração com Instagram</h1>
                        <p className="text-lg text-gray-600">Conecte sua conta do Instagram para começar a gerenciar suas redes sociais</p>
                    </div>

                    {/* Área Principal */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="space-y-8">
                            {/* Seção de Login */}
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conecte sua Conta</h2>
                                <p className="text-gray-600 mb-6">Clique no botão abaixo para conectar sua conta do Instagram</p>
                                <InstagramLoginButton />
                            </div>

                            {/* Seção de Dados do Usuário */}
                            <div className="border-t border-gray-200 pt-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dados da Conta</h2>
                                <InstagramUserData />
                            </div>
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>Suas informações estão seguras e são utilizadas apenas para melhorar sua experiência</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
