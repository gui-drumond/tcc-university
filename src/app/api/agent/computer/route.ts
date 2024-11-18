import { CommaSeparatedListOutputParser, StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama3-70b-8192",
  apiKey: process.env.OPENAI_API_KEY,
});


const promptText = `Você é um especialista em montagem de hardware para computadores,
     focado em recomendar componentes ideais para diferentes perfis de usuários (gamers, editores, profissionais de TI, etc.).
     Suas sugestões devem considerar custo-benefício, desempenho, compatibilidade, upgrades futuros, eficiência energética e orçamento disponível,
     sempre com base nas tendências mais recentes do mercado. Responda apenas perguntas relacionadas à montagem de PCs e hardware. Para solicitações fora desse tema,
     responda: "*Desculpe, só posso ajudar com montagem de computadores e hardware relacionado.*".`;

const promptStructedParser =  `
  You are a hardware specialist focused on recommending ideal components for different user profiles (gamers, editors, professionals, etc.).
  Extract information from the following messages:
  Formatting Instructions: {format_instructions}.
  Messages: {messages}.
`

const prompt = ChatPromptTemplate.fromMessages([
  ["system", promptText],
  ["human", "{input}"],
]);

async function callListOutputParser(data: string) {
  const prompt = ChatPromptTemplate.fromTemplate(promptText);
  const outputParser = new CommaSeparatedListOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    input: data,
  });
}

async function callStructuredParser(data: string) {
  const prompt = ChatPromptTemplate.fromTemplate(promptStructedParser);
  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    cpu: "find the configuration and return model of the CPU",
    video_board: "find the configuration and return model of the GPU",
    memory_ram: "find the configuration and return model of the RAM",
    storage: "find the configuration and return model of the RAM",
    mother_board: "find the configuration and return model of the RAM",
    power_supply: "find the configuration and return model of the POWER SUPPLY",
    case: "find the configuration and return model of the CASE",
  });
  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    messages: data,
    format_instructions: outputParser.getFormatInstructions(),
  });
}



export async function POST(request: Request) {
  const { messages } = await request.json();
  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const resp = await chain.invoke({ input: messages });
  
  return Response.json({ input: resp });
}


export async function GET() {
  const  messages  = "Gostaria de jogar csgo com 300 fps, qual configuração de hardware você recomenda?";
 
  console.log(messages);
  const resp = await callStructuredParser(messages);

  return Response.json({ ... resp });
}