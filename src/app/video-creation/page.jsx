"use client";
import Hero from "@/components/ai/HeroSection";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Sidebar from "@/components/landing/Sidebar";
import GSAPScrollSection from "@/components/gsap-scroll-section";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import CreationWork from "@/components/creation/CreationWork";
import ToolKit from "@/components/creation/ToolKit";
import DownloadSection from "@/components/creation/DownloadSection";
import { fetchMediaPageData } from "@/utils/strapi";

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mediaData, setMediaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMediaData = async () => {
      try {
        setLoading(true);
        // console.log("VideoCreation: Starting to fetch media data...");
        const data = await fetchMediaPageData();
        // console.log("VideoCreation: Fetched media data:", data);
        setMediaData(data);
      } catch (error) {
        console.error("VideoCreation: Error loading media data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMediaData();
  }, []);

  const heroData = {
    headline: mediaData?.videoCreation?.hero?.headline || "Video Creation",
    subheadline:
      "Create stunning videos with ease. From campaign clips to social reels, your AI assistant helps you tell stories that move your audience.",
    ctaText: mediaData?.videoCreation?.hero?.ctaText || "Create video",
  };

  return (
    <div className={`overflow-hidden w-full relative ${sidebarOpen ? "" : ""}`}>
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <div className="bg-[url('/landing/image-creation/hero-bg.jpg')] bg-cover bg-center md:h-[885px] h-[955px]  relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <Navbar
            showSidebarBtn={!sidebarOpen}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        </div>
        <div className="max-w-[1440px] mx-auto">
          <Hero isVideoPage={true} heroData={heroData} loading={loading} />
        </div>
      </div>
      <div className="mt-[55px] md:w-full w-[90%] mx-auto  ">
        <p className="text-[30px] font-medium  md:text-[48px] md:font-semibold text-center text-black">
          <span className="text-[#C209C1] ">Powerful tools</span> for creators
          <br />
        </p>
        <p className="text-[18px] text-center text-[#3d4050] mt-2">
          Edit, enhance, and bring your vision to life with smart AI features
          that are always improving.
        </p>
      </div>
      <div className=" md:mt-[-200px] ">
        <GSAPScrollSection
          isImage={false}
          mediaData={mediaData}
          loading={loading}
        />
      </div>

      <div className="mx-auto ">
        <CreationWork isImage={false} mediaData={mediaData} loading={loading} />
        <ToolKit isImage={false} mediaData={mediaData} loading={loading} />
        <FAQ
          faqData={mediaData?.videoCreation?.faq?.faqs}
          title={mediaData?.videoCreation?.faq?.title}
          subtitle={mediaData?.videoCreation?.faq?.subtitle}
          loading={loading}
        />
        <DownloadSection
          isImage={false}
          mediaData={mediaData}
          loading={loading}
        />
        <Footer />
      </div>
    </div>
  );
};

export default page;
