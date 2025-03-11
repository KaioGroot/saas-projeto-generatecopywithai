'use client';
import Video from 'next-video';
import MuxPlayer from '@mux/mux-player-react';

export default function Sobreloja() {
    //essa página retorna o vídeo que fala sobre a plataforma.

    return (
        <div>
            <MuxPlayer
                autoPlay={true}
                style={{ borderRadius: '10px', border: '4px solid purple' }}
                id="player"
                src={'_next-video/Entrada.mp4'}
                type="video/mp4"
            />
        </div>
    );
}
