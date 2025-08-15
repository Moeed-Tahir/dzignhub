"use client";
import Hero from "@/components/common/ai/Hero";
import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Sidebar from "@/components/landing/Sidebar";
import Card from "@/components/common/ai/Card";
import Work from "@/components/common/ai/Work";
import Footer from "@/components/common/Footer";
import FAQ from "@/components/landing/FAQ";
import Users from "@/components/common/landing/Users";
import Workflow from "@/components/common/ai/Workflow";
import ContentCreation from "@/components/common/ai/ContentCreation";
import AiResults from "@/components/common/ai/AiResults";
import SmartSupport from "@/components/common/ai/SmartSupport";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { fetchAssistantPageData } from "@/utils/strapi";

export default function RootLayout({ children }) {
  console.log('Layout: Component rendering');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantData, setAssistantData] = useState({});
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  console.log('Layout: Current slug:', slug);

  const slugToKeyMap = {
    "brand-designer": "brandDesigner",
    "content-writer": "contentWriter",
    "ui-ux": "ui_ux",
    "seo": "seo",
    "strategy-assistant":"strategyAssistant"
    // add more as needed
  };
  const currentKey = slugToKeyMap[slug];
   if (!currentKey) {
    notFound(); // navigate to 404
  }

  console.log('Layout: About to define useEffect');
  
  // Simple test effect to check if useEffect works at all
  useEffect(() => {
    console.log('*** SIMPLE TEST EFFECT RUNNING ***');
  }, []);
  
  // Fetch assistant data on component mount
  useEffect(() => {
    console.log('**** USEEFFECT CALLBACK EXECUTING ****');
    console.log('Layout: useEffect starting for slug:', slug);
    
    const loadAssistantData = async () => {
      try {
        setLoading(true);
        console.log('Layout: Starting to fetch assistant data...');
        const data = await fetchAssistantPageData();
        console.log('Layout: Fetched assistant data:', data);
        console.log('Layout: Data type:', typeof data);
        console.log('Layout: Data keys:', Object.keys(data));
        setAssistantData(data);
      } catch (error) {
        console.error('Layout: Error loading assistant data:', error);
        console.error('Layout: Error stack:', error.stack);
      } finally {
        setLoading(false);
        console.log('Layout: Loading complete, final assistantData status');
      }
    };

    loadAssistantData();
  }, []);
  
  console.log('Layout: useEffect defined, current assistantData:', assistantData);
  return (
    <>
      <div
        key={slug} // Add key to force re-render when slug changes
        className={`overflow-hidden w-full relative ${sidebarOpen ? "" : ""}`}
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
            <Hero currentKey={currentKey} assistantData={assistantData} loading={loading} />
          </div>
        </div>
      </div>
      <div className="bg-[#1B1F3B]">
        <div className="max-w-[1440px] mx-auto">
          <Work currentKey={currentKey} assistantData={assistantData} loading={loading} />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto">
        <Card currentKey={currentKey} assistantData={assistantData} loading={loading} />
      </div>
      <div className="bg-[#1B1F3B]">
        <div className="max-w-[1440px] mx-auto">
          <ContentCreation currentKey={currentKey} assistantData={assistantData} loading={loading} />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto">
        <Workflow currentKey={currentKey} assistantData={assistantData} loading={loading} />
        <AiResults />
        <SmartSupport currentKey={currentKey} assistantData={assistantData} loading={loading} />
        <Users />
        <FAQ />
      </div>

      <div className="bg-[#1B1F3B]">
        <div className="max-w-[1440px] mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
