import React from "react";
import Link from "next/link";

function Navbar({ showSidebarBtn, onOpenSidebar }) {
  return (
    <div className=" h-[48px] py-10 md:px-10 px-5 xl:px-0 justify-between flex">
      <Link href="/">
        <img
          src="/landing/Group.png"
          alt="logo"
          className="w-[44px] h-[44px] object-contain"
        />
      </Link>
      <div className="flex gap-[10px]">
        <button
          className={` bg-[#BDFF00] w-[100px] h-[47px] text-[#000000]  rounded-full   cursor-pointer`}
        >
          <Link href="/auth/login">Sign In</Link>
        </button>
        {/* Conditionally show the button */}

        <button
          className="w-[47px] h-[47px] bg-[#BDFF00] rounded-full flex items-center justify-center cursor-pointer"
          onClick={onOpenSidebar}
        >
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
