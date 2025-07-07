import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function MessageBubble({
  sender,
  text,
  options = [],
  onOptionSelect,
  selectedOptions = [],
  isLoading = false, // new prop
  typing = false, // new prop
}) {
  const isAI = sender === "ai";
  const userIcon = "/avatar.png";
  const aiIcon = "/ai/ai-dp.png";
  const [selected, setSelected] = useState(null);
  const [displayedText, setDisplayedText] = useState(typing ? "" : text || "");
  // console.log("MessageBubble rendered", { sender, text, options, isLoading, typing });

useEffect(() => {
  if (typing && text) {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  } else {
    setDisplayedText(text || "");
  }
}, [text, typing]);


  const handleClick = (opt) => {
    setSelected(opt);
    if (onOptionSelect) onOptionSelect(opt);
  };

  return (
    <div
      className={`flex max-w-[1280px] items-start ${
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
        className={` p-3 text-[#393E44] shadow-xs text-[16px] rounded-b-[12px] max-w-[70%]  font-normal bg-white   ${
          isAI
            ? " text-left rounded-tl-[4px]  rounded-tr-[12px]  "
            : "  text-right rounded-tl-[12px]  rounded-tr-[4px]   "
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="loader inline-block w-5 h-5 border-2 border-gray-300 border-t-[#BDFF00] rounded-full animate-spin"></span>
            <span className="text-gray-400 text-sm">Thinking...</span>
          </div>
        ) : (
          <p>{displayedText}</p>
        )}
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

// Add a simple loader animation style
// You can move this to your global CSS if you prefer
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `.loader { border-top-color: #BDFF00 !important; }`;
  if (!document.head.querySelector('style[data-loader]')) {
    style.setAttribute('data-loader', '');
    document.head.appendChild(style);
  }
}
