"use client";
import Image from "next/image";
import AuthFooter from "@/components/auth/AuthFooter";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import SideComponent from "@/components/auth/SideComponent";
import { fetchLoginPageData } from "@/utils/strapi";
import { title } from "process";
import { Description } from "node_modules/@radix-ui/react-dialog/dist";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loginPageData, setLoginPageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const isSignupPage = pathname === "/auth/sign-up";

  useEffect(() => {
    const loadLoginPageData = async () => {
      try {
        setDataLoading(true);
        const data = await fetchLoginPageData();
        let newSlides = [];
        if (pathname === "/auth/login") {
          newSlides = [
            {
              title: "Your AI co creator is ready",
              description:
                "Access your full team of AI assistants and start building lookbooks, pitch decks, and product visuals in minutes",
            },
            {
              title: "Your AI team, always ready",
              description:
                "From brand design to launch plans, get everything done faster in one place.",
            },
            {
              title: "Smarter tools, simpler work",
              description:
                "AI assistants that think with you, so you can create and launch faster.",
            },
            {
              title: "Collaboration made simple",
              description:
                "Work with your team, clients, or investors in one shared space.",
            },
            {
              title: "Always evolving with you",
              description:
                "Our AI learns from every project, getting smarter so your work keeps getting better.",
            },
          ];
        }
        if (pathname === "/auth/forget-password") {
          newSlides = [
            {
              title: "We have you covered",
              description:
                "Your AI co creator will get you back in quickly so you can keep building your brand",
            },
          ];
        }
        if (pathname === "/auth/password-reset") {
          newSlides = [
            {
              title: "Back to creating in seconds",
              description:
                "Once verified, you can reset your password and return to your AI co creator without losing your flow.",
            },
          ];
        }
        if (pathname === "/auth/sign-up") {
          newSlides = [
            {
              title: "Your creative team is ready",
              description:
                "Sign up today and start building lookbooks, pitch decks, and product visuals in minutes with your AI co creator",
            },
          ];
        }
        if (pathname === "/auth/login") {
          newSlides = [
            {
              title: "Your AI co creator is here",
              description:
                "Pick up right where you left off. Build lookbooks, pitch decks, and product visuals in minutes.",
            },
          ];
        }
        if (data?.side) {
          data.side.slides = newSlides;
        }
        setLoginPageData(data);
      } catch (error) {
        console.error("Error loading login page data:", error);
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
                width={120}
                height={1000}
                className="w-[120px] h-[28px] object-contain "
              />
              {/* <span className="font-medium text-[#1B1F3B] text-[22px] leading-none">
                allmyai
              </span> */}
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
          sideData={
            !dataLoading && loginPageData?.side ? loginPageData.side : null
          }
        />
      </div>
    </div>
  );
}
