export default function SkeletonMiddle(){

    return (
      <div className="border border-blue-300 shadow-lg rounded-md p-14  w-[98%]">
        <div className="animate-pulse flex space-x-4 mt-4">
          <div className="flex-1 space-y-8 py-1">
            <div className="space-y-3">
              <div className="grid grid-rows-3 gap-4 ml-10">
                <div className="w-64 h-8 bg-slate-500 rounded row-span-1"></div>
                <div className="w-3/4 h-4 bg-slate-500 rounded row-span-2"></div>
                <div className="w-1/5 h-4 bg-slate-500 rounded row-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}