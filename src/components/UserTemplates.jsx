import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { toast } from 'react-hot-toast';

export default function UserTemplates() {
    const { isDarkMode } = useTheme();
    const [userTemplates, setUserTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            setIsLoading(true);
            const db = getFirestore(app);
            const templatesRef = collection(db, 'templates');
            const q = query(templatesRef);
            const querySnapshot = await getDocs(q);

            const templates = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUserTemplates(templates);
        } catch (error) {
            console.error('Erro ao carregar templates:', error);
            toast.error('Erro ao carregar templates');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTemplate = async (templateId) => {
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, 'templates', templateId));
            setUserTemplates(userTemplates.filter((template) => template.id !== templateId));
            toast.success('Template excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir template:', error);
            toast.error('Erro ao excluir template');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meus Templates</h2>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gerencie seus templates personalizados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTemplates.map((template) => (
                    <div
                        key={template.id}
                        className={`rounded-lg shadow-lg ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } overflow-hidden transition-transform duration-200 hover:scale-105`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{template.title}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                                    }`}
                                >
                                    {template.category}
                                </span>
                            </div>

                            <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{template.description}</p>

                            <div className="flex items-center text-sm mb-4">
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Variáveis: {template.variables.join(', ')}</span>
                            </div>

                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Usado {template.usageCount} vezes</div>
                        </div>

                        <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/templates/usar/${template.id}`}
                                        className={`p-2 rounded-lg ${
                                            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        } transition-colors`}
                                    >
                                        <FaEye className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={`/templates/editar/${template.id}`}
                                        className={`p-2 rounded-lg ${
                                            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        } transition-colors`}
                                    >
                                        <FaEdit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteTemplate(template.id)}
                                        className={`p-2 rounded-lg ${
                                            isDarkMode ? 'bg-red-900 hover:bg-red-800 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'
                                        } transition-colors`}
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {new Date(template.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {userTemplates.length === 0 && (
                    <div
                        className={`col-span-full p-8 text-center rounded-lg ${
                            isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <p className="text-lg mb-4">Você ainda não tem templates personalizados</p>
                        <Link
                            href="/templates/criar"
                            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Criar Primeiro Template
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
