import React from "react";
import { Syne } from "next/font/google";
import Link from "next/link";
const syne = Syne({
  subsets: ["latin"],
  weight: ["400"],
});

function Navbar() {
  return (
    <div className=" h-[48px] px-[40px] py-10 xl:px-0 justify-between flex">
      <img
        src="/landing/Group.png"
        alt="logo"
        className="w-[44px] h-[44px] object-contain"
      />
      <div className="flex gap-[10px]">
        <button
          className={`${syne.classname} bg-[#BDFF00] w-[100px] h-[47px] text-[#000000]  rounded-full   cursor-pointer`}
        >
          <Link href="/auth/login">Sign In</Link>
        </button>
        <button className="w-[47px] h-[47px] bg-[#BDFF00] rounded-full flex items-center justify-center cursor-pointer">
          <img
            src="/landing/Vector.png"
            alt="vector"
            className="w-[16.8px] h-[14.4px] object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
