"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const ImageModal = ({
  isOpen,
  onClose,
  tags: initialTags,
  mainPic,
  suggestions,
  title: initialTitle,
  desc: initialDesc,
  subtitle: initialSubtitle,
  allGenerations, // ✅ Add this prop to get full generation data
}) => {
  const router = useRouter();

  const [currentMainPic, setCurrentMainPic] = useState(mainPic);
  // ✅ Add state for all the dynamic content
  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [currentDesc, setCurrentDesc] = useState(initialDesc);
  const [currentSubtitle, setCurrentSubtitle] = useState(initialSubtitle);
  const [currentTags, setCurrentTags] = useState(initialTags);

  useEffect(() => {
    setCurrentMainPic(mainPic);
    setCurrentTitle(initialTitle);
    setCurrentDesc(initialDesc);
    setCurrentSubtitle(initialSubtitle);
    setCurrentTags(initialTags);
  }, [mainPic, initialTitle, initialDesc, initialSubtitle, initialTags]);

  if (!isOpen) return null;

  const openAIAgent = () => {
    router.push("/dashboard/Ai-Agent/zara")
  }

  // ✅ Function to generate tags for any generation
  const generateTags = (generation) => {
    const tags = [];

    if (generation.type === "image") {
      tags.push("Image", "JPG");
      // Add dimensions if available
      if (generation.width && generation.height) {
        tags.push(`${generation.width}x${generation.height}`);
        // Calculate aspect ratio
        const aspectRatio = (generation.width / generation.height).toFixed(1);
        tags.push(`${aspectRatio}:1`);
      } else {
        tags.push("1024x1024", "1:1"); // Default values
      }
    } else if (generation.type === "video") {
      tags.push("Video", "MP4");
      if (generation.duration) {
        tags.push(`${generation.duration}s`);
      }
    }

    return tags;
  };

  // ✅ Handle suggestion click with full data update
  const handleSuggestionClick = (suggestionUrl) => {
    console.log("[DEBUG] Suggestion clicked:", suggestionUrl);
    
    // Find the full generation data for this suggestion
    const suggestionGeneration = allGenerations?.find(gen => gen.url === suggestionUrl);
    
    if (suggestionGeneration) {
      console.log("[DEBUG] Found suggestion generation:", suggestionGeneration);
      
      // Update all the modal content
      setCurrentMainPic(suggestionGeneration.url);
      setCurrentTitle(suggestionGeneration.title || `Community ${suggestionGeneration.type}`);
      setCurrentDesc(suggestionGeneration.prompt || "No description available");
      setCurrentSubtitle(suggestionGeneration.type === "image" ? "Image Generation" : "Video Generation");
      setCurrentTags(generateTags(suggestionGeneration));
    } else {
      console.log("[DEBUG] Suggestion generation not found, updating image only");
      // Fallback: just update the image
      setCurrentMainPic(suggestionUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 flex-row-reverse rounded-2xl gap-5 relative max-w-[1142px] w-[90%] max-h-[734px] h-full  flex">
        <div className="flex-1  flex flex-col items-start justify-between">
          <button
            onClick={onClose}
            className="absolute lg:top-0 w-[40px] h-10 rounded-[8px] right-0 -top-12  bg-white lg:-right-12 text-gray-500 hover:text-gray-700"
          >
            <X size={24} className="m-auto" />
          </button>
          <div>
            {/* ✅ Use dynamic title */}
            <h1 className="text-[24px] lg:text-[30px] text-start font-medium  mb-2">
              {currentTitle}
            </h1>

            {/* ✅ Use dynamic subtitle */}
            <p className="text-[#C209C1] text-[14px] flex items-center gap-2  font-normal mb-8">
              <Image src={"/aigeneration.svg"} alt="" width={16} height={16} />
              {currentSubtitle}
            </p>
          </div>
          <div>
            <h1 className="text-[20px]  text-start font-medium mb-2">
              Description
            </h1>
            {/* ✅ Use dynamic description */}
            <p className="text-[14px] font-normal">{currentDesc}</p>

            {/* ✅ Use dynamic tags */}
            {currentTags && currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {currentTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white text-[#68686B] text-[12px] border rounded-full font-medium px-[16px] py-[6px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="">
            <h1 className="text-[20px]  text-start font-medium mb-2">
              Related templates
            </h1>
            <div className="flex gap-2">

            {suggestions && suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start justify-start gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleSuggestionClick(suggestion)} // ✅ Use new handler
                >
                  <Image
                    src={suggestion}
                    alt={"Suggestion"}
                    width={80}
                    height={42}
                    className="rounded-[12px] object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-[14px] font-medium">
                No related templates found.
              </p>
            )}
            </div>
          </div>

          <div className="flex justify-between items-center w-full mt-8">
            <button
                onClick={openAIAgent}
              className="w-[48%] bg-[#BDFF00]  hover:bg-[#a8e600] text-[#344054] text-[14px] font-semibold h-[40px] px-6 rounded-full transition-colors"
            >
              Chat with AI agent
            </button>
          </div>
        </div>

        <div className="hidden lg:flex w-[543px]">
          {/* ✅ Use dynamic main picture */}
          <Image
            src={currentMainPic}
            alt="Preview"
            width={543}
            height={686}
            className="w-full rounded-[20px] h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;