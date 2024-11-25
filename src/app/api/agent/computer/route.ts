import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { NextRequest } from "next/server";

const model = new ChatGroq({
  model: "llama3-70b-8192",
  apiKey: process.env.OPENAI_API_KEY,
});

// const promptAgent = `Você é um especialista em montagem de hardware para computadores,
//      focado em recomendar componentes de melhor custo-benefício a fim de economizar.
//      Suas sugestões devem se inciar em custo-benefício, desempenho, compatibilidade, upgrades futuros, eficiência energética e orçamento disponível,
//      se fornecer que quer gastar mais, use como base o valor do orçamento,
//      sempre com base nas tendências mais recentes do mercado. Responda apenas perguntas relacionadas à montagem de PCs e hardware.
//      Os valores são geralmente em reais, não em dolar, siga esse padrão para conta, se precisar pergunte ao usuário.
//      Caso seja solicitado para para recomendar baseado em FPS, significa que quanto mais FPS, melhor. Um medidor bom é 30fps é low profile 60fps até 80fps mid profile e acima é high profile.

//      Para solicitações fora desse tema,
//      responda: "*Desculpe, só posso ajudar com montagem de computadores e hardware relacionado.*".`;
// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", promptAgent],
//   ["human", "{input}"],
// ]);



const promptStructedParser = `
    Você é um especialista em hardware e deve recomendar componentes baseando-se no menor custo que atenda às especificações informadas.
  Priorize componentes mais baratos e justifique suas escolhas baseando-se nos critérios abaixo:
  - Desempenho mínimo necessário para as atividades descritas.
  - Compatibilidade com os outros componentes.
  - Eficiência energética (quando relevante).
  - Orçamento total (se informado).

  Instruções:
  - Sempre busque o menor custo possível dentro do que foi solicitado pelo usuário.
  - Se várias opções atenderem ao mesmo critério, escolha a peça mais barata disponível desde que seja compatível.
  - Ordene as opções com base no preço crescente, justificando sua escolha.
  - Se o orçamento disponível for informado, não ultrapasse o limite. Pergunte ao usuário, se necessário.
  - Priorize desempenho adequado, mas com foco no custo-benefício.
  - Para FPS: 30 FPS = básico, 60 FPS = médio, 80+ FPS = alta performance. Otimize para o perfil solicitado.

  Responda no formato especificado: {format_instructions}.
  Mensagem do usuário: {messages}.
`;




async function callStructuredParser(data: string) {
  const prompt = ChatPromptTemplate.fromTemplate(promptStructedParser);
  

  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    cpu: "Escolha o modelo de CPU mais barato que atenda aos requisitos mínimos informados.",
    video_board:
      "Selecione a placa de vídeo mais barata compatível com o nível de desempenho solicitado.",
    memory_ram:
      "Recomende o modelo de RAM mais barato com a quantidade mínima necessária.",
    storage:
      "Indique o modelo de armazenamento (SSD ou HDD) mais barato que atenda à capacidade informada.",
    mother_board:
      "Selecione a placa-mãe mais barata que seja compatível com os outros componentes.",
    power_supply:
      "Calcule o consumo total e escolha a fonte de alimentação mais barata que ofereça potência suficiente.",
    total:
      "Calcule o total aproximado das peças e retorne em BRL apenas o cifrão e os números.",
  });


  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    messages: data,
    format_instructions: outputParser.getFormatInstructions(),
  });
}

export async function POST(request: Request) {
  const { query } = await request.json();
  console.log({
    log: new Date().toISOString(),
    query,
  });

  const resp = query ? await callStructuredParser(query) : { data: "" };

  return Response.json({ ...resp });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");

  console.log({
    log: new Date().toISOString(),
    query,
  });

  const resp = query ? await callStructuredParser(query) : { data: "" };

  return Response.json({ ...resp });
}
