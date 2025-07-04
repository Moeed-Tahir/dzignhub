import React from "react";

function AiResults() {
  return (
    <div className="mx-auto lg:py-20 max-w-[90%]">
      <div className="flex lg:flex-row flex-col gap-[20px]">
        <div
          className="border-[2px] bg-[#edeffc] rounded-[20px] py-10 w-[65%] relative lg:flex hidden items-center justify-center"
          style={{
            borderColor: "#C009BF",
          }}
        >
          <img src="/ai-assistants/result.png" />
          <img src="/ai-assistants/arrow.svg"
          />

        </div>
        <div
          className="border-[2px] bg-[#edeffc] rounded-[20px] py-10  relative lg:hidden flex items-center"
          style={{
            borderColor: "#C009BF",
          }}
        >
    <img src="/ai-assistants/result-mobile.svg"
    className="px-3"/>
        </div>
        <div
          className="border-[2px]  rounded-[20px] lg:w-[30%]"
          style={{
            background: "linear-gradient(180deg, #1B1F3B 35%, #C209C1 100%)",
            borderColor: "#C009BF",
          }}
        >
          <div className="flex flex-col gap-[40px] p-6 items-center">
            <div className="flex flex-col gap-[24px] text-center text-white">
              <h2 className="md:text-[30px] text-[24px] font-medium">
                Enhance your results instantly with AI assistance
              </h2>
              <p className="text-[16px]">
                Unlock stunning visuals with AI — clearer, more vibrant, and
                full of detail. Sharper. Smarter. Better. See what AI can do for
                your images.
              </p>
            </div>
            <button className="bg-[#BDFF00] w-[161px] h-[54px] cursor-pointer rounded-[747px] py-[13px] px-[24px] text-black text-center font-semibold">
              Give it a try
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiResults;
