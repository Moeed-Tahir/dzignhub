function AssistantCard({ src, name="",style = {}, positionClass = "" }) {
  return (
    <div
      className={`md:w-[380px] relative  md:max-h-[315px] w-[132px] max-h-[110px]  h-full overflow-hidden  flex flex-col justify-center items-center    border border-[#FFFFFF]/15 rounded-[10px] xl:rounded-[40px] `}
      style={{
        background: `
          linear-gradient(180deg, rgba(46, 51, 90, 0) 0%, rgba(28, 27, 51, 0.1) 100%),
          radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 99.59%)
        `,
        boxShadow: `
          0px 30px 60px 0px #0000001A,
          0px 15px 30px 0px #0000000D,
          0px 5px 10px 0px #0000000D,
          0px 0px 100px 0px #CCD7FF26 inset,
          0px 4px 4px 0px #00000040,
          0px -54px 24px 0px #00000045 inset
        `,
      }}
    >
      <div className="overflow-hidden  rounded-[20px] ">
        <img src={src} className="w-full h-full object-cover " />
      </div>
      <div className=" bottom-1 xl:bottom-5 absolute left-1 xl:left-5   md:text-[20px] text-[6.95px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-semibold text-[#bababc]">
        {name}
      </div>
    </div>
  );
}
export default AssistantCard
