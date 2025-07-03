import React from 'react'

function DownloadApp() {
  return (
    <div className="max-w-[1440px] mx-auto">
            <div className="relative md:h-[592px] h-[330px]">
              <div
                className="absolute top-1/2 transform -translate-y-1/2  max-w-[94%] left-[3%]  max-h-[70%] h-full w-full rounded-[25px] bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: "url('/landing/sidebar/download-bg.png')",
                }}
              >
                <img
                  src="/landing/image-creation/iphone.svg"
                  alt="Iphone"
                  className="absolute md:h-[90%]  w-[40%]  bottom-[0%]  object-center md:right-[5%] right-[2%]"
                />
                <div className="flex flex-col md:gap-[12px] gap-[10px]  md:max-w-[40%] absolute md:top-[15%] top-[5%] left-[5%]  text-[#FFFFFF]">
                  <h2 className="md:text-[20px] text-[18px] font-semibold">
                    {" "}
                    Download Your One & Only App Now
                  </h2>
                  <p className="md:text-[16px] text-[#b2b5c7] text-[14px] max-w-[55%]  md:max-w-full">
                    Chose from a selection of high-quality AI models and
                    experiment a selection of settings and presets.
                  </p>
                </div>
                <button className="absolute left-[5%] md:bottom-[30%] bottom-[8%] text-black md:w-[186px] h-[48px] px-[24px] rounded-[40px] border border-[#BDFF00] bg-[#BDFF00] backdrop-blur-[12px] shadow-[0px_8px_10.9px_#0003121F,0px_1px_1px_#0003124D]">
                  Download App
                </button>
                <img
                  src="/landing/image-creation/download-app-arrows.png"
                  className="max-w-[30%] left-[5%] absolute bottom-[3%] hidden md:block"
                />
              </div>
            </div>
          </div>
  )
}

export default DownloadApp
