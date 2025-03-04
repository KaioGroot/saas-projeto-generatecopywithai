import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default  function GerarPrompt({ prompt, descricao }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Função assíncrona para gerar o conteúdo
    const generateContent = async () => {
      const generativeAi = new GoogleGenerativeAI("AIzaSyBASQE_ZeW4yYe7iJgBHVkPaIupXNxqVpg");
      const model = generativeAi.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Criando um prompt detalhado para gerar uma copy persuasiva
      const detailedPrompt = `
        Gere uma copy persuasiva baseada no seguinte produto: 
        "${prompt}". A copy deve ser otimista, cativante e focada em conversão, 
        atraindo potenciais clientes. Seja convincente e destaque os principais benefícios do produto utilize as melhoras tecnicas de persuasão do marketing digital. ja lhe dei o nome do produto a descrição dele é: "${descricao} se nada tiver aqui você faz uma copy bem persuasiva apenas para o nome do produto fornecido"}`;

      try {
        const response = await model.generateContent(detailedPrompt);
        setResult(response.response.text()); 
      } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
      }
    };

    generateContent(); // Chama a função para gerar o conteúdo quando o componente for montado
  }, [prompt]); // O efeito é executado novamente toda vez que o "prompt" mudar

  return (
    <div>
      {result ? <p id='geradin'>{result}</p> : <p>Carregando...</p>}
    </div>
  );
}


