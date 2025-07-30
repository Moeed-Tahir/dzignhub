"use client";

import Message from "./Message";
import LoadingIndicator from "./LoadingIndicator";
import MessageInput from "./MessageInput";

export default function ChatView({ 
  messages, 
  isLoading, 
  input, 
  setInput, 
  onSubmit 
}) {
  return (
    <div className="flex-1 flex p-3 !max-h-[520px] overflow-y-scroll flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message key={message.id} message={message} index={index} />
        ))}
        {isLoading && <LoadingIndicator />}
      </div>

      <MessageInput
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
