import React from "react";
import Image from "next/image";
const Quality = ({ selected, onChange }) => {
  const qualities = ["720p", "1080p"];
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/tick-square.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[22px] h-[22px] object-cover rounded-md"
        />
        <span className="text-[18px] font-normal text-[#202126] ">Quality</span>
      </div>

      <div className="flex flex-wrap gap-[3px] ">
        {qualities.map((quality) => (
          <div
            key={quality}
            className={`bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] cursor-pointer border-2 ${selected === quality ? "border-[#C209C1]" : "border-transparent"}`}
            onClick={() => onChange && onChange(quality)}
          >
            <p className="text-[14px] font-normal text-[#202126] ">{quality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quality;
