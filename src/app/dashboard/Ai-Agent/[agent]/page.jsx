"use client";
import Navbar from "@/components/common/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Chatbot from "@/components/ai/Chatbot";
import { notFound } from "next/navigation";
import aiBots from "@/data/index";
import Sidebar from "@/components/ai/Sidebar";
import { useUserStore } from "@/store/store";

const page = () => {
  const { agent } = useParams();
  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const agents = {
    "zara": "brand-designer"
  }

  const [conversations, setConversations] = useState([]);

  const {UserId, isAuthChecking} = useUserStore();

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
      <Sidebar img={bot.img} aiName={bot.name} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} conversations={conversations} />
      
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
        />
      </div>
    </div>
  );
};

export default page;
