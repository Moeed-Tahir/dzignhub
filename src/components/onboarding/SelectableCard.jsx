"use client";
import { Check } from "lucide-react";
import Image from "next/image";

export default function SelectableCard({
  id,
  icon,
  title,
  description,
  isSelected,
  isThemeCard = false,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative lg:w-[32%] w-[47%] min-h-[120px] lg:min-h-[100px] 
        p-[14px] rounded-[10px] cursor-pointer border transition-all duration-300 
        flex flex-col justify-start overflow-hidden
        ${
          isSelected
            ? "border-[#C209C1] ring-1 ring-[#C209C1]"
            : "border-[#DFE1E7]"
        }
      `}
    >
      {!isThemeCard ? (
        <img
          className="mb-2 max-w-[24px] max-h-[24px]"
          src={icon}
          alt={title}
        />
      ) : (
        <h3 className="text-[14px] font-medium text-[#1B1F3B] break-words">
          {title}
        </h3>
      )}

      {!isThemeCard && (
        <h3 className="text-[12px] lg:text-[14px] font-medium text-[#1B1F3B] break-words">
          {title}
        </h3>
      )}

      <p className="text-[#6F6F6F] text-[10px] lg:text-[12px] font-normal mt-1 break-words leading-snug line-clamp-3">
        {description}
      </p>

      {isSelected ? (
        <div className="absolute top-3 right-3 bg-[#C209C1] w-[16px] h-[16px] rounded-full p-1 text-white">
          <Check size={8} />
        </div>
      ) : (
        <div className="absolute top-3 right-3 bg-[#F8FAFB] border border-[#DFE1E7] rounded-full w-[16px] h-[16px]" />
      )}

      {isThemeCard && (
        <div className="flex justify-end items-end bottom-0 right-0 absolute">
          <Image
            src={`/onboarding/${id}.png`}
            alt=""
            width={100}
            height={100}
            className="object-contain max-h-[80px]"
          />
        </div>
      )}
    </div>
  );
}
