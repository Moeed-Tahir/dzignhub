"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Message({ message, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "assistant" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
        >
          <Image
            src={"/Chatbot/ai.svg"}
            alt="Ai Assistant"
            width={32}
            height={32}
          />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className={`max-w-[80%] p-3 rounded-[12px] ${
          message.role === "user"
            ? "bg-[#F7F8F8] !rounded-tr-[4px] text-black"
            : "bg-[#F7F8F8] !rounded-tl-[4px] text-gray-900 border border-gray-100"
        }`}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.2 }}
          className="text-[16px] leading-relaxed"
        >
          {message.content}
        </motion.p>
      </motion.div>
      {message.role === "user" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
        >
          <Image
            src={"/avatar.png"}
            alt="User Avatar"
            width={32}
            height={20}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
