'use client';

import { useEffect, useState } from 'react';
import InstagramLoginButton from '@/components/InstagramLoginButton';
import InstagramUserData from '@/components/InstagramUserData';

export default function SocialPage() {
    const [searchParams, setSearchParams] = useState(null);

    useEffect(() => {
        // Obtém os parâmetros da URL
        const params = new URLSearchParams(window.location.search);
        setSearchParams(params);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Integração com Instagram</h1>
                    <p className="mt-2 text-gray-600">Conecte sua conta do Instagram para começar</p>
                </div>

                {searchParams?.get('success') === 'true' ? (
                    <div className="mb-8">
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                            Conta do Instagram conectada com sucesso!
                        </div>
                        <div className="mt-6">
                            <InstagramUserData />
                        </div>
                    </div>
                ) : searchParams?.get('error') ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                        Erro ao conectar com Instagram: {searchParams.get('error')}
                    </div>
                ) : null}

                <div className="bg-white shadow rounded-lg p-6">
                    <InstagramLoginButton />
                </div>
            </div>
        </div>
    );
} 