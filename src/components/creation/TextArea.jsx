import React from "react";
import Image from "next/image";

const TextArea = ({ value, onChange, placeholder, showUploadIcon = false, onImageUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("User picked image: ", file);
    if (file && onImageUpload) {
      console.log("Image set")
      onImageUpload(file);
    }
  };

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        className="w-full pt-[14px] pb-[10px] h-[120px] font-normal px-[8px] text-[14px] text-black  placeholder:text-[#A9A9AA] border resize-none border-[#DEDEDE] rounded-[16px] focus:outline-none focus:border-[#C209C1]"
        value={value}
        onChange={onChange}
      />
      {showUploadIcon && (
        <div className="absolute bottom-2 left-2">
          <label htmlFor="image-upload" className="cursor-pointer">
            <Image
              src="/image-upload.svg"
              alt="Upload image"
              width={20}
              height={20}
              className="w-10 h-10 opacity-60 hover:opacity-100 transition-opacity"
            />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default TextArea;
