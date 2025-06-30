import React from "react";
import { FiArrowUpRight, FiArrowUpLeft } from "react-icons/fi";

import Image from "next/image";

const StackCard = ({ bg, imgLink, heading, num, para, link }) => {
  return (
    <div
      className={`h-[460px] sm:h-[350px] lg:h-[400px] bg-black  flex   text-white flex-col md:flex-row  gap-5 justify-between sm:gap-10 my-auto lg:w-[65%] rounded-3xl overflow-hidden sm:p-5  p-2 relative `}
    >
      <div className="w-full z-20 md:w-[65%] justify-between  flex px-2 md:px-4 md:py-2 flex-col sm:gap-2">
        <div className="w-full">
          <h1 className="text-yellow-400  main-heading font-bold  text-start sub_heading">
            {num}
          </h1>
        </div>
        <div>
          <span
            className={`text-start bg-gradient-to-r  from-white via-blueColor to-blueColor bg-clip-text text-transparent font-extrabold leading-tight `}
          >
            {heading}
          </span>
        </div>

        <div className=" text-start text-white">{para}</div>

        <div className=" flex justify-start items-start flex-1 gap-2"></div>
      </div>

      <div className="w-full flex z-20 pb-[15px] sm:mb-0 md:w-1/2 justify-center sm:justify-end items-center">
        <div className="border-[1px]  sm:w-[95%] border-blue-400 sm:h-[90%] rounded-[20px] ">
          <Image
            src={imgLink}
            alt="1"
            width={500}
            height={500}
            className="!w-full !h-full  "
          />
        </div>
      </div>
    </div>
  );
};

export default StackCard;
