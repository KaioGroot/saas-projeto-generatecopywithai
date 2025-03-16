'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComparisonSlider() {
    const [position, setPosition] = useState(50);

    const before = {
        title: 'Conteúdo Manual',
        text: 'Leva horas para pesquisar e escrever\nFalta de consistência\nAlto custo com redatores',
    };

    const after = {
        title: 'Com Nossa IA',
        text: 'Geração em segundos\nEstilo consistente\nCusto reduzido em 70%',
    };

    return (
        <div className="theme-surface rounded-xl p-8">
            <div className="relative h-96">
                {/* Before */}
                <motion.div
                    className="absolute inset-0 theme-bg rounded-xl p-6"
                    style={{ width: `${position}%` }}
                    animate={{ width: `${position}%` }}
                >
                    <h3 className="text-xl font-bold text-red-500 mb-4">{before.title}</h3>
                    <p className="whitespace-pre-wrap">{before.text}</p>
                </motion.div>

                {/* After */}
                <motion.div
                    className="absolute inset-0 theme-bg rounded-xl p-6"
                    style={{ left: `${position}%`, width: `${100 - position}%` }}
                    animate={{ left: `${position}%`, width: `${100 - position}%` }}
                >
                    <h3 className="text-xl font-bold text-green-500 mb-4">{after.title}</h3>
                    <p className="whitespace-pre-wrap">{after.text}</p>
                </motion.div>

                {/* Slider Control */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize"
                    style={{ left: `${position}%` }}
                    onMouseDown={(e) => {
                        const startX = e.clientX;
                        const startWidth = position;

                        const onMouseMove = (e) => {
                            const delta = e.clientX - startX;
                            const newPosition = Math.min(90, Math.max(10, startWidth + (delta / window.innerWidth) * 100));
                            setPosition(newPosition);
                        };

                        const onMouseUp = () => {
                            window.removeEventListener('mousemove', onMouseMove);
                            window.removeEventListener('mouseup', onMouseUp);
                        };

                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                    }}
                />
            </div>
        </div>
    );
}
