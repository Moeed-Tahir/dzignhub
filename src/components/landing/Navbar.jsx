import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";

function Navbar({ onOpenSidebar }) {
  const { IsLogin, SetIsLogin, SetEmail, SetUserId, SetAvatar, Avatar } =
    useUserStore();

  const router = useRouter();

  // Animation variants
  const navbarVariants = {
    hidden: {
      opacity: 0,
      y: -60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

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
    <motion.div
      className=" h-[48px] py-10 md:px-10 px-5 xl:px-0 justify-between max-w-[1280px] mx-auto flex"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <Link href="/">
        <motion.img
          src="/landing/Group.png"
          alt="logo"
          className="w-[44px] h-[44px] object-contain"
          variants={logoVariants}
        />
      </Link>
      <motion.div className="flex gap-[10px]" variants={buttonVariants}>
        <Link href="/auth/login">
          <motion.button
            className={` bg-[#BDFF00] w-[100px] h-[47px] text-[#000000]  rounded-full   cursor-pointer`}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Sign In
          </motion.button>
        </Link>
        {/* Conditionally show the button */}

        <motion.button
          className="w-[47px] h-[47px] bg-[#BDFF00] rounded-full flex items-center justify-center cursor-pointer"
          onClick={onOpenSidebar}
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <img
            src="/landing/Vector.png"
            alt="vector"
            className="w-[16.8px] h-[14.4px] object-contain"
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Navbar;
