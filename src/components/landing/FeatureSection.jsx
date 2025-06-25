import React from "react";
import { GoArrowUpRight } from "react-icons/go";
function FeatureSection() {
  const features = [
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
      <div className="max-w-[1440px] mx-auto h-[2656px] py-[88px] px-[80px] flex flex-col gap-[80px]">
        <div className="max-w-[1280px] h-[544px] flex gap-[56px] mx-auto items-center">
          <div className="max-w-[612px] rounded-[32px] border border-[#C209C1] overflow-hidden">
            <img src="/landing/feature/1.png" />
          </div>
          <div className="flex flex-col h-[179px] max-w-[612px] gap-[40px] relative">
            <h2 className="text-[#BDFF00] font-semibold text-[48px]">
              Brand Design
            </h2>

            <p className="text-[18px] text-[#FFFFFF]">
              Easily generate and personalize unique logos using advanced AI
              algorithms. Perfect for startups, entrepreneurs, and creatives
              looking to build a brand identity in minutes — no design skills
              required.
            </p>
          </div>
        </div>
        {features.map((item, index) => (
          <div
            key={index}
            className="max-w-[1308px] h-[642.01px] flex gap-[56px] items-center"
          >
            <div className="max-w-[612px] h-[544px] rounded-[32px] border border-[#C209C1] rotate-[-10deg] overflow-hidden">
              <img src={item.image} />
            </div>
            <div className="max-w-[555px] h-[173px] flex flex-col gap-[24px] text-[#FFFFFF]">
              <h2 className="text-[48px] font-semibold">{item.title}</h2>
              <p className="text-[18px]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureSection;
