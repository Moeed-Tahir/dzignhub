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
import Colors from "./Colors";

const Sidebar = ({ onGenerate, isImagePage }) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const isValid = textValue.trim().split(/\s+/).length >= 6;

  const handleGenerate = () => {
    console.log("Selected Style:", selectedStyle);
    console.log("Selected Size:", selectedSize);``
    console.log("Selected Quality:", selectedQuality);
    console.log("Selected Duration:", selectedDuration);
    if (onGenerate) onGenerate();
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-[24px]">
      <div className="flex items-center justify-between gap-2 ">
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
          <span className="font-semibold text-[16px] text-[#1B1F3B] leading-none">
            allmyai
          </span>
        </div>

        
      </div>

      <TextArea
        placeholder={
          isImagePage
            ? "Describe your image"
            : "Generate for me an image with lion under the tree"
        }
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />

      {!isImagePage && <UploadImage />}

      {/* Collapsible Style Section */}
      <details open className="block lg:hidden">
        <summary className="font-medium text-[16px] mb-2 cursor-pointer">
          Style
        </summary>
        <Style
          selected={selectedStyle}
          onChange={setSelectedStyle}
          isImagePage={isImagePage}
        />
      </details>
      <div className="hidden lg:block">
        <Style
          selected={selectedStyle}
          onChange={setSelectedStyle}
          isImagePage={isImagePage}
        />
      </div>

      {/* Size */}
      <Size selected={selectedSize} onChange={setSelectedSize} />

      {isImagePage && (
        <>
          <Colors selected={selectedColors} onChange={setSelectedColors} />
          {/* Quantity Selector */}
          <div>
            <div className="flex justify-start my-2 items-center gap-2">
              <Image
                src="/creation/layer.svg"
                alt="Style"
                width={100}
                height={100}
                className="w-[22px] h-[22px] object-cover rounded-md"
              />
              <span className="text-[18px] font-normal text-[#202126] ">
                Quantity
              </span>
            </div>

            <div className="bg-[#F7F8F8] flex justify-between items-center rounded-full px-[12px] py-[8px]">
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] text-[18px] w-[28px]"
                onClick={() =>
                  selectedQuantity > 1 &&
                  setSelectedQuantity(selectedQuantity - 1)
                }
              >
                -
              </p>
              <p>{selectedQuantity}</p>
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] w-[28px] text-[18px]"
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                +
              </p>
            </div>
          </div>
        </>
      )}

      {!isImagePage && (
        <>
          <Quality selected={selectedQuality} onChange={setSelectedQuality} />
          <Duration
            selected={selectedDuration}
            onChange={setSelectedDuration}
          />
        </>
      )}

      <button
        type="submit"
        className={`w-full ${
          isValid ? "bg-[#BDFF00]" : "bg-[#BDFF005C] cursor-not-allowed"
        } text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4`}
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
