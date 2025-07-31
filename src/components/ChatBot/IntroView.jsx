"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MessageInput from "./MessageInput";

const suggestionQuestions = [
  "What can I do with Allmyai on the free plan?",
  "How do I get started with manual tools?",
  "Which AI assistant is right for my task?",
];

export default function IntroView({ 
  input, 
  setInput, 
  onSubmit, 
  onSuggestionClick, 
  isLoading 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 h-[520px] p-6 flex flex-col"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center flex justify-center items-center flex-col mb-8"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <Image
            src={"/Chatbot/ai.svg"}
            alt="Ai Assistant"
            width={120}
            height={120}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-2xl font-semibold text-[#C209C1] mb-3"
        >
          Hi, I am Ann 👋🏻
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-[#1B1F3B] font-medium mb-3 text-[14px] leading-relaxed"
        >
          I'm your onboarding assistant — here to guide you through Allmyai.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-[#68686B] text-sm font-normal leading-relaxed"
        >
          Tell me what you're working on, or choose a question below to begin
          your journey with Allmyai.
        </motion.p>
      </motion.div>

      <div className="space-y-3 mb-8">
        {suggestionQuestions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.7 + index * 0.1, 
              duration: 0.3,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(139, 69, 19, 0.05)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(question)}
            className="w-full p-4 text-left bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 text-sm font-medium text-[#1B1F3B] border border-gray-100 hover:border-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {question}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.3 }}
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
