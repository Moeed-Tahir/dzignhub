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
export default function Landing() {
  const router = useRouter();

  return (
    <>
      <div
        className="overflow-hidden w-full lg:h-[1055px] h-[1146px]"
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 50%, #c209c1 100%)",
        }}
      >
        <div className="lg:max-w-[1440px]  w-[100%] relative lg:mx-auto ">
          {/* Navbar */}
          <div className="lg:max-w-[1280px] mx-auto lg:w-auto w-[382px]  top-[24px]  flex flex-col lg:gap-[61px]">
            <Navbar />
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
          <div className="lg:w-[1060px] lg:h-[459px] w-[382px] h-[530.83px] absolute lg:top-[0px] top-[37.78px] left-1/2 -translate-x-1/2 lg:rounded-[24px] rounded-[12.38px] overflow-y-scroll scrollbar-hide">
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
