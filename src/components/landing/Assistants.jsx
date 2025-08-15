import React from "react";
import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import AssistantCard from "@/components/landing/AssistantCard";
import { getStrapiImageUrl } from "@/utils/strapi";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});

// Fallback data for when Strapi data is not available
const fallbackAssistants = [
  { src: "/landing/assistants/1.jpg", name: "Kano (UI/UX)", group: "top" },
  { src: "/landing/assistants/2.jpg", name: "Mira (Business Strategy)", group: "top" },
  { src: "/landing/assistants/3.jpg", name: "Novi (SEO specialist)", group: "top" },
  { src: "/landing/assistants/4.jpg", name: "Sana (Content Creation)", group: "top" },
  { src: "/landing/assistants/1.jpg", name: "Kano (UI/UX)", group: "top" },
  { src: "/landing/assistants/2.jpg", name: "Mira (Business Strategy)", group: "top" },
  { src: "/landing/assistants/3.jpg", name: "Novi (SEO specialist)", group: "top" },
  { src: "/landing/assistants/4.jpg", name: "Sana (Content Creation)", group: "top" },
];

const fallbackAssistants2 = [
  { src: "/landing/assistants/5.jpg", name: "Novi (SEO specialist)", group: "bottom" },
  { src: "/landing/assistants/3.jpg", name: "Sana (Content Creation)", group: "bottom" },
  { src: "/landing/assistants/1.jpg", name: "Kana (Data Analysis)", group: "bottom" },
  { src: "/landing/assistants/2.jpg", name: "Kano (UI/UX)", group: "bottom" },
  { src: "/landing/assistants/5.jpg", name: "Novi (SEO specialist)", group: "bottom" },
  { src: "/landing/assistants/3.jpg", name: "Sana (Content Creation)", group: "bottom" },
  { src: "/landing/assistants/1.jpg", name: "Kana (Data Analysis)", group: "bottom" },
  { src: "/landing/assistants/2.jpg", name: "Kano (UI/UX)", group: "bottom" },
];

function Assistants({ assistantSection }) {
  console.log('Assistants component received data:', assistantSection);

  // Use Strapi data if available, otherwise use fallback
  const headingPre = assistantSection?.headingPre || "Your";
  const headingHighlight = assistantSection?.headingHighlight || "AI";
  const headingPost = assistantSection?.headingPost || "Assistants";
  
  // Process assistants data
  const assistantsData = assistantSection?.assistants || [];
  
  // Group assistants by their group property
  const topAssistants = assistantsData.filter(assistant => assistant.group === "top");
  const bottomAssistants = assistantsData.filter(assistant => assistant.group === "bottom");
  const middleAssistants = assistantsData.filter(assistant => assistant.group === "middle");
  
  // Use fallback if no Strapi data
  const displayTopAssistants = topAssistants.length > 0 ? topAssistants : fallbackAssistants;
  const displayBottomAssistants = bottomAssistants.length > 0 ? bottomAssistants : fallbackAssistants2;
  
  // Get middle assistants for the side cards (or use defaults)
  const leftAssistant = middleAssistants[0] || { src: "/landing/assistants/4.jpg", name: "Mira (Growth Strategist)" };
  const rightAssistant = middleAssistants[1] || { src: "/landing/assistants/5.jpg", name: "Zara(Brand Designer)" };

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
      className="w-full bg-[#1B1F3B] py-[80px] relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className=" flex flex-col justify-center items-center gap-[20px]  xl:gap-[40px]      mx-auto  overflow-hidden  ">
        <motion.div 
          className="flex gap-5  md:w-[1580px] w-[1000px] animate-scroll-left "
          variants={rowVariants}
        >
          {displayTopAssistants.map((item, index) => (
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
                src={item.avatar ? getStrapiImageUrl(item.avatar) : item.src}
                name={item.name}
                // style={{ left: `${-136 + index * 444}px`, top: "64px" }}
              />
            </motion.div>
          ))}
          
        </motion.div>

        <motion.div 
          className="flex gap-[24px] items-center justify-center w-full"
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
              src={leftAssistant.avatar ? getStrapiImageUrl(leftAssistant.avatar) : leftAssistant.src}
              name={leftAssistant.name}
              // positionClass="left-[-111px]"
            />
          </motion.div>

          <motion.div
            className={`w-[40%] mx-auto   ${syne.className} font-semibold md:text-[80px] text-[28px] text-[#FFFFFF] text-center uppercase`}
            variants={headingVariants}
          >
            <motion.span variants={wordVariants}>{headingPre}</motion.span>{" "}
            <motion.span 
              className="text-[#BDFF00]"
              variants={wordVariants}
              whileHover={{ 
                scale: 1.2, 
                transition: { duration: 0.2 } 
              }}
            >
              {headingHighlight}
            </motion.span>{" "}
            <motion.span variants={wordVariants}>{headingPost}</motion.span>
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
              src={rightAssistant.avatar ? getStrapiImageUrl(rightAssistant.avatar) : rightAssistant.src}
              // style={{ right: `-50px` }}
              name={rightAssistant.name}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex gap-5  md:w-[1580px] w-[1000px] animate-scroll-right"
          variants={rowVariants}
        >
          {displayBottomAssistants.map((item, index) => (
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
                src={item.avatar ? getStrapiImageUrl(item.avatar) : item.src}
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
