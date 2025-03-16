'use client';

import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function Footer() {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`w-full py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo e Descrição */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <Link href="/" className="mb-4">
                        <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Persuasivo</span>
                    </Link>
                    <p className={`max-w-md text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Transforme suas ideias em textos persuasivos com a ajuda da inteligência artificial. Crie conteúdo envolvente e eficaz em
                        questão de segundos.
                    </p>
                </div>

                {/* Links e Navegação */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Produto</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/persuasivo"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Gerador de Textos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/precos"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Preços
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recursos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/blog"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/guias"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Guias
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutoriais"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Tutoriais
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Empresa</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/sobre"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contato"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Contato
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/carreiras"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Carreiras
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacidade"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/termos"
                                    className={`text-sm ${
                                        isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                    } transition-colors duration-200`}
                                >
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Redes Sociais */}
                <div className="flex justify-center space-x-6 mb-8">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                            isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        } transition-colors duration-200`}
                    >
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                            isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        } transition-colors duration-200`}
                    >
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>

                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                            isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        } transition-colors duration-200`}
                    >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8">
                    <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        © 2024 Persuasivo. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
