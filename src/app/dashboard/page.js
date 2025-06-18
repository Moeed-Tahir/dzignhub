'use client'
import Navbar from '@/components/common/Navbar'
import CommunityFeed from '@/components/homepage/CommunityFeed'
import ToolCard from '@/components/homepage/ToolCard'
import { Camera, CameraIcon, Pen, Search, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ModalPopup from '@/components/homepage/ModalPopup'

function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  
  const aiAssistants = [
    {
      image: "/homepage/ai-assistant-ui-ux.png",
      icon: "/homepage/ux-ui.png",
      title: "UX/UI",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-seo.png",
      icon: "/homepage/seo.png",
      title: "SEO Optimizer",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-marketing.png",
      icon: "/homepage/marketing.png",
      title: "Marketing Strategist",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-marketing.png",
      icon: "/homepage/marketing.png",
      title: "Marketing Strategist 2",
      description: "Produce unique content with AI assistance"
    }
  ]

  const cardsPerView = 3
  const maxSlide = Math.max(0, aiAssistants.length - cardsPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  return (
    <>
    <Navbar/>

    <div className='px-8 mx-auto max-w-[1440px] py-6'>
      
      {/* Main container for both sections side by side */}
      <div 
        id='mainContainer' 
        className='flex'
        style={{
          // width: '1280px',
          height: '401px',
          gap: '32px'
        }}
      >
        
        {/* Manual tools section */}
        <div 
          className='flex flex-col'
          style={{
            width: '544px',
            height: '401px',
            gap: '24px'
          }}
        >
          <h1 className='text-2xl font-semibold text-[#000000] '>Manual tools</h1>
          <div className='flex gap-4'>
            <ToolCard
              image={"/homepage/manual-tools-image-creation.png"}
              icon={"/homepage/image-generation.png"}
              title="Image creation"
              description="Create and refine visuals manually"
              className="flex-1"
            />
            <ToolCard
              image={"/homepage/manual-tools-video-creation.png"}
              icon={"/homepage/video-creation.png"}
              title="Video creation"
              description="Edit and enhance videos with manual tools"
              className="flex-1"
            />
          </div>
        </div>

        {/* AI Assistants section with carousel */}
        <div 
          className='flex flex-col'
          style={{
            width: '784px',
            height: '401px',
            gap: '24px'
          }}
        >
          <h1 className='text-2xl font-semibold text-[#000000]'>AI assistants</h1>
          
          {/* Carousel container with side controls */}
          <div className="relative flex-1  flex items-center">
            
            {/* Left arrow */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-2xl hover:bg-gray-50 transition-colors border border-gray-200"
              style={{ transform: 'translateX(-50%)' }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slider content */}
            <div className="overflow-hidden flex-1">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
                  gap: '8px'
                }}
              >
                {aiAssistants.map((assistant, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / cardsPerView}% - ${12 * (cardsPerView - 1) / cardsPerView}px)` }}
                  >
                    <ToolCard
                      image={assistant.image}
                      icon={assistant.icon}
                      title={assistant.title}
                      description={assistant.description}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
              style={{ transform: 'translateX(50%)' }}
            >
              <ChevronRight size={20} />
            </button>

          </div>

          {/* Dots indicator */}
          {maxSlide > 0 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      <CommunityFeed className="mt-16" />

      {/* Let's talk button - Fixed position bottom right */}
      <button 
        className="fixed bottom-8 right-8 bg-[#C209C1] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
        onClick={() => setIsModalOpen(true)}

        style={{
          width: 'auto',
          height: 48,
          gap: "10px",
          borderRadius: "100px",
          paddingTop: "12px",
          paddingRight: "24px",
          paddingBottom: "12px",
          paddingLeft: "24px"
        }}
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

      {/* Modal Popup */}
      <ModalPopup 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
      
    </>
  )
}

export default Page