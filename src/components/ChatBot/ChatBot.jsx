"use client";

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

      {chatState !== "closed" && (
        <div className="w-[520px]  h-[756px] bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-5 fade-in">
          <ChatHeader chatState={chatState} onBackToIntro={handleBackToIntro} />

          <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/30 to-white">
            {chatState === "intro" && (
              <IntroView
                input={input}
                setInput={setInput}
                onSubmit={handleSubmit}
                onSuggestionClick={handleSuggestionClick}
                isLoading={isLoading}
              />
            )}

            {chatState === "chat" && (
              <ChatView
                messages={messages}
                isLoading={isLoading}
                input={input}
                setInput={setInput}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      )}

      <ChatToggleButton
        isOpen={chatState !== "closed"}
        onOpen={handleOpenChat}
        onClose={handleCloseChat}
      />
    </div>
  );
}
