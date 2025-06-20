import React from "react";

function Templates() {
  return (
    <div className="w-[1440px] h-[1592px] gap-[64px] p-[80px] flex flex-col">
      <div className="w-[1280px] h-[218px] gap-[32px] flex flex-col">
        <div className="font-sans font-semibold text-[48px] text-black w-[991px] h-[130px]">
          Over <span className="text-[#C209C1]">150,000</span> ready-made
          templates to choose from
        </div>
        <div className="w-[664px] h-[56px]">
          <p className="font-[400] text-[18px] leading-[28px] align-middle text-[#3D4050] font-[general-sans]">
            Discover our curated website design catalog featuring a range of
            categories to match your preferences and projects.
          </p>
        </div>
      </div>

      <div className="w-[1280px] h-[1150px] flex flex-col gap-[32px]  ">
        {/* Row 1 */}
        <div className="w-[1280px] h-[362px] bg-[#E4E7FA] rounded-[20px] overflow-hidden relative">
          <div className="w-[434px] h-[72.25px] absolute top-[20px] left-[20px] gap-[8px] flex flex-col">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium">
              Website
            </p>
            <p className="text-[18px] text-[#3D4050] font-sans">
              Create gorgeous landing pages with a simple prompt.
            </p>
          </div>
          <div className="w-[1258px] h-[309px] absolute top-[57px] left-[22px]">
            <div className="w-[255.38px]  absolute left-[0.48px] top-[118.42px] z-2  overflow-hidden rounded-[10.64px]  rotate-[-2deg] inline-block">
              <img
                src="/landing/templates/1/1.jpg"
                alt="Image"
                className="  "
              />
            </div>
            <div className="w-[255.38px] absolute left-[183.12px] overflow-hidden top-[92.75px] z-1   rounded-[8.87px] rotate-[-2deg]  ">
              <img src="/landing/templates/1/2.jpg" alt="Image" className=" " />
            </div>
            <div className="w-[255.38px] absolute left-[365.76px] top-[67.08px] overflow-hidden  rounded-[8.87px] rotate-[-2deg] ">
              <img src="/landing/templates/1/3.jpg" alt="Image" className=" " />
            </div>
            <div className="w-[255.38px] absolute left-[548.76px] top-[118.58px] z-1 overflow-hidden  rounded-[8.87px] rotate-[-2deg]  ">
              <img src="/landing/templates/1/4.jpg" alt="Image" className=" " />
            </div>
             <div className="w-[255.38px] absolute left-[730.64px] top-[92.91px] overflow-hidden  rounded-[8.87px] rotate-[-2deg] ">
              <img src="/landing/templates/1/5.jpg" alt="Image" className=" " />
            </div>
             <div className="w-[505.17px]  absolute left-[964px] top-[149.63px] overflow-hidden  rounded-[8.87px] rotate-[-2deg] ">
              <img src="/landing/templates/1/6.jpg" alt="Image" className=" " />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 w-full h-[300px] gap-[32px]">
          <div className="col-span-1 bg-[#E4E7FA] rounded-[20px] pt-[20.04px] pl-[20.5px] gap-[8.64px]">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium ">
              Lummi
            </p>
            <p className="text-[18px] text-[#3D4050] font-sans">
              Unlock 20,000+ AI-generated images made by global creators.
            </p>
          </div>
          <div className="col-span-2 bg-[#E4E7FA] pt-[20px] pl-[20px] gap-[8px] rounded-[20px]">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium ">
              Brands
            </p>
            <p className="text-[18px] text-[#3D4050] font-sans">
              Get on-brand, consistent designs with every iteration.
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 w-full h-[300px] gap-[32px]">
          <div className="col-span-2 pt-[20px] pl-[20px] gap-[8px] bg-[#E4E7FA] rounded-[20px]">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium ">
              Social
            </p>
            <p className="text-[18px] w-[285px] text-[#3D4050] font-sans">
              Streamline your content with our AI social media post generator
            </p>
          </div>
          <div className="col-span-1 pt-[20px] pl-[20px] gap-[8px]  bg-[#E4E7FA] rounded-[20px]">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium ">
              Slides
            </p>
            <p className="text-[18px] w-[322.7px]  text-[#3D4050] font-sans">
              Make convincing presentations and pitches in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
