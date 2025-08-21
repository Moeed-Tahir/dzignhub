import React from "react";
import { motion } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";

function Download({ downloadSection }) {
  // Default fallback data
  const defaultData = {
    preTitle: "Download the app",
    title: "and start creating with AI — anytime, anywhere.",
    description:
      "Your complete AI team in your pocket.      8 specialists ready to launch your brand  — wherever you are.",
    appStoreImage: "/landing/download/app-store.svg",
    appStoreUrl: "#",
    googlePlayImage: "/landing/download/google-play.svg",
    googlePlayUrl: "#",
    phoneImage: "/landing/download/iphone.svg",
  };

  // Process Strapi data or use defaults
  const data = downloadSection
    ? {
        preTitle: downloadSection.preTitle || defaultData.preTitle,
        title: downloadSection.title || defaultData.title,
        description: downloadSection.description || defaultData.description,
        appStoreImage:
          getStrapiImageUrl(downloadSection.appStoreImage) ||
          defaultData.appStoreImage,
        appStoreUrl: downloadSection.appStoreUrl || defaultData.appStoreUrl,
        googlePlayImage:
          getStrapiImageUrl(downloadSection.googlePlayImage) ||
          defaultData.googlePlayImage,
        googlePlayUrl:
          downloadSection.googlePlayUrl || defaultData.googlePlayUrl,
        phoneImage:
          getStrapiImageUrl(downloadSection.phoneImage) ||
          defaultData.phoneImage,
      }
    : defaultData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const phoneVariants = {
    hidden: {
      opacity: 0,
      x: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const hoverButtonVariants = {
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

  return (
    <motion.div
      className="w-full h-auto overflow-hidden"
      style={{
        background: "#1B1F3B",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1440px] z-[1000] mx-auto xl:h-[867px]  py-[64px] px-[20px] xl:px-[80px]">
        <div className="max-w-[1280px] xl:h-[739px] flex-col xl:flex-row flex items-center justify-between">
          <motion.div
            className="max-w-[688px] w-full xl:h-[690px] flex flex-col gap-10 xl:gap-[78px] text-[26px] xl:text-[48px] font-semibold text-[#FFFFFF]"
            variants={textVariants}
          >
            <motion.div
              className="  gap-10 xl:gap-[119px] flex flex-col xl:h-[552px] w-auto max-w-[668px]"
              variants={containerVariants}
            >
              <motion.div variants={headingVariants}>
                <motion.span
                  className="text-[#C209C1]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {data.preTitle}{" "}
                </motion.span>
                <span className="">{data.title}</span>
              </motion.div>
              <motion.div
                className="max-w-[450px] text-[20px]  xl:text-[24px] font-semibold"
                variants={textVariants}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </motion.div>
            <motion.div
              className="flex mb-[40px] xl:mb-0 gap-[11.13px]"
              variants={buttonVariants}
            >
              <motion.a
                href={data.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[200px] h-[60px] block"
                variants={hoverButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <img
                  src={data.appStoreImage}
                  alt="App Store"
                  className="w-full h-full object-contain"
                />
              </motion.a>
              <motion.a
                href={data.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[200px] h-[60px] block"
                variants={hoverButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <img
                  src={data.googlePlayImage}
                  alt="Google Play"
                  className="w-full h-full object-contain"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-[355px] h-[739px] flex items-center justify-center"
            variants={phoneVariants}
          >
            <motion.div
              className="absolute w-[520px] h-[300px] right-[10px] rounded-full blur-[120px] opacity-70"
              style={{
                background: "#C209C1",
                zIndex: 0,
              }}
              variants={glowVariants}
            ></motion.div>
            <motion.img
              src={data.phoneImage}
              className="relative z-10 w-[355px] h-[739px]"
              alt="Phone preview"
              variants={phoneVariants}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Download;
