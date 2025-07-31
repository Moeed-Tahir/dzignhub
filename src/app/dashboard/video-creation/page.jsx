"use client";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/creation/Sidebar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StartingSuggestion from "@/components/creation/StartingSuggestion";
import ImagesResults from "@/components/creation/ImagesResults";
import { useUserStore } from "@/store/store";
import LoginModal from "@/components/auth/LoginModal";

const Page = () => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [generations, setGenerations] = React.useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useUserStore((state) => state.user);
  // console.log("User:", user);
  const img = [
    {
      url: "/creation/imges/1.jpg",
      alt: "Image 1",
      type: "image",
      aspectRatio: "aspect-[4/5]", // 4:5 ratio
    },
    {
      url: "/creation/imges/2.jpg",
      alt: "Image 2",
      type: "image",
      aspectRatio: "aspect-[4/6]", // 4:6 ratio (taller)
    },
    {
      url: "/creation/imges/3.jpg",
      type: "image",
      alt: "Image 3",
      aspectRatio: "aspect-[4/3]", // 4:3 ratio (shorter)
    },
    {
      url: "/creation/imges/4.jpg",
      type: "image",
      alt: "Image 4",
      aspectRatio: "aspect-[4/5]", // 4:5 ratio
    },
    {
      url: "/creation/imges/5.jpg",
      type: "image",
      alt: "Image 5",
      aspectRatio: "aspect-[4/4]", // Square
    },
    {
      url: "/creation/imges/6.png",
      type: "image",
      alt: "Image 6",
      aspectRatio: "aspect-[4/7]", // 4:7 ratio (very tall)
    },
    {
      url: "/creation/imges/11.jpg",
      type: "image",
      alt: "Image 7",
      aspectRatio: "aspect-[4/3]", // 4:3 ratio (short)
    },
    {
      url: "/creation/imges/12.jpg",
      type: "image",
      alt: "Image 8",
      aspectRatio: "aspect-[4/5]", // 4:5 ratio
    },
    {
      url: "/creation/imges/13.jpg",
      type: "image",
      alt: "Image 9",
      aspectRatio: "aspect-[4/6]", // 4:6 ratio (tall)
    },
    {
      url: "/creation/imges/14.jpg",
      type: "image",
      alt: "Image 10",
      aspectRatio: "aspect-[4/4]", // Square
    },
  ];

  const getUserGenerations = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-user-generations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          body: JSON.stringify({ type: "video" }),
        },
      }
    );

    const res = await req.json();

    if (res.type === "success") {
      console.log(res.generations);
      setGenerations(res.generations);
    }
  };

  useEffect(() => {
    getUserGenerations();
  }, []);

  // Check if user is signed in and show modal if not
  useEffect(() => {
    console.log("Checking user sign-in status...");
    if (user === undefined || user === null) {
      console.log("User not signed in, showing auth modal");

      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [user]);

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
          // isImagePage={true}
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
            // isImagePage={true}
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
          Generate Video
        </button>
      )}

      <div className="w-full ">
        <Navbar isCreationPage={true} />
        {showSuggestion ? (
          <StartingSuggestion />
        ) : (
          <ImagesResults generations={generations} isVideoPage={true} />
        )}

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

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Page;
