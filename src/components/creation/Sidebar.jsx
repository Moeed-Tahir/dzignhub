"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import Style from "./Style";
import Size from "./Size";
import Quality from "./Quality";
import Duration from "./Duration";
import ProCard from "./ProCard";
import Colors from "./Colors";
import { useUserStore } from "@/store/store";
import { toast } from "react-toastify";

const Sidebar = ({ onGenerate, isImagePage, showClose = false, onClose }) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColors, setSelectedColors] = useState({
    id: 0,
    c1: "#F2E8DF",
    c2: "#D9C3B0",
    c3: "#BFA293",
  });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { SetGenerateImages, SetGenerateVideo, AddGenerateVideos } =
    useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isImagePage ? "text-to-image" : "image-to-image"
  );

  // Add states for uploaded images
  const [startImage, setStartImage] = useState(null);
  const [endImage, setEndImage] = useState(null);
  const [uploadedImageFromTextArea, setUploadedImageFromTextArea] =
    useState(null);

  const [isError, setIsError] = useState("");
  const [error, setError] = useState("");

  const handleImageUploadFromTextArea = (file) => {
    setUploadedImageFromTextArea(file);
    setStartImage(file);
  };

  const handleImageRemoveFromTextArea = () => {
    setUploadedImageFromTextArea(null);
    setStartImage(null);
  };

  const saveGeneration = async (type, url, prompt, isMultiple, size) => {
    try {
      let data = {
        type: type,
        url: url,
        prompt: prompt,
        isMultiple: isMultiple,
        size: size
      };
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/save-generation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      
    } catch (error) {
      console.error("Error saving generation:", error);
    }
  };

  const isValid = textValue.trim().split(/\s+/).length >= 6;
  const handleGenerate = async () => {
    setIsLoading(true);
    console.log("Selected Style:", selectedStyle);
    console.log("Selected Size:", selectedSize);
    ``;
    console.log("Selected Colors:", selectedColors);
    console.log("Selected Quality:", selectedQuality);
    console.log("Selected Duration:", selectedDuration);
    console.log("Selected Quantity:", selectedQuantity);
    console.log("Text Value:", textValue);

    // const data = {
    //   prompt: textValue,
    //   style: selectedStyle,
    //   size: selectedSize,
    //   colors: [selectedColors.c1, selectedColors.c2, selectedColors.c3],
    //   quality: selectedQuality,
    //   quantity: selectedQuantity,
    //   Duration: selectedDuration,
    //   startImage: null,
    //   endImage: null,
    //   uploadedImageFromTextArea: activeTab === "image-to-image" ? uploadedImageFromTextArea : null,
    // };

    if (isImagePage) {
      const formData = new FormData();
      formData.append("prompt", textValue);
      if (selectedStyle) {
        formData.append("style", JSON.stringify(selectedStyle));
      } else {
        formData.append("style", JSON.stringify({ name: "normal style" }));
      }
      formData.append("size", selectedSize || "1024x1024");
      formData.append(
        "colors",
        JSON.stringify([
          selectedColors.c1,
          selectedColors.c2,
          selectedColors.c3,
        ])
      );
      formData.append("quantity", selectedQuantity.toString());

      // Add image file if it's image-to-image mode
      if (activeTab === "image-to-image" && uploadedImageFromTextArea) {
        formData.append("uploadedImageFromTextArea", uploadedImageFromTextArea);
        console.log(
          "Image file added to FormData:",
          uploadedImageFromTextArea.name
        );
      }

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/generate-image`,
          {
            method: "POST",
            body: formData,
          }
        );

        const res = await req.json();
        console.log(res);
        if (res.type == "success" || res.type == "partial_success") {
          if (onGenerate) onGenerate();
          
          // Save the generation to the database
          if (selectedQuality > 1) {
            saveGeneration("image", res.images, textValue, true);
          } else {
            saveGeneration("image", res.images[0], textValue, false);
          }
          SetGenerateImages(res.images);
        }
        setIsLoading(false);
      } catch (error) {
        setError(`${error}`);
        setIsError(true);
        console.error("Error during image generation:", error);

        toast.error(
          "An error occurred while generating the image. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setIsLoading(false);
      }
    } else {
      // Video generation - use FormData for file uploads
      const formData = new FormData();
      formData.append("prompt", textValue);

      // Make sure we're sending the correct style value
      const styleValue = selectedStyle?.name || selectedStyle;
      formData.append("style", styleValue || "Golden hour");

      // Send duration as-is (it's already in "4 sec" format from Duration component)
      formData.append("duration", selectedDuration || "5 sec");
      formData.append("size", selectedSize || "square");

      // Add image files if selected
      if (startImage) {
        formData.append("startImage", startImage);
      } else if (uploadedImageFromTextArea) {
        formData.append("startImage", uploadedImageFromTextArea);
      }

      // else {
      //   setError("Start image is required");
      //   setIsError(true);
      //   setIsLoading(false);
      //   return;
      // }
      if (endImage) {
        formData.append("endImage", endImage);
      }

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/generate-video`,
          {
            method: "POST",
            body: formData, // Don't set Content-Type header for FormData
          }
        );

        const res = await req.json();
        console.log("Video generation response:", res);

        if (res.type == "success") {
          if (onGenerate) onGenerate();
          // Store the complete video object as an array for consistency with ImagesResults
          SetGenerateVideo([res.video]);

          // Save the generation to the database
          saveGeneration("video", res.video.videoUrl, textValue, false, res.video.fileSize);
        } else {
          setError(`${res.message}`);
          setIsError(true);
          console.error("Video generation failed:", res);
          toast.error(
            `Video generation failed: ${res.error || "Unknown error"}`
          );
        }
      } catch (error) {
        setError(`${error}`);
        setIsError(true);
        console.error("Error during video generation:", error);

        toast.error(`Video generation failed.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-[24px]">
      <div className="flex items-center justify-between gap-2 ">
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-[108px] h-[25px] object-contain"
          />
        
        </div>
        {showClose && (
          <button
            className="ml-2 text-gray-500 hover:text-black text-lg px-2 py-1 rounded-full"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F8F8F8] p-1 h-[40px] w-[310px] rounded-[8px] mt-4 ">
        <button
          className={`flex-1 px-4  text-sm font-medium rounded-[8px] transition-colors ${
            activeTab === "text-to-image"
              ? "bg-white text-[#28282C] "
              : "text-[#68686B] hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("text-to-image")}
        >
          Text to {isImagePage ? "Image" : "Video"}
        </button>
        <button
          className={`flex-1 px-4  text-sm font-medium rounded-[8px] transition-colors ${
            activeTab === "image-to-image"
              ? "bg-white text-[#28282C] "
              : "text-[#68686B] hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("image-to-image")}
        >
          Image to {isImagePage ? "Image" : "Video"}
        </button>
      </div>

      <TextArea
        placeholder={
          isImagePage
            ? "Describe your image"
            : "Generate for me an image with lion under the tree"
        }
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        showUploadIcon={activeTab === "image-to-image"}
        onImageUpload={handleImageUploadFromTextArea}
        uploadedImage={uploadedImageFromTextArea}
        onImageRemove={handleImageRemoveFromTextArea}
      />

      {!isImagePage && (
        <UploadImage
          startImage={startImage}
          endImage={endImage}
          onStartImageChange={setStartImage}
          onEndImageChange={setEndImage}
        />
      )}

      {/* Collapsible Style Section */}
      <details open className="block lg:hidden">
        <summary className="font-medium text-[16px] mb-2 cursor-pointer">
          Style
        </summary>
        <Style
          selected={selectedStyle}
          onChange={setSelectedStyle}
          isImagePage={isImagePage}
        />
      </details>
      <div className="hidden lg:block">
        <Style
          selected={selectedStyle}
          onChange={setSelectedStyle}
          isImagePage={isImagePage}
        />
      </div>

      {/* Size */}
      <Size selected={selectedSize} onChange={setSelectedSize} />

      {/* {isImagePage && (
        <>
          <Colors selected={selectedColors} onChange={setSelectedColors} />

          <div>
            <div className="flex justify-start my-2 items-center gap-2">
              <Image
                src="/creation/layer.svg"
                alt="Style"
                width={100}
                height={100}
                className="w-[22px] h-[22px] object-cover rounded-md"
              />
              <span className="text-[18px] font-normal text-[#202126] ">
                Quantity
              </span>
            </div>

            <div className="bg-[#F7F8F8] flex justify-between items-center rounded-full px-[12px] py-[8px]">
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] text-[18px] w-[28px]"
                onClick={() =>
                  selectedQuantity > 1 &&
                  setSelectedQuantity(selectedQuantity - 1)
                }
              >
                -
              </p>
              <p>{selectedQuantity}</p>
              <p
                className="bg-white rounded-full flex justify-center items-center h-[28px] w-[28px] text-[18px]"
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                +
              </p>
            </div>
          </div>
        </>
      )} */}

      {!isImagePage && (
        <>
          <Quality selected={selectedQuality} onChange={setSelectedQuality} />
          <Duration
            selected={selectedDuration}
            onChange={setSelectedDuration}
          />
        </>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-2 ml-3 text-start">{error}</p>
      )}

      {/* Generate Button */}

      <button
        type="submit"
        className={`w-full bg-[#BDFF00]
        } text-[#1B1F3B] text-[16px] font-medium p-3 rounded-full mb-4 flex justify-center items-center`}
        // disabled={!isValid}
        onClick={handleGenerate}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
        ) : (
          "Generate"
        )}
      </button>

      <ProCard />
    </div>
  );
};

export default Sidebar;
