'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaClock, FaImage } from 'react-icons/fa';

const socialNetworks = [
    { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
    { id: 'twitter', name: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
];

export default function SocialMediaManager({ text }) {
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState('');
    const [instagramAuth, setInstagramAuth] = useState(null);

    const handleNetworkToggle = (networkId) => {
        setSelectedNetworks((prev) => (prev.includes(networkId) ? prev.filter((id) => id !== networkId) : [...prev, networkId]));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInstagramLogin = async () => {
        try {
            const response = await fetch('/api/auth/instagram');
            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            setError('Erro ao conectar com Instagram: ' + error.message);
        }
    };

    const handlePost = async () => {
        if (selectedNetworks.length === 0) {
            setError('Selecione pelo menos uma rede social');
            return;
        }

        try {
            setIsPosting(true);
            setError('');

            // Postar no Instagram se selecionado
            if (selectedNetworks.includes('instagram')) {
                if (!instagramAuth) {
                    handleInstagramLogin();
                    return;
                }

                // Se temos uma imagem, primeiro fazemos upload
                let mediaUrl = '';
                if (image) {
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('upload_preset', 'seu_upload_preset'); // Configure isso no Cloudinary

                    const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const uploadData = await uploadResponse.json();
                    mediaUrl = uploadData.secure_url;
                }

                // Postar no Instagram
                await fetch('/api/instagram/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accessToken: instagramAuth.access_token,
                        mediaUrl,
                        caption: text,
                    }),
                });
            }

            // Limpar o estado após a postagem
            setSelectedNetworks([]);
            setShowSchedule(false);
            setScheduleDate('');
            setScheduleTime('');
            setImage(null);
            setPreview('');
        } catch (err) {
            setError('Erro ao fazer a postagem: ' + err.message);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Compartilhar nas Redes Sociais
            </h3>

            {/* Seleção de Redes Sociais */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {socialNetworks.map((network) => {
                    const Icon = network.icon;
                    const isSelected = selectedNetworks.includes(network.id);

                    return (
                        <motion.button
                            key={network.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleNetworkToggle(network.id)}
                            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                                isSelected
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                            }`}
                        >
                            <Icon className="text-2xl" style={{ color: isSelected ? network.color : 'currentColor' }} />
                            <span className="text-sm font-medium">{network.name}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Upload de Imagem */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium theme-text">Adicionar Imagem (opcional)</label>
                <div className="flex items-center gap-4">
                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-all"
                    >
                        <FaImage className="text-lg" />
                        <span>Escolher Imagem</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </motion.label>
                    {preview && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={() => {
                                    setImage(null);
                                    setPreview('');
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Agendamento */}
            <div className="mb-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-all"
                >
                    <FaClock />
                    <span>{showSchedule ? 'Cancelar Agendamento' : 'Agendar Post'}</span>
                </motion.button>

                {showSchedule && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium theme-text">Data</label>
                            <input
                                type="date"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="w-full p-2 rounded-xl border border-purple-100 dark:border-purple-900 bg-white/50 dark:bg-gray-800/30 theme-text"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium theme-text">Hora</label>
                            <input
                                type="time"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                className="w-full p-2 rounded-xl border border-purple-100 dark:border-purple-900 bg-white/50 dark:bg-gray-800/30 theme-text"
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Preview do Post */}
            <div className="mb-6 p-4 border border-purple-100 dark:border-purple-900 rounded-xl bg-white/30 dark:bg-gray-900/30">
                <h4 className="font-medium mb-2 theme-text">Preview do Post</h4>
                <p className="theme-text-secondary whitespace-pre-wrap">{text}</p>
                {preview && <img src={preview} alt="Preview do post" className="mt-4 rounded-lg max-h-48 object-cover" />}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Botão de Postar */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePost}
                disabled={isPosting || selectedNetworks.length === 0}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPosting ? 'Postando...' : showSchedule ? 'Agendar' : 'Postar Agora'}
            </motion.button>
        </div>
    );
}
