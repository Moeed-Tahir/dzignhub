import Image from "next/image";
import AuthFooter from "@/components/auth/AuthFooter";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex bg-white h-screen">
      {/* Left Side (Logo + Form + Footer) */}
      <div className="w-1/2 p-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-12 h-12 object-contain"
          />
          <span className="font-medium text-[22px] leading-none">allmyai</span>
        </div>

        {/* Form container */}
        <div className="flex h-[90vh] justify-center items-center">
          {children}
        </div>

        {/* Footer */}
        <AuthFooter />
      </div>

      {/* Right Side (Image) */}
      <div
        className="flex my-auto rounded-4xl p-5 overflow-hidden w-1/2 mr-2 h-[99vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/auth/Right_Image.png')" }}
      ></div>
    </div>
  );
}
