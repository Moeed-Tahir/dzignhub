"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const tabsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const tabItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  }
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const tabData = {
  "Image Creation": {
    title: "Envision The Extraordinary",
    content: [
      "Take creativity a step further with the transformative power of our Image Generation tool. It's not just about bringing your concepts to life — redefine the impossible. From beginners to professionals, we offer a spectrum of settings that can be intuitively tailored to your needs.",
      "Discover an unprecedented fusion of simplicity and power, designed to cater to creative minds at all levels.",
    ],
    image: "/video-creation/toolkit.png",
  },
  "Brand Design": {
    title: "Build Your Brand Identity",
    content: [
      "Create stunning brand identities with our comprehensive design toolkit. From logos to complete brand guidelines, our AI-powered tools help you establish a cohesive visual presence that resonates with your audience.",
      "Transform your vision into a professional brand that stands out in today's competitive marketplace.",
    ],
    image: "/video-creation/toolkit.png",
  },
  "Content Creation": {
    title: "Craft Compelling Content",
    content: [
      "Generate engaging content that captivates your audience across all platforms. Our advanced content creation tools help you produce high-quality copy, social media posts, and marketing materials effortlessly.",
      "Streamline your content workflow and maintain consistent messaging across all your communications.",
    ],
    image: "/video-creation/toolkit.png",
  },
};

export default function DzignhubToolkit() {
  const [activeTab, setActiveTab] = useState("Image Creation");

  return (
    <motion.section 
      className="bg-[#1B1F3B] md:py-16 px-[15px]  py-[24px] md:px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div className="text-center mb-12" variants={headingVariants}>
          <motion.h1 
            className="text-[30px] md:text-[48px] font-medium md:font-semibold mb-8"
            variants={headingVariants}
          >
            <span className="text-[#C209C1]">Allmyai</span>
            <span className="text-white"> Toolkit</span>
          </motion.h1>

          <motion.div 
            className="flex justify-center w-full md:justify-start"
            variants={tabsVariants}
          >
            <div className="flex border-b border-gray-600">
              {Object.keys(tabData).map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 md:px-6 py-3 text-[16px] font-medium transition-colors duration-200 border-b-3 cursor-pointer ${
                    activeTab === tab
                      ? "text-[#BDFF00] border-[#BDFF00]"
                      : "text-gray-300 border-transparent hover:text-white"
                  }`}
                  variants={tabItemVariants}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="space-y-6 w-full max-w-xl"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.p 
                className="text-[#BDFF00] text-[16px] inline-block rounded-full border-gray-700 border bg-[#312e62] px-4 py-1"
                variants={badgeVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#BDFF00",
                  color: "#000",
                  transition: { duration: 0.2 }
                }}
              >
                {activeTab}
              </motion.p>

              <motion.h2 
                className="text-[20px] md:text-[24px] font-medium md:font-semibold text-white leading-tight"
                variants={contentItemVariants}
              >
                {tabData[activeTab].title}
              </motion.h2>

              <motion.div className="space-y-4" variants={contentItemVariants}>
                {tabData[activeTab].content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-gray-300 font-normal text-lg leading-relaxed"
                    variants={contentItemVariants}
                    custom={index}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`image-${activeTab}`}
              className="relative"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="relative rounded-2xl overflow-hidden ">
                <motion.div 
                  className=" rounded-xl overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Image
                    src={tabData[activeTab].image || "/placeholder.svg"}
                    alt={`${activeTab} interface`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
