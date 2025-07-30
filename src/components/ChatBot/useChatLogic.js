"use client";

import { useState, useEffect } from "react";

const simpleResponses = [
  "Thanks for your message! I'm here to help you with any questions.",
  "That's a great question! Let me know if you need more information.",
  "I understand what you're looking for. How else can I assist you?",
  "Perfect! I'm glad I could help. What would you like to know next?",
  "Great choice! Feel free to ask me anything else.",
];

export function useChatLogic() {
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

  const handleOpenChat = () => {
    setChatState("intro");
  };

  const handleCloseChat = () => {
    setChatState("closed");
    setMessages([]);
    setInput("");
  };

  const handleBackToIntro = () => {
    setChatState("intro");
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

  return {
    chatState,
    showWelcome,
    messages,
    input,
    setInput,
    isLoading,
    handleOpenChat,
    handleCloseChat,
    handleBackToIntro,
    handleSuggestionClick,
    handleSubmit,
  };
}
