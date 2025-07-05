import Image from 'next/image'
import React, { useEffect } from 'react'
import "@/css/communityFeed.css"

function CommunityFeed() {
    const [generations, setGenerations] = React.useState([]);
    const [filter, setFilter] = React.useState("all");

    const getCommunityFeed = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-generations`, {
            method: "GET",
        });

        const res = await req.json();

        if (res.type === "success") {
            console.log(res.generations);
            setGenerations(res.generations);
        }
    }

    useEffect(() => {
        getCommunityFeed();
    }, []);

    // Function to get random height for masonry effect
    const getRandomHeight = () => {
        return Math.floor(Math.random() * 20) + 15; // Random between 15-35
    };

    return (
        <div className="w-full max-w-[1360px]">
            <div className='flex my-10 flex-wrap items-center gap-2 mb-4'>
                <button
                    onClick={() => {
                        console.log("Changing filter to all");
                        setFilter("all")
                    }}
                    className={`rounded-full px-4 gap-2 whitespace-nowrap border py-2 flex items-center font-medium text-sm ${filter === "all"
                        ? "bg-[#1B1F3B] border-[#1B1F3B] text-white"
                        : "bg-white text-[#68686B] border-[#68686B]"
                        }`}
                >
                    <Image src="/homepage/community-feed/global.png" alt="Community Feed" width={22} height={22} />
                    Community feed
                </button>
                <button
                    onClick={() => {
                        console.log("Changing filter to image");
                        setFilter("image")
                    }}
                    className={`rounded-full px-4 py-1 flex items-center gap-2 font-medium border text-sm ${filter === "image"
                        ? "bg-[#1B1F3B] border-[#1B1F3B] text-white"
                        : "bg-white text-[#68686B] border-[#68686B]"
                        }`}
                >
                    <Image src="/homepage/community-feed/gallery.png" alt="Image" width={24} height={24} />
                    Image
                </button>
                <button
                    onClick={() => {
                        console.log("Changing filter to video");
                        setFilter("video")
                    }}
                    className={`rounded-full px-4 py-1 flex items-center gap-2 font-medium border text-sm ${filter === "video"
                        ? "bg-[#1B1F3B] border-[#1B1F3B] text-white"
                        : "bg-white text-[#68686B] border-[#68686B]"
                        }`}
                >
                    <Image src="/homepage/community-feed/video.png" alt="Video" width={24} height={24} />
                    Video
                </button>
            </div>

            {
                generations.length === 0 ? (
                    <div className='text-center text-gray-500'>No generations found</div>
                ) : null
            }

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
                                                        <path
                                                            d="M8 5V19L19 12L8 5Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* Video duration info */}
                                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                                {generation.duration || '10'}s
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
                    return (
                        <div className='flex items-center justify-center h-full w-full' >
                            <p className="">No generations found.</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommunityFeed