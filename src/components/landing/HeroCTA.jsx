import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import LoginModal from "../auth/LoginModal";

function HeroCTA() {
  const [prompt, setPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const saveGeneration = async (type, url, prompt) => {
    const data = {
      type: type,
      url: url,
      prompt: prompt
    }
    let prevGenerations = JSON.parse(localStorage.getItem("generations")) || [];
    prevGenerations.push(data);

    localStorage.setItem("generations", JSON.stringify(prevGenerations));
    localStorage.setItem("route", "/dashboard/image-creation");

    toast.success("Login to see the image!");
    setShowLoginModal(true);
  }

  const imageGeneration = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt.");
      return;
    }
    toast.loading("Generating image from hero...");
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const data = {
      prompt: prompt,
      style: "normal",
      size: "1:1",
      colors: [],
      quantity: 1,
    };

    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      toast.dismiss();
      if (res.type == "success") {
        saveGeneration("image", res.images[0].imageUrl, prompt);
      }
      else {
        console.error("Error generating image:", res);
        toast.dismiss();
        toast.error("Error generating image. Please try again.");
      }
    }
    catch (error) {
      console.log(error)
      toast.dismiss();
      toast.error("Error generating image. Please try again.");
    }
  }
  return (
    <div>
      {/* CTA Section */}
      <div className=" hidden lg:flex lg:w-[740px] lg:h-[78px] rounded-[999px] mx-auto  items-center bg-[#212e62] justify-center gap-[10px]">
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[18px] text-white w-[70%] focus:outline-none bg-transparent placeholder:text-white"
          placeholder="A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="text-[#1B1F3B]">
          <motion.button
            initial={{ x: 30 }}
            animate={{ x: 0 }}
            onClick={imageGeneration}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={`w-[179px] h-[54px] bg-[#BDFF00] text-[18px]  rounded-full flex items-center justify-center gap-[8px]`}
          >
            <motion.img
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              src="/landing/starVector.svg"
              alt="star"
              className="w-[24px] h-[24px] object-contain"
            />
            Create image
          </motion.button>
        </div>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* CTA Section Mobile*/}
    </div>
  );
}

export default HeroCTA;
