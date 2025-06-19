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

      <div className="w-[1280px] h-[1150px] flex flex-col gap-[32px]">
        {/* Row 1 */}
        <div className="w-full h-[300px] bg-[#E4E7FA] rounded-xl">
          <div className="w-[434px] h-[72.25px] top-[20px] left-[20px] gap-[8px] flex flex-col">
            
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 w-full h-[300px] gap-[32px]">
          <div className="col-span-1 bg-[#E4E7FA] rounded-xl">
            Row 2 – Col 1
          </div>
          <div className="col-span-2 bg-[#E4E7FA] rounded-xl">
            Row 2 – Col 2
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 w-full h-[300px] gap-[32px]">
          <div className="col-span-2 bg-[#E4E7FA] rounded-xl">
            Row 3 – Col 1
          </div>
          <div className="col-span-1 bg-[#E4E7FA] rounded-xl">
            Row 3 – Col 2
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
