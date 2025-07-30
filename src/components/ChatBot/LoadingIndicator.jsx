"use client";

import Image from "next/image";

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Image
        src={"/Chatbot/ai.svg"}
        alt="Ai Assistant"
        width={32}
        height={32}
      />
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
