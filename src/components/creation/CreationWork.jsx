import Image from "next/image";
import React from "react";
const cardsData = [
  {
    id: 1,
    prompt: "Enter Your Prompt",
    text: "Describe your video idea in detail. The more specific your prompt, the better the results.",
  },
  {
    id: 2,
    prompt: "Let AI Generate Your Video",
    text: "Provide a clear text description of the image you want to generate. ",
  },
  {
    id: 3,
    prompt: "Download and Share",
    text: "Choose your format, download your video, and share it instantly with your audience or team.",
  },
];
const CreationWork = ({ isImage }) => {
  return (
    <>
      <div className="max-w-[1440px] md:px-10 px-5 xl:px-0 mx-auto w-[90%]  md:w-full  lg:px-[64px] lg:py-[80px] py-[40px] bg-[#1B1F3B] rounded-[40px]">
        <div>
          <p className="text-[30px] md:text-[48px] font-semibold text-center text-white">
            How{" "}
            <span className="text-[#C209C1] font-semibold">
              {isImage ? "Image" : "Video"}
            </span>{" "}
            Creation works
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]  md:gap-[24px] mt-5 md:mt-[40px]">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center justify-center mb-[40px]"
            >
              <div className="  w-full max-w-[400px] text-center">
                <Image
                  src={`/video-creation/work${card.id}.png`}
                  alt={`Step ${card.id}`}
                  width={400}
                  height={300}
                  className=" mx-auto"
                />
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[#BDFF00] text-[16px] rounded-full w-[24px] h-[24px] border-gray-700 flex items-center justify-center border bg-[#312e62]">{`${card.id}`}</p>
                  <h3 className="text-[20px] text-white font-semibold ">
                    {card.prompt}
                  </h3>
                </div>
                <p className="text-[16px]  text-gray-400">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full my-[55px] flex flex-col justify-center items-center">
        <button className="w-[110px] h-[56px]  rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]">
          Try Now
        </button>

        <div className="flex flex-col w-[90%]  items-center ">
          <Image
            src="/video-creation/md.png"
            alt="Try Now"
            width={5000}
            height={3000}
            className="mx-auto mt-[85px] md:h-[90px] h-[76px] w-full   md:w-[470px] "
          />

          <p className="text-[30px] mt-4 text-center font-medium">
            <span className="text-[#C209C1] mr-2">+18 Million Creators</span>
            using AllmyAI
          </p>
          <p className="text-[18px] font-normal text-center mt-3">
            Our users love using Dzignhub to build their marketing assets. We
            empower them to <br />
            create assets at scale, faster than ever, with cutting-edge
            technology.
          </p>
          <button className="md:w-[163px] w-full my-[40px] h-[56px] mx-auto rounded-[999px] cursor-pointer bg-[#BDFF00] font-medium text-[18px]">
            Join Our Team
          </button>
        </div>
      </div>
    </>
  );
};

export default CreationWork;
