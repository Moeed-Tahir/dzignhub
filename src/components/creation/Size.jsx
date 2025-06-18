import React from "react";
import Image from "next/image";

const Size = () => {
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/ruler.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[24px] h-[24px] object-cover rounded-md"
        />
        <span className="text-[20px] font-normal text-[#202126]">Style</span>
      </div>

      <div className="flex flex-wrap gap-[3px]">
        {/* Landscape */}
        <div className="flex items-center rounded-[8px] gap-2  py-[12px] px-[8px] bg-[#F7F8F8] justify-center flex-col w-[100px] h-[98px] cursor-pointer">
          <Image
            src="/creation/landscape.svg"
            alt="Landscape"
            width={29}
            height={16}
            className="object-contain"
          />
          <span className="text-[12px] text-center font-normal text-[#202126]">
            Landscape (16:9)
          </span>
        </div>

        {/* Portrait */}
        <div className="flex items-center rounded-[8px] gap-2 py-[12px] px-[8px] bg-[#F7F8F8] justify-center flex-col w-[100px] h-[98px] cursor-pointer">
          <Image
            src="/creation/portrait.svg"
            alt="Portrait"
            width={16}
            height={29}
            className="object-contain"
          />
          <span className="text-[12px] font-normal text-[#202126]">
            Portrait (9:16)
          </span>
        </div>

        {/* Square */}
        <div className="flex items-center rounded-[8px] gap-2 py-[12px] px-[8px] bg-[#F7F8F8] justify-center flex-col w-[100px] h-[98px] cursor-pointer">
          <Image
            src="/creation/square.svg"
            alt="Square"
            width={29}
            height={29}
            className="object-contain"
          />
          <span className="text-[12px] font-normal text-[#202126]">
            Square (1:1)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Size;
