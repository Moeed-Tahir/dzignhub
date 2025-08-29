"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
// import { button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LuUserRound } from "react-icons/lu";

import { Settings, Paperclip, Mic, Send, User, MicOff } from "lucide-react";
import Image from "next/image";

export function ModernInput() {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleVoiceToggle = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            console.log("[v0] Voice recording completed", event.data);
            // Here you would typically upload or process the audio blob
          }
        };

        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error("[v0] Error accessing microphone:", error);
      }
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(
        "[v0] Files selected:",
        Array.from(files).map((f) => f.name)
      );
      // Here you would typically upload or process the files
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[929px] mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 py-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything, create anything"
              className="w-full border-0 bg-transparent text-base placeholder:text-gray-400 
             focus:outline-none focus:ring-0 focus:ring-offset-0 px-0"
            />
          </div>

          {/* Options section on bottom with justify-between */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            {/* Left side icons */}
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-100 dark:bg-gray-700">
                  <User className="w-[18px] h-[18px]  text-gray-600 dark:text-gray-400" />
                </AvatarFallback>
              </Avatar> */}
              <button
                type="button"
                variant="ghost"
                size="sm"
                className="h-[34px] w-[34px] p-0 text-[#1C1C1E] border border-[#F3F3F3] flex justify-center items-center rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <LuUserRound className="w-[18px] h-[18px] " />
              </button>
              <button
                type="button"
                variant="ghost"
                size="sm"
                className="h-[34px] w-[34px] p-0 text-[#1C1C1E] border border-[#F3F3F3] flex justify-center items-center rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Settings className="w-[18px] h-[18px] " />
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFileAttach}
                className="h-[34px] w-[34px] p-0 text-[#1C1C1E] bg-[#F3F3F3] flex justify-center items-center rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Image src={"/clip.svg"} height={18} width={18} alt="" />
              </button>
              <button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceToggle}
                className={`h-[34px] w-[34px] flex justify-center items-center rounded-full p-0 ${
                  isRecording
                    ? "text-red-500 hover:text-red-600"
                    : "text-[#1C1C1E] hover:text-gray-700 dark:text-gray-400 bg-[#F3F3F3] dark:hover:text-gray-200"
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-[18px] h-[18px] " />
                ) : (
                  <Mic className="w-[18px] h-[18px] " />
                )}
              </button>
              <button
                type="submit"
                variant="ghost"
                size="sm"
                className="h-[34px] w-[34px] p-0 text-[#1C1C1E] bg-[#F3F3F3] flex justify-center items-center rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                disabled={!message.trim()}
              >
                {/* <Send className="w-[18px] h-[18px] " /> */}

                <Image src={"/send.svg"} height={18} width={18} alt="" />
              </button>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
      </form>
    </motion.div>
  );
}
