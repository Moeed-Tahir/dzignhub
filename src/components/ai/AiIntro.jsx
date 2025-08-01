import Image from "next/image";
import React from "react";

export default function AIIntro({ name, description,img,  tagline }) {
  return (
    <div className="text-center absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[90%] max-w-[1280px] px-4 py-10">
      <Image
        src={img}
        alt="AI Avatar"
        width={400}
        height={400}
        className="w-[120px] h-[120px] rounded-full mx-auto mb-4"
      />
      <h1 className="text-[24px] md:text-[32px] font-semibold text-[#C209C1]">
        Hi, I am {name} 👋🏻
      </h1>
      <p className="text-[#1B1F3B] px-4 md:px-10 lg:px-52 text-[16px] md:text-[18px] font-semibold">{tagline} </p>
      <p className="text-[16px] font-normal text-[#68686B]  mt-1">
        {description}{" "}
      </p>
    </div>
  );
}
