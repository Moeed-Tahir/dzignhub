"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SlWrench } from "react-icons/sl";
import { IoLayersOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import ToolsModal from "./ToolsModal";
import PersonalizationModals from "./PersonalizedModal";

export default function MessageInput({
  onSend,
  suggestions,
  placeholder,
  isSuperAgent,
  isPitch,
}) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] =
    useState(false);

  return (
    <div
      className={`${
        isPitch
          ? ""
          : isSuperAgent
          ? "w-[716px] absolute bottom-[24px] left-1/2 translate-x-[-50%]"
          : "absolute bottom-[24px] left-1/2 translate-x-[-50%] max-w-[1280px] w-[90%]"
      } px-5 xl:px-0 `}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full flex h-[40px] ${
          isSuperAgent ? "sm:h-[160px]" : "sm:h-[80px]"
        }  max-w-[1440px] rounded-[20px] items-center gap-2 p-4 bg-white relative ${
          isSuperAgent
            ? "bg-gradient-to-r from-[#00C4CC4D]  to-[#C209C14D] p-[1px]"
            : "shadow-xs"
        }`}
        style={
          isSuperAgent
            ? {
                filter:
                  "drop-shadow(0 4px 10px rgba(59, 130, 246, 0.3)) drop-shadow(0 8px 12px rgba(147, 51, 234, 0.2)) drop-shadow(0 12px 10px rgba(236, 72, 153, 0.15))",
              }
            : {}
        }
      >
        {isSuperAgent && (
          <div className="absolute flex-col justify-between inset-[1px] bg-white rounded-[19px] flex items-center gap-2 p-4">
            {showSuggestions && !isPitch && (
              <div className="absolute lg:top-[-55px] top-[-65px] left-1/2 translate-x-[-50%] justify-center items-center w-full flex gap-2 z-10">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="bg-white text-[10px] shadow-xs sm:text-[14px] font-medium rounded-[16px] px-4 py-2 text-[#1B1F3B] hover:bg-[#E0E0E0] cursor-pointer"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="flex w-full items-center gap-2">
              <Image src="/Ai/Star.svg" width={20} height={20} alt="Send" />

              <input
                type="text"
                className="flex-1 rounded-lg p-2 text-[10px] sm:text-[14px] focus:outline-none"
                placeholder={placeholder || "Ask anything, create anything..."}
                value={message}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="text-white bg-[#BDFF00] sm:w-[40px] w-[30px] h-[30px] sm:h-[40px] rounded-full p-2"
              >
                <Image
                  src="/Ai/direct-right.svg"
                  width={40}
                  height={40}
                  alt="Send"
                />
              </button>
            </div>
            {isSuperAgent && (
              <div className="w-full flex- items-center gap-2 flex ">
                <div className="w-8 h-8 flex justify-center border cursor-pointer items-center bg-white  rounded-[8px]">
                  <RiAttachment2 className="text-lg " />
                </div>
                <div
                  onClick={() => setShowPersonalizationModal(true)}
                  className="w-8 h-8 flex justify-center border cursor-pointer items-center bg-white  rounded-[8px]"
                >
                  <IoLayersOutline className="text-lg " />
                </div>
                <div
                  onClick={() => setIsOpen(true)}
                  className="w-8 h-8 flex justify-center border cursor-pointer items-center bg-white  rounded-[8px]"
                >
                  <SlWrench className="text-lg " />
                </div>
              </div>
            )}
          </div>
        )}
        {!isSuperAgent && (
          <>
            {showSuggestions && !isPitch && (
              <div className="absolute lg:top-[-55px] top-[-65px] left-1/2 translate-x-[-50%] justify-center items-center w-full flex gap-2 z-10">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="bg-white text-[10px] shadow-xs sm:text-[14px] font-medium rounded-[16px] px-4 py-2 text-[#1B1F3B] hover:bg-[#E0E0E0] cursor-pointer"
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
              className="flex-1 rounded-lg p-2 text-[10px] sm:text-[14px] focus:outline-none"
              placeholder={placeholder || "Ask anything, create anything..."}
              value={message}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="text-white bg-[#BDFF00] sm:w-[40px] w-[30px] h-[30px] sm:h-[40px] rounded-full p-2"
            >
              <Image
                src="/Ai/direct-right.svg"
                width={40}
                height={40}
                alt="Send"
              />
            </button>
          </>
        )}
      </form>
      {!isPitch && !isSuperAgent && (
        <p className="text-[12px] text-[#68686B] text-normal text-center mt-2">
          Allmyai may display inaccurate info, including about people, so
          double-check its responses. Your privacy & Gemini Apps
        </p>
      )}

      <ToolsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <PersonalizationModals
        showFirstModal={showPersonalizationModal}
        setShowFirstModal={setShowPersonalizationModal}
      />
    </div>
  );
}
