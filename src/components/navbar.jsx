'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const isActive = (path) => {
        return pathname === path ? 'text-purple-400' : 'text-white hover:text-purple-400';
    };

    return (
        <nav className="fixed w-full bg-[#16161d]/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-purple-500 neon">
                            Persuasivo
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}>
                                Home
                            </Link>
                            <Link
                                href="/sobre"
                                className={`${isActive('/sobre')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                            >
                                Sobre
                            </Link>
                            <Link
                                href="/contato"
                                className={`${isActive('/contato')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                            >
                                Contato
                            </Link>
                            {currentUser && (
                                <Link
                                    href="/persuasivo"
                                    className={`${isActive('/persuasivo')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                                >
                                    Persuasivo
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {currentUser ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-white text-sm">Olá, {currentUser.displayName || currentUser.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                    >
                                        Sair
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-4 py-2 bg-transparent border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500/10 transition duration-300"
                                    >
                                        Cadastrar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-400 focus:outline-none"
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#16161d]/95">
                    <Link
                        href="/"
                        className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/sobre"
                        className={`${isActive('/sobre')} block px-3 py-2 rounded-md text-base font-medium`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sobre
                    </Link>
                    <Link
                        href="/contato"
                        className={`${isActive('/contato')} block px-3 py-2 rounded-md text-base font-medium`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contato
                    </Link>
                    {currentUser && (
                        <Link
                            href="/persuasivo"
                            className={`${isActive('/persuasivo')} block px-3 py-2 rounded-md text-base font-medium`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Persuasivo
                        </Link>
                    )}
                    {currentUser ? (
                        <div className="px-3 py-2">
                            <span className="text-white text-sm block">Olá, {currentUser.displayName || currentUser.email}</span>
                            <button
                                onClick={handleLogout}
                                className="mt-2 w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Link href="/login" className="block px-3 py-2 text-white hover:text-purple-400" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link href="/signup" className="block px-3 py-2 text-white hover:text-purple-400" onClick={() => setIsMenuOpen(false)}>
                                Cadastrar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
