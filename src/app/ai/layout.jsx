"use client";
import Hero from "@/components/common/ai/Hero";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Sidebar from "@/components/landing/Sidebar";
import Work from "@/components/common/ai/Work";
import Card from "@/components/common/ai/Card";
import Footer from "@/components/common/Footer";
import FAQ from "@/components/landing/FAQ";
import Users from "@/components/common/landing/Users";
export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <>
          <div
            className={`overflow-hidden w-full relative ${
              sidebarOpen ? "" : ""
            }`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
            <div className="bg-[url('/landing/image-creation/hero-bg.jpg')] bg-cover bg-center md:h-[885px] h-[883px] sm:h-[813px] relative overflow-hidden">
              <div className="max-w-[1440px] mx-auto">
                <Navbar
                  showSidebarBtn={!sidebarOpen}
                  onOpenSidebar={() => setSidebarOpen(true)}
                />
              </div>
              <div className="max-w-[1440px] mx-auto">
                <Hero />
              </div>
            </div>
          </div>
          <div className="bg-[#1B1F3B]">
          <div className="max-w-[1440px] mx-auto">
          <Work/>
          </div>
          </div>
          <div className="max-w-[1440px] mx-auto">
          <Card/>
          <Users/>
          <FAQ/>
          </div>

          <div className="bg-[#1B1F3B]">
          <div className="max-w-[1440px] mx-auto">
          <Footer/>
          </div>
          </div>
        </>
      </body>
    </html>
  );
}
