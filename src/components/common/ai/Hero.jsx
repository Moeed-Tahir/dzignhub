'use client';
import React from "react";
import { motion } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";

function Hero({currentKey, assistantData, loading}) {

  // Get data from Strapi or fallback to static data
  const strapiContent = assistantData[currentKey]?.hero;
  
  const heroContentData = {
    brandDesigner: {
      title: "Meet Zara - Brand designer",
      description:
        "Effortlessly craft logos, brand systems, and visual assets that align with your creative direction. Zara helps you maintain consistency and save time, so you can focus on building memorable brand identities.",
      mainImage: "/ai-assistants/brand-designer/zara.jpg",
      leftImage: "/ai-assistants/brand-designer/hero-1.png",
      rightImage: "/ai-assistants/brand-designer/hero-3.png",
    },
     strategyAssistant: {
      title: "Meet Mira - Strategy assistant",
      description:
        "Streamline your workflow with smart layout suggestions, auto wireframes, and consistent UI support. Mano lets you spend less time on repetitive tasks and more time designing great user experiences.",
      mainImage: "/ai-assistants/strategy-assistant/mira.jpg",
      leftImage: "/ai-assistants/strategy-assistant/hero-1.png",
      rightImage: "/ai-assistants/strategy-assistant/hero-3.png",
    },
    contentWriter: {
      title: "Meet Sana – Content Writer",
      description:
        "Turn ideas into engaging content across platforms—faster and easier. From captions to full scripts, Sana supports your creative flow while keeping your voice authentic.",
      mainImage: "/ai-assistants/content-writer/sana.jpg",
      leftImage: "/ai-assistants/content-writer/hero-1.png",
      rightImage: "/ai-assistants/content-writer/hero-3.png",
    },
    ui_ux:{
      title:"Meet Kano – UI/UX Design Companion",
      description:"Streamline your workflow with smart layout suggestions, auto wireframes, and consistent UI support. Mano lets you spend less time on repetitive tasks and more time designing great user experiences.",
         mainImage: "/ai-assistants/ui-ux/kano.jpg",
      leftImage: "/ai-assistants/ui-ux/hero-1.png",
      rightImage: "/ai-assistants/ui-ux/hero-3.png",
    },
    seo:{
      title:"Meet Novi – SEO companion",
      description:"Optimize your website content with smart keyword suggestions, SEO-optimized structure, and real-time performance tips. Novi saves time on manual research, so you can focus on ranking higher and growing organic traffic.",
         mainImage: "/ai-assistants/seo/novi.jpg",
      leftImage: "/ai-assistants/seo/hero-1.png",
      rightImage: "/ai-assistants/seo/hero-3.png",
    }
  };

  // Use Strapi data if available, otherwise fallback to static data
  const fallbackContent = heroContentData[currentKey];
  
  const content = strapiContent ? {
    title: strapiContent.title || fallbackContent?.title,
    description: strapiContent.description || fallbackContent?.description,
    mainImage: getStrapiImageUrl(strapiContent.mainImage) || fallbackContent?.mainImage,
    leftImage: getStrapiImageUrl(strapiContent.leftImage) || fallbackContent?.leftImage,
    rightImage: getStrapiImageUrl(strapiContent.rightImage) || fallbackContent?.rightImage,
    mainImageAlt: strapiContent.mainImageAlt || "",
    leftImageAlt: strapiContent.leftImageAlt || "",
    rightImageAlt: strapiContent.rightImageAlt || ""
  } : fallbackContent;

  if (!content) return null;

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
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

  const sideImageVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      scale: 0.9
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

  const rightImageVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      scale: 0.9
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariantsReverse = {
    animate: {
      y: [10, -10, 10],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={imageVariants}
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
        className="w-full lg:max-w-[65%] max-w-[90%] z-1 lg:h-[400px] md:h-[350px]  xl:h-[521px] h-[242px] absolute left-1/2 transform -translate-x-1/2 bottom-0  md:rounded-[80px] rounded-[40px] flex items-center"
      >
        <img
          src={content.mainImage}
          alt={content.mainImageAlt || content.title}
          className="md:rounded-[70px] rounded-[32px] xl:h-[471px] lg:h-[380px] md:h-[330px] h-[219px] w-[96%] mx-auto object-cover"
        />
      </motion.div>

      <motion.div 
        variants={sideImageVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-[-8%] md:left-[0%] xl:max-w-[306px] xl:max-h-[326px]  max-h-[170px] max-w-[170px] h-full w-full sm:top-[20%] xl:top-[30%] top-[15%] z-0"
      >
        <motion.img
          variants={floatingVariants}
          animate="animate"
          src={content.leftImage}
          alt={content.leftImageAlt || "Left decoration image"}
          className="xl:w-[306px] xl:h-[326px] mx-auto object-cover"
        />
      </motion.div>

      <motion.div 
        variants={rightImageVariants}
        initial="hidden"
        animate="visible"
        className="absolute xl:h-[326px] xl:w-[260px] h-[156px] right-[0%] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]"
      >
        <motion.img
          variants={floatingVariantsReverse}
          animate="animate"
          src={content.rightImage}
          alt={content.rightImageAlt || "Right decoration image"}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div 
        variants={textVariants}
        className="absolute max-w-[1300px] w-full left-1/2 -translate-x-1/2 lg:top-[28%] xl:top-[15%] top-[35%]"
      >
        <div className="flex flex-col gap-[19px] text-center text-[#FFFFFF]">
          <motion.h2 
            variants={textVariants}
            className="font-bold lg:text-[40px] xl:text-[68px] mx-auto  text-[36px]  "
          >
            {content.title}
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="md:text-[20px] text-[18px] md:max-w-[70%] max-w-[90%] mx-auto"
          >
            {content.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
