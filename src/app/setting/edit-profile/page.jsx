"use client";
import React, { useRef } from "react";
import Image from "next/image";

const page = () => {
  const fileInputRef = useRef(null);

  const avatarUrl = "/avatar.png";
  const name = "Tran Mau Tri Tam";
  const location = "Saigon, Vietnam";

  return (
    <div className="flex flex-1 min-h-[970px] flex-col items-start justify-center py-[80px] bg-white px-[160px]">
      <div>
        <p className="text-[#1B1F3B] text-[34px] font-semibold ">
          Edit profile
        </p>
      </div>
      <form className="mt-[48px] w-full  flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
            <Image src={avatarUrl} alt="avatar" width={4000} height={4000} />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="border border-[#E3E9EE] w-[200px] rounded-full px-6 py-[12px] flex items-center text-[14px]  gap-2 font-medium text-[#1B1F3B] bg-white hover:bg-[#F6F6F6] transition"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              Upload new image
              <Image
                src={"/setting/upload.svg"}
                alt="upload icon"
                width={20}
                height={20}
              />
              {/* <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 3v10m0 0l-3-3m3 3l3-3" stroke="#1B1F3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="9.25" stroke="#E3E9EE" strokeWidth="1.5"/></svg> */}
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={fileInputRef}
            />
            <span className="text-[#68686B] font-medium text-[14px] mt-1">
              800x800 PNG, JPG is recommended. Maximum file size: 2Mb
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Name
            </label>
            <span className="text-[#B0B0B0] text-[14px]">Optional</span>
          </div>
          <div className="relative">
            <input
              type="text"
              defaultValue={name}
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[36px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Enter your name"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
              <Image
                src={"/setting/user.svg"}
                alt="location icon"
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Location
            </label>
            <span className="text-[#B0B0B0] text-[14px]">Optional</span>
          </div>
          <div className="relative">
            <input
              type="text"
              defaultValue={location}
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[36px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Enter your location"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]">
              <Image
                src={"/setting/map.svg"}
                alt="location icon"
                width={20}
                height={20}
              />
              {/* <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 18s6-5.686 6-10A6 6 0 1 0 4 8c0 4.314 6 10 6 10z" stroke="#B0B0B0" strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke="#B0B0B0" strokeWidth="1.5"/></svg> */}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#68686B] text-[14px] font-semibold">
              Bio
            </label>
          </div>
          <textarea
            rows={4}
            className="w-full border border-[#E3E9EE] rounded-[12px] py-4 px-4 text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition resize-none"
            placeholder="Write something here"
          />
          <span className="text-[#B0B0B0] text-[14px] mt-1 block">
            Enter each message in a new line.
          </span>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition"
          >
            Save change
          </button>
          <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
