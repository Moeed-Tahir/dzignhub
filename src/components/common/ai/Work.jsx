"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Work() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const slugToKeyMap = {
    "brand-designer": "brandDesigner",
    "content-writer": "contentWriter",
    // Add more slugs as needed
  };
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
  };

  const currentSection = sectionData[slugToKeyMap[slug]];

  return (
    <div className="flex flex-col md:max-w-[1140px] mx-auto gap-[32px] md:gap-[56px] py-10 items-center px-2">
      <div className="flex flex-col max-w-[90%] text-[#FFFFFF] text-center mx-auto gap-[16px]">
        <div className="font-semibold md:text-[34px] text-[24px]">
          <span>{currentSection.heading[0]}</span>
          <span className="text-[#C209C1]">{currentSection.heading[1]}</span>
          <span>{currentSection.heading[2]}</span>
        </div>
        <p className="text-[18px]">{currentSection.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-[#FFFFFF]">
        {currentSection.data.map((item) => (
          <div key={item.id} className="bg-[#212e62] rounded-[20px] p-4">
            <img src={item.logo} className="w-[38px] h-[38px]" />
            <h2 className="font-semibold text-[20px] py-3">{item.title}</h2>
            <p className="text-[16px]">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
