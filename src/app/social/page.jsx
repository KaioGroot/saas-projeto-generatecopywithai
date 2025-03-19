'use client';

import { useEffect } from 'react';
import InstagramLoginButton from '@/components/InstagramLoginButton';
import InstagramUserData from '@/components/InstagramUserData';

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Integração com Instagram</h1>

            <div className="space-y-6">
                <InstagramLoginButton />
                <InstagramUserData />
            </div>
        </div>
    );
}
