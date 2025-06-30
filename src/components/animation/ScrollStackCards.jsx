"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "ZARA",
    role: "Brand Designer",
    description:
      "Zara helps you bring your brand to life with powerful visual identity tools. She specializes in Logo Creation.",
    image: "/images/zara.jpg", // use your own images
  },
  {
    title: "LIAM",
    role: "UI Engineer",
    description:
      "Liam crafts elegant UI systems. Expert in responsive design and web animation.",
    image: "/images/liam.jpg",
  },
  {
    title: "EMMA",
    role: "Marketing Strategist",
    description:
      "Emma creates data-driven marketing funnels. Helps your business grow smarter.",
    image: "/images/emma.jpg",
  },
];

const ScrollCardStack = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000",
        scrub: 1,
        markers: true,
        pin: true,
      },
    });

    cardsRef.current.forEach((card, i) => {
      timeline.fromTo(
        card,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          // ease: "power1.inOut",
          y: -300,
          // duration: 1,
        },
        
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#eef0ff] overflow-hidden"
    >
      {cardsData.map((card, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="absolute w-[80%] max-w-4xl h-[350px] bg-white rounded-3xl p-8 flex justify-between items-center gap-6 shadow-2xl transition-all duration-500"
          style={{ zIndex: cardsData.length - i }}
        >
          {/* Left Content */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{`0${i + 1}`}</p>
            <h2 className="text-3xl font-bold text-purple-600">{card.title}</h2>
            <h3 className="text-xl font-semibold text-black mb-3">
              {card.role}
            </h3>
            <p className="text-gray-700">{card.description}</p>
          </div>

          {/* Right Image */}
          <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollCardStack;
