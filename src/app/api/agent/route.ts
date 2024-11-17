import { OpenAI } from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const {
    messages, // Mensagens a serem enviadas para a API
  } = await req.json();

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      max_tokens: 150, // Número máximo de tokens para a resposta
      temperature: 0.9, // Aumentar o nível de confiança para a resposta
    });
    return Response.json({ ...response });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: "Erro ao processar a solicitação.",
      error: error,
    });
  }
}
