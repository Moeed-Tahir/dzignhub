"use client";

import { useState } from "react";
import Image from "next/image";

const tabData = {
  "Image Creation": {
    title: "Envision The Extraordinary",
    content: [
      "Take creativity a step further with the transformative power of our Image Generation tool. It's not just about bringing your concepts to life — redefine the impossible. From beginners to professionals, we offer a spectrum of settings that can be intuitively tailored to your needs.",
      "Discover an unprecedented fusion of simplicity and power, designed to cater to creative minds at all levels.",
    ],
    image: "/video-creation/toolkit.png",
  },
  "Brand Design": {
    title: "Build Your Brand Identity",
    content: [
      "Create stunning brand identities with our comprehensive design toolkit. From logos to complete brand guidelines, our AI-powered tools help you establish a cohesive visual presence that resonates with your audience.",
      "Transform your vision into a professional brand that stands out in today's competitive marketplace.",
    ],
    image: "/video-creation/toolkit.png",
  },
  "Content Creation": {
    title: "Craft Compelling Content",
    content: [
      "Generate engaging content that captivates your audience across all platforms. Our advanced content creation tools help you produce high-quality copy, social media posts, and marketing materials effortlessly.",
      "Streamline your content workflow and maintain consistent messaging across all your communications.",
    ],
    image: "/video-creation/toolkit.png",
  },
};

export default function DzignhubToolkit() {
  const [activeTab, setActiveTab] = useState("Image Creation");

  return (
    <section className="bg-[#1B1F3B] md:py-16 px-[15px]  py-[24px] md:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[30px] md:text-[48px] font-medium md:font-semibold mb-8">
            <span className="text-[#C209C1]">Dzignhub</span>
            <span className="text-white"> Toolkit</span>
          </h1>

          <div className="flex justify-center w-full md:justify-start">
            <div className="flex border-b border-gray-600">
              {Object.keys(tabData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 md:px-6 py-3 text-[16px] font-medium transition-colors duration-200 border-b-3 cursor-pointer ${
                    activeTab === tab
                      ? "text-[#BDFF00] border-[#BDFF00]"
                      : "text-gray-300 border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 w-full max-w-xl">
            <p className="text-[#BDFF00] text-[16px] inline-block rounded-full border-gray-700 border bg-[#312e62] px-4 py-1">
              {activeTab}
            </p>

            <h2 className="text-[20px] md:text-[24px] font-medium md:font-semibold text-white leading-tight">
              {tabData[activeTab].title}
            </h2>

            <div className="space-y-4">
              {tabData[activeTab].content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 font-normal text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden ">
              <div className=" rounded-xl overflow-hidden">
                <Image
                  src={tabData[activeTab].image || "/placeholder.svg"}
                  alt={`${activeTab} interface`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
