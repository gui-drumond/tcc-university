import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="flex rounded-2xl md:w-auto lg:w-[50%] w-[90%] max-w-2xl h-[156px] justify-items-center gap-2 mt-10 cursor-pointer bg-slate-100 border shadow-2xl  ">
      {icon}
      <span className="w-[1px] h-[156px] bg-slate-200 border shadow"></span>
      <div className="md:w-auto h-full flex flex-col justify-center align-middle">
        <h1 className="my-4 ml-3 w-[245px] font-light sm:text-3xl md:text-2xl  lg:text-3xl">
          {title}
        </h1>
        <p className="my-4 mx-3 font-thin text-base  sm:text-lg md:text-base  lg:text-xl text-wrap h-1/4">
          {description}
        </p>
      </div>
    </div>
  );
}
