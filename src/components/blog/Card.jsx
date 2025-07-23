import React from "react";
import Link from "next/link";

import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
function Card({ date, title, image,link }) {
  return (
    <div className="p-[22px] rounded-[20px] shadow-[0px_3.28px_17.5px_0px_#2F536D1F]">
      <div className="flex flex-col gap-[51px]">
        <img src={image} className="rounded-[20px]" />

        <div className="flex flex-col gap-[16px]">
          <h3 className="text-[16px] text-[#3D4050]">{date}</h3>
          <h2 className="text-[20px] font-medium">{title}</h2>
        </div>
        <Link
          href="/blog"
          className={`flex gap-[10px] cursor-pointer group ${syne.className}`}
        >
          <p className="text-[20px] group-hover:underline">Read More</p>
          <img src="/blog/arrow.svg" className="" />
        </Link>
      </div>
    </div>
  );
}

export default Card;
