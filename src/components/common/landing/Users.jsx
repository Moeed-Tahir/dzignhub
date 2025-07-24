import React from "react";

function Users() {
  return (
    <div className="max-w-[1440px] h-[434px] justify-center flex items-center mx-auto">
      <div className="flex flex-col gap-[33px] justify-center items-center ">
        <img
          src="/landing/image-creation/avatars.svg"
          className="max-w-[90%] max-h-[90px] mx-auto"
        />
        <div className="flex flex-col gap-[9px] max-w-[715px]  text-center">
          <div className="text-[30px] font-medium">
            <span className="text-[#C209C1]">+18 Million Creators </span>
            <span>using AllmyAI</span>
          </div>
          <p className="text-[18px]">
            Our users love using Allmyai to build their marketing assets. We
            empower them to create assets at scale, faster than ever, with
            cutting-edge technology.
          </p>
        </div>
        <button className="xl:w-[163px] w-[90%] h-[56px] font-medium text-[18px] bg-[#BDFF00] rounded-full px-3 py-3 flex items-center justify-center gap-0">
  Join Our team
</button>
      </div>
    
    </div>
  );
}

export default Users;
