"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const links = [
  { href: "#", title: "Video Creation" },
  { href: "#", title: "Image Creation" },
  {
    href: "#",
    title: "AI Assistants",
    subheadings: [
      { href: "#", title: "Zara-brand designer" },
      { href: "#", title: "Sana-Content writer" },
      { href: "#", title: "Kano- UI/UX Design companion" },
      { href: "#", title: "Novi-SEO companion" },
    ],
  },
  { href: "#", title: "Pricing" },
  { href: "#", title: "Contact us" },
  { href: "#", title: "Latest blog" },
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
        }
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={sidebarRef}
      className="md:max-w-[62%] max-w-[94%] w-full absolute md:top-[24px] md:right-[24px] right-[3%] top-[10px] bg-[#FFFFFF] rounded-[40px] md:max-h-[68%] max-h-[75%] h-full z-50 overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-full">
        <img
          src="/landing/sidebar/cross-icon.svg"
          onClick={onClose}
          className="absolute top-[3%] right-[3%] md:h-[47px] md:w-[47px] h-[40px] w-[40px] cursor-pointer"
        />
        <div className="top-[3%] left-[3%] max-h-[55%] h-full  absolute flex flex-col gap-[12px]">
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
        <div className="absolute md:top-[60%] top-[55%] max-w-[94%] left-[3%]  w-full border-black  flex flex-col md:flex-row  justify-between">
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
          className="absolute md:top-[70%] top-[70%] max-w-[94%] left-[3%]  max-h-[27%] h-full w-full rounded-[25px] bg-cover bg-center"
          style={{ backgroundImage: "url('/landing/sidebar/download-bg.png')" }}
        >
          <div className="relative h-full">
            <img
              src="/landing/sidebar/iphone.png"
              alt="Iphone"
              className="absolute md:h-full h-[115.3px] bottom-0 object-contain md:right-[20%] right-[0%]"
            />
            <div className="flex flex-col md:gap-[12px] gap-[10px] w-full md:max-w-[50%]  px-[20px] py-[20px]  text-[#FFFFFF]">
              <h2 className="md:text-[20px] text-[18px] font-semibold">
                {" "}
                Download Your One & Only App Now
              </h2>
              <p className="md:text-[16px] text-[#b2b5c7] text-[14px]">
                Chose from a selection of high-quality AI models and experiment
                a selection of settings and presets.
              </p>

              <button className="absolute left-[20px] bottom-[10%] text-black w-[186px] h-[48px] px-[24px] py-[spacing-lg] rounded-[40px] border border-[#BDFF00] bg-[#BDFF00] backdrop-blur-[12px] shadow-[0px_8px_10.9px_#0003121F,0px_1px_1px_#0003124D]">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
