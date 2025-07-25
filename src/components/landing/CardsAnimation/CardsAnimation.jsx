"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CardsAnimation = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const contentRef = useRef([]);

  // Sample data for 5 cards
  const cardsData = [
    {
      id: 1,
      image: "/landing/feature/1.png",
      title: "AI Marketing Assistant",
      description:
        "Transform your marketing strategy with AI-powered insights and automated content creation that drives engagement and conversions.",
      features: [
        "Campaign Optimization",
        "Content Generation",
        "Audience Analysis",
      ],
    },
    {
      id: 2,
      image: "/landing/feature/2.png",
      title: "SEO Intelligence",
      description:
        "Boost your search rankings with intelligent SEO recommendations and real-time optimization strategies.",
      features: ["Keyword Research", "Content Optimization", "Rank Tracking"],
    },
    {
      id: 3,
      image: "/landing/feature/3.png",
      title: "UI/UX Design Tool",
      description:
        "Create stunning user interfaces with AI-driven design suggestions and user experience optimization.",
      features: ["Design Systems", "User Testing", "Prototyping"],
    },
    {
      id: 4,
      image: "/landing/feature/4.png",
      title: "Image Generation",
      description:
        "Generate professional-quality images and graphics with advanced AI models tailored to your brand.",
      features: ["Custom Styles", "Brand Consistency", "High Resolution"],
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const images = imagesRef.current;
    const contents = contentRef.current;

    if (!container || images.length === 0 || contents.length === 0) return;

    gsap.set(images, {
      opacity: 1,
      rotate: -45,
      skewX: 10,
      y: "35vh",
      x: "30vw",
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    });


    gsap.set(images[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=4500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    cardsData.forEach((_, index) => {
      const progress = index / (cardsData.length - 1);

      tl.to(
        images[index],
        {
          opacity: 1,
          skewX: 0,
          rotate: 0,
          x: "0%",
          y: "0%",
          scale: 1,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          duration: 1,
          ease: "none",
        },
        progress * 2
      ).to(
        images[index],
        {
          opacity: 1,
          skewX: 10,
          rotate: 90,
          y: "-35vh",
          scale: 1,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          duration: 1,
          ease: "none",
        },
        progress * 2 + 1
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="h-20"></div>

      <div ref={containerRef} className="h-screen bg-[#1B1F3B] overflow-hidden">
        <div className="max-w-[1440px] w-full mx-auto px-6 py-20 h-full flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            <div
              className="relative h-[500px] flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="absolute inset-0 flex w-[100vw] items-start justify-start"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative w-[612px] h-[50vh] object-cover rounded-[32px] border border-[#C209C1]"
                      style={{
                        transform: "perspective(1200px)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-screen">
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (contentRef.current[index] = el)}
                  className="absolute top-1/2 translate-y-1/2 w-full"
                >
                  <div className="p-8 flex flex-col justify-start">
                    <h3 className="text-3xl content-title font-bold text-white mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen"></div>
    </>
  );
};

export default CardsAnimation;
