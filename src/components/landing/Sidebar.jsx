"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import DownloadApp from "./DownloadApp";

const links = [
  { href: "/video-creation", title: "Video Creation" },
  { href: "/image-creation", title: "Image Creation" },
  {
    href: "#",
    title: "AI Assistants",
    subheadings: [
      { href: "/ai/brand-designer", title: "Zara-brand designer" },
      { href: "/ai/content-writer", title: "Sana-Content writer" },
      { href: "/ai/ui-ux", title: "Kano- UI/UX Design companion" },
      { href: "/ai/seo", title: "Novi-SEO companion" },
      
    ],
  },
  { href: "/pricing", title: "Pricing" },
  { href: "/contact-us", title: "Contact us" },
  { href: "/blog", title: "Latest blog" },
];
const socialLinks = [
  { alt: "Facebook", icon: "/landing/sidebar/facebook.svg", href: "#" },
  { alt: "Twitter", icon: "/landing/sidebar/twitter.svg", href: "#" },
  { alt: "Instagram", icon: "/landing/sidebar/instagram.svg", href: "#" },
  { alt: "LinkedIn", icon: "/landing/sidebar/linkedin.svg", href: "#" },
  { alt: "YouTube", icon: "/landing/sidebar/youtube.svg", href: "#" },
  { alt: "Pinterest", icon: "/landing/sidebar/pinterest.svg", href: "#" },
];

function Sidebar({ onClose, open }) {
  const sidebarRef = useRef();
useEffect(() => {
  const el = sidebarRef.current;

  if (open) {
    gsap.fromTo(
      el,
      { x: "100%" },
      {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
        display: "block",
      }
    );
  } else {
    gsap.to(el, {
      x: "100%",
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        // Optional: hide the sidebar after animation completes
        el.style.display = "none";
      },
    });
  }
}, [open]);

  return (
    <div
      ref={sidebarRef}
      className={` ${open?"flex":"hidden"}  md:max-w-[800px] max-w-[94%] w-full absolute md:top-[24px] md:right-[24px] right-[3%] top-[10px] bg-[#FFFFFF] rounded-[40px] md:h-[976px] h-[900px]  z-50 overflow-auto`}
      onClick={(e) => e.stopPropagation()}
      >
      <div className="relative h-full">
        <img
          src="/landing/sidebar/cross-icon.svg"
          onClick={onClose}
          className="absolute top-[3%] right-[3%] md:h-[47px] md:w-[47px] h-[40px] w-[40px] cursor-pointer"
          />
        <div className="top-[4%] left-[4%] max-h-[55%] h-full  absolute flex flex-col md:gap-[20px] gap-[16px]">
          {links.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <div className="font-semibold text-[#000000] md:text-[20px] text-[18px]">
                  {item.title}
                </div>
              </Link>
              {item.subheadings && (
                <div className="flex flex-col gap-[6px] mt-[6px]">
                  {item.subheadings.map((sub, subIndex) => (
                    <Link href={sub.href} key={subIndex}>
                      <div className="md:text-[16px] text-[14px] text-[#3D4050]">
                        {sub.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
            
        </div>
        <div className="absolute md:top-[60%] top-[55%] max-w-[94%] left-[3%]  w-full border-black  flex flex-col gap-[16px] md:flex-row  justify-between">
          <img
            src="/landing/sidebar/logo-with-name.svg"
            className="max-w-[185.07px]  max-h-[35.26px]"
          />
          <div className="flex justify-between gap-[16px] mt-[16px] md:mt-[0px]  max-h-[40px]">
            {socialLinks.map(({ alt, icon, href }, index) => (
              <Link key={index} href={href}>
                <img src={icon} alt={alt} className=" w-auto" />
              </Link>
            ))}
          </div>
        </div>
        <div
          className="absolute md:top-[68%] top-[70%] max-w-[94%] left-[3%]  md:max-h-[30%] max-h-[28%] h-full w-full rounded-[25px] bg-cover bg-center"
          style={{ backgroundImage: "url('/landing/sidebar/download-bg.png')" }}
        >
          <DownloadApp/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
