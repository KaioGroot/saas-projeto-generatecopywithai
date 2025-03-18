import { NextResponse } from 'next/server';

// Este é o token que VOCÊ define e coloca no painel do Meta for Developers
// Pode ser qualquer string, mas deve ser a mesma nos dois lugares
const VERIFY_TOKEN = 'meu_token_secreto_123';

// URL base do seu projeto no Vercel
const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';

const INSTAGRAM_APP_ID = '1019230419279328';

export async function GET(request) {
    try {
        // Remove o fragmento #_=_ da URL se existir
        const url = new URL(request.url);
        const cleanUrl = url.toString().split('#')[0];
        const searchParams = new URL(cleanUrl).searchParams;

        const code = searchParams.get('code');
        const error = searchParams.get('error');

        // Se houver erro ou o usuário cancelou
        if (error || !code) {
            console.error('Erro na autenticação:', error);
            return NextResponse.redirect('/social?error=auth_failed');
        }

        // Troca o código por um token de acesso
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: INSTAGRAM_APP_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
                code,
            }),
        });

        if (!tokenResponse.ok) {
            console.error('Erro ao obter token:', await tokenResponse.text());
            return NextResponse.redirect('/social?error=token_failed');
        }

        const tokenData = await tokenResponse.json();

        // Busca informações do usuário do Instagram
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`);
        const userData = await userResponse.json();

        if (!userResponse.ok) {
            return NextResponse.redirect('/social?error=user_info_failed');
        }

        // TODO: Salvar os dados do usuário (token e informações) no seu banco de dados
        console.log('Dados do usuário:', userData);

        // Redireciona de volta para a página social com sucesso
        return NextResponse.redirect('/social?success=true');
    } catch (error) {
        console.error('Erro no callback:', error);
        return NextResponse.redirect('/social?error=unknown');
    }
}
