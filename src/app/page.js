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
        className={`overflow-hidden w-full relative lg:h-[1095px] h-[1146px]  ${
          sidebarOpen ? "" : ""
        }`}
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 56%, #c209c1 100%)",
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />

        <div className="lg:max-w-[1440px]  w-[100%] relative lg:mx-auto ">
          <div className="lg:max-w-[1280px] mx-auto lg:w-auto  min-w-[382px]  w-full  top-[24px]  flex flex-col lg:gap-[61px]">
            <Navbar
              showSidebarBtn={!sidebarOpen}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
            <Hero />
          </div>
        </div>
      </div>

        <Carousel />

      <div className="  bg-[#FAFAFA] max-w-[1440px]  mx-auto flex flex-col p-[24px]   lg:pt-[80px] lg:px-[80px] ">
        <div className="">
          <div className="flex gap-[8px] font-semibold  lg:text-[48px] text-[28px]  text-black ">
            <span className="text-[#C209C1]">Endless</span>
            <span className="">possibilites</span>
          </div>
          <h1 className="font-semibold  lg:text-[48px] text-[28px]  text-black">
            with AI art
          </h1>
        </div>
      </div>
      <StickyCardStack />
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
