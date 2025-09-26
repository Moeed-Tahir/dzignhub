"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStrapiImageUrl } from "@/utils/strapi";

const slides = [
  {
    title: "Your AI co creator is ready",
    description:
      "Access your full team of AI assistants and start building lookbooks, pitch decks, and product visuals in minutes",
  },
  {
    title: "Your AI team, always ready",
    description:
      "From brand design to launch plans, get everything done faster in one place.",
  },
  {
    title: "Smarter tools, simpler work",
    description:
      "AI assistants that think with you, so you can create and launch faster.",
  },
  {
    title: "Collaboration made simple",
    description:
      "Work with your team, clients, or investors in one shared space.",
  },
  {
    title: "Always evolving with you",
    description:
      "Our AI learns from every project, getting smarter so your work keeps getting better.",
  },
];

const SideComponent = ({ isProfilePage, title, desc, sideData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const dynamicSlides = slides;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Slide change trigger
  useEffect(() => {
    if (progress >= 100) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % dynamicSlides.length);
      setProgress(0);
    }
  }, [progress, dynamicSlides.length]);

  return (
    <div
      className={`flex ${
        isProfilePage != true ? "items-start " : "items-end  "
      } justify-center rounded-3xl p-5 overflow-hidden  mr-2 h-[95vh] mt-[20px] w-full px-[40px]  hidden lg:flex bg-cover bg-center `}
      style={{
        backgroundImage: sideData?.backgroundImage
          ? `url('${getStrapiImageUrl(sideData.backgroundImage)}')`
          : "url('/auth/Right_Image.png')",
      }}
    >
      {isProfilePage === true ? (
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex gap-1 w-[80%] justify-center items-center">
            {sideData?.brandIcon ? (
              <img
                src={getStrapiImageUrl(sideData.brandIcon)}
                alt="Brand Icon"
                className="w-[44px] h-[44px] object-contain"
              />
            ) : (
              <Image
                src={"/white-logo.svg"}
                alt="Logo"
                width={100}
                height={100}
                className="w-[200px] h-[44px] object-contain"
              />
            )}
          </div>

          <div className="w-[80%] flex flex-col items-center justify-center">
            <p className="text-[#BDFF00] font-bold text-[40px] text-center px-10">
              {dynamicSlides[currentSlide]?.title}
            </p>
            <p className="text-white opacity-70 text-center text-[18px] px-20 mt-4">
              {dynamicSlides[currentSlide]?.description ||
                dynamicSlides[currentSlide]?.desc}
            </p>
          </div>

          {/* Progress Tabs */}
          <div className="flex gap-2 mt-10 w-full px-10">
            {dynamicSlides.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-2 bg-white/30 rounded overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-[100ms]"
                  style={{
                    width:
                      idx < currentSlide
                        ? "100%"
                        : idx === currentSlide
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mx-10">
            <p className="text-[40px] text-[#BDFF00] font-semibold text-start">
              {title}{" "}
            </p>
            <p className="text-[16px] text-white text-start opacity-70 mt-4">
              This is where your brand essence comes alive. Paste your website
              or share your vision. We capture your style and creative DNA so
              every lookbook, deck, and product visual feels authentically you.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SideComponent;
