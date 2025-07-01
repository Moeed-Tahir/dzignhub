import Image from "next/image";
import React from "react";

export default function AIIntro() {
  return (
    <div className="text-center absolute top-1/2 translate-y-[-50%] w-full max-w-[1280px] py-10">
      <Image
        src="/ai/ai-dp.png"
        alt="AI Avatar"
        width={400}
        height={400}
        className="w-[120px] h-[120px] rounded-full mx-auto mb-4"
      />
      <h1 className="text-[32px] font-semibold text-[#C209C1]">
        Hi, I am Zara 👋🏻
      </h1>
      <p className="text-[#1B1F3B] text-[18px] font-semibold">
        I specialize in brand design — logos, mood boards, and color palettes.
      </p>
      <p className="text-[16px] font-normal text-[#68686B]  mt-1">
        Describe what you need or choose a suggested prompt below
      </p>
    </div>
  );
}
