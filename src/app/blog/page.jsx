"use client";
import React, { useState } from "react";
import Hero from "@/components/common/Hero";
import Sidebar from "@/components/landing/Sidebar";
import Card from "@/components/blog/Card";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[32px] gap-y-[43px] py-[64px] px-[80px]">
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
  );
}

export default Page;
