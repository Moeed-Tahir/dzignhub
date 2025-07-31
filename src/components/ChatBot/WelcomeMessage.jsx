"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeMessage({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="-left-[510px] absolute  -bottom-[75px] w-[428px] h-[80px]"
        >
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-[16px] font-medium text-[#393E44] leading-relaxed"
              >
                👋🏻 Hello! I'm Ann – ready to help you explore Allmyai. Let's get
                started!
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
