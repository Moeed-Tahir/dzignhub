// src/components/landing/Hero.jsx
"use client";
import { FaArrowRight } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Anybody } from "next/font/google";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-syne" });
const anybody = Anybody({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-anybody" });



export default function Hero() {
  return (
    <>
      {/* Center box with border */}
      <div className="w-[930px] h-[428px] mx-auto rounded-[16px] flex flex-col gap-[40px]">
        {/* Top section (announcement + heading + paragraph) */}
        <div className="flex flex-col gap-[16px]">
          {/* Announcement */}
          <div className="w-[472px] h-[42px] flex items-center justify-around rounded-full mx-auto bg-[#212e62] px-2">
            <div className="w-[24px] h-[24px] p-[1px] rounded-lg bg-gradient-to-tr from-[#5AE2B9] via-[#DCCC3A] to-[#1A76FF]">
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                <MdTranslate className="w-[13px] h-[13px] text-white" />
              </div>
            </div>
            <p className="text-[#A7ADBE] text-[18px]">Speech to speech release!</p>
            <img src="/landing/Announcement-separator.png" className="w-[4px] h-[4px]" />
            <p className="text-[#BDFF00] text-[18px]">Get early access</p>
            <button className="w-[38px] h-[26px] rounded-full bg-[#060606] border border-[#BDFF00] flex items-center justify-center">
              <FaArrowRight className="text-white w-[9px] h-[9px]" />
            </button>
          </div>

          {/* Heading + Paragraph */}
          <div className="flex flex-col gap-[32px]">
            <h1 className={`text-[68px] text-white uppercase text-center leading-tight ${syne.className} font-semibold`}>
              Turn Your Words Into Stunning Visuals
            </h1>
            <p className={`text-[18px] text-[#F0F0F3] text-center leading-[28px] w-[727px] h-[56px] mx-auto ${syne.className}`}>
              Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-[740px] h-[78px] rounded-full mx-auto flex items-center bg-[#212e62] justify-center gap-[8px]">
          <p className="text-[18px] text-[#9997A0]">
            A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
          </p>
          <button className={`w-[179px] h-[54px] bg-[#BDFF00] text-[18px] ${anybody.className} rounded-full flex items-center justify-center gap-[8px]`}>
            <img
              src="/landing/starVector.svg"
              alt="star"
              className="w-[24px] h-[24px] object-contain"
            />
            <span className="text-[#1B1F3B]">Create image</span>
          </button>
        </div>
      </div>

     
          </>
  );
}
