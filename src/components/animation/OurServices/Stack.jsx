"use client";
import { useEffect } from "react";
import "./Stack.css";
import gsap from "gsap";
import { motion } from "framer-motion";
import StackCard from "./StackCard";
import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getStrapiImageUrl } from "@/utils/strapi";
gsap.registerPlugin(ScrollTrigger);

const StackingImages = ({ stackSections = [] }) => {


  const [isLowHeight, setIsLowHeight] = useState();

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  // Process Strapi stack data or use defaults
  const defaultStackData = {
    titleline1: "Endless",
    titleline2: "possibilites",
    subtitle: "with AI art",
    cards: [
      {
        heading: "Novi",
        para: "Digital transformation and automation improve efficiency, cut costs, and enable innovation through real-time insights for smarter decision-making.",
        type: "Content Creation",
        num: "01",
        image: "/ai-assistants/brand-designer/zara.jpg"
      },
      {
        heading: "Kano",
        para: "Developing software that optimizes business and ensures a smooth user experience.",
        type: "Video Creation",
        num: "02",
        image: "/ai-assistants/brand-designer/zara.jpg"
      },
      {
        heading: "Sana",
        para: "Dynamic, Responsive web applications that captivate your audience and serves business needs.",
        type: "Image Creation",
        num: "03",
        image: "/ai-assistants/brand-designer/zara.jpg"
      },
      {
        heading: "Zara",
        para: "Zara helps you bring your brand to life with powerful visual identity tools. She specializes in. Logo Creation: Generates unique, on-brand logos tailored to your business vibe.",
        type: "Brand Designer",
        num: "04",
        image: "/ai-assistants/brand-designer/zara.jpg"
      }
    ]
  };

  // Use Strapi data if available, otherwise use defaults
  const stackData = stackSections.length > 0 ? {
    titleline1: stackSections[0]?.titleline1 || defaultStackData.titleline1,
    titleline2: stackSections[0]?.titleline2 || defaultStackData.titleline2,
    subtitle: stackSections[0]?.subtitle || defaultStackData.subtitle,
    cards: stackSections[0]?.card?.map((card, index) => ({
      heading: card.heading || defaultStackData.cards[index]?.heading || `Card ${index + 1}`,
      para: card.para || defaultStackData.cards[index]?.para || "Default description",
      type: card.type || defaultStackData.cards[index]?.type || "Default Type",
      num: card.num || defaultStackData.cards[index]?.num || `0${index + 1}`,
      image: getStrapiImageUrl(card.image) || defaultStackData.cards[index]?.image || "/ai-assistants/brand-designer/zara.jpg"
    })) || defaultStackData.cards
  } : defaultStackData;
   const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

   const headingVariants = {
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

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  // const isVeryLow = typeof window !== "undefined" && window.innerHeight <= 700;

  useEffect(() => {
    setIsLowHeight(typeof window !== "undefined" && window.innerHeight <= 900);
    const cardCount = stackData.cards.length;
    const cards = Array.from(
      { length: cardCount },
      (_, index) => `.animation_card-${index + 1}`
    );

    gsap.set(cards, {
      yPercent: isMobile ? 100 : 50,
      opacity: 0,
      scale: 1,
      zIndex: (i) => i + 1,
    });

    const scrollTriggerConfig = {
      trigger: ".animation_cards",
      pin: true,
      start: isMobile ? "top 20%" : "top top",
      end: "+=4500",
      scrub: 1,
      // markers: true,
    };

    const timeline = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    cards.forEach((card, index) => {
      timeline.to(
        card,
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        index * 2
      );

      if (index < cards.length - 1) {
        for (let i = 0; i < index; i++) {
          timeline.to(
            cards[i],
            {
              scale: 1 - (index - i) * 0.05,
              opacity: 1 - (index - i) * 0.1,
              duration: 0.5,
              yPercent: -(index - i) * 6,
            },
            index * 2
          );
        }
      }
    });
  }, [stackData.cards.length, isMobile]);

  return (
    <>
    <motion.div
            className="   max-w-[1440px]  mx-auto flex flex-col p-[24px]   lg:pt-[80px] lg:px-[80px] "
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="" variants={headingVariants}>
              <motion.div
                className="flex gap-[8px] font-semibold  lg:text-[48px] text-[28px]  text-black "
                variants={headingVariants}
              >
                <motion.span className="text-[#C209C1]" variants={wordVariants}>
                  {stackData.titleline1}
                </motion.span>
                <motion.span className="" variants={wordVariants}>
                  {stackData.titleline2}
                </motion.span>
              </motion.div>
              <motion.h1
                className="font-semibold  lg:text-[48px] text-[28px]  text-black"
                variants={headingVariants}
              >
                {stackData.subtitle}
              </motion.h1>
            </motion.div>
          </motion.div>
    
    <div
      className={`container  ${
        isLowHeight ? "mb-[4600px]" : "mb-[4300px]"
      } mx-auto mt-[-400px] flex flex-col gap-10`}
    >
      <div className="animation_cards h-[100vh] sm:min-h-[400px] container mx-auto">
        {stackData.cards.map((card, index) => (
          <div key={index} className={`animation_card animation_card-${stackData.cards.length - index}`}>
            <StackCard
              imgLink={card.image}
              heading={card.heading}
              para={card.para}
              type={card.type}
              num={card.num}
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default StackingImages;
