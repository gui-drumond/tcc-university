"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SectionMiddle from "./components/sectionMiddle";
import { Button } from "@/components/ui/button";
import HowToWork from "./components/sectionMiddle/howtowork";
import { ChevronRight } from "lucide-react";
import Head from "next/head";
export interface ComputerData {
  videoboard: string;
  motherboard: string;
  memoryRam: string;
  storage: string;
  powerSupply: string;
  cpu: string;
  total: string;
}
export default function Home() {
  const [computerData, setComputerData] = useState<ComputerData>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    scrollTo({ top: 9999, behavior: "smooth" });
    setLoading(true);
    try {
      if (!!search.trim()) {
        const response = await fetch("/api/agent/computer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: search,
          }),
        });
        const data = await response.json();
        setComputerData(data);
        setSearch("");
        console.log("Resposta do Agente:", data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("messages", JSON.stringify(computerData));
      console.error("Erro ao enviar solicitação:", error);
    }
    
  };

  return (
    <>
      <Head>
        <title>PC PARA {search}</title>
        <meta property="og:title" content={`PC PARA ${search}`} key="title" />
      </Head>
      <div className="flex flex-wrap flex-col justify-between items-center w-full h-full min-h-screen bg-default">
        <div className="w-full mt-[50%]  md:mt-36 md:max-w-5xl md:min-h-[65dvh] flex flex-col justify-center relative">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-6">
            Qual será o principal uso do seu computador?
          </h1>
          <div className="flex w-full md:w-[1120px] h-[50dvh] md:h-auto  justify-center">
            <Input
              className="md:w-full w-[70%] text text-gray-600 bg-white focus-visible:ring-[none] rounded-3xl shadow-2xl p-8 rounded-r-none "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Diga sua necessidade ex: estudar programação, jogar csgo, etc..."
              style={{ fontSize: "1rem" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <Button
              className="w-30 p-8 rounded-3xl rounded-l-none shadow-2xl text-lg  border text-gray-700 bg-white  hover:bg-indigo-100"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </div>
          <Button
            className="rounded-full rotate-90 animate-pulse absolute bottom-0 right-[42%]"
            variant="outline"
            size="icon"
            onClick={() => scrollTo({ top: 9999, behavior: "smooth" })}
          >
            <ChevronRight />
          </Button>
        </div>
        <HowToWork />
        <SectionMiddle computer={computerData} loading={loading} />
      </div>
    </>
  );
}
