"use client";
import ImageModal from "@/components/ImageModal";
import React from "react";

const page = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <ImageModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      tags={["4:3", "Image", "1440x1024", , "JPG"]}
      mainPic="/image (1).png"
      suggestions={[
        "/image.png",
        "/image.png",
        "/image.png",
        "/image.png",
      ]}
      title="Social Media Post"
      desc="modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance"
      subtitle="Content Creation"
    />
  );
};

export default page;
