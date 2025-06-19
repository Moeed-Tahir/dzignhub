"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import Style from "./Style";
import Size from "./Size";
import Quality from "./Quality";
import Duration from "./Duration";
import ProCard from "./ProCard";
const Sidebar = ({ onGenerate }) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const isValid = textValue.trim().split(/\s+/).length >= 6;
  const handleGenerate = () => {
    console.log("Selected Style:", selectedStyle);
    console.log("Selected Size:", selectedSize);
    console.log("Selected Quality:", selectedQuality);
    console.log("Selected Duration:", selectedDuration);
    if (onGenerate) onGenerate();
  };
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-[24px] ">
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-[25px] h-[25px] object-contain"
        />
        <span className="font-semibold text-[16px] text-[#1B1F3B] leading-none">allmyai</span>
      </div>

      <TextArea value={textValue} onChange={e => setTextValue(e.target.value)} />

      <UploadImage />
      <Style selected={selectedStyle} onChange={setSelectedStyle} />
      <Size selected={selectedSize} onChange={setSelectedSize} />
      <Quality selected={selectedQuality} onChange={setSelectedQuality} />
      <Duration selected={selectedDuration} onChange={setSelectedDuration} />

      <button
        type="submit"
        className={`w-full ${isValid ? "bg-[#BDFF00] cursor-pointer" : "bg-[#BDFF005C] bg-opacity-[36%] cursor-not-allowed"} text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4`}
        disabled={!isValid}
        onClick={handleGenerate}
      >
        Generate
      </button>

      <ProCard />
    </div>
  );
};

export default Sidebar;
