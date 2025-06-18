"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import Style from "./Style";
import Size from "./Size";
import Quality from "./Quality";
import Duration from "./Duration";
import ProCard from "./ProCard";
const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-[24px] shadow-md">
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
        <span className="font-semibold text-[16px] leading-none">allmyai</span>
      </div>

      <TextArea />

      <UploadImage />
      <Style />
      <Size />
      <Quality />
      <Duration />

      <button
        type="submit"
        className="w-full bg-[#BDFF00] cursor-pointer text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4"
      >
        Generate
      </button>

      <ProCard />
    </div>
  );
};

export default Sidebar;
