import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const imageUrl = formData.get('image');
        const caption = formData.get('caption');
        const accessToken = formData.get('accessToken');

        console.log('Dados recebidos:', {
            imageUrl,
            caption,
            hasToken: !!accessToken,
            tokenLength: accessToken?.length,
            tokenStart: accessToken?.substring(0, 10) + '...',
        });

        if (!imageUrl) {
            return NextResponse.json({ error: 'Imagem é obrigatória' }, { status: 400 });
        }

        if (!accessToken) {
            return NextResponse.json({ error: 'Usuário não está autenticado' }, { status: 401 });
        }

        // Primeiro, obtém o ID da conta do Instagram Business
        console.log('Buscando ID da conta do Instagram...');
        const accountResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`);
        const accountData = await accountResponse.json();

        if (!accountResponse.ok) {
            console.error('Erro ao obter contas:', accountData);
            return NextResponse.json({ error: `Erro ao obter contas: ${accountData.error?.message || 'Erro desconhecido'}` }, { status: 500 });
        }

        if (!accountData.data || accountData.data.length === 0) {
            return NextResponse.json({ error: 'Nenhuma conta do Instagram Business encontrada' }, { status: 400 });
        }

        const pageId = accountData.data[0].id;
        console.log('ID da página:', pageId);

        // Agora, obtém o ID da conta do Instagram vinculada à página
        const instagramResponse = await fetch(
            `https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
        );
        const instagramData = await instagramResponse.json();

        if (!instagramResponse.ok) {
            console.error('Erro ao obter conta do Instagram:', instagramData);
            return NextResponse.json(
                { error: `Erro ao obter conta do Instagram: ${instagramData.error?.message || 'Erro desconhecido'}` },
                { status: 500 }
            );
        }

        const instagramAccountId = instagramData.instagram_business_account?.id;
        if (!instagramAccountId) {
            return NextResponse.json({ error: 'Conta do Instagram não está vinculada à página do Facebook' }, { status: 400 });
        }

        console.log('ID da conta do Instagram:', instagramAccountId);

        // Cria o post no Instagram usando a URL da imagem
        console.log('Tentando criar post no Instagram...');
        const createPostResponse = await fetch(`https://graph.facebook.com/v18.0/${instagramAccountId}/media?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_url: imageUrl,
                caption: caption,
            }),
        });

        const createPostData = await createPostResponse.json();
        console.log('Resposta da criação do post:', createPostData);

        if (!createPostResponse.ok) {
            console.error('Erro ao criar post:', createPostData);
            return NextResponse.json(
                { error: `Erro ao criar post no Instagram: ${createPostData.error?.message || 'Erro desconhecido'}` },
                { status: 500 }
            );
        }

        // Por fim, publica o post
        console.log('Tentando publicar o post...');
        const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creation_id: createPostData.id,
            }),
        });

        const publishData = await publishResponse.json();
        console.log('Resposta da publicação:', publishData);

        if (!publishResponse.ok) {
            console.error('Erro ao publicar post:', publishData);
            return NextResponse.json(
                { error: `Erro ao publicar post no Instagram: ${publishData.error?.message || 'Erro desconhecido'}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            postId: publishData.id,
        });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        return NextResponse.json({ error: `Erro interno do servidor: ${error.message}` }, { status: 500 });
    }
}
