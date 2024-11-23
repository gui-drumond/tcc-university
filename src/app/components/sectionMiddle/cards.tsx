import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="flex border  shadow rounded-md w-[45%] max-w-2xl h-[156px] align-middle mt-10 cursor-pointer ">
      {icon}
      <span className="w-[1px] h-[156px] bg-slate-300 border shadow"></span>
      <div className="w-[50%] h-[126px] flex flex-col justify-center align-middle">
        <h1 className="my-4 mx-3 font-light text-3xl">{title}</h1>
        <p className="my-4 mx-3 font-thin text-xl text-wrap h-1/4">{description}</p>
      </div>
    </div>
  );
}
