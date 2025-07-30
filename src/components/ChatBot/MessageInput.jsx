"use client";

import Image from "next/image";
export default function MessageInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  placeholder = "Type your message...",
}) {
  return (
    <div className="p-4 absolute bottom-2 left-1/2 translate-x-[-50%] w-full ">
      <form onSubmit={onSubmit} className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pr-12 h-[64px] py-3 px-4 bg-[#F7F8F8] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
        />
        <button
          type="submit"
          className="text-white bg-[#BDFF00] w-[40px] absolute right-2 top-1/2 translate-y-[-50%] h-[40px] rounded-full p-2"
        >
          <Image
            src="/Ai/direct-right.svg"
            width={40}
            height={40}
            alt="Send"
            className=""
          />
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-2">
        Dzignhub may display inaccurate info so double-check its responses.
      </p>
    </div>
  );
}
