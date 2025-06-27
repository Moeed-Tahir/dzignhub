"use client";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/creation/Sidebar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StartingSuggestion from "@/components/creation/StartingSuggestion";
import ImagesResults from "@/components/creation/ImagesResults";

const Page = () => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
    const [generations, setGenerations] = React.useState([]);

  const getUserGenerations = async() => {
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user-generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const res = await req.json();

    if (res.type === "success") {
      console.log(res.generations);
      setGenerations(res.generations);
    }
  }

  useEffect(() => {

    getUserGenerations();

  }, []);


  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-[1440px] w-full flex-1 mx-auto justify-center p-4 items-start flex flex-col xl:flex-row gap-4 min-h-screen bg-[#f7F8F8] relative">
      <div className="hidden xl:flex xl:w-[342px]">
        <Sidebar
          isImagePage={true}
          onGenerate={() => setShowSuggestion(false)}
        />
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 z-50 bg-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Sidebar
            isImagePage={true}
            showClose={true}
            onClose={() => setIsSidebarOpen(false)}
            onGenerate={() => {
              setShowSuggestion(false);
              setIsSidebarOpen(false);
            }}
          />
        </div>
      )}

      {isMobile && !isSidebarOpen && (
        <button
          className="fixed bottom-8 left-4 z-50 bg-white border border-gray-300 px-6 py-3 rounded-full shadow"
          onClick={() => setIsSidebarOpen(true)}
        >
          Generate Image
        </button>
      )}

      <div className="w-full min-h-screen ">
        <Navbar isCreationPage={true} />
        {showSuggestion ? <StartingSuggestion /> : <ImagesResults generations={generations} />}

        <button
          className="fixed bottom-8 right-8 bg-[#C209C1] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
          onClick={() => alert("Chat modal coming soon")}
        >
          <Image
            src="/white-logo.png"
            alt="Logo"
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium">Let's talk</span>
        </button>
      </div>
    </div>
  );
};

export default Page;
