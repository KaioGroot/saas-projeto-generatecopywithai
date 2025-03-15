'use client';

export default function Sobreloja() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#16161d] p-4">
            <div className="max-w-4xl w-full">
                <video autoPlay muted loop playsInline className="w-full rounded-lg border-4 border-purple-500" poster="/videos/thumbnail.jpg">
                    <source src="/videos/Entrada.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </div>
        </div>
    );
}
