'use client';

import { useState, useEffect, use } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ShareButton from '@/components/ShareButton';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import AdvancedPreview from '@/components/AdvancedPreview';
import AIHelper from '@/components/AIHelper';

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

export default function UsarTemplatePage({ params }) {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const templateId = use(params).id;
    const [template, setTemplate] = useState(null);
    const [variables, setVariables] = useState({});
    const [generatedText, setGeneratedText] = useState('');
    const [previewText, setPreviewText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTemplate();
    }, [templateId]);

    const loadTemplate = async () => {
        try {
            setIsLoading(true);
            const db = getFirestore(app);
            const templateDoc = await getDoc(doc(db, 'templates', templateId));

            let templateData;
            if (templateDoc.exists()) {
                templateData = {
                    id: templateDoc.id,
                    ...templateDoc.data(),
                };
            } else if (defaultTemplates[templateId]) {
                templateData = defaultTemplates[templateId];
            } else {
                toast.error('Template não encontrado');
                router.push('/templates');
                return;
            }

            setTemplate(templateData);
            const initialVariables = {};
            templateData.variables.forEach((variable) => {
                initialVariables[variable] = '';
            });
            setVariables(initialVariables);
            setPreviewText(templateData.content);
        } catch (error) {
            console.error('Erro ao carregar template:', error);
            // Tenta carregar do template padrão em caso de erro
            if (defaultTemplates[templateId]) {
                const templateData = defaultTemplates[templateId];
                setTemplate(templateData);
                const initialVariables = {};
                templateData.variables.forEach((variable) => {
                    initialVariables[variable] = '';
                });
                setVariables(initialVariables);
                setPreviewText(templateData.content);
            } else {
                toast.error('Erro ao carregar template');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVariableChange = (variable, value) => {
        const newVariables = {
            ...variables,
            [variable]: value,
        };
        setVariables(newVariables);
        updatePreview(newVariables);
    };

    const updatePreview = (newVariables) => {
        if (!template) return;

        let text = template.content;
        Object.entries(newVariables).forEach(([variable, value]) => {
            const regex = new RegExp(`{${variable}}`, 'g');
            text = text.replace(regex, value || `{${variable}}`);
        });
        setPreviewText(text);
    };

    const generateText = () => {
        if (!template) return;
        setGeneratedText(previewText);
        toast.success('Texto gerado com sucesso!');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedText);
            toast.success('Texto copiado para a área de transferência!');
        } catch (error) {
            console.error('Erro ao copiar texto:', error);
            toast.error('Erro ao copiar texto');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Template não encontrado</h2>
                <button
                    onClick={() => router.push('/templates')}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Voltar para Templates
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-purple-600">{template.title}</h1>
                        <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{template.description}</p>
                    </div>
                    <ShareButton template={template} generatedText={generatedText} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Seção de Variáveis */}
                    <div>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl mb-6`}>
                            <h2 className="text-xl font-semibold mb-4">Template Original</h2>
                            <div
                                className={`w-full h-[200px] px-4 py-3 rounded-lg border ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                } overflow-y-auto whitespace-pre-wrap`}
                            >
                                {template.content}
                            </div>
                        </div>

                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                            <h2 className="text-xl font-semibold mb-4">Variáveis do Template</h2>
                            <div className="space-y-4">
                                {template.variables.map((variable) => (
                                    <div key={variable}>
                                        <label className="block text-sm font-medium mb-1">
                                            {variable.replace(/_/g, ' ').charAt(0).toUpperCase() + variable.slice(1).replace(/_/g, ' ')}
                                        </label>
                                        <input
                                            type="text"
                                            value={variables[variable] || ''}
                                            onChange={(e) => handleVariableChange(variable, e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                            placeholder={`Digite o valor para ${variable}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={generateText}
                                className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Gerar Texto Final
                            </button>
                        </div>
                    </div>

                    {/* Seção de Preview e Resultado */}
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                        <AdvancedPreview content={generatedText || previewText} onCopy={copyToClipboard} />
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">Assistente de IA</h2>
                            <AIHelper text={generatedText || previewText} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
