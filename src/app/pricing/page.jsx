"use client";
import React,{useState} from "react";
import Sidebar from "@/components/landing/Sidebar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import Plans from "@/components/pricing/Plans";
import Hero from "@/components/common/Hero";
function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
       <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <Hero title={"Pricing"} subtitle={"Subscriptions"} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      <div className="max-w-[1440px] py-[64px] justify-center flex items-center mx-auto">
        <div className="flex flex-col gap-[33px] justify-center items-center ">
          <img
            src="/landing/image-creation/avatars.svg"
            className="max-w-[90%] max-h-[90px] mx-auto"
          />
          <div className="flex flex-col gap-[9px] max-w-[715px] justify-center items-center">
            <div className="text-[34px]  text-[#C209C1] text-center font-semibold">
              Ready to scale your video production?
            </div>
            <p className="text-[18px] sm:max-w-[70%] text-center">
              Synthesia is the world's #1 rated AI video software. It's used by
              50,000+ teams to create videos at scale, saving up to 80% of their
              time and budget.
            </p>
          </div>
        </div>
      </div>
      <Pricing />
      <Plans/>
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default page;
