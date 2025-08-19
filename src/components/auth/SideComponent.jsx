"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStrapiImageUrl } from "@/utils/strapi";

const slides = [
  {
    title: "Your Ultimate advance AI assistance",
    desc: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  },
  {
    title: "Powerful NLP Features",
    desc: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  },
  {
    title: "Seamless Collaboration",
    desc: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  },
  {
    title: "Always Learning, Always Improving",
    desc: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  },
];

const SideComponent = ({ isProfilePage, title, desc, sideData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Use dynamic slides if available, otherwise use static fallback slides
  const dynamicSlides = sideData?.slides || slides;

  // Progress increment logic
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
          : "url('/auth/Right_Image.png')" 
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
                src={"/white-logo.png"}
                alt="Logo"
                width={100}
                height={100}
                className="w-[44px] h-[44px] object-contain"
              />
            )}
            <p className="text-white text-[27px] font-medium">
              {sideData?.brandTitle || "allmyai"}
            </p>
          </div>

          <div className="w-[80%] flex flex-col items-center justify-center">
            <p className="text-[#BDFF00] font-bold text-[40px] text-center px-10">
              {dynamicSlides[currentSlide].title}
            </p>
            <p className="text-white opacity-70 text-center text-[18px] px-20 mt-4">
              {dynamicSlides[currentSlide].description || dynamicSlides[currentSlide].desc}
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
            <p className="text-[20px] text-white text-start opacity-70 mt-4">
              Before we begin, we’ll align with your goals, vision, and creative
              preferences. This isn’t a form. It’s a mirror.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SideComponent;
