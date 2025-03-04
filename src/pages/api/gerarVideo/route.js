"use server";
import axios from 'axios';

export async function POST(req) {
  const { text } = await req.json();

  try {
    const response = await axios.post(
      'https://api.creatomate.com/v1/renders',
      {
        template_id: 'be4c48e2-a06f-4f42-ace6-a0fe80bd2f06', // ID do template de vídeo no Creatomate
        modifications: [
          {
            text: text,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CREATOMATE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return new Response(JSON.stringify({ videoUrl: response.data.url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }
}
