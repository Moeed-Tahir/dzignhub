"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PitchDeckChat from "./PitchDeckChat";
import PitchDeckPreview from "./PitchDeckPreview";
import { useUserStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

const PitchDeckLayout = ({ initialPrompt, selectedTemplate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [finalMessageQueue, setFinalMessageQueue] = useState(null);
  const chatContainerRef = useRef(null);
  
  // State for preserving data across streaming
  const [currentSearchResults, setCurrentSearchResults] = useState(null);
  const [currentInspirationImages, setCurrentInspirationImages] = useState(null);
  const [currentThinkingProcess, setCurrentThinkingProcess] = useState(null);
  const [currentSlidesUrl, setCurrentSlidesUrl] = useState(null);

  const [slidesUrl, setSlidesUrl] = useState("https://assets.api.gamma.app/export/pptx/ys1yds84h2jj5ch/1f4cb29b0c50577e5cf38f5af5d8e536/EnKodex.pptx");
  
  const searchParams = useSearchParams();
  const { UserId, SetUserId } = useUserStore();

  // Initialize messages with the prompt
  useEffect(() => {
    if (initialPrompt) {
      setMessages([
        {
          id: 1,
          text: initialPrompt,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          id: 2,
          text: "I'll help you create an amazing presentation! Let me analyze your request and start working on your slides.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      
      // If we have an initial prompt, trigger the streaming process automatically
      if (initialPrompt.trim()) {
        handleSendWithStreaming(initialPrompt);
      }
    }
  }, [initialPrompt]);

  // Handle completion logic in useEffect to avoid race conditions
  useEffect(() => {
    if (isCompleting && finalMessageQueue) {
      console.log('[DEBUG] Processing final message in useEffect');

      // Add the final message to messages
      setMessages(prevMessages => [...prevMessages, finalMessageQueue]);

      // If there's a slides URL in the message, update slides
      if (finalMessageQueue.slidesUrl) {
        const newSlide = {
          id: slides.length + 1,
          title: `Generated Pitch Deck`,
          content: finalMessageQueue.slidesUrl,
          type: "gamma",
          url: finalMessageQueue.slidesUrl
        };
        setSlides(prev => [...prev, newSlide]);
        setCurrentSlide(slides.length);
      }

      // Clear the queue and reset flags
      setFinalMessageQueue(null);
      setTimeout(() => setIsCompleting(false), 100);
    }
  }, [isCompleting, finalMessageQueue, slides.length]);

  // Get conversation ID from URL on component mount
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

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const verifyTokenForFetchingMessages = async () => {
    try {
      console.log("Token verification started");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("Token verification response:", data);

      if (data.type === "success") {
        console.log("Token is valid, user ID:", data.user._id);
        SetUserId(data.user._id);
        return data.user._id;
      }
    } catch (error) {
      console.error("Token verification failed", error);
      return null;
    }
  };

  const generateImmediateResponse = async (userInput) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/generate-immediate-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      return data.success ? data.response : generatePitchDeckFallbackResponse(userInput);
    } catch (error) {
      console.warn('[DEBUG] Response failed, using fallback:', error.message);
      return generatePitchDeckFallbackResponse(userInput);
    }
  };

  const generatePitchDeckFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('startup')) {
      return "📊 I'll help create a compelling startup pitch deck for investors. Let me analyze your business...";
    } else if (input.includes('investor')) {
      return "💼 I'll create an investor pitch deck that highlights your business potential. Analyzing requirements...";
    } else if (input.includes('product')) {
      return "🚀 I'll design a product presentation that showcases your features and benefits...";
    } else {
      return "📝 I'm analyzing your pitch deck requirements and will create the perfect presentation for your needs...";
    }
  };

  const handleSendWithStreaming = async (msg) => {
    // Variables to store data outside streaming loop
    let preservedSearchResults = null;
    let preservedInspirationImages = null;
    let preservedThinkingProcess = null;
    let preservedSlidesUrl = null;

    console.log('[DEBUG] Starting handleSendWithStreaming with message:', msg);
    console.log('[DEBUG] Current messages before adding user message:', messages);

    const userMessage = { sender: "user", text: msg, timestamp: new Date().toLocaleTimeString() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setIsStreaming(true);
    setStreamingMessage(null);

    // Initialize accumulation variables
    let allToolSteps = []; // This will accumulate ALL tool steps
    let currentText = await generateImmediateResponse(msg);
    let finalSlidesUrl = null;
    let businessInfo = {};

    // SET INITIAL STREAMING MESSAGE
    setStreamingMessage({
      sender: "ai",
      text: currentText,
      toolSteps: [], // Start empty, will accumulate
      thinkingProcess: null,
      searchResults: null,
      inspirationImages: null,
      slidesUrl: null,
      status: 'processing',
      timestamp: new Date().toLocaleTimeString()
    });

    try {
      console.log(`🚀 Starting streaming with pitch-deck Python API...`);
      console.log(`🔍 Current conversationId: ${conversationId}`);

      const pythonApiUrl = process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://127.0.0.1:8000";
      const userId = await verifyTokenForFetchingMessages();

      if (!userId) {
        throw new Error("Failed to verify user token");
      }

      const requestBody = {
        prompt: msg,
        user_id: userId,
        conversation_id: conversationId || null,
        selectedTemplate: selectedTemplate || "oasis"
      };
      console.log('[DEBUG] Request body:', requestBody);

      const response = await fetch(`${pythonApiUrl}/agents/pitch-deck/stream`, {
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

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log('📡 Streaming data:', data.type);

              switch (data.type) {
                case 'thinking_start':
                  // Only update text, keep all previous tools
                  currentText = data.message;

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // PRESERVE all previous tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: 'thinking',
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'thinking_process':
                  console.log('🧠 Received thinking_process:', data);

                  // PRESERVE: Store thinking data
                  const thinkingData = {
                    thinking: data.thinking,
                    reasoning: data.reasoning,
                    analysis: data.analysis,
                    plan: data.plan,
                    slide_strategy: data.slide_strategy,
                    key_slides: data.key_slides,
                    narrative_flow: data.narrative_flow
                  };

                  preservedThinkingProcess = thinkingData;
                  setCurrentThinkingProcess(thinkingData);

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // PRESERVE all tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'conversation_info':
                  if (data.is_new_conversation && data.conversation_id) {
                    setConversationId(data.conversation_id);
                    const newUrl = `${window.location.pathname}?conversationId=${data.conversation_id}`;
                    window.history.pushState({}, '', newUrl);
                  }
                  break;

                case 'status':
                  // ACCUMULATE: Add status as a tool step
                  allToolSteps.push({
                    type: 'status',
                    name: 'Analysis',
                    message: data.message,
                    status: data.status,
                    timestamp: Date.now()
                  });

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // SHOW accumulated tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'tool_start':
                  // ACCUMULATE: Add new tool to the array
                  allToolSteps.push({
                    type: 'tool_start',
                    name: data.tool_name,
                    message: data.message,
                    status: 'running',
                    timestamp: Date.now()
                  });

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // SHOW accumulated tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'tool_result':
                  // ACCUMULATE: Update corresponding tool or add new one
                  const toolIndex = allToolSteps.findIndex(
                    tool => tool.name === data.tool_name && tool.status === 'running'
                  );

                  if (toolIndex >= 0) {
                    allToolSteps[toolIndex] = {
                      ...allToolSteps[toolIndex],
                      status: 'completed',
                      resultMessage: data.message,
                      data: data.data
                    };
                  } else {
                    allToolSteps.push({
                      type: 'tool_result',
                      name: data.tool_name,
                      message: data.message,
                      status: 'completed',
                      data: data.data,
                      timestamp: Date.now()
                    });
                  }

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // SHOW all accumulated tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'message_chunk':
                  currentText = data.text;

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'web_search_complete':
                  console.log('[DEBUG] === WEB SEARCH COMPLETE ===');
                  console.log('[DEBUG] Received data.data:', data.data);
                  console.log('[DEBUG] data.data.results length:', data.data?.results?.length);

                  // PRESERVE: Store search results
                  preservedSearchResults = data.data;
                  setCurrentSearchResults(data.data);

                  // ACCUMULATE: Update the corresponding tool to completed
                  const searchToolIndex = allToolSteps.findIndex(
                    tool => tool.name === data.tool_name && tool.status === 'running'
                  );

                  if (searchToolIndex >= 0) {
                    allToolSteps[searchToolIndex] = {
                      ...allToolSteps[searchToolIndex],
                      status: 'completed',
                      resultMessage: data.message,
                      data: data.data
                    };
                  } else {
                    // Fallback: add as new tool if not found
                    allToolSteps.push({
                      type: 'tool_result',
                      name: data.tool_name,
                      message: data.message,
                      status: 'completed',
                      data: data.data,
                      timestamp: Date.now()
                    });
                  }

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // SHOW all accumulated tools
                    searchResults: preservedSearchResults, // ADD search results
                    thinkingProcess: preservedThinkingProcess,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'inspiration_images':
                  // PRESERVE: Store inspiration images
                  preservedInspirationImages = data.images;
                  setCurrentInspirationImages(data.images);

                  // UPDATE: Don't include images in the text message
                  currentText = data.message; // Just the message, not the images data

                  // ACCUMULATE: Update the corresponding tool to completed
                  const inspirationToolIndex = allToolSteps.findIndex(
                    tool => tool.name === data.tool_name && tool.status === 'running'
                  );

                  if (inspirationToolIndex >= 0) {
                    allToolSteps[inspirationToolIndex] = {
                      ...allToolSteps[inspirationToolIndex],
                      status: 'completed',
                      resultMessage: data.message,
                      data: data.images
                    };
                  } else {
                    // Fallback: add as new tool if not found
                    allToolSteps.push({
                      type: 'tool_result',
                      name: data.tool_name,
                      message: data.message,
                      status: 'completed',
                      data: data.images,
                      timestamp: Date.now()
                    });
                  }

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps], // SHOW all accumulated tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages, // ADD inspiration images
                    slidesUrl: preservedSlidesUrl,
                    status: data.status,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'message':
                  console.log('[DEBUG] === MESSAGE CASE RECEIVED ===');
                  console.log('[DEBUG] Message data:', data);
                  currentText = data.text;

                  const messageUpdate = {
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    slidesUrl: preservedSlidesUrl,
                    status: data.status || 'awaiting_input',
                    timestamp: new Date().toLocaleTimeString()
                  };

                  console.log('[DEBUG] Setting streaming message with:', messageUpdate);
                  setStreamingMessage(messageUpdate);
                  break;

                case 'slides_generated':
                  console.log('[DEBUG] Slides generated case triggered');

                  currentText = data.message;
                  finalSlidesUrl = data.slides_url;
                  preservedSlidesUrl = data.slides_url;
                  setCurrentSlidesUrl(data.slides_url);
                  businessInfo = data.business_info || {};

                  // ACCUMULATE: Keep all tools and add slides
                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    slidesUrl: finalSlidesUrl,
                    businessInfo: businessInfo,
                    toolSteps: [...allToolSteps], // PRESERVE all tools
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    status: 'slides_generated',
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  
                  // Add a new slide with the generated URL
                  const newSlide = {
                    id: slides.length + 1,
                    title: `Generated Pitch Deck`,
                    content: finalSlidesUrl,
                    type: "gamma", 
                    url: finalSlidesUrl
                  };
                  setSlides(prev => [...prev, newSlide]);
                  setCurrentSlide(slides.length); // Navigate to the new slide
                  break;

                case 'error':
                  currentText = data.message;

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    status: 'error',
                    isError: true,
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'awaiting_input':
                  currentText = data.message;

                  setStreamingMessage(prevMessage => ({
                    ...prevMessage,
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: preservedThinkingProcess,
                    searchResults: preservedSearchResults,
                    inspirationImages: preservedInspirationImages,
                    status: 'awaiting_input',
                    timestamp: new Date().toLocaleTimeString()
                  }));
                  break;

                case 'complete':
                  console.log('[DEBUG] === COMPLETE CASE RECEIVED ===');

                  if (data.message) {
                    currentText = data.message;
                  }

                  setSlidesUrl(data.final_data?.slides_url || finalSlidesUrl);

                  // CONSTRUCT FINAL AI MESSAGE
                  const finalAIMessage = {
                    sender: "ai",
                    text: currentText,
                    toolSteps: [...allToolSteps],
                    thinkingProcess: preservedThinkingProcess || currentThinkingProcess,
                    searchResults: data.final_data?.search_results
                      ? { keywords: data.final_data.search_keywords, results: data.final_data.search_results }
                      : preservedSearchResults,
                    inspirationImages: data.final_data?.inspiration_images || preservedInspirationImages,
                    slidesUrl: data.final_data?.slides_url || finalSlidesUrl || preservedSlidesUrl,
                    businessInfo: data.final_data?.business_info || businessInfo,
                    status: 'complete',
                    timestamp: new Date().toLocaleTimeString()
                  };

                  // SET COMPLETING FLAG AND CLEAR STREAMING STATE FIRST
                  setIsCompleting(true);
                  setIsStreaming(false);
                  setStreamingMessage(null);

                  // QUEUE THE FINAL MESSAGE (useEffect will handle adding it)
                  setFinalMessageQueue(finalAIMessage);

                  break;
                default:
                  console.log('[DEBUG] Unhandled event type:', data.type);
                  break;
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error with streaming Pitch Deck API:`, error);
      setIsStreaming(false);
      setStreamingMessage(null);

      // ENSURE USER MESSAGE IS PRESERVED EVEN ON ERROR
      setMessages(prevMessages => {
        console.log('[DEBUG] Error handler - prevMessages:', prevMessages);
        return [
          ...prevMessages, // This should include the user message
          {
            sender: "ai",
            text: "I'm experiencing some technical difficulties. Please try again in a moment.",
            isError: true,
            timestamp: new Date().toLocaleTimeString()
          }
        ];
      });
    }
  };

  const handleMessageSent = (message) => {
    console.log("Message sent:", message);
    handleSendWithStreaming(message.text);
  };

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Combine normal messages with streaming message
  const allMessages = React.useMemo(() => {
    let combinedMessages = [...messages];
  
    if (streamingMessage && isStreaming && !isCompleting) {
      combinedMessages = [...combinedMessages, streamingMessage];
    } else if (streamingMessage && !isStreaming && !isCompleting) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.sender !== 'ai' || lastMessage.status !== 'complete') {
        combinedMessages = [...combinedMessages, streamingMessage];
      }
    }
  
    return combinedMessages;
  }, [messages, streamingMessage, isStreaming, isCompleting]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-[calc(100vh-120px)] pl-[70px] mt-20 gap-4"
    >
      <PitchDeckChat
        messages={allMessages}
        onSendMessage={handleMessageSent}
        isStreaming={isStreaming}
        chatContainerRef={chatContainerRef}
      />

      <PitchDeckPreview
        slides={slides}
        slideUrl={slidesUrl}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />
    </motion.div>
  );
};

export default PitchDeckLayout;