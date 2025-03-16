'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { saveReportedProblem } from '@/lib/feedback';

export default function ReportProblem() {
    const { isDarkMode } = useTheme();
    const { currentUser } = useAuth();
    const [problemType, setProblemType] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const problemTypes = [
        { id: 'technical', label: 'Problema Técnico' },
        { id: 'content', label: 'Problema com Conteúdo' },
        { id: 'suggestion', label: 'Sugestão de Melhoria' },
        { id: 'other', label: 'Outro' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentUser) {
            setError('Você precisa estar logado para reportar um problema.');
            return;
        }

        try {
            const result = await saveReportedProblem(currentUser.uid, problemType, description);

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setProblemType('');
                    setDescription('');
                    setSubmitted(false);
                }, 3000);
            } else {
                setError('Erro ao reportar problema. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao reportar problema:', error);
            setError('Ocorreu um erro ao reportar o problema. Por favor, tente novamente.');
        }
    };

    return (
        <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300`}>
            <div className="flex items-center mb-6">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reportar um Problema</h2>
            </div>

            {/* Mensagem de Erro */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-red-700 text-center">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Problema */}
                <div>
                    <label htmlFor="problemType" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Tipo de Problema
                    </label>
                    <select
                        id="problemType"
                        value={problemType}
                        onChange={(e) => setProblemType(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'
                        } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        required
                    >
                        <option value="">Selecione o tipo de problema</option>
                        {problemTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Descrição do Problema */}
                <div>
                    <label htmlFor="description" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Descrição do Problema
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'
                        } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="Descreva o problema em detalhes..."
                        required
                    />
                </div>

                {/* Botão de Envio */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 
                            transition-colors duration-300 ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={submitted || !currentUser}
                    >
                        {submitted ? 'Problema Reportado!' : 'Reportar Problema'}
                    </button>
                </div>
            </form>

            {/* Mensagem de Sucesso */}
            {submitted && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-700 text-center">Obrigado por reportar o problema! Nossa equipe irá analisá-lo em breve.</p>
                </div>
            )}
        </div>
    );
}
