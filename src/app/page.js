"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Templates from "@/components/landing/Templates";
import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Carousel from "@/components/landing/Carousel";
import Download from "@/components/landing/Download";
import FeatureSection from "@/components/landing/FeatureSection";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Assistants from "@/components/landing/Assistants";
import Footer from "@/components/common/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Sidebar from "@/components/landing/Sidebar";
import { useState } from "react";
import StackingImages from "@/components/animation/OurServices/Stack";

export default function Landing() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headingVariants = {
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

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <div
        className={`overflow-hidden w-full lg:h-[1095px] h-[1146px]  ${
          sidebarOpen ? "" : ""
        }`}
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 56%, #c209c1 100%)",
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />

        <div className="lg:max-w-[1440px]  w-[100%] relative lg:mx-auto ">
          <div className="lg:max-w-[1280px] mx-auto lg:w-auto  min-w-[382px]  w-full  top-[24px]  flex flex-col lg:gap-[61px]">
            <Navbar
              showSidebarBtn={!sidebarOpen}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
            <Hero />
          </div>
        </div>
      </div>

      <Carousel />

      <motion.div 
        className="  bg-[#FAFAFA] max-w-[1440px]  mx-auto flex flex-col p-[24px]   lg:pt-[80px] lg:px-[80px] "
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className=""
          variants={headingVariants}
        >
          <motion.div 
            className="flex gap-[8px] font-semibold  lg:text-[48px] text-[28px]  text-black "
            variants={headingVariants}
          >
            <motion.span 
              className="text-[#C209C1]"
              variants={wordVariants}
            >
              Endless
            </motion.span>
            <motion.span 
              className=""
              variants={wordVariants}
            >
              possibilites
            </motion.span>
          </motion.div>
          <motion.h1 
            className="font-semibold  lg:text-[48px] text-[28px]  text-black"
            variants={headingVariants}
          >
            with AI art
          </motion.h1>
        </motion.div>
      </motion.div>

      <StackingImages />
      <Work />
      <Templates />
      <Download />
      <FeatureSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Assistants />
      <Footer />
    </>
  );
}
