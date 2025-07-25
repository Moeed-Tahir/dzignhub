import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
const cardData = [
  {
    title: "Describe your idea",
    description:
      "Start your project by uploading assets or choosing a template. You control the direction from the very beginning, shaping your vision exactly the way you want.",
    mobileManualImage: "/landing/work/mobile/manual-1.png",
    desktopManualImage: "/landing/work/desktop/manual-1.jpg",
    mobileProImage: "/landing/work/mobile/pro-1.png",
    desktopProImage: "/landing/work/desktop/pro-1.svg",
  },
  {
    title: "Let the System do your work",
    description:
      "Access powerful manual tools for image editing, video creation, or content design. You guide the process — the platform provides the flexibility and tools you need.",
    mobileManualImage: "/landing/work/mobile/manual-2.jpg",
    desktopManualImage: "/landing/work/desktop/manual-2.svg",
    mobileProImage: "/landing/work/mobile/pro-2.jpg",
    desktopProImage: "/landing/work/desktop/pro-1.svg",
  },
  {
    title: "Customize & download",
    description:
      "Make final adjustments to suit your preferences. Once you’re done, download your finished files and bring your project to life with confidence.",
    mobileManualImage: "/landing/work/mobile/manual-3.jpg",
    desktopManualImage: "/landing/work/desktop/manual-3.svg",
    mobileProImage: "/landing/work/mobile/pro-3.jpg",
    desktopProImage: "/landing/work/desktop/pro-1.svg",
  },
];

function Work() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState("right");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const toggleVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonHoverVariants = {
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

  return (
    <motion.div 
      className="max-w-[1280px] pt-[64px] xl:px-[40px] px-[20px]  pb-[64px]  mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div 
        className="p-[20px] xl:p-[40px] gap-[64px] rounded-[40px] bg-[#1B1F3B] flex flex-col shadow-md"
        variants={sectionVariants}
      >
        <motion.div 
          className="flex justify-between items-center flex-col xl:flex-row gap-[24px]"
          variants={containerVariants}
        >
          <motion.h2 
            className=" xl:text-[48px] text-center xl:text-start text-[28px] font-semibold text-white"
            variants={headerVariants}
          >
            How AllMyAI works
          </motion.h2>

          <motion.div 
            className="w-[261px] h-[56px] rounded-full px-[8px] py-[6px] bg-[#212e62] flex items-center gap-[4px] text-[14px] "
            variants={toggleVariants}
          >
            <motion.button
              onClick={() => setSelected("left")}
              className={`${
                selected === "left"
                  ? "w-[124px] h-[44px] bg-[#BDFF00] text-[#000000]"
                  : "w-[121px] h-[40px] bg-[#212e62] text-[#FFFFFF]"
              } px-[32px] py-[10px] gap-[4px] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer`}
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Manual
            </motion.button>

            <motion.button
              onClick={() => setSelected("right")}
              className={`${
                selected === "right"
                  ? "w-[124px] h-[44px] bg-[#BDFF00] text-[#000000]"
                  : "w-[121px] h-[40px] bg-[#212e62] text-[#FFFFFF]"
              } px-[32px] py-[10px] gap-[4px] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center`}
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <img
                src={`/landing/${
                  selected === "right"
                    ? "starVector.svg"
                    : "starVectorWhite.svg"
                }`}
                className="w-[24px] h-[24px] object-contain"
              />

              <p>Pro</p>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className=" gap-[24px] flex flex-col"
          variants={containerVariants}
        >
          <motion.div 
            className=" flex flex-col xl:flex-row justify-between gap-[10px]  rounded-xl"
            variants={containerVariants}
          >
            {cardData.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <motion.div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`max-w-[416px] h-full xl:max-h-[152.89px] bg-[#212e62] p-[20px] xl:w-[32%] gap-[8px] rounded-[12px] flex flex-col cursor-pointer
            ${isSelected ? "border border-[#BDFF00]" : ""}`}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex gap-[7px]">
                    <div
                      className={`w-[32px] h-[32px] text-center flex items-center justify-center text-sm font-bold rounded-[6px]
                ${
                  isSelected
                    ? "bg-[#BDFF00] text-[#212e62]"
                    : "bg-[#212e62] text-[#BDFF00]"
                }`}
                    >
                      {index + 1}
                    </div>

                    <div className="w-[340px] xl:h-[112.89px] gap-[7px] flex flex-col">
                      <p className="text-[20px] font-medium  text-[#FAFAFA]">
                        {item.title}
                      </p>
                      <p className="text-[14px] font-normal text-[#FAFAFA]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="mx-auto"
            variants={imageVariants}
          >
            <motion.img
              src={
                selected === "right"
                  ? cardData[selectedIndex].mobileProImage
                  : cardData[selectedIndex].mobileManualImage
              }
              alt={cardData[selectedIndex].title}
              className="object-contain rounded-[20px] max-h-[724px] md:hidden"
              key={`mobile-${selectedIndex}-${selected}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          <motion.div 
            className="mx-auto"
            variants={imageVariants}
          >
            <motion.img
              src={
                selected === "right"
                  ? cardData[selectedIndex].desktopProImage
                  : cardData[selectedIndex].desktopManualImage
              }
              alt={cardData[selectedIndex].title}
              className="object-contain rounded-[20px] md:max-h-[1030px] hidden md:block"
              key={`desktop-${selectedIndex}-${selected}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Work;
