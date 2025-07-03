import React from "react";

function DownloadApp() {
  return (
    <div className="relative h-full">
      {/* Add more images here */}
      <img
        src="/landing/sidebar/iphone.png"
        alt="Iphone"
        className="absolute md:h-full h-[115.3px] bottom-0 object-contain md:right-[20%] right-[0%]"
      />
      <div className="flex flex-col md:gap-[12px] gap-[10px] w-full md:max-w-[50%]  px-[20px] py-[20px]  text-[#FFFFFF]">
        <h2 className="md:text-[20px] text-[18px] font-semibold">
          {" "}
          Download Your One & Only App Now
        </h2>
        <p className="md:text-[16px] text-[#b2b5c7] text-[14px]">
          Chose from a selection of high-quality AI models and experiment a
          selection of settings and presets.
        </p>

        <button className="absolute left-[20px] bottom-[10%] text-black w-[186px] h-[48px] px-[24px] py-[spacing-lg] rounded-[40px] border border-[#BDFF00] bg-[#BDFF00] backdrop-blur-[12px] shadow-[0px_8px_10.9px_#0003121F,0px_1px_1px_#0003124D]">
          Download App
        </button>
      </div>
    </div>
  );
}

export default DownloadApp;
