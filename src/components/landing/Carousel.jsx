import React from "react";
import { motion } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Carousel({ carouselImages = [] }) {
  const defaultImages1 = [
    "/Latest/1.png",
    "/Latest/2.png",
    "/Latest/3.png",
    "/Latest/4.png",
    "/Latest/5.png",
    "/Latest/6.png",
    "/Latest/7.png",
    "/Latest/8.png",
  ];

  const defaultImages2 = [
    "/landing/carousel-2/1.webp",
    "/landing/carousel-2/2.webp",
    "/landing/carousel-2/3.webp",
    "/landing/carousel-2/4.jpg",
    "/landing/carousel-2/5.jpg",
    "/landing/carousel-2/6.webp",
    "/landing/carousel-2/7.webp",
    "/landing/carousel-2/8.webp",
  ];

  let images1 = defaultImages1;
  let images2 = defaultImages2;
  const router = useRouter();
  if (carouselImages.length > 0) {
    if (carouselImages[0]?.images1?.length > 0) {
      images1 = carouselImages[0].images1
        .map((img) => getStrapiImageUrl(img))
        .filter(Boolean);
    }

    if (carouselImages[0]?.images2?.length > 0) {
      images2 = carouselImages[0].images2
        .map((img) => getStrapiImageUrl(img))
        .filter(Boolean);
    } else if (carouselImages[1]?.images1?.length > 0) {
      images2 = carouselImages[1].images1
        .map((img) => getStrapiImageUrl(img))
        .filter(Boolean);
    }
  }

  // Animation variants for a great initial effect
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 60 },
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

  const ai = [
    {
      name: "Image Creation",
      icon: "/aiAgent/gallery-edit.svg",
      href: "/dashboard/image-creation",
      bg: "#FF339C0D",
    },
    {
      name: "Video Creation",
      icon: "/aiAgent/video.svg",
      href: "/dashboard/video-creation",

      bg: "#E950F70D",
    },
    {
      name: "Pitch Deck",
      icon: "/aiAgent/presention-chart.svg",
      href: "/dashboard/Ai-Agent/pitch-deck",
      bg: "#118EFF0D",
    },
    {
      name: "SEO Assistant",
      icon: "/aiAgent/search-status.svg",
      href: "/dashboard/Ai-Agent/novi",

      bg: "#0DA84A0D",
    },
    {
      name: "UI/UX Design",
      icon: "/aiAgent/code.svg",
      href: "/dashboard/Ai-Agent/kano",

      bg: "#12A3B50D",
    },
    // {
    //   name: "Software Developer",
    //   icon: "/aiAgent/code.svg",
    //   bg: "#FF3B4B0D",
    // },
    {
      name: "Content Creation",
      icon: "/aiAgent/ruler&pen.svg",
      bg: "#FF3B4B0D",
    },
    {
      name: "Brand Design",
      icon: "/aiAgent/color-swatch.svg",
      href: "/dashboard/Ai-Agent/zara",

      bg: "#FAD0390D",
    },
    {
      name: "Market Assistant",
      icon: "/aiAgent/market.svg",
      bg: "#7D84F90D",
    },
    {
      name: "Strategy Assistant",
      icon: "/aiAgent/status-up.svg",
      href: "/dashboard/Ai-Agent/mira",

      bg: "#F0925C0D",
    },
  ];

  const itemWidth = 120;
  const totalWidth = ai.length * itemWidth;
  const loopDuration = 12;

  return (
    <div className="overflow-hidden w-full sm:mb-[50px]">
      <motion.div
        className="sm:flex sm:max-w-[1140px] w-full mx-auto sm:flex-wrap grid  grid-cols-4 justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ai.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={` ${
              index === ai.length - 1 ? "hidden sm:flex" : ""
            } flex flex-col items-center h-[142px] w-[100px] duration-300 transition-all cursor-pointer`}
            onClick={() => item.href && router.push(item.href)}
          >
            <div
              style={{ backgroundColor: item.bg }}
              className={`   rounded-full  flex justify-center items-center w-[54px] h-[54px]`}
            >
              <Image src={item.icon} alt={item.name} width={27} height={27} />
            </div>
            <span className="text-center text-white w-[70%] mt-1">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Carousel;
