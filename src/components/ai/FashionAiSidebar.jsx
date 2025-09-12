"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, HelpCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsQuestionCircleFill } from "react-icons/bs";
import { BsArrowDownCircle } from "react-icons/bs";
import Image from "next/image";

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  showHelp = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(defaultOpen ? "auto" : "0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);

        const timer = setTimeout(() => setHeight("auto"), 300);
        return () => clearTimeout(timer);
      } else {
        setHeight(`${contentRef.current.scrollHeight}px`);

        requestAnimationFrame(() => setHeight("0px"));
      }
    }
  }, [isOpen]);

  const toggleOpen = () => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
      requestAnimationFrame(() => setHeight("0px"));
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full text-left mb-3 transition-all duration-200 hover:opacity-80"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{title}</span>
          {showHelp && (
            <BsQuestionCircleFill className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div
          className={cn(
            "transition-transform duration-300 ease-in-out",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

function CategoryTags() {
  const [selectedCategory, setSelectedCategory] = useState("Collection");
  const categories = [
    "Stylist",
    "Branding",
    "Trends",
    "Collection",
    "Garment",
    "Models",
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-[10px] transition-all duration-200 ease-in-out transform hover:scale-105",
              selectedCategory === category
                ? "bg-black text-white shadow-lg"
                : "bg-white border text-muted-foreground hover:bg-muted/80 hover:shadow-md"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

function ModeTags() {
  const [selectedMode, setSelectedMode] = useState("AI helper");
  const modes = [
    "AI helper",
    "Text to image",
    "Image to image",
    "Image to text",
    "Text to video",
    "Image to video",
    "Text to 3D",
    "3D to 3D",
    "Image to 3D",
    "Video to video",
    "Text to audio",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => setSelectedMode(mode)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-[10px] transition-all duration-200 ease-in-out transform hover:scale-105",
            selectedMode === mode
              ? "bg-black text-white shadow-lg"
              : "bg-white border text-muted-foreground hover:bg-muted/80 hover:shadow-md"
          )}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

function StyleOptions() {
  const [selectedStyle, setSelectedStyle] = useState("Accessory");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = ["Freestyle", "Clothing", "Accessory", "Beauty"];
  const features = [
    "Design Pattern",
    "Color Palette",
    "Texture & Fabric",
    "Silhouette",
    "Print Design",
    "Embellishments",
    "Fit & Cut",
    "Seasonal Theme",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-[10px] transition-all duration-200 ease-in-out transform hover:scale-105",
              selectedStyle === style
                ? "bg-black text-white shadow-lg"
                : "bg-white border text-muted-foreground hover:bg-muted/80 hover:shadow-md"
            )}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="space-y-2 bg-[#F0F2F5] flex justify-center items-center h-[155px] rounded-[10px]">
        <div className="relative flex  flex-col justify-center items-center gap-2">
          <p className="text-[#1C1C1E] text-sm font-medium ">
            Select a Feature
          </p>
          <BsArrowDownCircle className="text-[#118AB2] w-6 h-6" />
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-[150px] flex items-center justify-between px-3 py-2 text-sm bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <span
              className={
                selectedFeature ? "text-foreground" : "text-muted-foreground"
              }
            >
              {selectedFeature || "option"}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => {
                    setSelectedFeature(feature);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-muted/50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                >
                  {feature}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenderOptions() {
  const [selectedGender, setSelectedGender] = useState("Men");
  const [useAiTraining, setUseAiTraining] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Gender</span>
        <div className="flex gap-2">
          {["Men", "Women"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={cn(
                "px-3 py-1 text-sm rounded-[10px] transition-all duration-200 ease-in-out transform hover:scale-105",
                selectedGender === gender
                  ? "bg-black text-white shadow-lg"
                  : "text-muted-foreground bg-white border hover:text-foreground hover:shadow-md"
              )}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Use AI style training
        </span>
        <div className="flex gap-2">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              onClick={() => setUseAiTraining(option === "Yes")}
              className={cn(
                "px-3 py-1 text-sm rounded-[10px] transition-all duration-200 ease-in-out transform hover:scale-105",
                (option === "Yes" && useAiTraining) ||
                  (option === "No" && !useAiTraining)
                  ? "bg-black text-white shadow-lg"
                  : "text-muted-foreground bg-white border hover:text-foreground hover:shadow-md"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FashioAiSidebar() {
  const [prompt, setPrompt] = useState(
    "Create me new images based on my images"
  );

  return (
    <div className="w-[361px]  rounded-[24px]  bg-white border-r border-sidebar-border p-4 overflow-auto">
      <div className="space-y-6">
        <CollapsibleSection title="Category" showHelp>
          <CategoryTags />
        </CollapsibleSection>

        <CollapsibleSection title="Mode" showHelp>
          <ModeTags />
        </CollapsibleSection>

        <CollapsibleSection title="Options" defaultOpen={false}>
          <StyleOptions />
          <GenderOptions />
        </CollapsibleSection>

        <CollapsibleSection title="Describe your image" showHelp>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Ask for something</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 text-sm bg-muted rounded-lg border-0 resize-none focus:ring-2 focus:ring-ring focus:outline-none"
              rows={3}
              placeholder="Describe what you want to create..."
            />
          </div>
        </CollapsibleSection>

        <div className="space-y-4 b">
          <div className="flex items-center bg-[#F7F8F8] justify-center p-8 border border-dashed border-border rounded-lg">
            <div className="text-center">
              <Image
                src="/upload.svg"
                alt="Upload"
                width={24}
                height={24}
                className="w-6 h-6 mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Upload Image (Optional)
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#F7F8F8] justify-center p-8 border border-dashed border-border rounded-lg">
            <div className="text-center">
              <Image
                src="/upload.svg"
                alt="Upload"
                width={24}
                height={24}
                className="w-6 h-6 mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Upload Image (Optional)
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#F7F8F8] justify-center p-8 border border-dashed border-border rounded-lg">
            <div className="text-center">
              <Image
                src="/upload.svg"
                alt="Upload"
                width={24}
                height={24}
                className="w-6 h-6 mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Upload Image (Optional)
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#BDFF00] text-[14px] font-semibold hover:bg-lime-300 text-black py-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
          Create Now
        </Button>
      </div>
    </div>
  );
}
