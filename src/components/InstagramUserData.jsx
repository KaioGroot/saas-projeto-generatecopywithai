'use client';

import { useEffect, useState } from 'react';
import { FaInstagram, FaUser, FaIdCard } from 'react-icons/fa';

export default function InstagramUserData() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/instagram/user-data');
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                    return;
                }

                setUserData(data);
            } catch (err) {
                setError('Erro ao carregar dados do usuário');
                console.error('Erro:', err);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
    }

    if (!userData) {
        return <div className="p-4 bg-gray-50 text-gray-700 rounded-lg">Carregando dados...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaInstagram className="text-pink-600" />
                Dados do Instagram
            </h2>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    <span className="font-medium">Nome de usuário:</span>
                    <span>{userData.username}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaIdCard className="text-gray-500" />
                    <span className="font-medium">ID do Instagram:</span>
                    <span>{userData.id}</span>
                </div>
            </div>
        </div>
    );
}
