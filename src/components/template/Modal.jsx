"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const TemplateModal = ({
  isOpen,
  setIsOpen,
  mainPic,
  suggestions,
  currentTitle,
  currentSubtitle,
  currentDesc,
  currentTags,
}) => {
  //   const [isOpen, setIsOpen] = useState(true); // always open for demo

  // ✅ Dummy data


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 flex-row-reverse rounded-2xl gap-5 relative max-w-[1142px] w-[90%] max-h-[734px] h-full flex">
        <div className="flex-1 flex flex-col items-start justify-between">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute lg:top-0 w-[40px] h-10 rounded-[8px] right-0 -top-12 bg-white lg:-right-12 text-gray-500 hover:text-gray-700"
          >
            <X size={24} className="m-auto" />
          </button>

          {/* Title + Subtitle */}
          <div>
            <h1 className="text-[24px] lg:text-[30px] text-start font-medium mb-2">
              {currentTitle}
            </h1>
            <p className="text-[#C209C1] text-[14px] flex items-center gap-2 font-normal mb-8">
              <Image src={"/aigeneration.svg"} alt="" width={16} height={16} />
              {currentSubtitle}
            </p>
          </div>

          {/* Description */}
          <div>
            <h1 className="text-[20px] text-start font-medium mb-2">
              Description
            </h1>
            <p className="text-[14px] font-normal">{currentDesc}</p>
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
          </div>

          {/* Related Templates */}
          <div>
            <h1 className="text-[20px] text-start font-medium mb-2">
              Related templates
            </h1>
            <div className="flex gap-2">
              {suggestions.map((s, i) => (
                <Image
                  key={i}
                  src={s}
                  alt="Suggestion"
                  width={80}
                  height={42}
                  className="rounded-[12px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-between items-center w-full mt-8">
            <button className="w-[48%] bg-[#BDFF00] hover:bg-[#a8e600] text-[#344054] text-[14px] font-semibold h-[40px] px-6 rounded-full transition-colors">
              Chat with AI agent
            </button>
          </div>
        </div>

        {/* Main Preview */}
        <div className="hidden lg:flex w-[543px]">
          <Image
            src={mainPic}
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

export default TemplateModal;
