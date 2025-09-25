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
    publishDate: "2025-05-22",
    title: "Turn Your Team Spirit Into AI Art: NBA Playoffs Fan Creations",
    description: "Explore how AI technology is revolutionizing fan art creation during the NBA playoffs season.",
    cover: "/blog/1.jpg",
    slug: "article-1",
    author: "Admin",
    categories: "technology"
  },
  {
    publishDate: "2025-05-21",
    title: "The Future of Creative AI Tools in Sports Marketing",
    description: "Discover the latest trends in AI-powered creative tools for sports marketing campaigns.",
    cover: "/blog/2.jpg",
    slug: "article-2",
    author: "Admin",
    categories: "marketing"
  },
  {
    publishDate: "2025-05-20",
    title: "Building Engaging Fan Communities with AI",
    description: "Learn how artificial intelligence can help create more engaging fan communities.",
    cover: "/blog/3.jpg",
    slug: "article-3",
    author: "Admin",
    categories: "community"
  },
  {
    publishDate: "2025-05-19",
    title: "AI Art Generation: From Concept to Creation",
    description: "A comprehensive guide to creating stunning AI-generated artwork for your projects.",
    cover: "/blog/4.jpg",
    slug: "article-4",
    author: "Admin",
    categories: "design"
  },
  {
    publishDate: "2025-05-18",
    title: "Personalized Content Creation with AI",
    description: "Harness the power of AI to create personalized content that resonates with your audience.",
    cover: "/blog/5.jpg",
    slug: "article-5",
    author: "Admin",
    categories: "content"
  },
  {
    publishDate: "2025-05-17",
    title: "The Evolution of Digital Fan Experiences",
    description: "Explore how digital technology is transforming the way fans engage with their favorite teams.",
    cover: "/blog/6.jpg",
    slug: "article-6",
    author: "Admin",
    categories: "technology"
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
            const formattedDate = item.publishDate 
              ? new Date(item.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : item.date || 'May 22, 2025';

            // Use slug for URL
            const postLink = item.slug ? `/blog/${item.slug}` : `/blog-detail/${index + 1}`;

            // Get cover image URL
            const coverImage = item.cover ? getStrapiImageUrl(item.cover) : "/blog/1.jpg";

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
                    image={coverImage}
                    link={postLink}
                    excerpt={item.description}
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
