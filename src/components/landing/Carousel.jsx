import React from "react";

function Carousel() {
  const images = [
    "/landing/carousel-1/1.webp",
    "/landing/carousel-1/2.webp",
    "/landing/carousel-1/3.jpg",
    "/landing/carousel-1/4.webp",
    "/landing/carousel-1/5.webp",
    "/landing/carousel-1/6.webp",
    "/landing/carousel-1/7.webp",
  ];

  return (
    <div className="h-[420px] flex flex-col gap-[20px] mt-[40px] w-full ">
      <div className="h-[200px] border-2 overflow-hidden relative">
        <div className="flex space-x-[20px] w-max">
          {images.map((url, index) => (
            <div className="flex-shrink-0" key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-[200px] h-[200px] object-cover rounded-box"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[200px] border-2 overflow-hidden relative">
        <div className="flex space-x-[20px] w-max">
          {images.map((url, index) => (
            <div className="flex-shrink-0" key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-[200px] h-[200px] object-cover rounded-box"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
