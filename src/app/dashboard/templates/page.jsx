"use client";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import React from "react";
import All from "@/app/assets/All";
import Ui from "@/app/assets/UI";
import Seo from "@/app/assets/Seo";
import Brand from "@/app/assets/Brand";
import Content from "@/app/assets/Ai";
import TemplateModal from "@/components/template/Modal";

import Strategy from "@/app/assets/Strategy";

const page = () => {
  const [selected, setSelected] = React.useState("All");
  const [isOpen, setIsOpen] = React.useState(false);
  const btn = [
    {
      name: "All",
      icon: <All fill={`${selected === "All" ? " #C209C1" : " #344054"}`} />,
    },
    {
      name: "UX/UI",
      icon: <Ui fill={`${selected === "UX/UI" ? " #C209C1" : " #344054"}`} />,
    },
    {
      name: "SEO",
      icon: <Seo fill={`${selected === "SEO" ? " #C209C1" : " #344054"}`} />,
    },
    {
      name: "Brand Design",
      icon: (
        <Brand
          fill={`${selected === "Brand Design" ? " #C209C1" : " #344054"}`}
        />
      ),
    },
    {
      name: "Content Creation",
      icon: (
        <Content
          fill={`${selected === "Content Creation" ? " #C209C1" : " #344054"}`}
        />
      ),
    },
    {
      name: "Pitch Deck",
      icon: (
        <Content
          fill={`${selected === "Pitch Deck" ? " #C209C1" : " #344054"}`}
        />
      ),
    },
    {
      name: "Strategy Assistant",
      icon: (
        <Strategy
          fill={`${
            selected === "Strategy Assistant" ? " #C209C1" : " #344054"
          }`}
        />
      ),
    },
  ];

  const template = [
    {
      name: "Social Media",
      img: "/template/1.jpg",
    },
    {
      name: "Social Media",
      img: "/template/2.jpg",
    },
    {
      name: "Social Media",
      img: "/template/3.jpg",
    },
    {
      name: "Social Media",
      img: "/template/4.jpg",
    },
    {
      name: "Social Media",
      img: "/template/5.jpg",
    },
    {
      name: "Social Media",
      img: "/template/6.jpg",
    },
    {
      name: "Social Media",
      img: "/template/7.jpg",
    },
    {
      name: "Social Media",
      img: "/template/8.jpg",
    },
    {
      name: "Social Media",
      img: "/template/9.jpg",
    },
  ];
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <Navbar />

      <div className="  w-full flex-col gap-5 flex px-5 mx-auto py-6">
        <div className="flex flex-1 justify-between items-center">
          <div className="flex gap-2 ">
            {btn.map((button, index) => (
              <button
                key={index}
                onClick={() => setSelected(button.name)}
                className={`px-4 h-[44px] flex justify-center whitespace-nowrap gap-2 bg-white items-center ${
                  button.name === selected
                    ? "border border-[#C209C1]"
                    : " border border-[#ECECEC]"
                } bg-[#F5F5F5] text-[${
                  button.name === selected ? "#C209C1" : "#344054"
                }] rounded-full text-[14px] font-medium`}
              >
                {button.icon}
                {button.name}
              </button>
            ))}
          </div>

          <div className="justify-end border border-[#ECECEC] rounded-full bg-white items-center flex px-3 gap-2">
            <Image src={"/search.svg"} alt="" height={18} width={18} />
            <input type="text" placeholder="Search..." className=" py-2 px-4" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 ml-6 flex-2  ">
          {template.map((item, index) => (
            <div
              key={index}
              onClick={() => setIsOpen(true)}
              className=" flex flex-col relative  bg-white group cursor-pointer rounded-[16px] overflow-hidden shadow-md"
            >
              <Image
                src={item.img}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover rounded-[16px]"
              />

              <div className="absolute top-0 w-full justify-center items-center flex-col h-full opacity-0 group-hover:opacity-100 flex right-0 bg-black/90 ease-in-out duration-300 transition-all  ">
                <p className="text-white text-[18px] font-semibold text-center">
                  {item.name}
                </p>
                <div>
                  <button className="px-4 py-2 bg-[#C209C1] text-white rounded-full border-[#C209C1] border  transition-colors">
                    Use Template
                  </button>
                  <button className="px-4 py-2 bg-transparent text-[#C209C1] rounded-full border-[#C209C1] border  transition-colors ml-2">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TemplateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mainPic={"/template/1.jpg"}
          suggestions={[
            "/template/2.jpg",
            "/template/3.jpg",
            "/template/4.jpg",
          ]}
          currentTitle={"Social Media Post"}
          currentSubtitle={"Content Creation"}
          currentDesc={
            "modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance modernist style, A chinchilla in a luxurious kimono, holding a pair of sharp and sturdy scythes, ready to protect those under her care., art nouveau, soft colors, pale diffused light, long distance"
          }
          currentTags={["Image", "JPG", "800x1200", "0.7:1"]}
        />
      </div>
    </div>
  );
};

export default page;
