'use client';
import Video from 'next-video';
import MuxPlayer from '@mux/mux-player-react';

export default function Sobreloja() {
    //essa página retorna o vídeo que fala sobre a plataforma.

    return (
        <div>
            <MuxPlayer
<<<<<<< HEAD
                playbackId="3ZHWKjJSdLi5rOvQHef5BwXKcbP9I1HobBZRn4YwdOg"
                metadataVideoTitle="Placeholder (optional)"
                metadata-viewer-user-id="Placeholder (optional)"
                primary-color="#ffffff"
                secondary-color="#000000"
                accent-color="#fa50b5"
            />
=======
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
>>>>>>> a72ab51f41c462400c146c6996dea8264393b2ff
        </div>
    );
}
