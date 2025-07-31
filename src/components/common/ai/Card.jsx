import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Card() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1,
    once: true
  });

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
        src='/ai-assistants/ai-designer.jpg'
        className='w-[90%] sm:h-[584px] h-[180px] object-cover sm:rounded-[40px] rounded-[12px]'
      />
    </motion.div>
  )
}

export default Card
