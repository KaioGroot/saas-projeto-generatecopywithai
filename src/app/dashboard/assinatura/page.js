'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não está definida');
}

console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Definida' : 'Não definida');

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Assinatura() {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            setError('');

            if (!currentUser) {
                setError('Você precisa estar logado para assinar');
                return;
            }

            // Criar sessão de checkout
            const response = await fetch('/api/subscription/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    userId: currentUser.uid,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Erro ao criar sessão de checkout');
            }

            const data = await response.json();

            if (!data.sessionId) {
                throw new Error('SessionId não recebido do servidor');
            }

            // Redirecionar para o Checkout do Stripe
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Erro ao carregar Stripe');
            }

            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }
        } catch (err) {
            console.error('Erro ao iniciar assinatura:', err);
            setError(err.message || 'Erro ao processar assinatura. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Planos de Assinatura</h2>
                    <p className="mt-4 text-lg text-gray-600">Escolha o plano ideal para suas necessidades</p>
                </div>

                <div className="mt-12 max-w-lg mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <h3 className="text-2xl font-bold text-center text-gray-900">Plano Pro</h3>
                            <div className="mt-4 flex justify-center">
                                <span className="text-5xl font-extrabold text-gray-900">R$29</span>
                                <span className="text-xl font-medium text-gray-500 self-end mb-1">/mês</span>
                            </div>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-green-500"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-gray-700">Geração ilimitada de textos</span>
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-green-500"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-gray-700">Acesso a todos os tipos de conteúdo</span>
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-green-500"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-gray-700">Suporte prioritário</span>
                                </li>
                            </ul>

                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className={`mt-8 w-full py-3 px-4 rounded-md text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {loading ? 'Processando...' : 'Assinar Agora'}
                            </button>

                            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
