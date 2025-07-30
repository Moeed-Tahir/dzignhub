"use client";

import Image from "next/image";
import { IoCaretDown } from "react-icons/io5";

export default function ChatToggleButton({ 
  isOpen, 
  onOpen, 
  onClose 
}) {
  if (isOpen) {
    return (
      <button
        onClick={onClose}
        className="rounded-full h-[64px] w-[64px] bg-[#C209C1] shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
      >
        <IoCaretDown className="text-white text-2xl" />
      </button>
    );
  }

  return (
    <button
      onClick={onOpen}
      className="rounded-full shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
    >
      <Image
        src={"/Chatbot/ai.svg"}
        alt="Ai Assistant"
        width={64}
        height={64}
        className="!h-[64px] !w-[64px]"
      />
    </button>
  );
}
