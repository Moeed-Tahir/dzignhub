"use client";
import React, { useEffect } from "react";
import Image from "next/image";

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
  const [sessions, setSessions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Function to get browser icon based on browser name
  const getBrowserIcon = (browser) => {
    switch (browser?.toLowerCase()) {
      case 'chrome':
        return '/setting/chrome.svg';
      case 'safari':
        return '/setting/safari.svg';
      case 'firefox':
        return '/setting/firefox.svg';
      case 'edge':
        return '/setting/edge.svg';
      default:
        return '/setting/browser-default.svg'; // Default browser icon
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Function to get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return formatDate(dateString);
  };

  const getSessions = async() => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      
      if (data.type === "success") {
        console.log(data.sessions);
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSession = async(sessionId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      
      if (data.type === "success") {
        // Refresh sessions list
        getSessions();
      } else {
        alert('Error removing session');
      }
    } catch (error) {
      console.error('Error removing session:', error);
      alert('Error removing session');
    }
  };

  const logoutAllDevices = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout-all-devices`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      
      if (data.type === "success") {
        alert('Logged out from all other devices');
        // Refresh sessions list
        getSessions();
      } else {
        alert('Error logging out from all devices');
      }
    } catch (error) {
      console.error('Error logging out from all devices:', error);
      alert('Error logging out from all devices');
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A0856]"></div>
        <p className="mt-4 text-[#68686B]">Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
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
            You are logged in to {sessions.length} device{sessions.length !== 1 ? 's' : ''}.
          </span>
        </div>
        <div className="flex flex-col gap-8">
          {sessions.map((session, i) => (
            <div
              key={session._id || i}
              className="flex items-center flex-col xl:flex-row gap-4 justify-between py-4 border-b border-[#E3E9EE] last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-[56px] h-[56px] rounded-[16px] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                  <Image 
                    src={getBrowserIcon(session.deviceInfo?.browser)} 
                    alt={session.deviceInfo?.browser || 'Browser'} 
                    width={40} 
                    height={40} 
                  />
                </div>
                <div>
                  <div className="text-[#181B1F] text-[16px] font-semibold flex items-center gap-2">
                    {session.deviceInfo?.browser || 'Unknown Browser'} on {session.deviceInfo?.os || 'Unknown OS'}
                    {session.isCurrent && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[#7C878E] text-[14px]">
                    IP: {session.ipAddress}
                  </div>
                  <div className="text-[#7C878E] text-[14px]">
                    Last active: {getRelativeTime(session.lastActivity)}
                  </div>
                  <div className="text-[#7C878E] text-[12px]">
                    Signed in: {formatDate(session.createdAt)}
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <button 
                  onClick={() => removeSession(session._id)}
                  className="flex items-center gap-2 border text-[16px] font-semibold border-[#E3E9EE] rounded-full px-6 py-2 text-[#1B1F3B] cursor-pointer hover:bg-[#F6F6F6] transition"
                >
                  Remove {TrashIcon}
                </button>
              )}
              {session.isCurrent && (
                <span className="text-[#7C878E] text-[14px] italic">Current session</span>
              )}
            </div>
          ))}
        </div>
        {sessions.length > 1 && (
          <div className="mt-14">
            <button 
              onClick={logoutAllDevices}
              className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full w-[200px] py-[12px] justify-center cursor-pointer text-[14px] flex items-center gap-2 transition"
            >
              Sign out all devices
              <Image
                src={"/setting/logout.svg"}
                alt="logout icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;