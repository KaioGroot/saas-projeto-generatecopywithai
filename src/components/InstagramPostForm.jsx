'use client';

import { useState } from 'react';
import { FaInstagram, FaImage, FaSpinner } from 'react-icons/fa';

export default function InstagramPostForm() {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Primeiro, faz upload da imagem
            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            const response = await fetch('/api/instagram/create-post', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar post');
            }

            setSuccess(true);
            setImage(null);
            setCaption('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaInstagram className="text-pink-600" />
                Criar Novo Post
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload de Imagem */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem do Post
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                            {image ? (
                                <div className="relative">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="max-h-64 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="image-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                                        >
                                            <span>Upload de imagem</span>
                                            <input
                                                id="image-upload"
                                                name="image"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">ou arraste e solte</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG até 10MB
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Legenda */}
                <div>
                    <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                        Legenda
                    </label>
                    <textarea
                        id="caption"
                        name="caption"
                        rows={4}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Digite a legenda do seu post..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>

                {/* Mensagens de Erro e Sucesso */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        Post criado com sucesso!
                    </div>
                )}

                {/* Botão de Envio */}
                <button
                    type="submit"
                    disabled={!image || loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                        ${!image || loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Publicando...
                        </>
                    ) : (
                        'Publicar no Instagram'
                    )}
                </button>
            </form>
        </div>
    );
} 