"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Convert to proper React components
const TrashIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
    <path d="M9 10.5v4m4-4v4M4 7.5h14M6 7.5v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-10" stroke="#1B1F3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7.5v-2a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="#1B1F3B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const LockIcon = (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="4" stroke="#6B6B6B" strokeWidth="1.5"/>
    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#6B6B6B" strokeWidth="1.5"/>
  </svg>
);

const page = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const handleDeleteAccount = async() => {
    if (!password) {
      alert("Please enter your password");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({password:password}),
      });

      const data = await response.json();
      if (data.type === "success") {
        alert("Account deleted successfully");
        router.push("/auth/login");
      }
      else {
        alert(data.message || "Failed to delete account");
        console.error("Error deleting account:", data.message);
      }
    }
    catch (error) {
      console.error("Error deleting account:", error);
    }
    finally {
      setIsLoading(false);
      setPassword('');
    }
  }
  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
      <h1 className="text-[#2A0856] text-[34px] font-semibold mb-12">We’re sorry to see you go</h1>
      <hr className="w-full border-[#E3E9EE] mb-12" />
      <div className="w-full max-w-[800px]">
        <p className="text-[#68686B] font-medium text-[16px] mb-12">Warning: Deleting your account will permanently remove all of your data and cannot be undone. This includes your profile, conversations, comments, and any other information associated with your account. Are you sure you want to proceed with deleting your account?</p>
        <div className="flex flex-col gap-8">
          <div>
                <label className="text-[#68686B] text-[14px] font-semibold  ">
                  Your password
                </label>
                <div className="relative">
                  <input
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[40px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
                    placeholder=" Enter your password"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    {" "}
                    <Image
                      src={"/setting/unlock.svg"}
                      alt="location icon"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                <span className="text-[#68686B] font-medium text-[12px] mt-2 block">
                  Minimum 12 characters
                </span>
              </div>
          <div className="flex flex-col xl:flex-row gap-4 mt-2">
          <button
              type="submit"
              className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] justify-center font-medium rounded-full px-[24px] py-[12px] text-[14px] flex items-center gap-2 transition"
              onClick={handleDeleteAccount}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                <>
                  <TrashIcon /> Delete my account
                </>
              )}
            </button>
            <button
              type="button"
              className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full px-[24px] py-[12px] text-[14px] bg-white hover:bg-[#F6F6F6] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;