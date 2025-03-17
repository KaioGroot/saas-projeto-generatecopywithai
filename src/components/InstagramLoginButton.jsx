'use client';

import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramLoginButton() {
    const handleInstagramLogin = () => {
        // Usando o ID do aplicativo Facebook
        const FACEBOOK_APP_ID = '1019230419279328';
        const REDIRECT_URI = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app/api/auth/instagram/callback';

        // Escopos necessários para Instagram Graph API via Facebook
        const scopes = ['instagram_basic', 'pages_show_list', 'instagram_content_publish'].join(',');

        // Constrói a URL de autorização do Facebook
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${scopes}&response_type=code`;

        // Redireciona para a página de autorização do Facebook
        window.location.href = authUrl;
    };

    return (
        <button
            onClick={handleInstagramLogin}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
        >
            <FaInstagram className="text-xl" />
            Conectar com Instagram
        </button>
    );
}
