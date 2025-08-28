"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import AIIntro from "./AiIntro";
import Image from "next/image";
import { useUserStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

export default function ChatPage({
  aiName,
  description,
  img,
  suggestions,
  placeholder,
  tagline,
  messages,
  setMessages,
  showIntro,
  setShowIntro,
  onNewConversation,
  onRefreshConversations
}) {
  console.log("Rendering ChatPage with name:", description);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [conversationId, setConversationId] = useState("")
  const searchParams = useSearchParams();


  const [streamingMessage, setStreamingMessage] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);


  // ✅ GET CONVERSATION ID FROM URL ON COMPONENT MOUNT
  useEffect(() => {
    const urlConversationId = searchParams.get('conversationId');
    if (urlConversationId) {
      console.log("[DEBUG] Setting conversationId from URL:", urlConversationId);
      setConversationId(urlConversationId);
    } else {
      console.log("[DEBUG] No conversationId in URL, starting fresh");
      setConversationId("");
    }
  }, [searchParams]);

  // ✅ UPDATE CONVERSATION ID WHEN MESSAGES ARE LOADED FOR EXISTING CONVERSATION
  useEffect(() => {
    if (messages.length > 0 && !conversationId) {
      const urlConversationId = searchParams.get('conversationId');
      if (urlConversationId) {
        console.log("[DEBUG] Setting conversationId from URL (messages loaded):", urlConversationId);
        setConversationId(urlConversationId);
      }
    }
  }, [messages, conversationId, searchParams]);

  const aiAnswers = [
    {
      text: "Let's begin by choosing your brand's personality style.",
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

  const { UserId } = useUserStore();

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
      .replace(/^```json\s*/i, '')
      .replace(/^json\s*/i, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();
  }

  const handleSendWithStreaming = async (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setShowIntro(false);
    setIsStreaming(true);
    setStreamingMessage(null);
  
    try {
      console.log(`🚀 Starting streaming with ${aiName} Python API...`);
      console.log(`🔍 Current conversationId: ${conversationId}`);
  
      const pythonApiUrl = process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://127.0.0.1:8000";
      const userId = UserId;
  
      let endpoint;
      switch (aiName.toLowerCase()) {
        case "zara":
          endpoint = "brand-designer/stream";
          break;
        case "sana":
          endpoint = "content-creator/stream";
          break;
        case "novi":
          endpoint = "seo-specialist/stream";
          break;
        case "mira":
          endpoint = "strategist/stream";
          break;
        default:
          endpoint = "brand-designer/stream";
      }
  
      const requestBody = {
        prompt: msg,
        user_id: userId,
        conversation_id: conversationId || null,
      };
  
      const response = await fetch(`${pythonApiUrl}/agents/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      // ✅ CHANGED: Track all tools instead of one streaming message
      let allToolSteps = []; // Array to accumulate all tool steps
      let currentText = "";
      let finalImageUrl = null;
      let finalIsLogo = false;
  
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
  
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
  
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log('📡 Streaming data:', data);
  
              switch (data.type) {
                // Add these missing cases to your handleSendWithStreaming switch statement:
                case 'thinking_start':
                  // ✅ ADD THINKING START HANDLING
                  setStreamingMessage({
                    sender: "ai",
                    text: data.message,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: null, // Reset thinking
                    status: 'thinking'
                  });
                  break;

                case 'thinking_process':
                  // ✅ ADD THINKING PROCESS HANDLING
                  console.log('🧠 Received thinking_process:', data);
                  setStreamingMessage({
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: {
                      thinking: data.thinking,
                      reasoning: data.reasoning,
                      analysis: data.analysis,
                      plan: data.plan,
                      strategy: data.strategy,
                      creative_process: data.creative_process,
                      design_decisions: data.design_decisions,
                      process: data.process,
                      findings: data.findings,
                      approach: data.approach,
                      evaluation: data.evaluation,
                      quality_check: data.quality_check
                    },
                    imageUrl: finalImageUrl,
                    isLogo: finalIsLogo,
                    status: data.status
                  });
                  console.log('🧠 Set streamingMessage with thinking:', {
    thinking: data.thinking?.substring(0, 50) + '...',
    reasoning: data.reasoning?.substring(0, 50) + '...'
  });
                  break;
                case 'conversation_info':
                  if (data.is_new_conversation && data.conversation_id) {
                    setConversationId(data.conversation_id);
                    const newUrl = `${window.location.pathname}?conversationId=${data.conversation_id}`;
                    window.history.pushState({}, '', newUrl);
                    
                    if (onNewConversation) {
                      onNewConversation(data.conversation_id);
                    }
                  }
                  break;
  
                case 'status':
                  // ✅ ADD STATUS AS A TOOL STEP
                  allToolSteps.push({
                    type: 'status',
                    name: 'Analysis',
                    message: data.message,
                    status: data.status,
                    timestamp: Date.now()
                  });
                  
                  setStreamingMessage({
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps], // Show all accumulated steps
                    imageUrl: finalImageUrl,
                    isLogo: finalIsLogo
                  });
                  break;
  
                case 'tool_start':
                  // ✅ ADD TOOL START AS A STEP
                  allToolSteps.push({
                    type: 'tool_start',
                    name: data.tool_name,
                    message: data.message,
                    status: 'running',
                    timestamp: Date.now()
                  });
                  
                  setStreamingMessage({
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    imageUrl: finalImageUrl,
                    isLogo: finalIsLogo
                  });
                  break;
  
                case 'tool_result':
                  // ✅ UPDATE THE LAST TOOL TO COMPLETED
                  const lastToolIndex = allToolSteps.length - 1;
                  if (lastToolIndex >= 0 && allToolSteps[lastToolIndex].name === data.tool_name) {
                    allToolSteps[lastToolIndex] = {
                      ...allToolSteps[lastToolIndex],
                      status: 'completed',
                      resultMessage: data.message,
                      data: data.data
                    };
                  } else {
                    // Fallback: add as new step if not found
                    allToolSteps.push({
                      type: 'tool_result',
                      name: data.tool_name,
                      message: data.message,
                      status: 'completed',
                      data: data.data,
                      timestamp: Date.now()
                    });
                  }
                  
                  setStreamingMessage({
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    imageUrl: finalImageUrl,
                    isLogo: finalIsLogo
                  });
                  break;
  
                case 'message_chunk':
                  currentText = data.text;
                  
                  setStreamingMessage({
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    imageUrl: finalImageUrl,
                    isLogo: finalIsLogo
                  });
                  break;
  
                case 'message':
                  currentText = data.text;
                  
                  // Add final message to chat
                  setMessages(prevMessages => [
                    ...prevMessages,
                    {
                      sender: "ai",
                      text: currentText,
                      toolSteps: [...allToolSteps], // Include all tool steps
                      status: 'complete'
                    }
                  ]);
                  setStreamingMessage(null);
                  break;
  
                case 'asset_generated':
                  currentText = data.message;
                  finalImageUrl = data.image_url;
                  finalIsLogo = true;
                  
                  // Add final asset message to chat
                  setMessages(prevMessages => [
                    ...prevMessages,
                    {
                      sender: "ai",
                      text: currentText,
                      imageUrl: finalImageUrl,
                      isLogo: finalIsLogo,
                      toolSteps: [...allToolSteps], // Include all tool steps
                      status: 'complete'
                    }
                  ]);
                  setStreamingMessage(null);
                  break;
  
                case 'error':
                  currentText = data.message;
                  
                  setMessages(prevMessages => [
                    ...prevMessages,
                    {
                      sender: "ai",
                      text: currentText,
                      toolSteps: [...allToolSteps],
                      status: 'error',
                      isError: true
                    }
                  ]);
                  setStreamingMessage(null);
                  break;
  
                case 'complete':
                  setIsStreaming(false);
                  if (onRefreshConversations) {
                    onRefreshConversations();
                  }
                  break;
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e);
            }
          }
        }
      }
  
    } catch (error) {
      console.error(`❌ Error with streaming ${aiName} API:`, error);
      setIsStreaming(false);
      setStreamingMessage(null);
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
          jsonResponse = JSON.parse(aiResponse);
          isValidJson = true;
          console.log('✅ Parsed JSON response (option):', jsonResponse);
        } catch (err) {
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
              options: isValidJson && jsonResponse.options ? jsonResponse.options : [],
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
  }, [aiTyping, pendingAiMsg]);

  useEffect(() => {
    getBrandDesignData();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, aiLoading]);

  const allMessages = [
    ...messages,
    ...(streamingMessage ? [streamingMessage] : [])
  ];

  return (
    <div className=" flex flex-col mt-[80px]  max-w-[1280px] w-full mx-auto justify-between">
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
            isLogo={msg.isLogo || false}
            status={msg.status}
            toolInfo={msg.toolInfo}
            toolSteps={msg.toolSteps} 
            isStreaming={msg === streamingMessage}
            thinkingProcess={msg.thinkingProcess}
            isError={msg.isError}   
          />
        ))}
      </div>
      <MessageInput placeholder={placeholder} suggestions={suggestions} onSend={handleSendWithStreaming} />
    </div>
  );
}