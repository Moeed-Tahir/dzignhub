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
    }
    , []);

    return (
        <div className="w-full max-w-[1360px]">
                        <div className='flex my-10 flex-wrap items-center gap-2 mb-4'>
                <button 
                    onClick={() => {
                        console.log("Changing filter to all");
                        setFilter("all")
                    }} 
                    className={`rounded-full px-4 gap-2 whitespace-nowrap border py-2 flex items-center font-medium text-sm ${
                        filter === "all" 
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
                    className={`rounded-full px-4 py-1 flex items-center gap-2 font-medium border text-sm ${
                        filter === "image" 
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
                    className={`rounded-full px-4 py-1 flex items-center gap-2 font-medium border text-sm ${
                        filter === "video" 
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

            <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 w-full'>
                {generations.map((generation, index) => {
                    // Filter logic
                    if (filter === "all" || generation.type === filter) {
                        return (
                            <div 
                                key={index} 
                                className='bg-white rounded-lg shadow-md w-full h-auto relative group'
                                style={{
                                    borderRadius: "12px",
                                }}
                            >
                                <Image
                                    src={generation.url}
                                    alt={`Community ${generation.type} ${index + 1}`}
                                    width={328}
                                    height={454}
                                    className='w-full h-auto object-cover rounded-lg'
                                />
                                
                                {/* Hover overlay with prompt */}
                                <div className='absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4'>
                                    <p className='text-white text-sm leading-relaxed break-words'>
                                        {generation.prompt}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                   return (
                    <p>No generations found</p>
                   )
                })}
            </div>
        </div>
    )
}

export default CommunityFeed