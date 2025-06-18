import React from "react";
import Image from "next/image";
const Quality = () => {
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/tick-square.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[24px] h-[24px] object-cover rounded-md"
        />
        <span className="text-[20px] font-normal text-[#202126] ">Quality</span>
      </div>

      <div className="flex flex-wrap gap-[3px] ">
        <div className="bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] ">
          <p className="text-[14px] font-normal text-[#202126] ">720p</p>
        </div>
        <div className="bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] ">
          <p className="text-[14px] font-normal text-[#202126] ">1080p</p>
        </div>
      </div>
    </div>
  );
};

export default Quality;
