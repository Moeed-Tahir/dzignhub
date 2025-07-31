"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoCaretDown } from "react-icons/io5";

export default function ChatToggleButton({ 
  isOpen, 
  onOpen, 
  onClose 
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.button
          key="close-button"
          initial={{ scale: 0.8, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.8, rotate: 180 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          onClick={onClose}
          className="rounded-full h-[64px] w-[64px] bg-[#C209C1] shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
        >
          <motion.div
            initial={{ rotate: 180 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <IoCaretDown className="text-white text-2xl" />
          </motion.div>
        </motion.button>
      ) : (
        <motion.button
          key="open-button"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          onClick={onOpen}
          className="rounded-full shadow-xl fixed bottom-6 right-4 flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            <Image
              src={"/Chatbot/ai.svg"}
              alt="Ai Assistant"
              width={64}
              height={64}
              className="!h-[64px] !w-[64px]"
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
