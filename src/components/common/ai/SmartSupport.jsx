import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getStrapiImageUrl } from "@/utils/strapi";

function SmartSupport({ currentKey, assistantData, loading }) {
  // Get Strapi data for smart support section
  // const strapiSmartSupportSection =
  //   assistantData?.[currentKey]?.smartSupportSection;

  // Static content fallback data
  const content = {
    strategyAssistant: {
      heading: ["Strategy AI:", "Insight", "into Action"],
      description:
        "Big goals need clear plans. Mira helps you analyze data, map strategies, and align execution so you can focus on outcomes, not guesswork.",
    },
    brandDesigner: {
      heading: ["Brand Designer AI:", "Build Brands", "That Stand Out"],
      description:
        "From first sketches to final assets, your AI assistant helps you craft powerful, consistent brand visuals. Create everything from logos to full identity systems—faster, smarter, and beautifully on-brand.",
    },
    contentWriter: {
      heading: ["Smart Support for Every", "Creative Role"],
      description:
        "Our AI companions are designed to elevate how you work—no matter your craft. From branding and content creation to UX design and SEO, get tailored assistance that boosts productivity, enhances creativity, and simplifies your day-to-day tasks—all in one seamless experience.",
    },
    ui_ux: {
      heading: ["UI/UX Designer AI:", "Design", "Flows with Ease"],
      description:
        "From first sketch to final asset, Zara helps you design powerful, consistent visuals. Create logos, moodboards, and full brand kits faster and always on brand.",
    },
    seo: {
      heading: ["SEO Assistant AI: Rank", "Higher", " With Less Effort"],
      description:
        "Novi takes the guesswork out of SEO. From keyword research to metadata and audits, get smart tips that keep your fashion site discoverable and your rankings strong.",
    },
  };

  const features = {
    strategyAssistant: [
      {
        image: "/ai-assistants/smart-support/strategy-assistant/1.png",
        classname:
          "rounded-[9px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "Spot market trends",
      },
      {
        text: "Build roadmaps",
        image: "/ai-assistants/smart-support/strategy-assistant/2.png",
      },
      {
        text: " Track KPIs in real time",
        image: "/ai-assistants/smart-support/strategy-assistant/3.png",
      },
      {
        image: "/ai-assistants/smart-support/strategy-assistant/4.png",
        classname:
          "rounded-[999px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "Collaborate easily",
      },
      {
        image: "/ai-assistants/smart-support/strategy-assistant/5.svg",
        text: "Export and share",
      },
      {
        image: "/ai-assistants/smart-support/6.png",
        text: "Stay Future ready",
      },
    ],
    brandDesigner: [
      {
        image: "/ai-assistants/smart-support/brand-designer/1.png",
        classname:
          "rounded-[9px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "Generate moodboards, palettes, and style tiles.",
      },
      {
        text: "Create logos, social kits, and print-ready files.",
        image: "/ai-assistants/smart-support/2.png",
      },
      {
        text: " Apply brand rules automatically across visuals.",
        image: "/ai-assistants/smart-support/3.png",
      },
      {
        image: "/ai-assistants/smart-support/brand-designer/4.png",
        classname:
          "rounded-[999px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "Collaborate with teams or clients in real-time.",
      },
      {
        image: "/ai-assistants/smart-support/brand-designer/5.svg",
        text: "Export in all major formats, instantly.",
      },
      {
        image: "/ai-assistants/smart-support/6.png",
        text: "Stay inspired with design trend insights.",
      },
    ],

    contentWriter: [
      {
        image: "/ai-assistants/smart-support/content-writer/1.png",
        classname:
          "rounded-[9px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "	Generate on-brand visuals, wireframes, and layouts instantly.",
      },
      {
        text: "Optimize SEO content with smart keyword and meta tips.",
        image: "/ai-assistants/smart-support/content-writer/2.png",
      },
      {
        text: " Create logos, color palettes, and brand assets fast.",
        image: "/ai-assistants/smart-support/3.png",
      },
      {
        image: "/ai-assistants/smart-support/content-writer/4.png",
        classname: "rounded-[999px] h-[66px] w-[66px] bg-white ",
        text: "Connect and grow in a creative AI community.",
      },
      {
        image: "/ai-assistants/smart-support/content-writer/5.svg",
        text: "Get AI-powered strategy, targeting, and campaign ideas.",
      },
      {
        image: "/ai-assistants/smart-support/6.png",
        text: "Write content in your tone across all formats.",
      },
    ],
    ui_ux: [
      {
        image: "/ai-assistants/smart-support/ui-ux/1.png",
        classname:
          "rounded-[9px] h-[66px] w-[66px] bg-[#edd1e0] rotate-[-12deg]",
        text: "Generate moodboards, palettes, and style tiles",
      },
      {
        text: "Create logos, social kits, and print-ready files.",
        image: "/ai-assistants/smart-support/ui-ux/2.png",
      },
      {
        text: "Apply brand rules across every asset",
        image: "/ai-assistants/smart-support/ui-ux/3.svg",
      },
      {
        image: "/ai-assistants/smart-support/ui-ux/4.png",
        classname: "rounded-[999px] h-[66px] w-[66px] bg-white ",
        text: "Collaborate with teams or clients in real time.",
      },
      {
        image: "/ai-assistants/smart-support/ui-ux/5.svg",
        text: "Export in all major formats instantly",
      },
      {
        image: "/ai-assistants/smart-support/6.png",
        text: "Stay inspired with design trend insights",
      },
    ],
    seo: [
      {
        image: "/ai-assistants/smart-support/seo/1.png",
        classname: "rounded-[9px] h-[66px] w-[66px] rotate-[-12deg]",
        text: "Optimize content with keyword suggestions",
      },
      {
        text: "Track rankings and spot opportunities instantly.",
        image: "/ai-assistants/smart-support/seo/2.png",
      },
      {
        text: "Generate SEO-ready titles and descriptions",
        image: "/ai-assistants/smart-support/3.png",
      },
      {
        image: "/ai-assistants/smart-support/seo/4.png",
        classname: "rounded-[999px] h-[66px] w-[66px] bg-white ",
        text: "Audit your site and fix issues quickly",
      },
      {
        image: "/ai-assistants/smart-support/seo/5.svg",
        text: "Build structured data with ease.",
      },
      {
        image: "/ai-assistants/smart-support/6.png",
        text: "Stay ahead with algorithm updates.",
      },
    ],
  };

  const getHeadingData = () => {
    // if (
    //   strapiSmartSupportSection?.headingPre ||
    //   strapiSmartSupportSection?.headingHighlight ||
    //   strapiSmartSupportSection?.headingPost
    // ) {
    //   return [
    //     strapiSmartSupportSection.headingPre || "",
    //     strapiSmartSupportSection.headingHighlight || "",
    //     strapiSmartSupportSection.headingPost || "",
    //   ];
    // }
    return content[currentKey]?.heading || ["", "", ""];
  };

  // Prepare description from Strapi or fallback to static
  const getDescription = () => {
    return (
      // strapiSmartSupportSection?.description ||
      content[currentKey]?.description || ""
    );
  };

  const getFeaturesData = () => {
    // if (
    //   strapiSmartSupportSection?.features &&
    //   strapiSmartSupportSection.features.length > 0
    // ) {
    //   return strapiSmartSupportSection.features.map((feature) => ({
    //     image: getStrapiImageUrl(feature.icon),
    //     text: feature.text,
    //     classname: "", // You can add dynamic classname logic here if needed
    //   }));
    // }
    // Fallback to static features
    return features[currentKey] || [];
  };

  const headingData = getHeadingData();
  const description = getDescription();
  const featuresData = getFeaturesData();

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
        staggerChildren: 0.1,
      },
    },
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
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

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
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
        delay: 0.4,
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="xl:py-20 py-10"
    >
      <div className="max-w-[90%] mx-auto bg-[#1B1F3B] rounded-[39px] text-[#FFFFFF] px-10 py-10">
        <div className="flex md:gap-[67px] gap-[40px] xl:flex-row flex-col items-center">
          <motion.div
            variants={leftContentVariants}
            className="flex flex-col gap-[35px] xl:max-w-[40%]"
          >
            <motion.div
              variants={titleVariants}
              className="md:text-[48px] text-[24px] font-semibold"
            >
              <span>{headingData[0]}</span>{" "}
              <span className="text-[#C209C1]">{headingData[1]}</span>{" "}
              <span>{headingData[2] ?? ""}</span>
            </motion.div>
            <motion.p
              variants={descriptionVariants}
              className="md:text-[18px] text-[20px]"
            >
              {description}
            </motion.p>
            <motion.button
              variants={buttonVariants}
              className="w-[183px] h-[54px] rounded-[743px] bg-[#BDFF00] py-[13px] px-[23px] text-center text-black text-[18px] font-semibold"
            >
              Get started
            </motion.button>
          </motion.div>
          <motion.div
            variants={gridVariants}
            className="grid grid-cols-2 h-[450px] w-full  md:grid-cols-3 gap-x-4 gap-y-10 xl:gap-y-0 xl:pt-15 xl:w-[50%]"
          >
            {featuresData.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative"
              >
                <img
                  src={feature.image}
                  className={`absolute top-[-20%] object-contain left-1/2 -translate-x-1/2 ${
                    feature.classname || "h-[65px]"
                  }`}
                  alt={feature.text}
                />
                <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default SmartSupport;
