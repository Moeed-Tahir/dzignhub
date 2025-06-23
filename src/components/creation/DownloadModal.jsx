"use client";
import { useState } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";

const DownloadModal = ({ isOpen, onClose, href }) => {
  const [selectedPlan, setSelectedPlan] = useState("free");

  if (!isOpen) return null;

  const tags = [
    { id: 1, name: "4:3" },
    {
      id: 2,
      name: "Image",
    },
    { id: 3, name: "1440x1024" },
    { id: 4, name: "JPG" },
  ];
  const isValid = true; // Placeholder for validation logic
  return (
    <div className="fixed inset-0 bg-[#000000e8] flex items-center justify-center z-50 p-[24px]">
      {/* Changed max-w from xl to lg, adjusted padding */}
      <div className="bg-white flex flex-col gap-[20px] rounded-[20px] p-5  w-[480px] h-[250px] mx-auto relative shadow-lg">
        {/* Close button - no change needed here */}
        <button
          onClick={onClose}
          className="absolute top-0 -right-12 p-2 bg-gray-100 hover:bg-gray-200 rounded-[10px] transition-colors text-gray-700"
        >
          <X size={18} />
        </button>

        <p className="text-[24px] w-full font-semibold text-center text-[#0F0E11]">
          Export options
        </p>

        <p className="text-[16px] font-medium text-[#68686B] text-center ">
          “Select your preferred video format to start the download.”
        </p>

        <div className="flex items-center justify-between gap-8 mb-6">
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="MP4"
              className="accent-[#C209C1] w-5 h-5"
              defaultChecked
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">MP4</span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="MOV"
              className="accent-[#C209C1] w-5 h-5"
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">MOV</span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="3GP"
              className="accent-[#C209C1] w-5 h-5"
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">3GP</span>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full ${
            isValid
              ? "bg-[#BDFF00] cursor-pointer"
              : "bg-[#BDFF005C] bg-opacity-[36%] cursor-not-allowed"
          } text-[#1B1F3B] text-[16px] cursor-pointer font-medium p-3 rounded-full mb-4`}
          disabled={!isValid}
        >

            <Image
            src="/creation/blackImport.svg"
            alt="Download"
            width={24}
            height={24}
            className="inline-block mr-2"
          />
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
