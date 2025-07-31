import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Users() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.1,
    once: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="max-w-[1440px] h-[434px] justify-center flex items-center mx-auto"
    >
      <div className="flex flex-col gap-[33px] justify-center items-center ">
        <motion.img
          variants={imageVariants}
          src="/landing/image-creation/avatars.svg"
          className="max-w-[90%] max-h-[90px] mx-auto"
        />
        <motion.div
          variants={textVariants}
          className="flex flex-col gap-[9px] max-w-[715px]  text-center"
        >
          <div className="text-[30px] font-medium">
            <span className="text-[#C209C1]">+18 Million Creators </span>
            <span>using AllmyAI</span>
          </div>
          <p className="text-[18px]">
            Our users love using AllMyAI to build their marketing assets. We
            empower them to create assets at scale, faster than ever, with
            cutting-edge technology.
          </p>
        </motion.div>
        <motion.button
          variants={buttonVariants}
          className="xl:w-[163px] w-[90%] h-[56px] font-medium text-[18px] bg-[#BDFF00] rounded-full px-3 py-3 flex items-center justify-center gap-0"
        >
          Join Our team
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Users;
