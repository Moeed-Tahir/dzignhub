"use client";
import React, { useState } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import AIIntro from "./AiIntro";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  const handleSend = (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setShowIntro(false);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Let’s begin by choosing your brand’s personality style.",
          options: ["Elegant", "Bold", "Minimal", "Playful"],
        },
      ]);
    }, 500);
  };

  const handleOptionSelect = (option) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: option },
      {
        sender: "ai",
        text: `${option} — excellent choice! What logo style do you prefer?`,
        options: [
          "Wordmark (text only)",
          "Icon + Text (combined)",
          "Symbol/Icon only",
        ],
      },
    ]);
  };

  return (
    <div className=" flex flex-col max-w-[1440px] mx-auto justify-between">
      <div className="flex-1 max-h-[70vh] overflow-y-auto">
        {showIntro && <AIIntro />}
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            options={msg.options || []}
            onOptionSelect={handleOptionSelect}
          />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
