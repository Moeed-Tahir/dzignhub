"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import { Check, MoveLeft } from "lucide-react";
import React from "react";
import Image from "next/image";

const page = () => {
  const router = useRouter();

  const cards = [
    {
      Name: "Devina",
      Role: "Technical Implementation & Automation",
      Skills: [
        "Website Development",
        "E-commerce Integration",
        "Marketing Automation",
        "Performance Optimization",
        "Integration & APIs",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
    {
      Name: "Brandy",
      Role: "Brand Strategy & Visual Identity Creation",
      Skills: [
        "Brand Discovery & Analysis",
        "Logo System Creation",
        "Visual Identity System",
        "Brand Guidelines Creation",
        "Asset Generation",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
    {
      Name: "Novi",
      Role: "Search Engine Optimization & Visibility",
      Skills: [
        "Technical SEO Setup",
        "Keyword Research & Strategy",
        "Content Optimization",
        "Local & Mobile SEO",
        "Performance Monitoring",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
    {
      Name: "ELLIE",
      Role: "Presentation Design & Storytelling",
      Skills: [
        "Story Structure Development",
        "Slide Design & Layout",
        "Content Creation",
        "Visual Enhancement",
        "Presentation Optimization",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
    {
      Name: "Sana",
      Role: "Content Creation & Copywriting",
      Skills: [
        "Content Strategy Development",
        "Website Copy Creation",
        "Marketing Content",
        "Sales & Conversion Copy",
        "Content Optimization",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
    {
      Name: "Mira",
      Role: "Business Strategy & Market Positioning",
      Skills: [
        "Market Research & Analysis",
        "Business Model Development",
        "Go-to-Market Strategy",
        "Financial Planning",
        "Strategic Roadmap",
      ],
      "Popular Tasks": [
        "Plan Travel to San Diego & AI Call for Me to Make Reservation",
        "AI Call for Me to Make Restaurant Reservation",
      ],
    },
  ];
  return (
    <div>
      <Navbar />

      <div className="max-w-[1440px] mx-auto  py-6">
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-center items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center w-[44px] cursor-pointer h-[44px]  justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
            >
              <MoveLeft className="w-[24px] h-[24px] " />
            </button>
          </div>

          <div>
            <p className="text-[24px] font-semibold">Creative Agents</p>
            <p className="text-[14px] text-[#68686B] font-normal">
              Work autonomously on your complex tasks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
          {cards.map((card, index) => (
            <div key={index} className="p-6  rounded-[16px] bg-white">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px]  bg-[#F9FAFC] rounded-[16px] flex justify-center items-center">
                  <Image
                    src={`/allAgents/${card.Name.toLowerCase()}.svg`}
                    alt={card.Name}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex justify-between w-full items-center">
                  <div>
                    <h3 className="text-[20px] font-medium">{card.Name}</h3>
                    <p className="text-[14px] text-[#68686B] font-normal">
                      {card.Role}
                    </p>
                  </div>

                  <button className="bg-black rounded-full py-1 px-2 text-white text-[14px]">
                    Task
                  </button>
                </div>
              </div>
              <div className="mt-2 border-t pt-2 border-[#E3E3E3]">
                <div className="flex flex-wrap gap-2 mt-1">
                  {card.Skills.map((skill, skillIndex) => (
                    <span
                      className="text-[12px] text-[#68686B] font-normal flex items-center gap-2"
                      key={skillIndex}
                    >
                      <Check /> {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2 justify-start items-start">
                <h4 className="text-[16px] font-semibold">Popular Tasks:</h4>

                {card["Popular Tasks"].map((task, taskIndex) => (
                  <button
                    key={taskIndex}
                    className="text-[14px] flex gap-2  justify-start whitespace-nowrap items-center  text-[#68686B] p-2 rounded-[8px] bg-[#F7F8F8] font-normal"
                  >
                    {task}{" "}
                    <Image
                      src={`/allAgents/Vector.svg`}
                      alt={" "}
                      width={14}
                      height={14}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="my-5">
            <h1 className="text-[24px] font-semibold">Everyday Agents</h1>
            <p className="text-[14px] text-[#68686B] font-normal">
              Work autonomously on your complex tasks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 ">
            <div className="w-[90%] sm:w-[300px] gap-3 flex-col bg-white rounded-[12px] flex justify-center items-center p-6">
              <div className="w-[50px] h-[50px]  bg-[#F9FAFC] rounded-[16px] flex justify-center items-center">
                <Image
                  src={`/allAgents/gallery-add.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
              </div>
              <h1 className="text-[24px] font-semibold text-center">
                Image Creation
              </h1>
              <button className="bg-[#F7F8F8] text-[#68686B]  text-medium flex justify-center items-center gap-2 text-[14px] px-4 py-2 rounded-[8px]">
                Mixture-of-agents
                <Image
                  src={`/allAgents/Logo 1.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
                <Image
                  src={`/allAgents/google.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="w-[90%] sm:w-[300px] gap-3 flex-col bg-white rounded-[12px] flex justify-center items-center p-6">
              <div className="w-[50px] h-[50px]  bg-[#F9FAFC] rounded-[16px] flex justify-center items-center">
                <Image
                  src={`/allAgents/video-add.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
              </div>
              <h1 className="text-[24px] font-semibold text-center">
                Video Creation
              </h1>
              <button className="bg-[#F7F8F8] text-[#68686B]  text-medium flex justify-center items-center gap-2 text-[14px] px-4 py-2 rounded-[8px]">
                Mixture-of-agents
                <Image
                  src={`/allAgents/Logo 1.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
                <Image
                  src={`/allAgents/google.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
                <Image
                  src={`/allAgents/ai.svg`}
                  alt={" "}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
