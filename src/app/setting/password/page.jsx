"use client"
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const page = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const changePassword = async () => {
    setIsLoading(true);
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
   try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({oldPassword, newPassword}),
    });

    const data = await response.json();
    if (data.type === "success") {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("token", data.token);
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
   }
   catch (error) {
      console.error(error.message);
   }
   finally{
    setIsLoading(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
   }
  }
  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
      <h1 className="text-[#2A0856] text-[34px] font-semibold mb-[56px]">
        Edit password
      </h1>
      <div className="w-full  flex flex-col gap-10">
        <div>
          <label className="text-[#68686B] text-[14px] font-semibold  ">
            Old password
          </label>
          <div className="relative">
            <input
            value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[40px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Old password"
            
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
        </div>
        <div>
          <label className="text-[#68686B] text-[14px] font-semibold  ">
            New password
          </label>
          <div className="relative">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="w-full border  border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[40px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="New password"
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
        <div>
          <label className="text-[#68686B] text-[14px] font-semibold  ">
            Confirm new password
          </label>
          <div className="relative">
            <input
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[40px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Confirm new password"
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
        <div className="flex gap-4 mt-2">
          <button
          onClick={changePassword}
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition flex items-center justify-center"
          >
            {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            "Save Change"
          )}
          </button>
          <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full  text-[14px]  w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
