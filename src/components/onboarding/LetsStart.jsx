import React from "react";
import Image from "next/image";
import SelectableCard from "@/components/onboarding/SelectableCard";
import { useState } from "react";
import SelectableButton from "@/components/onboarding/SelectableButton";

const LetsStart = () => {
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
      icon: "️🖥️",
      label: "Website / UI / Digital product",
    },
    {
      id: 3,
      icon: "🖌️",
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
  return (
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
  );
};

export default LetsStart;
