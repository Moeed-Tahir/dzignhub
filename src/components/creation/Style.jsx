import React from "react";
import Image from "next/image";

const Style = () => {
  const styles = [
    {
      id: 1,
      name: "Golder hour",
      image: "/creation/styles/1.jpg",
    },
    {
      id: 2,
      name: "Candle lit",
      image: "/creation/styles/2.jpg",
    },
    {
      id: 3,
      name: "Chiaroscuro ",
      image: "/creation/styles/3.jpg",
    },
    {
      id: 4,
      name: "Film haze",
      image: "/creation/styles/4.jpg",
    },
    {
      id: 5,
      name: "Midnight",
      image: "/creation/styles/5.jpg",
    },
    {
      id: 6,
      name: "Light",
      image: "/creation/styles/6.jpg",
    },
  ];
  return (
    <div>
      <div className="flex justify-start my-2 items-center gap-2">
        <Image
          src="/creation/eraser.svg"
          alt="Style"
          width={100}
          height={100}
          className="w-[24px] h-[24px] object-cover rounded-md"
        />
        <span className="text-[20px] font-normal text-[#202126] ">Style</span>
      </div>

      <div className="flex flex-wrap gap-[3px] ">
        {styles.map((style) => (
          <div
            key={style.id}
            className="flex items-center  rounded-[8px] bg-[#F7F8F8] justify-between flex-col w-[100px] h-[98px]  cursor-pointer"
          >
            <Image
              src={style.image}
              alt={style.name}
              width={100}
              height={100}
              className="w-full h-[79px] object-cover rounded-t-[8px] "
            />
            <span className="text-[12px] font-normal text-[#202126]">
              {style.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Style;
