import React from "react";
import Image from "next/image";
const Colors = ({ selected, onChange }) => {
  const colors = [
    { id: 1, c1: "#F2E8DF", c2: "#D9C3B0", c3: "#BFA293" },

    {
      id: 2,
      c1: "#AED3EF",
      c2: "#A6EEDF",
      c3: "#FCCFD2",
    },
    {
      id: 3,
      c1: "#63E973",
      c2: "#FDDA4C",
      c3: "#FA3D3D",
    },
    {
      id: 4,
      c1: "#333333",
      c2: "#D5D5D5",
      c3: "#FFFFFF",
    },
    {
      id: 5,
      c1: "#FD81F4",
      c2: "#5856D6",
      c3: "#D5F675",
    },
  ];
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/colorfilter.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[22px] h-[22px] object-cover rounded-md"
        />
        <span className="text-[18px] font-normal text-[#202126] ">Colors</span>
      </div>

      <div className="grid grid-cols-3 gap-[3px] ">
        {colors.map((quality,index) => (
          <div
            key={index}
            className={`bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] cursor-pointer border-2 ${
              selected.id === quality.id ? "border-[#C209C1]" : "border-transparent"
            }`}
            onClick={() => onChange && onChange(quality)}
          >
            <div className="w-[28px] h-[28px] flex items-center justify-center">
              <div
                className="w-[21px] h-[21px] rounded-full"
                style={{ backgroundColor: quality.c1 }}
              ></div>
            </div>
            <div className="w-[28px] h-[28px] flex items-center justify-center">
              <div
                className="w-[21px] h-[21px] rounded-full"
                style={{ backgroundColor: quality.c2 }}
              ></div>
            </div>
            <div className="w-[28px] h-[28px] flex items-center justify-center">
              <div
                className="w-[21px] h-[21px] rounded-full"
                style={{ backgroundColor: quality.c3 }}
              ></div>
            </div>
          </div>
        ))}


        <div className="bg-[#F7F8F8] flex justify-center items-center flex-1 rounded-[12px] px-[12px] py-[8px] cursor-pointer border-2 border-transparent">
          <div className="w-[28px] h-[28px] bg-white rounded-full border-[#d0d5dd] border justify-center text-[18px] text-[#1B1F3B] flex items-center">
            +
          </div>

        </div>
      </div>
    </div>
  );
};

export default Colors;
