"use client";
import Image from "next/image";
import AuthFooter from "@/components/auth/AuthFooter";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import React from "react";
import SideComponent from "@/components/auth/SideComponent";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isSignupPage = pathname === "/auth/sign-up";

  return (
    <div className="flex h-max w-full max-w-[1440px] mx-auto">
      <div className="w-1/2 h-screen flex flex-col  justify-between p-5">
        <div className="flex items-center gap-2 mb-2">
          {isSignupPage ? (
            <button
              onClick={() => router.back()}
              className="flex items-center w-[44px] h-[44px]  justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
            >
              <MoveLeft className="w-[24px] h-[24px] " />
            </button>
          ) : (
            <>
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-[44px] h-[44px] object-contain"
              />
              <span className="font-medium text-[22px] leading-none">
                allmyai
              </span>
            </>
          )}
        </div>

        <div className="flex flex-1  justify-center items-center">
          {children}
        </div>

        <AuthFooter />
      </div>

      <SideComponent />
    </div>
  );
}
