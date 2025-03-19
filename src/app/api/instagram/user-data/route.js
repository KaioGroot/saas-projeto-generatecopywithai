import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Busca o token de acesso do usuário (você precisará implementar um sistema de armazenamento de tokens)
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

        if (!accessToken) {
            return NextResponse.json({ error: 'Usuário não está autenticado' }, { status: 401 });
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
