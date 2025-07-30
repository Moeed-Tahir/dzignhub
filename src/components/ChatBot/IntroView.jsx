"use client";

import Image from "next/image";
import MessageInput from "./MessageInput";

const suggestionQuestions = [
  "What can I do with Allmyai on the free plan?",
  "How do I get started with manual tools?",
  "Which AI assistant is right for my task?",
];

export default function IntroView({ 
  input, 
  setInput, 
  onSubmit, 
  onSuggestionClick, 
  isLoading 
}) {
  return (
    <div className="flex-1 h-[520px] p-6 flex flex-col">
      <div className="text-center flex justify-center items-center flex-col mb-8">
        <Image
          src={"/Chatbot/ai.svg"}
          alt="Ai Assistant"
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-semibold text-[#C209C1] mb-3">
          Hi, I am Ann 👋🏻
        </h2>
        <p className="text-[#1B1F3B] font-medium mb-3 text-[14px] leading-relaxed">
          I'm your onboarding assistant — here to guide you through Allmyai.
        </p>
        <p className="text-[#68686B] text-sm font-normal leading-relaxed">
          Tell me what you're working on, or choose a question below to begin
          your journey with Allmyai.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {suggestionQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(question)}
            className="w-full p-4 text-left bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 text-sm font-medium text-[#1B1F3B] border border-gray-100 hover:border-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
          >
            {question}
          </button>
        ))}
      </div>

      <MessageInput
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
