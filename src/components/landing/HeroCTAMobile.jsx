import React from 'react'

function HeroCTAMobile() {
  return (
    <div>
      <div className=" max-w-[382px] mx-auto h-[144px] flex flex-col gap-[12px] lg:hidden">
        <div className="bg-[#212e62] flex flex-col border-t-[0.49px] border-[#1B1F3B] py-[12px] px-[24px] rounded-[490.57px]">
          <p className="lg:text-[18px] text-[16px] text-[#FFFFFF]">
            A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
          </p>
        </div>
        <div className=" h-[60px] bg-[#BDFF00] py-[16px] px-[20px] xl:px-[12px] gap-[12px] rounded-[49.11px] flex justify-center">
          <button className={` text-[20px] `}>
            <img
              src="/landing/starVector.svg"
              alt="star"
              className="lg:w-[24px] w-[20px] h-[20px] lg:h-[24px] object-contain"
            />
          </button>
          <p className="text-[#1B1F3B]  lg:text-[18px] text-[16px]">
            Create image
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroCTAMobile
