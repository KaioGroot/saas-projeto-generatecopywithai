import { NextResponse } from 'next/server';

// Este é o token que VOCÊ define e coloca no painel do Meta for Developers
// Pode ser qualquer string, mas deve ser a mesma nos dois lugares
const VERIFY_TOKEN = 'meu_token_secreto_123';

// URL base do seu projeto no Vercel
const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';

const FACEBOOK_APP_ID = '1019230419279328';

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
        const error = searchParams.get('error');
        if (!code) {
            return NextResponse.redirect(new URL('/error?message=Código não fornecido', request.url));
        }

        // Se houver erro ou o usuário cancelou
        if (error || !code) {
            console.error('Erro na autenticação:', error);
            return NextResponse.redirect('/social?error=auth_failed');
        }

        // Troca o código pelo token de acesso
        const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: new URLSearchParams({
                client_id: FACEBOOK_APP_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
                code,
            }),
        });

        if (!tokenResponse.ok) {
            console.error('Erro ao obter token:', await tokenResponse.text());
            return NextResponse.redirect('/social?error=token_failed');
        }

        const tokenData = await tokenResponse.json();

        // Busca as páginas do Facebook do usuário
        const pagesResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`);
        const pagesData = await pagesResponse.json();

        if (!pagesData.data || pagesData.data.length === 0) {
            return NextResponse.redirect('/social?error=no_pages');
        }

        // Para cada página, busca a conta do Instagram Business associada
        const instagramAccounts = await Promise.all(
            pagesData.data.map(async (page) => {
                const instagramResponse = await fetch(
                    `https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account&access_token=${tokenData.access_token}`
                );
                const instagramData = await instagramResponse.json();

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

        // Filtra as contas nulas
        const validInstagramAccounts = instagramAccounts.filter((account) => account !== null);

        if (validInstagramAccounts.length === 0) {
            return NextResponse.redirect('/social?error=no_instagram');
        }

        // Salva os dados na sessão ou banco de dados
        // TODO: Implementar armazenamento dos dados

        // Redireciona de volta para a página social com sucesso
        return NextResponse.redirect('/social?success=true');
    } catch (error) {
        console.error('Erro no callback:', error);
        return NextResponse.redirect('/social?error=unknown');
    }
}
