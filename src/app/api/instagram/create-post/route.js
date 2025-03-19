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
        });

        if (!imageUrl) {
            return NextResponse.json({ error: 'Imagem é obrigatória' }, { status: 400 });
        }

        if (!accessToken) {
            return NextResponse.json({ error: 'Usuário não está autenticado' }, { status: 401 });
        }

        // Cria o post no Instagram usando a URL da imagem
        console.log('Tentando criar post no Instagram...');
        const createPostResponse = await fetch(`https://graph.instagram.com/me/media?access_token=${accessToken}`, {
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
        const publishResponse = await fetch(`https://graph.instagram.com/me/media_publish?access_token=${accessToken}`, {
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
