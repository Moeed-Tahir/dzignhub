"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardData = [
  {
    id: "01",
    side: "left",
    title: "Video Creation",
    subtitle:
      "Chose from a selection of high-quality AI models and experiment a selection of settings and presets. Seamlessly incorporate style elements or upload your own work for ",
    color: "bg-[#EBEBEB]",
    image: "/video-creation/1.png",
    button: "Create",
  },
  {
    id: "02",
    side: "right",
    title: "Share your Video",
    subtitle:
      "Chose from a selection of high-quality AI models and experiment a selection of settings and presets. Seamlessly incorporate style elements or upload your own work for ",
    color: "bg-[#EBEBEB]",
    button: "Community",
    image: "/video-creation/2.png",
  },
  {
    id: "03",
    side: "left",
    title: "Edit all vidoes",
    subtitle:
      "Chose from a selection of high-quality AI models and experiment a selection of settings and presets. Seamlessly incorporate style elements or upload your own work for ",
    color: "bg-[#EBEBEB]",
    button: "Customization",
    image: "/video-creation/3.png",
  },
  {
    id: "04",
    side: "right",
    title: "Save into your Folders",
    subtitle:
      "Chose from a selection of high-quality AI models and experiment a selection of settings and presets. Seamlessly incorporate style elements or upload your own work for ",
    color: "bg-[#EBEBEB]",
    button: "Storage",
    image: "/video-creation/4.png",
  },
  {
    id: "05",
    side: "left",
    title: "Download the Video",
    subtitle:
      "Chose from a selection of high-quality AI models and experiment a selection of settings and presets. Seamlessly incorporate style elements or upload your own work for ",
    color: "bg-[#EBEBEB]",
    button: "Storage",

    image: "/video-creation/5.png",
  },
];

export default function GSAPScrollSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const leftCards = leftCardsRef.current;
    const rightCards = rightCardsRef.current;

    if (!container || !title) return;

    const allCards = [];
    cardData.forEach((card, index) => {
      const isLeft = card.side === "left";
      const cardElement = isLeft
        ? leftCards[Math.floor(index / 2)]
        : rightCards[Math.floor(index / 2)];
      if (cardElement) {
        allCards.push(cardElement);
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        onStart: () => {
          console.log("Animation started");
        },
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    gsap.set(allCards, {
      y: window.innerHeight + 300,
      opacity: 1,
    });

    gsap.set(title, {
      opacity: 0,
      scale: 0.9,
    });

    tl.to(title, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    allCards.forEach((card, index) => {
      const startTime = 0.5 + index * 0.4;

      tl.fromTo(
        card,
        {
          y: window.innerHeight + 600,
          opacity: 1,
        },
        {
          y: -window.innerHeight - 500,
          opacity: 1,
          duration: 1.2,
          ease: "none",
        },
        startTime
      );
    });
    tl.to(title, {
      opacity: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative max-w-[1440px] w-full mx-auto h-[500vh] "
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <h1
            ref={titleRef}
            className="text-6xl md:text-[68px] font-bold text-black text-center z-0 relative"
          >
            You Need Us If
          </h1>

          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 space-y-8">
            {cardData
              .filter((card) => card.side === "left")
              .map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    if (el) leftCardsRef.current[index] = el;
                  }}
                  className={`w-[514px] h-[714px] flex flex-col justify-between p-6 z-10 rounded-2xl ${card.color} shadow-lg`}
                >
                  <div className="text-[22px]  font-normal mb-4">{card.id}</div>
                  <Image
                    src={card.image}
                    alt
                    width={1000}
                    height={1000}
                    className="w-full h-[314px] rounded-[20px]"
                  />

                  <p className="text-[34px] font-semibold">{card.title} </p>
                  <p className="text-lg font-normal">{card.subtitle}</p>
                  <button
                    type="submit"
                    className={`w-full bg-[#BDFF00] text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4 flex justify-center items-center`}
                  >
                    {card.button}
                  </button>
                </div>
              ))}
          </div>

          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 space-y-8">
            {cardData
              .filter((card) => card.side === "right")
              .map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    if (el) rightCardsRef.current[index] = el;
                  }}
                  className={`w-[514px] h-[714px] flex flex-col justify-between z-10 p-6 rounded-2xl ${card.color} shadow-lg`}
                >
                  <div className="text-[22px]  font-normal mb-4">{card.id}</div>
                  <Image
                    src={card.image}
                    alt
                    width={1000}
                    height={1000}
                    className="w-full h-[314px] rounded-[20px]"
                  />

                  <p className="text-[34px] font-semibold">{card.title} </p>
                  <p className="text-lg font-normal">{card.subtitle}</p>
                  <button
                    type="submit"
                    className={`w-full bg-[#BDFF00]
         text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4 flex justify-center items-center`}
                    // disabled={!isValid}
                    // onClick={handleGenerate}
                  >
                    {card.button}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
