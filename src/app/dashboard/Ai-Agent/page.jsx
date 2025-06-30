"use client";
import Navbar from "@/components/common/Navbar";
import React, { useState } from "react";

import Chatbot from "@/components/ai/Chatbot";

const page = () => {
  return (
    <div className="bg-[#F7F8F8] ">
      <Navbar isSettingPage={true} />
      <Chatbot
        aiName="Zara"
        slogan="I specialize in brand design — logos, mood boards, and color palettes."
        options={["Red", "Blue", "Green", "Yellow"]}
      />
    </div>
  );
};

export default page;
