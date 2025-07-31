"use client";

import { motion } from "framer-motion";
import { ArrowLeftIcon, Maximize2Icon } from "./icons";
import Image from "next/image";

export default function ChatHeader({ 
  chatState, 
  onBackToIntro 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-b fixed w-[520px] bg-white rounded-t-[20px] border-[#E7E7E7] p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {chatState === "chat" && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={onBackToIntro}
              className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              <ArrowLeftIcon size={16} className="text-gray-600" />
            </motion.button>
          )}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
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
            >
              <h3 className="font-semibold text-sm text-gray-900">
                Ann - Onboarding Assistant
              </h3>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className="p-2 h-8 w-8 rounded-lg hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
          >
            <Maximize2Icon size={16} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
