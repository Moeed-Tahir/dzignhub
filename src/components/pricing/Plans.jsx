"use client";
import React from "react";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust as needed
});
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
});

function Plans({ plansData }) {
  // Helper function to render icons based on icon type
  const renderIcon = (iconType, hasText = false) => {
    const iconClass = "w-[16.83px] h-[16.83px] mt-[3px]";
    const marginClass = hasText ? "" : "ml-5";
    
    switch(iconType) {
      case 'tick':
        return <img src="/pricing/tick.svg" className={iconClass} alt="tick" />;
      case 'cross':
        return <img src="/pricing/cross.svg" className={iconClass} alt="cross" />;
      case 'info':
        return <img src="/pricing/info.svg" className={iconClass} alt="info" />;
      case 'play':
        return <img src="/pricing/play.svg" className={iconClass} alt="play" />;
      case 'info_cross':
        return (
          <>
            <img src="/pricing/info.svg" className={iconClass} alt="info" />
            <img src="/pricing/cross.svg" className={`${iconClass} ml-5`} alt="cross" />
          </>
        );
      case 'info_tick':
        return (
          <>
            <img src="/pricing/info.svg" className={iconClass} alt="info" />
            <img src="/pricing/tick.svg" className={`${iconClass} ml-5`} alt="tick" />
          </>
        );
      case 'play_cross':
        return (
          <>
            <img src="/pricing/play.svg" className={iconClass} alt="play" />
            <img src="/pricing/cross.svg" className={`${iconClass} ml-5`} alt="cross" />
          </>
        );
      case 'play_tick':
        return (
          <>
            <img src="/pricing/play.svg" className={iconClass} alt="play" />
            <img src="/pricing/tick.svg" className={`${iconClass} ml-5`} alt="tick" />
          </>
        );
      default:
        return null;
    }
  };

  // Helper function to render cell content (text + icons)
  const renderCellContent = (text, iconType, specificIcon = null) => {
    const hasText = text && text.trim() !== '';
    const icon = specificIcon || iconType;
    
    return (
      <div className="flex items-center">
        {icon && icon !== 'none' && renderIcon(icon, hasText)}
        {hasText && (
          <p className={icon && icon !== 'none' ? "ml-5" : ""}>
            {text}
          </p>
        )}
      </div>
    );
  };

  // Use dynamic data if available, otherwise show static fallback data
  if (!plansData) {
    return (
      <div className="max-w-[1440px]  mx-auto xl:p-[80px] xl:pb-[80px] py-[40px] pl-[24px]">
        <div className="flex flex-col gap-[64px]">
          <h1 className="font-semibold md:text-[48px] md:text-center text-[28px] text-black">
            Compare plans
          </h1>
          <div className="flex flex-col md:gap-[78px] gap-[40px]">
              <div className="flex flex-col gap-[15px]  ">
                <h2
                  className={`md:font-medium md:text-[20px] font-semibold text-[24px] text-[#C209C1] ${syne.className} `}
                >
                  Workspaces
                </h2>
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className={`text-[16.45px] ${inter.className} min-w-[716px]`}>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Seats
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <p className="ml-5">1 editor</p>
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      1 editor, 3 guests
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      1 editor, 5 guests
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Custom # of editors & guests
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Usage limits
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <p className="ml-5">36 minutes of video / year</p>
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      120 minutes of video / year
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      360 minutes of video / year
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Unlimited minutes of video
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Commenting
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Workspaces
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Live collaboration
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="flex flex-col gap-[15px] ">
                <h2
                  className={`font-medium md:text-[20px] text-[24px] md:font-semibold text-[#C209C1] ${syne.className} `}
                >
                  AI Avatars & Languages
                </h2>
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className={`text-[16.45px] ${inter.className} min-w-[716px]`}>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      AI avatars
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <p className="ml-5">9 AI avatars</p>
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      125+ AI avatars
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      180+ AI avatars
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      230+ AI avatars
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Personal Avatars
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/play.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      3 personal avatars
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      5 personall avatars
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Unlimited personal avatars (subject to reasonable
                      consumption and compute)
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Studio Avatars
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Paid add-on ($1,000/year)
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Paid add-on ($1,000/year)
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Paid add-on ($1,000/year)
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Dialogue
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/play.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Avatar builder
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/play.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px]  gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      Language & Voices
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <p className="ml-5"> 140+ languages & voices</p>
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      140+ languages & voices
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      140+ languages & voices
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      140+ languages & voices
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA]  gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      AI dubbing
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Deducted from plan's usage limits. No lip sync
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      Paid add-on. Contact sales
                    </div>
                  </div>
                  <div className="grid grid-cols-5 rounded-[12.63px]  gap-4">
                    <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                      1-click translation
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/info.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                      />
                    </div>

                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/cross.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                    <div className="col-span-1 py-4 px-5 flex items-center">
                      <img
                        src="/pricing/tick.svg"
                        className="w-[16.83px] h-[16.83px] mt-[3px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="flex flex-col gap-[15px] ">
              <h2
                className={`md:font-medium md:text-[20px] text-[24px] font-semibold text-[#C209C1] ${syne.className} `}
              >
                Sharing & Export
              </h2>
          <div className="w-full overflow-x-auto scrollbar-hide">
              <div className={`text-[16.45px] ${inter.className} min-w-[716px]`} >
                <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    MP4 downloads
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px]  gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    Multilingual video player
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    SCORM export
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px]  gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    Video embeds
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    Smart updates
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/play.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px]  gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    Branded video page
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5 rounded-[12.63px] bg-[#E4E7FA] gap-4">
                  <div className="col-span-1 py-4 px-5 font-medium flex items-center ">
                    CTA on video page
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/info.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px] ml-5"
                    />
                  </div>

                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/cross.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                  <div className="col-span-1 py-4 px-5 flex items-center">
                    <img
                      src="/pricing/tick.svg"
                      className="w-[16.83px] h-[16.83px] mt-[3px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { title, planHeaders, planSections } = plansData;
  return (
    <div className="max-w-[1440px] mx-auto xl:p-[80px] xl:pb-[80px] py-[40px] pl-[24px]">
      <div className="flex flex-col gap-[64px]">
        <h1 className="font-semibold md:text-[48px] md:text-center text-[28px] text-black">
          {title || "Compare plans"}
        </h1>
        
        <div className="flex flex-col md:gap-[78px] gap-[40px]">
          {planSections && planSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-[15px]">
              <h2 className={`md:font-medium md:text-[20px] font-semibold text-[24px] text-[#C209C1] ${syne.className}`}>
                {section.title}
              </h2>
              
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className={`text-[16.45px] ${inter.className} min-w-[716px]`}>
                  {section.features && section.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className={`grid grid-cols-5 rounded-[12.63px] gap-4 ${
                        feature.is_highlighted ? 'bg-[#E4E7FA]' : ''
                      }`}
                    >
                      {/* Feature Name Column */}
                      <div className="col-span-1 py-4 px-5 font-medium flex items-center">
                        {feature.feature_name}
                      </div>

                      {/* Free Plan Column */}
                      <div className="col-span-1 py-4 px-5 flex items-center">
                        {renderCellContent(
                          feature.free_plan, 
                          feature.icon_type, 
                          feature.freeplan_icon
                        )}
                      </div>

                      {/* Starter Plan Column */}
                      <div className="col-span-1 py-4 px-5 flex items-center">
                        {renderCellContent(
                          feature.starter_plan, 
                          feature.icon_type, 
                          feature.starterplan_icon
                        )}
                      </div>

                      {/* Creator Plan Column */}
                      <div className="col-span-1 py-4 px-5 flex items-center">
                        {renderCellContent(
                          feature.creator_plan, 
                          feature.icon_type, 
                          feature.creatorplan_icon
                        )}
                      </div>

                      {/* Enterprise Plan Column */}
                      <div className="col-span-1 py-4 px-5 flex items-center">
                        {renderCellContent(
                          feature.enterprise_plan, 
                          feature.icon_type, 
                          feature.enterpriseplan_icon
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plans;
