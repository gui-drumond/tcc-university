export default function SkeletonMiddle() {
  return (
    <div className="flex rounded-2xl w-[45%] max-w-2xl h-[156px] align-middle mt-10 cursor-pointer animate-pulse  bg-slate-400 shadow-2xl  z-0">
      <div className="grid grid-rows-3 gap-4 ml-10">
        <div className="w-64 h-[156px] rounded row-span-1"></div>
      </div>
    </div>
  );
}
