import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { email, userId } = await request.json();

        if (!email || !userId) {
            return NextResponse.json({ error: 'Email e userId são obrigatórios' }, { status: 400 });
        }

        // Criar ou recuperar cliente
        let customer;
        const existingCustomers = await stripe.customers.list({ email });

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
            // Atualizar metadata do cliente existente
            await stripe.customers.update(customer.id, {
                metadata: { userId },
            });
        } else {
            customer = await stripe.customers.create({
                email,
                metadata: { userId },
            });
        }

        // Criar sessão de checkout
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/assinatura?canceled=true`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar sessão de checkout', details: error.message }, { status: 500 });
    }
}
