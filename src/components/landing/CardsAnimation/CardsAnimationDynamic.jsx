"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { getStrapiImageUrl } from "@/utils/strapi";

gsap.registerPlugin(ScrollTrigger);

const CardsAnimation = ({ cards = [] }) => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const contentRef = useRef([]);
  const backgroundRef = useRef(null);

  // Default fallback data
  const defaultCardsData = [
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
      borderImage: "/Border.svg"
    },
    {
      id: 2,
      image: "/landing/feature/2.png",
      title: "SEO Intelligence",
      description:
        "Boost your search rankings with intelligent SEO recommendations and real-time optimization strategies.",
      features: ["Keyword Research", "Content Optimization", "Rank Tracking"],
      borderImage: "/Border.svg"
    },
    {
      id: 3,
      image: "/landing/feature/3.png",
      title: "UI/UX Design Tool",
      description:
        "Create stunning user interfaces with AI-driven design suggestions and user experience optimization.",
      features: ["Design Systems", "User Testing", "Prototyping"],
      borderImage: "/Border.svg"
    },
    {
      id: 4,
      image: "/landing/feature/4.png",
      title: "Image Generation",
      description:
        "Generate professional-quality images and graphics with advanced AI models tailored to your brand.",
      features: ["Custom Styles", "Brand Consistency", "High Resolution"],
      borderImage: "/Border.svg"
    },
  ];

  // Process Strapi cards data or use defaults
  const cardsData = cards.length > 0 
    ? cards.map((card, index) => ({
        id: index + 1,
        image: getStrapiImageUrl(card.image) || defaultCardsData[index]?.image || "/landing/feature/1.png",
        title: card.title || defaultCardsData[index]?.title || `Card ${index + 1}`,
        description: card.description || defaultCardsData[index]?.description || "Default description",
        features: card.features?.map(feature => feature.text || feature) || defaultCardsData[index]?.features || [],
        borderImage: getStrapiImageUrl(card.borderImage) || defaultCardsData[index]?.borderImage || "/Border.svg"
      }))
    : defaultCardsData;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const images = imagesRef.current;
    const contents = contentRef.current;
    const background = backgroundRef.current;

    if (!container || images.length === 0 || contents.length === 0) return;

    let tl;

    const createAnimation = () => {
      // Kill existing animation
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Check if we're on mobile
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        // Mobile animations - show one card at a time
        gsap.set(images, {
          opacity: 0,
          rotate: 0,
          skewX: 0,
          y: 0,
          x: "100vw", // Start from right
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        });

        gsap.set(contents, {
          opacity: 0,
          y: 0,
          x: "-100vw", // Start from left
        });

        // Set border images to opacity 0 initially
        gsap.set(contents.map(content => content.querySelector(".border-image")), {
          opacity: 0,
        });

        // Set first card visible
        gsap.set(images[0], { opacity: 0, x: "100vw" });
        gsap.set(contents[0], { opacity: 0, x: "-100vw" });
      } else {
        // Desktop animations (original)
        gsap.set(images, {
          opacity: 0.2,
          rotate: -45,
          skewX: 10,
          y: "55vh",
          x: "30vw",
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        });

        gsap.set(contents, {
          opacity: 1,
          y: "50vh",
        });
      }

      // Set border images to opacity 0 initially for all cards
      gsap.set(contents.map(content => content?.querySelector(".border-image")).filter(Boolean), {
        opacity: 0,
      });

      gsap.set(images[0], { opacity: 1 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: isMobile ? "+=3000" : "+=4500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      
      cardsData.forEach((_, index) => {
        const progress = index / (cardsData.length - 1);

        if (isMobile) {
          // Mobile animation: show one card at a time

          // Image enters from right
          tl.to(
            images[index],
            {
              opacity: 1,
              x: "0%",
              duration: 1,
              ease: "power2.out",
            },
            index * 2
          );

          // Content enters from left simultaneously
          tl.to(
            contents[index],
            {
              opacity: 1,
              x: "0%",
              duration: 1,
              ease: "power2.out",
            },
            index * 2
          );

          // Title color change
          tl.to(
            contents[index].querySelector(".content-title"),
            {
              color: "#BDFF00",
              duration: 0.5,
              ease: "none",
            },
            index * 2 + 0.5
          );

          // Border image fade in when title turns green
          tl.to(
            contents[index].querySelector(".border-image"),
            {
              opacity: 1,
              duration: 0.5,
              ease: "none",
            },
            index * 2 + 0.5
          );

          // Only exit if not the last card
          if (index < cardsData.length - 1) {
            // Image exits to left
            tl.to(
              images[index],
              {
                opacity: 0,
                x: "-100vw",
                duration: 1,
                ease: "power2.in",
              },
              index * 2 + 1.5
            );

            // Content exits to right
            tl.to(
              contents[index],
              {
                opacity: 0,
                x: "100vw",
                duration: 1,
                ease: "power2.in",
              },
              index * 2 + 1.5
            );

            // Title color reset
            tl.to(
              contents[index].querySelector(".content-title"),
              {
                color: "#FFFFFF",
                duration: 0.2,
                ease: "none",
              },
              index * 2 + 1.3
            );

            // Border image fade out when title turns white
            tl.to(
              contents[index].querySelector(".border-image"),
              {
                opacity: 0,
                duration: 0.2,
                ease: "none",
              },
              index * 2 + 1.3
            );
          }
        } else {
          // Desktop animation (original)
          tl.to(
            images[index],
            {
              opacity: 1,
              skewX: 0,
              rotate: 0,
              x: "0%",
              y: "0%",
              scale: 1,
              duration: 1,
              ease: "none",
            },
            progress * 2
          );

          tl.to(
            contents[index].querySelector(".content-title"),
            {
              color: "#BDFF00",
              duration: 1,
              ease: "none",
            },
            progress * 2
          );

          // Border image fade in when title turns green (desktop)
          tl.to(
            contents[index].querySelector(".border-image"),
            {
              opacity: 1,
              duration: 1,
              ease: "none",
            },
            progress * 2
          );

          tl.to(
            contents[index],
            {
              opacity: 1,
              y: -20,
              duration: 1,
              ease: "none",
            },
            progress * 2
          );

          tl.to(
            images[index],
            {
              opacity: 0.2,
              skewX: 10,
              rotate: 90,
              y: "-55vh",
              scale: 1,
              duration: 1,
              ease: "none",
            },
            progress * 2 + 1
          );

          tl.to(
            contents[index].querySelector(".content-title"),
            {
              color: "#FFFFFF",
              duration: 0.2,
              ease: "none",
            },
            progress * 2 + 1
          );

          // Border image fade out when title turns white (desktop)
          tl.to(
            contents[index].querySelector(".border-image"),
            {
              opacity: 0,
              duration: 0.2,
              ease: "none",
            },
            progress * 2 + 1
          );

          tl.to(
            contents[index],
            {
              opacity: 1,
              y: "-70vh",
              duration: 1,
              ease: "none",
            },
            progress * 2 + 1
          );
        }
      });
      
      // Background color change
      tl.to(
        background,
        {
          backgroundColor: "#FAFAFA",
          duration: 0.5,
          ease: "power2.out",
        },
        3.3
      );
    };

    // Initial animation creation
    createAnimation();

    // Handle resize
    const handleResize = () => {
      createAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill(true);
      });
      gsap.globalTimeline.clear();
    };
  }, [cardsData]);

  return (
    <>
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-[#1B1F3B] transition-colors duration-300"
        />
        <div className="max-w-[1440px] w-full mx-auto px-6 py-20 h-full flex flex-col justify-center relative z-10">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 items-center min-h-[600px]">
            <div
              className="relative h-[300px] lg:h-[500px] flex items-center justify-center order-1 lg:order-none"
              style={{ perspective: "1000px" }}
            >
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="absolute inset-0 flex w-full lg:w-[100vw] items-center lg:items-start justify-center lg:justify-start"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative w-[280px] h-[250px] lg:w-[612px] lg:h-[544px] object-cover rounded-[16px] lg:rounded-[32px] border border-[#C209C1]"
                      style={{
                        transform: "perspective(1200px)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-[200px] lg:h-screen flex items-center order-2 lg:order-none">
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => (contentRef.current[index] = el)}
                  className={`content-${index} absolute inset-0 flex items-center justify-center lg:justify-end w-full`}
                >
                  <div className="p-4 lg:p-8 relative flex flex-col justify-center">
                    <h3
                      className={`text-xl lg:text-3xl title-${index} content-title sm:text-center lg:text-right font-bold text-white mb-2 lg:mb-4`}
                    >
                      {card.title}
                    </h3>
                    <div 
                      className="text-gray-300 w-full lg:w-[400px] text-sm lg:text-lg mb-4 lg:mb-6 sm:text-center lg:text-right leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                    {card.features && card.features.length > 0 && (
                      <ul className="text-gray-300 text-sm lg:text-base mb-4 lg:mb-6 sm:text-center lg:text-right">
                        {card.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="mb-1">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Image 
                      src={card.borderImage} 
                      alt="Border" 
                      className={`border-image image-${index} absolute right-0 -top-10`}  
                      width={56} 
                      height={56} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsAnimation;
