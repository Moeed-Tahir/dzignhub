"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import AIIntro from "./AiIntro";
import Image from "next/image";

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

  const generateLogo = async(prompt) => {
    try {
      console.log('🎨 Generating logo with prompt:', prompt);
      
      // Add loading message for logo generation
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: "ai",
          text: "✨ Generating your logo now... This might take a moment!",
          isLoading: true
        }
      ]);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/logo-designer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });
  
      const data = await response.json();
  
      if (data.type === 'success' && data.data.imageUrl) {
        // Remove loading message and add logo
        setMessages(prevMessages => 
          prevMessages.filter(msg => !msg.isLoading).concat([
            {
              sender: "ai",
              text: "🎉 Here's your custom logo! What do you think?",
              imageUrl: data.data.imageUrl,
              isLogo: true
            }
          ])
        );
      } else {
        // Remove loading message and show error
        setMessages(prevMessages => 
          prevMessages.filter(msg => !msg.isLoading).concat([
            {
              sender: "ai",
              text: "Sorry, I couldn't generate the logo right now. Please try again.",
              isError: true
            }
          ])
        );
      }
  
    } catch (error) {
      console.error('❌ Error generating logo:', error);
      // Remove loading message and show error
      setMessages(prevMessages => 
        prevMessages.filter(msg => !msg.isLoading).concat([
          {
            sender: "ai",
            text: "There was an error generating your logo. Please try again.",
            isError: true
          }
        ])
      );
    }

  }

  const handleSend = async (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setShowIntro(false);
    setStep(0);
    setSelectedOptions([]);
    setAiLoading(true);
    setAiTyping(false);
  
    try {
      // Prepare previous messages for API call
      const previousMessages = messages.map(message => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text
      }));
  
      console.log('🚀 Calling Zara Brand Designer API...');
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/zara-brand-designer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: msg,
          context: `Brand design chat for ${aiName}`,
          previousMessages: previousMessages
        })
      });
  
      const data = await response.json();
  
      if (data.type === 'success') {
        const aiResponse = data.data.response;

        let userMessages = newMessages.filter(msg => msg.sender === "user").length;
        console.log("Total User Messages: ", userMessages);
        if (userMessages === 4) {
          const logoPrompt = `Generate a logo for a fashion brand with the following details:
          ${aiResponse}
          `;
          await generateLogo(logoPrompt);
          return;
        }
        
        setAiLoading(false);
        setAiTyping(true);
        
        // Add AI response to messages after a short delay for typing effect
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              sender: "ai",
              text: aiResponse,
              typing: true
            }
          ]);
          setAiTyping(false);
        }, 700);
  
      } else {
        // Handle API error
        setAiLoading(false);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Sorry, I'm having trouble processing your request right now. Please try again.",
            isError: true
          }
        ]);
      }
  
    } catch (error) {
      console.error('❌ Error calling Zara API:', error);
      setAiLoading(false);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: "ai",
          text: "I'm experiencing some technical difficulties. Please try again in a moment.",
          isError: true
        }
      ]);
    }
  };

  React.useEffect(() => {
    if (aiTyping && pendingAiMsg) {
      setMessages((prev) => [...prev, { ...pendingAiMsg, typing: true }]);
      setAiTyping(false);
      setPendingAiMsg(null);
    }
    // eslint-disable-next-line
  }, [aiTyping, pendingAiMsg]);

  const handleOptionSelect = async (option) => {
    if (selectedOptions.includes(option)) return;
    
    setSelectedOptions((prev) => [...prev, option]);
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    setAiLoading(true);
    setAiTyping(false);
  
    try {
      // Prepare previous messages for API call
      const previousMessages = messages.map(message => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text
      }));
  
      console.log('🚀 Calling Zara Brand Designer API with option...');
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/zara-brand-designer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: option,
          context: `Brand design chat for ${aiName}`,
          previousMessages: previousMessages
        })
      });
  
      const data = await response.json();
  
      if (data.type === 'success') {
        const aiResponse = data.data.response;
        
        setAiLoading(false);
        setAiTyping(true);

        
        // Add AI response to messages after a short delay for typing effect
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              sender: "ai",
              text: aiResponse,
              typing: true
            }
          ]);
          setAiTyping(false);
        }, 1000);
  
      } else {
        setAiLoading(false);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Sorry, I'm having trouble processing your selection. Please try again.",
            isError: true
          }
        ]);
      }
  
    } catch (error) {
      console.error('❌ Error calling Zara API:', error);
      setAiLoading(false);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: "ai",
          text: "I'm experiencing some technical difficulties. Please try again in a moment.",
          isError: true
        }
      ]);
    }
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
    <div className=" flex flex-col  max-w-[1280px] mx-auto justify-between">
      <div
        className="flex-1 max-h-[70vh] scrollbar-hide pb-20 overflow-y-auto"
        ref={chatContainerRef}
      >
       
        {showIntro && (
          <AIIntro
            name={aiName}
            description={description}
            img={img}
            tagline={tagline}
          />
        )}
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
            imageUrl={msg.imageUrl}
          />
        ))}
      </div>
      <MessageInput suggestions={suggestions} onSend={handleSend} />
    </div>
  );
}
