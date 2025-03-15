'use client';
import Video from 'next-video';
import MuxPlayer from '@mux/mux-player-react';

export default function Sobreloja() {
    //essa página retorna o vídeo que fala sobre a plataforma.

    return (
        <div>
            <MuxPlayer
                playbackId="3ZHWKjJSdLi5rOvQHef5BwXKcbP9I1HobBZRn4YwdOg"
                metadataVideoTitle="Placeholder (optional)"
                metadata-viewer-user-id="Placeholder (optional)"
                primary-color="#ffffff"
                secondary-color="#000000"
                accent-color="#fa50b5"
            />
        </div>
    );
}
