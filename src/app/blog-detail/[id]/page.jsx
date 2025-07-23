"use client";
import React, { useState } from "react";
import Sidebar from "@/components/landing/Sidebar";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";
import Card from "@/components/blog/Card";
function page() {
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
        title={"The Ultimate Guide"}
        subtitle={"News and Articles"}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <div className="max-w-[1440px] mx-auto">
        <div className="lg:py-[64px] lg:px-[80px] py-[40px] px-[24px] ">
          <img
            src="/blog/3.jpg"
            className="md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-[140px] md:rounded-br-[20px] rounded-br-[12px] rounded-bl-[12px] rounded-tr-[60px] rounded-tl-[12px] "
          />
        </div>
        <div className="p-[24px] lg:py-[80px] lg:pl-[90px] lg:pr-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded">Item 1</div>
            <div className="bg-gray-100 p-4 rounded">Item 2</div>
            
          </div>
        </div>
        <div className="py-[64px] px-[80px] flex flex-col gap-4">
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
