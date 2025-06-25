import React from "react";
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});
import { Syne } from "next/font/google";
function Pricing() {
  const pricing = [
    {
      plan: "Basic",
      price: "$0 /mo",
      benefits: [
        "Up to 500 characters per conversion",
        "Access to basic voices",
        "Limited to 5 conversions per month",
        "No API access",
        "24/7 support for onboarding",
      ],
      button: "Get started for free",
    },
    {
      plan: "Pro Plan",
      price: "$19.99 /mo",
      benefits: [
        "Up to 50,000 characters per conversion",
        "Access to premium voices (multiple accents)",
        "Unlimited conversions",
        "Priority customer support",
        "API integration",
        "24/7 support for onboarding",
      ],
      button: "Upgrade to Pro",
    },

    {
      plan: "Enterprise Plan",
      price: "Custom (Contact Us)",
      benefits: [
        "Unlimited characters per conversion",
        "Custom voice creation",
        "Dedicated account manager",
        "Advanced API access",
        "SLA-backed performance guarantees",
        "24/7 premium support",
        "Priority customer support",
      ],
      button: "Contact us",
    },
    // Add more plans if needed
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      <div className="max-w-[1440px]  p-[80px] gap-[56px] flex flex-col mx-auto">
        {/* Heading */}
        <div className="text-[48px] font-semibold flex gap-[10px]">
          <span className="text-[#C209C1]">Flexible</span>
          <span className="text-[#000000]">Pricing</span>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-[1280px] flex-col xl:flex-row gap-[28px] justify-center items-center flex">
          {pricing.map((plan, index) => {
            const isPro = plan.plan === "Pro Plan";

            return (
              <div
                key={index}
                className={`xl:w-[32%] w-[500px] h-auto py-10 xl:py-5 rounded-[16px] flex flex-col gap-[8px] justify-center ${
                  isPro ? "" : "bg-[#1B1F3B]"
                }`}
                style={
                  isPro
                    ? {
                        background:
                          "linear-gradient(0deg, #050912 25%, #a00aa1 100%)",
                      }
                    : undefined
                }
              >
                <div className="w-[368px] h-[470px] gap-[24px] mx-auto flex flex-col">
                  {/* Plan title and price */}
                  <div className="h-[98px] gap-[16px] flex flex-col">
                    <button className="w-fit self-start py-[6px] px-[12px] h-[36px] rounded-[50px] bg-white/10 text-[#EAEDFA] text-[16px]">
                      {plan.plan}
                    </button>
                    <h2 className="text-[#EAEDFA] text-[34px] font-semibold">
                      {plan.price}
                    </h2>
                  </div>

                  {/* Benefits */}
                  <div className="w-full h-full flex flex-col gap-[18px] text-[#FFFFFF] text-[16px]">
                    <h2 className="font-medium text-[30px]">
                      Included Benefits
                    </h2>
                    <div className="flex flex-col gap-[15px]">
                      {plan.benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-[8px] items-start">
                          <img
                            src="/landing/pricing/tick.svg"
                            className="w-[24px] h-[24px] mt-[2px]"
                            alt="tick"
                          />
                          <p>{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`px-6 py-3 w-[368px] mx-auto text-[16px] font-medium ${
                    syne.className
                  } cursor-pointer rounded-[40px] border backdrop-blur-[12px] shadow-[0px_8px_10.9px_#0003121F,0px_1px_1px_#0003124D] ${
                    isPro
                      ? "bg-[#BDFF00]  text-[#1B1F3B]"
                      : "bg-white/5 border-[#C6F1F7] text-white"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
