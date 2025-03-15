import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Mouse from '@/components/mouse';
import Footer from '@/components/footer';
import Carousel from '@/components/carousel';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    title: 'SaaS Projeto',
    description: 'Projeto SaaS com Next.js',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AuthProvider>
                    <Navbar />
                    <Mouse />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
