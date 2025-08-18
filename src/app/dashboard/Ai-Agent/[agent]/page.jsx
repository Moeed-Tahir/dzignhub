"use client";
import Navbar from "@/components/common/Navbar";
import React, { useState, useEffect } from "react";

import Chatbot from "@/components/ai/Chatbot";
import { notFound } from "next/navigation";
import aiBots from "@/data/index";
import Sidebar from "@/components/ai/Sidebar";
import { useUserStore } from "@/store/store";
import { useParams, useSearchParams } from "next/navigation"; 

const page = () => {
  const { agent } = useParams();
  const searchParams = useSearchParams(); 
  
  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const agents = {
    "zara": "brand-designer"
  }

  const [conversations, setConversations] = useState([]);

  const { UserId, isAuthChecking } = useUserStore();
  const [activeChat, setActiveChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const conversationId = searchParams.get('conversationId');
    if (conversationId) {
      console.log("Found conversationId in URL:", conversationId);
      setActiveChat(conversationId);
      setShowIntro(false); // Hide intro when loading a specific conversation
      
      // Fetch messages for this conversation if we have conversations loaded
      if (conversations.length > 0) {
        fetchMessages(conversationId);
      }
    }
  }, [searchParams, conversations]);



  // Set sidebar open only on desktop screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const parseAssetGeneratedMessage = (message) => {
    if (message.sender !== 'user' && message.text && 
      (message.text.startsWith('ASSET_GENERATED|') || message.text.startsWith('LOGO_GENERATED|'))) {
      const parts = message.text.split('|');
      const imageUrl = parts[1];
      const messageText = parts[2] || '';

      // Determine asset type from URL or message context
      const isLogo = messageText.toLowerCase().includes('logo') ||
        imageUrl.includes('logo') ||
        messageText.toLowerCase().includes('brand');

      return {
        ...message,
        text: messageText,
        imageUrl: imageUrl,
        isLogo: isLogo
      };
    }
    return message;
  };

  const fetchMessages = async (conversationId, userId = null) => {
    try {
      let verification = await verifyTokenForFetchingMessages();
      if (verification === null) {
        console.error("User ID verification failed, cannot fetch messages.");
        return [];
      }
      const userIdToUse = verification;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/${conversationId}/messages?user_id=${userIdToUse}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const parsedMessages = data.messages.map(parseAssetGeneratedMessage);
        setMessages(parsedMessages);
        console.log(`Loaded ${data.count} messages for conversation ${conversationId}`);
      } else {
        console.error('Failed to fetch messages:', data.error);
        setMessages([]);

      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };


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
        return data.user._id;
      }
    } catch (error) {
      console.error("Token verification failed", error);
      return null;
    }
  };


  // Fetch conversations function
  const fetchConversations = async (userId) => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/single-agent/${agents[agent]}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      console.log('Conversations data:', data);
      if (data.success) {
        console.log(data.conversations);
        setConversations(data.conversations);
        console.log(`Loaded ${data.count} conversations`);
      } else {
        console.error('Failed to fetch conversations:', data.error);
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    }
  };

  // Add these functions to your page.jsx component
const handleNewConversation = (conversationId) => {
  console.log("[DEBUG] Handling new conversation:", conversationId);
  setActiveChat(conversationId);
  setShowIntro(false);
  
  // Refresh conversations list
  if (UserId) {
    fetchConversations(UserId);
  }
};

const refreshConversationsList = () => {
  if (UserId) {
    fetchConversations(UserId);
  }
};

// Add these to your page.jsx component before the return statement


  // Load bot and conversations
  useEffect(() => {
    const timer = setTimeout(async () => {
      const fetchedBot = aiBots[agent];
      if (!fetchedBot) return notFound();

      setBot(fetchedBot);


      const userId = UserId;
      console.log("User ID:", userId);

      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          await verifyToken();
        }
      };

      checkAuth();


      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [agent]);

  const verifyToken = async () => {
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
        fetchConversations(data.user._id)
      }
    } catch (error) {
      console.error("Token verification failed", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F7F8F8]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#C209C1] rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500">Loading AI assistant...</p>
      </div>
    );
  }

  if (!bot) {
    return notFound();
  }

  return (
    <div className="bg-[#F7F8F8] px-5 xl:px-0 max-w-[1440px] mx-auto min-h-screen">
          setMessages={setMessages}
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} img={bot.img} aiName={bot.name} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} conversations={conversations} onConversationSelect={fetchMessages} setShowIntro={setShowIntro}  setMessages={setMessages} setConversations={setConversations} />

      {/* Mobile menu button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-32 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow md:hidden"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className={`flex relative transition-all duration-300 min-h-screen flex-col
        ${isSidebarOpen ? 'md:ml-[320px] md:w-[calc(100%-320px)]' : 'md:ml-[64px] md:w-[calc(100%-64px)]'}
        w-full
      `}>
        <Navbar isSettingPage={true} />
        {/* <div className="relative flex gap-2">
        <Image
        src={"/Ai/chat.svg"}
        alt=""
        width={44}
        height={44}
        className="aboslute top-0 cursor-pointer right-0 "
        />
        <Image
        src={"/Ai/edit.svg"}
        alt=""
        width={44}
        height={44}
        className="aboslute top-0 cursor-pointer right-0 "
        />
        </div> */}
        <Chatbot
          aiName={bot.name}
          tagline={bot.tagline}
          description={bot.description}
          suggestions={bot.suggestions}
          placeholder={bot.placeholder}
          img={bot.img}
          messages={messages}
          setMessages={setMessages}
          showIntro={showIntro}
          setShowIntro={setShowIntro}
          onNewConversation={handleNewConversation}          // Pass callback
  onRefreshConversations={refreshConversationsList}  // Pass callback

        />
      </div>
    </div>
  );
};

export default page;
