import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image');
        const caption = formData.get('caption');
        const accessToken = formData.get('accessToken');

        if (!image) {
            return NextResponse.json({ error: 'Imagem é obrigatória' }, { status: 400 });
        }

        if (!accessToken) {
            return NextResponse.json({ error: 'Usuário não está autenticado' }, { status: 401 });
        }

        // Cria o post no Instagram usando a URL da imagem
        const createPostResponse = await fetch(`https://graph.facebook.com/v18.0/me/media?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_url: image,
                caption: caption,
            }),
        });

        const createPostData = await createPostResponse.json();

        if (!createPostResponse.ok) {
            console.error('Erro ao criar post:', createPostData);
            return NextResponse.json({ error: 'Erro ao criar post no Instagram' }, { status: 500 });
        }

        // Por fim, publica o post
        const publishResponse = await fetch(`https://graph.facebook.com/v18.0/me/media_publish?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creation_id: createPostData.id,
            }),
        });

        const publishData = await publishResponse.json();

        if (!publishResponse.ok) {
            console.error('Erro ao publicar post:', publishData);
            return NextResponse.json({ error: 'Erro ao publicar post no Instagram' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            postId: publishData.id,
        });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
