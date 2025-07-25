import React from "react";
import { GoArrowUpRight } from "react-icons/go";
function FeatureSection() {
  const features = [
    {
      title: "Brand Design",
      description:
        "Easily generate and personalize unique logos using advanced AI algorithms. Perfect for startups, entrepreneurs, and creatives looking to build a brand identity in minutes — no design skills required.",
      image: "/landing/feature/1.png",
    },
    {
      title: "Content creation",
      description:
        "Create compelling and original written content with AI assistance. Whether you need social media posts, blog articles, or ad copy, our AI helps you brainstorm, write, and refine with speed and creativity.",
      image: "/landing/feature/2.png",
    },
    {
      title: "Image creation",
      description:
        "Design, customize, and polish visuals manually with full creative freedom. Ideal for designers who prefer hands-on control to fine-tune every detail and bring their vision to life.",
      image: "/landing/feature/3.png",
    },
    {
      title: "Video creation",
      description:
        " Edit and enhance videos frame by frame using intuitive manual tools. Add effects, transitions, audio, and more — perfect for storytellers, marketers, and content creators aiming for professional results.",
      image: "/landing/feature/4.png",
    },

    // You can add more feature objects here
  ];
  return (
    <div className="w-full bg-[#1B1F3B]">
      <div className="max-w-[1440px] mx-auto xl:h-[2656px] py-[88px] px-[20px]  xl:px-[80px] flex flex-col gap-[40px] xl:gap-[80px]">
        {features.map((item, index) => (
          <div
            key={index}
            className="max-w-[1308px] xl:h-[642.01px] flex flex-col xl:flex-row gap-[30px] xl:gap-[56px] items-center"
          >
            <div className="max-w-[612px] xl:h-[544px] rounded-[32px] border border-[#C209C1] xl:rotate-[-10deg] overflow-hidden">
              <img src={item.image} />
            </div>
            <div className="max-w-[555px] xl:h-[173px] flex flex-col gap-[24px] text-[#FFFFFF]">
              <h2 className="text-[28px] xl:text-[48px] font-semibold">
                {item.title}
              </h2>
              <p className="text-[18px] font-normal">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureSection;
