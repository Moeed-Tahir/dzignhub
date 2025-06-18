"use client";
import { Check } from "lucide-react";

export default function SelectableButton({
  id,
  icon,
  title,
  isSelected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative flex   py-[12px]  px-[20px] rounded-full gap-1 cursor-pointer border flex-row  items-center justify-center text-center transition-all ease-in-out duration-300 ${
        isSelected
          ? "border-[#C209C1] ring-1 ring-[#C209C1]"
          : "border-[#DFE1E7]"
      }`}
    >
      {/* <img src={icon} alt={title} className="w-[32px] h-[32px] mb-2" /> */}

      {isSelected && (
        <div className=" top-2 right-2 bg-[#C209C1] rounded-full p-1 text-white">
          <Check size={14} />
        </div>
      )}

      <p>{icon}</p>
      <p className="text-[14px] font-medium whitespace-nowrap text-[#1B1F3B]">
        {title}
      </p>
    </div>
  );
}
