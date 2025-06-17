"use client";
import { Check } from "lucide-react";

export default function SelectableCard({
  id,
  icon,
  title,
  description,
  isSelected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative w-[200px] p-[14px] rounded-[10px] cursor-pointer border transition-all duration-300 ${
        isSelected
          ? "border-[#C209C1] ring-1 ring-[#C209C1]"
          : "border-[#DFE1E7]"
      }`}
    >
      <img className="mb-4" src={icon} alt={title} />
      <h3 className="text-[14px] font-medium text-[#1B1F3B]">{title}</h3>
      <p className="text-[#6F6F6F] text-[12px] font-normal">{description}</p>

      {isSelected === true ? (
        <div className="absolute top-3 right-3 bg-[#C209C1] rounded-full p-1 text-white">
          <Check size={16} />
        </div>
      ) : (
        <div className="absolute top-3 right-3 bg-[#F8FAFB] border border-[#DFE1E7] rounded-full w-[16px] h-[16px] text-white">
        </div>
      )}
    </div>
  );
}
