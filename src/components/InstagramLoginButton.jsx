'use client';

import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramLoginButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleInstagramLogin = async () => {
        try {
            setIsLoading(true);
            // Faz a requisição para a rota de autenticação
            const response = await fetch('/api/auth/instagram');

            if (response.ok) {
                // Se a resposta incluir uma URL de redirecionamento nos headers
                const redirectUrl = response.headers.get('location');
                if (redirectUrl) {
                    // Redireciona para a URL do Facebook
                    window.location.href = redirectUrl;
                }
            } else {
                console.error('Erro ao iniciar autenticação do Instagram');
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleInstagramLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
            <FaInstagram className="text-xl" />
            {isLoading ? 'Conectando...' : 'Conectar com Instagram'}
        </button>
    );
}
