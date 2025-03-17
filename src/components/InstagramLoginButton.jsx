'use client';

import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramLoginButton() {
    const handleInstagramLogin = () => {
        // Usando o ID correto do aplicativo Instagram
        const INSTAGRAM_APP_ID = '2019139641939405';
        const REDIRECT_URI = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app/api/auth/instagram/callback';

        // Lista de permissões necessárias
        const scopes = [
            'instagram_basic',
            'instagram_content_publish',
            'instagram_manage_comments',
            'instagram_manage_insights',
            'pages_show_list',
            'pages_read_engagement',
            'pages_manage_posts',
            'public_profile',
        ].join(',');

        // Constrói a URL de autorização usando o ID do Instagram
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${scopes}&response_type=code`;

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
