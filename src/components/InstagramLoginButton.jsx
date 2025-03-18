'use client';

import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramLoginButton() {
    const handleInstagramLogin = () => {
        // Usando o ID do aplicativo Instagram
        const INSTAGRAM_APP_ID = '2019139641939405';
        const REDIRECT_URI = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app/api/auth/instagram/callback';

        // Escopos necessários para Instagram Business
        const scopes = ['instagram_business_basic', 'instagram_business_manage_messages'].join(',');

        // Constrói a URL de autorização do Instagram
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${scopes}&response_type=code`;

        console.log('URL de autorização:', authUrl); // Log para debug

        // Redireciona para a página de autorização do Instagram
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
