"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TagInputBar() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center gap-2  py-[10px] px-[16px] lg:py-[12px]  lg:px-[20px]  rounded-full border max-w-[500px] border-[#DFE1E7] w-fit min-w-[300px]  overflow-x-scroll flex-wrap">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-[#F5F5F7] text-[#1B1F3B] text-sm px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}

      <input
        type="text"
        // placeholder="Type and hit Enter"
        className="flex-1 min-w-[100px] outline-none border-none bg-transparent text-sm text-[#1B1F3B]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ChevronDown size={16} className="text-[#1B1F3B]" />
    </div>
  );
}
