import { NextResponse } from 'next/server';
import { getFacebookAuthUrl, getFacebookPages, getInstagramAccount } from '@/lib/instagram';

const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';
const INSTAGRAM_CLIENT_ID = '1402201067133597'; // Client ID fixo

export async function GET() {
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

        // Constrói a URL de autorização do Facebook (não do Instagram diretamente)
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            `${BASE_URL}/api/auth/instagram/callback`
        )}&scope=${scopes}&response_type=code`;

        // Redireciona o usuário para a página de autorização do Facebook
        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error('Erro ao iniciar autenticação:', error);
        return NextResponse.redirect(new URL('/error?message=Erro ao iniciar autenticação', request.url));
    }
}

export async function POST(request) {
    try {
        const { code } = await request.json();

        // 1. Trocar o código por um token de acesso do Facebook
        const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: new URLSearchParams({
                client_id: INSTAGRAM_CLIENT_ID, // Usando a constante aqui também
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            throw new Error('Falha ao obter token de acesso');
        }

        // 2. Obter páginas do Facebook do usuário
        const pagesData = await getFacebookPages(tokenData.access_token);

        if (!pagesData.data || pagesData.data.length === 0) {
            throw new Error('Nenhuma página do Facebook encontrada');
        }

        // 3. Para cada página, tentar encontrar uma conta do Instagram Business associada
        const instagramAccounts = await Promise.all(
            pagesData.data.map(async (page) => {
                const instagramData = await getInstagramAccount(tokenData.access_token, page.id);
                if (instagramData.instagram_business_account) {
                    return {
                        pageId: page.id,
                        pageName: page.name,
                        instagramAccountId: instagramData.instagram_business_account.id,
                    };
                }
                return null;
            })
        );

        // Filtrar contas nulas e retornar os dados
        const validInstagramAccounts = instagramAccounts.filter((account) => account !== null);

        if (validInstagramAccounts.length === 0) {
            throw new Error('Nenhuma conta do Instagram Business encontrada');
        }

        return NextResponse.json({
            access_token: tokenData.access_token,
            instagram_accounts: validInstagramAccounts,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
