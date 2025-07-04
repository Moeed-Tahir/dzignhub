import React from "react";

function SmartSupport() {
  return (
    <div className="xl:py-20 py-10">

    <div className="max-w-[90%] mx-auto bg-[#1B1F3B] rounded-[39px] text-[#FFFFFF] px-10 py-20">
      <div className="flex md:gap-[67px] gap-[40px] xl:flex-row flex-col">
        <div className="flex flex-col gap-[35px] xl:max-w-[40%]">
          <div className="md:text-[48px] text-[24px] font-semibold">
            <span>Smart Support for Every </span>
            <span className="text-[#C209C1]">Creative Role</span>
          </div>
          <p className="md:text-[18px] text-[20px]">
            Our AI companions are designed to elevate how you work—no matter
            your craft. From branding and content creation to UX design and SEO,
            get tailored assistance that boosts productivity, enhances
            creativity, and simplifies your day-to-day tasks—all in one seamless
            experience.
          </p>
          <button className="w-[183px] h-[54px] rounded-[743px] bg-[#BDFF00] py-[13px] px-[23px] text-center text-black text-[18px] font-semibold">
            Get started
          </button>
        </div>
        <div className="grid grid-cols-2 h-[450px] md:grid-cols-3 gap-x-4 gap-y-10 xl:gap-y-0 xl:pt-15 xl:w-[50%]">
          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/1.png"
              className="absolute top-[-20%] h-[66px] w-[66px] lg:h-[75px] lg:w-[75px] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Generate on-brand visuals, wireframes, and layouts instantly.
            </p>
          </div>

          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/2.png"
              className="absolute top-[-20%] h-[65px] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute  text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Optimize SEO content with smart keyword and meta tips.
            </p>
          </div>

          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/3.png"
              className="absolute top-[-20%] h-[65px] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Create logos, color palettes, and brand assets fast.
            </p>
          </div>

          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/4.png"
              className="absolute top-[-20%] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Connect and grow in a creative AI community.
            </p>
          </div>

          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/5.png"
              className="absolute top-[-20%] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Get AI-powered strategy, targeting, and campaign ideas.
            </p>
          </div>

          <div className="rounded-[13px] bg-[#212d61] border-white/10 max-h-[150px] xl:max-h-[120px] text-center relative">
            <img
              src="/ai-assistants/smart-support/6.png"
              className="absolute top-[-20%] left-1/2 -translate-x-1/2"
              />
            <p className="bottom-0 absolute text-[12px] sm:text-[16px] xl:text-[14px] px-2 py-1">
              Write content in your tone across all formats.
            </p>
          </div>
        </div>
      </div>
    </div>
              </div>
  );
}

export default SmartSupport;
