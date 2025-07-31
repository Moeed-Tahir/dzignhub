"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function Message({ message, index }) {
  // Custom markdown components for styling
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-md font-medium mb-1">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children, inline }) =>
      inline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">{children}</code>
        </pre>
      ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };
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
      {/* Change this condition to check for system OR assistant */}
      {(message.role === "assistant" || message.role === "system") && (
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
            ? "bg-[#BDFF00] !rounded-tr-[4px] text-black"
            : "bg-[#F7F8F8] !rounded-tl-[4px] text-gray-900 border border-gray-100"
        }`}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.2 }}
          className="text-[16px] leading-relaxed"
        >
                <ReactMarkdown components={markdownComponents}>

          {message.content}
          </ReactMarkdown>


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
            height={32}
          />
        </motion.div>
      )}
    </motion.div>
  );
}