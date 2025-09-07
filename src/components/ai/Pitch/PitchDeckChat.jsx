import React from "react";
import MessageInput from "../MessageInput";
import MessageBubble from "../MessageBubble";

const PitchDeckChat = ({ messages = [], onSendMessage, isStreaming, chatContainerRef }) => {
  // Filter out empty messages
  const validMessages = messages.filter(msg => msg && msg.text);

  const handleSend = (text) => {
    if (onSendMessage) {
      onSendMessage({
        text,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  return (
    <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg font-medium text-gray-800">Pitch Deck Assistant</h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
        style={{ maxHeight: "calc(100vh - 250px)" }}
      >
        {validMessages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            aiIcon="/pitch-deck-icon.png" // Update with your icon
            options={msg.options || []}
            isLoading={msg.isLoading}
            isStreaming={msg === messages[messages.length - 1] && isStreaming}
            thinkingProcess={msg.thinkingProcess}
            searchResults={msg.searchResults}
            inspirationImages={msg.inspirationImages}
            toolSteps={msg.toolSteps}
            status={msg.status}
            isError={msg.isError}
            timestamp={msg.timestamp}
            slidesUrl={msg.slidesUrl}
            businessInfo={msg.businessInfo}
          />
        ))}
      </div>

      <div className="p-4 border-t bg-white">
        <MessageInput
          placeholder="Ask about your pitch deck..."
          onSend={handleSend}
          suggestions={[
            "Create a startup investor pitch",
            "Design a product launch presentation",
            "Make a business plan pitch deck"
          ]}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
};

export default PitchDeckChat;