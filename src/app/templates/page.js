'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserTemplates from '@/components/UserTemplates';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { toast } from 'react-hot-toast';

const defaultTemplates = {
    1: {
        id: '1',
        title: 'Email Marketing',
        category: 'Marketing',
        description: 'Template para email marketing com foco em promoções',
        content: `Olá {nome},

Espero que esteja tudo bem! Temos uma oferta especial para você:

{produto} com {desconto} de desconto!

Não perca essa oportunidade única de adquirir {produto} com condições especiais.

{beneficios}

Para aproveitar, basta acessar nossa loja: {link_loja}

Caso tenha alguma dúvida, estou à disposição.

Atenciosamente,
{assinatura}`,
        variables: ['nome', 'produto', 'desconto', 'beneficios', 'link_loja', 'assinatura'],
        usageCount: 0,
        createdAt: new Date().toISOString(),
    },
    2: {
        id: '2',
        title: 'Post para Instagram',
        category: 'Redes Sociais',
        description: 'Template para posts no Instagram com call-to-action',
        content: `✨ {emoji} {titulo_principal} {emoji}

{descricao_produto}

Benefícios:
{beneficios}

💰 De R$ {preco_original} 
➡️ Por R$ {preco_promocional}

⚡ Oferta por tempo limitado!

Para comprar:
{link_compra}

#️⃣ {hashtags}`,
        variables: ['emoji', 'titulo_principal', 'descricao_produto', 'beneficios', 'preco_original', 'preco_promocional', 'link_compra', 'hashtags'],
        usageCount: 0,
        createdAt: new Date().toISOString(),
    },
    3: {
        id: '3',
        title: 'Descrição de Produto E-commerce',
        category: 'E-commerce',
        description: 'Template para descrição de produtos em lojas online',
        content: `{nome_produto}

📦 Descrição do Produto:
{descricao_detalhada}

✨ Principais Características:
{caracteristicas}

📏 Especificações:
{especificacoes}

💡 Diferenciais:
{diferenciais}

🎁 Itens Inclusos:
{itens_inclusos}

⚠️ Informações Importantes:
{informacoes_adicionais}

✅ Garantia: {garantia}`,
        variables: [
            'nome_produto',
            'descricao_detalhada',
            'caracteristicas',
            'especificacoes',
            'diferenciais',
            'itens_inclusos',
            'informacoes_adicionais',
            'garantia',
        ],
        usageCount: 0,
        createdAt: new Date().toISOString(),
    },
    4: {
        id: '4',
        title: 'Script para Vídeo do YouTube',
        category: 'Vídeo',
        description: 'Template para roteiro de vídeos do YouTube',
        content: `🎥 Título do Vídeo: {titulo_video}

👋 INTRODUÇÃO:
{introducao}

📝 DESENVOLVIMENTO:
{topico_1}

{topico_2}

{topico_3}

✨ CONCLUSÃO:
{conclusao}

📢 CALL TO ACTION:
{call_to_action}

#️⃣ Tags: {tags}`,
        variables: ['titulo_video', 'introducao', 'topico_1', 'topico_2', 'topico_3', 'conclusao', 'call_to_action', 'tags'],
        usageCount: 0,
        createdAt: new Date().toISOString(),
    },
};

const categories = ['Todos', 'Marketing', 'Redes Sociais', 'E-commerce', 'Vídeo'];
const sortOptions = [
    { value: 'recent', label: 'Mais Recentes' },
    { value: 'usage', label: 'Mais Usados' },
    { value: 'alpha', label: 'Ordem Alfabética' },
];

export default function TemplatesPage() {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('biblioteca');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [sortBy, setSortBy] = useState('recent');
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const tabs = [
        { id: 'biblioteca', label: 'Biblioteca' },
        { id: 'meus', label: 'Meus Templates' },
        { id: 'compartilhados', label: 'Compartilhados' },
    ];

    useEffect(() => {
        if (activeTab !== 'meus') {
            loadTemplates();
        }
    }, [activeTab]);

    const loadTemplates = async () => {
        try {
            setIsLoading(true);
            const db = getFirestore(app);
            const templatesRef = collection(db, 'templates');
            const q = query(templatesRef);
            const querySnapshot = await getDocs(q);

            const loadedTemplates = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Adiciona os templates padrões junto com os do Firebase
            const allTemplates = [...Object.values(defaultTemplates), ...loadedTemplates];

            setTemplates(allTemplates);
        } catch (error) {
            console.error('Erro ao carregar templates:', error);
            // Em caso de erro, carrega apenas os templates padrões
            setTemplates(Object.values(defaultTemplates));
            toast.error('Erro ao carregar alguns templates');
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentTemplates = () => {
        let filteredTemplates = [...templates];

        // Filtra por categoria
        if (selectedCategory !== 'Todos') {
            filteredTemplates = filteredTemplates.filter((t) => t.category === selectedCategory);
        }

        // Filtra por termo de busca
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredTemplates = filteredTemplates.filter(
                (t) => t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term) || t.category.toLowerCase().includes(term)
            );
        }

        // Ordena os templates
        filteredTemplates.sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'usage':
                    return b.usageCount - a.usageCount;
                case 'alpha':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filteredTemplates;
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm('');
        setSelectedCategory('Todos');
        setSortBy('recent');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 pt-24 md:p-8 md:pt-24`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-purple-600 mb-4 md:mb-0">Templates</h1>
                    <Link href="/templates/criar" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Criar Template
                    </Link>
                </div>

                {/* Tabs de navegação */}
                <div className="flex space-x-2 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-purple-600 text-white'
                                    : isDarkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Filtros e busca */}
                {activeTab !== 'meus' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar templates..."
                            className={`px-4 py-2 rounded-lg border ${
                                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        />

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`px-4 py-2 rounded-lg border ${
                                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`px-4 py-2 rounded-lg border ${
                                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Conteúdo da aba */}
                {activeTab === 'meus' ? (
                    <UserTemplates />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="col-span-full flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        ) : templates.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-gray-500">Nenhum template encontrado</p>
                            </div>
                        ) : (
                            getCurrentTemplates().map((template) => (
                                <div
                                    key={template.id}
                                    className={`p-6 rounded-xl ${
                                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                                    } shadow-xl transition-all cursor-pointer`}
                                    onClick={() => router.push(`/templates/usar/${template.id}`)}
                                >
                                    <h3 className="text-xl font-semibold mb-2 text-purple-600">{template.title}</h3>
                                    <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{template.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {template.category}
                                        </span>
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{template.usageCount} usos</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
