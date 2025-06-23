import React from "react";

function FAQ() {
  return (
    <div className="w-full">
      <div className="w-[1440px] h-[1042px] flex mx-auto p-[80px] gap-[56px] border-2">
        <div className="w-[1280px] h-[882px] rounded-[24px] gap-[56px] flex">
          <div className="gap-[40px] w-[483px] flex flex-col">
            <div className="flex flex-col gap-[24px]">
              <div className="font-semibold text-[48px] text-black">
                <span className="">Have </span>
                <span className="text-[#C209C1]">questions?</span>
              </div>
              <p className="text-[18px]">
                Have questions about how our Text-to-Image AI works? Find the
                answers to the most common inquiries below. If you don't see
                your question, feel free to reach out!
              </p>
            </div>
            <button className="w-[194px] h-[56px] rounded-[999px]  bg-[#BDFF00] font-medium text-[18px]">View all questions</button>
          </div>

        </div>
        <div className="w-[741px] flex flex-col gap-[16px]">
            
        </div>
      </div>
    </div>
  );
}

export default FAQ;
