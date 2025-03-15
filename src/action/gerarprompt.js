import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function Gerarprompt(titulo, descricao) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
            Gere uma copy persuasiva baseada no seguinte produto: 
            "${titulo}". A copy deve ser otimista, cativante e focada em conversão, 
            atraindo potenciais clientes. Seja convincente e destaque os principais benefícios do produto utilize as melhoras tecnicas de persuasão do marketing digital. 
            Descrição do produto: "${descricao}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Erro ao gerar conteúdo:', error);
        throw new Error('Erro ao gerar o texto. Por favor, tente novamente.');
    }
}
