"use client";
import React from "react";

function Hero() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
        className="w-full lg:max-w-[65%] max-w-[90%] z-1 lg:h-[400px] md:h-[350px]  xl:h-[450px] h-[242px] absolute left-1/2 transform -translate-x-1/2 -bottom-10  md:rounded-t-[80px] rounded-t-[40px] flex items-center"
      >
        <img
          src={"/video-creation/main.jpg"}
          className="md:rounded-t-[70px] rounded-t-[32px] h-[400px] w-[96%] mx-auto object-cover object-top"
        />
      </div>

      <div
        //  style={{
        //   background:
        //     "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        // }}
        className="absolute xl:h-[326px] xl:w-[250px] h-[156px] left-[-20px] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]"
      >
        <img
          src={"/video-creation/left.png"}
          className="w-full h-full object-contain"
        />
      </div>

      <div
        //  style={{
        //   background:
        //     "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        // }}
        className="absolute xl:h-[326px] rotate-[15deg] xl:w-[250px] h-[156px] right-[0%] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]"
      >
        <img
          src={"/video-creation/right.png"}
          className="w-full h-full  rotate-[-15deg] object-contain"
        />
      </div>

      <div className=" max-w-[1300px] w-full  gap-5 lg:gap-10 flex flex-col items-center justify-center mx-auto pt-[150px] lg:pt-[50px]">
        <div className="flex flex-col gap-[19px] text-center text-[#FFFFFF]">
          <h2 className="font-bold lg:text-[40px] xl:text-[68px] mx-auto  md:text-[28px] text-[24px]">
            Video Creation
          </h2>
          <p className="md:text-[20px] text-[18px] md:max-w-[70%] max-w-[90%] mx-auto">
            Create stunning videos effortlessly using powerful manual tools or
            let our AI assistants help you craft content faster.{" "}
          </p>
        </div>
        <div>
          {/* CTA Section */}
          <div className=" hidden lg:flex lg:w-[740px] lg:h-[78px] rounded-[999px] mx-auto  items-center bg-[#4d2887] justify-center gap-[10px]">
            <p className="text-[18px] text-[#9997A0]">
              A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
            </p>
            <button
              className={`w-[179px] h-[54px] bg-[#BDFF00] text-[18px]  rounded-full flex items-center justify-center gap-[8px]`}
            >
              <img
                src="/landing/starVector.svg"
                alt="star"
                className="w-[24px] h-[24px] object-contain"
              />
              <span className="text-[#1B1F3B]">Create image</span>
            </button>
          </div>

          {/* CTA Section Mobile*/}
        </div>
        <div>
      <div className=" max-w-[382px] mx-auto h-[144px] flex flex-col gap-[12px] lg:hidden">
        <div className="bg-[#212e62] flex flex-col border-t-[0.49px] border-[#1B1F3B] py-[12px] px-[24px] rounded-[490.57px]">
          <p className="lg:text-[18px] text-[16px] text-[#9997A0]">
            A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
          </p>
        </div>
        <div className=" h-[60px] bg-[#BDFF00] py-[16px] px-[20px] xl:px-[12px] gap-[12px] rounded-[49.11px] flex justify-center">
          <button className={` text-[20px] `}>
            <img
              src="/landing/starVector.svg"
              alt="star"
              className="lg:w-[24px] w-[20px] h-[20px] lg:h-[24px] object-contain"
            />
          </button>
          <p className="text-[#1B1F3B]  lg:text-[18px] text-[16px]">
            Create image
          </p>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}

export default Hero;
