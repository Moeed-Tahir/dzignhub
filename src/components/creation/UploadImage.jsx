import React from "react";
import Image from "next/image";
const UploadImage = () => {
  return (
    <div className="flex gap-[8px] items-center">
      <div className="bg-[#F7F8F8] flex-1 rounded-[12px] p-4 flex flex-col gap-4">
        <label
          htmlFor="upload-image"
          className="cursor-pointer  flex flex-col items-center gap-2"
        >
          <Image
            src="/creation/gallery-export.svg"
            alt="Upload"
            width={100}
            height={100}
            className="w-[24px] h-[24px] object-cover rounded-md"
          />
          <span className="text-[12px] font-normal text-[#393E44] ">
            Start image
          </span>
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("Selected file:", file);
          }}
        />
      </div>
      <div className="bg-[#F7F8F8] flex-1 rounded-md p-4 flex flex-col gap-4">
        <label
          htmlFor="upload-image"
          className="cursor-pointer  flex flex-col items-center gap-2"
        >
          <Image
            src="/creation/gallery-export.svg"
            alt="Upload"
            width={100}
            height={100}
            className="w-[24px] h-[24px] object-cover rounded-md"
          />
          <span className="text-[12px] font-normal text-[#393E44] ">
            End image
          </span>
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("Selected file:", file);
          }}
        />
      </div>
    </div>
  );
};

export default UploadImage;
