"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-3"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
      >
        <Image
          src={"/Chatbot/ai.svg"}
          alt="Ai Assistant"
          width={32}
          height={32}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm"
      >
        <div className="flex space-x-1">
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-purple-400 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-2 h-2 bg-pink-400 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-2 h-2 bg-orange-400 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
