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

      <div className="w-[1280px] h-[1150px] flex flex-col gap-[32px] ">
        {/* Row 1 */}
        <div className="w-[1280px] h-[362px] bg-[#E4E7FA] rounded-[20px] overflow-hidden">
          <div className="w-[434px] h-[72.25px] pt-[20px] pl-[20px] gap-[8px] flex flex-col">
            <p className="text-[30px] text-[#C209C1] font-sans font-medium">
              Wesbite
            </p>
            <p className="text-[18px] text-[#3D4050] font-sans">
              Create gorgeous landing pages with a simple prompt.
            </p>
          </div>
          <div className="w-[1258px] h-[309px] pt-[57px] pl-[22px]  border-2">
            <div className="w-[255.38px]  relative left-[0.48px] z-1   rounded-[10.64px] pt-[30.42px]  pl-[0.48px] rotate-[-2deg] inline-block">
              <img
                src="/landing/templates/1/1.jpg"
                alt="Image"
                className="  "
              />
            </div>
            <div className="w-[255.38px] relative right-[30px]  rounded-[8.87px] pt-[30.42px]  pl-[0.48px] rotate-[-2deg] inline-block ">
              <img src="/landing/templates/1/2.jpg" alt="Image" className=" " />
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
