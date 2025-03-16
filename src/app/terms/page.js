'use client';

import { useTheme } from '@/context/ThemeContext';

export default function TermsOfService() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen py-20 transition-colors duration-300 ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                        Termos de Serviço
                    </h1>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="mb-6">Última atualização: {new Date().toLocaleDateString()}</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                            <p>
                                Ao acessar e usar nossos serviços, você concorda com estes termos de serviço. Se você não concordar com qualquer parte
                                destes termos, não poderá usar nossos serviços.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
                            <p>Fornecemos uma plataforma que permite:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Geração de conteúdo com IA</li>
                                <li>Publicação em redes sociais</li>
                                <li>Agendamento de posts</li>
                                <li>Análise de performance</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Contas de Usuário</h2>
                            <p>Para usar nossos serviços, você deve:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Ter uma conta válida</li>
                                <li>Manter suas credenciais seguras</li>
                                <li>Ser responsável por todas as atividades em sua conta</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Uso Aceitável</h2>
                            <p>Você concorda em não:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Violar leis ou regulamentos</li>
                                <li>Publicar conteúdo ilegal ou ofensivo</li>
                                <li>Interferir com a segurança do serviço</li>
                                <li>Usar o serviço para spam ou assédio</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
                            <p>Todo o conteúdo gerado através de nossa plataforma:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Pertence ao usuário que o gerou</li>
                                <li>Deve respeitar direitos autorais de terceiros</li>
                                <li>Pode ser usado para fins comerciais pelo usuário</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
                            <p>Não nos responsabilizamos por:</p>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Interrupções no serviço</li>
                                <li>Perda de dados</li>
                                <li>Danos indiretos</li>
                                <li>Conteúdo gerado pelos usuários</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Modificações</h2>
                            <p>
                                Reservamos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas aos
                                usuários.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
                            <p>Para questões sobre os termos, entre em contato:</p>
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
