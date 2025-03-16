'use client';

import { useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { analyzeText, generateTextVariation } from '@/config/huggingface';
import { toast } from 'react-hot-toast';

const RETRY_DELAY = 3000; // 3 segundos

const PERSUASIVE_STYLES = {
    emocional: {
        nome: 'Emocional',
        descrição: 'Desperta emoções e conexão pessoal',
        cor: 'bg-pink-500',
    },
    logico: {
        nome: 'Lógico',
        descrição: 'Argumentos racionais e estruturados',
        cor: 'bg-blue-500',
    },
    urgente: {
        nome: 'Urgência',
        descrição: 'Cria senso de urgência e escassez',
        cor: 'bg-red-500',
    },
    social: {
        nome: 'Prova Social',
        descrição: 'Utiliza credibilidade e experiências',
        cor: 'bg-purple-500',
    },
    beneficios: {
        nome: 'Benefícios',
        descrição: 'Foca nas vantagens e resultados',
        cor: 'bg-green-500',
    },
    storytelling: {
        nome: 'Storytelling',
        descrição: 'Conta uma história envolvente',
        cor: 'bg-yellow-500',
    },
    autoridade: {
        nome: 'Autoridade',
        descrição: 'Tom especialista e profissional',
        cor: 'bg-gray-500',
    },
};

const getSentimentColor = (sentiment) => {
    switch (sentiment) {
        case 'positivo':
            return 'text-green-600';
        case 'negativo':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};

export default function AIHelper({ text }) {
    const { isDarkMode } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [variation, setVariation] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Parâmetros de geração
    const [generationParams, setGenerationParams] = useState({
        maxLength: 150,
        temperature: 0.7,
        creativity: 0.9,
        numVariations: 1,
        persuasiveStyle: '',
        repetitionPenalty: 1.2,
        lengthPenalty: 1.0,
    });

    const [showGenerationParams, setShowGenerationParams] = useState(false);
    const [showAdvancedParams, setShowAdvancedParams] = useState(false);

    const handleRetry = useCallback(
        async (action) => {
            if (retryCount >= 3) {
                setError('Número máximo de tentativas atingido. Por favor, tente novamente mais tarde.');
                setRetryCount(0);
                return null;
            }

            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            setRetryCount((prev) => prev + 1);
            return action();
        },
        [retryCount]
    );

    const handleAnalyze = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await analyzeText(text);
            setAnalysis(result);
            setRetryCount(0);
            toast.success('Análise concluída!');
        } catch (error) {
            console.error('Erro na análise:', error);
            if (error.message.includes('carregando')) {
                toast.loading('Modelo está carregando, tentando novamente...');
                const retryResult = await handleRetry(handleAnalyze);
                if (retryResult) return;
            }
            setError(error.message);
            toast.error(error.message || 'Erro ao analisar o texto');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            if (!generationParams.persuasiveStyle) {
                toast.error('Por favor, selecione um estilo persuasivo');
                return;
            }

            setIsLoading(true);
            setError(null);
            const result = await generateTextVariation(text, generationParams);
            setVariation(result);
            setRetryCount(0);
            toast.success('Variação gerada!');
        } catch (error) {
            console.error('Erro na geração:', error);
            if (error.message.includes('carregando')) {
                toast.loading('Modelo está carregando, tentando novamente...');
                const retryResult = await handleRetry(handleGenerate);
                if (retryResult) return;
            }
            setError(error.message);
            toast.error(error.message || 'Erro ao gerar variação');
        } finally {
            setIsLoading(false);
        }
    };

    const handleParamChange = (param, value) => {
        setGenerationParams((prev) => ({
            ...prev,
            [param]: value,
        }));
    };

    return (
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex gap-4">
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                        } text-white transition-colors disabled:opacity-50`}
                    >
                        {isLoading ? `${retryCount > 0 ? `Tentativa ${retryCount}/3...` : 'Processando...'}` : 'Analisar Sentimento'}
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !generationParams.persuasiveStyle}
                        className={`px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition-colors disabled:opacity-50`}
                    >
                        {isLoading ? `${retryCount > 0 ? `Tentativa ${retryCount}/3...` : 'Processando...'}` : 'Gerar Variação'}
                    </button>
                    <button
                        onClick={() => setShowGenerationParams(!showGenerationParams)}
                        className={`px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
                        } text-white transition-colors`}
                    >
                        {showGenerationParams ? 'Ocultar Opções' : 'Mostrar Opções'}
                    </button>
                </div>

                {showGenerationParams && (
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <h3 className="font-semibold mb-4">Estilo Persuasivo:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {Object.entries(PERSUASIVE_STYLES).map(([key, style]) => (
                                <button
                                    key={key}
                                    onClick={() => handleParamChange('persuasiveStyle', key)}
                                    className={`p-3 rounded-lg transition-all ${
                                        generationParams.persuasiveStyle === key ? `${style.cor} text-white scale-105` : 'bg-white hover:scale-102'
                                    } shadow-md`}
                                >
                                    <h4 className="font-medium mb-1">{style.nome}</h4>
                                    <p className="text-sm opacity-90">{style.descrição}</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Parâmetros de Geração:</h3>
                            <button onClick={() => setShowAdvancedParams(!showAdvancedParams)} className="text-sm text-blue-500 hover:text-blue-600">
                                {showAdvancedParams ? 'Ocultar Avançado' : 'Mostrar Avançado'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Comprimento Máximo: {generationParams.maxLength}</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    value={generationParams.maxLength}
                                    onChange={(e) => handleParamChange('maxLength', parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Temperatura (Aleatoriedade): {generationParams.temperature}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={generationParams.temperature}
                                    onChange={(e) => handleParamChange('temperature', parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Criatividade: {generationParams.creativity}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={generationParams.creativity}
                                    onChange={(e) => handleParamChange('creativity', parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Número de Variações: {generationParams.numVariations}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={generationParams.numVariations}
                                    onChange={(e) => handleParamChange('numVariations', parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {showAdvancedParams && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Penalidade de Repetição: {generationParams.repetitionPenalty}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="2"
                                            step="0.1"
                                            value={generationParams.repetitionPenalty}
                                            onChange={(e) => handleParamChange('repetitionPenalty', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Controla quão fortemente o modelo evita repetir palavras e frases
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Penalidade de Comprimento: {generationParams.lengthPenalty}
                                        </label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="2"
                                            step="0.1"
                                            value={generationParams.lengthPenalty}
                                            onChange={(e) => handleParamChange('lengthPenalty', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Ajusta a preferência por textos mais longos ou mais curtos</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800">
                    <h3 className="font-semibold mb-2">Erro:</h3>
                    <p>{error}</p>
                    {error.includes('carregando') && (
                        <p className="mt-2 text-sm">O modelo está sendo inicializado. Tentando novamente automaticamente...</p>
                    )}
                </div>
            )}

            {analysis?.análise && (
                <div className={`mb-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-semibold mb-4">Análise de Sentimento:</h3>
                    <div className="space-y-3">
                        {analysis.análise.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className={`font-medium ${getSentimentColor(item.sentimento)} ${isDarkMode ? 'opacity-90' : ''}`}>
                                    {item.sentimento.charAt(0).toUpperCase() + item.sentimento.slice(1)}
                                </span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${
                                                item.sentimento === 'positivo'
                                                    ? 'bg-green-500'
                                                    : item.sentimento === 'negativo'
                                                    ? 'bg-red-500'
                                                    : 'bg-gray-500'
                                            }`}
                                            style={{ width: `${item.pontuação}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-sm font-medium">{item.pontuação}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {variation?.variações && (
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-semibold mb-4">Variações Geradas:</h3>
                    <div className="space-y-4">
                        {variation.variações.map((item, index) => (
                            <div key={index} className="p-4 rounded-lg bg-white bg-opacity-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-sm">
                                        Estilo: {PERSUASIVE_STYLES[item.metadata.estilo]?.nome || item.metadata.estilo}
                                    </span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.texto);
                                            toast.success('Texto copiado!');
                                        }}
                                        className="text-blue-500 hover:text-blue-600 text-sm"
                                    >
                                        Copiar Texto
                                    </button>
                                </div>
                                <p className="whitespace-pre-wrap mb-3">{item.texto}</p>
                                <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                                    <span>Comprimento: {item.metadata.comprimento} caracteres</span>
                                    <span>•</span>
                                    <span>Temperatura: {item.metadata.temperatura}</span>
                                    <span>•</span>
                                    <span>Criatividade: {item.metadata.criatividade}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
