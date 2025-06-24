function AssistantCard({ src, name="",style = {}, positionClass = "" }) {
  return (
    <div
      className={`w-[380px] h-[315px] overflow-hidden absolute flex p-[20px] justify-center  border border-[#FFFFFF]/15 rounded-[40px] ${positionClass}`}
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
        ...style,
      }}
    >
      <div className="w-[319px] h-[319px] overflow-hidden rounded-[20px] ">
        <img src={src} className="w-full h-full object-cover " />
      </div>
      <div className="absolute bottom-[10px] left-[20px] text-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-semibold text-[#bababc]">
        {name}
      </div>
    </div>
  );
}
export default AssistantCard
