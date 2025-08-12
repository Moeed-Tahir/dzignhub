import React from "react";
import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import Link from "next/link";
import { getStrapiImageUrl } from "@/utils/strapi";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-syne",
});

function Pricing({ pricingPlans = [] }) {
  // Default fallback data
  const defaultPricing = [
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
      buttonLabel: "Get started for free",
      link: "/auth/sign-up"
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
      buttonLabel: "Upgrade to Pro",
      link: "/pricing"
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
      buttonLabel: "Contact us",
      link: "/contact-us"
    },
  ];

  // Process Strapi pricing plans data or use defaults
  const pricing = pricingPlans.length > 0 
    ? pricingPlans.map((plan, index) => ({
        plan: plan.plan || defaultPricing[index]?.plan || "Plan",
        price: plan.price || defaultPricing[index]?.price || "$0 /mo",
        benefits: plan.benefits?.map(benefit => benefit.text || benefit) || defaultPricing[index]?.benefits || [],
        buttonLabel: plan.buttonLabel || defaultPricing[index]?.buttonLabel || "Get Started",
        link: plan.link || defaultPricing[index]?.link || "#"
      }))
    : defaultPricing;


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const benefitVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div 
      className="w-full bg-[#FAFAFA]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1440px] px-[20px] py-[40px] xl:p-[80px] gap-[56px] flex flex-col mx-auto">
        {/* Heading */}
        <motion.div 
          className="xl:text-[48px] text-[26px] font-semibold flex gap-[10px]"
          variants={headingVariants}
        >
          <motion.span 
            className="text-[#C209C1]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Flexible
          </motion.span>
          <span className="text-[#000000]">Pricing</span>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className=" flex-col xl:flex-row gap-[28px] justify-center items-center flex"
          variants={containerVariants}
        >
          {pricing.map((plan, index) => {
            const isPro = plan.plan === "Pro Plan";

            return (
              <motion.div
                key={index}
                className={`xl:w-[32%] w-[100%] px-5  py-10 xl:py-5 rounded-[16px]  flex flex-col ${
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
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div 
                  className="max-w-[368px] xl:h-[460px] gap-[24px] flex flex-col"
                  variants={containerVariants}
                >
                  {/* Plan title and price */}
                  <motion.div 
                    className="xl:h-[98px] gap-[16px] flex flex-col"
                    variants={headingVariants}
                  >
                    <motion.button 
                      className="w-fit self-start py-[6px] px-[12px] h-[36px] rounded-[50px] bg-white/10 text-[#EAEDFA] text-[16px]"
                      variants={buttonVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {plan.plan}
                    </motion.button>
                    <motion.h2 
                      className="text-[#EAEDFA] text-[34px] font-semibold"
                      variants={headingVariants}
                    >
                      {plan.price}
                    </motion.h2>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div 
                    className="w-full h-full flex flex-col gap-[18px] text-[#FFFFFF] text-[16px]"
                    variants={containerVariants}
                  >
                    <motion.h2 
                      className="font-medium text-[30px]"
                      variants={headingVariants}
                    >
                      Included Benefits
                    </motion.h2>
                    <motion.div 
                      className="flex flex-col gap-[15px]"
                      variants={containerVariants}
                    >
                      {plan.benefits.map((benefit, i) => (
                        <motion.div 
                          key={i} 
                          className="flex gap-[8px] items-start"
                          variants={benefitVariants}
                        >
                          <motion.img
                            src="/landing/pricing/tick.svg"
                            className="w-[24px] h-[24px] mt-[2px]"
                            alt="tick"
                            initial={{ scale: 0, rotate: 0 }}
                            whileInView={{ scale: 1, rotate: 360 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          />
                          <p>{benefit}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* CTA Button */}
                <Link href={plan.link} >
                <motion.button
                 
                  className={`px-6 py-3 xl:max-w-[368px] w-full lg:w-[90%] mt-5 mx-auto text-[16px] font-medium ${
                    syne.className
                  } cursor-pointer rounded-[40px] border backdrop-blur-[12px] shadow-[0px_8px_10.9px_#0003121F,0px_1px_1px_#0003124D] ${
                    isPro
                      ? "bg-[#BDFF00]  text-[#1B1F3B]"
                      : "bg-white/5 border-[#C6F1F7] text-white"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {plan.buttonLabel}
                </motion.button>
                  </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Pricing;
