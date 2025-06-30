"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className=" absolute bottom-[24px] left-1/2 translate-x-[-50%] max-w-[1440px] w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex shadow-xl h-[80px]  max-w-[1440px] rounded-[20px] items-center gap-2 p-4  bg-white"
      >
        <Image src="/ai/Star.svg" width={20} height={20} alt="Send" />

        <input
          type="text"
          className="flex-1  rounded-lg p-2 focus:outline-none"
          placeholder="Hello, help me create branding things for fashion brand"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-[#BDFF00] rounded-full p-2"
        >
          <Image src="/ai/direct-right.svg" width={20} height={20} alt="Send" />
        </button>
      </form>

      <p className="text-[12px] text-[#68686B] text-normal text-center mt-2">
        Dzignhub may display inaccurate info, including about people, so
        double-check its responses. Your privacy & Gemini Apps
      </p>
    </div>
  );
}
