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
export default function Landing() {
  const router = useRouter();

  return (
    <>
      <div
        className="overflow-hidden w-full"
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 50%, #c209c1 100%)",
          height: "982px",
        }}
      >
        <div className="w-[1440px]   mx-auto ">
          <div className="flex flex-col gap-[61px]">
            {/* Navbar */}
            <div className="mt-[24px] ml-[89px]">
              <Navbar />
            </div>
            <Hero />
          </div>
        </div>
        {/* Carousel Section */}
        <Carousel />
      </div>
      <div className="w-[1440px] h-[775px] bg-[#FAFAFA] mx-auto">
        <div className="w-[1280px] h-[138px]   mx-auto pt-[80px]">
          <div className="flex gap-[8px] font-semibold  text-[48px]  text-black ">
            <span className="text-[#C209C1]">Endless</span>
            <span className="">possibilites</span>
          </div>
          <h1 className="font-semibold  text-[48px]  text-black">
            with AI art
          </h1>

          <div className="w-[1060px] h-[499px] mx-auto  mt-[56px]  overflow-y-scroll scrollbar-hide">
             <StickyCardStack/>
          </div>
        </div>
      </div>
      <Work />
      <Templates />
      <Download/>
      <FeatureSection/>
      <Pricing/>
      <FAQ/>
    </>
  );
}
