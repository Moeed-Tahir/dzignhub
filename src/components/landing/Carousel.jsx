import React from "react";
import { motion } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";

function Carousel({ carouselImages = [] }) {
  // Fallback images if no Strapi data
  const defaultImages1 = [
    "/landing/carousel-1/1.webp",
    "/landing/carousel-1/2.webp",
    "/landing/carousel-1/3.jpg",
    "/landing/carousel-1/4.webp",
    "/landing/carousel-1/5.webp",
    "/landing/carousel-1/6.webp",
    "/landing/carousel-1/7.webp",
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

  // Process Strapi carousel data or use defaults
  let images1 = defaultImages1;
  let images2 = defaultImages2;

  if (carouselImages.length > 0) {
    // Get first carousel component for images1
    if (carouselImages[0]?.images1?.length > 0) {
      images1 = carouselImages[0].images1.map(img => getStrapiImageUrl(img)).filter(Boolean);
    }
    
    // Get images2 from first carousel component or second component
    if (carouselImages[0]?.images2?.length > 0) {
      images2 = carouselImages[0].images2.map(img => getStrapiImageUrl(img)).filter(Boolean);
    } else if (carouselImages[1]?.images1?.length > 0) {
      images2 = carouselImages[1].images1.map(img => getStrapiImageUrl(img)).filter(Boolean);
    }
  }


  const carouselContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.3,
        // delayChildren: 1.2 
      }
    }
  };

  const carouselRowVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="lg:h-[420px] h-[280px] flex flex-col gap-[20px] lg:mt-[40px]  absolute top-[867px] lg:top-[635px]  w-full overflow-hidden"
      variants={carouselContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="lg:h-[200px] h-[130px] relative overflow-hidden"
        variants={carouselRowVariants}
      >
        <div className="flex max-w-[3000px] animate-scroll-left gap-[20px]">
          {[...images1, ...images1].map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="lg:w-[200px] lg:h-[200px] h-[130px] w-[130px] object-cover rounded-[16px]  flex-shrink-0"
              variants={imageVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
          ))}
        </div>
      </motion.div>

      {/* <motion.div 
        className="lg:h-[200px] h-[130px]  relative overflow-hidden"
        variants={carouselRowVariants}
      >
        <div className="flex max-w-[3400px] animate-scroll-right gap-[20px]">
          {[...images2, ...images2].map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="lg:w-[200px] lg:h-[200px] h-[130px] w-[120px] rounded-[16px] object-cover rounded-box flex-shrink-0"
              variants={imageVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
          ))}
        </div>
      </motion.div> */}
    </motion.div>
  );
}

export default Carousel;
