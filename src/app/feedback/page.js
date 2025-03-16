'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import FeedbackSystem from '@/components/FeedbackSystem';
import ReportProblem from '@/components/ReportProblem';
import { getRecentFeedbacks } from '@/lib/feedback';

export default function FeedbackPage() {
    const { isDarkMode } = useTheme();
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('feedback');
    const [recentFeedbacks, setRecentFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRecentFeedbacks();
    }, []);

    const loadRecentFeedbacks = async () => {
        try {
            setLoading(true);
            const result = await getRecentFeedbacks(5);

            if (result.success) {
                setRecentFeedbacks(result.feedbacks);
            } else {
                setError('Não foi possível carregar os feedbacks recentes.');
            }
        } catch (error) {
            console.error('Erro ao carregar feedbacks:', error);
            setError('Ocorreu um erro ao carregar os feedbacks.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date.seconds * 1000);
        return d.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Feedback e Suporte</h1>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                            activeTab === 'feedback'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Dar Feedback
                    </button>
                    <button
                        onClick={() => setActiveTab('report')}
                        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                            activeTab === 'report'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Reportar Problema
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="space-y-8">
                    {activeTab === 'feedback' ? (
                        <>
                            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Sua opinião é importante!
                                </h2>
                                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Ajude-nos a melhorar nossos serviços compartilhando sua experiência com o Persuasivo. Seu feedback nos ajuda a
                                    criar uma plataforma melhor para todos os usuários.
                                </p>
                                <FeedbackSystem />
                            </div>

                            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Feedbacks Recentes</h2>

                                {loading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                                    </div>
                                ) : error ? (
                                    <div className="text-center text-red-500 py-4">{error}</div>
                                ) : recentFeedbacks.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentFeedbacks.map((feedback) => (
                                            <div key={feedback.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, index) => (
                                                            <svg
                                                                key={index}
                                                                className={`h-4 w-4 ${index < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.207l7.046-1.024L10 0l2.782 6.183 7.046 1.024-4.71 4.664 1.209 7.037L10 15.585z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {formatDate(feedback.createdAt)}
                                                    </span>
                                                </div>
                                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{feedback.feedback}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <p>Ainda não há feedbacks para mostrar.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <ReportProblem />
                    )}
                </div>
            </div>
        </div>
    );
}
