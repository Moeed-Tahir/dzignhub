import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AiResults() {
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

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className="mx-auto lg:py-20 max-w-[90%]"
    >
      <div className="flex lg:flex-row flex-col gap-[20px]">
        <motion.div
          variants={leftCardVariants}
          className="border-[2px] bg-[#edeffc] rounded-[20px] py-10 w-[65%] relative lg:flex hidden items-center justify-center"
          style={{
            borderColor: "#C009BF",
          }}
        >
          <img src="/ai-assistants/result.png" />
          <img src="/ai-assistants/arrow.svg" />
        </motion.div>
        <motion.div
          variants={leftCardVariants}
          className="border-[2px] bg-[#edeffc] rounded-[20px] py-10  relative lg:hidden flex items-center"
          style={{
            borderColor: "#C009BF",
          }}
        >
          <img src="/ai-assistants/result-mobile.svg" className="px-3" />
        </motion.div>
        <motion.div
          variants={rightCardVariants}
          className="border-[2px]  rounded-[20px] lg:w-[30%]"
          style={{
            background: "linear-gradient(180deg, #1B1F3B 35%, #C209C1 100%)",
            borderColor: "#C009BF",
          }}
        >
          <div className="flex flex-col gap-[40px] p-6 items-center">
            <div className="flex flex-col gap-[24px] text-center text-white">
              <motion.h2
                variants={textVariants}
                className="md:text-[30px] text-[24px] font-medium"
              >
                Enhance your results instantly with AI assistance
              </motion.h2>
              <motion.p variants={textVariants} className="text-[16px]">
                Unlock stunning visuals with AI — clearer, more vibrant, and
                full of detail. Sharper. Smarter. Better. See what AI can do for
                your images.
              </motion.p>
            </div>
            <motion.button
              variants={buttonVariants}
              className="bg-[#BDFF00] w-[161px] h-[54px] cursor-pointer rounded-[747px] py-[13px] px-[24px] text-black text-center font-semibold"
            >
              Give it a try
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AiResults;
