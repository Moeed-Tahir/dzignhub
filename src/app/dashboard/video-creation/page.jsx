import Sidebar from "@/components/creation/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1440px] mx-auto justify-center p-[24px] items-start flex lg:gap-2 h-auto min-h-screen bg-[#f7F8F8]">
      <div className="w-[342px]">
        <Sidebar />
      </div>

      <div className="w-[70%]">Main</div>
    </div>
  );
};

export default page;
