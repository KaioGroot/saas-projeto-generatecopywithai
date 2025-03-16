'use client';

import { useTheme } from '@/context/ThemeContext';

export default function PrivacyPolicy() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen py-20 transition-colors duration-300 ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                        Política de Privacidade
                    </h1>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="mb-6">Última atualização: {new Date().toLocaleDateString()}</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Informações que Coletamos</h2>
                            <p>Coletamos informações que você nos fornece diretamente ao usar nossos serviços, incluindo:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Informações da conta do Instagram</li>
                                <li>Conteúdo gerado e compartilhado</li>
                                <li>Dados de uso e interação</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Como Usamos suas Informações</h2>
                            <p>Utilizamos as informações coletadas para:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Fornecer e manter nossos serviços</li>
                                <li>Melhorar a experiência do usuário</li>
                                <li>Processar publicações nas redes sociais</li>
                                <li>Enviar notificações importantes</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Compartilhamento de Informações</h2>
                            <p>Não vendemos suas informações pessoais. Compartilhamos informações apenas:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Com seu consentimento explícito</li>
                                <li>Para processar publicações nas redes sociais selecionadas</li>
                                <li>Quando exigido por lei</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Segurança</h2>
                            <p>Implementamos medidas de segurança para proteger suas informações, incluindo:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Criptografia de dados</li>
                                <li>Acesso restrito a dados pessoais</li>
                                <li>Monitoramento regular de segurança</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Seus Direitos</h2>
                            <p>Você tem direito a:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Acessar seus dados</li>
                                <li>Corrigir informações incorretas</li>
                                <li>Solicitar exclusão de dados</li>
                                <li>Retirar consentimento</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Contato</h2>
                            <p>Para questões sobre privacidade, entre em contato:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Email: {process.env.EMAIL}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
