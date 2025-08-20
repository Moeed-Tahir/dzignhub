import React from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { getStrapiImageUrl } from "@/utils/strapi";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

function Testimonials({ testimonialSection = null }) {
  // Debug: Log the received data
  console.log('Testimonials component received:', testimonialSection);
  
  // Default fallback data
  const defaultTestimonialSection = {
    headingPre: "What",
    headingMain: "Our Users Are Saying",
    testimonial: [
      {
        name: "Jerry Tang",
        role: "Recent graduate, Marketing at Sweatpals",
        quote: "Using Text-to-Voice has saved me countless hours. The multilingual support allows me to reach students around the world with high-quality audio narrations.",
        avatar: "/image.svg",
        layoutVariant: "variant-1"
      },
      {
        name: "Sarah Johnson",
        role: "Content Creator, Digital Marketing",
        quote: "The quality of voice generation is incredible. It's revolutionized how I create content for my clients across different industries.",
        avatar: "/image.svg",
        layoutVariant: "variant-2"
      },
      {
        name: "Mike Chen",
        role: "Product Manager, Tech Startup",
        quote: "Our team productivity has increased dramatically since implementing this solution. The API integration was seamless and the results are outstanding.",
        avatar: "/image.svg",
        layoutVariant: "variant-3"
      }
    ]
  };

  // Process Strapi testimonial section data or use defaults
  const processedSection = testimonialSection || defaultTestimonialSection;
  const headingPre = processedSection.headingPre || defaultTestimonialSection.headingPre;
  const headingMain = processedSection.headingMain || defaultTestimonialSection.headingMain;
  
  // If we have testimonial from Strapi, use them; otherwise use default
  let testimonials = [];
  if (processedSection.testimonial && processedSection.testimonial.length > 0) {
    testimonials = processedSection.testimonial.map((testimonial, index) => ({
      name: testimonial.name || `User ${index + 1}`,
      role: testimonial.role || "User",
      quote: testimonial.quote || "Great product!",
      avatar: getStrapiImageUrl(testimonial.avatar) || "/landing/testimonials/icon.png",
      layoutVariant: testimonial.layoutVariant || "variant-1"
    }));
  } else {
    // Use default testimonial
    testimonials = defaultTestimonialSection.testimonial;
  }

  // Create 9 boxes by repeating testimonials cyclically
  const boxes = new Array(9).fill(null).map((_, index) => {
    const testimonialIndex = index % testimonials.length;
    return testimonials[testimonialIndex];
  });

  // Map layout variants to styles
  const getStyleForVariant = (variant) => {
    switch (variant) {
      case "variant-1":
        return { pt: "pt-[20px]", pb: "", height: "md:max-h-[357px]" };
      case "variant-2":
        return { pt: "pt-[60px]", pb: "", height: "md:max-h-[337px]" };
      case "variant-3":
        return { pt: "", pb: "pb-[60px]", height: "md:max-h-[337px]" };
      default:
        return { pt: "pt-[20px]", pb: "", height: "md:max-h-[357px]" };
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const testimonialVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const avatarVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const Box = ({ testimonial, pt, pb, height, index }) => (
    <motion.div
      className={`md:max-w-[416px] md:max-h-[397px] max-w-[336px]  h-full ${pt} ${pb} flex-shrink-0`}
      variants={testimonialVariants}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className={`${height} w-full  bg-[#2D314B] text-[#9997A0] ${inter.className} flex flex-col flex-shrink-0  rounded-[12px] border border-white/10 shadow-[0_4px_4px_0px_#00000040] backdrop-blur-[150px] p-[20px] gap-[16px]`}
        variants={containerVariants}
      >
        <motion.img
          src={"/image.svg"}
          alt={`${testimonial.name} avatar`}
          className="w-[56px] h-[56px] rounded-[69px] object-cover"
          variants={avatarVariants}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 },
          }}
        />
        <motion.div
          className={`text-[20px] `}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{ __html: testimonial.quote }}
        />
        <motion.div
          className="flex flex-col gap-[8px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[24px] text-[#FFFFFF] font-semibold">
            {testimonial.name}
          </h2>
          <p className="text-[16px]">{testimonial.role}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      className="relative  w-full bg-[#1B1F3B] flex flex-col h-[767px] gap-[56px] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1440px] pt-[80px]  overflow-hidden px-[80px]">
        <motion.div
          className="hidden max-w-[1280px] md:flex flex-col gap-[24px] text-[40px] font-semibold text-[#FAFAFA]"
          variants={headingVariants}
        >
          <motion.div className="flex gap-[10px]" variants={containerVariants}>
            <motion.p
              className="text-[#C209C1]"
              variants={wordVariants}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              {headingPre}
            </motion.p>
            <motion.p variants={wordVariants}>{headingMain}</motion.p>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="md:hidden absolute top-[5%] left-[10%] text-[28px] font-semibold max-w-[70%] w-full"
        variants={headingVariants}
      >
        <motion.span
          className="text-[#C209C1]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {headingPre}{" "}
        </motion.span>
        <span className="text-[#FFFFFF]">{headingMain}</span>
      </motion.div>

      <motion.div
        className="absolute max-w-[1440px] left-0 md:top-[65%] top-[55%] -translate-y-1/2 w-full flex justify-center px-[20px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex  animate-scroll-left gap-[16px] relative z-10"
          variants={containerVariants}
        >
          {boxes.map((testimonial, index) => {
            const style = getStyleForVariant(testimonial.layoutVariant);
            return <Box key={index} testimonial={testimonial} index={index} {...style} />;
          })}
        </motion.div>
      </motion.div>

      {/* Left Fade */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-full w-[392px] z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(270deg, rgba(3, 2, 21, 0) 38.52%, #030215 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      />

      {/* Right Fade */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-full w-[392px] rotate-180 z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(270deg, rgba(3, 2, 21, 0) 38.52%, #030215 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

export default Testimonials;
