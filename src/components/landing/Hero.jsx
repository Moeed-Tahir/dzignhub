// src/components/landing/Hero.jsx
"use client";
import { FaArrowRight } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Anybody } from "next/font/google";
import { Syne } from "next/font/google";
import { motion } from "framer-motion";
import HeroCTA from "./HeroCTA";
import HeroCTAMobile from "./HeroCTAMobile";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});
const anybody = Anybody({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-anybody",
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const announcementVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Hero() {
  return (
    <>
      {/* Center box with border */}
      <motion.div 
        className=" mx-auto lg:rounded-[16px] flex flex-col lg:gap-[40px] mt-10 gap-[32px] lg:static    "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top section (announcement + heading + paragraph) */}
        <div className="flex flex-col lg:gap-[16px] mx-auto gap-[32px]">
          {/* Announcement */}
          <motion.div 
            className="lg:w-[492px] lg:h-[42px] w-[291px] h-[44px] flex items-center justify-around rounded-full mx-auto bg-[#212e62] "
            variants={announcementVariants}
          >
            <div className="w-[24px] h-[24px] p-[1px] rounded-lg bg-gradient-to-tr from-[#5AE2B9] via-[#DCCC3A] to-[#1A76FF]">
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                <MdTranslate className="w-[13px] h-[13px] text-white" />
              </div>
            </div>
            <p className="text-[#A7ADBE] text-[18px]">
              Speech to speech release!
            </p>

            <img
              src="/landing/Announcement-separator.png"
              className="w-[4px] h-[4px] lg:block hidden"
            />
            <p className="text-[#BDFF00] text-[18px] lg:block hidden">
              Get early access
            </p>
            <motion.button 
              className="lg:flex hidden w-[38px] h-[26px] rounded-full bg-[#060606] border border-[#BDFF00] items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaArrowRight className="text-white  lg:w-[18px] w-[16px] h-[16px] lg:h-[18px]" />
            </motion.button>
          </motion.div>
          <motion.div 
            className="lg:hidden flex mx-auto gap-[10px] h-[28px] w-[191px]"
            variants={itemVariants}
          >
            <p className="text-[#BDFF00] lg:text-[18px] text-[16px] ">
              Get early access
            </p>
            <motion.button 
              className="flex  w-[38px] h-[26px] rounded-[100px] bg-[#060606] border border-[#BDFF00] items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaArrowRight className="text-white lg:w-[18px] w-[16px] h-[16px] lg:h-[18px]" />
            </motion.button>
          </motion.div>
          {/* Heading + Paragraph */}
          <motion.div 
            className="flex flex-col lg:gap-[32px] gap-[18px]"
            variants={itemVariants}
          >
            <motion.h1
              className={`lg:text-[68px] max-w-[929px] w-full text-[46px] text-white  text-center leading-tight  font-semibold`}
              variants={itemVariants}
            >
              Turn Your Words Into Stunning Visuals
            </motion.h1>
            <motion.p
              className={`lg:text-[18px] text-[16px] text-[#F0F0F3] text-center leading-[28px] lg:w-[727px] lg:h-[56px] h-[96px] w-[335px]  mx-auto `}
              variants={itemVariants}
            >
              Whether you need concept art, marketing materials, or personal
              projects, our text-to-image generator brings your imagination to
              life.
            </motion.p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HeroCTA/>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <HeroCTAMobile/>
        </motion.div>
      </motion.div>
    </>
  );
}
