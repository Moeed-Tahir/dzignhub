"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

// Sample images with different heights for masonry effect
const img = [
  {
    src: "/creation/imges/1.jpg",
    alt: "Image 1",
    aspectRatio: "aspect-[4/5]", // 4:5 ratio
  },
  {
    src: "/creation/imges/2.jpg",
    alt: "Image 2",
    aspectRatio: "aspect-[4/6]", // 4:6 ratio (taller)
  },
  {
    src: "/creation/imges/3.jpg",
    alt: "Image 3",
    aspectRatio: "aspect-[4/3]", // 4:3 ratio (shorter)
  },
  {
    src: "/creation/imges/4.jpg",
    alt: "Image 4",
    aspectRatio: "aspect-[4/5]", // 4:5 ratio
  },
  {
    src: "/creation/imges/5.jpg",
    alt: "Image 5",
    aspectRatio: "aspect-[4/4]", // Square
  },
  {
    src: "/creation/imges/6.png",
    alt: "Image 6",
    aspectRatio: "aspect-[4/7]", // 4:7 ratio (very tall)
  },
  {
    src: "/creation/imges/11.jpg",
    alt: "Image 7",
    aspectRatio: "aspect-[4/3]", // 4:3 ratio (short)
  },
  {
    src: "/creation/imges/12.jpg",
    alt: "Image 8",
    aspectRatio: "aspect-[4/5]", // 4:5 ratio
  },
  {
    src: "/creation/imges/13.png",
    alt: "Image 9",
    aspectRatio: "aspect-[4/6]", // 4:6 ratio (tall)
  },
  {
    src: "/creation/imges/14.jpg",
    alt: "Image 10",
    aspectRatio: "aspect-[4/4]", // Square
  },
];

const StartingSuggestion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="h-[173px] w-full my-[10px] flex justify-between items-center flex-col gap-2 mt-[24px]">
        <div className="w-[95px] h-[95px] bg-white rounded-full flex justify-center items-center mx-auto ">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-[48px] h-[48px] object-contain"
          />
        </div>

        <p className="text-center text-[18px] font-semibold text-[#1B1F3B] ">
          Start with a prompt
        </p>

        <p className=" text-[16px] font-normal text-[#68686B] text-center ">
          Type what you'd like to create, or use the suggestions below to get
          inspired.
        </p>
      </div>

     

      {/* CSS Masonry Layout using CSS Grid */}
      <div className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[10px]">
        {img.map((image, index) => (
          <div 
            key={index} 
            className="group cursor-pointer"
            style={{
              gridRowEnd: `span ${Math.floor(Math.random() * 20) + 15}`, // Random height
            }}
          >
            <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                onClick={() => {
                  setSelectedImage(image.src);
                  setIsModalOpen(true);
                }}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      <ImageModal href={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StartingSuggestion;