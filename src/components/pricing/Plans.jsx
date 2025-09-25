"use client";
import React from "react";
import { Syne, Inter } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Plans() {
  const planData = [
    {
      feature: "Who it's for",
      free: "Explore & test",
      pro: "Launch & grow",
      enterprise: "Scale with teams",
    },
    {
      feature: "Launches",
      free: "1 brand launch",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      feature: "AI Agents",
      free: "Core agents only",
      pro: "All agents unlocked",
      enterprise: "All agents unlocked",
    },
    {
      feature: "Files & Exports",
      free: "Basic downloads",
      pro: "High-res downloads",
      enterprise: "Advanced exports (multilingual, SCORM, branded pages)",
    },
    {
      feature: "Collaboration",
      free: "Solo use",
      pro: "Up to 5 team members",
      enterprise: "Custom team size",
    },
    {
      feature: "Support",
      free: "Community support",
      pro: "Priority support",
      enterprise: "Dedicated manager + SLA",
    },
    {
      feature: "Branding",
      free: "Standard",
      pro: "Custom branding",
      enterprise: "Full white-label",
    },
    {
      feature: "Extras",
      free: "—",
      pro: "Smart updates, remove watermarks",
      enterprise: "API access, integrations, analytics",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto xl:p-[80px] xl:pb-[80px] py-[40px] px-[24px]">
      <div className="flex flex-col gap-[64px]">
        <h1 className="font-semibold md:text-[48px] md:text-center text-[28px] text-black">
          Compare plans
        </h1>

        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className={`min-w-[800px] ${inter.className}`}>
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="col-span-1"></div>
              <div className="text-center">
                <h3
                  className={`font-semibold text-[24px] text-black ${syne.className}`}
                >
                  Free
                </h3>
              </div>
              <div className="text-center">
                <h3
                  className={`font-semibold text-[24px] text-black ${syne.className}`}
                >
                  Pro
                </h3>
              </div>
              <div className="text-center">
                <h3
                  className={`font-semibold text-[24px] text-black ${syne.className}`}
                >
                  Enterprise
                </h3>
              </div>
            </div>

            {/* Feature Rows */}
            {planData.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-6 py-6 px-4 ${
                  index % 2 === 0 ? "bg-[#E4E7FA] rounded-[12px]" : ""
                }`}
              >
                <div className="font-medium text-[16px] flex items-center">
                  {row.feature}
                </div>
                <div className="text-center text-[16px] flex items-center justify-center">
                  {row.free}
                </div>
                <div className="text-center text-[16px] flex items-center justify-center">
                  {row.pro}
                </div>
                <div className="text-center text-[16px] flex items-center justify-center">
                  {row.enterprise}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;
