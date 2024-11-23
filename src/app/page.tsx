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
          <h1 className="text-4xl font-bold text-center text-slate-500 mb-6">
            Qual o computador que deseja montar ?
          </h1>
          <div className="flex gap-10">
            <Input
              value={search}
              onChange={async (e) => setSearch(e.target.value)}
              placeholder="Diga sua necessidade ex: estudar programação, jogar csgo, etc..."
              style={{ fontSize: "1.5rem" }}
              className="z-10 text-2xl text-gray-600 bg-white   focus-visible:ring-transparent rounded-3xl shadow-2xl p-8 "
            />
            <Button
              className="w-40 p-8 rounded-3xl shadow-2xl text-lg text-gray-700 bg-white border hover:bg-gray-100 bg-gradient-to-r from-indigo-100 from-3%  via-10% to-emerald-100 to-70%"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </div>
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
