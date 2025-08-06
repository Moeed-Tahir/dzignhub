import React from 'react'
import Link from "next/link";
import toast from "react-hot-toast";
import LoginModal from "../auth/LoginModal";

function HeroCTAMobile() {
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
      <div className=" max-w-[382px] mx-auto h-[144px] px-5 flex flex-col gap-[12px] lg:hidden">
        <div className="bg-[#212e62] flex flex-col border-t-[0.49px] border-[#1B1F3B] py-[12px] px-[24px] rounded-[490.57px]">
          <input  value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
           className="lg:text-[18px] text-[16px] text-[#FFFFFF]"
           placeholder='A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape'/>
            
        
        </div>
        <div className=" h-[60px] bg-[#BDFF00] items-center px-[20px] xl:px-[12px] gap-[12px] rounded-[49.11px] flex justify-center">
          <button onClick={imageGeneration} className={`flex gap-2 text-[20px] `}>
            <img
              src="/landing/starVector.svg"
              alt="star"
              className="lg:w-[24px] w-[20px] h-[20px] lg:h-[24px] object-contain"
            />
          <p className="text-[#1B1F3B]  lg:text-[18px] text-[16px]">
            Create image
          </p>
          </button>
        </div>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

    </div>
  )
}

export default HeroCTAMobile
