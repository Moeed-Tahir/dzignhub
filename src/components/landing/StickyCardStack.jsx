import React, { useRef } from "react";
import { Syne } from "next/font/google";
import { sfPro } from "@/fonts/sfPro";
import { motion, useScroll } from "framer-motion";

const cards = [
  { title: "Card 1", color: "bg-[#E4E7FA]" },
  { title: "Card 2", color: "bg-[#E4E7FA]" },
  { title: "Card 3", color: "bg-[#E4E7FA]" },
  { title: "Card 4", color: "bg-[#E4E7FA]" },
];

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600"],
});

const StickyCardStack = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={container} className="relative ">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`sticky h-full w-full flex flex-col lg:p-[64px] p-[32px]  ${card.color} ${syne.className}`}
          style={{ top: `${index * 25}px` }}
        >
          <div className="w-full h-full flex flex-col gap-[24px] lg:gap-[0px] lg:flex-row justify-between">
            <div className="flex flex-col gap-[12.38px] lg:gap-[24px] w-full lg:w-[40%] ">
              <p className="text-[16px] text-[#000000]">0{index + 1}</p>
              <div className="flex flex-col lg:gap-[20px] gap-[10.32px]">
                <div className="flex flex-col lg:gap-[8px] gap-[4.13px]">
                  <h2 className="text-[#C209C1] text-[32px] font-semibold uppercase">
                    Zara
                  </h2>
                  <h2 className={`text-[24px] ${sfPro.className}`}>
                    Brand Designer
                  </h2>
                </div>
                <p className="text-[18px] text-[#3D4050]">
                  Zara helps you bring your brand to life with powerful visual
                  identity tools. She specializes in Logo Creation: Generates
                  unique, on-brand logos tailored to your business vibe.
                </p>
              </div>
            </div>
            <div className="lg:max-w-[481px] lg:w-[480px] lg:h-[331px] max-w-[318px] h-[184px] relative lg:rounded-[20px] bg-[#C209C1] overflow-hidden">
              <img
                src="/landing/stickyCards/icon.svg"
                className="absolute left-[15px] top-[15px] w-[32px] h-[32px] lg:w-[24px] lg:h-[24px]"
              />

              <img
                src="/landing/assistants/6.png"
                className="object-cover absolute lg:h-[424px] lg:top-[-46px] lg:w-[424px] lg:left-[29px] w-[218.8px] h-[218.8px] top-[-23.88px] left-[49.97px]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCardStack;
