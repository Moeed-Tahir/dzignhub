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
    mainHeading: "AllMyAI SuperAI",
    mainDescription:
      "Your all-in-one AI Co-Creator. Bring your brand, products, and presentations to life. Instantly.",
    heroSection: null,
    carouselImages: [],
    stackSections: [],
    workCards: [],
    templates: [],
    downloadSection: null,
    cards: [],
    pricingPlans: [],
    testimonialSection: null,
    assistantSection: null,
  });

  useEffect(() => {
    const loadLandingData = async () => {
      try {
        const data = await fetchLandingPageData();
        console.log("Landing page data loaded:", data);
        console.log(
          "Testimonial section specifically:",
          data.testimonialSection
        );
        console.log("Assistant section specifically:", data.assistantSection);
        setLandingData(data);
      } catch (error) {
        console.error("Error loading landing page data:", error);
        // Keep the default fallback data if there's an error
      }
    };

    loadLandingData();
  }, []);

  // useEffect(() => {
  //   if (sidebarOpen) {
  //     document.body.style.overflow = "hidden"; // Freeze background
  //   } else {
  //     document.body.style.overflow = "auto"; // Restore scroll
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto"; // Cleanup
  //   };
  // }, [sidebarOpen]);

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
        className={`overflow-hidden w-full h-auto overflow-y-auto  ${
          sidebarOpen ? "" : ""
        }`}
        style={{
          backgroundImage: `url('/Frame.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
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
              heroSection={landingData.heroSection}
              mainHeading={landingData.mainHeading}
              mainDescription={landingData.mainDescription}
            />
          </div>
        </div>
      </div>

      <Work workCards={landingData.workCards} />
      <Templates templates={landingData.templates} />

      <div className="pb-0 mb-0">
        <Download downloadSection={landingData.downloadSection} />
      </div>

      <div>
        <CardsAnimation cards={landingData.cards} />
      </div>

      <div className="relative">
        <Pricing pricingPlans={landingData.pricingPlans} />
      </div>

      <Testimonials testimonialSection={landingData.testimonialSection} />
      <FAQ
        faqData={landingData.faqSection?.faqs}
        title={landingData.faqSection?.title}
        subtitle={landingData.faqSection?.subtitle}
      />

      <Footer />
    </>
  );
}
