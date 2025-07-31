"use client";

import { motion, AnimatePresence } from "framer-motion";
import WelcomeMessage from "./WelcomeMessage";
import ChatHeader from "./ChatHeader";
import IntroView from "./IntroView";
import ChatView from "./ChatView";
import ChatToggleButton from "./ChatToggleButton";
import { useChatLogic } from "./useChatLogic";

export default function DesignChatbot() {
  const {
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
  } = useChatLogic();

  return (
    <div
      className={`fixed ${
        chatState === "chat" ? "!max-h-[756px]" : ""
      } flex bottom-26 justify-center  items-center right-4 z-50`}
    >
      <WelcomeMessage isVisible={showWelcome && chatState === "closed"} />

      <AnimatePresence mode="wait">
        {chatState !== "closed" && (
          <motion.div
            key="chatbot-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="w-[520px]  h-[756px] bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden"
          >
            <ChatHeader chatState={chatState} onBackToIntro={handleBackToIntro} />

            <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/30 to-white">
              <AnimatePresence mode="wait">
                {chatState === "intro" && (
                  <IntroView
                    key="intro-view"
                    input={input}
                    setInput={setInput}
                    onSubmit={handleSubmit}
                    onSuggestionClick={handleSuggestionClick}
                    isLoading={isLoading}
                  />
                )}

                {chatState === "chat" && (
                  <ChatView
                    key="chat-view"
                    messages={messages}
                    isLoading={isLoading}
                    input={input}
                    setInput={setInput}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatToggleButton
        isOpen={chatState !== "closed"}
        onOpen={handleOpenChat}
        onClose={handleCloseChat}
      />
    </div>
  );
}
