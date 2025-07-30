"use client";

import { useState, useEffect } from "react";
import {
  MessageCircleIcon,
  XIcon,
  ArrowLeftIcon,
  Maximize2Icon,
  SendIcon,
} from "./icons";
import Image from "next/image";
import { IoCaretDown } from "react-icons/io5";

const suggestionQuestions = [
  "What can I do with Allmyai on the free plan?",
  "How do I get started with manual tools?",
  "Which AI assistant is right for my task?",
];

const simpleResponses = [
  "Thanks for your message! I'm here to help you with any questions.",
  "That's a great question! Let me know if you need more information.",
  "I understand what you're looking for. How else can I assist you?",
  "Perfect! I'm glad I could help. What would you like to know next?",
  "Great choice! Feel free to ask me anything else.",
];

export default function DesignChatbot() {
  const [chatState, setChatState] = useState("closed");
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
      const hideTimer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(hideTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setChatState("intro");
  };

  const handleCloseChat = () => {
    setChatState("closed");
    setMessages([]);
    setInput("");
  };

  const addMessage = (content, role) => {
    const newMessage = {
      id: Date.now().toString() + Math.random(),
      role,
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getNextResponse = () => {
    const response = simpleResponses[responseIndex];
    setResponseIndex((prev) => (prev + 1) % simpleResponses.length);
    return response;
  };

  const handleSuggestionClick = async (question) => {
    setChatState("chat");
    addMessage(question, "user");

    setIsLoading(true);

    setTimeout(() => {
      const response = getNextResponse();
      addMessage(response, "assistant");
      setIsLoading(false);
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setChatState("chat");
    addMessage(userMessage, "user");

    setIsLoading(true);

    setTimeout(() => {
      const response = getNextResponse();
      addMessage(response, "assistant");
      setIsLoading(false);
    }, 1200);
  };

  const handleBackToIntro = () => {
    setChatState("intro");
  };

  return (
    <div
      className={`fixed  ${
        chatState === "chat" ? "h-[756px]" : ""
      } flex bottom-6 justify-center items-center right-4 z-50`}
    >
      {/* Welcome Message */}
      {showWelcome && chatState === "closed" && (
        <div className=" mr-20 h-[80px] transform transition-all duration-500 ease-out animate-in slide-in-from-right-5 fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-gray-100 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <p className="text-[16px] font-medium text-[#393E44] leading-relaxed">
                👋🏻 Hello! I’m Ann – ready to help you explore Allmyai. Let’s get
                started!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {chatState !== "closed" && (
        <div className="w-[520px] h-[756px] bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-5 fade-in">
          {/* Header */}
          <div className=" border-b border-[#E7E7E7] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {chatState === "chat" && (
                  <button
                    onClick={handleBackToIntro}
                    className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                  >
                    <ArrowLeftIcon size={16} className="text-gray-600" />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <Image
                    src={"/Chatbot/ai.svg"}
                    alt="Ai Assistant"
                    width={32}
                    height={32}
                  />

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      Ann - Onboarding Assistant
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1">
                  <Maximize2Icon size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/30 to-white">
            {/* Intro State */}
            {chatState === "intro" && (
              <div className="flex-1 !max-h-[520px] p-6 flex flex-col">
                <div className="text-center flex justify-center items-center flex-col mb-8">
                  <Image
                    src={"/Chatbot/ai.svg"}
                    alt="Ai Assistant"
                    width={120}
                    height={120}
                  />
                  <h2 className="text-2xl font-semibold text-[#C209C1] mb-3">
                    Hi, I am Ann 👋🏻{" "}
                  </h2>
                  <p className="text-[#1B1F3B] font-medium mb-3 text-[14px] leading-relaxed">
                    I'm your onboarding assistant — here to guide you through
                    Allmyai.
                  </p>
                  <p className="text-[#68686B] text-sm font-normal leading-relaxed">
                    Tell me what you're working on, or choose a question below
                    to begin your journey with Allmyai.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {suggestionQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="w-full p-4 text-left bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 text-sm font-medium text-[#1B1F3B] border border-gray-100 hover:border-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t  border-gray-100 bg-white">
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="w-full pr-12 py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <SendIcon size={16} className="text-white" />
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Dzignhub may display inaccurate info so double-check its
                    responses.{" "}
                  </p>
                </div>
              </div>
            )}

            {/* Chat State */}
            {chatState === "chat" && (
              <div className="flex-1 flex p-3 !max-h-[520px]  overflow-y-scroll flex-col">
                <div className="flex-1  overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {message.role === "assistant" && (
                        <Image
                          src={"/Chatbot/ai.svg"}
                          alt="Ai Assistant"
                          width={32}
                          height={32}
                        />
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-[12px] ${
                          message.role === "user"
                            ? "bg-[#F7F8F8] !rounded-tr-[4px]  text-black"
                            : "bg-[#F7F8F8] !rounded-tl-[4px] text-gray-900 border border-gray-100"
                        }`}
                      >
                        <p className="text-[16px] leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div>
                          <Image
                            src={"/avatar.png"}
                            alt="Ai Assistant"
                            width={32}
                            height={20}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <Image
                        src={"/Chatbot/ai.svg"}
                        alt="Ai Assistant"
                        width={32}
                        height={32}
                      />

                      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t  border-gray-100 bg-white">
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="w-full pr-12 py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <SendIcon size={16} className="text-white" />
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Dzignhub may display inaccurate info so double-check its
                    responses.{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Icon */}
      {chatState === "closed" && (
        <button
          onClick={handleOpenChat}
          className="rounded-full shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
        >
          <Image
            src={"/Chatbot/ai.svg"}
            alt="Ai Assistant"
            width={64}
            height={64}
            className="!h-[64px] !w-[64px]"
          />
        </button>
      )}
      {chatState != "closed" && (
        <button
          onClick={handleCloseChat}
          className="rounded-full h-[64px] w-[64px] bg-[#C209C1]  shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
        >
          <IoCaretDown className="text-white  text-2xl" />
        </button>
      )}
    </div>
  );
}
