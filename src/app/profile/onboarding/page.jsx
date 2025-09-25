"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = ({ variant = "default" }) => {
  const router = useRouter();

  const content = {
    default: {
      headline: "Welcome to AllMyAI",
      subheadline:
        "Let’s set your creative vision. Tell us about your goals and style so your AI team can bring it to life.",
      cta: "Begin my journey",
      redirect: "/profile/lets-start",
    },
    fashion: {
      headline: "Welcome to AllMyAI",
      subheadline:
        "We’ll capture your brand DNA — from pitch deck style to product visuals — so everything feels made for you.",
      cta: "Start now",
      redirect: "/profile/fashion-start",
    },
  };

  const { headline, subheadline, cta, redirect } = content[variant];

  return (
    <div className="flex items-center overflow-hidden justify-center bg-white h-screen my-auto bg-cover bg-center">
      <div>
        <div className="relative">
          <Image
            src={"/onboarding/art work.png"}
            width={800}
            height={50}
            alt=""
            className="mx-auto"
          />

          <Image
            src={"/onboarding/Logo.png"}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width={95}
            height={95}
            alt=""
          />

          <Image
            src={"/onboarding/gradient-mix.png"}
            className="absolute right-[100px] -top-40"
            width={396}
            height={210}
            alt=""
          />
          <Image
            src={"/onboarding/gradient-mix.png"}
            className="absolute rotate-30 right-[100px] -top-10"
            width={396}
            height={210}
            alt=""
          />
        </div>

        <div className="relative">
          <p className="text-center text-[48px] font-semibold mt-4">
            {headline}
          </p>

          <p className="text-[#68686B] text-[18px] my-4 w-[70%] text-center mx-auto">
            {subheadline}
          </p>

          <button
            onClick={() => router.push(redirect)}
            className="text-[#1B1F3B] z-10 mt-4 bg-[#BDFF00] py-[12px] px-[24px] flex rounded-full text-[16px] font-semibold items-center gap-2 cursor-pointer mx-auto"
          >
            <Image
              src={"/onboarding/star.svg"}
              alt=""
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
            />
            {cta}
          </button>

          <Image
            src={"/onboarding/gradient-mix.png"}
            className="absolute rotate-45 z-0 right-[100px] top-0 pointer-events-none"
            width={500}
            height={260}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
