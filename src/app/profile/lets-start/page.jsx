"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LetsStart from "@/components/onboarding/LetsStart";
import DesignYouDirection from "@/components/onboarding/DesignYouDirection";
import SideComponent from "@/components/auth/SideComponent";
import { useUserStore } from "@/store/store";

const page = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [tab1Data, setTab1Data] = useState(null);
  const [tab2Data, setTab2Data] = useState(null);
  const letsStartRef = useRef();
  const designDirectionRef = useRef();

  const { SetIsLogin, SetEmail, SetUserId } = useUserStore()

  const verifyToken = async (token) => {
    console.log("Verifying token:", token);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Token verification response:", data);

      if (data.type === "success") {

        SetIsLogin(true);
        SetEmail(data.user.email);
        SetUserId(data.user._id);

        router.push("/dashboard");

      } else {
        console.error("Token verification failed:", data.message);

      }
    } catch (error) {
      console.error("Token verification failed", error);

    }
  };


  const handleNext = async () => {
    console.log("Current Tab:", currentTab);
    if (currentTab === 0) {
      // Save tab 1 data before moving to next tab
      if (letsStartRef.current) {
        const success = await letsStartRef.current.saveData();
        if (success) {
          setCurrentTab(currentTab + 1);
        } else {
          alert('Error saving data. Please try again.');
        }
      }
    } else if (currentTab === 1) {
      if (designDirectionRef.current) {
        const success = await designDirectionRef.current.saveData();
        if (success) {
          let token = localStorage.getItem("token")
          await verifyToken(token);
        } else {
          alert('Error saving data. Please try again.');
        }
      }
    }
  };

  const handleTab1DataChange = (data) => {
    setTab1Data(data);
  };

  const handleTab2DataChange = (data) => {
    setTab2Data(data);
  };

  return (
    <div className="bg-[#f8f8f8] max-w-[1440px] mx-auto justify-center items-start flex lg:gap-2 h-auto min-h-screen">
      <div className="bg-white m-5 xl:w-[56%] w-full mx-auto pt-[10px] lg:pt-[40px] overflow-x-hidden px-[20px] lg:px-[40px] min-h-[95vh] flex flex-col justify-between rounded-3xl">
        <div
          onClick={() => router.push("/")}
          className="flex justify-start items-center gap-2"
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

        {currentTab === 0 ? (
          <LetsStart
            ref={letsStartRef}
            onDataChange={handleTab1DataChange}
          />
        ) : (
          <DesignYouDirection ref={designDirectionRef}
            onDataChange={handleTab2DataChange}
          />
        )}

        <div className="relative flex justify-between items-center">
          <div className="absolute top-0 -right-16 border-t-[2px] border-[#F8F8F8] w-[120%]"></div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2].map((tab) => (
              <div
                key={tab}
                className={`w-[30vw] lg:w-[240px] h-[8px] rounded-full transition-all ease-in-out duration-300 ${currentTab >= tab ? "bg-[#C209C1]" : "bg-[#F8F8F8]"
                  }`}
              ></div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-[#BDFF00] text-[#1B1F3B] w-[84px] h-[40px] text-[16px] rounded-full font-medium my-3"
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