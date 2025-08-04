"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/store";
import VideoPlayer from "./VideoPlayer";

const ImagesResults = ({ isVideoPage = false, generations, localGenerations }) => {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const { GenerateImages, GenerateVideo } = useUserStore();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});

  // Function to get random height for immediate display
  const getRandomHeight = () => {
    const heights = [15, 18, 20, 22, 25, 28, 30, 32, 35, 40, 45];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  // Function to get image dimensions and calculate grid height
  const getImageDimensions = (url, index) => {
    return new Promise((resolve) => {
      // Check if we're on the client side
      if (typeof window === 'undefined') {
        // Server-side fallback
        const fallbackDimensions = {
          width: 328,
          height: 400,
          aspectRatio: 400 / 328,
          gridSpans: getRandomHeight()
        };
        setImageDimensions(prev => ({
          ...prev,
          [index]: fallbackDimensions
        }));
        resolve(fallbackDimensions);
        return;
      }

      const img = new window.Image(); // Use window.Image explicitly
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        // Calculate grid spans based on aspect ratio
        const baseHeight = 200; // Base height in pixels
        const calculatedHeight = Math.max(baseHeight * aspectRatio, 150); // Minimum 150px
        const gridSpans = Math.ceil(calculatedHeight / 10); // Since auto-rows-[10px]

        const dimensions = {
          width: img.width,
          height: img.height,
          aspectRatio,
          gridSpans: Math.min(gridSpans, 50) // Maximum 50 spans
        };

        setImageDimensions(prev => ({
          ...prev,
          [index]: dimensions
        }));
        resolve(dimensions);
      };
      img.onerror = () => {
        // Fallback for broken images - use random height
        const fallbackDimensions = {
          width: 328,
          height: 400,
          aspectRatio: 400 / 328,
          gridSpans: getRandomHeight()
        };
        setImageDimensions(prev => ({
          ...prev,
          [index]: fallbackDimensions
        }));
        resolve(fallbackDimensions);
      };
      img.src = url;
    });
  };

  // Function to get video dimensions (if available) or use default
  const getVideoGridSpans = (item) => {
    if (item.width && item.height) {
      const aspectRatio = item.height / item.width;
      const baseHeight = 200;
      const calculatedHeight = Math.max(baseHeight * aspectRatio, 150);
      return Math.min(Math.ceil(calculatedHeight / 10), 50);
    }
    // Default spans for videos
    return getRandomHeight();
  };

  // Load image dimensions when generations change
  useEffect(() => {
    if (generations && generations.length > 0) {
      generations.forEach((item, index) => {
        if (item.type !== "video" && item.url) {
          getImageDimensions(item.url, index);
        }
      });
    }
  }, [generations]);

  // Function to get grid spans for an item
  const getGridSpans = (item, index) => {
    if (item.type === "video") {
      return getVideoGridSpans(item);
    }

    // Return calculated spans or random height for immediate display
    return imageDimensions[index]?.gridSpans || getRandomHeight();
  };

  // Determine what content to display
  const displayContent = isVideoPage ? GenerateVideo : GenerateImages;
  const hasContent = displayContent && displayContent.length > 0;

  const handleMediaClick = (mediaUrl) => {
    console.log("Media clicked:", mediaUrl); // Debug log
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

      {/* Masonry Layout for Generations */}
      {!isMediaOpen && (generations || localGenerations) && (
        <div className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[10px]">
          {(generations || []).map((item, index) => {
            const gridSpans = getGridSpans(item, index);

            return (
              <div
                key={index}
                className="group cursor-pointer"
                style={{
                  gridRowEnd: `span ${gridSpans}`,
                }}
                onClick={() => handleMediaClick(item.url)}
              >
                <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    </>
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.fileName || `Generated image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onLoad={() => {
                        // Trigger re-calculation if needed
                        if (!imageDimensions[index]) {
                          getImageDimensions(item.url, index);
                        }
                      }}
                    />
                  )}

                  {/* Hover overlay with prompt */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                    <p className="text-white text-sm leading-relaxed break-words">
                      {item.prompt || "No prompt available"}
                    </p>
                  </div>
                  {/* Debug info - remove in production */}
                  {imageDimensions[index] && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {imageDimensions[index].width}×{imageDimensions[index].height}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {(localGenerations || []).map((item, index) => {
            const gridSpans = getGridSpans(item, index);

            return (
              <div
                key={index}
                className="group cursor-pointer"
                style={{
                  gridRowEnd: `span ${gridSpans}`,
                }}
                onClick={() => handleMediaClick(item.url)}
              >
                <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    </>
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.fileName || `Generated image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onLoad={() => {
                        // Trigger re-calculation if needed
                        if (!imageDimensions[index]) {
                          getImageDimensions(item.url, index);
                        }
                      }}
                    />
                  )}

                  {/* Hover overlay with prompt */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                    <p className="text-white text-sm leading-relaxed break-words">
                      {item.prompt || "No prompt available"}
                    </p>
                  </div>
                  {/* Debug info - remove in production */}
                  {imageDimensions[index] && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {imageDimensions[index].width}×{imageDimensions[index].height}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional content from store (if any) */}
      {!isMediaOpen && hasContent && (
        <div className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[10px]">
          {displayContent.map((item, index) => {
            // Use random height for store content since we might not have dimensions
            const randomHeight = getRandomHeight();

            return (
              <div
                key={`store-${index}`}
                className="group cursor-pointer"
                style={{
                  gridRowEnd: `span ${randomHeight}`,
                }}
                onClick={() => handleMediaClick(item.videoUrl || item.imageUrl)}
              >
                <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
                  {isVideoPage ? (
                    <>
                      <video
                        src={item.videoUrl || item.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    </>
                  ) : (
                    <Image
                      src={item.imageUrl}
                      alt={item.fileName || `Generated image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Hover overlay with prompt */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                    <p className="text-white text-sm leading-relaxed break-words">
                      {item.prompt || "No prompt available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No content message */}
      {!isMediaOpen && !hasContent && ((!generations || generations.length === 0) && (!localGenerations || localGenerations.length === 0)) && (
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

      {/* Debug info - remove after testing */}
      {/* <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-sm">
        isMediaOpen: {isMediaOpen.toString()}
        <br />
        selectedMedia: {selectedMedia || "none"}
      </div> */}
    </>
  );
};

export default ImagesResults;