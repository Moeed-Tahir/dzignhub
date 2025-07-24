import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { GoDotFill, GoDot } from "react-icons/go";
function Templates() {
  const slides = [
    "/landing/templates/5/1.jpg",
    "/landing/templates/5/2.jpg",
    "/landing/templates/5/3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1280px] gap-[64px] p-[30px] flex flex-col mx-auto">
        <motion.div 
          className="max-w-[1280px] h-[218px] flex flex-col"
          variants={headerVariants}
        >
          <motion.div style={{
            fontFamily: 'General Sans',
            fontWeight: 600
          }} className=" font-semibold text-[25px] lg:text-[48px] lg:w-[80%] text-black">
            Over <motion.span 
              className="text-[#C209C1]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >150,000</motion.span> ready-made
            templates to choose from
          </motion.div>
          <motion.div 
            className="p-2"
            variants={headerVariants}
          >
            <p className="leading-[22px] font-[400] text-[20px] align-middle text-[#3D4050] font-[general-sans]">
              Discover our curated website design catalog featuring a range of
              categories <br /> to match your preferences and projects.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          id="templates" 
          className="max-w-[1280px] mx-auto w-full flex flex-col gap-[32px]"
          variants={containerVariants}
        >
         {/* Row 1 - Website Section */}
         <motion.div 
           className="max-w-[1280px] h-[366px] md:h-[362px] bg-[#E4E7FA] rounded-[20px] overflow-hidden relative"
           variants={sectionVariants}
           whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
         >
            <div className="absolute top-[20.04px] left-[20.5px] flex flex-col gap-[8.64px]">
              <p className="text-[30px] text-[#C209C1]  font-medium">Website</p>
              <p className="text-[18px] text-[#3D4050] break-words whitespace-normal ">
                Create gorgeous landing pages with a simple prompt.
              </p>
            </div>
            
                      {/* Mobile Layout - Show only first 3 images */}
                      <motion.div 
                        className="md:hidden w-full h-[309px] absolute top-[180px] left-[20px] right-[20px]"
                        variants={containerVariants}
                      >
              <motion.div 
                className="w-[100px] h-[140px] absolute left-[10px] top-[60px] z-2 overflow-hidden rounded-[10.64px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img
                  src="/landing/templates/1/1.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-[100px] h-[140px] absolute left-[90px] top-[40px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img
                  src="/landing/templates/1/2.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-[100px] h-[140px] absolute left-[170px] top-[20px] overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img
                  src="/landing/templates/1/3.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Desktop Layout - Show all 6 images */}
            <motion.div 
              className="hidden md:block w-[1258px] h-[309px] absolute top-[57px] left-[22px]"
              variants={containerVariants}
            >
              <motion.div 
                className="w-[255.38px] absolute left-[0.48px] top-[118.42px] z-2 overflow-hidden rounded-[10.64px] rotate-[-2deg] inline-block"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/1.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="w-[255.38px] absolute left-[183.12px] top-[92.75px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/2.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="w-[255.38px] absolute left-[365.76px] top-[67.08px] overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/3.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="w-[255.38px] absolute left-[548.76px] top-[118.58px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/4.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="w-[255.38px] absolute left-[730.64px] top-[92.91px] overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/5.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                className="w-[505.17px] absolute left-[964px] top-[149.63px] overflow-hidden rounded-[8.87px] rotate-[-2deg]"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              >
                <img src="/landing/templates/1/6.jpg" alt="Image" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Row 2 */}
          {/* Row 2 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[362px] gap-[32px] md:overflow-hidden"
            variants={containerVariants}
          >
            <motion.div 
              className="col-span-1 bg-[#E4E7FA] rounded-[20px] h-[362px] relative overflow-hidden"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-[20.04px] left-[20.5px] flex flex-col gap-[8.64px]">
                <p className="text-[30px] text-[#C209C1]  font-medium  ">
                  Lummi
                </p>
                <p className="text-[18px] text-[#3D4050]  ">
                  Unlock 20,000+ AI-generated images made by global creators.
                </p>
              </div>
              <div className="w-[219.36px] h-[250.7px]  absolute left-[-62.84px] top-[190.13px]  rounded-[3.92px] rotate-[-12deg] border-[6px] border-[#C209C1] ">
                <img
                  src="/landing/templates/2/1.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
              <div className="w-[250.7px] h-[250.7px]  absolute left-[34.59px] top-[197.96px]  rounded-[3.92px] rotate-[-6deg] border-[6px] border-[#C209C1]">
                <img
                  src="/landing/templates/2/2.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
              <div className="w-[250.7px] h-[219.36px]  absolute left-[98.33px] top-[214.76px]  rounded-[3.92px] rotate-[6deg] border-[6px] border-[#C209C1]">
                <img
                  src="/landing/templates/2/3.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
            </motion.div>
            <motion.div 
              className="col-span-1 md:col-span-2 bg-[#E4E7FA] rounded-[20px] h-auto md:h-[362px] relative"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="top-[20px] left-[20px] flex flex-col gap-[8px] absolute">
                <p className="text-[30px] text-[#C209C1]  font-medium ">
                  Brands
                </p>
                <p className="text-[18px] text-[#3D4050] ">
                  Get on-brand, consistent designs with every iteration.
                </p>
              </div>

              {/* Mobile Layout - Match desktop structure */}
              <div className="md:hidden mt-10 p-[20px] pt-[100px] flex gap-[16px]">
                <div className="flex-1 flex flex-col gap-[14px]">
                  <div className="w-full">
                    <img
                      src="/landing/templates/3/1.jpg"
                      alt="Image"
                      className="h-[120px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src="/landing/templates/3/2.jpg"
                      alt="Image"
                      className="h-[120px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src="/landing/templates/3/3.jpg"
                    alt="Image"
                    className="h-[254px] rounded-[10.88px] w-full object-cover"
                  />
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="h-[246px] top-[100px] left-[32.31px] flex flex-col gap-[14.5px] absolute overflow-hidden">
                  <div className="w-[379.59px]">
                    <img
                      src="/landing/templates/3/1.jpg"
                      alt="Image"
                      className="h-[130.5px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                  <div className="w-[379.59px]">
                    <img
                      src="/landing/templates/3/2.jpg"
                      alt="Image"
                      className="h-[130.5px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-[380.43px] h-[318.56px] top-[97.57px] left-[433.64px] rounded-[10.88px] absolute">
                  <img
                    src="/landing/templates/3/3.jpg"
                    alt="Image"
                    className="rounded-[10.88px] w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Row 3 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[362px] gap-[32px]"
            variants={containerVariants}
          >
            <motion.div 
              className="col-span-1 md:col-span-2 bg-[#E4E7FA] rounded-[20px] h-[362px] relative overflow-hidden"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="top-[20px] left-[20px] flex flex-col gap-[8px] absolute">
                <p className="text-[30px] text-[#C209C1] font-medium ">
                  Social
                </p>
                <p className="text-[18px] w-[285px] text-[#3D4050] ">
                  Streamline your content with our AI social media post
                  generator
                </p>
              </div>
              <div className="w-[508.42px] h-[381.93px] top-[196.22px] left-[39.92px] rounded-[9.71px] rotate-[6deg] overflow-hidden absolute">
                <img
                  src="/landing/templates/4/1.jpg"
                  alt="Image"
                  className=""
                />
              </div>
              <div className="w-[500.66px] h-[457.62px] top-[159px]  left-[337.05px] rounded-[9.32px] rotate-[6deg] overflow-hidden absolute">
                <img
                  src="/landing/templates/4/2.jpg"
                  alt="Image"
                  className=""
                />
              </div>
            </motion.div>
            <motion.div 
              className="col-span-1 relative bg-[#E4E7FA] rounded-[20px] h-[362px] overflow-hidden"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Text */}
              <div className="absolute top-[20px] left-[20px] flex flex-col gap-[8px]">
                <p className="text-[30px] text-[#C209C1]  font-medium">
                  Slides
                </p>
                <p className="text-[18px] w-[322px] text-[#3D4050] ">
                  Make convincing presentations and pitches in seconds.
                </p>
              </div>

              {/* Image */}
              <div className="w-[270px] h-[151.88px] top-[153.34px] left-[66.08px] rounded-[10.13px] overflow-hidden absolute">
                <motion.img
                  src={slides[currentIndex]}
                  alt="Slide"
                  className="w-full h-full object-cover"
                  key={currentIndex}
                  variants={slideImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Arrows */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosArrowDropleftCircle
                  onClick={prevSlide}
                  className="w-[32px] h-[32px] top-[215px] left-[22px] text-[#C209C1] rounded-full absolute cursor-pointer hover:opacity-75"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosArrowDroprightCircle
                  onClick={nextSlide}
                  className="w-[32px] h-[32px] top-[215px] left-[352px] text-[#C209C1] rounded-full absolute cursor-pointer hover:opacity-75"
                />
              </motion.div>

              {/* Dots */}
              <div className="absolute top-[333.5px] left-[135px] flex gap-[8px]">
                {slides.map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <GoDot
                      onClick={() => setCurrentIndex(index)}
                      className={`w-[7.25px] h-[7.25px] rounded-full cursor-pointer ${currentIndex === index
                          ? "bg-black "
                          : "bg-[#c2c4d5] text-[#c2c4d5]"
                        }`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Templates;
