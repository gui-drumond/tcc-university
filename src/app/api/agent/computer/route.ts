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
  You are a hardware specialist focused on recommending ideal components for different user profiles (gamers, editors, professionals, etc.).
  Extract information from the following messages:
  Formatting Instructions: {format_instructions}.
  Messages: {messages}.
`;

async function callStructuredParser(data: string) {
  const prompt = ChatPromptTemplate.fromTemplate(promptStructedParser);
  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    cpu: "find the configuration and return model of the minimal required CPU",
    video_board:
      "If necessary, this component finds the RAM configuration and return model of the GPU",
    memory_ram:
      "find the ideal model and quantity, minimal required RAM memory",
    storage: "find the configuration and return model of the RAM",
    mother_board: "find the configuration and return model of the RAM",
    power_supply:
      "find the power supply model based on the amount of power the entire pc will consume",
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
