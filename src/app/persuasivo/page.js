'use client';

import React, { useState, useEffect } from 'react';
import Gerarprompt from '@/action/gerarprompt';

export default function Persuasivo() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [recebido, setRecebido] = useState('');
    const [responseia, setResponseIa] = useState(null);
    const [response, setResponse] = useState('');

    useEffect(() => {
    if (response.length > 0) {
        localStorage.setItem('response', [response]);
    }
}, [response]);


    const gerar = (e) => {
        e.preventDefault();
        setRecebido(titulo);
        setResponseIa(<Gerarprompt prompt={titulo} descricao={descricao} />);
    };

    return (
        <div id="area">
            <form onSubmit={gerar}>
                <input type="text" onChange={(e) => setTitulo(e.target.value)} />
                <textarea onChange={(e) => setDescricao(e.target.value)} />
                <button type="submit">Gerar Copy</button>
            </form>

            <div>
                {recebido && (
                    <p id="gerado">
                        {responseia}
                    </p>
                )}
            </div>
        </div>
    );
}
