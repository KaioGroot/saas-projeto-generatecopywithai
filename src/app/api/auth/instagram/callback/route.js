import { NextResponse } from 'next/server';

// Este é o token que VOCÊ define e coloca no painel do Meta for Developers
// Pode ser qualquer string, mas deve ser a mesma nos dois lugares
const VERIFY_TOKEN = 'meu_token_secreto_123';

// URL base do seu projeto no Vercel
const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Verifica se é uma solicitação de verificação do Facebook
        const mode = searchParams.get('hub.mode');
        const token = searchParams.get('hub.verify_token');
        const challenge = searchParams.get('hub.challenge');

        // Se o Facebook estiver verificando o endpoint
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('Webhook verificado com sucesso!');
                return new NextResponse(challenge, {
                    status: 200,
                    headers: { 'Content-Type': 'text/plain' },
                });
            }
            return new NextResponse('Token de verificação inválido', { status: 403 });
        }

        // Se não for verificação, processa o código de autorização do OAuth
        const code = searchParams.get('code');
        if (!code) {
            return NextResponse.redirect(new URL('/error?message=Código não fornecido', request.url));
        }

        // Troca o código pelo token de acesso do Instagram
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
                code: code,
            }),
        });

        if (!tokenResponse.ok) {
            const error = await tokenResponse.text();
            console.error('Erro ao obter token:', error);
            return NextResponse.redirect(new URL('/error?message=Erro ao obter token', request.url));
        }

        const { access_token, user_id } = await tokenResponse.json();

        // Redireciona para a página de sucesso com o token de acesso
        return NextResponse.redirect(new URL(`/success?token=${access_token}&user_id=${user_id}`, request.url));
    } catch (error) {
        console.error('Erro no callback:', error);
        return NextResponse.redirect(new URL('/error?message=Erro interno', request.url));
    }
}
