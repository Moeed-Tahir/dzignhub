import React from "react";
import Image from "next/image";
import { useState } from "react";
const ImagesResults = () => {
  const img = [
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 1",
    },
    {
      src: "/creation/ImagesResults/2.jpg",
      alt: "Image 2",
    },
    {
      src: "/creation/ImagesResults/3.jpg",
      alt: "Image 3",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 4",
    },
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 5",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 6",
    },
    {
      src: "/creation/ImagesResults/4.jpg",
      alt: "Image 4",
    },
    {
      src: "/creation/ImagesResults/1.jpg",
      alt: "Image 5",
    },
    {
      src: "/creation/ImagesResults/2.jpg",
      alt: "Image 6",
    },
  ];
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
      {!isImageOpen && (
        <div className="flex justify-between items-center mt-[30px]">
          <p className="text-[20px] font-medium text-black">
            Lion under the tree
          </p>
          <p className="text-[20px] font-medium text-[#68686B]">Today</p>
        </div>
      )}
      {!isImageOpen && (
        <div className="grid grid-cols-1 mt-[24px] sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {img.map((image, index) => (
            <Image
              src={image.src}
              alt={image.alt}
              key={index}
              width={300}
              height={300}
              onClick={() => {
                setSelectedImage(image.src);
                setIsImageOpen(true);
              }}
              style={{ cursor: "pointer" }}
              className="object-cover w-[328px] height-[450px] rounded-[16px]"
            />
          ))}
        </div>
      )}

      <div>

        {isImageOpen && <Image src={selectedImage} alt="Selected" width={500} height={400} className="rounded-[16px] w-full h-[90vh] object-cover" />}
      </div>
    </>
  );
};

export default ImagesResults;
