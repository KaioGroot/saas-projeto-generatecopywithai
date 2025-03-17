import { NextResponse } from 'next/server';
import { getFacebookAuthUrl, getFacebookPages, getInstagramAccount } from '@/lib/instagram';

// Certifique-se de que este domínio está adicionado nas configurações do seu app no Facebook Developers
const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';
const FACEBOOK_APP_ID = '1019230419279328'; // ID correto do seu aplicativo do Facebook

export async function GET(request) {
    try {
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

        // Constrói a URL de autorização do Facebook
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
            `${BASE_URL}/api/auth/instagram/callback`
        )}&scope=${scopes}&response_type=code&state=${Math.random().toString(36).substring(7)}`;

        // Redireciona diretamente para o Facebook
        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error('Erro ao iniciar autenticação:', error);
        return NextResponse.json({ error: 'Erro ao iniciar autenticação' }, { status: 500 });
    }
}

// Adiciona suporte para preflight requests
export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(request) {
    try {
        const { code } = await request.json();

        // Troca o código por um token de acesso
        const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: FACEBOOK_APP_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
                code,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Erro ao obter token de acesso');
        }

        const tokenData = await tokenResponse.json();
        return NextResponse.json(tokenData);
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
