import { useState } from 'react';

export default function DemoTabs() {
    const [activeTab, setActiveTab] = useState(0);

    const demos = [
        {
            title: 'Posts para Instagram',
            content: 'Gere legendas criativas com hashtags relevantes',
            example: '✨ Novo look para o verão! 🌞\n#moda #verão2024 #estilo',
        },
        {
            title: 'Artigos para Blog',
            content: 'Crie textos longos e bem estruturados',
            example: 'Os 5 principais benefícios da IA para criação de conteúdo...',
        },
        {
            title: 'Descrições de Produto',
            content: 'Gere textos persuasivos para e-commerce',
            example: 'Este vestido estival combina conforto e estilo...',
        },
    ];

    return (
        <div className="theme-surface rounded-xl p-6">
            <div className="flex flex-wrap gap-2 mb-6">
                {demos.map((demo, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === index ? 'bg-primary text-white' : 'theme-bg theme-text hover:bg-opacity-50'
                        }`}
                    >
                        {demo.title}
                    </button>
                ))}
            </div>
            <div className="theme-bg rounded-lg p-6">
                <h3 className="text-lg font-semibold theme-text mb-4">{demos[activeTab].content}</h3>
                <div className="theme-surface rounded-lg p-4 whitespace-pre-wrap">{demos[activeTab].example}</div>
            </div>
        </div>
    );
}
