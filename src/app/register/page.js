'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, name, phone, password);
        const res = await fetch('/api/get_information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, phone, password }),
        });
        if (res.status === 200) {
            //então já se deu certo a gente cria a conta com as credencias no firebase.
            const data = await res.json();
            console.log(data);
            try {
                //código para mandar email para a api sendemail
                const response = await fetch('/api/sendemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, name, phone, password }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            //não deu certo a gente não cria a conta com as credencias no firebase.
            console.log('não foi possivel fazer o cadastro');
            const error = await res.json();
            console.log(error);
        }
    };
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="absolute z-[-20] rounded-full top-50 left-50 w-80 h-80 bg-gradient-to-tr from-yellow-300 to-pink-500 opacity-50 blur-md"></div>
            <div className="fixed top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-transparent to-purple-500 rounded-l-full"></div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto p-4 bg-gradient-to-b z-20 from-[#18111757] to-[#24245e] shadow-md rounded-md backdrop-blur-sm"
            >
                <div className="mb-4">
                    <label className="block text-gray-200">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border text-purple-700 border-gray-700 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200">Nome Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border text-purple-700 border-gray-700 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200">Telefone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border text-purple-700 border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-purple-500 text-white rounded-md purple:bg-blue-600 transition">
                    Cadastrar
                </button>
            </form>
            <ul className="circles">
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
