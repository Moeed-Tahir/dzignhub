import React from "react";
import Image from "next/image";

const TextArea = ({ value, onChange, placeholder, showUploadIcon = false, onImageUpload, uploadedImage, onImageRemove }) => {
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
      
      {/* Display uploaded image */}
      {uploadedImage && (
        <div className="mt-3 p-3 border border-[#DEDEDE] rounded-[16px] bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploaded Image:</span>
            {onImageRemove && (
              <button
                onClick={() => onImageRemove()}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
          <div className="relative w-full max-w-xs mx-auto">
            <Image
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded image"
              width={200}
              height={200}
              className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">{uploadedImage.name}</p>
        </div>
      )}

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
