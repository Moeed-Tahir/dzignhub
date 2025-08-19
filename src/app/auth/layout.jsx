"use client";
import Image from "next/image";
import AuthFooter from "@/components/auth/AuthFooter";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import SideComponent from "@/components/auth/SideComponent";
import { fetchLoginPageData } from "@/utils/strapi";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loginPageData, setLoginPageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const isSignupPage = pathname === "/auth/sign-up";

  // Fetch login page data for side component
  useEffect(() => {
    const loadLoginPageData = async () => {
      try {
        setDataLoading(true);
        const data = await fetchLoginPageData();
        setLoginPageData(data);
      } catch (error) {
        console.error('Error loading login page data for layout:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadLoginPageData();
  }, []);

  return (
    <div className="bg-[#f8f8f8] max-w-[1440px]  mx-auto justify-center items-start  flex gap-2 h-auto min-h-screen">
      <div className="lg:w-1/2 w-full mx-auto min-h-screen flex flex-col  justify-between p-5">
        <div className="flex items-center gap-2 mb-2">
          {isSignupPage ? (
            <button
              onClick={() => router.back()}
              className="flex items-center w-[44px] h-[44px]  justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
            >
              <MoveLeft className="w-[24px] h-[24px] " />
            </button>
          ) : (
            <div
              className="flex justify-center items-center gap-1 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-[44px] h-[44px] object-contain "
              />
              <span className="font-medium text-[#1B1F3B] text-[22px] leading-none">
                allmyai
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1  justify-center items-center">
          {children}
        </div>

        <AuthFooter />
      </div>
      <div className="lg:w-[50%] sticky top-0 h-fit">
        <SideComponent 
          isProfilePage={true} 
          sideData={!dataLoading && loginPageData?.side ? loginPageData.side : null}
        />
      </div>
    </div>
  );
}
