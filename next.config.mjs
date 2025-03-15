import { withNextVideo } from 'next-video/process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração básica do Next.js
    experimental: {
        // Desabilitando turbopack para compatibilidade com next-video
        turbo: false,
    },
};

export default withNextVideo(nextConfig);
