"use client";
import React, { useState } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import AIIntro from "./AiIntro";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  // Track selected options to prevent re-selection
  const [selectedOptions, setSelectedOptions] = useState([]);

  // AI answer sequence
  const aiAnswers = [
    {
      text: "Let’s begin by choosing your brand’s personality style.",
      options: ["Elegant", "Bold", "Minimal", "Playful"],
    },
    {
      text: (option) => `${option} — excellent choice! What logo style do you prefer?`,
      options: [
        "Wordmark (text only)",
        "Icon + Text (combined)",
        "Symbol/Icon only",
      ],
    },
    {
      text: (option) => `Great! What color palette do you want?`,
      options: ["Monochrome", "Pastel", "Vibrant", "Earthy"],
    },
    {
      text: (option) => `Awesome! What vibe should your brand evoke?`,
      options: ["Luxury", "Friendly", "Modern", "Classic"],
    },
  ];

  // Track which step the user is on
  const [step, setStep] = useState(0);

  const handleSend = (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setShowIntro(false);
    setStep(0);
    setSelectedOptions([]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", ...aiAnswers[0] },
      ]);
    }, 500);
  };

  const handleOptionSelect = (option) => {
    // Prevent selecting the same option again
    if (selectedOptions.includes(option)) return;
    const nextStep = step + 1;
    setSelectedOptions((prev) => [...prev, option]);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: option },
      aiAnswers[nextStep]
        ? {
            sender: "ai",
            text:
              typeof aiAnswers[nextStep].text === "function"
                ? aiAnswers[nextStep].text(option)
                : aiAnswers[nextStep].text,
            options: aiAnswers[nextStep].options,
          }
        : null,
    ].filter(Boolean));
    setStep(nextStep);
  };

  return (
    <div className=" flex flex-col max-w-[1280px] mx-auto justify-between">
      <div className="flex-1 max-h-[70vh] overflow-y-auto">
        {showIntro && <AIIntro />}
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            options={msg.options || []}
            onOptionSelect={handleOptionSelect}
            selectedOptions={selectedOptions}
          />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
