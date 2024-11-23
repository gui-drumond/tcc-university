"use client";
import { Input } from "@/components/ui/input";

import { FormEvent, useState } from "react";
import { Suspense } from "react";
import SectionMiddle from "./components/sectionMiddle";
import { Button } from "@/components/ui/button";

export interface ComputerData {
  videoboard: string;
  motherboard: string;
  memoryRam: string;
  storage: string;
  powerSupply: string;
  cpu: string;
}
export default function Home() {
  const [computerData, setComputerData] = useState<ComputerData>();
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.log("messages", JSON.stringify(computerData));
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col gap-32 items-center w-full h-full min-h-screen bg-gray-400 bg-gradient-to-r from-indigo-300 from-3%  via-10% to-emerald-200 to-70%">
        <div className="w-full mt-36 max-w-5xl min-h-[500px] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center text-gray-600 mb-6">
            IA Agente de Peças
          </h1>
          <Input
            value={search}
            onChange={async (e) => setSearch(e.target.value)}
            placeholder="Que computador deseja montar? "
            className="z-10 placeholder:text-xl  text-gray-600 bg-white rounded-3xl shadow-2xl p-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="w-20 text-lg text-gray-700 bg-white rounded-xl hover:bg-slate-200"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
        {computerData && (
          <Suspense fallback={<p>Carregando...</p>}>
            <SectionMiddle computer={computerData} />
          </Suspense>
        )}
      </div>
    </>
  );
}
