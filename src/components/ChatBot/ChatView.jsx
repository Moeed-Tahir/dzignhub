"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex p-3 !max-h-[520px] overflow-y-scroll flex-col"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <Message key={message.id} message={message} index={index} />
        ))}
        {isLoading && <LoadingIndicator />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <MessageInput
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </motion.div>
    </motion.div>
  );
}
