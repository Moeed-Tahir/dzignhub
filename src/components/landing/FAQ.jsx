import React, { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const faqData = [
  {
    question: "What types of images can I create?",
    answer:
      "You can create a wide range of images, including illustrations, landscapes, portraits, and even abstract art. The possibilities are endless!",
  },
  {
    question: "Is there a limit to how many images I can generate?",
    answer:
      "You can generate images freely, but excessive use may be rate-limited to ensure fair usage.",
  },
  {
    question: "Can I customize the style of generated images?",
    answer:
      "",
  },
  {
    question: "Are the images copyright-free?",
    answer:
      "",
  },
  {
    question: "Does the AI support multiple languages?",
    answer:
      "",
  },
  {
    question: "How accurate are the generated images?",
    answer:
      "",
  },
  {
    question: "How long does it take to generate images?",
    answer:
      "",
  },
  {
    question: "Can I download the images in different formats?",
    answer:
      "",
  },


];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1,
    once: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const faqListVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full overflow-hidden"
    >
      <div className="max-w-[1440px] h-auto flex mx-auto px-[20px] py-[40px] xl:p-[80px] gap-[56px] ">
        <div className="max-w-[1280px] rounded-[24px] gap-[56px] flex flex-col xl:flex-row">
          <motion.div 
            variants={leftContentVariants}
            className="gap-[40px] xl:w-[483px] flex flex-col"
          >
            <div className="flex flex-col gap-[24px]">
              <motion.div 
                variants={titleVariants}
                className="font-semibold text-[26px] xl:text-[48px] text-black leading-tight"
              >
                <span>Have </span>
                <span className="text-[#C209C1]">questions?</span>
              </motion.div>
              <motion.p 
                variants={titleVariants}
                className="text-[18px]"
              >
                Have questions about how our Text-to-Image AI works? Find the
                answers to the most common inquiries below. If you don't see
                your question, feel free to reach out!
              </motion.p>
            </div>
            {/* <motion.button 
              variants={buttonVariants}
              className="w-[194px] h-[56px] rounded-[999px] bg-[#BDFF00] font-medium text-[18px]"
            >
              View all questions
            </motion.button> */}
          </motion.div>

          <motion.div 
            variants={faqListVariants}
            className="max-w-[741px] flex flex-col gap-[16px]"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className="w-full rounded-[24px] bg-[#E4E7FA] p-[16px] xl:p-[24px] flex gap-[24px] items-start cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="xl:w-[629px] w-full flex flex-col gap-[16px]">
                  <h2 className="xl:text-[24px] text-[18px] text-[#000000] font-semibold">
                    {item.question}
                  </h2>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="text-[18px] text-[#3D4050]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <img
                  src={
                    openIndex === index
                      ? "/landing/faq/minus.svg"
                      : "/landing/faq/plus.svg"
                  }
                  alt="toggle icon"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default FAQ;
