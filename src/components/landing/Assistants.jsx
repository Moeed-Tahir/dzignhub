import React from "react";
import { Syne } from "next/font/google";
import AssistantCard from "@/components/landing/AssistantCard";
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});

const assistants = [
  { src: "/landing/assistants/1.png", name: "Kano (UI/UX)" },
  { src: "/landing/assistants/2.png", name: "Mira (Business Strategy)" },
  { src: "/landing/assistants/3.png", name: "Novi (SEO specialist)" },
  { src: "/landing/assistants/4.png", name: "Sana (Content Creation)" },
];


const assistants2 = [
  { src: "/landing/assistants/3.png", name: "Novi (SEO specialist)" },
  { src: "/landing/assistants/4.png", name: "Sana (Content Creation)" },
  { src: "/landing/assistants/7.png", name: "Kana (Data Analysis)" },
  { src: "/landing/assistants/1.png", name: "Kano (UI/UX)" },
];


function Assistants() {
  return (
    <div className="w-full bg-[#1B1F3B] relative overflow-hidden ">
      <div className="w-[1440px] h-[1235px] mx-auto   ">
        {assistants.map((item, index) => (
          <AssistantCard
            key={`top-${index}`}
            src={item.src}
            name={item.name}
            style={{ left: `${-136 + index * 444}px`, top: "64px" }}
          />
        ))}

        <div className="flex gap-[24px] items-center justify-center absolute top-[443px] w-full h-[348px]">
          <AssistantCard
            src="/landing/assistants/5.png"
            style={{ left: `-111px` }}
            name={"Mira (Growth Strategist)"}
          />

          <div
            className={`w-[764px] ${syne.className} font-semibold text-[80px] text-[#FFFFFF] text-center uppercase`}
          >
            <span>Your</span> <span className="text-[#BDFF00]">AI</span>{" "}
            <span>Assistants</span>
          </div>

          <AssistantCard
            src="/landing/assistants/6.png"
            style={{ right: `-50px` }}
            name={"Zara(Brand Designer)"}
          />
        </div>

        {assistants2.map((item, index) => (
          <AssistantCard
            key={`bottom-${index}`}
            src={item.src}
            name={item.name}
            style={{ left: `${-136 + index * 444}px`, top: "856px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default Assistants;
