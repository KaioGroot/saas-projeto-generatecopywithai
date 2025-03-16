import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = headers().get('stripe-signature');

        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error('Erro na validação do webhook:', err);
            return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
        }

        const session = event.data.object;

        switch (event.type) {
            case 'checkout.session.completed':
                const userId = session.metadata.firebaseUID;
                const subscriptionId = session.subscription;

                // Buscar detalhes da assinatura
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                // Atualizar documento do usuário no Firestore
                await setDoc(
                    doc(db, 'users', userId),
                    {
                        stripeCustomerId: session.customer,
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    },
                    { merge: true }
                );

                break;

            case 'invoice.payment_succeeded':
                if (session.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription);
                    const userId = subscription.metadata.firebaseUID;

                    // Atualizar período da assinatura
                    await setDoc(
                        doc(db, 'users', userId),
                        {
                            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        },
                        { merge: true }
                    );
                }
                break;

            case 'customer.subscription.deleted':
                const userDoc = await getDoc(doc(db, 'users', session.metadata.firebaseUID));
                if (userDoc.exists()) {
                    await setDoc(
                        doc(db, 'users', session.metadata.firebaseUID),
                        {
                            stripeSubscriptionId: null,
                            stripePriceId: null,
                            stripeCurrentPeriodEnd: null,
                        },
                        { merge: true }
                    );
                }
                break;
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Erro no webhook:', error);
        return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
    }
}
