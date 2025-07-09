"use client";
import Navbar from "@/components/common/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Chatbot from "@/components/ai/Chatbot";
import { notFound } from "next/navigation";
import aiBots from "@/data/index";
import Image from "next/image";

const page = () => {
  const { agent } = useParams();
  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchedBot = aiBots[agent];
      if (!fetchedBot) return notFound();
      setBot(fetchedBot);
      setIsLoading(false);
    }, 800); // artificial delay for loading UI

    return () => clearTimeout(timer);
  }, [agent]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F7F8F8]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#C209C1] rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500">Loading AI assistant...</p>
      </div>
    );
  }

  if (!bot) {
    return notFound();
  }

  return (
    <div className="bg-[#F7F8F8]  max-w-[1440px] mx-auto overflow-hidden min-h-screen">
      <Navbar isSettingPage={true} />
      <div className="relative flex gap-2">
        <Image
          src={"/Ai/chat.svg"}
          alt=""
          width={44}
          height={44}
          className="aboslute top-0 cursor-pointer right-0 "
        />
        <Image
          src={"/Ai/edit.svg"}
          alt=""
          width={44}
          height={44}
          className="aboslute top-0 cursor-pointer right-0 "
        />
      </div>
      <Chatbot
        aiName={bot.name}
        tagline={bot.tagline}
        description={bot.description}
        suggestions={bot.suggestions}
        img={bot.img}
      />
    </div>
  );
};

export default page;
