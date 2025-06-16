import Image from "next/image";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
const page = () => {
  return (
    <div className="flex  h-screen ">
      <div className="w-1/2 p-5 ">
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
        <div className="flex h-[90vh] justify-center items-center">
          <LoginForm />
        </div>

        <AuthFooter />
      </div>
      <div
        className="flex my-auto rounded-4xl p-5 overflow-hidden w-1/2 mr-2 h-[99vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/auth/Right_Image.png')" }}
      >
        {/* Add content here if needed */}
        asdfas
      </div>
    </div>
  );
};

export default page;
