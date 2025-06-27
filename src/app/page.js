"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Templates from "@/components/landing/Templates";
import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Carousel from "@/components/landing/Carousel";
import StickyCardStack from "@/components/landing/StickyCardStack";
import Download from "@/components/landing/Download";
import FeatureSection from "@/components/landing/FeatureSection";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Assistants from "@/components/landing/Assistants";
import Footer from "@/components/common/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Sidebar from "@/components/landing/Sidebar";
import { useState } from "react";

export default function Landing() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div
        className={`overflow-hidden w-full relative lg:h-[1095px] h-[1146px] ${sidebarOpen ? "":""}`}
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 56%, #c209c1 100%)",
        }}
      >
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className=" inset-0 absolute z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)} // Click outside to close
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        <div className="lg:max-w-[1440px]  w-[100%] relative lg:mx-auto ">
          {/* Navbar */}
          <div className="lg:max-w-[1280px] mx-auto lg:w-auto  min-w-[382px]  w-full  top-[24px]  flex flex-col lg:gap-[61px]">
            <Navbar  showSidebarBtn={!sidebarOpen}
             onOpenSidebar={() => setSidebarOpen(true)}
             />
            <Hero />
          </div>
        </div>
        {/* Carousel Section */}
        <Carousel />
      </div>

      <div className="  bg-[#FAFAFA] max-w-[1440px] mx-auto flex flex-col p-[24px] gap-[24px] lg:pt-[80px] lg:px-[80px] lg:gap-[56px] ">
        <div className="">
          <div className="flex gap-[8px] font-semibold  lg:text-[48px] text-[28px]  text-black ">
            <span className="text-[#C209C1]">Endless</span>
            <span className="">possibilites</span>
          </div>
          <h1 className="font-semibold  lg:text-[48px] text-[28px]  text-black">
            with AI art
          </h1>
        </div>
        <div className=" h-[519.61px] lg:h-[499px]  mx-auto relative">
         <div className="lg:max-w-[1060px] lg:w-full w-[330px] lg:h-[459px] max-w-[382px] xl:px-[20px] h-[530.83px]  lg:top-[0px] top-[37.78px]  lg:rounded-[24px] rounded-[12.38px] overflow-y-scroll scrollbar-hide">
            <StickyCardStack />
          </div>
        </div>
      </div>
      <Work />
      <Templates />
      <Download />
      <FeatureSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Assistants />
      <Footer />
    </>
  );
}
