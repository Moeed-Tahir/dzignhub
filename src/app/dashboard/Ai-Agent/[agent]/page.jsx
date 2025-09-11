"use client";

import InviteModal from "@/components/ai/InviteModal";
import PublishModal from "@/components/ai/PublishModal";
import React, { useState, useEffect } from "react";

import Chatbot from "@/components/ai/Chatbot";
import { notFound } from "next/navigation";
import aiBots from "@/data/index";
import Sidebar from "@/components/ai/Sidebar";
import { useUserStore } from "@/store/store";
import { useParams, useSearchParams } from "next/navigation";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import Globe from "@/app/assets/globe";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import HistoryModal from "@/components/ai/HistoryModal";
import { ModernInput } from "@/components/landing/MessageInput";
import Template from "@/components/ai/Template";
import PitchDeckLayout from "@/components/ai/Pitch/PitchDeckLayout";
import { FashioAiSidebar } from "@/components/ai/FashionAiSidebar";
import FashionPreview from "@/components/ai/FashionPreview";

const page = () => {
  const { agent } = useParams();
  const searchParams = useSearchParams();

  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplateName] = useState("");

  const agents = {
    zara: "brand-designer",
    sana: "content-creator",
    novi: "seo-specialist",
    mira: "strategist",
    "pitch-deck": "pitch-deck",
    "super-agent": "super-agent",
  };

  const [conversations, setConversations] = useState([]);

  const { UserId, isAuthChecking, SetUserId } = useUserStore();
  const [activeChat, setActiveChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const inviteModalRef = React.useRef(null);
  const inviteButtonRef = React.useRef(null);
  const publishModalRef = React.useRef(null);
  const publishButtonRef = React.useRef(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const historyModalRef = React.useRef(null);
  const [selectedTemplateImage, setSelectedTemplateImage] = useState(null);
  const [showTemplate, setShowTemplate] = useState(true);
  const [hasPromptEntered, setHasPromptEntered] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");

  // Handle prompt submission to hide template with animation
  const handlePromptSubmit = (prompt) => {
    if (prompt.trim()) {
      setHasPromptEntered(true);
      setShowTemplate(false);
      setInitialPrompt(prompt);
    }
  };

  // Close InviteModal when clicking outside, but ignore clicks on the button
  // Close HistoryModal when clicking outside
  useEffect(() => {
    if (!isHistoryModalOpen) return;
    function handleClickOutside(event) {
      if (
        historyModalRef.current &&
        !historyModalRef.current.contains(event.target)
      ) {
        setIsHistoryModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHistoryModalOpen]);
  useEffect(() => {
    if (!showInviteModal) return;
    function handleClickOutside(event) {
      if (
        inviteModalRef.current &&
        !inviteModalRef.current.contains(event.target) &&
        inviteButtonRef.current &&
        !inviteButtonRef.current.contains(event.target)
      ) {
        setShowInviteModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInviteModal]);

  // Close PublishModal when clicking outside, but ignore clicks on the button
  useEffect(() => {
    if (!showPublishModal) return;
    function handleClickOutside(event) {
      if (
        publishModalRef.current &&
        !publishModalRef.current.contains(event.target) &&
        publishButtonRef.current &&
        !publishButtonRef.current.contains(event.target)
      ) {
        setShowPublishModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPublishModal]);

  useEffect(() => {
    const conversationId = searchParams.get("conversationId");

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
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const parseAssetGeneratedMessage = (message) => {
    // ✅ ONLY PARSE AI MESSAGES (skip user messages)
    if (message.sender !== "user") {
      // ✅ CHECK FOR RICH DATA FIELDS (new DB structure)
      if (
        message.toolSteps ||
        message.thinkingProcess ||
        message.searchResults ||
        message.inspirationImages ||
        message.imageUrl
      ) {
        return {
          ...message, // Include all fields from DB
          // ✅ ENSURE RICH FIELDS ARE SET (with fallbacks)
          toolSteps: message.toolSteps || [],
          thinkingProcess: message.thinkingProcess || {},
          searchResults: message.searchResults || null,
          inspirationImages: message.inspirationImages || [],
          imageUrl: message.imageUrl || null,
          isLogo: message.isLogo || false,
          status: message.status || "complete",
        };
      }

      // ✅ FALLBACK: Handle old parsing for legacy AI messages
      if (
        message.text &&
        (message.text.startsWith("ASSET_GENERATED|") ||
          message.text.startsWith("LOGO_GENERATED|"))
      ) {
        const parts = message.text.split("|");
        const imageUrl = parts[1];
        const messageText = parts[2] || "";
        const isLogo =
          message.text.startsWith("LOGO_GENERATED|") ||
          messageText.toLowerCase().includes("logo");

        return {
          ...message,
          text: messageText,
          imageUrl: imageUrl,
          isLogo: isLogo,
        };
      }
    }

    // ✅ RETURN USER MESSAGES OR NON-PARSED AI MESSAGES AS-IS
    return message;
  };

  // In your page.jsx, update the fetchMessages function:

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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const parsedMessages = data.messages.map((msg) => {
          const parsedMsg = parseAssetGeneratedMessage(msg);
          return parsedMsg;
        });

        // Update the messages state
        setMessages(parsedMessages);
        console.log(
          `Loaded ${data.count} messages for conversation ${conversationId}`
        );

        // Return the messages for the callback
        return parsedMessages;
      } else {
        console.error("Failed to fetch messages:", data.error);
        setMessages([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
      return [];
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
        SetUserId(data.user._id);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/agents/conversations/single-agent/${agents[agent]}/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Conversations data:", data);
      if (data.success) {
        console.log(data.conversations);
        setConversations(data.conversations);
        console.log(`Loaded ${data.count} conversations`);
      } else {
        console.error("Failed to fetch conversations:", data.error);
        setConversations([]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setConversations([]);
    }
  };

  // Add these functions to your page.jsx component
  const handleNewConversation = (conversationId) => {
    console.log("[DEBUG] Handling new conversation:", conversationId);
    setActiveChat(conversationId);
    setShowIntro(false);

    fetchMessages(conversationId);

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
        fetchConversations(data.user._id);
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

  const router = useRouter();

  const renderContent = () => {
    if (bot.name !== "Pitch Deck" && bot.name !== "Fashion Ai") {
      return (
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
          onNewConversation={handleNewConversation}
          onRefreshConversations={refreshConversationsList}
          fetchMessages={fetchMessages}
        />
      );
    }

    if (bot.name === "Fashion Ai") {
      return (
        <div className="flex  pl-[70px] gap-6 pt-20">
          <FashioAiSidebar />
          <div className="flex-1 h-full">
            <FashionPreview />
          </div>
        </div>
      );
    }

    return (
      <div>
        {showTemplate && (
          <div className="flex justify-center items-center flex-col gap-6 mt-20">
            <p className="text-[34px] font-semibold">
              Ready to create your slides?
            </p>
            <ModernInput
              isAi={true}
              selectedTemplateImage={selectedTemplateImage}
              onTemplateRemove={() => setSelectedTemplateImage(null)}
              onPromptSubmit={handlePromptSubmit}
            />
          </div>
        )}
        <AnimatePresence mode="wait">
          {showTemplate && (
            <motion.div
              key="template"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
            >
              <Template
                setSelectedTemplateName={setSelectedTemplateName}
                onTemplateSelect={setSelectedTemplateImage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!showTemplate && hasPromptEntered && (
          <PitchDeckLayout
            selectedTemplate={selectedTemplate}
            messages={messages}
            setMessages={setMessages}
            onNewConversation={handleNewConversation}
            onRefreshConversations={refreshConversationsList}
            fetchMessages={fetchMessages}
            initialPrompt={initialPrompt}
            onConversationLoad={async (conversationId) => {
              await fetchMessages(conversationId);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#F7F8F8] overflow-hidden px-5 xl:px-0 max-w-[1440px] mx-auto min-h-screen">
      <Sidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        img={bot.img}
        aiName={bot.name}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        conversations={conversations}
        onConversationSelect={fetchMessages}
        setShowIntro={setShowIntro}
        setMessages={setMessages}
        setConversations={setConversations}
      />

      {/* Mobile menu button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-32 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow md:hidden"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      {isHistoryModalOpen && (
        <div ref={historyModalRef}>
          <HistoryModal
            setShowTemplate={setShowTemplate}
            setHasPromptEntered={setHasPromptEntered}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            img={bot.img}
            aiName={bot.name}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            conversations={conversations}
            onConversationSelect={fetchMessages}
            setShowIntro={setShowIntro}
            setMessages={setMessages}
            setConversations={setConversations}
            onClose={() => setIsHistoryModalOpen(false)}
          />
        </div>
      )}

      <div className="w-full mx-auto">
        <div className="flex justify-between absolute top-0 w-[80%] left-1/2 -translate-x-1/2 items-center py-4">
          <div className="flex relative gap-2">
            <div className="w-8 h-8 bg-white border border-[#E3E3E3] rounded-full  flex justify-center cursor-pointer items-center">
              <HiArrowLongLeft
                onClick={() => {
                  router.back();
                }}
                className="w-[18px] text-[#344054] h-[18px]"
              />
            </div>
            <div
              onClick={() => setIsHistoryModalOpen((prev) => !prev)}
              className="w-8 h-8 bg-white border border-[#E3E3E3] rounded-full  flex justify-center cursor-pointer items-center"
            >
              <IoIosMenu className="w-[18px] text-[#344054] h-[18px]" />
            </div>
          </div>

          <div className="flex gap-2 items-center ">
            <Image
              src={bot.img}
              alt={bot.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-[#202126] font-medium text-[14px]">{bot.name}</p>
          </div>

          <div className="flex relative ">
            <button
              ref={inviteButtonRef}
              className="bg-white rounded-[8px] h-[38px] w-[108px] justify-center flex items-center gap-2 border-[#202126] border"
              onClick={() => setShowInviteModal((prev) => !prev)}
            >
              <Image
                src={"/profile-add.svg"}
                alt={bot.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <p className="text-[#202126] text-[14px] font-medium">Invite</p>
            </button>
            <button
              ref={publishButtonRef}
              className="bg-[#C209C1] ml-2 rounded-[8px] h-[38px] w-[108px] justify-center flex items-center gap-2 "
              onClick={() => setShowPublishModal((prev) => !prev)}
            >
              <Globe fill="#ffffff" />
              <p className="text-white font-medium text-[14px]">Publish</p>
            </button>
            {showInviteModal && (
              <div ref={inviteModalRef}>
                <InviteModal
                  open={showInviteModal}
                  onClose={() => setShowInviteModal(false)}
                />
              </div>
            )}
            {showPublishModal && (
              <div ref={publishModalRef}>
                <PublishModal
                  open={showPublishModal}
                  onClose={() => setShowPublishModal(false)}
                />
              </div>
            )}
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default page;
