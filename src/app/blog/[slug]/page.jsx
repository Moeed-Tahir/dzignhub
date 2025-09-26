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
import {
  fetchBlogPostBySlug,
  fetchBlogPageData,
  getStrapiImageUrl,
} from "@/utils/strapi";
import { renderRichTextAsHTML } from "@/utils/richText";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: "easeOut" },
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
  introduction:
    "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
  quotes: [
    {
      text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
    },
  ],
  media: ["/blog/blogDetail.jpg", "/blog/blogDetail2.jpg"],
  conclusion:
    "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.",
  metaTitle: "The Ultimate Guide",
  metaDescription: "Essential guide for getting started",
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
            .filter((post) => post.slug !== slug)
            .slice(0, 3);
          setRecentPosts(otherPosts);
        }
      } catch (error) {
        console.error("Error loading blog data:", error);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B1F3B] to-[#2D1B3B]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return notFound();
  }

  // Format date for display
  const formattedDate = blog.publishDate
    ? new Date(blog.publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : blog.date || "May 22, 2025";

  // Use the utility function for rich text rendering
  const renderRichText = renderRichTextAsHTML;

  return (
    <div className="min-h-screen bg-white">
      <BlogStructuredData blog={blog} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />

      {/* Updated Hero usage without description */}
      <Hero
        title={blog.title}
        subtitle={formattedDate} // Using date as subtitle instead of description
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Featured Image */}
        <motion.div
          className="lg:py-[64px] lg:px-[80px] py-[40px] px-[24px]"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, rootMargin: "-20vh" }}
          variants={fadeIn}
        >
          <motion.img
            src={blog.cover ? getStrapiImageUrl(blog.cover) : "/blog/3.jpg"}
            alt={blog.title}
            className="md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-[140px] md:rounded-br-[20px] rounded-br-[12px] rounded-bl-[12px] rounded-tr-[60px] rounded-tl-[12px] w-full h-[400px] object-cover shadow-xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, rootMargin: "-20vh" }}
            variants={scaleIn}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="p-[24px] lg:py-[80px] lg:pl-[90px] lg:pr-[80px]"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, rootMargin: "-20vh" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Content */}
            <div className="flex flex-col gap-[40px] lg:col-span-2">
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

              {/* Introduction Section */}
              <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                <h2 className="md:text-[48px] text-[34px] font-semibold mb-6 text-gray-900">
                  Introduction
                </h2>
                <div
                  className="text-[#3D4050] prose prose-lg max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: renderRichText(blog.introduction),
                  }}
                />
              </motion.section>

              {/* Main Content */}
              {blog.text && (
                <motion.section
                  className="pt-[24px]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={fadeInUp}
                >
                  <div
                    className="text-[#3D4050] prose prose-lg max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blog.text),
                    }}
                  />
                </motion.section>
              )}

              {/* Quotes */}
              {blog.quotes && blog.quotes.length > 0 && (
                <motion.section
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={slideInLeft}
                >
                  {blog.quotes.map((quote, index) => (
                    <div
                      key={index}
                      className="py-[25px] px-[30px] border-l-4 border-[#C209C1] bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-lg my-6"
                    >
                      <blockquote className="text-[24px] font-semibold text-gray-800 italic">
                        "{quote.text}"
                      </blockquote>
                    </div>
                  ))}
                </motion.section>
              )}

              {/* Media Gallery */}
              {blog.media && blog.media.length > 0 && (
                <motion.section
                  className="grid gap-6"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={scaleIn}
                >
                  {blog.media.map((mediaItem, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      <img
                        src={getStrapiImageUrl(mediaItem)}
                        alt={`${blog.title} - Image ${index + 1}`}
                        className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] w-full h-[300px] object-cover shadow-lg"
                      />
                    </div>
                  ))}
                </motion.section>
              )}

              {/* Conclusion */}
              {blog.conclusion && (
                <motion.section
                  className="bg-gradient-to-br from-[#E4E7FA] to-[#F0E4FA] lg:py-[40px] lg:px-[40px] px-[20px] py-[20px] rounded-[20px]"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, rootMargin: "-20vh" }}
                  variants={scaleIn}
                >
                  <h2 className="font-semibold text-[30px] mb-4 text-gray-900">
                    Conclusion
                  </h2>
                  <div
                    className="text-[18px] text-[#3D4050] prose prose-lg max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blog.conclusion),
                    }}
                  />
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <motion.aside
              className="lg:flex hidden flex-col gap-[60px] sticky top-8 h-fit"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, rootMargin: "-20vh" }}
              variants={slideInRight}
            >
              {/* Social Sharing */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                variants={scaleIn}
              >
                <h3 className="text-[20px] font-semibold mb-4 text-gray-900">
                  Share this post
                </h3>
                <div className="flex gap-3 justify-center">
                  {[
                    {
                      icon: "/blog/insta.svg",
                      label: "Instagram",
                      link: "https://www.instagram.com/allmyai/",
                    },
                    {
                      icon: "/blog/x.svg",
                      label: "X",
                      link: "https://x.com/AllMyAiofficial",
                    },
                    {
                      icon: "/blog/linkedin.svg",
                      label: "LinkedIn",
                      link: "https://www.linkedin.com/company/all-my-ai/",
                    },
                    {
                      icon: "/blog/pinterest.svg",
                      label: "Pinterest",
                      link: "https://www.pinterest.com/allmyai/",
                    },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.link}
                      className="p-2 bg-gray-50 hover:bg-purple-50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="w-10 h-10"
                      />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              {/* <motion.div
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                variants={fadeInUp}
              >
                <h3 className="text-[24px] font-semibold mb-6 text-gray-900">
                  Quick links
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={link.href} className="group block">
                        <div className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1">
                          <div className="w-2 h-2 bg-[#C209C1] rounded-full mt-2 flex-shrink-0 transition-transform group-hover:scale-150"></div>
                          <span className="text-[16px] text-gray-700 group-hover:text-gray-900 group-hover:font-medium leading-relaxed">
                            {link.label}
                          </span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div> */}

              {/* Newsletter Signup */}
              {/* <motion.div
                className="bg-gradient-to-br from-[#1B1F3B] to-[#2D1B3B] p-6 rounded-xl text-white"
                variants={fadeInUp}
              >
                <h3 className="text-[20px] font-semibold mb-3">Stay Updated</h3>
                <p className="text-gray-300 mb-4">
                  Get the latest articles delivered to your inbox
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#C209C1]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#C209C1] hover:bg-[#A808A7] text-white py-2 rounded-lg transition-colors duration-300 font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </motion.div> */}
            </motion.aside>
          </div>
        </motion.div>

        {/* Recent Posts Section */}
        {recentPosts.length > 0 && (
          <motion.section
            className="lg:py-[64px] lg:px-[80px] p-[24px] bg-gray-50"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, rootMargin: "-20vh" }}
            variants={fadeIn}
          >
            <motion.h2
              className="md:text-[48px] text-[34px] font-semibold mb-8 text-gray-900"
              variants={fadeInUp}
            >
              Recent Posts
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => {
                const postDate = post.publishDate
                  ? new Date(post.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "May 22, 2025";

                const postLink = post.slug ? `/blog/${post.slug}` : "#";

                return (
                  <Link key={index} href={postLink}>
                    <motion.div
                      variants={scaleIn}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      className="h-full"
                    >
                      <Card
                        title={post.title}
                        date={postDate}
                        image={
                          post.cover
                            ? getStrapiImageUrl(post.cover)
                            : "/blog/1.jpg"
                        }
                        link={postLink}
                        excerpt={post.description}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogDetailPage;
