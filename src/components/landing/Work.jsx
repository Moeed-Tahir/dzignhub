import React from "react";
import { useState } from "react";
const cardData = [
  {
    title: "Describe your idea",
    description:
      "Start your project by uploading assets or choosing a template. You control the direction from the very beginning, shaping your vision exactly the way you want.",
    image: "/landing/work/1.svg",
  },
  {
    title: "Let the System do your work",
    description:
      "Access powerful manual tools for image editing, video creation, or content design. You guide the process — the platform provides the flexibility and tools you need.",
  },
  {
    title: "Customize & download",
    description:
      "Make final adjustments to suit your preferences. Once you’re done, download your finished files and bring your project to life with confidence.",
  },
];
function Work() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState("right");
  return (
    <div className="max-w-[1440px] pt-[64px] xl:px-[40px] px-[20px]  pb-[64px]  mx-auto">
      <div className=" p-[40px] gap-[64px] rounded-[40px] bg-[#1B1F3B] flex flex-col shadow-md">
        <div className="flex justify-between items-center flex-col xl:flex-row gap-[24px]">
          <h2 className=" xl:text-[48px] text-center xl:text-start text-[28px] font-semibold text-white">
            How Dzignhub works
          </h2>

          <div className="w-[261px] h-[56px] rounded-full px-[8px] py-[6px] bg-[#212e62] flex items-center gap-[4px] text-[14px] ">
            {/* Left Button */}
            <button
              onClick={() => setSelected("left")}
              className={`${
                selected === "left"
                  ? "w-[124px] h-[44px] bg-[#BDFF00] text-[#000000]"
                  : "w-[121px] h-[40px] bg-[#212e62] text-[#FFFFFF]"
              } px-[32px] py-[10px] gap-[4px] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer`}
            >
              Manual
            </button>

            {/* Right Button */}
            <button
              onClick={() => setSelected("right")}
              className={`${
                selected === "right"
                  ? "w-[124px] h-[44px] bg-[#BDFF00] text-[#000000]"
                  : "w-[121px] h-[40px] bg-[#212e62] text-[#FFFFFF]"
              } px-[32px] py-[10px] gap-[4px] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center`}
            >
              <img
                src={`/landing/${
                  selected === "right"
                    ? "starVector.svg"
                    : "starVectorWhite.svg"
                }`}
                className="w-[24px] h-[24px] object-contain"
              />

              <p>Pro</p>
            </button>
          </div>
        </div>

        <div className=" gap-[24px] flex flex-col">
          <div className=" flex flex-col xl:flex-row justify-between gap-[10px]  rounded-xl">
            {cardData.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`max-w-[416px] h-full xl:max-h-[152.89px] bg-[#212e62] p-[20px] xl:w-[32%] gap-[8px] rounded-[12px] flex flex-col cursor-pointer
            ${isSelected ? "border border-[#BDFF00]" : ""}`}
                >
                  {/* Wrap Number Box + Content */}
                  <div className="flex gap-[7px]">
                    {/* Number Box */}
                    <div
                      className={`w-[32px] h-[32px] text-center flex items-center justify-center text-sm font-bold rounded-[6px]
                ${
                  isSelected
                    ? "bg-[#BDFF00] text-[#212e62]"
                    : "bg-[#212e62] text-[#BDFF00]"
                }`}
                    >
                      {index + 1}
                    </div>

                    {/* Text Content */}
                    <div className="w-[340px] xl:h-[112.89px] gap-[7px] flex flex-col">
                      <p className="text-[20px] font-medium  text-[#FAFAFA]">
                        {item.title}
                      </p>
                      <p className="text-[14px] font-normal text-[#FAFAFA]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional section */}
          <img
            src={cardData[selectedIndex].image}
            alt={cardData[selectedIndex].title}
            className=" object-contain  rounded-[20px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Work;
