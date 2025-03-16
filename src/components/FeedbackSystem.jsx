'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { saveFeedback } from '@/lib/feedback';

export default function FeedbackSystem({ textId }) {
    const { isDarkMode } = useTheme();
    const { currentUser } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentUser) {
            setError('Você precisa estar logado para enviar feedback.');
            return;
        }

        try {
            const result = await saveFeedback(currentUser.uid, textId, rating, feedback);

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setShowForm(false);
                    setSubmitted(false);
                    setRating(0);
                    setFeedback('');
                }, 3000);
            } else {
                setError('Erro ao salvar feedback. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            setError('Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.');
        }
    };

    return (
        <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
            {/* Sistema de Estrelas */}
            <div className="flex flex-col items-center mb-6">
                <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {textId ? 'Como você avalia este texto?' : 'Como você avalia nossa plataforma?'}
                </p>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="focus:outline-none transition-transform hover:scale-110"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => {
                                setRating(star);
                                setShowForm(true);
                            }}
                        >
                            {star <= (hoveredRating || rating) ? (
                                <StarIcon className="h-8 w-8 text-yellow-400" />
                            ) : (
                                <StarOutline className="h-8 w-8 text-yellow-400" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-red-700 text-center">{error}</p>
                </div>
            )}

            {/* Formulário de Feedback */}
            {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="feedback" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {textId ? 'Conte-nos mais sobre sua experiência com este texto' : 'Conte-nos mais sobre sua experiência com a plataforma'}
                        </label>
                        <textarea
                            id="feedback"
                            rows="4"
                            className={`w-full px-3 py-2 rounded-lg ${
                                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'
                            } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder={
                                textId
                                    ? 'O que você achou do texto gerado? Tem sugestões de melhoria?'
                                    : 'O que você achou da plataforma? Tem sugestões de melhoria?'
                            }
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 
                                transition-colors duration-300 ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={submitted || !currentUser}
                        >
                            {submitted ? 'Feedback Enviado!' : 'Enviar Feedback'}
                        </button>
                    </div>
                </form>
            )}

            {/* Mensagem de Agradecimento */}
            {submitted && (
                <div className="text-center mt-4">
                    <p className={`text-lg font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Obrigado pelo seu feedback!</p>
                </div>
            )}
        </div>
    );
}
