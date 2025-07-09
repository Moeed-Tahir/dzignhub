"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  LogOut,
  SettingsIcon,
  ChevronDown,
  Plus,
  MoreVertical,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import { MoveLeft } from "lucide-react";

const Navbar = ({ isCreationPage, isSettingPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { IsLogin, SetIsLogin, SetEmail, SetUserId, SetAvatar, Avatar } =
    useUserStore();
  // const IsLogin = true;
  const verifyToken = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("Token verification response:", data);

      if (data.type === "success") {
        SetIsLogin(true);
        SetEmail(data.user.email);
        SetUserId(data.user.userId);
        SetAvatar(data.user.avatar);
      } else {
        SetIsLogin(false);
      }
    } catch (error) {
      SetIsLogin(false);
      console.error("Token verification failed", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isAssistantsDropdownOpen, setIsAssistantsDropdownOpen] =
    useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const profileDropdownRef = useRef(null);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
        setIsWorkspaceDropdownOpen(false);
        setIsAssistantsDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      }
      // Note: We don't close sidebar here as it has its own overlay handling
    };

    // Add event listener when any dropdown is open
    if (
      isProfileDropdownOpen ||
      isWorkspaceDropdownOpen ||
      isAssistantsDropdownOpen ||
      isNotificationDropdownOpen
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isProfileDropdownOpen,
    isWorkspaceDropdownOpen,
    isAssistantsDropdownOpen,
    isNotificationDropdownOpen,
  ]);

  const getActiveMenu = (pathname) => {
    if (pathname === "/dashboard") return "Home";
    if (pathname.startsWith("/workspace") || pathname.startsWith("/dashboard"))
      return "Manual workspace";
    if (pathname.startsWith("/assistants")) return "Assistants";
    return "";
  };

  const activeMenu = getActiveMenu(pathname);

  const menuItems = [
    { name: "Home", href: "/dashboard", type: "link" },
    {
      name: "Manual workspace",
      href: "/workspace",
      type: "dropdown",
      key: "workspace",
    },
    {
      name: "Assistants",
      href: "/assistants",
      badge: "PRO",
      type: "dropdown",
      key: "assistants",
    },
  ];

  const assistants = [
    { name: "Zara", role: "(Brand Design)", isPro: false, avatar: "/Ai/ai-dp.png" },
    {
      name: "Sana",
      role: "(Content Creator)",
      isPro: false,
      avatar: "/Ai/sana.png",
    },
    {
      name: "Mira",
      role: "(Strategy Specialist)",
      isPro: false,
      avatar: "/Ai/mira.png",
    },
    {
      name: "Novi",
      role: "(SEO Specialist)",
      isPro: true,
      avatar: "/Ai/novi.png",
    },
    {
      name: "Kano",
      role: "(UX/UI Assistant)",
      isPro: true,
      avatar: "/Ai/kano.png",
    },
    {
      name: "Ellie",
      role: "(Pitch Deck)",
      isPro: true,
      avatar: "/Ai/ellie.png",
    },
  ];

  const SettingLinks = [
    {
      name: "Edit profile",
      href: "/setting/edit-profile",
      // icon: (color) => <Edit color={color} />,
    },
    {
      name: "Password",
      href: "/setting/password",
      // icon: (color) => <Lock color={color} />,
    },
    {
      name: "Notifications",
      href: "/setting/notifications",
      // icon: (color) => <Notification color={color} />,
    },
    {
      name: "Sessions",
      href: "/setting/sessions",
      // icon: (color) => <Star color={color} />,
    },
    {
      name: "Subscriptions",
      href: "/setting/subscriptions",
      // icon: (color) => <Crown color={color} />,
    },
    {
      name: "Delete Account",
      href: "/setting/delete-account",
      // icon: (color) => <Crown color={color} />,
    },
  ];

  const notifications = [
    {
      id: 1,
      icon: "/homepage/notifications/document.png",
      title: "allmyai",
      time: "17:10",
      description: "allmyai allmyai allmyai",
      isRead: false,
    },
    {
      id: 2,
      icon: "/homepage/notifications/message-text.png",
      title: "allmyai",
      time: "17:10",
      description: "allmyai allmyai allmyai",
      isRead: false,
    },
    {
      id: 3,
      icon: "/homepage/notifications/notification.png",
      title: "allmyai",
      time: "17:10",
      description: "allmyai allmyai allmyai",
      isRead: true,
    },
    {
      id: 4,
      icon: "/homepage/notifications/document.png",
      title: "allmyai",
      time: "17:10",
      description: "allmyai allmyai allmyai",
      isRead: true,
    },
  ];

  const handleMenuClick = (item) => {
    if (item.type === "dropdown") {
      if (item.key === "workspace") {
        setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen);
        setIsAssistantsDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      } else if (item.key === "assistants") {
        setIsAssistantsDropdownOpen(!isAssistantsDropdownOpen);
        setIsWorkspaceDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      }
    } else {
      setIsWorkspaceDropdownOpen(false);
      setIsAssistantsDropdownOpen(false);
      setIsNotificationDropdownOpen(false);
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsWorkspaceDropdownOpen(false);
    setIsAssistantsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (data.type == "success") {
      localStorage.removeItem("token");
      setIsProfileDropdownOpen(false);
      router.push("/auth/login");
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1280) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const [isMobileWorkspaceOpen, setIsMobileWorkspaceOpen] = useState(false);
  const [isMobileAssistantsOpen, setIsMobileAssistantsOpen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

  return (
    <nav
      className={`  ${
        isCreationPage ? "" : isSettingPage ? "m-5" : " m-8"
      } bg-white px-4 max-w-[1440px]   xl:mx-auto py-4 rounded-full`}
    >
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center ">
          {/* Remove Menu icon for mobile sidebar */}
          {/* Sidebar and its trigger removed as per request */}
          {pathname === "/dashboard/image-creation" && !isMobile ? (
            <>
              {" "}
              <button
                onClick={() => router.back()}
                className="flex items-center w-[44px] h-[44px] cursor-pointer justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
              >
                <MoveLeft className="w-[24px] h-[24px] " />
              </button>
              <p className="text-[18px] ml-[10px] font-bold text-black">
                Image Creation
              </p>
            </>
          ) : pathname === "/dashboard/video-creation" && !isMobile ? (
            <>
              {" "}
              <button
                onClick={() => router.back()}
                className="flex items-center w-[44px] cursor-pointer h-[44px]  justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
              >
                <MoveLeft className="w-[24px] h-[24px] " />
              </button>
              <p className="text-[18px] ml-[10px] font-bold text-black">
                Video Creation
              </p>
            </>
          ) : pathname.includes("/setting") && !isMobile ? (
            <>
              {" "}
              <button
                onClick={() => router.back()}
                className="flex items-center w-[44px] cursor-pointer h-[44px]  justify-center border p-1 border-[#E3E3E3] rounded-full hover:underline text-sm"
              >
                <MoveLeft className="w-[24px] h-[24px] " />
              </button>
              <p className="text-[18px] ml-[10px] font-bold text-black">
                Setting{" "}
              </p>
            </>
          ) : (
            <div
              className="flex justify-center cursor-pointer items-center gap-2"
              onClick={() => router.push("/")}
            >
              <Image
                src="/logo-icon.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-[26px] h-[26px]"
              />
              <span className="text-lg font-semibold text-gray-900">
                allmyai
              </span>
            </div>
          )}
        </div>

        {/* Center - Navigation Menu */}
        <div className="p-2 xl:flex items-center hidden  bg-[#F7F8F8] rounded-full space-x-1">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              {item.type === "link" ? (
                <Link href={item.href}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`relative px-4 py-2 rounded-full  cursor-pointer text-sm transition-all duration-200 flex items-center space-x-2 font-semibold text-[#202126] ${
                      activeMenu === item.name ? "text-black px-15" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeMenu === item.name
                          ? "var(--color-green)"
                          : "transparent",
                    }}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className="bg-[#C209C11A] text-[#C209C1] text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          fontFamily: "Jakarta Sans",
                          fontWeight: "700",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`relative cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-200 flex items-center  font-semibold text-[#202126] ${
                    activeMenu === item.name ? "text-black px-4" : ""
                  }`}
                  style={{
                    backgroundColor:
                      activeMenu === item.name
                        ? "var(--color-green)"
                        : "transparent",
                  }}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className="bg-[#C209C11A] text-[#C209C1] text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        fontFamily: "Jakarta Sans",
                        fontWeight: "700",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.key === "workspace" && (
                    <Plus className="w-3 h-3 ml-1" />
                  )}
                </button>
              )}

              {item.key === "workspace" && isWorkspaceDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute top-full left-0 mt-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <a
                    href="/dashboard/image-creation"
                    className="block px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Image Creation
                  </a>
                  <a
                    href="/dashboard/video-creation"
                    className="block px-4 py-2 font-normal text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Video Creation
                  </a>
                </div>
              )}

              {item.key === "assistants" && isAssistantsDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute top-full -left-15 mt-8 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {assistants.map((assistant) => (
                    <div key={assistant.name}>
                      <a
                        href={`/dashboard/Ai-Agent/${assistant.name.toLowerCase()}`}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <Image
                            src={`${assistant.avatar}`}
                            width={32}
                            height={32}
                            alt={assistant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-center items-center flex-row min-w-0">
                          <p className="text-black text-base font-semibold text-[#1B1F3B] truncate">
                            {assistant.name}
                          </p>
                          <p className="mx-2 text-gray-500 text-[#68686B] font-normal text-sm truncate">
                            {assistant.role}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Conditionally Rendered Section */}
        {IsLogin ? (
          <div
            id="rightNav"
            className="flex items-center bg-[#F7F8F8] rounded-full px-2 py-1"
            style={{ gap: "10px" }}
          >
            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="py-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Image
                  src="/homepage/notification.png"
                  alt="bell"
                  width={24}
                  height={24}
                />
              </button>

              {/* Notification Dropdown */}
              {isNotificationDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute top-full right-0 mt-1 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform translate-x-20"
                >
                  <div className="flex items-center justify-between px-4 py-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setIsNotificationDropdownOpen(false)}
                      className="hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                    >
                      <Image
                        src={"/homepage/notifications/close.png"}
                        alt="Close Icon"
                        width={64}
                        height={64}
                        className="w-7 h-7 p-2 cursor-pointer"
                      />
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50`}
                      >
                        <div className="flex cursor-pointer items-center justify-between">
                          <div className="mr-3 bg-[#C209C11A] rounded-full">
                            <Image
                              src={notification.icon}
                              alt="Notification Icon"
                              width={64}
                              height={64}
                              className="w-10 h-10 p-2"
                            />
                          </div>
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-space-between">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <span className="mx-2 text-xs text-gray-500">
                                  {notification.time}
                                </span>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-[#C209C1] rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                          <button className="ml-2 p-1 text-custom-blue hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-gray-200 flex space-x-2">
                    <button className="flex-1 px-4 py-2 cursor-pointer text-[#C209C1] text-sm font-medium rounded-full hover:bg-[#C209C122] transition-colors">
                      Mark all as read
                    </button>
                    <button
                      className="flex-1 px-4 py-2 cursor-pointer text-sm font-medium text-black rounded-full transition-colors"
                      style={{ backgroundColor: "var(--color-green)" }}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex cursor-pointer items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <Image
                    src={Avatar || "/avatar.png"}
                    width={50}
                    height={50}
                    alt="Profile"
                    className="rounded-full"
                  />
                </div>
                <ChevronDown className="w-5 h-5" />
              </button>

              {isProfileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 mt-2 w-[280px] xl:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {/* Show menuItems and sub-links in dropdown only on mobile */}
                  {isMobile && (
                    <div className="mb-2">
                      {menuItems.map((item) => (
                        <div key={item.name}>
                          <button
                            onClick={() => {
                              if (item.key === "workspace") {
                                setIsMobileWorkspaceOpen((prev) => !prev);
                                setIsMobileAssistantsOpen(false);
                                setIsMobileSettingsOpen(false);
                              } else if (item.key === "assistants") {
                                setIsMobileAssistantsOpen((prev) => !prev);
                                setIsMobileWorkspaceOpen(false);
                                setIsMobileSettingsOpen(false);
                              } else {
                                setIsProfileDropdownOpen(false);
                              }
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span>
                              {item.name}
                              {item.badge && (
                                <span className="ml-2 bg-[#C209C11A] text-[#C209C1] text-xs px-2 py-0.5 rounded-full font-semibold">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            {(item.key === "workspace" ||
                              item.key === "assistants") && (
                              <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                                  (item.key === "workspace" &&
                                    isMobileWorkspaceOpen) ||
                                  (item.key === "assistants" &&
                                    isMobileAssistantsOpen)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            )}
                          </button>
                          {/* Sub-links for Manual workspace */}
                          {item.key === "workspace" && (
                            <div
                              className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out ${
                                isMobileWorkspaceOpen ? "max-h-40" : "max-h-0"
                              }`}
                            >
                              <Link href="/dashboard/image-creation">
                                <button
                                  onClick={() =>
                                    setIsProfileDropdownOpen(false)
                                  }
                                  className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50"
                                >
                                  Image Creation
                                </button>
                              </Link>
                              <Link href="/dashboard/video-creation">
                                <button
                                  onClick={() =>
                                    setIsProfileDropdownOpen(false)
                                  }
                                  className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50"
                                >
                                  Video Creation
                                </button>
                              </Link>
                            </div>
                          )}
                          {/* Sub-links for Assistants */}
                          {item.key === "assistants" && (
                            <div
                              className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out ${
                                isMobileAssistantsOpen ? "max-h-96" : "max-h-0"
                              }`}
                            >
                              {assistants.map((assistant) => (
                                <div key={assistant.name}>
                                  <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                                  >
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                      <Image
                                        src={`/homepage/ai-assistants-dropdown${assistant.avatar}`}
                                        width={32}
                                        height={32}
                                        alt={assistant.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex justify-center items-center flex-row min-w-0">
                                      <p className=" text-base font-semibold text-[#1B1F3B] truncate">
                                        {assistant.name}
                                      </p>
                                      <p className="mx-2  text-[#68686B] font-normal text-sm truncate">
                                        {assistant.role}
                                      </p>
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {/* Settings dropdown for /setting routes */}
                      {pathname.startsWith("/setting") && (
                        <div>
                          <button
                            onClick={() => {
                              setIsMobileSettingsOpen((prev) => !prev);
                              setIsMobileWorkspaceOpen(false);
                              setIsMobileAssistantsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span>Settings</span>
                            <ChevronDown
                              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                                isMobileSettingsOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out ${
                              isMobileSettingsOpen ? "max-h-96" : "max-h-0"
                            }`}
                          >
                            {SettingLinks.map((link) => (
                              <Link key={link.name} href={link.href}>
                                <button
                                  onClick={() =>
                                    setIsProfileDropdownOpen(false)
                                  }
                                  className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  {link.icon && link.icon("#68686B")}
                                  {link.name}
                                </button>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      <hr className="my-1 border-gray-200" />
                    </div>
                  )}
                  <a
                    href="/setting/edit-profile"
                    className="xl:block px-4 hidden py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <SettingsIcon className="w-4 h-4 inline-block mr-2" />{" "}
                    Settings
                  </a>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={logout}
                    className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 "
                  >
                    <LogOut className="w-4 h-4 inline-block mr-2" /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <button className="px-6 py-2 cursor-pointer text-sm font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Login
              </button>
            </Link>
            <Link href="/auth/sign-up" className="hidden xl:flex">
              <button
                className="px-6 py-2 text-sm cursor-pointer font-semibold text-black rounded-full transition-colors"
                style={{ backgroundColor: "var(--color-green)" }}
              >
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
