'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaMobile, FaDesktop, FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { MdContentCopy, MdCheck } from 'react-icons/md';

const socialPreviewStyles = {
    instagram: {
        maxWidth: '400px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.5',
        padding: '12px',
    },
    linkedin: {
        maxWidth: '550px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.4',
        padding: '16px',
    },
    twitter: {
        maxWidth: '500px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: '1.5',
        padding: '15px',
    },
    facebook: {
        maxWidth: '500px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        lineHeight: '1.4',
        padding: '16px',
    },
};

const deviceStyles = {
    mobile: {
        maxWidth: '375px',
        padding: '16px',
    },
    desktop: {
        maxWidth: '800px',
        padding: '24px',
    },
};

export default function AdvancedPreview({ content, onCopy }) {
    const { isDarkMode } = useTheme();
    const [viewMode, setViewMode] = useState('desktop');
    const [socialPlatform, setSocialPlatform] = useState('');
    const [copied, setCopied] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    // Função para analisar o conteúdo e gerar sugestões
    const analyzeSuggestions = (text) => {
        const newSuggestions = [];

        // Verifica comprimento do texto
        if (text.length > 1000) {
            newSuggestions.push({
                type: 'warning',
                message: 'O texto está muito longo. Considere reduzir para melhor engajamento.',
            });
        }

        // Verifica uso de emojis
        if (!text.match(/[\u{1F300}-\u{1F9FF}]/u)) {
            newSuggestions.push({
                type: 'tip',
                message: 'Adicionar emojis pode aumentar o engajamento.',
            });
        }

        // Verifica chamadas para ação
        if (!text.toLowerCase().includes('clique') && !text.toLowerCase().includes('acesse')) {
            newSuggestions.push({
                type: 'tip',
                message: 'Adicione uma chamada para ação clara.',
            });
        }

        // Verifica hashtags para redes sociais
        if (socialPlatform && !text.includes('#')) {
            newSuggestions.push({
                type: 'tip',
                message: 'Considere adicionar hashtags relevantes para maior alcance.',
            });
        }

        setSuggestions(newSuggestions);
    };

    // Handler para copiar o conteúdo
    const handleCopy = async () => {
        await onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Estilo baseado no modo de visualização
    const getPreviewStyle = () => {
        if (socialPlatform) {
            return socialPreviewStyles[socialPlatform];
        }
        return deviceStyles[viewMode];
    };

    return (
        <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}>
            {/* Controles de visualização */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 border rounded-lg p-2">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`p-2 rounded-lg transition-colors ${
                            viewMode === 'desktop'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaDesktop className="text-xl" />
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`p-2 rounded-lg transition-colors ${
                            viewMode === 'mobile'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaMobile className="text-xl" />
                    </button>
                </div>

                <div className="flex items-center gap-2 border rounded-lg p-2">
                    <button
                        onClick={() => {
                            setSocialPlatform('instagram');
                            analyzeSuggestions(content);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                            socialPlatform === 'instagram'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaInstagram className="text-xl" />
                    </button>
                    <button
                        onClick={() => {
                            setSocialPlatform('linkedin');
                            analyzeSuggestions(content);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                            socialPlatform === 'linkedin'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaLinkedin className="text-xl" />
                    </button>
                    <button
                        onClick={() => {
                            setSocialPlatform('twitter');
                            analyzeSuggestions(content);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                            socialPlatform === 'twitter'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaTwitter className="text-xl" />
                    </button>
                    <button
                        onClick={() => {
                            setSocialPlatform('facebook');
                            analyzeSuggestions(content);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                            socialPlatform === 'facebook'
                                ? 'bg-purple-600 text-white'
                                : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <FaFacebook className="text-xl" />
                    </button>
                </div>

                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                >
                    {copied ? <MdCheck className="text-green-500" /> : <MdContentCopy />}
                    {copied ? 'Copiado!' : 'Copiar'}
                </button>
            </div>

            {/* Área de Preview */}
            <div className={`mb-6 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} overflow-hidden`}>
                <div
                    className={`${isDarkMode ? 'text-white' : 'text-gray-900'} overflow-y-auto`}
                    style={{
                        ...getPreviewStyle(),
                        margin: '0 auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                >
                    {content}
                </div>
            </div>

            {/* Sugestões e Dicas */}
            {suggestions.length > 0 && (
                <div className="space-y-2">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sugestões de Melhoria</h3>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${
                                suggestion.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                            {suggestion.message}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
