// src/components/landing/Hero.jsx
"use client";
import { FaArrowRight } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Anybody } from "next/font/google";
import { Syne } from "next/font/google";
import { motion } from "framer-motion";
import HeroCTA from "./HeroCTA";
import HeroCTAMobile from "./HeroCTAMobile";
import Link from "next/link";
import { ModernInput } from "./MessageInput";
import Carousel from "./Carousel";

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
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const announcementVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
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

export default function Hero({
  heroSection = null,
  mainHeading,
  mainDescription,
}) {
  // Use dynamic hero section data if available, otherwise use props or fallback
  const heroData = heroSection || {
    mainHeading: mainHeading || "AllMyAI SuperAI",
    mainDescription:
      mainDescription ||
      "Your all-in-one AI Co-Creator. Bring your brand, products, and presentations to life. Instantly.",
    announcementIcon: null,
    announcementText: "New Agent Release",
    earlyAccessText: "Get early access",
    earlyAccessLink: "/auth/sign-up",
    ctaButtonText: "Create image",
    ctaSecondaryText: null,
    ctaLink: "/image-creation",
    showAnnouncement: true,
    ctaInputPlaceholder:
      "A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape",
  };

  // Process dynamic data with fallbacks
  const processedHeroData = {
    mainHeading: heroData.mainHeading || mainHeading || "AMAI SuperAI",
    mainDescription:
      heroData.mainDescription ||
      mainDescription ||
      "Your all-in-one AI Co-Creator. Bring your brand, products, and presentations to life. Instantly.",
    announcementIcon: heroData.announcementIcon,
    announcementText: heroData.announcementText || "New Agent Release!",
    earlyAccessText: heroData.earlyAccessText || "Get early access",
    earlyAccessLink: heroData.earlyAccessLink || "/auth/sign-up",
    ctaButtonText: heroData.ctaButtonText || "Create image",
    ctaSecondaryText: heroData.ctaSecondaryText,
    ctaLink: heroData.ctaLink || "/image-creation",
    showAnnouncement: heroData.showAnnouncement !== false, // Default to true
    ctaInputPlaceholder:
      heroData.ctaInputPlaceholder ||
      "A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape",
  };
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
        <div className="flex flex-col lg:gap-[16px] mx-auto gap-5 sm:gap-[32px]">
          {/* Announcement */}
          {processedHeroData.showAnnouncement && (
            <motion.div
              className="lg:w-auto lg:px-3 lg:gap-4 lg:h-[42px] w-[250px] h-[44px] flex items-center justify-around rounded-full mx-auto bg-[#212e62] "
              variants={announcementVariants}
            >
              <div
                className="w-[28px] h-[20px] rounded-sm bg-gradient-to-tr from-[#5AE2B9] via-[#DCCC3A] to-[#1A76FF]"
                style={{ boxShadow: "0 0 6px #5AE2B9" }} // subtle green glow
              >
                <div className="w-full h-full bg-black rounded-sm flex items-center justify-center">
                  {processedHeroData.announcementIcon ? (
                    <img
                      src={
                        processedHeroData.announcementIcon.url ||
                        processedHeroData.announcementIcon
                      }
                      alt="Announcement Icon"
                      className="w-[13px] h-[13px]"
                    />
                  ) : (
                    <MdTranslate className="w-[13px] h-[13px] text-white" />
                  )}
                </div>
              </div>

              <p className="text-[#FFFFFF] text-[18px] font-medium">
                {processedHeroData.announcementText}
              </p>

              <img
                src="/landing/Announcement-separator.png"
                className="w-[4px] h-[4px] lg:block hidden"
              />
            </motion.div>
          )}

          <motion.div
            className="flex flex-col lg:gap-[32px] gap-[18px]"
            variants={itemVariants}
          >
            <motion.h1
              className={`lg:text-[68px] px-2 lg:px-0  w-full text-[46px] text-white  text-center leading-tight  font-bold`}
              variants={itemVariants}
            >
              {processedHeroData.mainHeading}
            </motion.h1>
            <motion.p
              className={`lg:text-[18px] text-[16px] text-[#F0F0F3] text-center leading-[28px] lg:w-[727px] lg:h-[56px] h-auto w-[335px]  mx-auto `}
              variants={itemVariants}
            >
              {processedHeroData.mainDescription}
            </motion.p>
          </motion.div>
          <div className="flex flex-col-reverse sm:flex-col">
            <ModernInput />

            <Carousel />
          </div>
        </div>
      </motion.div>
    </>
  );
}
