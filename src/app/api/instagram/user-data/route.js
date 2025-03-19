import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Obtém o token da query string
        const { searchParams } = new URL(request.url);
        const accessToken = searchParams.get('token');

        if (!accessToken) {
            return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
        }

        // Busca informações do usuário do Instagram
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
        const userData = await response.json();

        if (!response.ok) {
            console.error('Erro ao obter dados do usuário:', userData);
            return NextResponse.json({ error: 'Erro ao obter dados do usuário' }, { status: 500 });
        }

        return NextResponse.json(userData);
    } catch (error) {
        console.error('Erro na API:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
