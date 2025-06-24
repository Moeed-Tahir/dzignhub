"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ToolCard = ({
  image,
  icon,
  title,
  description,
  onClick,
  className = "",
  href,
}) => {
  const router = useRouter();
  return (
    <div
      className={` rounded-xl  cursor-pointer overflow-hidden ${className}`}
      onClick={onClick || (() => router.push(href))}
    >
      {/* Image */}
      <div className="bg-[#eff1f3] w-full md:h-[300px] h-[220px]  xl:h-[220px] relative">
        <Image
          src={image}
          alt={title}
          fill
          //   className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-3">
        {/* Icon and Title */}
        <div className="flex items-center space-x-2 mb-1">
          <div className="flex-shrink-0">
            <Image
              src={icon}
              alt={title}
              width={24}
              height={24}
              className="xl:w-6 w-5 h-5 xl:h-6"
            />
          </div>
          <h3 className="xl:text-lg text-sm font-semibold text-[#000000] font-general-sans">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#000000] text-xs xl:text-sm font-general-sans">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToolCard;
