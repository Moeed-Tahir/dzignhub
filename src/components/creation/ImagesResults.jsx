import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useUserStore } from "@/store/store";
import VideoPlayer from "./VideoPlayer";

const ImagesResults = ({ isVideoPage = false, generations }) => {
  const img = [
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 1",
    },
    {
      src: "/creation/ImagesResults/2.jpg",
      alt: "Image 2",
    },
    {
      src: "/creation/ImagesResults/3.jpg",
      alt: "Image 3",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 4",
    },
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 5",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 6",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 4",
    },
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 5",
    },
    {
      src: "/creation/ImagesResults/2.jpg",
      alt: "Image 6",
    },
  ];

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const { GenerateImages, GenerateVideo } = useUserStore();
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Determine what content to display
  const displayContent = isVideoPage ? GenerateVideo : GenerateImages;
  const hasContent = displayContent && displayContent.length > 0;

  const handleMediaClick = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
    setIsMediaOpen(true);
  };

  return (
    <>
      {!isMediaOpen && (
        <div className="flex justify-between items-center mt-[30px]">
          <p className="text-[20px] mb-5 font-medium text-black">
            {isVideoPage ? "Generated Videos" : "Generated Images"}
          </p>
          <p className="text-[20px] font-medium text-[#68686B]">Today</p>
        </div>
      )}

<div className='grid grid-cols-2 xl:grid-cols-4 gap-4 w-full'>

      {generations.map((item, index) => {
        if (item.type === "video") {
          // Handle video display with thumbnail
          return (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md w-full h-auto relative group'
              onClick={() => handleMediaClick(item.url)}
              style={{
                borderRadius: "12px",
              }}
            >
              <video
                src={item.url}
                className="object-cover w-[328px] h-[450px] rounded-[16px]"
                muted
                loop
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                <div className="bg-white bg-opacity-80 rounded-full p-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M8 5V19L19 12L8 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              {/* Video info */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {item.duration || '10'}s
              </div>
              {/* Hover overlay with prompt */}
              <div className='absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4'>
                <p className='text-white text-sm leading-relaxed break-words'>
                  {item.prompt}
                </p>
              </div>
            </div>
          );
        } else {
          // Handle image display
          return (
            <div 
            key={index} 
            className='bg-white rounded-lg shadow-md w-full h-auto relative group'
            style={{
                borderRadius: "12px",
            }}
        >
            <Image
              src={item.url}
              alt={item.fileName}
              key={index}
              width={300}
              height={300}
              onClick={() => handleMediaClick(item.url)}
              style={{ cursor: "pointer" }}
              className="object-cover w-[328px] h-[450px] rounded-[16px]"
            />
              {/* Hover overlay with prompt */}
              <div className='absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4'>
                                    <p className='text-white text-sm leading-relaxed break-words'>
                                        {item.prompt}
                                    </p>
                                </div>
                            </div>
          );
        }
      })}
</div>

      {!isMediaOpen && hasContent && (
        <div className="grid grid-cols-1 mt-[24px] sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayContent.map((item, index) => {
            if (isVideoPage) {
              // Handle video display with thumbnail
              return (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-[16px] overflow-hidden bg-black"
                  onClick={() => handleMediaClick(item.videoUrl || item.imageUrl)}
                >
                  <video
                    src={item.videoUrl || item.imageUrl}
                    className="object-cover w-[328px] h-[450px] rounded-[16px]"
                    muted
                    loop
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black"
                      >
                        <path
                          d="M8 5V19L19 12L8 5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Video info */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {item.duration || '10'}s
                  </div>
                </div>
              );
            } else {
              // Handle image display
              return (
                <Image
                  src={item.imageUrl}
                  alt={item.fileName}
                  key={index}
                  width={300}
                  height={300}
                  onClick={() => handleMediaClick(item.imageUrl)}
                  style={{ cursor: "pointer" }}
                  className="object-cover w-[328px] h-[450px] rounded-[16px]"
                />
              );
            }
          })}
        </div>
      )}

      {/* No content message */}
      {!isMediaOpen && !hasContent && generations.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-[50px] text-center">
          <div className="text-gray-400 mb-4">
            {isVideoPage ? (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 12L10 15V9L14 12Z" fill="currentColor" />
                <path d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor" />
              </svg>
            )}
          </div>
          <p className="text-[18px] text-gray-500">
            No {isVideoPage ? 'videos' : 'images'} generated yet
          </p>
          <p className="text-[14px] text-gray-400 mt-2">
            Start creating to see your {isVideoPage ? 'videos' : 'images'} here
          </p>
        </div>
      )}

      {/* Full screen media viewer */}
      <div>
        {isMediaOpen && (
          <div className="relative">
            {/* Back button */}
            <button
              onClick={() => setIsMediaOpen(false)}
              className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isVideoPage ? (
              <div className="mt-[20px]">
                <VideoPlayer src={selectedMedia} />
              </div>
            ) : (
              <Image
                src={selectedMedia}
                alt="Selected"
                width={500}
                height={400}
                className="rounded-[16px] w-full h-[90vh] mt-[20px] object-cover"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ImagesResults;