"use client";
import React, { use, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/landing/Sidebar";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";
import Card from "@/components/blog/Card";
import Link from "next/link";
import { Syne } from "next/font/google";
import { notFound } from "next/navigation";
import blogs from "@/data/blogs.json";
import { motion } from "framer-motion";

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
function page() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    // You can add EmailJS, Axios, or validation logic here
  };
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return notFound();
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
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero
        title={blog.title}
        subtitle={blog.subtitle}
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
            src={blog.imageHeader}
            className="md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-[140px] md:rounded-br-[20px] rounded-br-[12px] rounded-bl-[12px] rounded-tr-[60px] rounded-tl-[12px] "
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
              <motion.p 
                className="text-[#3D4050]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                {blog.content.intro}
              </motion.p>
              <motion.div 
                className="flex flex-col gap-[10px]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={scaleIn}
              >
                <img
                  src={blog.image1}
                  className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px]  rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] "
                />
                <p className="text-[14px] text-[#3D4050]">
                  {blog.image1Reference}
                </p>
              </motion.div>
              <motion.div 
                className="py-[15px] px-[25px] flex flex-col gap-[40px] border-l-[2px] border-[#C209C1]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={slideInLeft}
              >
                <h1 className="text-[24px] font-semibold">{blog.quote}</h1>
                <p className="text-[16px] text-[#3D4050]">
                  {blog.quoteReference}
                </p>
              </motion.div>
              <motion.p 
                className="text-[18px] text-[#3D4050]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                {blog.content.afterQuote}
              </motion.p>
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
                <p className="">{blog.content.resources}</p>
                <ol className="list-decimal pl-5">
                  {blog.content.resourcesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </motion.div>
              <motion.div 
                className="flex flex-col gap-[10px]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={scaleIn}
              >
                <img
                  src={blog.image2}
                  className="lg:rounded-tl-[20px] lg:rounded-tr-[60px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-[12px]"
                />
                <p className="text-[14px] text-[#3D4050]">
                  {blog.image2Reference}
                </p>
              </motion.div>
              <motion.p 
                className="text-[18px] text-[#3D4050]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={fadeInUp}
              >
                {blog.content.final}
              </motion.p>
              <motion.div 
                className="bg-[#E4E7FA] lg:py-[40px] lg:px-[40px] px-[20px] py-[20px] rounded-[20px] lg:gap-[30px] gap-[20px] flex flex-col"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={scaleIn}
              >
                <h1 className="font-medium text-[30px]">Conclusion</h1>
                <p className="text-[18px] text-[#3D4050]">
                  {blog.content.conclusion}
                </p>
              </motion.div>
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
            Recents
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[43px] ">
            {blogData.map((item, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, rootMargin: "-20vh" }}
                variants={scaleIn}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  title={item.title}
                  date={item.date}
                  image={item.image}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
