import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { model, inputs, options = {} } = await request.json();
        const token = process.env.NEXT_PUBLIC_HUGGING_FACE_TOKEN;

        if (!token) {
            return NextResponse.json({ error: 'Token de autenticação não configurado' }, { status: 401 });
        }

        const modelUrl =
            model === 'analyze'
                ? 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment'
                : 'https://api-inference.huggingface.co/models/pierreguillou/gpt2-small-portuguese';

        // Preparar o prompt com base no estilo persuasivo selecionado
        let enhancedInput = inputs;
        if (model === 'generate' && options.persuasiveStyle) {
            const stylePrompts = {
                emocional: 'Crie um texto emocional e envolvente que desperte sentimentos: ',
                logico: 'Desenvolva um argumento lógico e bem estruturado: ',
                urgente: 'Crie um texto que transmita urgência e necessidade imediata: ',
                social: 'Elabore um texto que aproveite a prova social e credibilidade: ',
                beneficios: 'Liste os principais benefícios e vantagens: ',
                storytelling: 'Conte uma história envolvente que demonstre: ',
                autoridade: 'Com tom de especialista, explique por que: ',
            };

            enhancedInput = `${stylePrompts[options.persuasiveStyle]}${inputs}`;
        }

        const response = await fetch(modelUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                inputs: enhancedInput,
                // Opções específicas para cada modelo
                ...(model === 'analyze'
                    ? {
                          options: {
                              wait_for_model: true,
                          },
                      }
                    : {
                          parameters: {
                              // Parâmetros para geração de texto
                              max_length: options.maxLength || 150,
                              temperature: options.temperature || 0.7,
                              top_p: options.creativity || 0.9,
                              do_sample: true,
                              return_full_text: false,
                              num_return_sequences: options.numVariations || 1,
                              // Parâmetros específicos para textos persuasivos
                              repetition_penalty: options.repetitionPenalty || 1.2,
                              length_penalty: options.lengthPenalty || 1.0,
                              no_repeat_ngram_size: 3,
                          },
                      }),
            }),
        });

        if (response.status === 503) {
            return NextResponse.json({ error: 'Modelo está carregando. Por favor, tente novamente em alguns segundos.' }, { status: 503 });
        }

        if (!response.ok) {
            const errorData = await response.text();
            return NextResponse.json({ error: `Erro na requisição: ${response.status} - ${errorData}` }, { status: response.status });
        }

        const data = await response.json();

        // Formatar a resposta para análise de sentimento
        if (model === 'analyze') {
            const sentiments = data[0].map(({ label, score }) => ({
                sentimento: label.replace('positive', 'positivo').replace('negative', 'negativo').replace('neutral', 'neutro'),
                pontuação: Math.round(score * 100),
            }));

            return NextResponse.json({
                análise: sentiments.sort((a, b) => b.pontuação - a.pontuação),
            });
        }

        // Formatar a resposta para geração de texto
        const variations = Array.isArray(data) ? data : [data];
        return NextResponse.json({
            variações: variations.map((item) => ({
                texto: item.generated_text,
                metadata: {
                    comprimento: item.generated_text.length,
                    temperatura: options.temperature || 0.7,
                    criatividade: options.creativity || 0.9,
                    estilo: options.persuasiveStyle || 'padrão',
                },
            })),
        });
    } catch (error) {
        console.error('Erro no servidor:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
