import React from "react";
import Image from "next/image";

const UploadImage = ({ startImage, endImage, onStartImageChange, onEndImageChange }) => {
  const handleStartImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected start image:", file);
      onStartImageChange(file);
    }
  };

  const handleEndImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected end image:", file);
      onEndImageChange(file);
    }
  };

  const removeStartImage = () => {
    onStartImageChange(null);
  };

  const removeEndImage = () => {
    onEndImageChange(null);
  };

  return (
    <div className="flex gap-[8px] items-center">
      {/* Start Image Upload */}
      <div className="bg-[#F7F8F8] flex-1 rounded-[12px] p-4 flex flex-col gap-4">
        {!startImage ? (
          <label
            htmlFor="upload-start-image"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Image
              src="/creation/gallery-export.svg"
              alt="Upload"
              width={100}
              height={100}
              className="w-[24px] h-[24px] object-cover rounded-md"
            />
            <span className="text-[12px] font-normal text-[#393E44]">
              Start image
            </span>
          </label>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={URL.createObjectURL(startImage)}
                alt="Start image preview"
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <button
                onClick={removeStartImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
            <span className="text-[10px] font-normal text-[#393E44] text-center">
              {startImage.name}
            </span>
          </div>
        )}
        <input
          id="upload-start-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleStartImageChange}
        />
      </div>

      {/* End Image Upload */}
      <div className="bg-[#F7F8F8] flex-1 rounded-md p-4 flex flex-col gap-4">
        {!endImage ? (
          <label
            htmlFor="upload-end-image"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Image
              src="/creation/gallery-export.svg"
              alt="Upload"
              width={100}
              height={100}
              className="w-[24px] h-[24px] object-cover rounded-md"
            />
            <span className="text-[12px] font-normal text-[#393E44]">
              End image
            </span>
          </label>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={URL.createObjectURL(endImage)}
                alt="End image preview"
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <button
                onClick={removeEndImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
            <span className="text-[10px] font-normal text-[#393E44] text-center">
              {endImage.name}
            </span>
          </div>
        )}
        <input
          id="upload-end-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleEndImageChange}
        />
      </div>
    </div>
  );
};

export default UploadImage;