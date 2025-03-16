'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';

export default function CriarTemplatePage() {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [template, setTemplate] = useState({
        title: '',
        category: '',
        description: '',
        content: '',
        variables: [],
    });
    const [newVariable, setNewVariable] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddVariable = () => {
        if (newVariable.trim() && !template.variables.includes(newVariable.trim())) {
            setTemplate({
                ...template,
                variables: [...template.variables, newVariable.trim()],
            });
            setNewVariable('');
        }
    };

    const handleRemoveVariable = (variable) => {
        setTemplate({
            ...template,
            variables: template.variables.filter((v) => v !== variable),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações básicas
        if (!template.title.trim()) {
            toast.error('O título é obrigatório');
            return;
        }
        if (!template.category.trim()) {
            toast.error('A categoria é obrigatória');
            return;
        }
        if (!template.content.trim()) {
            toast.error('O conteúdo é obrigatório');
            return;
        }

        try {
            setIsLoading(true);
            const db = getFirestore(app);

            // Criar o objeto do template com dados adicionais
            const templateData = {
                ...template,
                createdAt: new Date().toISOString(),
                usageCount: 0,
            };

            // Salvar no Firestore
            await addDoc(collection(db, 'templates'), templateData);

            toast.success('Template criado com sucesso!');
            router.push('/templates');
        } catch (error) {
            console.error('Erro ao criar template:', error);
            toast.error('Erro ao criar template. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Criar Novo Template</h1>
                    <button
                        onClick={() => router.push('/templates')}
                        className="px-4 py-2 text-sm rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                    >
                        Voltar
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <input
                                type="text"
                                value={template.title}
                                onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                placeholder="Digite o título do template"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Categoria</label>
                            <input
                                type="text"
                                value={template.category}
                                onChange={(e) => setTemplate({ ...template, category: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                placeholder="Ex: Email, Redes Sociais, E-commerce"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Descrição</label>
                            <textarea
                                value={template.description}
                                onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                rows="3"
                                placeholder="Descreva o propósito deste template"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Variáveis</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newVariable}
                                    onChange={(e) => setNewVariable(e.target.value)}
                                    className={`flex-1 px-4 py-2 rounded-lg border ${
                                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="Nome da variável"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVariable())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddVariable}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Adicionar
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {template.variables.map((variable) => (
                                    <span
                                        key={variable}
                                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {variable}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveVariable(variable)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Conteúdo</label>
                            <textarea
                                value={template.content}
                                onChange={(e) => setTemplate({ ...template, content: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                rows="10"
                                placeholder="Digite o conteúdo do template. Use {nome_da_variavel} para inserir variáveis."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Criando...' : 'Criar Template'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
