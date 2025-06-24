"use client";
import React, { useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import DownloadModal from "./DownloadModal";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(1, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="rounded-[20px] overflow-hidden shadow-lg w-full max-w-4xl mx-auto bg-black">
      {/* Video container (relative for overlay) */}
      <div className="relative w-full">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-auto"
          src={src}
        />

        {/* Overlay Controls on video */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/80 to-transparent backdrop-blur-md py-[12px] px-[20px]">
          <div className="flex items-center justify-between text-black text-sm">
            <div className="flex items-center gap-3 w-full">
              <button onClick={togglePlay}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <span>{formatTime(currentTime)}</span>

              <div
                className="h-[4px] bg-gray-300 w-full rounded cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${
                      (currentTime / videoRef.current?.duration) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>

              <span>
                {videoRef.current?.duration
                  ? formatTime(videoRef.current.duration)
                  : "00:00"}
              </span>

              <Volume2 size={18} className="ml-2" />

              <button
                onClick={() => {
                  if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
              >
                <Image
                  src={"/creation/expand-06.svg"}
                  alt="Fullscreen"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom black control bar (below video) */}
      <div className="bg-black flex items-center h-[48px] px-[20px] justify-end gap-4">
        <a className="hover:opacity-80 cursor-pointer">
          <Image
            src={"/creation/Import.svg"}
            alt="Download"
            width={20}
            onClick={() => setIsModalOpen(true)}
            height={20}
          />
        </a>

        <p className="font-semibold text-white">|</p>

        <button className="hover:opacity-80 cursor-pointer">
          <Image
            src={"/creation/trash.svg"}
            alt="Delete"
            width={20}
            height={20}
          />
        </button>
      </div>

      <DownloadModal
      src={src}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
