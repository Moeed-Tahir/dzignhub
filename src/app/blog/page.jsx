"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/common/Hero";
import Sidebar from "@/components/landing/Sidebar";
import Card from "@/components/blog/Card";
import Footer from "@/components/common/Footer";

const blogData = [
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/1.jpg",
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/2.jpg",
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/3.jpg",
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/4.jpg",
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/5.jpg",
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/6.jpg",
  },
];

function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero
        title="Latest Blog"
        subtitle="News and articles"
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[43px] py-[64px] px-[80px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {blogData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                title={item.title}
                date={item.date}
                image={item.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
}

export default Page;
