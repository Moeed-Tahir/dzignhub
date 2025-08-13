"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/landing/Sidebar";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";
import Card from "@/components/blog/Card";
import Link from "next/link";
import { Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { fetchBlogPostBySlug, fetchBlogPageData, getStrapiImageUrl } from "@/utils/strapi";

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
  excerpt: "News and Articles",
  date: "May 22, 2025",
  imageHeader: "/blog/3.jpg",
  image1: "/blog/blogDetail.jpg",
  image1Reference: "Image courtesy of Jasmin Chew via Pexels",
  image2: "/blog/blogDetail2.jpg",
  image2Reference: "Image courtesy of Jasmin Chew via Pexels",
  quoteReference: "--Olivia Rhye, Product Designer",
  quote: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
  contentIntro: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
  contentAfterQuote: "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam.",
  contentResources: "Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit.",
  contentResourcesList: [
    "Lectus id duis vitae porttitor enim gravida morbi.",
    "Eu turpis posuere semper feugiat volutpat elit...",
    "Suspendisse maecenas ac donec scelerisque diam..."
  ],
  contentFinal: "Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit.",
  conclusion: "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies."
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
  const formattedDate = blog.date 
    ? new Date(blog.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'May 22, 2025';

  // Helper function to render rich text content
  const renderRichText = (content) => {
    if (!content) return '';
    
    // If it's already a string, return it
    if (typeof content === 'string') return content;
    
    // If it's rich text from Strapi, extract the text
    if (Array.isArray(content)) {
      return content.map(block => {
        if (block.type === 'paragraph') {
          return block.children.map(child => child.text).join('');
        }
        return '';
      }).join('\n');
    }
    
    return content;
  };

  return (
    <div>
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero
        title={blog.title}
        subtitle={blog.excerpt || formattedDate}
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
            src={blog.imageHeader ? getStrapiImageUrl(blog.imageHeader) : "/blog/3.jpg"}
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
                dangerouslySetInnerHTML={{ __html: renderRichText(blog.contentIntro) }}
              />
              
              {(blog.image1 || blog.image1Reference) && (
                <motion.div 
                  className="flex flex-col gap-[10px]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={scaleIn}
                >
                  <img
                    src={blog.image1 ? getStrapiImageUrl(blog.image1) : "/blog/blogDetail.jpg"}
                    className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] w-full"
                  />
                  {blog.image1Reference && (
                    <p className="text-[14px] text-[#3D4050]">
                      {blog.image1Reference}
                    </p>
                  )}
                </motion.div>
              )}
              
              {(blog.quote || blog.quoteReference) && (
                <motion.div 
                  className="py-[15px] px-[25px] flex flex-col gap-[40px] border-l-[2px] border-[#C209C1]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={slideInLeft}
                >
                  {blog.quote && (
                    <h1 className="text-[24px] font-semibold">{blog.quote}</h1>
                  )}
                  {blog.quoteReference && (
                    <p className="text-[16px] text-[#3D4050]">
                      {blog.quoteReference}
                    </p>
                  )}
                </motion.div>
              )}
              
              {blog.contentAfterQuote && (
                <motion.div 
                  className="text-[18px] text-[#3D4050] prose prose-lg max-w-none"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={fadeInUp}
                  dangerouslySetInnerHTML={{ __html: renderRichText(blog.contentAfterQuote) }}
                />
              )}
              
              {(blog.contentResources || blog.contentResourcesList) && (
                <>
                  <motion.h1 
                    className="lg:text-[30px] text-[34px] lg:font-medium font-semibold"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, rootMargin: "-20vh" }}
                    variants={fadeInUp}
                  >
                    Other Resources
                  </motion.h1>
                  <motion.div 
                    className="text-[18px] text-[#3D4050]"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, rootMargin: "-20vh" }}
                    variants={fadeInUp}
                  >
                    {blog.contentResources && (
                      <div 
                        className="prose prose-lg max-w-none mb-4"
                        dangerouslySetInnerHTML={{ __html: renderRichText(blog.contentResources) }}
                      />
                    )}
                    {blog.contentResourcesList && blog.contentResourcesList.length > 0 && (
                      <ol className="list-decimal pl-5">
                        {blog.contentResourcesList.map((item, index) => (
                          <li key={index}>{typeof item === 'object' ? item.text : item}</li>
                        ))}
                      </ol>
                    )}
                  </motion.div>
                </>
              )}
              
              {(blog.image2 || blog.image2Reference) && (
                <motion.div 
                  className="flex flex-col gap-[10px]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={scaleIn}
                >
                  <img
                    src={blog.image2 ? getStrapiImageUrl(blog.image2) : "/blog/blogDetail2.jpg"}
                    className="lg:rounded-tl-[20px] lg:rounded-tr-[60px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-[12px] w-full"
                  />
                  {blog.image2Reference && (
                    <p className="text-[14px] text-[#3D4050]">
                      {blog.image2Reference}
                    </p>
                  )}
                </motion.div>
              )}
              
              {blog.contentFinal && (
                <motion.div 
                  className="text-[18px] text-[#3D4050] prose prose-lg max-w-none"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={fadeInUp}
                  dangerouslySetInnerHTML={{ __html: renderRichText(blog.contentFinal) }}
                />
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
                const postDate = item.date 
                  ? new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'May 22, 2025';

                // Use the link field from Strapi, or create one from slug
                const postLink = item.link || (item.slug ? `/blog/${item.slug}` : "#");

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
                        image={item.featuredImage ? getStrapiImageUrl(item.featuredImage) : "/blog/1.jpg"}
                        link={postLink}
                        excerpt={item.excerpt}
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
