import Image from "next/image";
import React from "react";

const DownloadSection = () => {
  return (
    <div className="bg-[#1B1F3B] w-full flex justify-center items-center py-20">
      <div
        style={{
          backgroundImage: "url('/video-creation/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" max-w-[1280px] w-[90%]  md:w-full relative h-auto overflow-hidden  md:h-[432px] rounded-[40px] mx-auto py-5  md:py-14 px-5  md:px-10"
      >
        <div className="flex  flex-col w-full md:w-1/2 items-start  justify-between text-white text-start ">
          <p className="text-[18px] md:text-[34px] w-full md:w-[350px] font-medium md:font-semibold mb-4">
            Download Your One & Only App Now
          </p>

          <p className="text-[14px] md:text-[16px] font-normal mb-6">
            Chose from a selection of high-quality AI models and <br />
            experiment a selection of settings and presets.
          </p>
          <button className="w-[186px] mt-[90px]  md:mt-[30px]  h-[56px]  rounded-[999px] text-black cursor-pointer bg-[#BDFF00] font-medium text-[18px]">
            Download App
          </button>
          <Image
            src={"/video-creation/arrow.png"}
            alt="iPhone"
            layout="responsive"
            width={375}
            height={812}
            className=" !w-[350px] mt-2"
          />
        </div>

        <Image
          src={"/video-creation/iphone.png"}
          alt="iPhone"
          layout="responsive"
          width={375}
          height={812}
          className="md:!w-full h-auto !w-[170px] md:max-w-[475px] absolute bottom-0 right-[-20px] md:right-20 mx-auto mt-8"
        />
      </div>
    </div>
  );
};

export default DownloadSection;
