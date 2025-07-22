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

  const [brandDesignData, setBrandDesignData] = useState({})

  const getBrandDesignData = async() => {

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/get-brand-designer-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const res = await response.json();

    console.log(res)

    if (res.type == "success") {
      setBrandDesignData(res.data);
    }
  }

  const updateBrandDesignData = async(data) => {
    console.log("Updating brand design data");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/update-brand-design-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({brandDesign: data})
    });

    const res = await response.json();
    console.log(res);

  }

  const generateLogo = async (prompt) => {
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
        role: message.sender === "user" ? "user" : "system",
        content: message.text
      }));

      console.log(`🚀 Calling ${aiName} API...`);
      console.log(previousMessages);

      let endpoint = aiName.toLowerCase() == "zara"?"zara-brand-designer":"content-creation";

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: msg,
          context: `${aiName.toLowerCase() == "zara"? "Zara Brand Designer": `User brand data for content creation: ${brandDesignData}`}`,
          previousMessages: previousMessages
        })
      });

      const data = await response.json();

      if (data.type === 'success') {

        const aiResponse = data.data.response;
        console.log('✅ Zara API response:', aiResponse);
        
        let jsonResponse;
        let isValidJson = false;
        
        try {
          // Try to parse the string
          jsonResponse = JSON.parse(aiResponse);
          isValidJson = true;
          console.log('✅ Parsed JSON response:', jsonResponse);
        } catch (err) {
          // It's just a plain string, not valid JSON
          console.error('❌ Not valid JSON, using as plain string.');
          if (aiName.toLowerCase() == "sana") {
            if (aiResponse.includes('"isFinal": true')) {
              console.log("isFinal found in invalid Json")
              const promptMatch = aiResponse.match(/"prompt"\s*:\s*"([\s\S]*?)",\s*"isFinal"/);
              console.log(promptMatch)
              if (promptMatch && promptMatch[1]) {
                jsonResponse = promptMatch[1];
              }
              else {
                jsonResponse = aiResponse;
              }
            }
            else {
              console.log("isFinal not found in invalid Json")

            }
          }
          else{
            jsonResponse = aiResponse;
          }
          isValidJson = false;
        }
        
        // Check if the response is final JSON object
        if (isValidJson && jsonResponse.isFinal && aiName.toLowerCase() == "zara") {
          const formattedString = Object.entries(jsonResponse.userSelection)
  .map(([key, value]) => `${key}: ${value}`)
  .join(", ");

          console.log('Final response received, generating branding visuals...');
          const finalPrompt = `Generate a ${aiName.toLowerCase()?"logo":"poster"} for a brand with the following details:
          \n\n
          ${formattedString}
          \n\nPrompt: ${jsonResponse.prompt}\n\n
      `;
          console.log('Final prompt:', finalPrompt);
        
          setAiLoading(false);
          await generateLogo(finalPrompt);
          updateBrandDesignData(jsonResponse.userSelection);
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
              text: isValidJson ? [
                jsonResponse.answer && `${jsonResponse.answer}`,
                jsonResponse.message && `${jsonResponse.message}`,
                jsonResponse.prompt && `${jsonResponse.prompt}`
              ].filter(Boolean).join('\n\n') || "" : aiResponse,
              options: isValidJson && jsonResponse.options ? jsonResponse.options : [], // Extract options from JSON
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
        console.log('✅ Zara API response (option):', aiResponse);
        
        let jsonResponse;
        let isValidJson = false;
        
        try {
          // Try to parse the string
          jsonResponse = JSON.parse(aiResponse);
          isValidJson = true;
          console.log('✅ Parsed JSON response (option):', jsonResponse);
        } catch (err) {
          // It's just a plain string, not valid JSON
          console.error('❌ Not valid JSON, using as plain string.');
          jsonResponse = aiResponse;
          isValidJson = false;

        }
        
        // Check if the response is final JSON object
        if (isValidJson && jsonResponse.isFinal) {
          console.log('Final response received, generating branding visuals...');
          const finalPrompt = jsonResponse.prompt;
          console.log('Final prompt:', finalPrompt);
        
          setAiLoading(false);
          await generateLogo(finalPrompt);
          return;
        }

        if (isValidJson == false && aiResponse.includes('"isFinal": true')) {
          console.log('Response recdevied in invalid json');
          let finalPrompt;
          const promptMatch = aiResponse.match(/"prompt":\s*"([^"]*)"/)
            if (promptMatch && promptMatch[1]) {
              finalPrompt = promptMatch[1];
            } else {
              finalPrompt = aiResponse;
            }
          console.log('Final prompt:', finalPrompt);
        
          setAiLoading(false);
          await generateLogo(finalPrompt);
          return;
        }
  
        setAiLoading(false);
        setAiTyping(true);

        let messageToShow;
        let optionsToShow = [];
        
        if (isValidJson) {
          // Valid JSON - extract normally
          messageToShow = jsonResponse.answer || jsonResponse.message || "";
          optionsToShow = jsonResponse.options || [];
        } else {
          // Invalid JSON - check if it contains isFinal structure
          if (aiResponse.includes('"isFinal"')) {
            // Try to extract prompt from invalid JSON
            const promptMatch = aiResponse.match(/"prompt":\s*"([^"]*)"/)
            if (promptMatch && promptMatch[1]) {
              messageToShow = promptMatch[1];
            } else {
              messageToShow = aiResponse;
            }
          } else {
            // Check if it has answer field in invalid JSON
            const answerMatch = aiResponse.match(/"answer":\s*"([^"]*)"/)
            if (answerMatch && answerMatch[1]) {
              messageToShow = answerMatch[1];
            } else {
              // Fallback to the entire response
              messageToShow = aiResponse;
            }
            
            // Try to extract options from invalid JSON
            const optionsMatch = aiResponse.match(/"options":\s*\[([^\]]*)\]/);
            if (optionsMatch && optionsMatch[1]) {
              try {
                // Extract individual options
                const optionsString = optionsMatch[1];
                const optionMatches = optionsString.match(/"([^"]*)"/g);
                if (optionMatches) {
                  optionsToShow = optionMatches.map(option => option.replace(/"/g, ''));
                }
              } catch (err) {
                console.error('Error parsing options from invalid JSON:', err);
                optionsToShow = [];
              }
            }
          }
        }
        
        // Add AI response to messages after a short delay for typing effect
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              sender: "ai",
              text: messageToShow,
              options: optionsToShow,
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

  React.useEffect(() => {
    if (aiTyping && pendingAiMsg) {
      setMessages((prev) => [...prev, { ...pendingAiMsg, typing: true }]);
      setAiTyping(false);
      setPendingAiMsg(null);
    }
    // eslint-disable-next-line
  }, [aiTyping, pendingAiMsg]);

  useEffect(() => {
    // Fetch initial brand design data
    getBrandDesignData();
  }, []);



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
    isLogo={msg.isLogo || false} // Add this line
  />
))}
      </div>
      <MessageInput suggestions={suggestions} onSend={handleSend} />
    </div>
  );
}
