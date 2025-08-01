"use client";
import { useState } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";

const ModalPopup = ({ isOpen, onClose, href }) => {
  const [selectedPlan, setSelectedPlan] = useState("free");

  if (!isOpen) return null;

  const tags = [
    { id: 1, name: "4:3" },
    {
      id: 2,
      name: "Image",
    },
    { id: 3, name: "1440x1024" },
    { id: 4, name: "JPG" },
  ];

  return (
    <div className="fixed inset-0 bg-[#000000e8] flex items-center justify-center z-50 p-[24px]">
      {/* Changed max-w from xl to lg, adjusted padding */}
      <div className="bg-white flex gap-[20px] rounded-[20px] p-5  w-auto mx-auto relative shadow-lg">
        {/* Close button - no change needed here */}
        <button
          onClick={onClose}
          className="absolute top-0 -right-12 p-2 bg-gray-100 hover:bg-gray-200 rounded-[10px] transition-colors text-gray-700"
        >
          <X size={18} />
        </button>

        <div>
          <Image
            src={href}
            width={500}
            height={400}
            alt=""
            className="rounded-2xl object-cover "
          />
        </div>

        <div className="w-[270px] flex flex-col gap-4">
          <div className="flex gap-2">
            <Image
              src={href}
              width={400}
              height={400}
              alt=""
              className=" w-[48px] h-[48px] rounded-full object-cover "
            />

            <div className="flex flex-col justify-between items-start">
              <p className="text-[16px] font-medium text-black">GirlsAI</p>
              <p className="text-[14px] font-normal text-black">
                2 months ago{" "}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center  mt-[20px]">
            <p className="text-[18px] text-black font-normal "> Promt</p>
            <Image
              src={"/creation/copy.svg"}
              width={500}
              height={400}
              alt=""
              className="w-[20px] h-[20px] object-cover "
            />
          </div>

          <p className="text-[14px] text-black font-normal ">
            {" "}
            modernist style, A chinchilla in a luxurious kimono, holding a pair
            of sharp and sturdy scythes, ready to protect those under her care.,
            art nouveau, soft colors, pale diffused light, long distance
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className="communityBtn  bg-white text-[#68686B] px-4 py-1 rounded-full flex items-center gap-2 font-medium  border-1 border-[#68686B] text-sm"
              >
                {tag.name}
              </button>
            ))}
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
