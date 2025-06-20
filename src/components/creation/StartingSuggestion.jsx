"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";
const img = [
  {
    src: "/creation/imges/1.jpg",
    alt: "Image 1",
  },
  {
    src: "/creation/imges/2.jpg",
    alt: "Image 2",
  },
  {
    src: "/creation/imges/3.jpg",
    alt: "Image 3",
  },
  {
    src: "/creation/imges/4.jpg",
    alt: "Image 4",
  },
  {
    src: "/creation/imges/5.jpg",
    alt: "Image 5",
  },
  {
    src: "/creation/imges/6.png",
    alt: "Image 6",
  },
];

const StartingSuggestion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="h-[173px] my-[10px] flex justify-between items-center flex-col gap-2 mt-[24px]">
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
          Type what you’d like to create, or use the suggestions below to get
          inspired.
        </p>
      </div>

      <div className="mt-[20px]">
        <div className="flex items-center mb-4">
          <button className="communityBtn bg-[#1B1F3B] text-white flex items-center py-1 px-4 rounded-full gap-2 font-medium text-sm">
            <Image
              src="/creation/globe.svg"
              alt="Community Feed"
              width={22}
              height={22}
            />
            Community feed
          </button>
          <button className="communityBtn ml-7 mr-3 bg-white text-[#68686B] px-4 py-1 rounded-full flex items-center gap-2 font-medium  border-1 border-[#68686B] text-sm">
            <Image
              src="/creation/gallery-export.svg"
              alt="Image"
              width={22}
              height={22}
            />
            Image
          </button>
          <button className="communityBtn bg-white text-[#68686B] px-4 py-1 rounded-full flex items-center gap-2 font-medium  border-1 border-[#68686B] text-sm">
            <Image
              src="/creation/video.svg"
              alt="Video"
              width={24}
              height={24}
            />
            Video
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-[24px] sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {img.map((image, index) => (
          <Image
            src={image.src}
            alt={image.alt}
            key={index}
            width={300}
            height={300}
            onClick={() => {
              setSelectedImage(image.src);
              setIsModalOpen(true);
            }}
            style={{ cursor: "pointer" }}
            className="object-cover w-[328px] height-[450px] rounded-[12px]"
          />
        ))}
      </div>

      <ImageModal href={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StartingSuggestion;
