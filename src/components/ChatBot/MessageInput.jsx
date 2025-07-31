"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MessageInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  placeholder = "Type your message...",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-4 absolute bottom-2 left-1/2 translate-x-[-50%] w-full"
    >
      <form onSubmit={onSubmit} className="relative">
        <motion.input
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pr-12 h-[64px] py-3 px-4 bg-[#F7F8F8] rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
        />
        <motion.button
          type="submit"
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="text-white bg-[#BDFF00] w-[40px] absolute right-2 top-1/2 translate-y-[-50%] h-[40px] rounded-full p-2"
        >
          <motion.div
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={isLoading ? { 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            } : { duration: 0.2 }}
          >
            <Image
              src="/Ai/direct-right.svg"
              width={40}
              height={40}
              alt="Send"
              className=""
            />
          </motion.div>
        </motion.button>
      </form>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-xs text-gray-500 text-center mt-2"
      >
        Dzignhub may display inaccurate info so double-check its responses.
      </motion.p>
    </motion.div>
  );
}
