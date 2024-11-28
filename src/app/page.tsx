"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import SectionMiddle from "./components/sectionMiddle";
import { Button } from "@/components/ui/button";
import HowToWork from "./components/sectionMiddle/howtowork";
import { ChevronRight } from "lucide-react";
import Head from "next/head";
import { Info } from "lucide-react";
import Tooltip from "./components/tooltip";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useToast } from "@/hooks/use-toast";

export interface ComputerData {
  videoboard: string;
  motherboard: string;
  memoryRam: string;
  storage: string;
  powerSupply: string;
  cpu: string;
  total: string;
  message?: string;
}
export default function Home() {
  const [computerData, setComputerData] = useState<ComputerData>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyTour, setAlreadyTour] = useState<null | number>();
  const { toast } = useToast();

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#searchContainer",
        popover: {
          title: "Seja bem-vindo! ",
          description:
            "Aqui você fará a pesquisa pelo computador baseado na sua necessidade.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#searchInput",
        popover: {
          title: "Escreva",
          description:
            'Coloque aqui a necessidade de uso \n Ex: "Estudar programação em JAVA e REACT", "Tenho R$ 2.000,00 para o PC inteiro", "Quero custo baixo, mas com upgrade fácil no futuro", "Jogar csgo no maximo a 80fps", etc...',
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#detailsToSearch",
        popover: {
          title: "Dúvidas?",
          description:
            "Se tiver dúvidas coloque o mouse sobre esse botão, ele lhe dará informações sobre o porquê de detalhar sua necessidade.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#submitInput",
        popover: {
          title: "Enviar necessidade(s)",
          description:
            "Clique aqui para enviar a solicitação e receber a recomendação.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#moreAbout",
        popover: {
          title: "Mais sobre nossa IA",
          side: "top",
          align: "start",
        },
      },
    ],
    onCloseClick: () => {
      scrollTo({ top: 0, behavior: "smooth" });
      driverObj.destroy();
    },

    onDestroyed: () => {
      console.log("Tour finalizado");
      localStorage.setItem("computerTour", String(alreadyTour ?? 0 + 1));
      setAlreadyTour(3);
      localStorage.setItem("computerTour", String(3));
    },
    nextBtnText: "Próximo",
    prevBtnText: "Anterior",
    doneBtnText: "Finalizar",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!!search.trim()) {
        scrollTo({ top: 9999, behavior: "smooth" });
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

        if (data?.message) {
          toast({
            title: "Houve um erro ao enviar a solicitação",
            description: data?.message
              ? data?.message
              : "Por favor, tente novamente mais tarde",
            variant: "destructive",
          });
        } else {
          setComputerData(data);
        }
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Houve um erro ao enviar a solicitação",
        description: computerData?.message
          ? computerData?.message
          : "Por favor, tente novamente mais tarde",
        variant: "destructive",
      });
      setLoading(false);
      console.log("messages", JSON.stringify(computerData));
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  useEffect(() => {

    if (typeof window !== "undefined") {
      const tour = Number(localStorage.getItem("computerTour"));
      setAlreadyTour(tour);
      if (!tour) {
        localStorage.setItem("computerTour", String(0));
        setAlreadyTour(0);
        driverObj.drive();
      }
      if (tour! <= 1) {
        driverObj.drive();
      }
    }
    

  }, [alreadyTour, driverObj]);

  const detailsToSearch = {
    title: "Por que detalhar seu pedido?",
    description: ` 
  Quanto mais claro e detalhado você for, mais precisas serão as recomendações da IA. 
  Inclua informações como orçamento, requisitos mínimos e preferências. 
  Assim, garantimos resultados alinhados às suas necessidades 
  e focados no melhor custo-benefício.`,
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
          <div
            id="searchContainer"
            className="flex w-full md:w-[1120px] h-[50dvh] md:h-auto  justify-center"
          >
            <Tooltip
              title={detailsToSearch.title}
              description={detailsToSearch.description}
            >
              <Button
                id="detailsToSearch"
                className="w-34 p-8 rounded-3xl rounded-r-none shadow-2xl text-lg  border text-gray-700 bg-white  hover:bg-indigo-100"
                onClick={() => console.log("")}
              >
                <Info
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                />
              </Button>
            </Tooltip>

            <Input
              id="searchInput"
              className="md:w-[65%] w-[70%] text text-gray-600 bg-white focus-visible:ring-[none] rounded-3xl shadow-2xl p-8 rounded-r-none  rounded-l-none z-0 "
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
              id="submitInput"
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
