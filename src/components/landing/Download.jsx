import React from "react";

function Download() {
  return (
    <div
      className="w-full"
      style={{
        background: "#1B1F3B",
      }}
    >
      <div className="w-[1440px] h-[867px] py-[64px] px-[80px]">
        <div className="w-[1280px] h-[739px] flex items-center justify-between">
          <div className="w-[688px] h-[690px] flex flex-col gap-[78px] text-[48px] font-semibold text-[#FFFFFF]">
            <div className="gap-[119px] flex flex-col h-[552px] w-[668px]">
              <div>
                <span className="text-[#C209C1]">Download the app </span>
                <span className="">
                  and start creating with AI — anytime, anywhere.
                </span>
              </div>
              <p className="w-[525px] text-[24px] ">
                Our AI-powered creative app gives you access to your personal
                team of assistants — wherever you are.
                <br />
                Design logos, create social media content, generate marketing
                strategies, and get real-time insights — all in one place. No
                skills required. Just your ideas.
              </p>
            </div>
            <div className="flex gap-[11.13px]">
              <div className="w-[200px] h-[60px]">
                <img src="/landing/download/app-store.svg" alt="App Store" />
              </div>
              <div className="w-[200px] h-[60px]">
                <img src="/landing/download/google-play.svg" alt="Google Play" />
              </div>
            </div>
          </div>

          {/* Device with magenta glow like in Figma */}
          <div className="relative w-[355px] h-[739px] flex items-center justify-center ">
            <div
              className="absolute w-[520px] h-[300px] right-[10px] rounded-full blur-[120px] opacity-70"
              style={{
                background: "#C209C1",
                zIndex: 0,
              }}
            ></div>
            <img
              src="/landing/download/iphone.svg"
              className="relative z-10 w-[355px] h-[739px]"
              alt="iPhone preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
