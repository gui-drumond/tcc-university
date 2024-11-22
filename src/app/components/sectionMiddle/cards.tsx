import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="flex rounded-2xl md:w-[45%] w-[90%] max-w-2xl h-[156px] align-middle mt-10 cursor-pointer bg-slate-100 border shadow-2xl  ">
      {icon}
      <span className="w-[1px] h-[156px] bg-slate-200 border shadow"></span>
      <div className="w-[50%] h-[126px] flex flex-col justify-center align-middle">
        <h1 className="my-4 mx-3 font-light text-xl sm:text-3xl">{title}</h1>
        <p className="my-4 mx-3 font-thin text-base sm:text-xl text-wrap h-1/4">
          {description}
        </p>
      </div>
    </div>
  );
}
