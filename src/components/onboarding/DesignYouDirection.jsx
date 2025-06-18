"use client";

import React, { useState } from "react";
import Image from "next/image";
import SelectableCard from "@/components/onboarding/SelectableCard";
import SelectableButton from "@/components/onboarding/SelectableButton";
import { Plus } from "lucide-react";
import TagInputBar from "./TagInputBar";

const DesignYouDirection = () => {
  const cardOptions = [
    {
      id: 1,
      icon: "/onboarding/paintbucket.svg",
      title: "Editorial",
    },
    {
      id: 2,
      icon: "/onboarding/pen-tool.svg",
      title: "Clean Neutrals",
    },
    {
      id: 3,
      icon: "/onboarding/bezier.svg",
      title: "High Contrast",
    },
    {
      id: 4,
      icon: "/onboarding/mask.svg",
      title: "Color-Rich & Expressive",
    },
    {
      id: 5,
      icon: "/onboarding/color-swatch.svg",
      title: "Earth-toned",
    },
    {
      id: 6,
      icon: "/onboarding/designtools.svg",
      title: "Dark & Sleek",
    },
  ];

  const [creationOptions, setCreationOptions] = useState([
    { id: 1, icon: "🎨", label: "Refined" },
    { id: 2, icon: "️🖥️", label: "Bold" },
    { id: 3, icon: "🖌️", label: "Visionary" },
    { id: 4, icon: "📊", label: "Draw Cano" },
    { id: 5, icon: "📊", label: "Grounded" },
    { id: 6, icon: "🚀", label: "Minimalist" },
  ]);

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCreation, setSelectedCreation] = useState([]);
  const [customLabel, setCustomLabel] = useState("");

  const handleAddCustomOption = () => {
    if (customLabel.trim() === "") return;

    const newOption = {
      id: Date.now(), // unique ID
      icon: "✨",
      label: customLabel.trim(),
    };

    setCreationOptions((prev) => [...prev, newOption]);
    setCustomLabel(""); // clear input
  };

  return (
    <div>
      <p className="text-[24px] font-semibold text-[#1B1F3B] mt-10">
        Design Your Direction
      </p>

      <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
        What 3 words describe the style or energy of your brand?{" "}
      </p>

      <div>
        <TagInputBar />
      </div>
      <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
        What kind of tone fits your brand best?
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

        {/* Custom Input */}
        <div className="flex items-center border border-[#DFE1E7] rounded-full pl-3  pr-2 py-2 gap-2">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Other"
            className="outline-none text-sm w-[100px] bg-transparent"
          />
          <button
            type="button"
            onClick={handleAddCustomOption}
            className="text-[#1B1F3B] bg-[#f8f8f8] w-[36px] h-[36px] flex justify-center items-center rounded-full hover:text-[#1B1F3B]"
          >
            <Plus size={28} />
          </button>
        </div>
      </div>

      <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
        What best describes you today?
      </p>
      <div className="flex gap-[8px] flex-wrap">
        {cardOptions.map((card) => (
          <SelectableCard
            key={card.id}
            id={card.id}
            isThemeCard={true}
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
    </div>
  );
};

export default DesignYouDirection;
