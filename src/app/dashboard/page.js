"use client";
import Navbar from "@/components/common/Navbar";
import CommunityFeed from "@/components/homepage/CommunityFeed";
import ToolCard from "@/components/homepage/ToolCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Chatbot from "@/components/ChatBot/ChatBot";
import { useEffect } from "react";
function Page() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const aiAssistants = [
    {
      image: "/homepage/ai-assistant-ui-ux.jpg",
      icon: "/homepage/ux-ui.png",
      title: "UX/UI",
      description: "Produce unique content with AI assistance",
      href: "/dashboard/Ai-Agent/kano",
    },
    {
      image: "/homepage/ai-assistant-seo.jpg",
      icon: "/homepage/seo.png",
      title: "SEO Optimizer",
      description: "Produce unique content with AI assistance",
      href: "/dashboard/Ai-Agent/novi",
    },
    {
      image: "/homepage/ai-assistant-marketing.jpg",
      icon: "/homepage/marketing.png",
      title: "Marketing Strategist",
      description: "Produce unique content with AI assistance",
      href: "/dashboard/Ai-Agent/mira",
    },
    {
      image: "/homepage/ai-assistant-marketing.jpg",
      icon: "/homepage/marketing.png",
      title: "Pitch Deck",
      href: "/dashboard/Ai-Agent/ellie",
      description: "Produce unique content with AI assistance",
    },
  ];
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxSlide = Math.max(0, aiAssistants.length - cardsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  return (
    <>
      <Navbar />

      <div className="px-8 mx-auto max-w-[1440px] py-6">
        <div
          id="mainContainer"
          className="flex flex-col xl:flex-row h-auto  xl:h-[400px]"
          style={{
            gap: "32px",
          }}
        >
          <div
            className="flex flex-col xl:w-[544px] xl:h-[401px]"
            style={{
              gap: "24px",
            }}
          >
            <h1 className="text-2xl font-semibold text-[#000000] ">
              Manual tools
            </h1>
            <div className="flex  gap-4">
              <ToolCard
                image={"/homepage/manual-tools-image-creation.png"}
                icon={"/homepage/image-generation.png"}
                title="Image creation"
                description="Create and refine visuals manually"
                className="flex-1"
                href="/dashboard/image-creation"
              />
              <ToolCard
                image={"/homepage/manual-tools-video-creation.png"}
                icon={"/homepage/video-creation.png"}
                title="Video creation"
                description="Edit and enhance videos with manual tools"
                className="flex-1"
                href="/dashboard/video-creation"
              />
            </div>
          </div>

          {/* AI Assistants section with carousel */}
          <div
            className="flex flex-col xl:w-[784px] xl:h-[401px]"
            style={{
              // width: "784px",
              // height: "401px",
              gap: "24px",
            }}
          >
            <h1 className="text-2xl font-semibold text-[#000000]">
              AI assistants
            </h1>

            {/* Carousel container with side controls */}
            <div className="relative flex-1  flex items-center">
              {/* Left arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-2xl hover:bg-gray-50 transition-colors border border-gray-200"
                style={{ transform: "translateX(-50%)" }}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Slider content */}
              <div className="overflow-hidden flex-1">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentSlide * (100 / cardsPerView)
                    }%)`,
                    gap: "8px",
                  }}
                >
                  {aiAssistants.map((assistant, index) => (
                    <div
                      key={index}
                      onClick={() => router.push(assistant.href)}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / cardsPerView}% - ${
                          (12 * (cardsPerView - 1)) / cardsPerView
                        }px)`,
                      }}
                    >
                      <ToolCard
                        image={assistant.image}
                        icon={assistant.icon}
                        title={assistant.title}
                        description={assistant.description}
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                style={{ transform: "translateX(50%)" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots indicator */}
            {/* {maxSlide > 0 && (
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )} */}
          </div>
        </div>

        <CommunityFeed className="mt-16" />

        {/* Chatbot */}
        <Chatbot />
      </div>
    </>
  );
}

export default Page;
