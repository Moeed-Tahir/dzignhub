import React from "react";
import { Syne } from "next/font/google";
import Image from "next/image";

// Load Syne font with desired weights
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const StackCard = ({ type, imgLink, heading, num, para,  }) => {
  return (
    <div
      className={`h-[530px] sm:h-[350px] lg:h-[459px] bg-[#E5E7FB] flex text-white flex-col md:flex-row gap-5 justify-between sm:gap-10 my-auto lg:w-[80%] max-w-[1060px] rounded-3xl overflow-hidden sm:p-[64px] p-[32px] relative ${syne.className}`}
    >
      <div className="w-full z-20 md:flex-1 justify-between flex px-2 md:px-4 md:py-2 flex-col sm:gap-2">
        <div className="w-full">
          <h1 className="text-black font-normal text-start text-[16px]">
            {num}
          </h1>
        </div>
        <div>
          <span className="text-[#C209C1] text-[32px] font-semibold text-start">
            {heading}
          </span>
        </div>
        <div className="text-start text-[24px] text-black">{type}</div>
        <div className="text-start text-black">{para}</div>
        <div className="flex justify-start items-start flex-1 gap-2"></div>
      </div>

      <div className=" flex z-20 mx-auto sm:mb-0 max-w-[318px] md:max-w-[480px] md:w-full w-full  justify-center sm:justify-end items-center">
        <div className="border-[1px] sm:w-full w-full sm:max-w-[480px] sm:h-full  rounded-[20px] ">
          <Image
            src={imgLink}
            alt="1"
            width={500}
            height={500}
            className="!w-full h-[180px] object-cover sm:!h-full  "
          />
        </div>
      </div>
    </div>
  );
};

export default StackCard;
