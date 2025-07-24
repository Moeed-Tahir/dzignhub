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

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});
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
        <div className="lg:py-[64px] lg:px-[80px] py-[40px] px-[24px] ">
          <img
            src={blog.imageHeader}
            className="md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-[140px] md:rounded-br-[20px] rounded-br-[12px] rounded-bl-[12px] rounded-tr-[60px] rounded-tl-[12px] "
          />
        </div>
        <div className="p-[24px] lg:py-[80px] lg:pl-[90px] lg:pr-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-[40px] lg:col-span-2 ">
              <h1 className="md:text-[48px] text-[34px] font-semibold">
                Introduction
              </h1>
              <p className="text-[#3D4050]">{blog.content.intro}</p>
              <div className="flex flex-col gap-[10px]">
                <img
                  src={blog.image1}
                  className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px]  rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] "
                />
                <p className="text-[14px] text-[#3D4050]">
                  {blog.image1Reference}
                </p>
              </div>
              <div className="py-[15px] px-[25px] flex flex-col gap-[40px] border-l-[2px] border-[#C209C1]">
                <h1 className="text-[24px] font-semibold">{blog.quote}</h1>
                <p className="text-[16px] text-[#3D4050]">
                  {blog.quoteReference}
                </p>
              </div>
              <p className="text-[18px] text-[#3D4050]">
                {blog.content.afterQuote}
              </p>
              <h1 className="lg:text-[30px] text-[34px] lg:font-medium font-semibold">
                Other Resources
              </h1>
              <div className="text-[18px] text-[#3D4050]">
                <p className="">{blog.content.resources}</p>
                <ol className="list-decimal pl-5">
                  {blog.content.resourcesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col gap-[10px]">
                <img
                  src={blog.image2}
                  className="lg:rounded-tl-[20px] lg:rounded-tr-[60px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-[12px]"
                />
                <p className="text-[14px] text-[#3D4050]">
                  {blog.image2Reference}
                </p>
              </div>
              <p className="text-[18px] text-[#3D4050]">{blog.content.final}</p>
              <div className="bg-[#E4E7FA] lg:py-[40px] lg:px-[40px] px-[20px] py-[20px] rounded-[20px] lg:gap-[30px] gap-[20px] flex flex-col ">
                <h1 className="font-medium text-[30px]">Conclusion</h1>
                <p className="text-[18px] text-[#3D4050]">
                  {blog.content.conclusion}
                </p>
              </div>
            </div>
            <div className="lg:flex hidden flex-col gap-[60px]">
              <div className="flex gap-[12px] flex-col xl:flex-row">
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
                <div className="flex xl:flex-col flex-row justify-between">
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
                </div>
              </div>
              <div className="flex flex-col gap-[23px]">
                <h2 className="text-[24px] font-semibold">Quick links</h2>
                <ul className="gap-[23px] flex flex-col">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
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
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:py-[64px] lg:px-[80px] p-[24px] flex flex-col gap-4">
          <h1 className="md:text-[48px] text-[34px] font-semibold">Recents</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[43px] ">
            {blogData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
