"use client";
import React,{useState, useEffect} from "react";
import Sidebar from "@/components/landing/Sidebar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import Plans from "@/components/pricing/Plans";
import Hero from "@/components/common/Hero";
import { fetchPricingPageData } from "@/utils/strapi";

function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [pricingPageData, setPricingPageData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Fetch pricing page data
    useEffect(() => {
        const loadPricingPageData = async () => {
            try {
                setDataLoading(true);
                const data = await fetchPricingPageData();
                setPricingPageData(data);
            } catch (error) {
                console.error('Error loading pricing page data:', error);
            } finally {
                setDataLoading(false);
            }
        };

        loadPricingPageData();
    }, []);
  return (
    <div>
       <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero 
        title={!dataLoading && pricingPageData?.heroSection?.title ? pricingPageData.heroSection.title : "Pricing"} 
        subtitle={!dataLoading && pricingPageData?.heroSection?.subtitle ? pricingPageData.heroSection.subtitle : "Subscriptions"} 
        setSidebarOpen={setSidebarOpen} 
        sidebarOpen={sidebarOpen}
      />
      <div className="max-w-[1440px] py-[64px] justify-center flex items-center mx-auto overflow-hidden">
        <div className="flex flex-col gap-[33px] justify-center items-center">
          <img
            src="/landing/image-creation/avatars.svg"
            className={`max-w-[90%] max-h-[90px] mx-auto transition-all duration-800 ease-out transform ${isContentVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          />
          <div className="flex flex-col gap-[9px] max-w-[715px] justify-center items-center">
            <div className={`text-[34px] text-[#C209C1] text-center font-semibold transition-all duration-900 ease-out transform ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                 style={{ transitionDelay: '400ms' }}>
              Ready to scale your video production?
            </div>
            <p className={`text-[18px] sm:max-w-[70%] text-center transition-all duration-1000 ease-out transform ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
               style={{ transitionDelay: '600ms' }}>
              Synthesia is the world's #1 rated AI video software. It's used by
              50,000+ teams to create videos at scale, saving up to 80% of their
              time and budget.
            </p>
          </div>
        </div>
      </div>
      <Pricing pricingPlans={!dataLoading && pricingPageData?.planSection ? pricingPageData.planSection : []} />
      <Plans plansData={!dataLoading && pricingPageData?.plansData ? pricingPageData.plansData : null} />
      <Testimonials testimonialSection={!dataLoading && pricingPageData?.testimonialsSection ? pricingPageData.testimonialsSection : null} />
      <FAQ 
        faqData={!dataLoading && pricingPageData?.faqSection?.faqs ? pricingPageData.faqSection.faqs : null}
        title={!dataLoading && pricingPageData?.faqSection?.title ? pricingPageData.faqSection.title : null}
        subtitle={!dataLoading && pricingPageData?.faqSection?.subtitle ? pricingPageData.faqSection.subtitle : null}
        loading={dataLoading}
        pageContext="pricing"
      />
      <Footer />
    </div>
  );
}

export default page;
