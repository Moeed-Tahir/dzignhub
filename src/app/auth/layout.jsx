"use client";
import Image from "next/image";
import AuthFooter from "@/components/auth/AuthFooter";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import React from "react";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isSignupPage = pathname === "/auth/sign-up";

  return (
    <div className="flex bg-white h-screen">
      <div className="w-1/2 p-5">
        <div className="flex items-center gap-2 mb-2">
          {isSignupPage ? (
            <button
              onClick={() => router.back()}
              className="flex items-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
            >
              <MoveLeft className="w-8 h-8 " />
            </button>
          ) : (
            <>
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-12 h-12 object-contain"
              />
              <span className="font-medium text-[22px] leading-none">
                allmyai
              </span>
            </>
          )}
        </div>

        <div className="flex h-[90vh] justify-center items-center">
          {children}
        </div>

        <AuthFooter />
      </div>

      <div
        className="flex my-auto rounded-4xl p-5 overflow-hidden w-1/2 mr-2 h-[99vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/auth/Right_Image.png')" }}
      ></div>
    </div>
  );
}
