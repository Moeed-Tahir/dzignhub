import React from "react";

function HeroCTA() {
  return (
    <div>
      {/* CTA Section */}
      <div className=" hidden lg:flex lg:w-[740px] lg:h-[78px] rounded-[999px] mx-auto  items-center bg-[#212e62] justify-center gap-[10px]">
        <p className="text-[18px] text-[#9997A0]">
          A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
        </p>
        <button
          className={`w-[179px] h-[54px] bg-[#BDFF00] text-[18px]  rounded-full flex items-center justify-center gap-[8px]`}
        >
          <img
            src="/landing/starVector.svg"
            alt="star"
            className="w-[24px] h-[24px] object-contain"
          />
          <span className="text-[#1B1F3B]">Create image</span>
        </button>
      </div>

      {/* CTA Section Mobile*/}
      
    </div>
  );
}

export default HeroCTA;
