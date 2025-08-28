"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";
const ToolCard = ({
  image,
  icon,
  title,
  description,
  onClick,
  className = "",
  href,
  edited,
  resolution,
}) => {
  // const router = useRouter();
  return (
    <div
      className={` rounded-xl group w-[256px] flex justify-start items-center flex-col   cursor-pointer overflow-hidden ${className}`}
      onClick={onClick || (() => router.push(href))}
    >
      <div className="bg-[#eff1f3] w-full max-w-[256px] md:h-[200px] h-[220px] overflow-hidden rounded-[12px]    relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110  group-hover:rounded-[12px] duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-1 w-full mt-2  justify-between items-center mb-1">
        <h3 className="xl:text-lg  text-start text-sm font-semibold text-[#000000] group-hover:text-[#C209C1] font-general-sans">
          {title}
        </h3>

        <Image src={"/Ai/1.svg"} height={20} width={20} alt="" />
      </div>
      <div className="mt-3 flex justify-between w-full items-center px-1">
        <p className="text-[#000000] flex gap-1 text-xs  duration-300 ease-in-out transition-all xl:text-sm font-general-sans">
          <Image src={icon} height={20} width={20} alt="" />

          {resolution}
        </p>
        <p className="text-[#68686B] text-[14px] font-normal  duration-300 ease-in-out transition-all xl:text-sm font-general-sans">
          {edited}
        </p>
      </div>
    </div>
  );
};

export default ToolCard;
