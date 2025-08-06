import Image from "next/image";
import React, { useEffect } from "react";
import "@/css/communityFeed.css";
import Globe from "@/app/assets/globe";
import Gallery from "@/app/assets/gallery";
import Video from "@/app/assets/video";
import ImageModal from "@/components/ImageModal";

function CommunityFeed() {
  const [generations, setGenerations] = React.useState([]);
  const [filter, setFilter] = React.useState("all");

  // Add modal state
  const [selectedGeneration, setSelectedGeneration] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const getCommunityFeed = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-generations`,
      {
        method: "GET",
      }
    );

    const res = await req.json();

    if (res.type === "success") {
      console.log(res.generations);
      setGenerations(res.generations);
    }
  };

  useEffect(() => {
    getCommunityFeed();
  }, []);

  // Function to get random height for masonry effect
  const getRandomHeight = () => {
    return Math.floor(Math.random() * 20) + 15; // Random between 15-35
  };

  // Handle opening modal
  const handleImageClick = (generation) => {
    setSelectedGeneration(generation);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGeneration(null);
  };

  // Generate tags for the modal
  const generateTags = (generation) => {
    const tags = [];

    if (generation.type === "image") {
      tags.push("Image", "JPG");
      // Add dimensions if available
      if (generation.width && generation.height) {
        tags.push(`${generation.width}x${generation.height}`);
        // Calculate aspect ratio
        const aspectRatio = (generation.width / generation.height).toFixed(1);
        tags.push(`${aspectRatio}:1`);
      } else {
        tags.push("1024x1024", "1:1"); // Default values
      }
    } else if (generation.type === "video") {
      tags.push("Video", "MP4");
      if (generation.duration) {
        tags.push(`${generation.duration}s`);
      }
    }

    return tags;
  };

  return (
    <div className="w-full max-w-[1360px]">
      <div className="flex my-10 flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => {
            console.log("Changing filter to all");
            setFilter("all");
          }}
          className={`rounded-full px-4 gap-2 whitespace-nowrap border py-2 flex items-center font-medium text-sm ${filter === "all"
              ? "bg-white text-[#68686B] border-[#68686B]"
              : "bg-[#1B1F3B] border-[#1B1F3B] text-white"
            }`}
        >
          <Globe
            fill={filter === "all" ? "#68686B"  :  "#fff"}
            width={24}
            height={24}
          />
          Community feed
        </button>
        <button
          onClick={() => {
            console.log("Changing filter to image");
            setFilter("image");
          }}
          className={`rounded-full px-4 py-2 flex items-center  whitespace-nowrap gap-2 font-medium border text-sm ${filter === "image"
              ? "bg-white text-[#68686B] border-[#68686B]"
              : "bg-[#1B1F3B] border-[#1B1F3B] text-white"
            }`}
        >
          <Gallery
            fill={filter === "image" ? "#68686B"  :  "#fff"}
            width={24}
            height={24}
          />
          Image
        </button>
        <button
          onClick={() => {
            console.log("Changing filter to video");
            setFilter("video");
          }}
          className={`rounded-full px-4 py-2 flex items-center gap-2 font-medium border text-sm ${filter === "video"
              ? "bg-white text-[#68686B] border-[#68686B]"
              : "bg-[#1B1F3B] border-[#1B1F3B] text-white"
            }`}
        >
          <Video
            fill={filter === "video"  ? "#68686B"  :  "#fff"}
            width={24}
            height={24}
          />
          Video
        </button>
      </div>

      {generations.length === 0 ? (
        <div className="text-center text-gray-500">No generations found</div>
      ) : null}

      {/* Masonry Layout using CSS Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[10px] w-full">
        {generations.map((generation, index) => {
          // Filter logic
          if (filter === "all" || generation.type === filter) {
            const randomHeight = getRandomHeight();

            return (
              <div
                key={index}
                className="group cursor-pointer"
                style={{
                  gridRowEnd: `span ${randomHeight}`,
                }}
                onClick={() => handleImageClick(generation)} // Add click handler

              >
                <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
                  {generation.type === "video" ? (
                    <>
                      <video
                        src={generation.url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      {/* Play button overlay for videos */}
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
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                      {/* Video duration info */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {generation.duration || "10"}s
                      </div>
                    </>
                  ) : (
                    <Image
                      src={generation.url}
                      alt={`Community ${generation.type} ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Hover overlay with prompt */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                    <p className="text-white text-sm leading-relaxed break-words">
                      {generation.prompt || "No prompt available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      {/* ImageModal */}
      {selectedGeneration && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          tags={generateTags(selectedGeneration)}
          mainPic={selectedGeneration.url}
          suggestions={generations
            .filter(gen => gen.type === selectedGeneration.type && gen.url !== selectedGeneration.url)
            .slice(0, 4)
            .map(gen => gen.url)
          }
          title={selectedGeneration.title || `Community ${selectedGeneration.type}`}
          desc={selectedGeneration.prompt || "No description available"}
          subtitle={selectedGeneration.type === "image" ? "Image Generation" : "Video Generation"}
        />
      )}
    </div>
  );
}

export default CommunityFeed;
