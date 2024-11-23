import { Suspense } from "react";
import MotherBoard from "../../icons/motherboard";
import VideoBoard from "../../icons/videoboard";
import Storage from "../../icons/storage";
import SkeletonMiddle from "../skeletonMiddle";
import MemoryRam from "@/app/icons/memoryram";
import PowerSupply from "@/app/icons/powersupply";
import Cpu from "@/app/icons/cpu";
import { ComputerData } from "@/app/page";
import Card from "./cards";

interface SectionMiddleProps {
  computer:  ComputerData ;
}

export default function SectionMiddle({ computer }: SectionMiddleProps) {
  const selectIcon: Record<
    string,
    { title: string; component: () => JSX.Element }
  > = {
    video_board: {
      title: "Placa de Vídeo",
      component: () => (
        <VideoBoard width="150px" height="150px" className="p-2" />
      ),
    },
    mother_board: {
      title: "Placa Mãe",
      component: () => (
        <MotherBoard width="150px" height="150px" className="p-2" />
      ),
    },
    memory_ram: {
      title: "Memória Ram",
      component: () => (
        <MemoryRam width="150px" height="150px" className="p-2" />
      ),
    },
    storage: {
      title: "Armazenamento",
      component: () => <Storage width="150px" height="150px" className="p-2" />,
    },
    power_supply: {
      title: "Fonte de Alimentação",
      component: () => (
        <PowerSupply width="150px" height="150px" className="p-2" />
      ),
    },
    cpu: {
      title: "Processador",
      component: () => (
        <Cpu width="150px" height="150px" className="p-2 bg-red" />
      ),
    },
  };

  return (
    <Suspense fallback={<SkeletonMiddle />}>
      <div className="w-[100%] h-full bg-gray-50 flex flex-col align-middle  justify-center">
        <div className="my-4 mx-32 py-16 ">
          <h3 className="text-gray-90000 font-semibold text-4xl font-poppins mb-3">
            Como funciona?
          </h3>
          <p className="text-xl ">
            Você escolhe como será a utilizado o computador e nós devolveremos o
            melhor custo-benefício, detalhando modelos e as peças. <br /> <br />
            Essas informações serão listadas abaixo:
          </p>
        </div>
        <div className="w-full h-[600px] flex flex-wrap mt-4 justify-evenly border-t-2  shadow font-poppins">
          {selectIcon &&
            Object.keys(selectIcon).map((icon) => (
              <Card
                key={icon}
                title={selectIcon[icon as string].title}
                icon={selectIcon[icon as string].component()}
                description={computer[icon as keyof ComputerData]}
              />
            ))}
        </div>
      </div>
    </Suspense>
  );
}
