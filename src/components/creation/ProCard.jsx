import Image from "next/image";
import React from "react";

const ProCard = () => {
  return (
    <div
    
  style={{
    backgroundImage: "url('/Credits.svg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
  className=" bg-[#1B1F3B]   px-[35px] gap-1 py-[40px] flex justify-between items-center flex-col  mt-5 relative rounded-[12px] h-[200px] ">
      {/* <Image
        src={"/creation/REAL BLUR.png"}
        alt=""
        width={100}
        height={100}
        className="w-[400px] object-contain rounded-[11px]  absolute bottom-[0.5px] left-0"
      /> */}

      <div className="w-[56px] flex justify-center left-1/2 -translate-x-1/2 items-center absolute -top-[30px] h-[56px] rounded-full bg-[#BDFF00]  border-[3px] border-white ">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={100}
          height={100}
          
          className="w-[27px]  h-[27px] object-contain"
        />
      </div>

      <p className="text-[18px] font-semibold text-white  ">
        Go unlimited with PRO
      </p>
      <p className="text-[14px] text-center font-normal text-white opacity-70 ">
        {" "}
        Get your AI Project to another level with Allmyai AI assistants!{" "}
      </p>
      <div className="px-[12px] h-[26px] rounded-full bg-[#bf88c6] bg-opacity-100 flex justify-center items-center">
        <p className="text-white text-center text-[12px] font-semibold ">
          Get started with PRO
        </p>{" "}
      </div>
    </div>
  );
};

export default ProCard;
