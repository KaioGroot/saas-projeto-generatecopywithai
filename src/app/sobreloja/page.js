'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica do MuxPlayer para evitar problemas de SSR
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

export default function Sobreloja() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#16161d] p-4">
            <div className="max-w-4xl w-full">
                <div className="relative">
                    <MuxPlayer
                        streamType="on-demand"
                        playbackId="3ZHWKjJSdLi5rOvQHef5BwXKcbP9I1HobBZRn4YwdOg" // Substitua pelo ID que você obtiver do Mux
                        autoPlay
                        muted
                        loop
                        preload="auto"
                        className="w-full rounded-lg border-4 border-purple-500"
                        metadata={{
                            video_title: 'Vídeo de Apresentação',
                            player_name: 'Mux Player',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
