"use client";
import React, { useEffect, useState } from "react";

const CustomSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition flex items-center ${
      checked ? "justify-end bg-[#C209C1]" : "justify-start bg-gray-300"
    } px-1`}
    aria-checked={checked}
    role="switch"
  >
    <span className="w-5 h-5 bg-white rounded-full shadow" />
  </button>
);

const CustomCheckbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
      checked ? "bg-[#C209C1] border-[#C209C1]" : "bg-white border-[#E3E9EE]"
    }`}
    aria-checked={checked}
    role="checkbox"
  >
    {checked && (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M5 9.5L8 12.5L13 7.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);

const page = () => {
  const [allEnabled, setAllEnabled] = useState(true);
  const [checks, setChecks] = useState([false, false, false]);
  const [loading, setLoading] = useState(false);

  const handleCheck = (idx, value) => {
    setChecks((prev) => prev.map((c, i) => (i === idx ? value : c)));
  };

  const updateNotificationSettings = async() => {
    setLoading(true);

    console.log("Updated settings:", {
      allEnabled,
      checks,
    });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-notification-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          notifications: allEnabled,
          newNotifications: checks[0],
          softwareUpdatesNewsletter: checks[1],
          newMessagesFromBots: checks[2],
        }),
      });
  
      const data = await response.json();
  
      if (data.type === "success") {
        console.log("Notification settings updated successfully");
      } else {
        console.error("Failed to update notification settings");
      }
      alert(data.message);
    }
    catch (error) {
      console.error("Error updating notification settings:", error);
      alert("Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };

  const getNotificationSettings = async() => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-notification-settings`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      const data = await response.json();
  
      if (data.type === "success") {
        console.log("Notification settings fetched successfully");
        setAllEnabled(data.data.newNotifications && data.data.softwareUpdatesNewsletter && data.data.newMessagesFromBots);
        setChecks([
          data.data.newNotifications,
          data.data.softwareUpdatesNewsletter,
          data.data.newMessagesFromBots,
        ]);
      } else {
        console.error("Failed to update notification settings");
      }
    }
    catch (error) {
      console.error("Error updating notification settings:", error);
      alert("Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getNotificationSettings();
  }
  , []);


  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-[#2A0856] text-[34px] font-semibold mb-8">
          Notifications
        </h1>
        <div className="w-full flex justify-end mb-8">
          <CustomSwitch checked={allEnabled} onChange={setAllEnabled} />
        </div>
      </div>
      <hr className="w-full border-[#E3E9EE] mb-10" />
      <div className="w-full max-w-[600px]">
        <div className="text-[24px] font-semibold text-[#2A0856] mb-6">allmyai</div>
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              New notifications
            </span>
            <CustomCheckbox
              checked={checks[0]}
              onChange={(v) => handleCheck(0, v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              Software Updates and Newsletter
            </span>
            <CustomCheckbox
              checked={checks[1]}
              onChange={(v) => handleCheck(1, v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              New messages from bots
            </span>
            <CustomCheckbox
              checked={checks[2]}
              onChange={(v) => handleCheck(2, v)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-2">
         <button
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition flex items-center justify-center"
            onClick={updateNotificationSettings}
          >
            {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            "Save Changes"
          )}
          </button>
             <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
