import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Sidebar from "../landing/Sidebar";
function Hero({ title, subtitle,sidebarOpen,setSidebarOpen }) {

  return (
    
     
      <div className=" bg-[#1B1F3B] bg-[radial-gradient(ellipse_135%_120%_at_bottom,rgba(194,9,193,0.6)_0%,rgba(27,31,59,1)_50%)]">
        <div className="max-w-[1440px] mx-auto">
          <Navbar
            showSidebarBtn={!sidebarOpen}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        </div>
        <div className="flex lg:py-[64px] lg:px-[80px] py-[40px] px-[20px] max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-[16px]">
            <button className="py-[8px] px-[16px] w-fit  bg-white/10 border border-[#C209C1] rounded-[100px] text-white text-[18px] text-center">
              {subtitle}
            </button>
            <h1 className="font-bold lg:text-[68px] text-[46px] text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>

  );
}

export default Hero;
