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
