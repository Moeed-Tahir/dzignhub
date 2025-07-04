'use client';
import React from "react";
import { usePathname } from "next/navigation";

function Hero() {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  const slugToKeyMap = {
    "brand-designer": "brandDesigner",
    "content-writer": "contentWriter",
    "ui-ux":"ui_ux",
    "seo":"seo"
    // add more as needed
  };

  const heroContentData = {
    brandDesigner: {
      title: "Meet Zara - Brand designer",
      description:
        "Effortlessly craft logos, brand systems, and visual assets that align with your creative direction. Zara helps you maintain consistency and save time, so you can focus on building memorable brand identities.",
      mainImage: "/ai-assistants/brand-designer/zara.jpg",
      leftImage: "/ai-assistants/brand-designer/hero-1.png",
      rightImage: "/ai-assistants/brand-designer/hero-3.png",
    },
    contentWriter: {
      title: "Meet Sana – Content Writer",
      description:
        "Turn ideas into engaging content across platforms—faster and easier. From captions to full scripts, Sana supports your creative flow while keeping your voice authentic.",
      mainImage: "/ai-assistants/content-writer/sana.jpg",
      leftImage: "/ai-assistants/content-writer/hero-1.png",
      rightImage: "/ai-assistants/content-writer/hero-3.png",
    },
    ui_ux:{
      title:"Meet Kano – UI/UX Design Companion",
      description:"Streamline your workflow with smart layout suggestions, auto wireframes, and consistent UI support. Mano lets you spend less time on repetitive tasks and more time designing great user experiences.",
         mainImage: "/ai-assistants/ui-ux/kano.jpg",
      leftImage: "/ai-assistants/ui-ux/hero-1.png",
      rightImage: "/ai-assistants/ui-ux/hero-3.png",
    },
    seo:{
      title:"Meet Novi – SEO companion",
      description:"Optimize your website content with smart keyword suggestions, SEO-optimized structure, and real-time performance tips. Novi saves time on manual research, so you can focus on ranking higher and growing organic traffic.",
         mainImage: "/ai-assistants/seo/novi.jpg",
      leftImage: "/ai-assistants/seo/hero-1.png",
      rightImage: "/ai-assistants/seo/hero-3.png",
    }
  };

  const currentKey = slugToKeyMap[slug];
  const content = heroContentData[currentKey];

  if (!content) return null;

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 3.25%, rgba(255, 255, 255, 0.04) 96.75%)",
        }}
        className="w-full lg:max-w-[65%] max-w-[90%] z-1 lg:h-[400px] md:h-[350px]  xl:h-[521px] h-[242px] absolute left-1/2 transform -translate-x-1/2 bottom-0  md:rounded-[80px] rounded-[40px] flex items-center"
      >
        <img
          src={content.mainImage}
          className="md:rounded-[70px] rounded-[32px] xl:h-[471px] lg:h-[380px] md:h-[330px] h-[219px] w-[96%] mx-auto object-cover"
        />
      </div>

      <div className="absolute left-[-8%] md:left-[0%] xl:max-w-[306px] xl:max-h-[326px]  max-h-[170px] max-w-[170px] h-full w-full sm:top-[20%] top-[15%] z-0">
        <img
          src={content.leftImage}
          className="xl:w-[306px] xl:h-[326px] mx-auto object-cover"
        />
      </div>

      <div className="absolute xl:h-[326px] xl:w-[250px] h-[156px] right-[0%] md:rounded-[40px] rounded-[18.54px] sm:top-[20%] top-[15%]">
        <img
          src={content.rightImage}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute max-w-[1300px] w-full left-1/2 -translate-x-1/2 lg:top-[28%] xl:top-[15%] top-[40%]">
        <div className="flex flex-col gap-[19px] text-center text-[#FFFFFF]">
          <h2 className="font-bold lg:text-[40px] xl:text-[68px] mx-auto  md:text-[28px] text-[24px]">
            {content.title}
          </h2>
          <p className="md:text-[20px] text-[18px] md:max-w-[70%] max-w-[90%] mx-auto">
            {content.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
