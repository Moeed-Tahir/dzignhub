import React from "react";
import Image from "next/image";
export default function MessageBubble({
  sender,
  text,
  options = [],
  onOptionSelect,
}) {
  const isAI = sender === "ai";
  const userIcon = "/avatar.png";
  const aiIcon = "/ai/ai-dp.png";

  return (
    <div
      className={`flex items-start ${
        isAI ? "justify-start " : "justify-end "
      } px-4 py-2`}
    >
      {isAI && (
        <div className="flex items-end mr-2">
          <Image
            src={aiIcon}
            alt="AI"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}

      <div
        className={`max-w-[70%] p-3 text-[#393E44] shadow-xs text-[16px] rounded-b-[12px]  font-normal bg-white   ${
          isAI
            ? " text-left rounded-tl-[4px]  rounded-tr-[12px]  "
            : "  text-right rounded-tl-[12px]  rounded-tr-[4px]   "
        }`}
      >
        <p>{text}</p>
        {options.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onOptionSelect(opt)}
              className="py-[12px] cursor-pointer text-[14px] font-normal px-[14px] bg-white border border-[#E8ECEF] rounded-full  hover:bg-gray-50"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isAI && (
        <div className="flex items-end ml-2">
          <Image
            src={userIcon}
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
