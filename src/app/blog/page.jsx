"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/common/Hero";
import Sidebar from "@/components/landing/Sidebar";
import Card from "@/components/blog/Card";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { fetchBlogPageData, getStrapiImageUrl } from "@/utils/strapi";

// Fallback blog data for when Strapi is not available
const fallbackBlogData = [
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/1.jpg",
    link: "/blog-detail/1",
    slug: "team-spirit-ai-art"
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/2.jpg",
    link: "/blog-detail/2",
    slug: "ai-art-creations"
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/3.jpg",
    link: "/blog-detail/3",
    slug: "nba-playoffs-fan"
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/4.jpg",
    link: "/blog-detail/4",
    slug: "team-spirit-art"
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/5.jpg",
    link: "/blog-detail/5",
    slug: "ai-fan-creations"
  },
  {
    date: "May 22, 2025",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    image: "/blog/6.jpg",
    link: "/blog-detail/6",
    slug: "playoffs-ai-art"
  },
];

function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    heroTitle: "Latest Blog",
    heroSubtitle: "News and articles",
    posts: fallbackBlogData
  });

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const data = await fetchBlogPageData();
        console.log('Blog page data loaded:', data);
        
        // If we have posts from Strapi, use them; otherwise keep fallback
        if (data.posts && data.posts.length > 0) {
          setBlogData(data);
        } else {
          // Keep fallback posts but use Strapi hero text if available
          setBlogData({
            heroTitle: data.heroTitle,
            heroSubtitle: data.heroSubtitle,
            posts: fallbackBlogData
          });
        }
      } catch (error) {
        console.error('Error loading blog data:', error);
        // Keep fallback data
      }
    };

    loadBlogData();
  }, []);

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
        title={blogData.heroTitle}
        subtitle={blogData.heroSubtitle}
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
          {blogData.posts.map((item, index) => {
            // Format date for display
            const formattedDate = item.date 
              ? new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : item.date || 'May 22, 2025';

            // Prioritize slug-based URL over the static link field
            const postLink = item.slug ? `/blog/${item.slug}` : (item.link || `/blog-detail/${index + 1}`);

            return (
              <Link key={index} href={postLink}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    title={item.title}
                    date={formattedDate}
                    image={item.featuredImage ? getStrapiImageUrl(item.featuredImage) : (item.image || "/blog/1.jpg")}
                    link={postLink}
                    excerpt={item.excerpt}
                  />
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
}

export default Page;
