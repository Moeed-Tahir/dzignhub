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
    <div className="lg:h-[420px] h-[280px] flex flex-col gap-[20px] lg:mt-[40px]  absolute top-[867px] lg:top-[595px]  w-full overflow-hidden">
      {/* First Carousel */}
      <div className="lg:h-[200px] h-[130px] relative overflow-hidden">
        <div className="flex w-max animate-scroll-left gap-[20px]">
          {[...images, ...images].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="lg:w-[200px] lg:h-[200px] h-[130px] w-[130px] object-cover rounded-[16px]  flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Second Carousel (opposite direction) */}
      <div className="lg:h-[200px] h-[130px]  relative overflow-hidden">
        <div className="flex w-max animate-scroll-right gap-[20px]">
          {[...images2, ...images2].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="lg:w-[200px] lg:h-[200px] h-[130px] w-[120px] rounded-[16px] object-cover rounded-box flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
