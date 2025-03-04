'use client';
import Image from 'next/image';
import Sobreloja from '@/sobreloja/page';
import Gerarprompt from '@/action/gerarprompt';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const words = [
            'Vendas no Automático',
            'O Ápice da Persuasão',
            'Aumente suas Conversões com a Inteligência Artificial!',
            'Facilite a venda de produtos e serviços com inteligência artificial!',
            'Transforme suas vendas em oportunidades de negócios!',
            'Aumente suas conversões com conteúdos criados para engajar e converter seu público-alvo!',
        ];
        let i = 0;
        let j = 0;
        let currentWord = '';
        let isDeleting = false;

        function type() {
            currentWord = words[i];
            if (isDeleting) {
                document.getElementById('typewriter').textContent = currentWord.substring(0, j - 1);
                j--;
                if (j == 0) {
                    isDeleting = false;
                    i++;
                    if (i == words.length) {
                        i = 0;
                    }
                }
            } else {
                document.getElementById('typewriter').textContent = currentWord.substring(0, j + 1);
                j++;
                if (j == currentWord.length) {
                    isDeleting = true;
                }
            }
            setTimeout(type, 60);
        }

        type();
    }, []);

    const benefits = [
        {
            title: 'Geração Instantânea de Copy Persuasiva',
            description:
                'A IA cria textos persuasivos em segundos, permitindo que você lance campanhas rapidamente e aproveite oportunidades de mercado sem atrasos.',
            icon: '⚡',
        },
        {
            title: 'Copy Personalizada para Cada Público',
            description:
                'Com a capacidade de segmentar diferentes audiências, a IA gera mensagens personalizadas que ressoam com as necessidades e desejos específicos de cada grupo.',
            icon: '🎯',
        },
        {
            title: 'Otimização Baseada em Dados',
            description:
                'A IA analisa continuamente o desempenho das copys, ajustando automaticamente o conteúdo para maximizar taxas de conversão e engajamento.',
            icon: '📈',
        },
        {
            title: 'Consistência e Coerência na Mensagem',
            description:
                'A IA garante que sua comunicação seja consistente em todos os canais, reforçando a identidade da sua marca e aumentando a confiança do consumidor.',
            icon: '🔄',
        },
        {
            title: 'Insights Profundos sobre o Comportamento do Consumidor',
            description:
                'A IA fornece análises detalhadas sobre o comportamento do consumidor, permitindo que você tome decisões estratégicas informadas e melhore suas campanhas.',
            icon: '📊',
        },
        {
            title: 'Escalabilidade Sem Compromissos',
            description:
                'A IA permite que você escale suas operações de copywriting sem sacrificar a qualidade, atendendo a uma demanda crescente por conteúdo persuasivo.',
            icon: '🌐',
        },
        {
            title: 'Testes A/B Automatizados',
            description:
                'A IA pode realizar testes A/B em tempo real, identificando rapidamente quais versões de copy geram melhores resultados e otimizando suas campanhas instantaneamente.',
            icon: '🔍',
        },
        {
            title: 'Acessibilidade e Custo-Efetividade',
            description:
                'Implementar uma IA para geração de copy reduz custos com redatores e permite que pequenas empresas tenham acesso a conteúdo de alta qualidade.',
            icon: '💰',
        },
    ];

    useEffect(() => {
        const animadoElements = document.querySelectorAll('.animado');
        animadoElements.forEach((element) => {
            let xPos = 0;
            let yPos = 0;
            const updatePosition = () => {
                xPos += Math.random() * 100 - 50;
                yPos += Math.random() * 100 - 50;
                element.style.transform = `translate(${xPos}px, ${yPos}px)`;
                element.style.transition = 'transform 3.5s ease-in-out';
            };
            const intervalId = setInterval(updatePosition, 4000);
            return () => clearInterval(intervalId); // cleanup on unmount
        });
    }, []);

    useEffect(() => {
        const scrollElements = document.querySelectorAll('.scroll-animado');
        window.addEventListener('scroll', () => {
            scrollElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.pageYOffset;
                const windowBottom = window.innerHeight + window.pageYOffset;
                const offset = 100;
                if (elementTop < windowBottom + offset) {
                    element.classList.add('scroll-animado-active');
                } else {
                    element.classList.remove('scroll-animado-active');
                }
            });
        });
    }, []);
    return (
        <>
            <div className="area">
                <header className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 px-6 py-8">
                    <div class="animado transition-all absolute top-[30%] -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-70 rounded-full blur-3xl "></div>
                    <div class="animado absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-60 rounded-full blur-3xl"></div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Conversões com I.A</span>
                        <br />
                        <span id="typewriter" className="text-2xl sm:text-1xl text-gray-300 block mt-2">
                            Aumente suas conversões e impulsione seu negócio com conteúdos criados especificamente para engajar e converter seu
                            público-alvo.
                        </span>
                    </h1>
                    <div className="w-full max-w-5xl mt-6 z-40">
                        <Sobreloja />
                    </div>

                    <div className="mt-6">
                        <button className="bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-pink-700">
                            QUERO TER ACESSO AO PERSUASIVO
                        </button>
                    </div>
                    <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </header>
            </div>

            <section className="scroll-animado bg-gray-950 text-white py-40 px-10 font-mono flex flex-col justify-center min-h-screen ">
                <div className="container mx-auto text-center px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Empresas Bilionárias que Utilizam{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">I.A</span> nos Seus Projetos
                    </h2>
                    <style jsx>{`
                        .logos {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                            align-items: center;
                            margin-top: 2rem;
                        }
                        .logos svg {
                            width: 100px;
                            height: 100px;
                            margin: 1rem;
                        }
                    `}</style>
                    <div className="logos gap-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 30 30"
                            stroke="#fff"
                            fill="white"
                        >
                            <path
                                fill="#1d1d1b"
                                d="M3.859,7.812L2.782,6.378C2.66,6.216,2.727,5.982,2.92,5.916C4.255,5.457,8.968,4,15,4	c6.028,0,10.734,1.495,12.067,1.965c0.192,0.068,0.257,0.302,0.133,0.463l-1.059,1.386c-0.083,0.108-0.22,0.15-0.345,0.098	C24.865,7.527,20.805,6,15,6C9.204,6,5.141,7.526,4.206,7.912C4.079,7.964,3.941,7.921,3.859,7.812z"
                            ></path>
                            <path
                                fill="#1d1d1b"
                                fill-rule="evenodd"
                                d="M24.434,9.094c-2.986-1.377-5.878-1.649-7.917-1.601	c-0.152,0.004-0.287,0.077-0.379,0.198L15.07,9.095l-1.069-1.404c-0.092-0.121-0.227-0.194-0.379-0.198	c-2.039-0.048-4.931,0.225-7.917,1.601C5.538,9.171,5.491,9.383,5.577,9.545c0.331,0.625,1.127,1.487,1.908,1.824	c0.168,0.073,0.375-0.023,0.403-0.204C8.135,9.537,11.14,9.5,11.14,9.5l3.154,15.85c0.157,0.863,1.394,0.863,1.551,0L19,9.5	c0,0,3.004,0.037,3.252,1.666c0.028,0.181,0.237,0.283,0.403,0.204c0.633-0.302,1.56-1.118,1.908-1.824	C24.644,9.38,24.601,9.171,24.434,9.094z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 30 30"
                            fill="white"
                            stroke="#fff"
                        >
                            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 50 50"
                            stroke="#fff"
                            fill="white"
                        >
                            <path d="M 19.042969 9.0039062 C 18.490969 9.0039062 18.042969 9.4529062 18.042969 10.003906 L 18.042969 12.103516 C 18.696969 12.037516 19.364922 12.003906 20.044922 12.003906 C 28.212922 12.003906 34.196719 16.598641 38.761719 21.306641 C 39.117719 21.674641 39.138547 22.253484 38.810547 22.646484 C 34.000547 28.396484 28.039969 33.003906 21.042969 33.003906 L 20.992188 33.003906 C 19.952871 32.95194 18.969476 32.811633 18.041016 32.587891 L 18.041016 29.492188 C 18.959538 29.815807 19.9597 30.001953 21.041016 30.001953 C 25.149016 30.001953 30.840016 26.681953 34.041016 22.001953 C 31.516016 18.764953 24.813016 15.001953 20.041016 15.001953 C 19.382278 15.001953 18.714662 15.059411 18.042969 15.166016 L 18.042969 12.103516 C 11.047969 12.806516 5.3514375 17.086375 0.3984375 21.234375 C 0.0784375 21.502375 -0.04134375 21.942937 0.09765625 22.335938 C 2.9324519 30.361359 9.160085 37.462465 18.039062 38.783203 L 18.041016 41.001953 C 18.041016 41.553953 18.489016 42.000953 19.041016 42.001953 L 49.042969 42.001953 C 49.593969 42.001953 50.042969 41.553953 50.042969 41.001953 L 50.042969 10.003906 C 50.042969 9.4529063 49.593969 9.0039062 49.042969 9.0039062 L 19.042969 9.0039062 z M 18.039062 15.166016 L 18.039062 18.052734 C 14.690451 18.383832 11.487968 20.319047 8.453125 22.533203 C 8.065125 22.816203 7.9336719 23.336531 8.1386719 23.769531 C 10.369364 28.48588 13.577025 31.510501 18.039062 32.587891 L 18.039062 35.605469 C 11.520701 33.935724 5.2198607 27.376551 4.0429688 23.001953 C 7.8949945 19.427857 13.093186 15.948183 18.039062 15.166016 z M 19.041016 18.001953 C 23.171016 18.001953 26.471234 19.068109 28.740234 21.287109 L 24.041016 25.001953 C 23.462016 23.390953 21.397016 21.001953 19.041016 21.001953 C 18.7242 21.001953 18.388594 21.041844 18.042969 21.109375 L 18.042969 18.052734 C 18.373685 18.018998 18.706322 18.001953 19.041016 18.001953 z M 18.039062 21.111328 L 18.039062 29.492188 C 15.255948 28.508864 13.234724 26.248491 12.042969 24.001953 C 13.629905 22.926674 16.024902 21.505445 18.039062 21.111328 z M 40.042969 26.003906 L 45.734375 29.726562 C 40.602375 34.646563 31.033969 39.003906 21.042969 39.003906 C 20.011642 39.003906 19.009426 38.927019 18.041016 38.783203 L 18.041016 35.605469 C 19.042395 35.862162 20.04859 36.003906 21.042969 36.003906 C 27.941969 36.003906 35.529969 30.651906 40.042969 26.003906 z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 30 30"
                            stroke="#fff"
                            fill="white"
                        >
                            <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z M 6 16 C 4.895 16 4 16.895 4 18 L 4 24 C 4 25.105 4.895 26 6 26 L 12 26 C 13.105 26 14 25.105 14 24 L 14 18 C 14 16.895 13.105 16 12 16 L 6 16 z M 18 16 C 16.895 16 16 16.895 16 18 L 16 24 C 16 25.105 16.895 26 18 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 18 C 26 16.895 25.105 16 24 16 L 18 16 z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 50 50"
                            stroke="#fff"
                            fill="white"
                        >
                            <path d="M 14.5 20 C 14.222656 20 14 20.222656 14 20.5 L 14 29.5 C 14 29.777344 14.222656 30 14.5 30 L 21 30 C 22.207031 30 24 29.199219 24 27 C 24 25.722656 23.390625 24.929688 22.652344 24.480469 C 22.863281 24.078125 23 23.59375 23 23 C 23 20.800781 21.207031 20 20 20 Z M 28.5 20 C 28.222656 20 28 20.222656 28 20.5 L 28 29.5 C 28 29.777344 28.222656 30 28.5 30 L 35.886719 30 C 35.996094 30 36.101563 29.9375 36.152344 29.832031 L 36.988281 28.140625 C 37.023438 28.078125 36.976563 28 36.902344 28 L 30 28 L 30 26.5 C 30 26.222656 30.222656 26 30.5 26 L 33.875 26 C 33.988281 26 34.089844 25.9375 34.140625 25.832031 L 34.988281 24.144531 C 35.023438 24.078125 34.972656 24 34.902344 24 L 30 24 L 30 22 L 35.859375 22 C 35.96875 22 36.070313 21.9375 36.125 21.839844 L 36.988281 20.144531 C 37.023438 20.078125 36.976563 20 36.902344 20 Z M 40.496094 20 C 40.21875 20 40 20.222656 40 20.5 L 40 29.699219 C 40 29.863281 40.136719 30 40.300781 30 L 42 30 L 42 28 C 42 27.449219 42.449219 27 43 27 L 45.984375 27 L 47.683594 29.847656 C 47.738281 29.941406 47.835938 30 47.941406 30 L 49.902344 30 C 49.976563 30 50.023438 29.917969 49.984375 29.847656 L 48.105469 26.660156 C 49.285156 26.140625 50 25.019531 50 23.5 C 50 21.375 48.625 20 46.5 20 Z M 0.300781 20.074219 C 0.136719 20.074219 0 20.210938 0 20.375 L 0 26 C 0 27.511719 1.046875 30.375 5 30.375 C 8.953125 30.375 10 27.511719 10 26 L 10 20.074219 L 8.300781 20.074219 C 8.136719 20.074219 8 20.210938 8 20.375 L 8 25.988281 C 7.992188 26.386719 7.8125 28.375 5 28.375 C 2.1875 28.375 2.007813 26.390625 2 26 L 2 20.074219 Z M 16 22 L 19.988281 22 C 20.449219 22.011719 21 22.195313 21 23 C 21 23.746094 20.527344 23.957031 20.101563 23.996094 C 20.046875 23.996094 20.023438 23.996094 19.988281 24 L 16 24 Z M 42 22 L 46.5 22 C 47.84375 22 48 22.855469 48 23.5 C 48 24.144531 47.84375 25 46.5 25 L 42 25 Z M 16.5 26 L 20.988281 26 C 21.449219 26.011719 22 26.195313 22 27 C 22 27.804688 21.449219 27.988281 20.988281 28 L 16 28 L 16 26.5 C 16 26.222656 16.222656 26 16.5 26 Z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="#F2F2F2">
                            <path d="M 4.75 19 C 5.4375 19 6.171875 19 6.855469 19 C 6.847656 23.183594 6.839844 27.371094 6.835938 31.554688 C 6.097656 31.632813 5.289063 31.734375 4.558594 31.816406 C 3.621094 29.195313 3.042969 27.566406 2.101563 24.804688 C 2.101563 27.609375 2.097656 29.335938 2.097656 32.140625 C 1.414063 32.226563 0.683594 32.320313 0 32.417969 C 0 27.945313 0 23.472656 0 19 C 0.769531 19 1.25 19 2.019531 19 C 2.929688 21.9375 3.835938 23.785156 4.738281 26.578125 C 4.742188 23.714844 4.746094 21.863281 4.75 19 Z M 14.730469 21.074219 C 14.730469 20.46875 14.71875 19.601563 14.71875 19 C 12.765625 19 10.839844 19 8.886719 19 C 8.878906 23.125 8.871094 27.253906 8.863281 31.378906 C 10.8125 31.203125 12.765625 31.058594 14.71875 30.945313 C 14.722656 30.339844 14.722656 29.472656 14.722656 28.871094 C 13.453125 28.949219 12.238281 29.027344 10.96875 29.113281 C 10.972656 28.007813 10.972656 27.089844 10.976563 25.980469 C 11.902344 25.964844 12.878906 25.976563 13.824219 25.960938 C 13.824219 25.355469 13.828125 24.484375 13.828125 23.878906 C 12.890625 23.894531 11.902344 23.898438 10.980469 23.914063 C 10.980469 22.804688 10.984375 22.195313 10.988281 21.085938 C 11.566406 21.078125 14.246094 21.078125 14.730469 21.074219 Z M 16.082031 21.070313 C 16.175781 21.070313 18.199219 21.082031 18.269531 21.082031 C 18.265625 24.410156 18.261719 27.445313 18.257813 30.773438 C 18.945313 30.746094 19.679688 30.726563 20.367188 30.710938 C 20.367188 27.402344 20.371094 24.382813 20.375 21.074219 C 21.101563 21.070313 21.851563 21.066406 22.574219 21.066406 C 22.574219 20.476563 22.578125 19.601563 22.578125 19.011719 C 20.4375 19.011719 18.222656 19.011719 16.085938 19.011719 C 16.085938 19.609375 16.082031 20.472656 16.082031 21.070313 Z M 29.800781 19 C 27.847656 19 25.894531 19 23.945313 19 C 23.941406 22.882813 23.941406 26.769531 23.941406 30.652344 C 24.167969 30.652344 24.398438 30.652344 24.628906 30.652344 C 25.09375 30.652344 25.566406 30.652344 26.027344 30.65625 C 26.027344 29.007813 26.027344 27.503906 26.027344 25.855469 C 26.140625 25.855469 28.601563 25.851563 28.878906 25.855469 C 28.878906 25.265625 28.878906 24.386719 28.875 23.796875 C 28.613281 23.792969 26.132813 23.796875 26.027344 23.796875 C 26.027344 22.734375 26.023438 22.136719 26.023438 21.078125 C 26.253906 21.078125 29.230469 21.078125 29.800781 21.082031 C 29.800781 20.488281 29.800781 19.59375 29.800781 19 Z M 33.261719 28.773438 C 33.257813 25.414063 33.277344 22.367188 33.269531 19.007813 C 32.585938 19.007813 31.851563 19.007813 31.164063 19.007813 C 31.171875 22.929688 31.152344 26.851563 31.15625 30.773438 C 33.027344 30.84375 34.996094 30.917969 36.867188 31.050781 C 36.863281 30.445313 36.863281 29.578125 36.863281 28.976563 C 35.679688 28.90625 34.445313 28.820313 33.261719 28.773438 Z M 38.617188 31.175781 C 39.304688 31.230469 40.011719 31.285156 40.699219 31.347656 C 40.699219 27.238281 40.707031 23.121094 40.699219 19.011719 C 40.011719 19.011719 39.277344 19.011719 38.59375 19.011719 C 38.601563 23.066406 38.609375 27.121094 38.617188 31.175781 Z M 47.246094 25.328125 C 48.136719 23.222656 49.042969 21.214844 49.96875 19.011719 C 49.210938 19.011719 48.429688 19.011719 47.667969 19.011719 C 47.097656 20.371094 46.707031 21.246094 46.160156 22.542969 C 45.652344 21.195313 45.3125 20.320313 44.800781 19.011719 C 44.042969 19.011719 43.261719 19.011719 42.503906 19.011719 C 43.34375 21.0625 44.113281 23.117188 44.96875 25.296875 C 44.082031 27.386719 43.175781 29.464844 42.289063 31.472656 C 43.023438 31.542969 43.785156 31.648438 44.519531 31.730469 C 45.046875 30.441406 45.523438 29.445313 46.054688 28.117188 C 46.578125 29.53125 47.058594 30.625 47.585938 32.082031 C 48.316406 32.179688 49.269531 32.316406 50 32.417969 C 49.113281 30.046875 48.140625 27.574219 47.246094 25.328125 Z"></path>
                        </svg>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
                        {benefits.map(function (benefit) {
                            return (
                                <div key={benefit.title} className="bg-gray-800 p-6 rounded-lg shadow-md mt-10">
                                    <p className="text-4xl font-bold mb-2">{benefit.icon}</p>
                                    <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-lg">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-10 flex justify-center align-center items-center">
                        <a
                            href="https://api.whatsapp.com/send?phone=5511950162000&text=Ol%C3%A1%2C+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+a+loja"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-transparent border border-blue-400 hover:bg-blue-700 shadow-md shadow-blue-500 text-xl text-blue-100 font-bold py-4 px-4 rounded-full"
                        >
                            QUERO TER ACESSO AO PERSUASIVO
                        </a>
                    </div>
                </div>
            </section>

            <div class="min-h-screen flex flex-col justify-center text-center grid-cols-10 p-20 mx-auto w-full md:grid bg-gradient-to-t backdrop-blur-sm from-purple-950 to-gray-950">
                <div class="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-70 rounded-full blur-3xl "></div>
                <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-60 rounded-full blur-3xl"></div>

                <div class="flex md:contents flex-row-reverse  ">
                    <div class="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-1 col-end-4 mr-auto md:mr-0 md:ml-auto">
                        <h3 class="text-lg font-semibold lg:text-xl">Aumente suas Vendas com IA</h3>
                        <p class="mt-2 leading-6">
                            Imagine ter uma ferramenta que cria textos persuasivos e envolventes para seus produtos, economizando horas de trabalho e
                            aumentando suas conversões. A IA que gera copywriting é a solução que você precisa!
                        </p>
                        <span class="absolute text-sm text-indigo-100/75 -top-5 left-2 whitespace-nowrap">Transforme seu Marketing</span>
                    </div>
                    <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                        <div class="flex items-center justify-center w-6 h-full">
                            <div class="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
                        </div>
                        <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
                    </div>
                </div>

                <div class="flex md:contents">
                    <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                        <div class="flex items-center justify-center w-6 h-full">
                            <div class="w-1 h-full bg-indigo-300"></div>
                        </div>
                        <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
                    </div>
                    <div class="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-7 col-end-10 mr-auto">
                        <h3 class="text-lg font-semibold lg:text-xl">Personalização em Escala</h3>
                        <p class="mt-2 leading-6">
                            Com a IA, você pode criar mensagens personalizadas para diferentes segmentos de público, aumentando a relevância e a
                            conexão com seus clientes. Isso resulta em taxas de conversão mais altas e clientes mais satisfeitos.
                        </p>
                        <span class="absolute text-sm text-indigo-100/75 -top-5 left-2 whitespace-nowrap">Conquiste seu Público</span>
                    </div>
                </div>

                <div class="flex md:contents flex-row-reverse">
                    <div class="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
                        <h3 class="text-lg font-semibold lg:text-xl">Economia de Tempo e Recursos</h3>
                        <p class="mt-2 leading-6">
                            Deixe a criação de conteúdo para a IA e concentre-se em estratégias de marketing e crescimento. Com a automação do
                            copywriting, você economiza tempo e recursos, permitindo que sua equipe se foque no que realmente importa.
                        </p>
                        <span class="absolute text-sm text-indigo-100/75 -top-5 left-2 whitespace-nowrap">Maximize sua Produtividade</span>
                    </div>
                    <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                        <div class="flex items-center justify-center w-6 h-full">
                            <div class="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
                        </div>
                        <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
                    </div>
                </div>

                <div class="flex md:contents">
                    <div class="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                        <div class="flex items-center justify-center w-6 h-full">
                            <div class="w-1 h-full bg-indigo-300"></div>
                        </div>
                        <div class="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
                    </div>
                    <div class="relative p-4 my-6 text-gray-800 bg-white rounded-xl col-start-6 col-end-10 mr-auto">
                        <h3 class="text-lg font-semibold lg:text-xl">Resultados Mensuráveis</h3>
                        <p class="mt-2 leading-6">
                            A IA não apenas cria conteúdo, mas também analisa o desempenho das suas campanhas. Com insights valiosos, você pode
                            ajustar suas estratégias em tempo real e maximizar seus resultados.
                        </p>
                        <span class="absolute text-sm text-indigo-100/75 -top-5 left-2 whitespace-nowrap">Aprimore suas Estratégias</span>
                    </div>
                </div>
            </div>

            <hr />
            <section className="bg-white px-20 dark:bg-gray-900 bg-gradient-to-b from-black to-gray-900 font-sans min-h-screen flex justify-center items-center gap-0 ">
                <div>
                    <h1 className="text-4xl font-thin text-left mb-10 w-4/5 spac">
                        UMA I.A DO GOOGLE{' '}
                        <strong className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-fuchsia-500 to-orange-500">
                            TRABALHARÁ
                        </strong>{' '}
                        PARA VOCÊ.
                        <br />
                        Clique no botão abaixo e descubra como a IA pode ajudá-lo a criar textos persuasivos e aumentar suas vendas.
                    </h1>
                    <span className="mb-20 font-bold">Plano por apenas 19R$</span>
                    <br />
                    <a
                        href="#
            "
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md box-shadow shadow-md shadow-orange-400 text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                    >
                        QUERO TER ACESSO AO PERSUASIVO
                    </a>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="relative text-center w-full">
                        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-600  to-orange-500 opacity-20 rounded-full blur-3xl w-full"></div>
                        <img src="/cerebro3.png" />
                    </div>
                </div>
            </section>

            <div className="area">
                <section className="bg-white dark:bg-gray-900 font-sans">
                    <div className="container px-6 py-12 mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-10">Outros Serviços</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <p className="text-4xl font-bold mb-2">
                                    <i className="fas fa-clone"></i>
                                </p>
                                <h3 className="text-2xl font-bold mb-2">Website Cloner</h3>
                                <p className="text-lg">
                                    Você precisa de uma cópia de uma página de vendas? Nós criamos um clone perfeito da página, sem perda de
                                    performance e sem perda de SEO.
                                </p>
                                <a
                                    href="#"
                                    className="neon-dourado block w-full px-6 py-3 mt-6 text-lg font-semibold text-center text-black transition duration-300 ease-in-out bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 box-shadow  "
                                >
                                    Peça um orçamento
                                </a>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <p className="text-4xl font-bold mb-2">
                                    <i className="fas fa-code"></i>
                                </p>
                                <h3 className="text-2xl font-bold mb-2">Criação de Websites</h3>
                                <p className="text-lg">
                                    Precisa de um website personalizado? Nós criamos sites conforme sua necessidade, desde uma landing page até um
                                    e-commerce.
                                </p>
                                <a
                                    href="#"
                                    className="neon-dourado block w-full px-6 py-3 mt-6 text-lg font-semibold text-center text-black transition duration-300 ease-in-out bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 box-shadow  "
                                >
                                    Peça um orçamento
                                </a>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <p className="text-4xl font-bold mb-2">
                                    <i className="fas fa-lock"></i>
                                </p>
                                <h3 className="text-2xl font-bold mb-2">SAAS</h3>
                                <p className="text-lg">
                                    Precisa de uma aplicação web para sua empresa? Nós criamos SAAS (Software as a Service) para você.
                                </p>
                                <a
                                    href="#"
                                    className="neon-dourado block w-full px-6 py-3 mt-6 text-lg font-semibold text-center text-black transition duration-300 ease-in-out bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 box-shadow  "
                                >
                                    Peça um orçamento
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </section>
            </div>

            <div class="relative grid gap-8 mb-1 lg:grid-cols-3 p-4 md:p-80 mt-0 text-black bg-gradient-to-t from-black to-gray-900">
                <div class="absolute top-[9%] -left-20 w-[400px] h-[400px] bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-400 opacity-70 rounded-full blur-3xl "></div>
                <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500 via-orange-500 to-orange-500 opacity-60 rounded-full blur-3xl"></div>
                <div class="relative">
                    <div class="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="p-6">
                            <h3 class="text-2xl font-semibold text-gray-900">Copy Básica</h3>
                            <p class="mt-2 text-gray-600">A IA gera copys persuasivas que capturam a atenção do seu público.</p>
                            <div class="mt-4">
                                <span class="text-4xl font-bold">25R$</span>
                                <span class="ml-2 text-gray-600">Mensal</span>
                            </div>
                            <ul class="mt-6 space-y-3">
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Criação em até 2-5 dias</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Visibilidade padrão</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                                    </svg>{' '}
                                    <span>Listagem prioritária</span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-6 border-t border-gray-200 rounded-b-lg bg-gray-50">
                            <form action={'/pagamento'} method="POST">
                                <button
                                    type="submit"
                                    href="https://checkout.dodopayments.com/buy/pdt_To2Pk5SiRrPvvR2fUlEtr"
                                    class="block w-full px-4 py-2 font-medium text-center text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                                >
                                    Listar Agora
                                    <svg
                                        class="h-4 w-4 inline-block ml-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                                    </svg>{' '}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="absolute left-0 right-0 flex justify-center -top-4">
                        <span class="flex items-center gap-1 px-4 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">
                            <svg
                                class="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                ></path>
                            </svg>{' '}
                            Mais Popular
                        </span>
                    </div>
                    <div class="flex flex-col justify-between h-full bg-white border-2 border-indigo-400 rounded-lg shadow-lg">
                        <div class="p-6">
                            <h3 class="text-2xl font-semibold text-gray-900">FastTrack</h3>
                            <p class="mt-2 text-gray-600">Aumente a visibilidade do seu produto com copys irresistíveis.</p>
                            <div class="mt-4">
                                <span class="text-4xl font-bold">68R$</span>
                                <span class="ml-2 text-gray-600">Mensal</span>
                            </div>
                            <ul class="mt-6 space-y-3">
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Criação em até 24 horas</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Uso Ilimitado</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Gerar Copy Através de Um Vídeo</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Listagem prioritária</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>7 dias na seção em destaque (em todo o site)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-6 border-t border-gray-200 rounded-b-lg bg-gray-50">
                            <a
                                href="https://checkout.dodopayments.com/buy/pdt_CaoQwT9zsubbLXZsHfcf0"
                                class="block w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-lg bg-gradient-to-r from-orange-600 to-violet-600 hover:from-orange-700 hover:to-violet-700"
                            >
                                Destaque-se
                                <svg
                                    class="h-4 w-4 inline-block ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                                </svg>{' '}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div class="p-6">
                            <h3 class="text-2xl font-semibold text-gray-900">Boosted</h3>
                            <p class="mt-2 text-gray-600">Pacote de máxima exposição para seu produto.</p>
                            <div class="mt-4">
                                <span class="text-4xl font-bold">97R$</span>
                                <span class="ml-2 text-gray-600">Mensal</span>
                            </div>
                            <ul class="mt-6 space-y-3">
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Criação em até 24 horas</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>Listagem prioritária</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <svg
                                        class="h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                                    </svg>{' '}
                                    <span>30 dias na seção em destaque (em todo o site)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-6 border-t border-gray-200 rounded-b-lg bg-gray-50">
                            <a
                                href="https://checkout.dodopayments.com/buy/pdt_Xrd9mKf1ypuKzJVLJGo9m"
                                class="block w-full px-4 py-2 font-medium text-center text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                            >
                                Impulsione Agora
                                <svg
                                    class="h-4 w-4 inline-block ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                                </svg>{' '}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <section class="py-20 bg-black" id="faq">
                <div class="container mx-auto px-6 md:px-12">
                    <div class="text-center mb-20">
                        <h2 class="text-4xl font-bold mb-4">Perguntas frequentes</h2>
                        <p class="text-gray-300">Respostas para suas dúvidas mais comuns.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                        <div class="bg-transparent border border-orange-500 shadow-lg shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Qual é o prazo de entrega?</h3>
                            <p class="text-gray-300">O prazo de entrega é de até 24 horas.</p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-lg shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Posso escolher o tipo de Copy?</h3>
                            <p class="text-gray-300">Sim, você pode escolher entre os tipos de Copys que oferecemos.</p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-lg shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Como faço para cancelar meu anúncio?</h3>
                            <p class="text-gray-300">
                                Você pode cancelar seu anúncio enviando um email para{' '}
                                <a href="mailto:contato@lojaexemplo.com.br" class="text-blue-600 underline">
                                    contato@lojaexemplo.com.br
                                </a>
                                .
                            </p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-lg shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Posso escolher o tipo de pagamento?</h3>
                            <p class="text-gray-300">Sim, você pode escolher entre os tipos de pagamento que oferecemos.</p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-md shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Quais são os métodos de pagamento aceitos?</h3>
                            <p class="text-gray-300">Aceitamos pagamento com cartão de crédito, boleto bancário e pix.</p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-md shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Como faço para obter ajuda?</h3>
                            <p class="text-gray-300">
                                Você pode obter ajuda enviando um email para{' '}
                                <a href="mailto:contato@lojaexemplo.com.br" class="text-blue-600 underline">
                                    contato@lojaexemplo.com.br
                                </a>{' '}
                                ou acessando nossa página de suporte.
                            </p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-md shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">Preciso de habilidades técnicas para usar o serviço?</h3>
                            <p class="text-gray-300">
                                Não, nosso sistema foi projetado para ser intuitivo e fácil de usar. Não é necessário ter habilidades de marketing ou
                                programação para começar.
                            </p>
                        </div>
                        <div class="bg-transparent border border-orange-500  shadow-md shadow-orange-500 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">As copys são personalizadas para o meu negócio?</h3>
                            <p class="text-gray-300">
                                Sim! A IA cria copys com base nas informações que você fornece sobre seu produto, garantindo que a mensagem seja
                                alinhada com seu público e objetivos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
