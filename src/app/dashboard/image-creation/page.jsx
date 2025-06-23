"use client";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/creation/Sidebar";
import React, { useState } from "react";
import Image from "next/image";
import StartingSuggestion from "@/components/creation/StartingSuggestion";
import VideoPlayer from "@/components/creation/VideoPlayer";
import ImagesResults from "@/components/creation/ImagesResults";

const page = () => {
  const [showSuggestion, setShowSuggestion] = useState(true);

  return (
    <div className="max-w-[1440px] mx-auto justify-center p-[24px] items-start flex lg:gap-2 h-auto min-h-screen bg-[#f7F8F8]">
      <div className="w-[342px]">
        <Sidebar
          isImagePage={true}
          onGenerate={() => setShowSuggestion(false)}
        />
      </div>

      <div className="w-full px-2 lg:w-[calc(100%-342px)]">
        <Navbar isCreationPage={true} />

        {showSuggestion ? <StartingSuggestion /> : <ImagesResults />}

        <button
          className="fixed bottom-8 right-8 bg-[#C209C1] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
          onClick={() => setIsModalOpen(true)}
          style={{
            width: "auto",
            height: 48,
            gap: "10px",
            borderRadius: "100px",
            paddingTop: "12px",
            paddingRight: "24px",
            paddingBottom: "12px",
            paddingLeft: "24px",
          }}
        >
          <Image
            src="/white-logo.png"
            alt="Logo"
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium">Let's talk</span>
        </button>
      </div>
    </div>
  );
};

export default page;
