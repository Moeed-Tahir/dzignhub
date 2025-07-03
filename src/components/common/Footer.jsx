import Link from "next/link";
import React from "react";
import { Roboto } from "next/font/google";
import LanguageDropdown from "./LanguageDropdown";
import { Syne } from "next/font/google";
const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Image Tools", href: "#" },
      { label: "Video Tools", href: "#" },
      { label: "Design Tools", href: "#" },
      { label: "AI Tools", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Colors", href: "#" },
      { label: "Fonts", href: "#" },
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
];
const socialLinks = [
  { alt: "Facebook", icon: "/common/footer/facebook.svg", href: "#" },
  { alt: "Twitter", icon: "/common/footer/twitter.svg", href: "#" },
  { alt: "Instagram", icon: "/common/footer/instagram.svg", href: "#" },
  { alt: "LinkedIn", icon: "/common/footer/linkedin.svg", href: "#" },
  { alt: "YouTube", icon: "/common/footer/youtube.svg", href: "#" },
  { alt: "Pinterest", icon: "/common/footer/pinterest.svg", href: "#" },
];

const policyLinks = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Do Not Sell or Share My Personal Information", href: "#" },
  { label: "Interest-Based Advertising", href: "#" },
  { label: "Community Guidelines", href: "#" },
  { label: "DMCA", href: "#" },
  { label: "Security Policy", href: "#" },
];

const navItems = [
  { label: "Use Case", href: "#" },
  { label: "Feature", href: "#" },
  { label: "Testimonial", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Articles", href: "#" },
];

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
function Footer() {
  return (
    <div className=" w-full bg-[#1B1F3B] text-[#EDEDED]">
      <div className="max-w-[1440px] mx-auto gap-[42px]  md:py-[64px] md:px-[80px] py-[32px] px-[24px] md:gap-[64px]   flex flex-col ">
        <div className="max-w-[1280px] w-full mx-auto  gap-[42px] md:gap-[64px]  flex md:flex-row flex-wrap flex-col justify-between">
          <div className="max-w-[320px] w-full border-black  flex flex-col  gap-[32px]">
            <img
              src="/common/footer/logo-with-name.svg"
              className="max-w-[185.07px]  max-h-[35.26px]"
            />
            <div className="flex justify-between    max-h-[40px]">
              {socialLinks.map(({ alt, icon, href }, index) => (
                <Link key={index} href={href}>
                  <img src={icon} alt={alt} className=" w-auto" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex  flex-wrap gap-[120px]">
            {footerLinks.map((section, i) => (
              <div
                key={i}
                className={`flex flex-col gap-[13px] ${roboto.className}  text-[#FFFFFF]`}
              >
                <h2 className="text-[20px] font-semibold">{section.title}</h2>
                {section.links.map((link, j) => (
                  <Link key={j} href={link.href} className="text-[13.89px]">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1280px] w-full mx-auto  flex flex-col gap-[16px] border-t border-[#E0E0E0]">
          <div className=" flex flex-col gap-[24px] py-[16px]  items-center">
            <div className="flex gap-[24px] flex-wrap   mx-auto items-center text-[11.63px]">
              {policyLinks.map(({ label, href }, index) => (
                <Link key={index} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <LanguageDropdown />
            <p className="text-[11.63px]">© 2025 PicsArt, Inc.</p>
          </div>
        </div>
        <div
          className={`max-w-[1280px] w-full mx-auto gap-[24px]  flex flex-col md:flex-row justify-between  flex-wrap text-[16px] text-[#FFFFFF] ${syne.className} `}
          style={{}}
        >
          <div className="h-full flex flex-col md:flex-row gap-[24px] ">
            {navItems.map(({ label, href }, idx) => (
              <Link key={idx} href={href} className="hover:underline">
                {label}
              </Link>
            ))}
          </div>
          <div>
            <span>© 2025 Copyright by </span>{" "}
            <span className="font-bold">Aiyaiya</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
