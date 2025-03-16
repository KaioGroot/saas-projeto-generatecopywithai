'use client';

import { useTheme } from '@/context/ThemeContext';
import SocialMediaManager from '@/components/SocialMediaManager';

export default function SocialPage() {
    const { isDarkMode } = useTheme();
    const textoExemplo = 'Este é um exemplo de texto que poderia ser compartilhado nas redes sociais. Você pode personalizar este texto como quiser!';

    return (
        <div className={`min-h-screen py-20 transition-colors duration-300 ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                        Compartilhamento em Redes Sociais
                    </h1>
                    <p className="text-center theme-text-secondary text-xl mb-12">
                        Teste nossa nova funcionalidade de compartilhamento em redes sociais.
                    </p>
                    <SocialMediaManager text={textoExemplo} />
                </div>
            </div>
        </div>
    );
}
