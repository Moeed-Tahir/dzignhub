import Image from "next/image";
import React from "react";
import { PiCheckCircleBold } from "react-icons/pi";
import { motion } from "framer-motion";

const animationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const SlideTemplate = ({ img }) => {
  const [tab, setTab] = React.useState("Preview");
  return (
    <motion.div
      className="h-[500px] w-full flex mb-4 flex-col overflow-hidden rounded-[15px] border border-[#F5F5F5]"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center  bg-[#F5F5F5] p-1">
        <div className="flex bg-white p-1 gap-2 rounded-[15px] ">
          {["Preview", "Edit", "Notes"].map((btn, index) => (
            <button
              key={index}
              onClick={() => setTab(btn)}
              className={` rounded-[8px] w-[90px] h-[35px] flex justify-center items-center text-[12px]  font-normal ${
                tab === btn
                  ? "bg-white  border rounded-[8px] text-[#C209C1] border-[#C209C1]"
                  : "text-gray-500 bg-gray-50 "
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center items-center mr-2">
          <button className="px-4 py-1  text-[14px] font-medium bg-white rounded-[6px] flex justify-center items-center text-[#68686B]">
            <PiCheckCircleBold className="inline-block text-black  mr-1" /> Fact
            check content
          </button>
          <button className="px-4 py-1  text-[14px] font-medium bg-white rounded-[6px] flex justify-center items-center text-[#68686B]">
            <Image
            alt="ai edit"
              src={"/pitch/ai.svg"}
              width={21}
              height={21}
              className="inline-block mr-1"
            />{" "}
            Ai edit
          </button>
          <button className="px-4 py-1  text-[14px] font-medium bg-white rounded-[6px] flex justify-center items-center text-[#68686B]">
            <Image
              src={"/pitch/edit.svg"}
              width={21}
              height={21}
              className="inline-block mr-1"
            />{" "}
            Advance Edit
          </button>

          <p className="text-[#68686B] font-normal text-[14px] ">1 / 13</p>
        </div>
      </div>

      <Image
        src={img}
        alt="slide"
        width={800}
        height={400}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default SlideTemplate;
