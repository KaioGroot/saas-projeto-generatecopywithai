import { NextResponse } from 'next/server';

// URL base do seu projeto no Vercel
const BASE_URL = 'https://saas-projeto-generatecopywithai-jnbh.vercel.app';

const INSTAGRAM_APP_ID = '2019139641939405';

export async function GET(request) {
    try {
        console.log('URL completa recebida:', request.url); // Log da URL completa

        // Remove o fragmento #_=_ da URL se existir
        const url = new URL(request.url);
        const cleanUrl = url.toString().split('#')[0];
        console.log('URL limpa:', cleanUrl); // Log da URL limpa

        const searchParams = new URL(cleanUrl).searchParams;
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        console.log('Código recebido:', code); // Log para debug
        console.log('Erro recebido:', error); // Log para debug

        // Se houver erro ou o usuário cancelou
        if (error || !code) {
            console.error('Erro na autenticação:', error);
            return NextResponse.redirect(`${BASE_URL}/social?error=auth_failed`);
        }

        // Verifica se o client secret está definido
        if (!process.env.INSTAGRAM_CLIENT_SECRET) {
            console.error('INSTAGRAM_CLIENT_SECRET não está definido');
            return NextResponse.redirect(`${BASE_URL}/social?error=config_failed`);
        }

        // Prepara os parâmetros para a requisição
        const params = new URLSearchParams({
            client_id: INSTAGRAM_APP_ID,
            client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: `${BASE_URL}/api/auth/instagram/callback`,
            code,
        });

        console.log('Parâmetros da requisição:', params.toString()); // Log dos parâmetros

        // Troca o código por um token de acesso
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        const responseText = await tokenResponse.text();
        console.log('Resposta do Instagram:', responseText); // Log da resposta completa

        if (!tokenResponse.ok) {
            console.error('Erro ao obter token:', responseText);
            return NextResponse.redirect(`${BASE_URL}/social?error=token_failed`);
        }

        const tokenData = JSON.parse(responseText);
        console.log('Token recebido:', tokenData); // Log para debug

        // Busca informações do usuário do Instagram
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`);
        const userData = await userResponse.json();

        if (!userResponse.ok) {
            console.error('Erro ao obter dados do usuário:', userData);
            return NextResponse.redirect(`${BASE_URL}/social?error=user_info_failed`);
        }

        console.log('Dados do usuário:', userData); // Log para debug

        // Salva o token de acesso no localStorage do navegador
        localStorage.setItem('instagram_access_token', tokenData.access_token);

        // Redireciona para a página de sucesso com o token
        return NextResponse.redirect(`${BASE_URL}/social?success=true&token=${tokenData.access_token}`);
    } catch (error) {
        console.error('Erro no callback:', error);
        return NextResponse.redirect(`${BASE_URL}/social?error=unknown`);
    }
}
