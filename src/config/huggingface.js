export const analyzeText = async (text) => {
    try {
        const response = await fetch('/api/huggingface', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'analyze',
                inputs: text,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao analisar o texto');
        }

        return data;
    } catch (error) {
        console.error('Erro detalhado ao analisar texto:', error);
        throw error;
    }
};

export const generateTextVariation = async (text, options = {}) => {
    try {
        const response = await fetch('/api/huggingface', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'generate',
                inputs: text,
                options: {
                    maxLength: options.maxLength || 150,
                    temperature: options.temperature || 0.7,
                    creativity: options.creativity || 0.9,
                    numVariations: options.numVariations || 1,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao gerar variação');
        }

        return data;
    } catch (error) {
        console.error('Erro detalhado ao gerar variação:', error);
        throw error;
    }
};
