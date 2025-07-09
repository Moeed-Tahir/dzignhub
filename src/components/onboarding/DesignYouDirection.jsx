"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import SelectableCard from "@/components/onboarding/SelectableCard";
import SelectableButton from "@/components/onboarding/SelectableButton";
import { Plus } from "lucide-react";
import TagInputBar from "./TagInputBar";

const DesignYouDirection = forwardRef(({ onDataChange }, ref) => {
  
  const cardOptions = [
    {
      id: 1,
      value: "editorial",
      icon: "/onboarding/paintbucket.svg",
      title: "Editorial",
    },
    {
      id: 2,
      value: "clean-neutrals",
      icon: "/onboarding/pen-tool.svg",
      title: "Clean Neutrals",
    },
    {
      id: 3,
      value: "high-contrast",
      icon: "/onboarding/bezier.svg",
      title: "High Contrast",
    },
    {
      id: 4,
      value: "color-rich-expressive",
      icon: "/onboarding/mask.svg",
      title: "Color-Rich & Expressive",
    },
    {
      id: 5,
      value: "earth-toned",
      icon: "/onboarding/color-swatch.svg",
      title: "Earth-toned",
    },
    {
      id: 6,
      value: "dark-sleek",
      icon: "/onboarding/designtools.svg",
      title: "Dark & Sleek",
    },
  ];

  // Make this static to avoid re-initialization
  const staticCreationOptions = [
    { id: 1, value: "refined", icon: "🎨", label: "Refined" },
    { id: 2, value: "bold", icon: "️🖥️", label: "Bold" },
    { id: 3, value: "visionary", icon: "🖌️", label: "Visionary" },
    { id: 4, value: "draw-cano", icon: "📊", label: "Draw Cano" },
    { id: 5, value: "grounded", icon: "📊", label: "Grounded" },
    { id: 6, value: "minimalist", icon: "🚀", label: "Minimalist" },
  ];

  const [creationOptions, setCreationOptions] = useState(staticCreationOptions);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCreation, setSelectedCreation] = useState([]);
  const [customLabel, setCustomLabel] = useState("");
  const [brandWords, setBrandWords] = useState([]);
  const [customBrandTones, setCustomBrandTones] = useState([]);

  const getSelectedDesignStyles = () => {
    return selectedCards.map(id => 
      cardOptions.find(card => card.id === id)?.value
    ).filter(Boolean);
  };

  const getSelectedBrandTones = () => {
    // Only get selected static tones - don't include custom tones here
    const staticTones = selectedCreation.map(id => {
      // Check if it's a static option first
      const staticOption = staticCreationOptions.find(option => option.id === id);
      if (staticOption) {
        return staticOption.value;
      }
      // If not static, find in current options (custom ones)
      const customOption = creationOptions.find(option => option.id === id);
      return customOption?.value;
    }).filter(Boolean);
    
    return staticTones; // Don't combine with customBrandTones to avoid duplicates
  };


  const saveTab2Data = async () => {
    const designStyles = getSelectedDesignStyles();
    const selectedTones = getSelectedBrandTones();

    const tab2Data = {
      brandWords: brandWords,
      brandTone: selectedTones, // Only selected tones
      customBrandTones: customBrandTones, // Separate custom tones
      designStyle: designStyles,
      currentStep: 1,
      isCompleted: true
    };

    console.log('Tab 2 Data being sent:', tab2Data); // Debug log

    if (onDataChange) {
      onDataChange(tab2Data);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tab2Data)
      });

      const data = await response.json();
      if (data.type === 'success') {
        console.log('Tab 2 data saved successfully');
        return true;
      } else {
        console.error('Error saving tab 2 data:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error saving tab 2 data:', error);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    saveData: saveTab2Data,
    getData: () => ({
      brandWords,
      brandTone: getSelectedBrandTones(),
      customBrandTones,
      designStyle: getSelectedDesignStyles()
    })
  }));

  const handleAddCustomOption = () => {
    if (customLabel.trim() === "") return;

    const customTone = customLabel.trim();
    const customValue = customTone.toLowerCase().replace(/\s+/g, '-');
    
    // Add to custom brand tones array
    setCustomBrandTones(prev => [...prev, customValue]);

    const newOption = {
      id: Date.now(),
      value: customValue,
      icon: "✨",
      label: customTone,
      isCustom: true // Mark as custom
    };

    setCreationOptions((prev) => [...prev, newOption]);
    
    // Auto-select the newly added custom option
    setSelectedCreation(prev => [...prev, newOption.id]);
    
    setCustomLabel("");
  };

  // Handle brand words from TagInputBar
  const handleBrandWordsChange = (words) => {
    console.log('Brand words updated:', words); // Debug log
    setBrandWords(words);
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
        <TagInputBar 
          onTagsChange={handleBrandWordsChange}
          maxTags={3}
        />
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
        <div className="flex items-center border border-[#DFE1E7] rounded-full pl-3 pr-2 py-2 gap-2">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Other"
            className="outline-none text-sm w-[100px] bg-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomOption();
              }
            }}
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
        What visual style resonates with your brand?
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

      {/* Debug section - remove in production */}
      {/* {(selectedCards.length > 0 || selectedCreation.length > 0 || brandWords.length > 0) && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Data:</h4>
          <p><strong>Brand Words:</strong> {brandWords.join(', ') || 'None'}</p>
          <p><strong>Selected Brand Tones:</strong> {getSelectedBrandTones().join(', ') || 'None'}</p>
          <p><strong>Custom Brand Tones (separate):</strong> {customBrandTones.join(', ') || 'None'}</p>
          <p><strong>Design Styles:</strong> {getSelectedDesignStyles().join(', ') || 'None'}</p>
        </div>
      )} */}
    </div>
  );
});

DesignYouDirection.displayName = 'DesignYouDirection';
export default DesignYouDirection;