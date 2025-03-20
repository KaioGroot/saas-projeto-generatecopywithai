'use client';

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function VariationsGenerator({ text, onVariationsGenerated }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateVariations = async () => {
        if (!text) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `Crie 3 variações diferentes do seguinte texto, mantendo a mesma mensagem principal mas com diferentes abordagens e estilos: "${text}"`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao gerar variações');
            }

            // Divide o texto gerado em variações (assumindo que cada variação está em uma nova linha)
            const variations = data.text.split('\n').filter((v) => v.trim());
            onVariationsGenerated(variations);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao gerar variações:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Gerar Variações</h3>
                <button
                    onClick={generateVariations}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                    }`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin inline-block mr-2" />
                            Gerando...
                        </>
                    ) : (
                        'Gerar Variações'
                    )}
                </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        </div>
    );
}
