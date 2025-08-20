"use client";
import { useState } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";

const DownloadModal = ({ isOpen, onClose, src }) => {
  const [selectedFormat, setSelectedFormat] = useState("MP4");
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!src) {
      console.error("No video source provided");
      return;
    }

    setIsDownloading(true);
    
    try {
      console.log("Starting download for format:", selectedFormat);
      
      // Fetch the video file
      const response = await fetch(src);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Get the blob data
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element for download
      const link = document.createElement('a');
      link.href = blobUrl;
      
      // Generate filename based on selected format
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `video-${timestamp}.${selectedFormat.toLowerCase()}`;
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      console.log("Download completed successfully");
      
      // Close modal after successful download
      setTimeout(() => {
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error("Download failed:", error);
      // alert("Failed to download video. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const isValid = src && !isDownloading;

  return (
    <div className="fixed inset-0 bg-[#000000e8] flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white flex flex-col gap-[20px] rounded-[20px] p-5 w-[480px] h-[250px] mx-auto relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 -right-12 p-2 bg-gray-100 hover:bg-gray-200 rounded-[10px] transition-colors text-gray-700"
          disabled={isDownloading}
        >
          <X size={18} />
        </button>

        <p className="text-[24px] w-full font-semibold text-center text-[#0F0E11]">
          Export options
        </p>

        <p className="text-[16px] font-medium text-[#68686B] text-center">
          Select your preferred video format to start the download.
        </p>

        <div className="flex items-center justify-between gap-8 mb-6">
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="MP4"
              checked={selectedFormat === "MP4"}
              onChange={() => handleFormatChange("MP4")}
              className="accent-[#C209C1] w-5 h-5"
              disabled={isDownloading}
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">MP4</span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="MOV"
              checked={selectedFormat === "MOV"}
              onChange={() => handleFormatChange("MOV")}
              className="accent-[#C209C1] w-5 h-5"
              disabled={isDownloading}
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">MOV</span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="videoFormat"
              value="3GP"
              checked={selectedFormat === "3GP"}
              onChange={() => handleFormatChange("3GP")}
              className="accent-[#C209C1] w-5 h-5"
              disabled={isDownloading}
            />
            <span className="text-[18px] font-normal text-[#0F0E11]">3GP</span>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full ${
            isValid
              ? "bg-[#BDFF00] cursor-pointer"
              : "bg-[#BDFF005C] bg-opacity-[36%] cursor-not-allowed"
          } text-[#1B1F3B] text-[16px] cursor-pointer font-medium p-3 rounded-full mb-4`}
          disabled={!isValid}
          onClick={handleDownload}
        >
          {isDownloading ? (
            <>
              <div className="inline-block w-4 h-4 mr-2 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              Downloading...
            </>
          ) : (
            <>
              <Image
                src="/creation/blackImport.svg"
                alt="Download"
                width={24}
                height={24}
                className="inline-block mr-2"
              />
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;