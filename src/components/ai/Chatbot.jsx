"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import AIIntro from "./AiIntro";

export default function ChatPage({
  aiName,
  description,
  img,
  suggestions,
  tagline,
}) {
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  console.log("Rendering ChatPage with name:", description);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const aiAnswers = [
    {
      text: "Let’s begin by choosing your brand’s personality style.",
      options: ["Elegant", "Bold", "Minimal", "Playful"],
    },
    {
      text: (option) =>
        `${option} — excellent choice! What logo style do you prefer?`,
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
    {
      text: () => {
        const paragraphs = [
          "Did you know? The best brands evoke emotion and tell a story. Fun fact: Color psychology can influence how your brand is perceived!. A memorable logo is simple, relevant, and versatile.",
          "Great design is about making things both beautiful and functional.",
        ];
        return paragraphs[Math.floor(Math.random() * paragraphs.length)];
      },
      options: undefined,
    },
  ];
  const [step, setStep] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [pendingAiMsg, setPendingAiMsg] = useState(null);
  const chatContainerRef = useRef(null);

  const handleSend = (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setShowIntro(false);
    setStep(0);
    setSelectedOptions([]);
    setAiLoading(true);
    setAiTyping(false);
    setTimeout(() => {
      setAiLoading(false);
      setAiTyping(true);
      const firstStep = Math.random() < 0.7 ? 0 : 4;
      const answer = aiAnswers[firstStep];
      let aiText;
      if (typeof answer.text === "function") {
        aiText = answer.text.length > 0 ? answer.text(msg) : answer.text();
      } else {
        aiText = answer.text;
      }
      setPendingAiMsg({
        sender: "ai",
        text: aiText,
        options: answer.options,
      });
      setStep(firstStep);
    }, 700);
  };

  React.useEffect(() => {
    if (aiTyping && pendingAiMsg) {
      setMessages((prev) => [...prev, { ...pendingAiMsg, typing: true }]);
      setAiTyping(false);
      setPendingAiMsg(null);
    }
    // eslint-disable-next-line
  }, [aiTyping, pendingAiMsg]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) return;
    const nextStep = step + 1;
    setSelectedOptions((prev) => [...prev, option]);
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    setAiLoading(true);
    setAiTyping(false);
    setTimeout(() => {
      setAiLoading(false);
      setAiTyping(true);
      if (aiAnswers[nextStep]) {
        const answer = aiAnswers[nextStep];
        let aiText;
        if (typeof answer.text === "function") {
          aiText = answer.text.length > 0 ? answer.text(option) : answer.text();
        } else {
          aiText = answer.text;
        }
        setPendingAiMsg({
          sender: "ai",
          text: aiText,
          options: answer.options,
        });
      }
    }, 1000);
    setStep(nextStep);
  };

  // Auto-scroll to bottom with smooth animation when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, aiLoading]);

  const allMessages = aiLoading
    ? [...messages, { sender: "ai", text: "", isLoading: true }]
    : messages;

  return (
    <div className=" flex flex-col max-w-[1280px] mx-auto justify-between">
      <div
        className="flex-1 max-h-[70vh] overflow-y-auto"
        ref={chatContainerRef}
      >
        {showIntro && <AIIntro name={aiName} description={description} img={img} tagline={tagline} />}
        {allMessages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            options={msg.options || []}
            onOptionSelect={handleOptionSelect}
            selectedOptions={selectedOptions}
            isLoading={msg.isLoading}
            typing={msg.typing}
          />
        ))}
      </div>
      <MessageInput suggestions={suggestions} onSend={handleSend} />
    </div>
  );
}
