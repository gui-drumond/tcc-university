

import {
  Tooltip as TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipContentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Tooltip({ description, children, title }: TooltipContentProps) {
  return (
    <TooltipProvider skipDelayDuration={1} delayDuration={0}>
      <TooltipContainer>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="w-[300px] p-5 rounded-md" >
          <h2 className="text-pretty text-xl font-semibold text-gray-800 ">
            {title}
          </h2>
          <p className="text-pretty  font-roboto text-lg">{description}</p>
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  );
}
