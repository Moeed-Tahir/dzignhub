"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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

const SideComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

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
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setProgress(0);
    }
  }, [progress]);

  return (
    <div
      className="flex items-end justify-center rounded-4xl p-5 overflow-hidden w-1/2 mr-2 h-[95vh] my-auto bg-cover bg-center fixed top-2 right-2 bottom-2"
      style={{ backgroundImage: "url('/auth/Right_Image.png')" }}
    >
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="flex gap-1 items-center">
          <Image
            src={"/white-logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="w-10 h-10 object-contain"
          />
          <p className="text-white text-[22px] font-medium">allmyai</p>
        </div>

        <div>
          <p className="text-[#BDFF00] font-bold text-4xl text-center px-10">
            {slides[currentSlide].title}
          </p>
          <p className="text-white text-center text-sm px-20 mt-4">
            {slides[currentSlide].desc}
          </p>
        </div>

        {/* Progress Tabs */}
        <div className="flex gap-2 mt-10 w-full px-10">
          {slides.map((_, idx) => (
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
    </div>
  );
};

export default SideComponent;
