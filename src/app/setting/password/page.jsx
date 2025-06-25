import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-1 flex-col items-start justify-center py-[40px] xl:py-[80px] bg-white px-[40px] xl:px-[160px]">
      <h1 className="text-[#2A0856] text-[34px] font-semibold mb-[56px]">
        Edit password
      </h1>
      <form className="w-full  flex flex-col gap-10">
        <div>
          <label className="text-[#68686B] text-[14px] font-semibold  ">
            Old password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full border border-[#E3E9EE] rounded-[12px] py-[12px] pr-[16px] pl-[40px] text-[#1B1F3B] text-[16px] font-medium focus:outline-none focus:border-[#C209C1] transition"
              placeholder="Old password"
              defaultValue="password"
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
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition"
          >
            Save change
          </button>
          <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full  text-[14px]  w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
