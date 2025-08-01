"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function MessageInput({ onSend,suggestions, placeholder }) {
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);



  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim() === "") {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
      setShowSuggestions(false);
    }
  };

  return (
    <div className="absolute bottom-[24px] px-10 xl:px-0 left-1/2 translate-x-[-50%] max-w-[1280px] w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex shadow-xs h-[80px] max-w-[1440px] rounded-[20px] items-center gap-2 p-4 bg-white relative"
      >
        {showSuggestions && (
          <div className="absolute top-[-80px] left-0 w-full flex gap-2 z-10">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                className="bg-white hidden sm:flex lg:h-[62px]  shadow-xs text-[14px] font-medium rounded-[16px] px-4 py-2 text-[#1B1F3B] hover:bg-[#E0E0E0] cursor-pointer"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <Image src="/Ai/Star.svg" width={20} height={20} alt="Send" />

        <input
          type="text"
          className="flex-1 rounded-lg p-2 focus:outline-none"
          placeholder={placeholder}
          value={message}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="text-white bg-[#BDFF00] w-[40px] h-[40px] rounded-full p-2"
        >
          <Image src="/Ai/direct-right.svg" width={40} height={40} alt="Send" />
        </button>
      </form>

      <p className="text-[12px] text-[#68686B] text-normal text-center mt-2">
        Allmyai may display inaccurate info, including about people, so
        double-check its responses. Your privacy & Gemini Apps
      </p>
    </div>
  );
}
