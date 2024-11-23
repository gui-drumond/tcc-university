export default function Navbar(){
    return (
      <nav className="flex w-full flex-wrap items-center justify-between shadow-md fixed  bg-[#f8fafc]  bg-gradient-to-r from-[#eaeaf5] from-50%  via-40% to-[##f8fafc] to-70% py-2 shadow-dark-mild lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3 ">
          <div>
            <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
              <span className="text-gray-600 ml-4 font-bold font-sans text-2xl italic">
                PCPARA
              </span>
              <span className="text-red-600 font-bold font-sans text-2xl italic">
                .
              </span>
              <span className="text-gray-600 font-bold font-sans text-2xl italic">
                COM
              </span>
            </a>
          </div>
        </div>
      </nav>
    );
}