"use client";
import SideComponent from "@/components/auth/SideComponent";
import React from "react";
import Image from "next/image";
import SelectableCard from "@/components/ui/SelectableCard";
import { useState } from "react";
import SelectableButton from "@/components/ui/SelectableButton";

const page = () => {
  const cardOptions = [
    {
      id: 1,
      icon: "/onboarding/paintbucket.svg",
      title: "Founder/Entrepreneur",
      description: "Who wanna learn for school",
    },
    {
      id: 2,
      icon: "/onboarding/pen-tool.svg",
      title: "Creative or Designer",
      description: "Who wanna do some work",
    },
    {
      id: 3,
      icon: "/onboarding/bezier.svg",
      title: "Marketer or Agency",
      description: "Who wanna do some work",
    },
    {
      id: 4,
      icon: "/onboarding/mask.svg",
      title: "Coach or Consultant",
      description: "Who wanna do some business",
    },
    {
      id: 5,
      icon: "/onboarding/color-swatch.svg",
      title: "Small Business/Brand Owner",
      description: "Who wanna do some project",
    },
    {
      id: 6,
      icon: "/onboarding/designtools.svg",
      title: "Other",
      description: "Who wanna do some project",
    },
  ];

  const creationOptions = [
    {
      id: 1,
      icon: "🎨",
      label: "Just exploring creative direction",
    },
    {
      id: 2,
      icon: "💻",
      label: "Website / UI / Digital product",
    },
    {
      id: 3,
      icon: "🖋️",
      label: "Brand identity",
    },
    {
      id: 4,
      icon: "📊",
      label: "Business strategy",
    },
    {
      id: 5,
      icon: "🚀",
      label: "Content (posts, ads, blogs)",
    },
  ];

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCreation, setSelectedCreation] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="bg-[#f8f8f8]  shadow-2xl  flex gap-2 h-screen">
      <div className="bg-white m-5 w-[56%] pt-[40px] px-[40px] h-[95vh] flex flex-col justify-between  rounded-3xl">
        <div className="flex justify-start items-center  gap-2">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-[25px] h-[25px] object-contain"
          />
          <span className="font-medium text-[16px] leading-none">allmyai</span>
        </div>

        <div>
          <p className="text-[24px] font-semibold text-[#1B1F3B] mt-10">
            Let’s start with who you are
          </p>

          <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
            What best describes you today?
          </p>
          <div className="flex gap-[8px] flex-wrap">
            {cardOptions.map((card) => (
              <SelectableCard
                key={card.id}
                id={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                isSelected={selectedCards.includes(card.id)}
                onSelect={() => {
                  setSelectedCards((prev) =>
                    prev.includes(card.id)
                      ? prev.filter((id) => id !== card.id)
                      : [...prev, card.id]
                  );
                }}
              />
            ))}
          </div>

          <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
            What are you hoping to create first?{" "}
          </p>
          <div className="flex gap-[8px] transition-all ease-in-out duration-300 flex-wrap">
            {creationOptions.map((card) => (
              <SelectableButton
                key={card.id}
                id={card.id}
                icon={card.icon}
                title={card.label}
                isSelected={selectedCreation.includes(card.id)}
                onSelect={() => {
                  setSelectedCreation((prev) =>
                    prev.includes(card.id)
                      ? prev.filter((id) => id !== card.id)
                      : [...prev, card.id]
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative flex justify-between items-center">
          <div className="absolute top-0 -right-40 border-t-[2px] border-[#F8F8F8] w-[130%]"></div>

          <div className="flex items-center  justify-center gap-2 ">
            {[1, 2].map((tab) => (
              <div
                key={tab}
                className={` w-[218px] h-[8px] rounded-full transition-all duration-300 ${
                  currentTab >= tab ? "bg-[#C209C1]" : "bg-[#F8F8F8]"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={() => {
              if (currentTab < 2) setCurrentTab(currentTab + 1);
            }}
            className="bg-[#BDFF00] text-[#1B1F3B] w-[84px] h-[40px] text-[16px] rounded-full font-medium  my-3"
          >
            Next
          </button>
        </div>
      </div>

      <SideComponent
        title={currentTab === 0 ? " Identity Spark" : "Brand Essence Mapping"}
        isProflePage={true}
      />
    </div>
  );
};

export default page;
