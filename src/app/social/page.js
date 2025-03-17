'use client';

import { useSearchParams } from 'next/navigation';
import InstagramLoginButton from '@/components/InstagramLoginButton';

export default function SocialPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth_failed':
                return 'Autenticação falhou ou foi cancelada pelo usuário.';
            case 'token_failed':
                return 'Erro ao obter token de acesso.';
            case 'no_pages':
                return 'Nenhuma página do Facebook encontrada. Você precisa ter uma página do Facebook.';
            case 'no_instagram':
                return 'Nenhuma conta do Instagram Business encontrada. Certifique-se de que sua página do Facebook está conectada a uma conta do Instagram Business.';
            default:
                return 'Ocorreu um erro desconhecido.';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Conecte suas Redes Sociais</h1>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{getErrorMessage(error)}</div>}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Conta do Instagram conectada com sucesso!
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Conectar Instagram Business</h2>
                <p className="text-gray-600 mb-6">Conecte sua conta do Instagram Business para gerenciar suas postagens e interações.</p>

                <div className="flex justify-center mb-6">
                    <InstagramLoginButton />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Requisitos:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Ter uma conta do Instagram Business</li>
                        <li>Ter uma página do Facebook</li>
                        <li>A página do Facebook deve estar conectada à conta do Instagram Business</li>
                        <li>Você deve ser administrador da página do Facebook</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
