import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Mouse from '@/components/mouse';
import Footer from '@/components/footer';
import Carousel from '@/components/carousel';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    title: 'IA Persuasiva - Transforme suas vendas com Inteligência Artificial',
    description:
        'Crie conteúdo persuasivo e aumente suas vendas usando o poder da Inteligência Artificial. Gere textos, vídeos e imagens otimizados para conversão.',
    keywords: 'IA, inteligência artificial, vendas, marketing, copywriting, automação, persuasão',
    authors: [{ name: 'IA Persuasiva', url: 'https://iapersuasiva.com.br' }],
    creator: 'IA Persuasiva',
    publisher: 'IA Persuasiva',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://iapersuasiva.com.br',
        site_name: 'IA Persuasiva',
        title: 'IA Persuasiva - Transforme suas vendas com Inteligência Artificial',
        description: 'Crie conteúdo persuasivo e aumente suas vendas usando o poder da Inteligência Artificial.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'IA Persuasiva Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@iapersuasiva',
        creator: '@iapersuasiva',
        title: 'IA Persuasiva - Transforme suas vendas com Inteligência Artificial',
        description: 'Crie conteúdo persuasivo e aumente suas vendas usando o poder da Inteligência Artificial.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#8b5cf6" />
                <meta name="msapplication-TileColor" content="#8b5cf6" />

                {/* Preload Fonts */}
                <link rel="preload" href="/fonts/JetBrainsMono.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

                {/* Schema.org markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'IA Persuasiva',
                        url: 'https://iapersuasiva.com.br',
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: 'https://iapersuasiva.com.br/search?q={search_term_string}',
                            'query-input': 'required name=search_term_string',
                        },
                    })}
                </script>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <AuthProvider>
                        <Navbar />
                        <Mouse />
                        {children}
                        <Footer />
                        <Toaster position="top-right" />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
