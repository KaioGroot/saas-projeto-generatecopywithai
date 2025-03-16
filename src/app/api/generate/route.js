import { NextResponse } from 'next/server';
import { auth } from '@/config/firebase';
import Gerarprompt from '@/action/gerarprompt';

export async function POST(request) {
    try {
        // Verificar autenticação
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        // Verificar assinatura
        const subscriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscription/check`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const subscriptionData = await subscriptionResponse.json();

        if (!subscriptionData.hasSubscription) {
            return NextResponse.json(
                {
                    error: 'Assinatura necessária para gerar textos',
                    type: 'subscription_required',
                },
                { status: 403 }
            );
        }

        // Processar a requisição usando o sistema existente
        const { title, description } = await request.json();
        const generatedText = await Gerarprompt(title, description);

        return NextResponse.json({ text: generatedText });
    } catch (error) {
        console.error('Erro ao gerar texto:', error);
        return NextResponse.json(
            {
                error: 'Erro ao gerar o texto. Por favor, tente novamente.',
            },
            { status: 500 }
        );
    }
}
