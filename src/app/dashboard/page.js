'use client'
import Navbar from '@/components/common/Navbar'
import ToolCard from '@/components/homepage/ToolCard'
import { Camera, CameraIcon, Pen, Search, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

function page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const aiAssistants = [
    {
      image: "/homepage/ai-assistant-ui-ux.png",
      icon: <Pen size={24} />,
      title: "UX/UI",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-seo.png",
      icon: <Search size={24} />,
      title: "SEO Optimizer",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-marketing.png",
      icon: <Star size={24} />,
      title: "Marketing Strategist",
      description: "Produce unique content with AI assistance"
    },
    {
      image: "/homepage/ai-assistant-marketing.png",
      icon: <Star size={24} />,
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

    <div className='px-8 py-6'>
      
      {/* Main container for both sections side by side */}
      <div className='flex gap-12'>
        
        {/* Manual tools section */}
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-6'>Manual tools</h1>
          <div className='flex gap-4'>
            <ToolCard
              image={"/homepage/manual-tools-image-creation.png"}
              icon={<Camera size={24} />}
              title="Image creation"
              description="Create and refine visuals manually"
              className="flex-1"
            />
            <ToolCard
              image={"/homepage/manual-tools-video-creation.png"}
              icon={<CameraIcon size={24} />}
              title="Video creation"
              description="Edit and enhance videos with manual tools"
              className="flex-1"
            />
          </div>
        </div>

        {/* AI Assistants section with carousel */}
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-6'>AI Assistants</h1>
          
          {/* Carousel container with side controls */}
          <div className="relative flex items-center">
            
            {/* Left arrow */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
              style={{ transform: 'translateX(-50%)' }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slider content */}
            <div className="overflow-hidden mx-8 flex-1">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
              >
                {aiAssistants.map((assistant, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / cardsPerView}% - ${16 * (cardsPerView - 1) / cardsPerView}px)` }}
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
    </div>
      
    </>
  )
}

export default page