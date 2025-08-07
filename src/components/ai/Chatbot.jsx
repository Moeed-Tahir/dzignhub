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
  placeholder ,
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

  const getBrandDesignData = async () => {


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

  const updateBrandDesignData = async (data) => {
    console.log("Updating brand design data");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/update-brand-design-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ brandDesign: data })
    });

    const res = await response.json();
    console.log(res);

  }

  const generateLogo = async (prompt, type, size = "1024x1024") => {
    try {
      console.log('🎨 Generating logo with prompt:', prompt);

      // Add loading message for logo generation
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: "ai",
          text: `✨ Generating your ${type} now... This might take a moment!`,
          isLoading: true
        }
      ]);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/logo-designer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          size: size
        })
      });

      const data = await response.json();

      if (data.type === 'success' && data.data.imageUrl) {
        // Remove loading message and add logo
        setMessages(prevMessages =>
          prevMessages.filter(msg => !msg.isLoading).concat([
            {
              sender: "ai",
              text: `🎉 Here's your custom ${type}! What do you think?`,
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

  function cleanAIResponse(aiResponse) {
    return aiResponse
      .trim()
      .replace(/^```json\s*/i, '') // removes ```json
      .replace(/^json\s*/i, '')    // removes json
      .replace(/^```/, '')         // removes starting ```
      .replace(/```$/, '')         // removes ending ```
      .trim();
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

      let endpoint;

      if (aiName.toLowerCase() === "zara") {
        endpoint = "zara-brand-designer";
      }
      else if (aiName.toLowerCase() === "sana") {
        endpoint = "content-creation";
      }
      else if (aiName.toLowerCase() === "novi") {
        endpoint = "novi-seo-agent";
      }
      else if (aiName.toLowerCase() === "mira") {
        endpoint = "strategist-mira";
      }
      else if (aiName.toLowerCase() === "ellie") {
        endpoint = "ellie-ui-ux";
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: msg,
          context: `${aiName.toLowerCase() == "zara" ? "Zara Brand Designer" : `User brand data for content creation: ${brandDesignData}`}`,
          previousMessages: previousMessages
        })
      });

      const data = await response.json();

      if (data.type === 'success') {
        let aiResponse;
        aiResponse = data.data.response;
        console.log('✅ Zara API response:', aiResponse);

        let jsonResponse;
        let isValidJson = false;

        try {
          // Try to parse the string
          const cleaned = cleanAIResponse(aiResponse);
          jsonResponse = JSON.parse(cleaned);
          isValidJson = true;
          console.log('✅ Parsed JSON response:', jsonResponse);
        } catch (err) {
          // It's just a plain string, not valid JSON
          console.error('❌ Not valid JSON, using as plain string.');
          if (aiName.toLowerCase() == "sana" || aiName.toLowerCase() == "novi" || aiName.toLowerCase() == "ellie" || aiName.toLowerCase() == "zara") {
            if (aiResponse.includes('"isFinal": true')) {
              console.log("isFinal found in invalid Json")
              const promptMatch = aiResponse.match(/"prompt"\s*:\s*"([\s\S]*?)",\s*"isFinal"/);
              console.log(promptMatch)
              if (promptMatch && promptMatch[1]) {
                console.log("Matched and parsed prompt from invalid JSON");
                jsonResponse = {
                  prompt: promptMatch[1],
                  isFinal: true
                };
                isValidJson = true;
              }
              else {
                jsonResponse = {
                  prompt: aiResponse,
                  isFinal: true
                };
                isValidJson = true;

              }
              
            }
            else {
              console.log("isFinal not found in invalid Json")
              // Try to extract answer and options from invalid JSON
              const answerMatch = aiResponse.match(/"answer"\s*:\s*"([^"]*)"/);
              const optionsMatch = aiResponse.match(/"options"\s*:\s*\[([^\]]*)\]/);

              if (answerMatch || optionsMatch) {
                jsonResponse = {};
                if (answerMatch && answerMatch[1]) {
                  jsonResponse.answer = answerMatch[1];
                }
                if (optionsMatch && optionsMatch[1]) {
                  try {
                    const optionsString = optionsMatch[1];
                    const optionMatches = optionsString.match(/"([^"]*)"/g);
                    if (optionMatches) {
                      jsonResponse.options = optionMatches.map(option => option.replace(/"/g, ''));
                    }
                  } catch (err) {
                    console.error('Error parsing options from invalid JSON:', err);
                  }
                }
                isValidJson = true;
              } else {
                jsonResponse = {
                  answer: aiResponse
                };
                isValidJson = true;
              }
            }
          }
          else {
            jsonResponse = {
              answer: aiResponse
            };
            isValidJson = true;
          }
        }


        if (aiName.toLowerCase() == "ellie" && jsonResponse.isFinal) {
          let userSelectionObj = {};

          // Match the userSelection object
          const userSelectionMatch = aiResponse.match(/"userSelection"\s*:\s*\{([^}]*)\}/);

          if (userSelectionMatch && userSelectionMatch[1]) {
            // Parse the object content
            const objectContent = userSelectionMatch[1];

            // Extract key-value pairs from the object
            const keyValueMatches = objectContent.match(/"([^"]+)"\s*:\s*"([^"]*)"/g);

            if (keyValueMatches) {
              keyValueMatches.forEach(match => {
                const [, key, value] = match.match(/"([^"]+)"\s*:\s*"([^"]*)"/);
                userSelectionObj[key] = value;
              });
            }

            // Handle array values like components
            const arrayMatches = objectContent.match(/"([^"]+)"\s*:\s*\[([^\]]*)\]/g);
            if (arrayMatches) {
              arrayMatches.forEach(match => {
                const [, key, arrayContent] = match.match(/"([^"]+)"\s*:\s*\[([^\]]*)\]/);
                const items = arrayContent.match(/"([^"]*)"/g);
                if (items) {
                  userSelectionObj[key] = items.map(item => item.replace(/"/g, ''));
                }
              });
            }
          }

          let prompt = `${jsonResponse.prompt}
          User Selection: ${JSON.stringify(userSelectionObj, null, 2)}
          `;
          console.log(`Prompt for ellie: `, prompt);

          setAiLoading(false);
          await generateLogo(prompt, "1792x1024");
          return;
        }

        // Check if the response is final JSON object
        // this is mainly for generating logo by brand designer agent
        
        if (isValidJson && jsonResponse.isFinal && aiName.toLowerCase() == "zara") {
          const formattedString = Object.entries(jsonResponse.userSelection)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");

          console.log('Final response received, generating branding visuals...');
          const finalPrompt = `Generate a ${jsonResponse.task} for a brand with the following details:
          \n\n
          ${formattedString}
          \n\nPrompt: ${jsonResponse.prompt}\n\n
      `;
          console.log('Final prompt:', finalPrompt);

          setAiLoading(false);
          await generateLogo(finalPrompt, jsonResponse.task);
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

      console.log(`🚀 Calling ${aiName} API with option...`);

      let endpoint;

      if (aiName.toLowerCase() === "zara") {
        endpoint = "zara-brand-designer";
      }
      else if (aiName.toLowerCase() === "sana") {
        endpoint = "content-creation";
      }
      else if (aiName.toLowerCase() === "novi") {
        endpoint = "novi-seo-agent";
      }
      else if (aiName.toLowerCase() === "mira") {
        endpoint = "strategist-mira";
      }
      else if (aiName.toLowerCase() === "ellie") {
        endpoint = "ellie-ui-ux";
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: option,
          context: `${aiName.toLowerCase() == "zara" ? "Zara Brand Designer" : `User brand data for content creation: ${brandDesignData}`}`,
          previousMessages: previousMessages
        })
      });

      const data = await response.json();

      if (data.type === 'success') {
        let aiResponse;
        aiResponse = data.data.response;
        console.log('✅ API response (option):', aiResponse);

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
          if (aiName.toLowerCase() == "sana" || aiName.toLowerCase() == "novi" || aiName.toLowerCase() == "ellie") {
            if (aiResponse.includes('"isFinal": true')) {
              console.log("isFinal found in invalid Json")
              const promptMatch = aiResponse.match(/"prompt"\s*:\s*"([\s\S]*?)",\s*"isFinal"/);
              console.log(promptMatch)
              if (promptMatch && promptMatch[1]) {
                console.log("Matched and parsed prompt from invalid JSON");
                jsonResponse = {
                  prompt: promptMatch[1],
                  isFinal: true
                };
                isValidJson = true;
              }
              else {
                jsonResponse = {
                  prompt: aiResponse,
                  isFinal: true
                };
                isValidJson = true;
              }

              // Handle Ellie UI/UX generation
              if (aiName.toLowerCase() == "ellie") {
                let userSelectionObj;
                const userSelection = aiResponse.match(/"userSelection"\s*:\s*\[([^\]]*)\]/);
                if (userSelection && userSelection[1]) {
                  userSelectionObj = userSelection[1].split(',').reduce((acc, item) => {
                    const [key, value] = item.split(':').map(str => str.trim());
                    acc[key.replace(/"/g, '')] = value.replace(/"/g, '');
                    return acc;
                  }, {});
                }
                let prompt = `${jsonResponse.prompt}
                User Selection: ${JSON.stringify(userSelectionObj, null, 2)}
                `;
                console.log(`Prompt for ellie: `, prompt);

                setAiLoading(false);
                await generateLogo(prompt, "1792x1024");
                return;
              }
            }
            else {
              console.log("isFinal not found in invalid Json")
              // Try to extract answer and options from invalid JSON
              const answerMatch = aiResponse.match(/"answer"\s*:\s*"([^"]*)"/);
              const optionsMatch = aiResponse.match(/"options"\s*:\s*\[([^\]]*)\]/);

              if (answerMatch || optionsMatch) {
                jsonResponse = {};
                if (answerMatch && answerMatch[1]) {
                  jsonResponse.answer = answerMatch[1];
                }
                if (optionsMatch && optionsMatch[1]) {
                  try {
                    const optionsString = optionsMatch[1];
                    const optionMatches = optionsString.match(/"([^"]*)"/g);
                    if (optionMatches) {
                      jsonResponse.options = optionMatches.map(option => option.replace(/"/g, ''));
                    }
                  } catch (err) {
                    console.error('Error parsing options from invalid JSON:', err);
                  }
                }
                isValidJson = true;
              } else {
                jsonResponse = {
                  answer: aiResponse
                };
                isValidJson = true;
              }
            }
          }
          else {
            jsonResponse = {
              answer: aiResponse
            };
            isValidJson = true;
          }
        }

        // Check if the response is final JSON object for Zara (brand designer)
        if (isValidJson && jsonResponse.isFinal && aiName.toLowerCase() == "zara") {
          const formattedString = Object.entries(jsonResponse.userSelection)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");

          console.log('Final response received, generating branding visuals...');
          const finalPrompt = `Generate a ${aiName.toLowerCase() ? "logo" : "poster"} for a brand with the following details:
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
      console.error('❌ Error calling API:', error);
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
            aiIcon={img}
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
      <MessageInput placeholder={placeholder} suggestions={suggestions} onSend={handleSend} />
    </div>
  );
}
