"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PitchDeckChat from "./PitchDeckChat";
import PitchDeckPreview from "./PitchDeckPreview";

const PitchDeckLayout = ({ initialPrompt }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Initialize messages with the prompt
  const initialMessages = initialPrompt
    ? [
        {
          id: 1,
          text: initialPrompt,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          id: 2,
          text: "I'll help you create an amazing presentation! Let me analyze your request and start working on your slides. I can see you want to create a compelling pitch deck.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]
    : [];

  const handleMessageSent = (message) => {
    // You can handle message events here
    // For example, trigger slide generation based on messages
    console.log("Message sent:", message);

    // Simulate slide generation for certain keywords
    if (
      message.sender === "user" &&
      message.text.toLowerCase().includes("slide")
    ) {
      // Add a new slide when user mentions "slide"
      setTimeout(() => {
        setSlides((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            title: `Generated Slide ${prev.length + 1}`,
            content: `Content based on: "${message.text}"`,
            type: "generated",
          },
        ]);
      }, 1500);
    }
  };

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-[calc(100vh-120px)] pl-[70px] mt-20 gap-4"
    >
      <PitchDeckChat
        initialMessages={initialMessages}
        onSendMessage={handleMessageSent}
      />

      <PitchDeckPreview
        slides={slides}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />
    </motion.div>
  );
};

export default PitchDeckLayout;
