"use client";
import SideComponent from "@/components/auth/SideComponent";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import LetsStart from "@/components/onboarding/LetsStart";
import DesignYouDirection from "@/components/onboarding/DesignYouDirection";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="bg-[#f8f8f8] max-w-[1440px]  mx-auto justify-center items-start  flex lg:gap-2 h-auto min-h-screen">
      <div className="bg-white m-5 xl:w-[56%] w-full mx-auto  pt-[10px] lg:pt-[40px] overflow-x-hidden px-[20px] lg:px-[40px] min-h-[95vh] flex flex-col justify-between  rounded-3xl">
        <div
          onClick={() => router.push("/")}
          className="flex justify-start items-center  gap-2"
        >
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-[25px] h-[25px] object-contain"
          />
          <span className="font-medium text-[16px] leading-none">allmyai</span>
        </div>

        {currentTab === 0 ? <LetsStart /> : <DesignYouDirection />}
        <div className="relative flex justify-between items-center">
          <div className="absolute top-0 -right-16 border-t-[2px] border-[#F8F8F8] w-[120%]"></div>

          <div className="flex items-center  justify-center gap-2 ">
            {[1, 2].map((tab) => (
              <div
                key={tab}
                className={` w-[30vw] lg:w-[240px] h-[8px] rounded-full transition-all ease-in-out duration-300 ${
                  currentTab >= tab ? "bg-[#C209C1]" : "bg-[#F8F8F8]"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={() => {
              if (currentTab == 0) setCurrentTab(currentTab + 1);
              if (currentTab == 1) {
                router.push("/dashboard");
              }
            }}
            className="bg-[#BDFF00] text-[#1B1F3B] w-[84px] h-[40px] text-[16px] rounded-full font-medium  my-3"
          >
            Next
          </button>
        </div>
      </div>

      <div className="w-[40%] xl:flex hidden sticky top-0 h-fit">
        <SideComponent
          title={currentTab === 0 ? " Identity Spark" : "Brand Essence Mapping"}
          isProflePage={true}
        />
      </div>
    </div>
  );
};

export default page;
