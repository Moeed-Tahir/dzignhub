"use client";

import Image from "next/image";

export default function Message({ message, index }) {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {message.role === "assistant" && (
        <Image
          src={"/Chatbot/ai.svg"}
          alt="Ai Assistant"
          width={32}
          height={32}
        />
      )}
      <div
        className={`max-w-[80%] p-3 rounded-[12px] ${
          message.role === "user"
            ? "bg-[#F7F8F8] !rounded-tr-[4px] text-black"
            : "bg-[#F7F8F8] !rounded-tl-[4px] text-gray-900 border border-gray-100"
        }`}
      >
        <p className="text-[16px] leading-relaxed">{message.content}</p>
      </div>
      {message.role === "user" && (
        <div>
          <Image
            src={"/avatar.png"}
            alt="User Avatar"
            width={32}
            height={20}
          />
        </div>
      )}
    </div>
  );
}
