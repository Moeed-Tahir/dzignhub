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
import { useUserStore } from "@/store/store";
const Sidebar = ({ onGenerate, isImagePage }) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState({id:0, c1: "#F2E8DF", c2: "#D9C3B0", c3: "#BFA293"});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {SetGenerateImages} = useUserStore();
  const isValid = textValue.trim().split(/\s+/).length >= 6;
  const handleGenerate = async() => {
    console.log("Selected Style:", selectedStyle);
    console.log("Selected Size:", selectedSize);
    console.log("Selected Colors:", selectedColors);
    console.log("Selected Quality:", selectedQuality);
    console.log("Selected Duration:", selectedDuration);
    console.log("Selected Quantity:", selectedQuantity);
    console.log("Text Value:", textValue);

    const data = {
      prompt: textValue,
      style: selectedStyle,
      size: selectedSize,
      colors: [selectedColors.c1, selectedColors.c2, selectedColors.c3],
      quality: selectedQuality,
      quantity: selectedQuantity,
    }
    console.log("Data to be sent:", data);


    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();
    if (res.type=="success" || res.type== "partial_success") {
      if (onGenerate) onGenerate();
      SetGenerateImages(res.images)
    }
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
        <span className="font-semibold text-[16px] text-[#1B1F3B] leading-none">
          allmyai
        </span>
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
      <Style
        selected={selectedStyle}
        onChange={setSelectedStyle}
        isImagePage={isImagePage}
      />
      <Size selected={selectedSize} onChange={setSelectedSize} />

      {isImagePage && (
        <>
          <Colors selected={selectedColors} onChange={setSelectedColors} />

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

            <div
              className={`bg-[#F7F8F8] flex justify-between items-center flex-1 rounded-full px-[12px] py-[8px] cursor-pointer   `}
            >
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] text-[18px] w-[28px]"
                onClick={() => {
                  if (selectedQuantity > 1) {
                    setSelectedQuantity(selectedQuantity - 1);
                  }
                }}
              >
                -
              </p>
              <p>{selectedQuantity}</p>
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] w-[28px] text-[18px] "
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                +
              </p>
            </div>
          </div>
        </>
      )}

      {isImagePage ? null : (
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
          isValid
            ? "bg-[#BDFF00] cursor-pointer"
            : "bg-[#BDFF005C] bg-opacity-[36%] cursor-not-allowed"
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
