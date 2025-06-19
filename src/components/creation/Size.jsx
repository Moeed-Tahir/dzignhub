import React from "react";
import Image from "next/image";

const Size = ({ selected, onChange }) => {
  const sizes = [
    {
      key: "landscape",
      label: "Landscape (16:9)",
      icon: "/creation/landscape.svg",
      width: 29,
      height: 16,
    },
    {
      key: "portrait",
      label: "Portrait (9:16)",
      icon: "/creation/portrait.svg",
      width: 16,
      height: 29,
    },
    {
      key: "square",
      label: "Square (1:1)",
      icon: "/creation/square.svg",
      width: 29,
      height: 29,
    },
  ];
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/ruler.svg"
          alt="Size"
          width={100}
          height={100}
          className="w-[24px] h-[24px] object-cover rounded-md"
        />
        <span className="text-[20px] font-normal text-[#202126]">Size</span>
      </div>

      <div className="flex flex-wrap gap-[3px]">
        {sizes.map((size) => (
          <div
            key={size.key}
            className={`flex items-center rounded-[8px] gap-2 py-[12px] px-[8px] bg-[#F7F8F8] justify-center flex-col w-[100px] h-[98px] cursor-pointer border-2 ${
              selected === size.key
                ? "border-[#C209C1]"
                : "border-transparent"
            }`}
            onClick={() => onChange && onChange(size.key)}
          >
            <Image
              src={size.icon}
              alt={size.label}
              width={size.width}
              height={size.height}
              className="object-contain"
            />
            <span className="text-[12px] text-center font-normal text-[#202126]">
              {size.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Size;
