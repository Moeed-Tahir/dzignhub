import React, { useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";

function Navbar({  onOpenSidebar }) {

    const { IsLogin, SetIsLogin, SetEmail, SetUserId, SetAvatar, Avatar } =
      useUserStore();

    const router = useRouter();
    const verifyToken = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log("Token verification response:", data);
  
        if (data.type === "success") {
          SetIsLogin(true);
          SetEmail(data.user.email);
          SetUserId(data.user.userId);
          SetAvatar(data.user.avatar);
          router.push("/dashboard");
        } else {
          SetIsLogin(false);
        }
      } catch (error) {
        SetIsLogin(false);
        console.error("Token verification failed", error);
      }
    };
  
    useEffect(() => {
      verifyToken();
    }, []);
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
