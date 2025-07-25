import React from "react";
import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import AssistantCard from "@/components/landing/AssistantCard";
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});

const assistants = [
  { src: "/landing/assistants/1.jpg", name: "Kano (UI/UX)" },
  { src: "/landing/assistants/2.jpg", name: "Mira (Business Strategy)" },
  { src: "/landing/assistants/3.jpg", name: "Novi (SEO specialist)" },
  { src: "/landing/assistants/4.jpg", name: "Sana (Content Creation)" },
];

const assistants2 = [
  { src: "/landing/assistants/5.jpg", name: "Novi (SEO specialist)" },
  { src: "/landing/assistants/3.jpg", name: "Sana (Content Creation)" },
  { src: "/landing/assistants/1.jpg", name: "Kana (Data Analysis)" },
  { src: "/landing/assistants/2.jpg", name: "Kano (UI/UX)" },
];

function Assistants() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
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

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8
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

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const sideCardVariants = {
    hidden: { 
      opacity: 0, 
      x: -60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const rightCardVariants = {
    hidden: { 
      opacity: 0, 
      x: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full bg-[#1B1F3B] py-[80px] relative flex justify-center items-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="!w-[1600px] flex flex-col justify-center items-center gap-[20px]  xl:gap-[40px]     mx-auto   ">
        <motion.div 
          className="flex gap-2 xl:gap-5"
          variants={rowVariants}
        >
          {assistants.map((item, index) => (
            <motion.div
              key={`top-${index}`}
              variants={cardVariants}
              whileHover={{ 
                // scale: 1.1, 
                y: -10,
                transition: { duration: 0.3 } 
              }}
            >
              <AssistantCard
                src={item.src}
                name={item.name}
                // style={{ left: `${-136 + index * 444}px`, top: "64px" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="flex gap-[24px] w-[90%] items-center justify-center"
          variants={containerVariants}
        >
          <motion.div
            variants={sideCardVariants}
            whileHover={{ 
              // scale: 1.1, 
              rotate: -5,
              transition: { duration: 0.3 } 
            }}
          >
            <AssistantCard
              src="/landing/assistants/4.jpg"
              name={"Mira (Growth Strategist)"}
              // positionClass="left-[-111px]"
            />
          </motion.div>

          <motion.div
            className={`w-[40%] mx-auto   ${syne.className} font-semibold md:text-[80px] text-[28px] text-[#FFFFFF] text-center uppercase`}
            variants={headingVariants}
          >
            <motion.span variants={wordVariants}>Your</motion.span>{" "}
            <motion.span 
              className="text-[#BDFF00]"
              variants={wordVariants}
              whileHover={{ 
                scale: 1.2, 
                transition: { duration: 0.2 } 
              }}
            >
              AI
            </motion.span>{" "}
            <motion.span variants={wordVariants}>Assistants</motion.span>
          </motion.div>

          <motion.div
            variants={rightCardVariants}
            whileHover={{ 
              // scale: 1.1, 
              rotate: 5,
              transition: { duration: 0.3 } 
            }}
          >
            <AssistantCard
              src="/landing/assistants/5.jpg"
              // style={{ right: `-50px` }}
              name={"Zara(Brand Designer)"}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex gap-2 xl:gap-5"
          variants={rowVariants}
        >
          {assistants2.map((item, index) => (
            <motion.div
              key={`bottom-${index}`}
              variants={cardVariants}
              whileHover={{ 
                // scale: 1.1, 
                y: -10,
                transition: { duration: 0.3 } 
              }}
            >
              <AssistantCard
                src={item.src}
                name={item.name}
                // style={{ left: `${-136 + index * 444}px`, top: "856px" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Assistants;
