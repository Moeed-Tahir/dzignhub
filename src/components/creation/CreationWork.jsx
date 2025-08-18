import Image from "next/image";
import React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const headingVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const bottomSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const statsVariants = {
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
const CreationWork = ({ isImage, mediaData, loading }) => {
  // Get the creation section data based on the current page type
  const currentKey = isImage ? 'imageCreation' : 'videoCreation';
  const strapiCreationSection = mediaData?.[currentKey]?.creation;

  // Static fallback data
  const staticCardsData = [
    {
      id: 1,
      id_number: "01",
      title: "Enter Your Prompt",
      text: "Describe your video idea in detail. The more specific your prompt, the better the results.",
      image: "/video-creation/work1.svg"
    },
    {
      id: 2,
      id_number: "02", 
      title: `Let AI Generate Your ${isImage ? "Image" : "Video"}`,
      text: `Provide a clear text description of the ${isImage ? "image" : "video"} you want to generate.`,
      image: "/video-creation/work2.svg"
    },
    {
      id: 3,
      id_number: "03",
      title: "Download and Share",
      text: `Choose your format, download your ${isImage ? "image" : "video"}, and share it instantly with your audience or team.`,
      image: "/video-creation/work3.svg"
    },
  ];

  // Use Strapi data if available, otherwise fallback to static data
  const getTitle = () => {
    if (strapiCreationSection?.titlePre || strapiCreationSection?.titleHighlight || strapiCreationSection?.titlePost) {
      return {
        pre: strapiCreationSection.titlePre || "",
        highlight: strapiCreationSection.titleHighlight || (isImage ? "Image" : "Video"),
        post: strapiCreationSection.titlePost || ""
      };
    }
    return {
      pre: "How",
      highlight: isImage ? "Image" : "Video", 
      post: "Creation works"
    };
  };

  const getCards = () => {
    if (strapiCreationSection?.cards && strapiCreationSection.cards.length > 0) {
      return strapiCreationSection.cards.map((card, index) => ({
        id: card.id || index + 1,
        id_number: card.id_number || `0${index + 1}`,
        title: card.title || staticCardsData[index]?.title || "",
        text: card.text || staticCardsData[index]?.text || "",
        image: getStrapiImageUrl(card.image) || staticCardsData[index]?.image || "/video-creation/work1.svg"
      }));
    }
    return staticCardsData;
  };

  const titleData = getTitle();
  const cardsData = getCards();
  const ctaLabel = strapiCreationSection?.ctaLabel || "Try Now";
  const ctaSecondaryLabel = strapiCreationSection?.ctaSecondaryLabel || "Join Our Team";
  const statsImage = getStrapiImageUrl(strapiCreationSection?.statsImage) || "/video-creation/md.png";
  const statsHeading = strapiCreationSection?.statsHeading || "+18 Million Creators using AllmyAI";
  const statsParagraph = strapiCreationSection?.statsParagraph || "Our users love using Allmyai to build their marketing assets. We empower them to create assets at scale, faster than ever, with cutting-edge technology.";
  return (
    <>
      <motion.div
        className="max-w-[1280px] md:px-10 px-5 xl:px-0 mx-auto w-[90%]  md:w-full  lg:px-[64px] lg:py-[80px] py-[40px] bg-[#1B1F3B] rounded-[40px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={headingVariants}>
          <p className="text-[30px] md:text-[48px] font-semibold text-center text-white">
            {titleData.pre}{" "}
            <span className="text-[#C209C1] font-semibold">
              {titleData.highlight}
            </span>{" "}
            {titleData.post}
          </p>
        </motion.div>

        <motion.div className="flex justify-center flex-col lg:flex-row  max-w-[1152px] mx-auto gap-6 lg:gap-8 mt-5 md:mt-[40px]">
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              className="flex flex-col z-[400] flex-1 w-[32%] items-center justify-center "
              variants={cardVariants}
              // whileHover={{
              //   scale: 1.05,
              //   transition: { duration: 0.3, ease: "easeOut" },
              // }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div variants={imageVariants}>
                <div className="w-auto h-[210px] flex-col flex justify-center items-center">
                  <Image
                    src={card.image}
                    alt={`Step ${card.id_number}`}
                    width={400}
                    height={300}
                    className={`${
                      index === 2
                        ? "mx-auto w-auto h-auto"
                        : "mx-auto w-auto h-auto"
                    }`}
                  />
                  {index === 2 && (
                    <div className="my-5  flex justify-center items-center gap-2">
                      <motion.button
                        className="w-[121px] h-[35px] flex justify-center items-center gap-3  rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[12px]"
                        variants={buttonVariants}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#A6E600",
                          boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={"/creation/blackimport.svg"}
                          alt=" "
                          width={14}
                          height={14}
                        />
                        Download
                      </motion.button>
                      <motion.button
                        className="w-[73px] h-[35px] flex justify-center items-center  rounded-[999px] cursor-pointer bg-[#ffffff] font-medium text-[12px]"
                        variants={buttonVariants}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#A6E600",
                          boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        PNG <ChevronDown className="w-[14px] h-[14px]" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
              <div className="flex justify-center items-center gap-2">
                <motion.p
                  className="text-[#BDFF00] text-[16px] rounded-full w-[24px] h-[24px] border-gray-700 flex items-center justify-center border bg-[#312e62]"
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: "#BDFF00",
                    color: "#000",
                    transition: { duration: 0.2 },
                  }}
                >
                  {`${card.id_number}`}
                </motion.p>
                <h3 className="text-[20px] text-center text-white font-semibold ">
                  {card.title}
                </h3>
              </div>
              <p className="text-[16px] text-center mt-2  text-gray-400">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full mt-[50px] mb-[55px] flex flex-col justify-center items-center"
        variants={bottomSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.button
          className="w-[110px] h-[56px] mb-[30px]  rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]"
          variants={buttonVariants}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#A6E600",
            boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {ctaLabel}
        </motion.button>

        <motion.div
          className="flex flex-col w-[90%]  items-center"
          variants={statsVariants}
        >
          <motion.div variants={imageVariants} whileHover={{ scale: 1.02 }}>
            <Image
              src={statsImage}
              alt="Stats"
              width={5000}
              height={3000}
              className="mx-auto mt-[85px] md:h-[90px] h-[76px] w-full   md:w-[470px] "
            />
          </motion.div>

          <motion.p
            className="text-[30px] mt-4 text-center font-medium"
            variants={statsVariants}
          >
            <span className="text-[#C209C1] mr-2">{statsHeading}</span>
          </motion.p>
          <motion.p
            className="text-[18px] font-normal text-center mt-3"
            variants={statsVariants}
          >
            {statsParagraph}
          </motion.p>
          <motion.button
            className="md:w-[163px] w-full my-[40px] h-[56px] mx-auto rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#A6E600",
              boxShadow: "0 10px 25px rgba(189, 255, 0, 0.3)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaSecondaryLabel}
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CreationWork;
