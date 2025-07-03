// src/components/landing/Hero.jsx
"use client";
import { FaArrowRight } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Anybody } from "next/font/google";
import { Syne } from "next/font/google";
import HeroCTA from "./HeroCTA";
import HeroCTAMobile from "./HeroCTAMobile";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});
const anybody = Anybody({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-anybody",
});

export default function Hero() {
  return (
    <>
      {/* Center box with border */}
      <div className=" mx-auto lg:rounded-[16px] flex flex-col lg:gap-[40px] mt-10 gap-[32px] lg:static    ">
        {/* Top section (announcement + heading + paragraph) */}
        <div className="flex flex-col lg:gap-[16px] mx-auto gap-[32px]">
          {/* Announcement */}
          <div className="lg:w-[492px] lg:h-[42px] w-[291px] h-[44px] flex items-center justify-around rounded-full mx-auto bg-[#212e62] ">
            <div className="w-[24px] h-[24px] p-[1px] rounded-lg bg-gradient-to-tr from-[#5AE2B9] via-[#DCCC3A] to-[#1A76FF]">
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                <MdTranslate className="w-[13px] h-[13px] text-white" />
              </div>
            </div>
            <p className="text-[#A7ADBE] text-[18px]">
              Speech to speech release!
            </p>

            <img
              src="/landing/Announcement-separator.png"
              className="w-[4px] h-[4px] lg:block hidden"
            />
            <p className="text-[#BDFF00] text-[18px] lg:block hidden">
              Get early access
            </p>
            <button className="lg:flex hidden w-[38px] h-[26px] rounded-full bg-[#060606] border border-[#BDFF00] items-center justify-center">
              <FaArrowRight className="text-white  lg:w-[18px] w-[16px] h-[16px] lg:h-[18px]" />
            </button>
          </div>
          <div className="lg:hidden flex mx-auto gap-[10px] h-[28px] w-[191px]">
            <p className="text-[#BDFF00] lg:text-[18px] text-[16px] ">
              Get early access
            </p>
            <button className="flex  w-[38px] h-[26px] rounded-[100px] bg-[#060606] border border-[#BDFF00] items-center justify-center">
              <FaArrowRight className="text-white lg:w-[18px] w-[16px] h-[16px] lg:h-[18px]" />
            </button>
          </div>
          {/* Heading + Paragraph */}
          <div className="flex flex-col lg:gap-[32px] gap-[18px]">
            <h1
              className={`lg:text-[68px] max-w-[929px] w-full text-[46px] text-white  text-center leading-tight  font-semibold`}
            >
              Turn Your Words Into Stunning Visuals
            </h1>
            <p
              className={`lg:text-[18px] text-[16px] text-[#F0F0F3] text-center leading-[28px] lg:w-[727px] lg:h-[56px] h-[96px] w-[335px]  mx-auto `}
            >
              Whether you need concept art, marketing materials, or personal
              projects, our text-to-image generator brings your imagination to
              life.
            </p>
          </div>
          
          <HeroCTA/>
        </div>

        <HeroCTAMobile/>
      </div>
    </>
  );
}
