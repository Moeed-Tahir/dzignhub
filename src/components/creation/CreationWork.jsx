import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const bottomSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const cardsData = [
  {
    id: 1,
    prompt: "Enter Your Prompt",
    text: "Describe your video idea in detail. The more specific your prompt, the better the results.",
  },
  {
    id: 2,
    prompt: "Let AI Generate Your Video",
    text: "Provide a clear text description of the image you want to generate. ",
  },
  {
    id: 3,
    prompt: "Download and Share",
    text: "Choose your format, download your video, and share it instantly with your audience or team.",
  },
];
const CreationWork = ({ isImage }) => {
  return (
    <>
      <motion.div 
        className="max-w-[1440px] md:px-10 px-5 xl:px-0 mx-auto w-[90%]  md:w-full  lg:px-[64px] lg:py-[80px] py-[40px] bg-[#1B1F3B] rounded-[40px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={headingVariants}>
          <p className="text-[30px] md:text-[48px] font-semibold text-center text-white">
            How{" "}
            <span className="text-[#C209C1] font-semibold">
              {isImage ? "Image" : "Video"}
            </span>{" "}
            Creation works
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]  md:gap-[24px] mt-5 md:mt-[40px]">
          {cardsData.map((card) => (
            <motion.div
              key={card.id}
              className="flex flex-col items-center justify-center mb-[40px]"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="  w-full max-w-[400px] text-center">
                <motion.div variants={imageVariants}>
                  <Image
                    src={`/video-creation/work${card.id}.png`}
                    alt={`Step ${card.id}`}
                    width={400}
                    height={300}
                    className=" mx-auto"
                  />
                </motion.div>
                <div className="flex justify-center items-center gap-2">
                  <motion.p 
                    className="text-[#BDFF00] text-[16px] rounded-full w-[24px] h-[24px] border-gray-700 flex items-center justify-center border bg-[#312e62]"
                    whileHover={{ 
                      scale: 1.2,
                      backgroundColor: "#BDFF00",
                      color: "#000",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {`${card.id}`}
                  </motion.p>
                  <h3 className="text-[20px] text-white font-semibold ">
                    {card.prompt}
                  </h3>
                </div>
                <p className="text-[16px]  text-gray-400">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full my-[55px] flex flex-col justify-center items-center"
        variants={bottomSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.button 
          className="w-[110px] h-[56px]  rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]"
          variants={buttonVariants}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#A6E600",
            boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Try Now
        </motion.button>

        <motion.div 
          className="flex flex-col w-[90%]  items-center"
          variants={statsVariants}
        >
          <motion.div
            variants={imageVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/video-creation/md.png"
              alt="Try Now"
              width={5000}
              height={3000}
              className="mx-auto mt-[85px] md:h-[90px] h-[76px] w-full   md:w-[470px] "
            />
          </motion.div>

          <motion.p 
            className="text-[30px] mt-4 text-center font-medium"
            variants={statsVariants}
          >
            <span className="text-[#C209C1] mr-2">+18 Million Creators</span>
            using AllmyAI
          </motion.p>
          <motion.p 
            className="text-[18px] font-normal text-center mt-3"
            variants={statsVariants}
          >
            Our users love using Allmyai to build their marketing assets. We
            empower them to <br />
            create assets at scale, faster than ever, with cutting-edge
            technology.
          </motion.p>
          <motion.button 
            className="md:w-[163px] w-full my-[40px] h-[56px] mx-auto rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]"
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#A6E600",
              boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Team
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CreationWork;
