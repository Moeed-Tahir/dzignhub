import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { GoDotFill, GoDot } from "react-icons/go";
function Templates() {
  const slides = [
    "/landing/templates/5/1.jpg",
    "/landing/templates/5/2.jpg",
    "/landing/templates/5/3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      <div className="max-w-[1440px] gap-[64px] p-[30px] flex flex-col mx-auto">
        <div className="max-w-[1280px] h-[218px] flex flex-col">
          <div style={{
            fontFamily: 'General Sans',
            fontWeight: 600
          }} className=" font-semibold text-[25px] text-black">
            Over <span className="text-[#C209C1]">150,000</span> ready-made
            templates to choose from
          </div>
          <div className="p-2">
            <p className="leading-[22px] font-[400] text-[20px] align-middle text-[#3D4050] font-[general-sans]">
              Discover our curated website design catalog featuring a range of
              categories <br /> to match your preferences and projects.
            </p>
          </div>
        </div>

        <div id="templates" className="max-w-[1280px] flex flex-col gap-[32px]  ">
         {/* Row 1 - Website Section */}
         <div className="max-w-[1280px] h-[366px] md:h-[362px] bg-[#E4E7FA] rounded-[20px] overflow-hidden relative">
            <div className="absolute top-[20.04px] left-[20.5px] flex flex-col gap-[8.64px]">
              <p className="text-[30px] text-[#C209C1]  font-medium">Website</p>
              <p className="text-[18px] text-[#3D4050] break-words whitespace-normal ">
                Create gorgeous landing pages with a simple prompt.
              </p>
            </div>
            
                      {/* Mobile Layout - Show only first 3 images */}
                      <div className="md:hidden w-full h-[309px] absolute top-[180px] left-[20px] right-[20px]">
              <div className="w-[100px] h-[140px] absolute left-[10px] top-[60px] z-2 overflow-hidden rounded-[10.64px] rotate-[-2deg]">
                <img
                  src="/landing/templates/1/1.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[100px] h-[140px] absolute left-[90px] top-[40px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg]">
                <img
                  src="/landing/templates/1/2.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[100px] h-[140px] absolute left-[170px] top-[20px] overflow-hidden rounded-[8.87px] rotate-[-2deg]">
                <img
                  src="/landing/templates/1/3.jpg"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Desktop Layout - Show all 6 images */}
            <div className="hidden md:block w-[1258px] h-[309px] absolute top-[57px] left-[22px]">
              <div className="w-[255.38px] absolute left-[0.48px] top-[118.42px] z-2 overflow-hidden rounded-[10.64px] rotate-[-2deg] inline-block">
                <img src="/landing/templates/1/1.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-[255.38px] absolute left-[183.12px] top-[92.75px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg] ">
                <img src="/landing/templates/1/2.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-[255.38px] absolute left-[365.76px] top-[67.08px] overflow-hidden rounded-[8.87px] rotate-[-2deg] ">
                <img src="/landing/templates/1/3.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-[255.38px] absolute left-[548.76px] top-[118.58px] z-1 overflow-hidden rounded-[8.87px] rotate-[-2deg] ">
                <img src="/landing/templates/1/4.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-[255.38px] absolute left-[730.64px] top-[92.91px] overflow-hidden rounded-[8.87px] rotate-[-2deg] ">
                <img src="/landing/templates/1/5.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-[505.17px] absolute left-[964px] top-[149.63px] overflow-hidden rounded-[8.87px] rotate-[-2deg] ">
                <img src="/landing/templates/1/6.jpg" alt="Image" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[362px] gap-[32px] md:overflow-hidden">
            <div className="col-span-1 bg-[#E4E7FA] rounded-[20px] h-[362px] relative overflow-hidden">
              <div className="absolute top-[20.04px] left-[20.5px] flex flex-col gap-[8.64px]">
                <p className="text-[30px] text-[#C209C1]  font-medium  ">
                  Lummi
                </p>
                <p className="text-[18px] text-[#3D4050]  ">
                  Unlock 20,000+ AI-generated images made by global creators.
                </p>
              </div>
              <div className="w-[219.36px] h-[250.7px]  absolute left-[-62.84px] top-[190.13px]  rounded-[3.92px] rotate-[-12deg] border-[6px] border-[#C209C1] ">
                <img
                  src="/landing/templates/2/1.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
              <div className="w-[250.7px] h-[250.7px]  absolute left-[34.59px] top-[197.96px]  rounded-[3.92px] rotate-[-6deg] border-[6px] border-[#C209C1]">
                <img
                  src="/landing/templates/2/2.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
              <div className="w-[250.7px] h-[219.36px]  absolute left-[98.33px] top-[214.76px]  rounded-[3.92px] rotate-[6deg] border-[6px] border-[#C209C1]">
                <img
                  src="/landing/templates/2/3.jpg"
                  alt="Image"
                  className=" "
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 bg-[#E4E7FA] rounded-[20px] h-auto md:h-[362px] relative">
              <div className="top-[20px] left-[20px] flex flex-col gap-[8px] absolute">
                <p className="text-[30px] text-[#C209C1]  font-medium ">
                  Brands
                </p>
                <p className="text-[18px] text-[#3D4050] ">
                  Get on-brand, consistent designs with every iteration.
                </p>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden p-[20px] pt-[100px] flex flex-col gap-[16px]">
                <div className="w-full">
                  <img
                    src="/landing/templates/3/1.jpg"
                    alt="Image"
                    className="h-[120px] rounded-[10.88px] w-full object-cover"
                  />
                </div>
                <div className="flex gap-[16px]">
                  <div className="flex-1">
                    <img
                      src="/landing/templates/3/2.jpg"
                      alt="Image"
                      className="h-[120px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <img
                      src="/landing/templates/3/3.jpg"
                      alt="Image"
                      className="h-[120px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="h-[246px] top-[100px] left-[32.31px] flex flex-col gap-[14.5px] absolute overflow-hidden">
                  <div className="w-[379.59px]">
                    <img
                      src="/landing/templates/3/1.jpg"
                      alt="Image"
                      className="h-[130.5px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                  <div className="w-[379.59px]">
                    <img
                      src="/landing/templates/3/2.jpg"
                      alt="Image"
                      className="h-[130.5px] rounded-[10.88px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-[380.43px] h-[318.56px] top-[97.57px] left-[433.64px] rounded-[10.88px] absolute">
                  <img
                    src="/landing/templates/3/3.jpg"
                    alt="Image"
                    className="rounded-[10.88px] w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[362px] gap-[32px] ">
            <div className="col-span-1 md:col-span-2 bg-[#E4E7FA] rounded-[20px] h-[362px] relative overflow-hidden">
              <div className="top-[20px] left-[20px] flex flex-col gap-[8px] absolute">
                <p className="text-[30px] text-[#C209C1] font-medium ">
                  Social
                </p>
                <p className="text-[18px] w-[285px] text-[#3D4050] ">
                  Streamline your content with our AI social media post
                  generator
                </p>
              </div>
              <div className="w-[508.42px] h-[381.93px] top-[196.22px] left-[39.92px] rounded-[9.71px] rotate-[6deg] overflow-hidden absolute">
                <img
                  src="/landing/templates/4/1.jpg"
                  alt="Image"
                  className=""
                />
              </div>
              <div className="w-[500.66px] h-[457.62px] top-[159px]  left-[337.05px] rounded-[9.32px] rotate-[6deg] overflow-hidden absolute">
                <img
                  src="/landing/templates/4/2.jpg"
                  alt="Image"
                  className=""
                />
              </div>
            </div>
            <div className="col-span-1 relative bg-[#E4E7FA] rounded-[20px] h-[362px] overflow-hidden">
              {/* Text */}
              <div className="absolute top-[20px] left-[20px] flex flex-col gap-[8px]">
                <p className="text-[30px] text-[#C209C1]  font-medium">
                  Slides
                </p>
                <p className="text-[18px] w-[322px] text-[#3D4050] ">
                  Make convincing presentations and pitches in seconds.
                </p>
              </div>

              {/* Image */}
              <div className="w-[270px] h-[151.88px] top-[153.34px] left-[66.08px] rounded-[10.13px] overflow-hidden absolute">
                <img
                  src={slides[currentIndex]}
                  alt="Slide"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Arrows */}
              <IoIosArrowDropleftCircle
                onClick={prevSlide}
                className="w-[32px] h-[32px] top-[215px] left-[22px] text-[#C209C1] rounded-full absolute cursor-pointer hover:opacity-75"
              />
              <IoIosArrowDroprightCircle
                onClick={nextSlide}
                className="w-[32px] h-[32px] top-[215px] left-[352px] text-[#C209C1] rounded-full absolute cursor-pointer hover:opacity-75"
              />

              {/* Dots */}
              <div className="absolute top-[333.5px] left-[135px] flex gap-[8px]">
                {slides.map((_, index) => (
                  <GoDot
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-[7.25px] h-[7.25px] rounded-full cursor-pointer ${currentIndex === index
                        ? "bg-black "
                        : "bg-[#c2c4d5] text-[#c2c4d5]"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
