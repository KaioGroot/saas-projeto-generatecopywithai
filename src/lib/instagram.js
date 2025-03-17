// URL de autenticação do Facebook (que inclui Instagram)
export const FB_AUTH_URL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${'1019230419279328'}&redirect_uri=${
    process.env.NEXT_PUBLIC_APP_URL
}/api/auth/instagram/callback&scope=instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement,instagram_manage_insights&response_type=code`;

export async function getFacebookAuthUrl() {
    return FB_AUTH_URL;
}

export async function postToInstagram(accessToken, pageId, instagramAccountId, mediaUrl, caption) {
    try {
        // 1. Criar container de mídia
        const createMediaResponse = await fetch(`https://graph.facebook.com/v18.0/${instagramAccountId}/media`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_url: mediaUrl,
                caption: caption,
                access_token: accessToken,
            }),
        });

        const mediaData = await createMediaResponse.json();

        if (!mediaData.id) {
            throw new Error('Falha ao criar container de mídia');
        }

        // 2. Publicar a mídia
        const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creation_id: mediaData.id,
                access_token: accessToken,
            }),
        });

        const publishData = await publishResponse.json();
        return publishData;
    } catch (error) {
        console.error('Erro ao postar no Instagram:', error);
        throw error;
    }
}

// Obter páginas do Facebook
export async function getFacebookPages(accessToken) {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`);
    return response.json();
}

// Obter conta do Instagram associada à página
export async function getInstagramAccount(accessToken, pageId) {
    const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`);
    return response.json();
}
