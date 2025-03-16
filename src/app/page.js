'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { CheckIcon } from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Home() {
    const { currentUser } = useAuth();
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const containerRef = useRef(null);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);
    const [showDemo, setShowDemo] = useState(false);

    const words = [
        'Vendas no Automático',
        'O Ápice da Persuasão',
        'Aumente suas Conversões com a Inteligência Artificial!',
        'Facilite a venda de produtos e serviços com IA!',
        'Transforme suas vendas em oportunidades!',
    ];

    const features = [
        {
            title: 'Automação Inteligente',
            description: 'Gere conteúdo persuasivo em segundos usando IA avançada',
            icon: '🤖',
        },
        {
            title: 'Personalização Total',
            description: 'Adapte o tom e estilo para seu público-alvo específico',
            icon: '🎯',
        },
        {
            title: 'Análise de Dados',
            description: 'Insights detalhados sobre o desempenho do seu conteúdo',
            icon: '📊',
        },
        {
            title: 'Multi-idiomas',
            description: 'Suporte para mais de 50 idiomas diferentes',
            icon: '🌎',
        },
        {
            title: 'Templates Prontos',
            description: 'Biblioteca com centenas de modelos pré-otimizados',
            icon: '📝',
        },
        {
            title: 'Integração Total',
            description: 'Conecte-se com suas ferramentas favoritas',
            icon: '🔄',
        },
    ];

    const testimonials = [
        {
            name: 'Ana Silva',
            role: 'Marketing Manager',
            company: 'Tech Solutions',
            image: '/testimonials/ana.jpg',
            text: 'Aumentamos nossas conversões em 150% no primeiro mês!',
        },
        {
            name: 'Carlos Santos',
            role: 'E-commerce Owner',
            company: 'Mega Store',
            image: '/testimonials/carlos.jpg',
            text: 'A melhor ferramenta de copywriting que já usei!',
        },
        {
            name: 'Mariana Costa',
            role: 'Social Media Manager',
            company: 'Digital Agency',
            image: '/testimonials/mariana.jpg',
            text: 'Economizamos 20 horas por semana na criação de conteúdo.',
        },
    ];

    const metrics = [
        { value: '2M+', label: 'Textos Gerados' },
        { value: '98%', label: 'Satisfação' },
        { value: '150%', label: 'Aumento em Vendas' },
        { value: '10k+', label: 'Usuários Ativos' },
    ];

    const faqs = [
        {
            question: 'Como funciona a geração de conteúdo?',
            answer: 'Nossa plataforma utiliza IA avançada para criar conteúdo personalizado baseado nas suas necessidades. Basta inserir algumas informações sobre seu objetivo e público-alvo.',
        },
        {
            question: 'Posso personalizar o tom de voz?',
            answer: 'Sim! Você pode ajustar o tom, estilo e formato do conteúdo para que combine perfeitamente com sua marca e público-alvo.',
        },
        {
            question: 'Quanto tempo leva para gerar conteúdo?',
            answer: 'A maioria dos conteúdos é gerada em segundos. Para projetos mais complexos, pode levar alguns minutos para garantir a melhor qualidade.',
        },
        {
            question: 'Preciso ter experiência em marketing?',
            answer: 'Não! Nossa plataforma foi projetada para ser intuitiva e fácil de usar, independentemente do seu nível de experiência.',
        },
    ];

    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 100;
        const pauseTime = 2000;

        const type = () => {
            const current = words[index];

            if (isDeleting) {
                setText(current.substring(0, text.length - 1));
                if (text === '') {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                setText(current.substring(0, text.length + 1));
                if (text === current) {
                    setIsDeleting(true);
                }
            }
        };

        const timer = setTimeout(type, typeSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index, words]);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Função para lidar com o início gratuito
    const handleStartFree = () => {
        console.log('Current user status:', currentUser);
        router.push('/dashboard');
    };

    // Função para mostrar demonstração
    const handleShowDemo = () => {
        setShowDemo(true);
        // Scroll suave até a seção de demonstração após um pequeno delay para garantir que a seção existe
        setTimeout(() => {
            const demoSection = document.getElementById('demo-section');
            if (demoSection) {
                demoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    // Função para iniciar plano
    const handleStartPlan = (planType) => {
        console.log('Current user status:', currentUser);

        switch (planType) {
            case 'basic':
                router.push('/dashboard?plano=basic');
                break;
            case 'pro':
                router.push('/dashboard?plano=pro');
                break;
            case 'enterprise':
                router.push('/dashboard?plano=enterprise');
                break;
            default:
                router.push('/dashboard');
                break;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
            {/* Hero Section com padding ajustado */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Seção principal">
                {/* Background com gradiente melhorado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-purple-800/30 dark:from-purple-600/20 dark:via-purple-500/10 dark:to-purple-800/20 animate-gradient" />

                {/* Partículas animadas otimizadas */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-purple-600/20"
                            initial={{
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                            }}
                            animate={{
                                x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                                y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{
                                width: `${Math.random() * 20 + 10}px`,
                                height: `${Math.random() * 20 + 10}px`,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div className="mb-6 relative" whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-800 bg-clip-text text-transparent">
                                {text}
                                <span className="animate-pulse">|</span>
                            </h1>
                            {/* Badge de destaque */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 text-sm px-3 py-1 rounded-full transform rotate-12"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 }}
                            >
                                🚀 Novo!
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl theme-text-secondary mb-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Transforme suas ideias em conteúdo persuasivo com o poder da Inteligência Artificial
                        </motion.p>

                        {/* Botões com funcionalidade */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                onClick={handleStartFree}
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary px-8 py-4 text-lg rounded-full shadow-lg relative overflow-hidden group"
                            >
                                <span className="relative z-10">Comece Gratuitamente</span>
                                <div className="absolute inset-0 bg-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </motion.button>

                            <motion.button
                                onClick={handleShowDemo}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary px-8 py-4 text-lg rounded-full group relative overflow-hidden"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors">Ver Demonstração</span>
                                <div className="absolute inset-0 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </motion.button>
                        </div>

                        {/* Social Proof */}
                        <motion.div
                            className="mt-12 flex flex-wrap justify-center items-center gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800" />
                                    ))}
                                </div>
                                <span className="text-sm theme-text-secondary">+1000 usuários ativos</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                <span className="text-sm theme-text-secondary">4.9/5 média de avaliações</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Estatísticas de Impacto */}
            <section className="py-20 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Estatísticas de Impacto
                        </h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">
                            Descubra o impacto que nossa plataforma pode ter no seu negócio
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900"
                        >
                            <h3 className="text-3xl font-bold theme-text mb-2">80%</h3>
                            <p className="theme-text-secondary">Redução no tempo de criação de conteúdo</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900"
                        >
                            <h3 className="text-3xl font-bold theme-text mb-2">95%</h3>
                            <p className="theme-text-secondary">Aumento no engajamento do público</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900"
                        >
                            <h3 className="text-3xl font-bold theme-text mb-2">70%</h3>
                            <p className="theme-text-secondary">Redução nos custos de marketing</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="theme-bg py-16 border-y theme-border">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                    {metric.value}
                                </div>
                                <div className="theme-text-secondary text-lg">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Como Funciona Section */}
            <section className="py-20 bg-gradient-to-b from-transparent to-purple-50/50 dark:to-purple-950/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Como Funciona
                        </h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">Veja como é fácil começar a usar nossa plataforma</p>
                    </motion.div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Linha do tempo central com gradiente */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-purple-500 to-purple-800 rounded-full" />

                        <div className="space-y-24">
                            {[
                                {
                                    step: 1,
                                    title: 'Crie uma Conta',
                                    description: 'Comece sua jornada criando uma conta gratuita em nossa plataforma. É rápido e fácil!',
                                    icon: '👤',
                                    features: ['Processo simplificado', 'Sem cartão de crédito', 'Ativação instantânea'],
                                },
                                {
                                    step: 2,
                                    title: 'Escolha um Plano',
                                    description: 'Selecione o plano que melhor atende suas necessidades e objetivos de negócio.',
                                    icon: '📦',
                                    features: ['Planos flexíveis', 'Upgrade a qualquer momento', 'Cancele quando quiser'],
                                },
                                {
                                    step: 3,
                                    title: 'Gere Conteúdo',
                                    description: 'Use nossa IA avançada para criar conteúdo persuasivo e envolvente em segundos.',
                                    icon: '📝',
                                    features: ['Interface intuitiva', 'Resultados instantâneos', 'Personalização avançada'],
                                },
                                {
                                    step: 4,
                                    title: 'Publique e Compartilhe',
                                    description: 'Compartilhe seu conteúdo otimizado em qualquer plataforma e alcance seu público.',
                                    icon: '🌍',
                                    features: ['Exportação facilitada', 'Múltiplos formatos', 'Integração com redes sociais'],
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''} relative`}
                                >
                                    {/* Conteúdo */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="p-8 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-3xl text-white shadow-lg">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-purple-600 dark:text-purple-400 font-medium">Etapa {item.step}</p>
                                                </div>
                                            </div>
                                            <p className="theme-text-secondary mb-6">{item.description}</p>
                                            <ul className="space-y-2">
                                                {item.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 theme-text-secondary">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>

                                    {/* Círculo central com número */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-xl font-bold text-white shadow-lg border-4 border-white dark:border-gray-900"
                                        >
                                            {item.step}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gradient-to-b from-transparent to-purple-50/50 dark:to-purple-950/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Recursos Poderosos
                        </h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">
                            Descubra como nossa plataforma pode transformar sua produção de conteúdo
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
                            >
                                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="theme-text-secondary">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section com botões funcionais */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Planos e Preços
                        </h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">Escolha o plano ideal para suas necessidades</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Plano Básico */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white backdrop-blur-sm border border-purple-500 hover:border-purple-300 transition-all duration-300"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold theme-text mb-4">Básico</h3>
                                <div className="text-4xl font-bold theme-text mb-2">
                                    R$ 0<span className="text-lg font-normal theme-text-secondary">/mês</span>
                                </div>
                                <p className="theme-text-secondary">Para começar a explorar</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    100 gerações por mês
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Recursos básicos
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Suporte por email
                                </li>
                            </ul>
                            <button onClick={() => handleStartPlan('basic')} className="w-full btn-secondary">
                                Começar Grátis
                            </button>
                        </motion.div>

                        {/* Plano Pro */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white backdrop-blur-sm border border-purple-500 hover:border-purple-300 transition-all duration-300"
                        >
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-medium">Mais Popular</span>
                            </div>
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold theme-text mb-4">Pro</h3>
                                <div className="text-4xl font-bold theme-text mb-2">
                                    R$ 97
                                    <span className="text-lg font-normal theme-text-secondary">/mês</span>
                                </div>
                                <p className="theme-text-secondary">Para profissionais</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Gerações ilimitadas
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Todos os recursos
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Suporte prioritário
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    API Access
                                </li>
                            </ul>
                            <button onClick={() => handleStartPlan('pro')} className="w-full btn-primary">
                                Começar Agora
                            </button>
                        </motion.div>

                        {/* Plano Enterprise */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white backdrop-blur-sm border border-purple-500 hover:border-purple-300 transition-all duration-300"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold theme-text mb-4">Enterprise</h3>
                                <div className="text-4xl font-bold theme-text mb-2">Personalizado</div>
                                <p className="theme-text-secondary">Para grandes empresas</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Soluções personalizadas
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Gerente dedicado
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    SLA garantido
                                </li>
                                <li className="flex items-center theme-text">
                                    <CheckIcon className="w-5 h-5 text-primary mr-3" />
                                    Treinamento exclusivo
                                </li>
                            </ul>
                            <button onClick={() => handleStartPlan('enterprise')} className="w-full btn-secondary">
                                Falar com Vendas
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="theme-bg py-20 border-y theme-border">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <h2 className="text-4xl font-bold theme-text mb-4">O que nossos clientes dizem</h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">Histórias reais de sucesso de quem já usa nossa plataforma</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="theme-surface p-8 rounded-2xl"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                        <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold theme-text">{testimonial.name}</h4>
                                        <p className="theme-text-secondary text-sm">
                                            {testimonial.role} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="theme-text-secondary italic">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gradient-to-b from-transparent to-purple-50/50 dark:to-purple-950/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Perguntas Frequentes
                        </h2>
                        <p className="theme-text-secondary text-xl max-w-2xl mx-auto">Tire suas dúvidas sobre nossa plataforma</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="mb-6"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                                    <span className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 theme-text-secondary bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm rounded-b-xl border-x border-b border-purple-100 dark:border-purple-900">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section com botão funcional */}
            <section className="theme-bg py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        className="theme-surface rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold theme-text mb-4">Pronto para revolucionar seu conteúdo?</h2>
                            <p className="theme-text-secondary text-xl mb-8 max-w-2xl mx-auto">
                                Comece agora mesmo com nosso plano gratuito. Sem compromisso.
                            </p>
                            <motion.button
                                onClick={handleStartFree}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary px-10 py-4 text-xl rounded-full shadow-lg"
                            >
                                Criar Conta Gratuita
                            </motion.button>
                            <p className="mt-4 theme-text-secondary">Não é necessário cartão de crédito</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Seção de Demonstração */}
            {showDemo && (
                <section id="demo-section" className="py-20 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                Veja como funciona
                            </h2>
                            <p className="theme-text-secondary text-xl max-w-2xl mx-auto">
                                Assista ao vídeo de demonstração e descubra como nossa plataforma pode transformar seu negócio
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/seu-video-id"
                                    title="Demonstração da Plataforma"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-purple-900"
                                >
                                    <div className="text-3xl mb-4">🚀</div>
                                    <h3 className="text-xl font-semibold mb-2">Rápido e Fácil</h3>
                                    <p className="theme-text-secondary">Gere conteúdo em segundos com nossa interface intuitiva</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-purple-900"
                                >
                                    <div className="text-3xl mb-4">🎯</div>
                                    <h3 className="text-xl font-semibold mb-2">Personalizado</h3>
                                    <p className="theme-text-secondary">Conteúdo adaptado ao seu público e marca</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-purple-100 dark:border-purple-900"
                                >
                                    <div className="text-3xl mb-4">📈</div>
                                    <h3 className="text-xl font-semibold mb-2">Resultados</h3>
                                    <p className="theme-text-secondary">Acompanhe métricas e otimize seu desempenho</p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12 text-center"
                            >
                                <button onClick={handleStartFree} className="btn-primary px-8 py-4 text-lg rounded-full shadow-lg">
                                    Experimente Agora
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-12 border-t border-purple-100 dark:border-purple-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                SaaS AI
                            </h3>
                            <p className="theme-text-secondary mb-4 max-w-md">
                                Transforme sua produção de conteúdo com o poder da Inteligência Artificial.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                    Twitter
                                </a>
                                <a href="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                    LinkedIn
                                </a>
                                <a href="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                    Instagram
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Produto</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        Recursos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        Preços
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Empresa</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        Sobre
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="theme-text-secondary hover:text-purple-600 dark:hover:text-purple-400">
                                        Contato
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-purple-100 dark:border-purple-900 text-center theme-text-secondary">
                        <p>&copy; 2024 SaaS AI. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
