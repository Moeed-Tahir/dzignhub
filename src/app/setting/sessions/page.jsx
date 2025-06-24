import React from "react";
import Image from "next/image";

const sessions = [
  {
    browser: "Safari",
    device: "Macbook Pro",
    ip: "222.225.225.222",
    date: "May 2, 2025",
    icon: "/setting/safari.svg",
  },
  {
    browser: "Safari",
    device: "Mac Pro",
    ip: "222.225.225.222",
    date: "May 2, 2025",
    icon: "/setting/safari.svg",
  },
  {
    browser: "Chrome",
    device: "Macbook Pro",
    ip: "222.225.225.222",
    date: "May 2, 2025",
    icon: "/setting/chrome.svg",
  },
  {
    browser: "Chrome",
    device: "iPhone",
    ip: "222.225.225.222",
    date: "May 2, 2025",
    icon: "/setting/chrome.svg",
  },
];

const TrashIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path
      d="M8 9v4m4-4v4M3 6h14M5 6v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6"
      stroke="#1B1F3B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"
      stroke="#1B1F3B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const InfoIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="9" stroke="#4B1C8C" strokeWidth="1.5" />
    <path
      d="M10 7.5v.01M10 9.5v3"
      stroke="#4B1C8C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const page = () => {
  return (
    <div className="bg-white flex-1 min-h-screen px-[160px] py-[80px] flex flex-col items-start">
      <h1 className="text-[#2A0856] text-[34px] font-semibold mb-2">
        Your sessions
      </h1>
      <p className="text-[#68686B] font-medium text-[16px] mb-10">
        Revoke any sessions that you do not recognize from the list of devices
        that have logged into your account.
      </p>
      <hr className="w-full border-[#E3E9EE] mb-10" />
      <div className="w-full max-w-[700px]">
        <div className="flex items-center gap-7 bg-[#F7F8F8] rounded-[10px] px-6 py-4 mb-10">
          {InfoIcon}
          <span className="text-[#2A0856] font-semibold text-[16px]">
            You logged in to two devices using two different web browsers.
          </span>
        </div>
        <div className="flex flex-col gap-8">
          {sessions.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-[#E3E9EE] last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-[56px] h-[56px] rounded-[16px] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                  <Image src={s.icon} alt={s.browser} width={40} height={40} />
                </div>
                <div>
                  <div className="text-[#181B1F] text-[16px] font-semibold">
                    {s.browser} on {s.device}
                  </div>
                  <div className="text-[#7C878E] text-[14px]">{s.ip}</div>
                  <div className="text-[#7C878E] text-[14px]">
                    Signed in {s.date}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 border text-[16px] font-semibold border-[#E3E9EE] rounded-full px-6 py-2 text-[#1B1F3B] cursor-pointer hover:bg-[#F6F6F6] transition">
                Remove {TrashIcon}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <button className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full w-[200px] py-[12px] justify-center cursor-pointer  text-[14px] flex items-center gap-2 transition">
            Sign out all devices
            <Image
              src={"/setting/logout.svg"}
              alt="location icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
