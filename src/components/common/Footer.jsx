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
    <div className="w-full bg-[#1B1F3B] text-[#EDEDED]">
      <div className="w-[1440px] flex flex-col gap-[64px] py-[64px] px-[80px]">
        <div className="w-[1280px] flex justify-between">
          <div className="w-[320px] flex flex-col gap-[32px]">
            <img
              src="/common/footer/logo-with-name.svg"
              className="w-[185.07px] h-[35.26px]"
            />
            <div className="flex gap-[16px] h-[40px]">
              {socialLinks.map(({ alt, icon, href }, index) => (
                <Link key={index} href={href}>
                  <img src={icon} alt={alt} className="h-[40px] w-auto" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-[120px]">
            {footerLinks.map((section, i) => (
              <div
                key={i}
                className={`flex flex-col gap-[13px] ${roboto.classname}  text-[#FFFFFF]`}
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
        <div className="w-[1280px] flex flex-col gap-[16px] border-t border-[#E0E0E0]">
          <div className="w-full flex flex-col gap-[24px] items-center">
            <div className="flex gap-[24px] h-[40px] mx-auto items-center font-roboto text-[11.63px]">
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
          className={`w-[1280px] h-[26px] flex justify-between text-[16px] text-[#FFFFFF] ${syne.className} `}
          style={{}}
        >
          <div className="h-full flex gap-[24px] ">
            {navItems.map(({ label, href }, idx) => (
              <Link
                key={idx}
                href={href}
                className="hover:underline"
              >
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
