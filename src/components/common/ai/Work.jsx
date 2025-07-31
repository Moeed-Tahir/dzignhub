"use client";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Work({ currentKey }) {
  const sectionData = {
    brandDesigner: {
      heading: ["How ", "Zara", " Empowers do Brand design"],
      description:
        "With Zara, you can unlock your brand design potential. Create distinctive visual identities with AI-powered support—whether you’re developing logos, brand guidelines, packaging, or digital assets. Streamline your design process and stay focused on crafting impactful, consistent brand experiences.",
      data: [
        {
          id: 1,
          logo: "/ai-assistants/brand-designer/1.svg",
          title: "Elevate Your Artistic Expression",
          content:
            "Create stunning digital designs, concept art, portraits, and illustrations tailored to your unique style. Enhance your artistic workflow, maximize your creative output, and reduce time spent on ideation.",
        },
        {
          id: 2,
          logo: "/ai-assistants/brand-designer/2.svg",
          title: "Experiment with Endless Styles",
          content:
            "Rapidly explore and iterate on artistic concepts, discovering the perfect blend of style and subject that resonates with your vision and captivates your audience.",
        },
        {
          id: 3,
          logo: "/ai-assistants/brand-designer/3.svg",
          title: "AI-First Tools, Designed For Artists",
          content:
            "Break free from conventional limitations and infuse your own artwork with unique personalized elements, ensuring your creations stand out in galleries, online platforms, and beyond.",
        },
        {
          id: 4,
          logo: "/ai-assistants/brand-designer/4.svg",
          title: "A New Way of Creating Digital Art",
          content:
            "Swiftly adjust visual concepts as you go, seamlessly integrating new ideas without breaking your creative momentum.",
        },
      ],
    },
    contentWriter: {
      heading: ["How ", "Sana", " Empowers do Content Creation"],
      description:
        "With Sana, you can unlock your storytelling potential. Create standout content with AI-powered support—whether you’re crafting social media posts, video scripts, blog articles, or branded campaigns. Streamline your workflow and stay in your creative zone with ease.",
      data: [
        {
          id: 1,
          logo: "/ai-assistants/content-writer/1.svg",
          title: "Amplify Your Voice",
          content:
            "Create stunning digital designs, concept art, portraits, and illustrations tailored to your unique style. Enhance your artistic workflow, maximize your creative output, and reduce time spent on ideation.",
        },
        {
          id: 2,
          logo: "/ai-assistants/content-writer/2.svg",
          title: "Customize Every Piece",
          content:
            "Rapidly explore and iterate on artistic concepts, discovering the perfect blend of style and subject that resonates with your vision and captivates your audience.",
        },
        {
          id: 3,
          logo: "/ai-assistants/content-writer/3.svg",
          title: "Work smarter, not harder",
          content:
            "Break free from conventional limitations and infuse your own artwork with unique personalized elements, ensuring your creations stand out in galleries, online platforms, and beyond.",
        },
        {
          id: 4,
          logo: "/ai-assistants/content-writer/4.svg",
          title: "Do more with less effort.",
          content:
            "Swiftly adjust visual concepts as you go, seamlessly integrating new ideas without breaking your creative momentum.",
        },
      ],
    },
    ui_ux: {
      heading: ["How ", "Kano", " Empowers UI/UX Designers"],
      description:
        "With Kano, you can elevate your product design process, creating seamless, intuitive user experiences powered by smart AI assistance. From wireframes and prototypes to final handoff, streamline your workflow, spark creativity, and bring user-centric ideas to life with confidence.",
      data: [
        {
          id: 1,
          logo: "/ai-assistants/ui-ux/1.svg",
          title: "Boost Your Design Thinking",
          content:
            "Generate user flows, journey maps, and layout ideas instantly. Zara helps you stay focused on solving real problems with meaningful design",
        },
        {
          id: 2,
          logo: "/ai-assistants/ui-ux/2.svg",
          title: "Create Intuitive Interfaces",
          content:
            "Craft pixel-perfect UI with component suggestions, accessibility tips, and consistency checks—while keeping your brand’s design system intact.",
        },
        {
          id: 3,
          logo: "/ai-assistants/ui-ux/3.svg",
          title: "Built for Modern Designers",
          content:
            "Automate tedious tasks like responsive resizing, style clean-up, and annotation generation so you can focus on crafting better experiences.",
        },
        {
          id: 4,
          logo: "/ai-assistants/ui-ux/4.svg",
          title: "Iterate & Deliver Efficiently",
          content:
            "Quickly turn wireframes into test-ready prototypes with interactive logic and user flow validation—getting you from concept to delivery in record time.",
        },
      ],
    },
    seo: {
      heading: ["How ", "Novi", " Empowers SEO Specialist"],
      description:
        "Novi enhances your SEO strategy with AI-driven tools that help you write, refine, and optimize web content efficiently. From keyword planning to metadata creation and performance insights, Novi supports your workflow—so you can achieve better search rankings faster and smarter.",
      data: [
        {
          id: 1,
          logo: "/ai-assistants/seo/1.svg",
          title: "Optimize Content with Confidence",
          content:
            "Generate user flows, journey maps, and layout ideas instantly. Zara helps you stay focused on solving real problems with meaningful design",
        },
        {
          id: 2,
          logo: "/ai-assistants/seo/2.svg",
          title: "Data-Backed Suggestions",
          content:
            "Craft pixel-perfect UI with component suggestions, accessibility tips, and consistency checks—while keeping your brand’s design system intact.",
        },
        {
          id: 3,
          logo: "/ai-assistants/seo/3.svg",
          title: "Built for Scalable SEO",
          content:
            "Automate tedious tasks like responsive resizing, style clean-up, and annotation generation so you can focus on crafting better experiences.",
        },
        {
          id: 4,
          logo: "/ai-assistants/seo/4.svg",
          title: "Track & Improve Performance",
          content:
            "Quickly turn wireframes into test-ready prototypes with interactive logic and user flow validation—getting you from concept to delivery in record time.",
        },
      ],
    },
  };

  const currentSection = sectionData[currentKey];

  // Create ref and inView hook for scroll trigger
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1, // Trigger when 10% visible
    once: true // Only trigger once
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
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
    hidden: {
      opacity: 0,
      y: 50,
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

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col md:max-w-[1140px] mx-auto gap-[32px] md:gap-[56px] py-10 items-center px-2"
    >
      <motion.div
        variants={headerVariants}
        className="flex flex-col max-w-[90%] text-[#FFFFFF] text-center mx-auto gap-[16px]"
      >
        <div className="font-semibold md:text-[34px] text-[24px]">
          <span>{currentSection.heading[0]}</span>
          <span className="text-[#C209C1] uppercase">
            {currentSection.heading[1]}
          </span>
          <span>{currentSection.heading[2]}</span>
        </div>
        <p className="text-[18px]">{currentSection.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-[#FFFFFF]">
        {currentSection.data.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            custom={index}
            className="bg-[#212e62] rounded-[20px] p-4"
          >
            <img src={item.logo} className="w-[38px] h-[38px]" />
            <h2 className="font-semibold text-[20px] py-3">{item.title}</h2>
            <p className="text-[16px]">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Work;
