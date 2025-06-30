"use client";
import { useEffect } from "react";
import "./Stack.css";
import gsap from "gsap";
import StackCard from "./StackCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const StackingImages = () => {
  useEffect(() => {
    const cardCount = 6; // Total numbers of cards
    const cards = Array.from(
      { length: cardCount },
      (_, index) => `.animation_card-${index + 1}`
    );

    // gsap.set(cards, {
    //   yPercent: 0,
    //   scale: 1,
    // });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation_cards",
        pin: true,
        pinSpacing: true,
        start: "top 30%",
        end: "+=5000",
        markers: true,
        scrub: 2,
      },
    });

    cards.forEach((card, index) => {
      timeline.to(
        card,
        {
          yPercent: -200,
          duration: 5,
        },
        index * 2 // Delay each card's animation
      );
    });
  }, []);
  return (
    <div className="container  mx-auto bg-gray-200 flex flex-col gap-10">
      <div className="animation_cards h-[100vh] min-h-[400px] container mx-auto">
        <div className="animation_card animation_card-6">
          <StackCard
            imgLink="/landing/assistants/6.png"
            bg="/services/bg-ai.png"
            type="Security"
            heading="Business Intelligence & Data Analysis"
            para="Our BI and data analysis solutions turn raw data into actionable insights, streamlining collection and visualization to drive growth and optimize performance."
            num="06"
            link="/service/business-intelligence"
          />
        </div>

        <div className="animation_card animation_card-5">
          <StackCard
            imgLink="/landing/assistants/6.png"
            bg="/services/bg-digital.png"
            type="Cloud"
            heading="Digital Consultation"
            para="Strategic guidance to align technology with your business goals and maximize efficiency."
            num="05"
            link="/service/digital-consultation"
          />
        </div>

        <div className="animation_card animation_card-4">
          <StackCard
            bg="/services/bg-ai.png"
            imgLink="/landing/assistants/6.png"
            type="Web"
            heading="Digital Transformation & Automation"
            para="Digital transformation and automation improve efficiency, cut costs, and enable innovation through real-time insights for smarter decision-making."
            num="04"
            link="/service/digital-transformation"
          />
        </div>

        <div className="animation_card animation_card-3">
          <StackCard
            para="Developing software that optimizes business and ensures a smooth user experience."
            imgLink="/landing/assistants/6.png"
            bg="/services/bg-digital.png"
            type="Digital"
            num="03"
            heading="Software Development"
            link="/service/software-development"
          />
        </div>

        <div className="animation_card animation_card-2">
          <StackCard
            bg="/services/bg-ai.png"
            imgLink="/landing/assistants/6.png"
            type="Consulting"
            num="02"
            heading="Website Development"
            link="/service/website-development"
            para="Dynamic, Responsive web applications that captivate your audience and serves business needs."
          />
        </div>
        <div className="animation_card animation_card-1">
          <StackCard
            bg="/services/bg-digital.png"
            type="AI"
            imgLink="/landing/assistants/6.png"
            num="01"
            heading="Mobile App Development"
            link="/service/mobile-app-development"
            para="Custom built mobile apps for Android and iOS, tailored to your needs."
          />
        </div>
      </div>
    </div>
  );
};

export default StackingImages;
