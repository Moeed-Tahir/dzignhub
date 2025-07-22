"use client";
import Hero from "@/components/ai/HeroSection";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Sidebar from "@/components/landing/Sidebar";
import GSAPScrollSection from "@/components/gsap-scroll-section";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";

const page = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className={`overflow-hidden w-full relative ${sidebarOpen ? "" : ""}`}>
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
      <div className="mt-[55px] ">
        <p className="text-[48px] font-semibold text-center text-black">
          <span className="text-[#C209C1] font-semibold">Most advanced</span>{" "}
          tools for Image
          <br />
          editing in one place
        </p>
        <p className="text-[18px] text-center text-[#3d4050] mt-2">
          We constantly add new features and improve existing ones.
        </p>
      </div>
      <div className="mt-[-200px] ">
        <GSAPScrollSection />
      </div>
      <div className="mx-auto mt-[-4500px]">
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default page;
