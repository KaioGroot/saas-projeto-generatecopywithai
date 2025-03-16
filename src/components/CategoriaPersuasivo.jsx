import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIAS = {
    marketing: {
        nome: 'Marketing Digital',
        descricao: 'Textos para campanhas, anúncios e conteúdo digital',
        icone: '🎯',
        templates: ['Anúncio para Facebook', 'Post para Instagram', 'Email Marketing', 'Descrição de Produto'],
    },
    vendas: {
        nome: 'Vendas Diretas',
        descricao: 'Textos para vendas, propostas e negociações',
        icone: '💰',
        templates: ['Proposta Comercial', 'Follow-up de Vendas', 'Apresentação de Produto', 'Fechamento de Venda'],
    },
    email: {
        nome: 'Email Profissional',
        descricao: 'Emails persuasivos para diferentes objetivos',
        icone: '📧',
        templates: ['Email de Prospecção', 'Email de Agradecimento', 'Email de Reativação', 'Email de Parceria'],
    },
    social: {
        nome: 'Redes Sociais',
        descricao: 'Conteúdo engajador para mídias sociais',
        icone: '📱',
        templates: ['Bio para Instagram', 'Thread para Twitter', 'Post para LinkedIn', 'Legenda Engajadora'],
    },
};

export default function CategoriaPersuasivo({ onSelectTemplate, onSelectCategoria }) {
    const { isDarkMode } = useTheme();
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);

    const handleCategoriaClick = (categoria) => {
        setCategoriaAtiva(categoriaAtiva === categoria ? null : categoria);
        if (onSelectCategoria) {
            onSelectCategoria(categoria);
        }
    };

    return (
        <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Escolha uma Categoria</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(CATEGORIAS).map(([key, categoria]) => (
                    <div key={key} className="space-y-4">
                        <button
                            onClick={() => handleCategoriaClick(key)}
                            className={`w-full p-4 rounded-lg transition-all ${
                                categoriaAtiva === key
                                    ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white`
                                    : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}`
                            } shadow-md`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{categoria.icone}</span>
                                <div className="text-left">
                                    <h3 className="font-medium">{categoria.nome}</h3>
                                    <p className="text-sm opacity-90">{categoria.descricao}</p>
                                </div>
                            </div>
                        </button>

                        {categoriaAtiva === key && (
                            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <h4 className="font-medium mb-3">Templates Disponíveis:</h4>
                                <div className="space-y-2">
                                    {categoria.templates.map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onSelectTemplate(template, key)}
                                            className={`w-full p-2 text-left rounded ${
                                                isDarkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-200 text-gray-700'
                                            } transition-colors`}
                                        >
                                            {template}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
