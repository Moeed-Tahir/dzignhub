import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
function Testimonials() {
  const styleVariants = [
    { pt: "pt-[20px]", pb: "", height: "md:max-h-[357px]" },
    { pt: "pt-[60px]", pb: "", height: "md:max-h-[337px]" },
    { pt: "", pb: "pb-[60px]", height: "md:max-h-[337px]" },
  ];

  const boxes = new Array(5).fill(null);

  const Box = ({ pt, pb, height }) => (
    <div className={`md:max-w-[416px] md:max-h-[397px] max-w-[336px]  h-full ${pt} ${pb} flex-shrink-0`}>
      <div
        className={`${height} w-full  bg-[#2D314B] text-[#9997A0] ${inter.classname} flex flex-col flex-shrink-0  rounded-[12px] border border-white/10 shadow-[0_4px_4px_0px_#00000040] backdrop-blur-[150px] p-[20px] gap-[16px]`}
      >
        <img
          src="/landing/testimonials/icon.png"
          className="w-[56px] h-[56px] rounded-[69px] object-cover"
        />
        <p className={`text-[20px] `}>
          Using Text-to-Voice has saved me countless hours. The multilingual
          support allows me to reach students around the world with high-quality
          audio narrations.
        </p>
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-[24px] text-[#FFFFFF] font-semibold">
            Jerry Tang
          </h2>
          <p className="text-[16px]">Recent graduate, Marketing at Sweatpals</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative  w-full bg-[#1B1F3B] flex flex-col h-[767px] gap-[56px] overflow-hidden ">
      <div className="max-w-[1440px] pt-[80px]  overflow-hidden px-[80px]">
        <div className="hidden max-w-[1280px] md:flex flex-col gap-[24px] text-[40px] font-semibold text-[#FAFAFA]">
          <div className="flex gap-[10px]">
            <p className="text-[#C209C1]">What</p> <p>Our Users</p>
          </div>
          <div className="flex gap-[10px] pl-[40px]">
            <p>Are</p>
            <p>Saying</p>
          </div>
        </div>
      </div>
      <div className="md:hidden absolute top-[5%] left-[10%] text-[28px] font-semibold max-w-[70%] w-full ">
              <span className="text-[#C209C1]">What </span>
              <span className="text-[#FFFFFF]">our users are saying</span>
      </div>

      {/* Scrollable container */}

      {/* Scrollable container centered at 60% height */}
<div className="absolute left-0 md:top-[65%] top-[55%] -translate-y-1/2 w-full flex justify-center px-[20px]">
  <div className="flex gap-[16px] w-full  overflow-x-auto overflow-y-hidden items-center scrollbar-hide relative z-10">
    {boxes.map((_, index) => {
      const style = styleVariants[index % 3];
      return <Box key={index} {...style} />;
    })}
  </div>
</div>

{/* Left Fade */}
<div
  className="pointer-events-none absolute top-0 left-0 h-full w-[392px] z-20 hidden md:block"
  style={{
    background:
      "linear-gradient(270deg, rgba(3, 2, 21, 0) 38.52%, #030215 100%)",
  }}
/>

{/* Right Fade */}
<div
  className="pointer-events-none absolute top-0 right-0 h-full w-[392px] rotate-180 z-20 hidden md:block"
  style={{
    background:
      "linear-gradient(270deg, rgba(3, 2, 21, 0) 38.52%, #030215 100%)",
  }}
/>

    </div>
  );
}

export default Testimonials;
