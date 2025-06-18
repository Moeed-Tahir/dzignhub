"use client";
import { useState } from "react";
import Image from "next/image";
import {
  LogOut,
  SettingsIcon,
  ChevronDown,
  Plus,
  MoreVertical,
} from "lucide-react";

const Navbar = ({ isCreationPage }) => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isAssistantsDropdownOpen, setIsAssistantsDropdownOpen] =
    useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const menuItems = [
    { name: "Home", href: "/", type: "link" },
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
    { name: "Zara", role: "(Brand Design)", isPro: false, avatar: "/zara.png" },
    {
      name: "Sana",
      role: "(Content Creator)",
      isPro: false,
      avatar: "/sana.png",
    },
    {
      name: "Mira",
      role: "(Strategy Specialist)",
      isPro: false,
      avatar: "/mira.png",
    },
    {
      name: "Novi",
      role: "(SEO Specialist)",
      isPro: true,
      avatar: "/novi.png",
    },
    {
      name: "Kano",
      role: "(UX/UI Assistant)",
      isPro: true,
      avatar: "/kano.png",
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
      console.log(`Navigating to ${item.href}`);
      setActiveMenu(item.name);
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

  return (
    <nav className={`  ${isCreationPage?"":"m-8"} bg-white px-4 py-4 rounded-full`}>
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-6 h-6"
          />
          <span className="text-lg font-semibold text-gray-900">allmyai</span>
        </div>

        {/* Center - Navigation Menu */}
        <div className="p-2 flex items-center bg-[#F7F8F8] rounded-full space-x-1">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => handleMenuClick(item)}
                className={`relative px-4 py-2 rounded-full text-sm  transition-all duration-200 flex items-center space-x-2 font-semibold text-[#202126] ${
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
                    className="bg-[#C209C11A] text-[#C209C1] text-xs px-2 py-0.5 rounded-full font-semibold "
                    style={{
                      fontFamily: "Jakarta Sans",
                      fontWeight: "700",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.key === "workspace" && <Plus className="w-3 h-3 ml-1" />}
              </button>

              {/* Workspace Dropdown */}
              {item.key === "workspace" && isWorkspaceDropdownOpen && (
                <div className="absolute top-full left-0 mt-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                  >
                    Image Creation
                  </a>
                  <a
                    href="/dashboard/video-creation"
                    className="block px-4 py-2 font-normal text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Video Creation
                  </a>
                </div>
              )}

              {/* Assistants Dropdown */}
              {item.key === "assistants" && isAssistantsDropdownOpen && (
                <div className="absolute top-full -left-15 mt-8 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {assistants.map((assistant, index) => (
                    <div key={assistant.name}>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
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

        {/* Right - Notifications & Profile */}
        <div
          id="rightNav"
          className="flex items-center bg-[#F7F8F8] rounded-full px-2 py-1"
          style={{ gap: "10px" }}
        >
          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
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
              <div className="absolute top-full right-0 mt-1 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform translate-x-20">
                <div className="flex items-center justify-between px-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setIsNotificationDropdownOpen(false)}
                    className="hover:bg-gray-100 rounded-full transition-colors"
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
                      <div className="flex items-center justify-between">
                        <div className="mr-3 bg-[#C209C11A] rounded-full">
                          <Image
                            src={notification.icon}
                            alt="Notification Icon"
                            width={64}
                            height={64}
                            className="w-10 h-10 p-2"
                          />
                          {/* {notification.icon} */}
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
                  <button className="flex-1 px-4 py-2  text-[#C209C1] text-sm font-medium rounded-full hover:bg-[#C209C122] transition-colors">
                    Mark all as read
                  </button>

                  <button
                    className="flex-1 px-4 py-2 text-sm font-medium text-black rounded-full transition-colors"
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
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                <Image
                  src="/avatar.png"
                  width={50}
                  height={50}
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <SettingsIcon className="w-4 h-4 inline-block mr-2" />{" "}
                  Settings
                </a>

                <hr className="my-1 border-gray-200" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4 inline-block mr-2" /> Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
