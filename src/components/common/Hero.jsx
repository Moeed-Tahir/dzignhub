import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";

function Hero({ title, subtitle, sidebarOpen, setSidebarOpen }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-[#1B1F3B] bg-[radial-gradient(ellipse_135%_120%_at_bottom,rgba(194,9,193,0.6)_0%,rgba(27,31,59,1)_50%)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <Navbar
            showSidebarBtn={!sidebarOpen}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        </div>
      </div>
      <div className="flex lg:py-[64px] md:px-10 xl:px-0 px-5 py-[40px] max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-[16px]">
          <button className={`py-[8px] px-[16px] w-fit bg-white/10 border border-[#C209C1] rounded-[100px] text-white text-[18px] text-center transition-all duration-700 ease-out hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-[#C209C1]/25 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            {subtitle}
          </button>
          <h1 className={`font-bold lg:text-[68px] text-[46px] text-white transition-all duration-900 ease-out hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:to-[#C209C1] hover:bg-clip-text ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {title}
          </h1>
        </div>
      </div>
    </div>

  );
}

export default Hero;
