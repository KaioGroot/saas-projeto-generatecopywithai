import { NextResponse } from 'next/server';
import { getFacebookAuthUrl, getFacebookPages, getInstagramAccount } from '@/lib/instagram';

export async function GET() {
    try {
        const authUrl = await getFacebookAuthUrl();
        return NextResponse.json({ url: authUrl });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
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
                client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
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
