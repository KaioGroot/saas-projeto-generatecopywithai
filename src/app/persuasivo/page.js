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
    const gerado = document.querySelectorAll('#geradin');
    //código para adicionar dados do recebido no localStorage
    useEffect(() => {
        if (response.length > 0) {
            localStorage.setItem('response', [response]);
        }
    }, [response]);
    const gerar = (e) => {
        e.preventDefault();
        setRecebido(titulo);
        let response = <Gerarprompt prompt={titulo} descricao={descricao} />;
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
                            id="descricao"
                            onChange={(e) => setDescricao(e.target.value)}
                            htmlFor="descricao"
                            className="text-lg font-bold text-white"
                        >
                            Descrição
                        </label>
                        <br />
                        <textarea
                            id="descricao"
                            className="bg-gray-800 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-full"
                            rows="5"
                        ></textarea>
                        <button
                            type="submit"
                            className="flex flex-row items-center justify-center px-4 py-2 text-white bg-purple-400 rounded-lg shadow-lg hover:shadow-xl neon mt-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="52pt" height="25pt" viewBox="0 0 512 512" fill="white" id="magic-wand">
                                <path d="M426.875.308594l-426.875 426.875 84.816406 84.816406 426.875-426.875zm42.40625 84.816406l-85.316406 85.320312-42.410156-42.410156 85.316406-85.316406zm-426.871094 342.058594l277.941406-277.945313 42.410157 42.410157-277.945313 277.941406zm0 0M245.636719 32.113281l42.40625 42.40625-21.203125 21.207031-42.40625-42.410156zm0 0M468.285156 297.175781l-42.410156-42.410156 21.203125-21.203125 42.410156 42.410156zm0 0M306.777344 0h29.988281v43.980469h-29.988281zm0 0M470.707031 175.925781h40.984375v29.988281h-40.984375zm0 0M193.824219 113.953125h40.980469v29.988281h-40.980469zm0 0M369.75 275.964844h29.988281v40.902344h-29.988281zm0 0"></path>
                            </svg>
                            Gerar Copy
                        </button>
                    </form>
                    <div className="flex flex-col justify-center  items-center min-h-screen w-full sm:w-1/2 p-4 bg-[#1e1e24] rounded-lg shadow-lg">
                        <img src="/cerebro3.png" alt="Cérebro IA" className="mb-4 w-80" />
                        <h1 className="text-xl font-bold text-white">
                            Apenas Dê sua instrução para a inteligência artificial e ela trabalhará para você.
                        </h1>
                        <div className="w-full h-96 overflow-y-auto py-4 px-4 mt-4 z-50">
                            <p id="resultado" className="text-lg font-bold text-white z-50">
                                {recebido ? (
                                    <p id="gerado" className="text-lg font-bold text-white">
                                        {responseia}
                                        {setResponse(gerado[0].textContent)};
                                    </p>
                                ) : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ul className=" circles z-10">
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
                <li></li>
            </ul>
        </div>
    );
}
