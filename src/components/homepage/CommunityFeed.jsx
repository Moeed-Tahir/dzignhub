import Image from 'next/image'
import React from 'react'
import "@/css/communityFeed.css"
function CommunityFeed() {
    return (
        <div className="w-full max-w-[1360px]">
            <div className='flex my-10 flex-wrap  items-center gap-2 mb-4'>
                <button className=" bg-[#1B1F3B] rounded-full px-4 gap-2 whitespace-nowrap border border-[#1B1F3B] py-2 text-white flex items-center font-medium text-sm">
                    <Image src="/homepage/community-feed/global.png" alt="Community Feed" width={22} height={22} />
                    Community feed
                </button>
                <button className="   bg-white text-[#68686B] px-4 py-1 rounded-full flex items-center gap-2 font-medium border border-1 border-[#68686B] text-sm">
                    <Image src="/homepage/community-feed/gallery.png" alt="Image" width={24} height={24} />
                    Image
                </button>
                <button className=" bg-white text-[#68686B] px-4 py-1 rounded-full flex items-center gap-2 font-medium border border-1 border-[#68686B] text-sm">
                    <Image src="/homepage/community-feed/video.png" alt="Video" width={24} height={24} />
                    Video
                </button>
            </div>

            {/* Community feed content - 4 divs on one row with 16px gap */}
            <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 w-full'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                        key={index} 
                        className='bg-white rounded-lg shadow-md w-full h-auto'
                        style={{
                            borderRadius: "12px",
                        }}
                    >
                        <Image
                            src={`/homepage/community-feed/${index + 1}.png`}
                            alt={`Community Image ${index + 1}`}
                            width={328}
                            height={454}
                            className='w-full h-auto object-cover rounded-lg'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommunityFeed