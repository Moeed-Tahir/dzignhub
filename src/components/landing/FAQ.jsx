import React, { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
const faqData = [
  {
    question: "What can I create with AllMyAI?",
    answer:
      "You can design lookbooks, pitch decks, product visuals, and brand assets — all in minutes.",
  },
  {
    question: "Is there a limit on how much I can create?",
    answer:
      "Free plans include a set number of creations each month. Pro plans let you create as much as you want.",
  },
  {
    question: "Can I customize the style?",
    answer:
      "Yes. From editorial campaigns to social-ready posts, you can pick the look and feel that fits your brand.",
  },
  {
    question: "Are the images safe to use?",
    answer: "Yes. All creations are copyright-free and yours to own.",
  },
  {
    question: "Does it work in different languages?",
    answer:
      "Yes. You can create in multiple languages to reach global customers.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "Our AI agents are trained to deliver high-quality visuals that stay on-brand.",
  },
  {
    question: "How long does it take to generate?",
    answer: "Most creations are ready in seconds.",
  },
  {
    question: "Can I export my work?",
    answer:
      "Yes. You can download in multiple formats for print, web, and social.",
  },
];

// Pricing-specific FAQ data as fallback
const pricingFaqData = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our trusted payment partners.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and no further charges will be made.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free plan that includes basic features and limited usage. You can upgrade to a paid plan at any time to access more features and higher usage limits.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team for a full refund.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.",
  },
  {
    question: "Are there any setup fees?",
    answer:
      "No, there are no setup fees or hidden charges. You only pay the subscription fee for your chosen plan.",
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer:
      "Yes, we offer custom enterprise plans for teams and organizations. Contact our sales team to discuss your specific requirements and pricing.",
  },
  {
    question: "How do I access my invoices?",
    answer:
      "You can access and download your invoices from your account dashboard. We also send email receipts for all payments.",
  },
];

function FAQ({
  faqData: propFaqData,
  title,
  subtitle,
  loading,
  pageContext = "general",
}) {
  // Determine which default data to use based on context
  const getDefaultFaqData = () => {
    if (pageContext === "pricing") {
      return pricingFaqData;
    }
    return faqData;
  };

  const getDefaultTitle = () => {
    if (pageContext === "pricing") {
      return "Pricing Questions?";
    }
    return "Have questions?";
  };

  const getDefaultSubtitle = () => {
    if (pageContext === "pricing") {
      return "Have questions about our pricing plans? Find the answers to the most common pricing and billing inquiries below. If you don't see your question, feel free to reach out!";
    }
    return "Here are the most common things founders ask. If you don’t see your question, reach out and we will help right away.";
  };

  // Use passed faqData or fallback to default data based on context
  const currentFaqData =
    propFaqData && propFaqData.length > 0 ? propFaqData : getDefaultFaqData();
  const currentTitle = title || getDefaultTitle();
  const currentSubtitle = subtitle || getDefaultSubtitle();

  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.1,
    once: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const faqListVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full overflow-hidden"
    >
      <div className="max-w-[1440px] h-auto flex mx-auto px-[20px] py-[40px] xl:p-[80px] gap-[56px] ">
        <div className="max-w-[1280px] rounded-[24px] gap-[56px] flex flex-col xl:flex-row">
          <motion.div
            variants={leftContentVariants}
            className="gap-[40px] xl:w-[483px] flex flex-col"
          >
            <div className="flex flex-col gap-[24px]">
              <motion.div
                variants={titleVariants}
                className="font-semibold text-[26px] xl:text-[48px] text-black leading-tight"
              >
                <span>Have </span>
                <span className="text-[#C209C1]">questions?</span>
              </motion.div>
              <motion.p variants={titleVariants} className="text-[18px]">
                {currentSubtitle}
              </motion.p>
            </div>
            {/* <motion.button 
              variants={buttonVariants}
              className="w-[194px] h-[56px] rounded-[999px] bg-[#BDFF00] font-medium text-[18px]"
            >
              View all questions
            </motion.button> */}
          </motion.div>

          <motion.div
            variants={faqListVariants}
            className="max-w-[741px] flex flex-col gap-[16px]"
          >
            {currentFaqData.map((item, index) => (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className="w-full rounded-[24px] bg-[#E4E7FA] p-[16px] xl:p-[24px] flex gap-[24px] items-start cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="xl:w-[629px] w-full flex flex-col gap-[16px]">
                  <h2 className="xl:text-[24px] text-[18px] text-[#000000] font-semibold">
                    {item.question}
                  </h2>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="text-[18px] text-[#3D4050]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <img
                  src={
                    openIndex === index
                      ? "/landing/faq/minus.svg"
                      : "/landing/faq/plus.svg"
                  }
                  alt="toggle icon"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default FAQ;
