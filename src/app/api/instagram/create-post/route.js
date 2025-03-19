import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image');
        const caption = formData.get('caption');
        const accessToken = formData.get('accessToken'); // Recebe o token do cliente

        if (!image) {
            return NextResponse.json({ error: 'Imagem é obrigatória' }, { status: 400 });
        }

        if (!accessToken) {
            return NextResponse.json({ error: 'Usuário não está autenticado' }, { status: 401 });
        }

        // Primeiro, faz upload da imagem para o Facebook
        const imageBuffer = await image.arrayBuffer();
        const imageBlob = new Blob([imageBuffer], { type: image.type });

        // Upload da imagem para o Facebook
        const uploadResponse = await fetch(`https://graph.facebook.com/v18.0/me/photos?access_token=${accessToken}`, {
            method: 'POST',
            body: imageBlob,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
            console.error('Erro no upload da imagem:', uploadData);
            return NextResponse.json({ error: 'Erro ao fazer upload da imagem' }, { status: 500 });
        }

        // Agora, cria o post no Instagram usando o ID da imagem
        const createPostResponse = await fetch(`https://graph.facebook.com/v18.0/me/media?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_url: uploadData.url,
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
