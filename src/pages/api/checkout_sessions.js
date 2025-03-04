// src/apps/api/checkout_sessions.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Processar a criação do PaymentIntent
    try {
      const { amount, email, name, phone, source } = req.body;

      const customer = await stripe.customers.create({
        email,
        name,
        phone,
        source
      });

       //criar assinatura mensal no stripe

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        metadata: { email, name, phone },
        payment_method_types: ['card'],
      });

      if (!paymentIntent) {
        return res.status(400).json({ error: 'PaymentIntent not created' });
      }
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
      
      subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_PRICE_ID }],
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Retornar método não permitido para outros tipos de requisição
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
