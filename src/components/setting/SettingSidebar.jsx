"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Crown from "@/app/assets/crown";
import React from "react";
import Edit from "@/app/assets/edit";
import Lock from "@/app/assets/lock";
import Notification from "@/app/assets/notification-status";
import Star from "@/app/assets/star";
import Image from "next/image";
const navItems = [
  {
    name: "Edit profile",
    href: "/setting/edit-profile",
    icon: (color) => <Edit color={color} />,
  },
  {
    name: "Password",
    href: "/setting/password",
    icon: (color) => <Lock color={color} />,
  },
  {
    name: "Notifications",
    href: "/setting/notifications",
    icon: (color) => <Notification color={color} />,
  },
  {
    name: "Sessions",
    href: "/setting/sessions",
    icon: (color) => <Star color={color} />,
  },
  {
    name: "Subscriptions",
    href: "/setting/subscriptions",
    icon: (color) => <Crown color={color} />,
  },
];

export default function SettingSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Collapse sidebar on mobile by default
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`transition-all duration-300 bg-white border-r-4 border-[#E3E9EE] xl:flex hidden  py-[80px] ${
        collapsed ? "w-[75px]" : "w-[360px]"
      }`}
    >
      <div className="flex flex-col gap-[16px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const iconColor = isActive ? "#1B1F3B" : "#68686B";
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={` py-[14px] ${
                  !collapsed
                    ? "mx-[48px] py-[14px] px-[32px] "
                    : "mx-[7px] py-[7px]  px-[7px]"
                } rounded-full flex justify-center lg:justify-start   items-center lg:gap-2 cursor-pointer transition ${
                  isActive
                    ? " text-[#1B1F3B] border-[#C209C1] border font-medium text-[14px]"
                    : " text-[#68686B] border border-[#E3E9EE] text-[14px] font-medium"
                } ${collapsed ? "justify-center px-0 mx-0" : ""}`}
              >
                {item.icon(iconColor)}
                <span
                  className={` ml-2 ${
                    collapsed ? "hidden" : "inline"
                  } md:inline`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
        <Link
          href="/setting/delete-account"
          className={`${
            !collapsed ? "px-[48px]" : "px-[7px] py-[7px] "
          }  border-t-[#E3E9EE] border-t-2 `}
        >
          <div
            className={` mt-4 text-red-500 border border-[#E3E9EE] rounded-full text-start transition font-medium flex items-center gap-2 ${
              collapsed
                ? "justify-center px-0 py-[12px] "
                : "py-[14px] px-[32px] "
            }`}
          >
            <Image
              src={"/setting/trash.svg"}
              alt="delete account"
              width={20}
              height={20}
              className={`inline-block ${collapsed ? "" : "mr-2"}`}
            />
            <span className={`${collapsed ? "hidden" : "inline"} md:inline`}>
              Delete account
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
