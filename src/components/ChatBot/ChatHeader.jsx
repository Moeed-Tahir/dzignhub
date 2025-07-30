"use client";

import { ArrowLeftIcon, Maximize2Icon } from "./icons";
import Image from "next/image";

export default function ChatHeader({ 
  chatState, 
  onBackToIntro 
}) {
  return (
    <div className="border-b border-[#E7E7E7] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {chatState === "chat" && (
            <button
              onClick={onBackToIntro}
              className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              <ArrowLeftIcon size={16} className="text-gray-600" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <Image
              src={"/Chatbot/ai.svg"}
              alt="Ai Assistant"
              width={32}
              height={32}
            />
            <div>
              <h3 className="font-semibold text-sm text-gray-900">
                Ann - Onboarding Assistant
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1">
            <Maximize2Icon size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
