import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getStrapiImageUrl } from "@/utils/strapi";

function Card({ currentKey, assistantData, loading }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1,
    once: true
  });

  // Get dynamic data from Strapi or fallback to static data
  const strapiImageCard = assistantData[currentKey]?.imageCard;
  
  // Fallback static data for different assistant types
  const fallbackImages = {
    brandDesigner: '/ai-assistants/ai-designer.jpg',
    contentWriter: '/ai-assistants/content-writer.jpg',
    ui_ux: '/ai-assistants/ui-ux-designer.jpg',
    seo: '/ai-assistants/seo.jpg',
    strategyAssistant: '/ai-assistants/strategy-assistant.jpg'
  };

  const imageData = {
    src: strapiImageCard ? getStrapiImageUrl(strapiImageCard.image) : fallbackImages[currentKey] || '/ai-assistants/ai-designer.jpg',
    alt: strapiImageCard?.title || 'AI Assistant',
    title: strapiImageCard?.title || 'Your AI Assistant',
    subtitle: strapiImageCard?.subtitle || null
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className='sm:h-[744px] h-[260px] flex items-center justify-center'>
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className='sm:h-[744px] h-[260px] flex items-center justify-center'
    >
      <motion.img
        variants={imageVariants}
        src={imageData.src}
        alt={imageData.alt}
        className='w-[90%] sm:h-[584px] h-[180px] object-cover sm:rounded-[40px] rounded-[12px]'
      />
    </motion.div>
  )
}

export default Card
