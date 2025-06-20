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

  const images2 = [
    "/landing/carousel-2/1.webp",
    "/landing/carousel-2/2.webp",
    "/landing/carousel-2/3.webp",
    "/landing/carousel-2/4.jpg",
    "/landing/carousel-2/5.jpg",
    "/landing/carousel-2/6.webp",
    "/landing/carousel-2/7.webp",
    "/landing/carousel-2/8.webp",
  ];

  return (
    <div className="h-[420px] flex flex-col gap-[20px] mt-[40px] w-full overflow-hidden">
      {/* First Carousel */}
      <div className="h-[200px] relative overflow-hidden">
        <div className="flex w-max animate-scroll-left gap-[20px]">
          {[...images, ...images].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-[200px] h-[200px] object-cover rounded-box flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Second Carousel (opposite direction) */}
      <div className="h-[200px] relative overflow-hidden">
        <div className="flex w-max animate-scroll-right gap-[20px]">
          {[...images2, ...images2].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-[200px] h-[200px] object-cover rounded-box flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
