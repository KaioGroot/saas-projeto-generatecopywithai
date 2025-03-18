'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    Squares2X2Icon,
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { currentUser, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    // Detectar scroll para mudar o estilo da navbar
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const menuItems = [
        {
            name: 'Início',
            href: '/',
            icon: HomeIcon,
        },
        {
            name: 'Gerador',
            href: '/persuasivo',
            icon: SparklesIcon,
        },
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Squares2X2Icon,
        },
        {
            name: 'Feedback',
            href: '/feedback',
            icon: ChatBubbleLeftRightIcon,
        },
        {
            name: 'Templates',
            href: '/templates',
            icon: DocumentTextIcon,
        },
        {
            name: 'Preços',
            href: '/pricing',
            icon: Squares2X2Icon,
        },
        {
            name: 'Redes Sociais',
            href: '/social',
            icon: ChatBubbleLeftRightIcon,
        },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? `backdrop-filter backdrop-blur-lg bg-opacity-90 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`
                    : `bg-transparent ${pathname === '/' ? '' : 'backdrop-filter backdrop-blur-lg bg-opacity-60'}`
            } ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <SparklesIcon className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
                                AI Text Generator
                            </span>
                        </Link>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        pathname === item.href
                                            ? `${isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/10 text-purple-600'} shadow-inner`
                                            : `${
                                                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                                              } hover:bg-purple-500/5`
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}

                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                                    } hover:bg-purple-500/5`}
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>Sair</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <UserCircleIcon className="w-5 h-5" />
                                <span>Entrar</span>
                            </Link>
                        )}

                        {/* Botão de alternar tema */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-surface-dark hover:bg-gray-800' : 'bg-surface-light hover:bg-gray-100'
                            } transition-colors`}
                            aria-label="Alternar tema"
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Botão do Menu Mobile */}
                    <div className="md:hidden flex items-center space-x-2">
                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className={`p-2 rounded-lg ${
                                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                                } hover:bg-purple-500/5`}
                            >
                                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                            >
                                <UserCircleIcon className="w-6 h-6" />
                            </Link>
                        )}

                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-surface-dark hover:bg-gray-800' : 'bg-surface-light hover:bg-gray-100'
                            } transition-colors`}
                        >
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg ${
                                isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
                            } transition-colors`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            <motion.div
                initial={false}
                animate={isMenuOpen ? { height: 'auto', opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`md:hidden overflow-hidden backdrop-filter backdrop-blur-lg ${
                    isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
                } shadow-lg rounded-b-lg border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                    pathname === item.href
                                        ? `${isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/10 text-purple-600'} shadow-inner`
                                        : `${
                                              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                                          } hover:bg-purple-500/5`
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </motion.div>
        </nav>
    );
}
