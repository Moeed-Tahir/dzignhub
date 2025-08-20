"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Templates from "@/components/landing/Templates";
import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Carousel from "@/components/landing/Carousel";
import Download from "@/components/landing/Download";
import FeatureSection from "@/components/landing/FeatureSection";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Assistants from "@/components/landing/Assistants";
import Footer from "@/components/common/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Sidebar from "@/components/landing/Sidebar";
import { useState, useEffect } from "react";
import StackingImages from "@/components/animation/OurServices/Stack";
import CardsAnimation from "@/components/landing/CardsAnimation/CardsAnimation";
import { fetchLandingPageData } from "@/utils/strapi";

export default function Landing() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [landingData, setLandingData] = useState({
    mainHeading: "Turn Your Words Into Stunning Visuals",
    mainDescription: "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
    carouselImages: [],
    stackSections: [],
    workCards: [],
    templates: [],
    downloadSection: null,
    cards: [],
    pricingPlans: [],
    testimonialSection: null,
    assistantSection: null
  });

  useEffect(() => {
    const loadLandingData = async () => {
      try {
        const data = await fetchLandingPageData();
        console.log('Landing page data loaded:', data);
        console.log('Testimonial section specifically:', data.testimonialSection);
        console.log('Assistant section specifically:', data.assistantSection);
        setLandingData(data);
      } catch (error) {
        console.error('Error loading landing page data:', error);
        // Keep the default fallback data if there's an error
      }
    };

    loadLandingData();
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div
        className={`overflow-hidden w-full lg:h-[1095px] h-[1146px]  ${
          sidebarOpen ? "" : ""
        }`}
        style={{
          background: "linear-gradient(to bottom, #1B1F3B 56%, #c209c1 100%)",
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />

        <div className="lg:max-w-[1440px]  w-[100%] relative lg:mx-auto ">
          <div className="lg:max-w-[1280px] mx-auto lg:w-auto  min-w-[382px]  w-full  top-[24px]  flex flex-col lg:gap-[61px]">
            <Navbar
              showSidebarBtn={!sidebarOpen}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
            <Hero 
              mainHeading={landingData.mainHeading}
              mainDescription={landingData.mainDescription}
            />
          </div>
        </div>
      </div>

      <Carousel carouselImages={landingData.carouselImages} />

      
      {/* <StackingImages stackSections={landingData.stackSections} /> */}
      <Work workCards={landingData.workCards} />
      <Templates templates={landingData.templates} />
      <Download downloadSection={landingData.downloadSection} />
      {/* <FeatureSection /> */}
      {/* <CardsAnimation cards={landingData.cards} /> */}
      <div className=" mt-[-800px] sm:mt-[-400px] z-1000 relative ">
        <Pricing pricingPlans={landingData.pricingPlans} />
      </div>

      <Testimonials testimonialSection={landingData.testimonialSection} />
      <FAQ 
        faqData={landingData.faqSection?.faqs} 
        title={landingData.faqSection?.title}
        subtitle={landingData.faqSection?.subtitle}
      />

      <Assistants assistantSection={landingData.assistantSection} />
      <Footer />
    </>
  );
}
