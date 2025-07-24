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
      image: "/homepage/ai-assistant-marketing.jpg",
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
      image: "/homepage/ai-assistant-seo.jpg",
      title: "SEO Intelligence",
      description:
        "Boost your search rankings with intelligent SEO recommendations and real-time optimization strategies.",
      features: ["Keyword Research", "Content Optimization", "Rank Tracking"],
    },
    {
      id: 3,
      image: "/homepage/ai-assistant-ui-ux.jpg",
      title: "UI/UX Design Tool",
      description:
        "Create stunning user interfaces with AI-driven design suggestions and user experience optimization.",
      features: ["Design Systems", "User Testing", "Prototyping"],
    },
    {
      id: 4,
      image: "/homepage/ai-assistant-seo.jpg",
      title: "Image Generation",
      description:
        "Generate professional-quality images and graphics with advanced AI models tailored to your brand.",
      features: ["Custom Styles", "Brand Consistency", "High Resolution"],
    },
    {
      id: 5,
      image: "/homepage/ai-assistant-marketing.jpg",
      title: "Video Creation",
      description:
        "Produce engaging video content with AI-powered editing, effects, and automated storytelling.",
      features: ["Auto Editing", "Effects Library", "Voice Generation"],
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const images = imagesRef.current;
    const contents = contentRef.current;

    if (!container || images.length === 0 || contents.length === 0) return;

    gsap.set(images.slice(1), {
      opacity: 0,
      scale: 0.6,
      rotateX: 45,
      rotateY: -45,
      rotateZ: 15,
      y: "150%",
      x: "150%",
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    });
    gsap.set(contents.slice(1), { opacity: 0, y: 50 });

    gsap.set(images[0], {
      opacity: 0,
      scale: 0.6,
      rotateX: 45,
      rotateY: -45,
      rotateZ: 15,
      y: "150%",
      x: "150%",
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=6000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    cardsData.forEach((_, index) => {
      const progress = index / (cardsData.length - 1);

      tl.fromTo(
        images[index],
        {
          opacity: 0,
          rotateX: 45,
          rotateY: -45,
          rotateZ: 15,
          y: "150%",
          x: "150%",
          scale: 0.6,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        },
        {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          y: "0%",
          x: "0%",
          scale: 1,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          duration: 1,
          ease: "power2.out",
        },
        progress * 4
      )
        .to(
          images[index],
          {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            y: "0%",
            x: "0%",
            scale: 1,
            duration: 0.5,
          },
          progress * 4 + 1
        )
        .to(
          images[index],
          {
            opacity: 0,
            rotateX: -45,
            rotateY: 45,
            rotateZ: -15,
            y: "-150%",
            x: "150%",
            scale: 0.6,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            duration: 1,
            ease: "power2.in",
          },
          progress * 4 + 2
        )
        // Content animations
        .to(
          contents[index - 1],
          {
            opacity: 0,
            y: -50,
            duration: 0.8,
          },
          progress * 4
        )
        .to(
          contents[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          progress * 4 + 0.5
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="h-20"></div>

      <div
        ref={containerRef}
        className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      >
        <div className="container mx-auto px-6 py-20 h-full flex flex-col justify-center">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Powerful AI Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our suite of AI-powered tools designed to transform your
              creative workflow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            <div
              className="relative h-[500px] flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{ transform: "perspective(1200px)" }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-lg filter blur-sm opacity-50"
                        style={{ transform: "perspective(1200px)" }}
                      />
                    </div>

                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative w-[500px] h-[500px] object-cover rounded-lg shadow-2xl opacity-70"
                      style={{
                        transform: "perspective(1200px)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-[500px]">
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (contentRef.current[index] = el)}
                  className="absolute inset-0"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 h-full flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="text-purple-300 font-semibold text-lg">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {card.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-gray-300"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                      Learn More
                    </button>
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
