"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import SlideTemplate from "./SlideTemplate";

const animationVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const PitchDeckPreview = ({ slides = [], currentSlide = 0, onSlideChange }) => {
  // Dummy slide data for demonstration
  const dummySlides = [
    {
      id: 1,
      title: "Introduction",
      content: "Welcome to our amazing presentation",
      type: "title",
    },
    {
      id: 2,
      title: "Problem Statement",
      content: "The challenges we're addressing in the market",
      type: "content",
    },
    {
      id: 3,
      title: "Our Solution",
      content: "How we solve the problem effectively",
      type: "content",
    },
  ];

  const displaySlides = slides.length > 0 ? slides : dummySlides;

  return (
    <motion.div
      className="w-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          <Image
            src={"/pitch/presentation.svg"}
            width={24}
            height={24}
            alt="PresentAI"
            className="inline-block mr-2"
          />
          Customer Presentation{" "}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Slide {currentSlide + 1} of {displaySlides.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() =>
                onSlideChange && onSlideChange(Math.max(0, currentSlide - 1))
              }
              disabled={currentSlide === 0}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                onSlideChange &&
                onSlideChange(
                  Math.min(displaySlides.length - 1, currentSlide + 1)
                )
              }
              disabled={currentSlide === displaySlides.length - 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 scrollbar-hide overflow-y-auto">
        <div className="h-full ">
          <SlideTemplate img={"/pitch/slide.jpg"} />
          <SlideTemplate img={"/pitch/slide2.jpg"} />
        </div>
      </div>
    </motion.div>
  );
};

export default PitchDeckPreview;
