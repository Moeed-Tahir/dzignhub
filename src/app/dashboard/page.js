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

  const ai = [
    {
      name: "Image Creation",
      icon: "/aiAgent/gallery-edit.svg",
      bg: "#F7EEF3",
    },
    {
      name: "Video Creation",
      icon: "/aiAgent/video.svg",
      bg: "#F6F0F8",
    },
    {
      name: "Pitch Deck",
      icon: "/aiAgent/presention-chart.svg",
      bg: "#EBF3F8",
    },
    {
      name: "SEO Assistant",
      icon: "/aiAgent/search-status.svg",
      bg: "#EAF4EF",
    },
    {
      name: "UI/UX Design",
      icon: "/aiAgent/designtools.svg",
      bg: "#F7F0EB",
    },
    {
      name: "Software Developer",
      icon: "/aiAgent/code.svg",
      bg: "#EBF4F5",
    },
    {
      name: "Content Creation",
      icon: "/aiAgent/ruler&pen.svg",
      bg: "#F7EFEF",
    },
  ];

  const [cardsPerView, setCardsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setCardsPerView(2);
      } else {
        setCardsPerView(5);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const recet_project = [
    {
      name: "Company Logo",
      img: "/Ai/1.png",
      resolution: "1600 x 1200",
      icon: "/Ai/edit copy.svg",
      edited: "Yesterday",
    },
    {
      name: "Hero Section",
      img: "/Ai/2.png",
      resolution: "2400 x 1200",
      edited: "Edited a week ago",
      icon: "/Ai/path-square.svg",
    },
    {
      name: "Video in nature",
      img: "/Ai/3.png",
      resolution: "1600 x 1200",
      edited: "Today",
      icon: "/Ai/video-square.svg",
    },
    {
      name: "Company Logo",
      img: "/Ai/4.png",
      resolution: "1600 x 1200",
      edited: "Edited a week ago",
      icon: "/Ai/edit copy.svg",
    },
    {
      name: "Pitch Deck",
      img: "/Ai/5.png",
      icon: "/Ai/presention-chart.svg",

      resolution: "1920 x 1080",
      edited: "Edited 2 weeks ago",
    },
    {
      name: "Company Logo",
      img: "/Ai/1.png",
      resolution: "1600 x 1200",
      icon: "/Ai/edit copy.svg",
      edited: "Yesterday",
    },
  ];
  const maxSlide = Math.max(0, recet_project.length - cardsPerView);

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
        <div className="flex justify-between mb-5 items-center">
          {ai.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col  items-center hover:scale-110 ease-in-out duration-300 transition-all`}
            >
              <div
                className="rounded-full flex justify-center cursor-pointer  items-center w-12 h-12 "
                style={{
                  backgroundColor: item.bg,
                }}
              >
                <Image src={item.icon} alt={item.name} width={24} height={24} />
              </div>
              <span className="ml-2">{item.name}</span>
            </div>
          ))}
        </div>

        <div
          id="mainContainer"
          className="flex flex-col xl:flex-row h-auto  xl:h-[400px]"
          style={{
            gap: "32px",
          }}
        >
          {/* AI Assistants section with carousel */}
          <div
            className="flex flex-col xl:w-full xl:h-[401px]"
            style={{
              // width: "784px",
              // height: "401px",
              gap: "24px",
            }}
          >
            <h1 className="text-2xl font-semibold text-[#000000]">
              Recent Projects
            </h1>

            <div className="relative flex-1  flex items-center">
              <button
                onClick={prevSlide}
                className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-2xl hover:bg-gray-50 transition-colors border border-gray-200"
                style={{ transform: "translateX(-50%)" }}
              >
                <ChevronLeft size={20} />
              </button>

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
                  {recet_project.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => router.push(item.href)}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / cardsPerView}% - ${
                          (12 * (cardsPerView - 1)) / cardsPerView
                        }px)`,
                      }}
                    >
                      <ToolCard
                        image={item.img}
                        title={item.name}
                        resolution={item.resolution}
                        icon={item.icon}
                        edited={item.edited}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                style={{ transform: "translateX(50%)" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
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
