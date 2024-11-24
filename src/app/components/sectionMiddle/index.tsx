import MotherBoard from "../../icons/motherboard";
import VideoBoard from "../../icons/videoboard";
import Storage from "../../icons/storage";
import MemoryRam from "@/app/icons/memoryram";
import PowerSupply from "@/app/icons/powersupply";
import Cpu from "@/app/icons/cpu";
import { ComputerData } from "@/app/page";
import Card from "./cards";
import SkeletonMiddle from "../skeletonMiddle";

interface SectionMiddleProps {
  computer: ComputerData | undefined;
  loading: boolean;
}

export default function SectionMiddle({
  computer,
  loading,
}: SectionMiddleProps) {
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
    <div
      className={`w-full flex justify-center  pt-10 pb-20 ${
        !computer ? "bg-default" : "bg-slate-200"
      } `}
    >
      {loading && (
        <div className="md:max-w-[2000px] md:h-[800px] h-full flex flex-wrap gap-4 w-full justify-center mt-4 items-center flex-col md:flex-row  font-poppins border ">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonMiddle key={index} />
          ))}
        </div>
      )}
      { !loading && computer && selectIcon && (
        <div className="md:max-w-[2000px] md:h-[800px] h-full flex flex-wrap gap-4 w-full justify-center mt-4 items-center flex-col md:flex-row  font-poppins border ">
          {Object.keys(selectIcon).map((icon) => (
            <Card
              key={icon}
              title={selectIcon[icon as string].title}
              icon={selectIcon[icon as string].component()}
              description={computer[icon as keyof ComputerData]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
