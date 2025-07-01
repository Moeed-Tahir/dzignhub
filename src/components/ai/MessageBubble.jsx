import React, { useState } from "react";
import Image from "next/image";
export default function MessageBubble({
  sender,
  text,
  options = [],
  onOptionSelect,
  selectedOptions = [], // new prop
}) {
  const isAI = sender === "ai";
  const userIcon = "/avatar.png";
  const aiIcon = "/ai/ai-dp.png";
  const [selected, setSelected] = useState(null);

  const handleClick = (opt) => {
    setSelected(opt);
    if (onOptionSelect) onOptionSelect(opt);
  };

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
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}

      <div
        className={`max-w-[1280px] p-3 text-[#393E44] shadow-xs text-[16px] rounded-b-[12px]  font-normal bg-white   ${
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
                onClick={() => handleClick(opt)}
                disabled={selectedOptions.includes(opt)}
                className={`py-[12px] cursor-pointer text-[14px] font-normal px-[16px] bg-white border rounded-full  hover:bg-gray-50 ${
                  selected === opt
                    ? "border-[#C209C1] "
                    : "border-[#E8ECEF] "
                } ${selectedOptions.includes(opt) ? "opacity-50 cursor-not-allowed" : ""}`}
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
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
