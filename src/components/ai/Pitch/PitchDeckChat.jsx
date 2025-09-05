"use client";

import Image from "next/image";
import React, { useState } from "react";

const PitchDeckChat = ({ initialMessages = [], onSendMessage }) => {
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  // Handle sending new messages in chat
  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: currentMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      };

      // Add user message
      setChatMessages((prev) => [...prev, userMessage]);

      // Call parent callback if provided
      if (onSendMessage) {
        onSendMessage(userMessage);
      }

      setCurrentMessage("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponses = [
          "That's a great idea! I'll incorporate that into your presentation design.",
          "I understand your requirements. Let me update the slides accordingly.",
          "Perfect! I'll add more visual elements to make your presentation more engaging.",
          "Good suggestion! I'll modify the content structure to better fit your needs.",
          "Excellent point! I'll enhance the design with better color schemes and layouts.",
          "I'll work on that right away! Your slides will look amazing.",
          "Great feedback! Let me adjust the content flow for better impact.",
          "That's exactly what we need! I'll implement those changes now.",
        ];

        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];

        const aiMessage = {
          id: chatMessages.length + 2,
          text: randomResponse,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        };

        setChatMessages((prev) => [...prev, aiMessage]);

        // Call parent callback if provided
        if (onSendMessage) {
          onSendMessage(aiMessage);
        }
      }, 1000);
    }
  };

  // Handle Enter key press in chat input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-[425px] rounded-lg  flex flex-col">
      <div className="flex-1  scrollbar-hide overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.length > 0 ? (
            chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start mb-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Show avatar only for AI (on left side) */}
                {message.sender !== "user" && (
                  <Image
                    src={"/avatar.png"}
                    alt="AI"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 mr-2"
                  />
                )}

                {/* Message bubble */}
                <div className="max-w-[90%] bg-white  p-3 rounded-lg shadow-sm border border-gray-50  ">
                  <p className="text-sm">{message.text}</p>
                </div>

                {/* Show user avatar on right side */}
                {message.sender === "user" && (
                  <Image
                    src={"/avatar.png"}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 ml-2"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                Your conversation with the AI assistant will appear here...
              </p>
            </div>
          )}
        </div>
      </div>

      <div className=" border-t border-gray-100">
        <div className="flex items-center flex-col bg-white rounded-2xl shadow-sm px-3 py-2 w-full">
          {/* Plus button */}
          <textarea
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask allmyAI..."
            className="flex-1 border-none resize-none h-10 outline-none w-full focus:ring-0 text-gray-700 placeholder-gray-400"
          />
          <div className="flex items-center flex-1 w-full justify-between   ">
            <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 mr-2">
              <span className="text-xl leading-none">+</span>
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#BDFF00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/Ai/direct-right.svg"
                width={20}
                height={20}
                alt="Send"
                className="-rotate-50"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckChat;
