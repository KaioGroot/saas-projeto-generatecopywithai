import React, { useState } from 'react';
import { FaShare, FaFileDownload, FaLink } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'react-hot-toast';
import { jsPDF } from 'jspdf';

export default function ShareButton({ template, generatedText }) {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useTheme();

    const handleCopyLink = async () => {
        const shareUrl = `${window.location.origin}/templates/usar/${template.id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copiado com sucesso!');
        setIsOpen(false);
    };

    const exportAsPDF = () => {
        try {
            const doc = new jsPDF();

            // Configurar fonte e tamanho
            doc.setFont('helvetica');
            doc.setFontSize(16);

            // Adicionar título
            doc.text(template.title, 20, 20);

            // Configurar fonte para o conteúdo
            doc.setFontSize(12);

            // Quebrar o texto em linhas para caber na página
            const splitText = doc.splitTextToSize(generatedText, 170);

            // Adicionar o conteúdo
            doc.text(splitText, 20, 40);

            // Salvar o PDF
            doc.save(`${template.title}.pdf`);

            setIsOpen(false);
            toast.success('Template exportado como PDF!');
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
            toast.error('Erro ao exportar o PDF. Tente novamente.');
        }
    };

    const exportAsDoc = () => {
        try {
            // Criar o conteúdo do documento
            const content = `${template.title}\n\n${generatedText}`;

            // Criar o blob com o tipo MIME do Word
            const blob = new Blob([content], { type: 'application/msword' });

            // Criar URL do objeto
            const url = window.URL.createObjectURL(blob);

            // Criar elemento de link temporário
            const link = document.createElement('a');
            link.href = url;
            link.download = `${template.title}.doc`;

            // Adicionar ao documento, clicar e remover
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Limpar a URL do objeto
            window.URL.revokeObjectURL(url);

            setIsOpen(false);
            toast.success('Template exportado como DOC!');
        } catch (error) {
            console.error('Erro ao exportar DOC:', error);
            toast.error('Erro ao exportar o documento. Tente novamente.');
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-all duration-200`}
                aria-label="Compartilhar template"
            >
                <FaShare className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5 z-50`}
                >
                    <div className="py-1">
                        <button
                            onClick={handleCopyLink}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <FaLink className="mr-2" />
                            Copiar Link
                        </button>
                        <button
                            onClick={exportAsPDF}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <FaFileDownload className="mr-2" />
                            Exportar como PDF
                        </button>
                        <button
                            onClick={exportAsDoc}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                                isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <FaFileDownload className="mr-2" />
                            Exportar como DOC
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
