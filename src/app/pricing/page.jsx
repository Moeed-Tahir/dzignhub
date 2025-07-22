"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/common/Footer";
import Plans from "@/components/pricing/Plans";

function page() {
  return (
    <div>
      <div className=" bg-[#1B1F3B] bg-[radial-gradient(ellipse_135%_120%_at_bottom,rgba(194,9,193,0.6)_0%,rgba(27,31,59,1)_50%)]">
        <div className="max-w-[1440px] mx-auto">
          <Navbar />
          <div className="flex lg:py-[64px] lg:px-[80px] py-[40px] px-[20px]">
            <div className="flex flex-col gap-[16px]">
              <button className="py-[8px] px-[16px] w-[145px] bg-white/10 border border-[#C209C1] rounded-[100px] text-white text-[18px] text-center">
                Subscriptions
              </button>
              <h1 className="font-bold lg:text-[68px] text-[46px] text-white">
                Pricing
              </h1>
            </div>
          </div>
        </div>
      </div>
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
