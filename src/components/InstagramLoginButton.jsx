'use client';

import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstagramLoginButton() {
    const handleInstagramLogin = () => {
        // Redireciona diretamente para a página de login do Facebook
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

        const FACEBOOK_APP_ID = '1019230419279328';
        const REDIRECT_URI = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app/api/auth/instagram/callback';

        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${scopes}&response_type=code`;

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
