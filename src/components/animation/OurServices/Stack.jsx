"use client";
import { useEffect } from "react";
import "./Stack.css";
import gsap from "gsap";
import StackCard from "./StackCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const StackingImages = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  useEffect(() => {
    const cardCount = 5;
    const cards = Array.from(
      { length: cardCount },
      (_, index) => `.animation_card-${index + 1}`
    );

    gsap.set(cards, {
      yPercent: isMobile ? 100 : 50,
      opacity: (i) => (i === 0 ? 1 : 0),
      scale: 1,
      zIndex: (i) => i + 1,
    });

    const scrollTriggerConfig = {
      trigger: ".animation_cards",
      pin: true,
      start: isMobile ? "top 20%" : "top top",
      end: "+=5000",
      scrub: 2,
      // markers: true,
    };

    const timeline = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    cards.forEach((card, index) => {
      timeline.to(
        card,
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        index * 2
      );

      if (index > 0) {
        for (let i = 0; i < index; i++) {
          timeline.to(
            cards[i],
            {
              scale: 1 - (index - i) * 0.05,
              opacity: 1 - (index - i) * 0.1,
              duration: 0.5,
              yPercent: -(index - i) * 8,
            },
            index * 2
          );
        }
      }
    });
  }, []);

  return (
    <div className="container  mx-auto  mb-[5000px] sm:mt-[-500px] flex flex-col gap-10">
      <div className="animation_cards h-[100vh] sm:min-h-[400px] container mx-auto">
        <div className="animation_card animation_card-4">
          <StackCard
            imgLink="/ai-assistants/brand-designer/zara.jpg"
            heading="Novi"
            para="Digital transformation and automation improve efficiency, cut costs, and enable innovation through real-time insights for smarter decision-making."
            type="Content Creation"
            num="01"
          />
        </div>

        <div className="animation_card animation_card-3">
          <StackCard
            para="Developing software that optimizes business and ensures a smooth user experience."
            imgLink="/ai-assistants/brand-designer/zara.jpg"
            num="02"
            heading="Kano"
            type="Video Creation"
          />
        </div>

        <div className="animation_card animation_card-2">
          <StackCard
            imgLink="/ai-assistants/brand-designer/zara.jpg"
            num="03"
            heading="Sana"
            type="Image Creation"
            para="Dynamic, Responsive web applications that captivate your audience and serves business needs."
          />
        </div>
        <div className="animation_card animation_card-1">
          <StackCard
            imgLink="/ai-assistants/brand-designer/zara.jpg"
            num="04"
            heading="Zara"
            type="Brand Designer"
            para="Zara helps you bring your brand to life with powerful visual identity tools. She specializes in. Logo Creation: Generates unique, on-brand logos tailored to your business vibe."
          />
        </div>
      </div>
    </div>
  );
};

export default StackingImages;
