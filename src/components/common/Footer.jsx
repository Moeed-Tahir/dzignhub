import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import LanguageDropdown from "./LanguageDropdown";
import { Syne } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { fetchFooterData } from "@/utils/strapi";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto",
});
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
});
    function Footer({ footerData = null }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.1,
    once: true
  });

  // State for dynamic footer data
  const [dynamicFooterData, setDynamicFooterData] = useState(footerData);
  const [dataLoading, setDataLoading] = useState(!footerData);

  // Fetch footer data if not provided via props
  useEffect(() => {
    if (!footerData) {
      const loadFooterData = async () => {
        try {
          setDataLoading(true);
          const data = await fetchFooterData();
          setDynamicFooterData(data);
        } catch (error) {
          console.error('Error loading footer data:', error);
        } finally {
          setDataLoading(false);
        }
      };

      loadFooterData();
    }
  }, [footerData]);

  // Use dynamic data if available, otherwise use static fallback
  const currentFooterData = dynamicFooterData || {
    logo: "/common/footer/logo-with-name.svg",
    logoAlt: "Company Logo",
    socialLinks: [
      { platform: "Facebook", icon: "/common/footer/facebook.svg", url: "#", alt: "Facebook" },
      { platform: "Twitter", icon: "/common/footer/twitter.svg", url: "#", alt: "Twitter" },
      { platform: "Instagram", icon: "/common/footer/instagram.svg", url: "#", alt: "Instagram" },
      // { platform: "LinkedIn", icon: "/common/footer/linkedin.svg", url: "#", alt: "LinkedIn" },
      { platform: "YouTube", icon: "/common/footer/youtube.svg", url: "#", alt: "YouTube" },
      // { platform: "Pinterest", icon: "/common/footer/pinterest.svg", url: "#", alt: "Pinterest" },
    ],
    footerSections: [
      {
        title: "Explore",
        links: [
          { label: "Image Tools", href: "/dashboard/image-creation" },
          { label: "Video Tools", href: "/dashboard/video-creation" },
          // { label: "Design Tools", href: "#" },
          // { label: "AI Tools", href: "#" },
          // { label: "Templates", href: "#" },
          // { label: "Colors", href: "#" },
          // { label: "Fonts", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          // { label: "Support", href: "#" },
          // { label: "Careers", href: "#" },
          // { label: "About us", href: "#" },
          { label: "Latest Blog", href: "/blog" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact Us", href: "/contact-us" },
          // { label: "Press Center", href: "#" },
        ],
      },
      {
        title: "AI assistants",
        links: [
          { label: "Zara - brand designer", href: "/dashboard/Ai-Agent/zara" },
          { label: "Sana - Content writer", href: "/dashboard/Ai-Agent/sana" },
          { label: "Mira - Strategy assistant", href: "/dashboard/Ai-Agent/mira" },
          { label: "Kano - UI/UX Designer", href: "/dashboard/Ai-Agent/kano" },
          { label: "Ellie - Pitch Deck Designer", href: "/dashboard/Ai-Agent/ellie" },
          // { label: "Devine - Software Developer", href: "/dashboard/Ai-Agent/devine" },
          // { label: "Lina - Marketing assistant", href: "/dashboard/Ai-Agent/lina" },
        ],
      },
    ],
    navigationItems: [
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      // { label: "FAQ", href: "#" },
      // { label: "Pricing", href: "#" },
      // { label: "Articles", href: "#" },
    ],
    copyrightText: "© 2025 Copyright by",
    companyName: "AllmyAi"
  };

  // Ensure we have valid data for each section with additional fallbacks
  const safeFooterData = {
    logo: currentFooterData.logo || "/common/footer/logo-with-name.svg",
    logoAlt: currentFooterData.logoAlt || "Company Logo",
    socialLinks: (currentFooterData.socialLinks && currentFooterData.socialLinks.length > 0) 
      ? currentFooterData.socialLinks 
      : [
          { platform: "Facebook", icon: "/common/footer/facebook.svg", url: "#", alt: "Facebook" },
          { platform: "Twitter", icon: "/common/footer/twitter.svg", url: "#", alt: "Twitter" },
          { platform: "Instagram", icon: "/common/footer/instagram.svg", url: "#", alt: "Instagram" },
          { platform: "LinkedIn", icon: "/common/footer/linkedin.svg", url: "#", alt: "LinkedIn" },
          { platform: "YouTube", icon: "/common/footer/youtube.svg", url: "#", alt: "YouTube" },
          { platform: "Pinterest", icon: "/common/footer/pinterest.svg", url: "#", alt: "Pinterest" },
        ],
    footerSections: (currentFooterData.footerSections && currentFooterData.footerSections.length > 0)
      ? currentFooterData.footerSections
      : [
          {
            title: "Explore",
            links: [
              { label: "Image Tools", href: "#" },
              { label: "Video Tools", href: "#" },
              // { label: "Design Tools", href: "#" },
              // { label: "AI Tools", href: "#" },
              // { label: "Templates", href: "#" },
              // { label: "Colors", href: "#" },
              // { label: "Fonts", href: "#" },
            ],
          },
          {
            title: "Solutions",
            links: [
              { label: "For Businesses", href: "#" },
              { label: "For Developers", href: "#" },
              { label: "For Google Drive", href: "#" },
              { label: "For specific Industries", href: "#" },
              { label: "Quicktools", href: "#" },
              { label: "AI Avatar", href: "#" },
              { label: "Pricing", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Support", href: "#" },
              { label: "Careers", href: "#" },
              { label: "About us", href: "#" },
              { label: "Affiliate Program", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Press Center", href: "#" },
            ],
          },
        ],
    navigationItems: (currentFooterData.navigationItems && currentFooterData.navigationItems.length > 0)
      ? currentFooterData.navigationItems
      : [
          { label: "Use Case", href: "#" },
          { label: "Feature", href: "#" },
          { label: "Testimonial", href: "#" },
          { label: "FAQ", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Articles", href: "#" },
        ],
    copyrightText: currentFooterData.copyrightText || "© 2025 Copyright by",
    companyName: currentFooterData.companyName || "Aiyaiya"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const logoSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linksSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const bottomSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className=" w-full bg-[#1B1F3B] text-[#EDEDED]"
    >
      <div className="max-w-[1440px] mx-auto gap-[42px]  md:py-[64px] md:px-[80px] py-[32px] px-[24px] md:gap-[64px]   flex flex-col ">
        <div className="max-w-[1280px] w-full mx-auto  gap-[42px] md:gap-[64px]  flex md:flex-row flex-wrap flex-col justify-between">
          <motion.div 
            variants={logoSectionVariants}
            className="max-w-[320px] w-full border-black  flex flex-col  gap-[32px]"
          >
            <img
              src={"/GreenLogo.svg"}
              alt={safeFooterData.logoAlt}
              className="max-w-[160px]  max-h-[35.26px]"
            />
            <div className="flex gap-2    max-h-[40px]">
              {safeFooterData.socialLinks.map((social, index) => (
                <Link key={index} href={social.url}>
                  <img src={social.icon} alt={social.alt} className=" w-auto" />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <LanguageDropdown />
            </div>
          </motion.div>
          <motion.div 
            variants={linksSectionVariants}
            className="flex  flex-wrap gap-[120px]"
          >
            {safeFooterData.footerSections.map((section, i) => (
              <motion.div
                key={i}
                variants={linksSectionVariants}
                className={`flex flex-col gap-[13px] ${roboto.className}  text-[#FFFFFF]`}
              >
                <h2 className="text-[20px] font-semibold">{section.title}</h2>
                {section.links.map((link, j) => (
                  <Link key={j} href={link.href} className="text-[13.89px]">
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div 
          variants={bottomSectionVariants}
          className="max-w-[1280px] w-full mx-auto  flex flex-col gap-[16px] border-t border-[#E0E0E0]"
        >
        
        </motion.div>
        <motion.div
          variants={bottomSectionVariants}
          className={`max-w-[1280px] w-full mx-auto gap-[24px]  flex flex-col md:flex-row justify-between  flex-wrap text-[16px] text-[#FFFFFF] ${syne.className} `}
          style={{}}
        >
          <div className="h-full flex flex-col md:flex-row gap-[24px] ">
            {safeFooterData.navigationItems.map(({ label, href }, idx) => (
              <Link key={idx} href={href} className="hover:underline">
                {label}
              </Link>
            ))}
          </div>
          <div>
            <span>{safeFooterData.copyrightText} </span>{" "}
            <span className="font-bold">{safeFooterData.companyName}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Footer;
