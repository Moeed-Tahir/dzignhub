import Image from "next/image";
import React from "react";
import Glove from "@/app/assets/globe";

const PublishModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="absolute top-12 right-5 z-50000 flex items-center justify-center  bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-[420px] py-4 relative">
        <h2 className="text-xl font-medium text-[#344054] mx-6 mb-4">
          Publish
        </h2>
        <p className="text-[#7b7b7b] text-[16px] font-medium mx-6 pb-4  ">
          Make your project live and truck it’s performance
        </p>
        <hr class="h-[1px] bg-[#ECECEC] border-0" />

        <h2 className="text-[14px] font-medium text-[#344054] mx-6 mt-3">
          Publish
        </h2>

        <div className="flex items-center mx-6 py-4 gap-3">
          <div className="w-10 h-10 bg-[#F8F7F7] rounded-lg shadow-2xl flex items-center justify-center">
            <Glove fill="#000000" />
          </div>
          <div>
            <div className="font-medium text-[12px] text-[#121212]">
              https://www.allmyai.io/app/project/P23763
            </div>
          </div>
        </div>
        <hr class="h-[1px] bg-[#ECECEC] border-0" />
        <h2 className="text-[14px] font-medium text-[#344054] mx-6 mt-3">
          Publish Site
        </h2>

        <div className="flex items-center mx-6 py-4 gap-3">
          <div className="w-10 h-10 bg-[#F8F7F7] rounded-lg shadow-2xl flex items-center justify-center">
            <Glove fill="#000000" />
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="font-medium text-[12px] text-[#121212]">
              https://www.allmyai.io/app/project/P23763
            </div>

            <Image src={"/Ai/edit-2.svg"} height={20} width={20} alt="" />
          </div>
        </div>
        <hr class="h-[1px] bg-[#ECECEC] border-0" />

        <div className="flex justify-end items-center pt-4">
          <button className="bg-[#C209C1]  text-white px-6 mx-6  py-3 rounded-xl font-medium transition-colors">
Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
