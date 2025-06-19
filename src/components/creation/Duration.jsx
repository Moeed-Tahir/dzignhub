import React from "react";
import Image from "next/image";
const Duration = ({ selected, onChange }) => {
  const durations = ["5 sec", "10 sec", "15 sec"];
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/clock.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[22px] h-[22px] object-cover rounded-md"
        />
        <span className="text-[18px] font-normal text-[#202126] ">Duration</span>
      </div>

      <div className="flex flex-wrap gap-[3px] ">
        {durations.map((duration) => (
          <div
            key={duration}
            className={`bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] cursor-pointer border-2 ${selected === duration ? "border-[#C209C1]" : "border-transparent"}`}
            onClick={() => onChange && onChange(duration)}
          >
            <p className="text-[14px] font-normal text-[#202126] ">{duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Duration;
