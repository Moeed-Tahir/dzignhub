import React from "react";
import MessageInput from "../MessageInput";
import MessageBubble from "../MessageBubble";

const PitchDeckChat = ({
  messages = [],
  onSendMessage,
  isStreaming,
  chatContainerRef,
}) => {
  // Filter out empty messages
  const validMessages = messages.filter((msg) => msg && msg.text);

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
    <div className="w-1/3 flex flex-col  justify-between  overflow-hidden">
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
            isPitch={true}
            aiIcon="/aiAgent/presention-chart.svg"
            bgColor={"EBF3F8"}
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

      <div className="px-4 ">
        <MessageInput
          isPitch={true}
          placeholder="Ask about your pitch deck..."
          onSend={handleSend}
          suggestions={[
            "Create a startup investor pitch",
            "Design a product launch presentation",
            "Make a business plan pitch deck",
          ]}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
};

export default PitchDeckChat;
