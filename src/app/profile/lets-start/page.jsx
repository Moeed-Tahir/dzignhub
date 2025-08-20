"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LetsStart from "@/components/onboarding/LetsStart";
import DesignYouDirection from "@/components/onboarding/DesignYouDirection";
import SideComponent from "@/components/auth/SideComponent";
import { useUserStore } from "@/store/store";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [tab1Data, setTab1Data] = useState({
    userTypeCount: 0,
    creationGoalsCount: 0,
    userType: [],
    creationGoals: [],
  });
  const [tab2Data, setTab2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const letsStartRef = useRef();
  const designDirectionRef = useRef();

  const { SetIsLogin, SetEmail, SetUserId } = useUserStore();

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
        let route = localStorage.getItem("route");
        console.log("Route from localStorage:", route);
        if (route !== null && route !== undefined) {
          localStorage.removeItem("route");
          router.push(route);
        } else {
          router.push(`/dashboard`);
        }
      } else {
        console.error("Token verification failed:", data.message);
      }
    } catch (error) {
      console.error("Token verification failed", error);
    }
  };

  const handleNext = async () => {
    console.log("Current Tab:", currentTab);
    setFade(false); // Start fade out
    setLoading(true); // Show spinner and animate bars
    if (
      currentTab === 0 &&
      (tab1Data.userTypeCount < 2 || tab1Data.creationGoalsCount < 2)
    ) {
      toast.error(
        "Please select at least two options from both sections before proceeding.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setLoading(false);
      setFade(true);
      return;
    }
    setTimeout(async () => {
      if (currentTab === 0) {
        if (letsStartRef.current) {
          const success = await letsStartRef.current.saveData();
          console.log("Tab 1 data saved:", success);
          if (success) {
            setCurrentTab(currentTab + 1);
          }
        }
      } else if (currentTab === 1) {
        // Always get latest data from ref
        let latestTab2Data = designDirectionRef.current?.getData?.() || {};
        const brandWords = latestTab2Data.brandWords || [];
        console.log('Latest brandWords:', brandWords);
        const brandTone = latestTab2Data.brandTone || [];
        const designStyle = latestTab2Data.designStyle || [];
        let errorMsg = "";
        if (brandWords.length < 3) {
          errorMsg = "Please enter at least 3 brand words.";
        } else if (brandTone.length < 2) {
          errorMsg = "Please select at least 2 brand tones.";
        } else if (designStyle.length < 1) {
          errorMsg = "Please select at least 1 style.";
        }
        if (errorMsg) {
          toast.error(errorMsg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
          setFade(true);
          return;
        }
        if (designDirectionRef.current) {
          const success = await designDirectionRef.current.saveData();
          if (success) {
            let token = localStorage.getItem("token");
            await verifyToken(token);
          } else {
            alert("Error saving data. Please try again.");
          }
        }
      }
      setTimeout(() => {
        setLoading(false);
        setFade(true); // Fade in new content
      }, 500); // Duration of spinner and bar animation
    }, 400); // Duration of fade out
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

        <div className="relative min-h-[40px] flex items-center justify-center">
          {loading && (
            <div className="absolute top-0 left-0 w-full flex justify-center items-center z-10">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

        <div
          className={`transition-opacity duration-400 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentTab === 0 ? (
            <LetsStart ref={letsStartRef} onDataChange={handleTab1DataChange} />
          ) : (
            <DesignYouDirection
              ref={designDirectionRef}
              onDataChange={handleTab2DataChange}
            />
          )}
        </div>

        <div className="relative flex justify-between items-center">
          <div className="absolute top-0 -right-16 border-t-[2px] border-[#F8F8F8] w-[120%]"></div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2].map((tab, idx) => (
              <div
                key={tab}
                className={`w-[30vw] lg:w-[240px] h-[8px] rounded-full overflow-hidden bg-[#F8F8F8]`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    loading
                      ? "w-full"
                      : currentTab >= tab
                      ? "w-full bg-[#C209C1]"
                      : "w-0 bg-[#C209C1]"
                  }`}
                  style={{
                    backgroundColor: currentTab >= tab ? "#C209C1" : "#F8F8F8",
                  }}
                ></div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-[#BDFF00] text-[#1B1F3B] w-[84px] h-[40px] text-[16px] rounded-full font-medium my-3"
            disabled={loading}
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
      {/* Spinner CSS */}
      <style jsx>{`
        .spinner-border {
          border-radius: 50%;
          border-width: 4px;
          border-style: solid;
          border-color: #c209c1 #c209c1 #c209c1 transparent;
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default page;
