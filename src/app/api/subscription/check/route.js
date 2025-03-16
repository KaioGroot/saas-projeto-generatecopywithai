import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/config/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
    try {
        // Pegar o token do cabeçalho da requisição
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
        }

        // Extrair e verificar o token
        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        // Decodificar o token para obter o userId
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;

        // Buscar clientes pelo userId nos metadados
        const customers = await stripe.customers.list({
            limit: 100,
            expand: ['data.subscriptions'],
        });

        // Procurar por uma assinatura ativa
        let hasActiveSubscription = false;

        for (const customer of customers.data) {
            if (customer.metadata.userId === userId && customer.subscriptions?.data?.length > 0) {
                const activeSubscription = customer.subscriptions.data.find((sub) => sub.status === 'active');
                if (activeSubscription) {
                    hasActiveSubscription = true;
                    break;
                }
            }
        }

        return NextResponse.json({
            hasActiveSubscription,
            subscriptionStatus: hasActiveSubscription ? 'active' : 'inactive',
        });
    } catch (error) {
        console.error('Erro ao verificar assinatura:', error);
        return NextResponse.json({ error: 'Erro ao verificar assinatura', details: error.message }, { status: 500 });
    }
}
