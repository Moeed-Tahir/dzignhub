"use client";
import Image from "next/image";
import React from "react";

const FashionPreview = () => {
  const [tab, setTab] = React.useState("Preview");

  return (
    <div className="bg-white mr-4  rounded-[24px] overflow-hidden border border-border flex flex-col h-full">
      <div className="w-full px-4 py-2 justify-between flex">
        <div className="flex items-center gap-2">
          <Image src={"/aiAgent/gallery.svg"} height={24} width={24} />
          <p className="text-[#344054] text-sm font-medium ">
            Sam Altman Chinese Calligraphy Style
          </p>
        </div>
        <div>
          <button className="w-[35px] h-[35px] rounded-[8px] flex justify-center items-center bg-[#F7F8F8]">
            <span className="leading-tight mb-1">x</span>
          </button>
        </div>
      </div>

      <div className="bg-[#F5F5F5] w-full p-4 mb-6 h-full">
        <div className="flex w-fit bg-white  p-1 m-4 gap-2 rounded-[12px] ">
          {["My Ai Designs", "Upload", "Moodboard", "Info"].map(
            (btn, index) => (
              <button
                key={index}
                onClick={() => setTab(btn)}
                className={` rounded-[8px] w-[90px] h-[35px] flex justify-center items-center text-[12px]  font-normal ${
                  tab === btn
                    ? "bg-white  border rounded-[8px] text-[#C209C1] border-[#C209C1]"
                    : "text-gray-500 bg-gray-50 "
                }`}
              >
                {btn}
              </button>
            )
          )}
        </div>

        <div className="flex flex-wrap">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-1/3 p-1">
              <div className="bg-white relative rounded-[12px] overflow-hidden ">
                <Image
                  src={`/aiAgent/${item}.png`}
                  alt={`Fashion ${item}`}
                  width={200}
                  height={200}
                  className="w-full object-cover object-center h-auto"
                />

                <div className="absolute w-full bottom-4">
                  {["Retouche", "Use", "Promt"].map((action, idx) => (
                    <button
                      key={idx}
                      className="bg-black ease-in-out duration-300 transition-all hover:text-black text-white rounded-full hover:bg-[#BDFF00] bg-opacity-70 mx-2 px-3 py-1 text-sm font-medium"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionPreview;
