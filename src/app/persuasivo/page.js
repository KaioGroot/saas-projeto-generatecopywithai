'use client';

import React, { useState, useEffect } from 'react';
import Gerarprompt from '@/action/gerarprompt';
import { Composition } from 'remotion';
import { Player } from '@remotion/player';
import { AbsoluteFill, Sequence } from 'remotion';
import { motion } from 'framer-motion';

export default function Persuasivo() {
    const [titulo, setTitulo] = useState();
    const [recebido, setRecebido] = useState();
    const [responseia, setResponseIa] = useState([]);
    const [response, setResponse] = useState([]);
    const [descricao, setDescricao] = useState();

    useEffect(() => {
        // Verificar se estamos no navegador antes de acessar 'document'
        let gerado = null;
        if (typeof document !== "undefined") {
            gerado = document.querySelectorAll('#geradin');
        }

        // Manipular o gerado, se necessário
        if (gerado && gerado.length > 0 && response.length > 0) {
            setResponse(gerado[0]?.textContent || '');
        }
    }, [response]);

    // Código para salvar dados no localStorage
    useEffect(() => {
        if (response.length > 0) {
            localStorage.setItem('response', JSON.stringify(response));
        }
    }, [response]);

    const gerar = (e) => {
        e.preventDefault();
        setRecebido(titulo);
        const response = <Gerarprompt prompt={titulo} descricao={descricao} />;
        setResponseIa(response);
    };

    return (
        <div id="area">
            <div className="flex bg-black justify-center items-center text-center min-h-screen">
                <div className="flex flex-col sm:flex-row overflow-auto justify-center items-center w-full min-h-screen">
                    <form
                        onSubmit={gerar}
                        className="flex flex-col justify-center items-center z-20 w-full sm:w-1/2 p-4 min-h-screen bg-gradient-to-b from-black to-[#1e1e24] rounded-lg shadow-lg"
                    >
                        <h1 className="text-4xl font-bold text-white mb-20">
                            Gere Sua Copy <strong className="neon text-4xl text-purple-200">persuasiva</strong>
                        </h1>
                        <label htmlFor="titulo" className="text-lg font-bold text-white mb-4">
                            Nome do produto ou serviço
                        </label>
                        <input
                            onChange={(e) => setTitulo(e.target.value)}
                            type="text"
                            id="titulo"
                            className="bg-gray-800 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-full"
                        />
                        <br />
                        <label
                            htmlFor="descricao"
                            className="text-lg font-bold text-white"
                        >
                            Descrição
                        </label>
                        <br />
                        <textarea
                            onChange={(e) => setDescricao(e.target.value)}
                            id="descricao"
                            className="bg-gray-800 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-full"
                            rows="5"
                        ></textarea>
                        <button
                            type="submit"
                            className="flex flex-row items-center justify-center px-4 py-2 text-white bg-purple-400 rounded-lg shadow-lg hover:shadow-xl neon mt-4"
                        >
                            Gerar Copy
                        </button>
                    </form>
                    <div className="flex flex-col justify-center items-center min-h-screen w-full sm:w-1/2 p-4 bg-[#1e1e24] rounded-lg shadow-lg">
                        <img src="/cerebro3.png" alt="Cérebro IA" className="mb-4 w-80" />
                        <h1 className="text-xl font-bold text-white">
                            Apenas Dê sua instrução para a inteligência artificial e ela trabalhará para você.
                        </h1>
                        <div className="w-full h-96 overflow-y-auto py-4 px-4 mt-4 z-50">
                            <p id="resultado" className="text-lg font-bold text-white z-50">
                                {recebido ? (
                                    <p id="gerado" className="text-lg font-bold text-white">
                                        {responseia}
                                    </p>
                                ) : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="circles z-10">
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
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}
