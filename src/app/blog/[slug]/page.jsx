"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/landing/Sidebar";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";
import Card from "@/components/blog/Card";
import BlogStructuredData from "@/components/blog/BlogStructuredData";
import BlogPostMeta from "@/components/blog/BlogPostMeta";
import Link from "next/link";
import { Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { fetchBlogPostBySlug, fetchBlogPageData, getStrapiImageUrl } from "@/utils/strapi";
import { renderRichTextAsHTML } from "@/utils/richText";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const quickLinks = [
  {
    label: "Lorem ipsum dolor sit amet consectetur. Rhoncus vestibulum",
    href: "#",
  },
  { label: "Curabitur blandit tempus porttitor", href: "#" },
  { label: "Vestibulum id ligula porta felis", href: "#" },
];

// Fallback blog data for when Strapi is not available
const fallbackBlog = {
  id: "1",
  title: "The Ultimate Guide",
  description: "News and Articles",
  publishDate: "2025-05-22",
  slug: "ultimate-guide",
  cover: "/blog/3.jpg",
  author: "Admin",
  hint: "Essential reading",
  categories: "technology",
  introduction: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
  quotes: [
    {
      text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear."
    }
  ],
  media: ["/blog/blogDetail.jpg", "/blog/blogDetail2.jpg"],
  conclusion: "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.",
  metaTitle: "The Ultimate Guide",
  metaDescription: "Essential guide for getting started"
};

function BlogDetailPage() {
  const [email, setEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { slug } = useParams();

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch the specific blog post by slug
        const blogPost = await fetchBlogPostBySlug(slug);
        
        if (blogPost) {
          setBlog(blogPost);
        } else {
          // If no post found and slug is a number, use fallback data
          if (!isNaN(slug)) {
            setBlog(fallbackBlog);
          } else {
            setBlog(null);
          }
        }
        
        // Fetch recent posts for the sidebar
        const blogPageData = await fetchBlogPageData();
        if (blogPageData.posts && blogPageData.posts.length > 0) {
          // Show 3 most recent posts excluding current one
          const otherPosts = blogPageData.posts
            .filter(post => post.slug !== slug)
            .slice(0, 3);
          setRecentPosts(otherPosts);
        }
        
      } catch (error) {
        console.error('Error loading blog data:', error);
        // Use fallback data for numeric slugs
        if (!isNaN(slug)) {
          setBlog(fallbackBlog);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogData();
    }
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted email:", email);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!blog) {
    return notFound();
  }

  // Format date for display
  const formattedDate = blog.publishDate 
    ? new Date(blog.publishDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : blog.date || 'May 22, 2025';

  // Use the utility function for rich text rendering
  const renderRichText = renderRichTextAsHTML;

  return (
    <div>
      <BlogStructuredData blog={blog} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero
        title={blog.title}
        subtitle={blog.description || formattedDate}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          className="lg:py-[64px] lg:px-[80px] py-[40px] px-[24px]"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, rootMargin: "-20vh" }}
          variants={fadeIn}
        >
          <motion.img
            src={blog.cover ? getStrapiImageUrl(blog.cover) : "/blog/3.jpg"}
            className="md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-[140px] md:rounded-br-[20px] rounded-br-[12px] rounded-bl-[12px] rounded-tr-[60px] rounded-tl-[12px] w-full"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, rootMargin: "-20vh" }}
            variants={scaleIn}
          />
        </motion.div>
        <motion.div 
          className="p-[24px] lg:py-[80px] lg:pl-[90px] lg:pr-[80px]"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, rootMargin: "-20vh" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-[40px] lg:col-span-2 ">
              {/* Blog Post Metadata */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                <BlogPostMeta
                  author={blog.author}
                  publishDate={blog.publishDate}
                  categories={blog.categories}
                  hint={blog.hint}
                />
              </motion.div>

              <motion.h1 
                className="md:text-[48px] text-[34px] font-semibold"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                Introduction
              </motion.h1>
              <motion.div 
                className="text-[#3D4050] prose prose-lg max-w-none"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
                dangerouslySetInnerHTML={{ __html: renderRichText(blog.introduction) }}
              />
              
              {/* Display main rich text body (text) if available */}
              {blog.text && (
                <motion.div
                  className="text-[#3D4050] prose prose-lg max-w-none pt-[24px]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={fadeInUp}
                  dangerouslySetInnerHTML={{ __html: renderRichText(blog.text) }}
                />
              )}

              {/* Display quotes if available */}
              {blog.quotes && blog.quotes.length > 0 && (
                blog.quotes.map((quote, index) => (
                  <motion.div 
                    key={index}
                    className="py-[15px] px-[25px] flex flex-col gap-[40px] border-l-[2px] border-[#C209C1]"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, rootMargin: "-20vh" }}
                    variants={slideInLeft}
                  >
                    <h1 className="text-[24px] font-semibold">{quote.text}</h1>
                  </motion.div>
                ))
              )}

              {/* Display media if available */}
              {blog.media && blog.media.length > 0 && (
                blog.media.map((mediaItem, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col gap-[10px]"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, rootMargin: "-20vh" }}
                    variants={scaleIn}
                  >
                    <img
                      src={getStrapiImageUrl(mediaItem)}
                      className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] w-full"
                      alt={`Media ${index + 1}`}
                    />
                  </motion.div>
                ))
              )}
              
              {blog.conclusion && (
                <motion.div 
                  className="bg-[#E4E7FA] lg:py-[40px] lg:px-[40px] px-[20px] py-[20px] rounded-[20px] lg:gap-[30px] gap-[20px] flex flex-col"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={scaleIn}
                >
                  <h1 className="font-medium text-[30px]">Conclusion</h1>
                  <div 
                    className="text-[18px] text-[#3D4050] prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderRichText(blog.conclusion) }}
                  />
                </motion.div>
              )}
            </div>
            
            <motion.div 
              className="lg:flex hidden flex-col gap-[60px]"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, rootMargin: "-20vh" }}
              variants={slideInRight}
            >
              <motion.div 
                className="flex gap-[12px] flex-col xl:flex-row"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={scaleIn}
              >
                <div className="flex flex-col gap-[20px] rounded-[20px] bg-[#E4E7FA] py-[30px] px-[26px]">
                  <h1 className="text-[20px] font-semibold">
                    Subscribe to our
                    <br /> newsletter
                  </h1>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-[26px]">
                    <input
                      type="email"
                      placeholder="Type your email"
                      className="p-3 bg-white rounded-[10px] h-[40px]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="py-[10px] px-[24px] bg-[#BDFF00] text-[18px] rounded-[100px]">
                      Contact us
                    </button>
                  </form>
                </div>
                <motion.div 
                  className="flex xl:flex-col flex-row justify-between"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={fadeIn}
                >
                  <Link href={"#"}>
                    <img
                      src="/blog/insta.svg"
                      className="p-[4px] rounded-[8px]"
                    />
                  </Link>
                  <Link href={"#"}>
                    <img src="/blog/x.svg" className="p-[4px] rounded-[8px]" />
                  </Link>
                  <Link href={"#"}>
                    <img
                      src="/blog/linkedin.svg"
                      className="p-[4px] rounded-[8px]"
                    />
                  </Link>
                  <Link href={"#"}>
                    <img
                      src="/blog/pinterest.svg"
                      className="p-[4px] rounded-[8px]"
                    />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div 
                className="flex flex-col gap-[23px]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                <h2 className="text-[24px] font-semibold">Quick links</h2>
                <ul className="gap-[23px] flex flex-col">
                  {quickLinks.map((link, index) => (
                    <motion.li 
                      key={index}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, rootMargin: "-20vh" }}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={link.href}>
                        <div className="flex items-start gap-[12px] pl-3 hover:pl-0">
                          <img src="/blog/arrowRight.svg" />
                          <h2
                            className={`text-[16px] hover:text-[20px] hover:underline hover:font-semibold ${syne.className}`}
                          >
                            {link.label}
                          </h2>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {recentPosts.length > 0 && (
          <motion.div 
            className="lg:py-[64px] lg:px-[80px] p-[24px] flex flex-col gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, rootMargin: "-20vh" }}
            variants={fadeIn}
          >
            <motion.h1 
              className="md:text-[48px] text-[34px] font-semibold"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, rootMargin: "-20vh" }}
              variants={fadeInUp}
            >
              Recent Posts
            </motion.h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[43px] ">
              {recentPosts.map((item, index) => {
                const postDate = item.publishDate 
                  ? new Date(item.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'May 22, 2025';

                // Use slug for URL
                const postLink = item.slug ? `/blog/${item.slug}` : "#";

                return (
                  <Link key={index} href={postLink}>
                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, rootMargin: "-20vh" }}
                      variants={scaleIn}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card
                        title={item.title}
                        date={postDate}
                        image={item.cover ? getStrapiImageUrl(item.cover) : "/blog/1.jpg"}
                        link={postLink}
                        excerpt={item.description}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogDetailPage;
