"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
function Hero({ isImage }) {
  const router = useRouter();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
        className="w-full lg:max-w-[821px]  max-w-[90%] z-1   lg:h-[386px] h-[238px] absolute left-1/2 transform -translate-x-1/2 -bottom-1  md:rounded-t-[32px] rounded-t-[40px] flex items-end"
      >
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          src={"/video-creation/main.jpg"}
          className="md:rounded-t-[24px] lg:max-w-[778px] w-[90%] rounded-t-[32px] h-[220px] lg:h-[365px] overflow-hidden lg:w-full mx-auto object-cover object-top"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -10 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 0,
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.6,
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
         style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
           className="absolute xl:h-[326px] xl:w-[355px] flex justify-end items-center rotate-[-15deg] h-[156px] p-5  left-[-60px] lg:left-[-90px] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]"
      >
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          src={"/video-creation/left1.jpg"}
          className="lg:w-[321px] lg:!h-[292px] h-[125px] w-[143px] object-cover rounded-[16px]  "
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 30 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 15,
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.7,
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
         style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
        className="absolute xl:h-[326px] xl:w-[355px] flex justify-end items-center rotate-[10deg] h-[156px] p-5  right-[-60px] lg:right-[-90px] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]"
      >
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          src={"/video-creation/right.jpg"}
          className="lg:w-[321px] lg:!h-[292px] h-[125px] w-[143px] object-cover rounded-[16px]  "
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className=" max-w-[1300px] w-full  gap-5 lg:gap-10 px-4 lg:px-0 flex flex-col items-center justify-center mx-auto pt-[200px] lg:pt-[50px]"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col gap-[19px] text-center text-[#FFFFFF]"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-bold lg:text-[40px] xl:text-[68px] mx-auto  md:text-[28px] text-[24px]"
          >
            {isImage ? "Image Creation" : "Video Creation"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="md:text-[20px] text-[18px] md:max-w-[70%] max-w-[90%] mx-auto"
          >
            Create stunning videos effortlessly using powerful manual tools or
            let our AI assistants help you craft content faster.{" "}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className=" hidden lg:flex lg:w-[740px] lg:h-[78px] rounded-[999px] mx-auto  items-center bg-[#4d2887] justify-center gap-[10px]"
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="text-[18px] text-white"
            >
              A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
            </motion.p>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              // onClick={()=>router.push}
              whileTap={{ scale: 0.95 }}
              className={`w-[179px] h-[54px] cursor-pointer bg-[#BDFF00] text-[18px]  rounded-full flex items-center justify-center gap-[8px]`}
            >
              <motion.img
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                src="/landing/starVector.svg"
                alt="star"
                className="w-[24px] h-[24px] object-contain"
              />
              <span className="text-[#1B1F3B]">Create {isImage ? "image" : "video"}</span>
            </motion.button>
          </motion.div>

          {/* CTA Section Mobile*/}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className=" max-w-[382px] mx-auto h-[144px] flex flex-col gap-[12px] lg:hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="bg-[#212e62] flex flex-col border-t-[0.49px] border-[#1B1F3B] py-[12px] px-[24px] rounded-[490.57px]"
            >
              <p className="lg:text-[18px] text-[16px] text-white">
                A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
              whileTap={{ scale: 0.95 }}
              className=" h-[60px] bg-[#BDFF00] py-[16px] px-[20px] xl:px-[12px] gap-[12px] rounded-[49.11px] flex justify-center"
            >
              <motion.button 
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.9 }}
                className={` text-[20px] `}
              >
                <img
                  src="/landing/starVector.svg"
                  alt="star"
                  className="lg:w-[24px] w-[20px] h-[20px] lg:h-[24px] object-contain"
                />
              </motion.button>
              <motion.p 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.9 }}
                className="text-[#1B1F3B]  lg:text-[18px] text-[16px]"
              >
                Create {isImage ? "image" : "video"}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Hero;
