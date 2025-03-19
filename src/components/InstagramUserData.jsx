'use client';

import { useEffect, useState } from 'react';
import { FaInstagram, FaUser, FaIdCard, FaSpinner } from 'react-icons/fa';

export default function InstagramUserData() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Busca o token do localStorage
                const token = localStorage.getItem('instagram_access_token');

                if (!token) {
                    setError('Token não encontrado. Por favor, faça login novamente.');
                    return;
                }

                const response = await fetch(`/api/instagram/user-data?token=${token}`);
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
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center text-red-700">
                    <FaInstagram className="text-xl mr-3" />
                    <div>
                        <h3 className="font-semibold">Erro ao carregar dados</h3>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-center text-gray-500">
                    <FaSpinner className="animate-spin mr-3" />
                    <span>Carregando dados do Instagram...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nome de usuário</p>
                        <p className="font-semibold text-gray-900">{userData.username}</p>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <FaIdCard className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">ID do Instagram</p>
                        <p className="font-semibold text-gray-900">{userData.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
