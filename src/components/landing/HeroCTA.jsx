import React from "react";
import { motion } from "framer-motion";
function HeroCTA() {
  return (
    <div>
      {/* CTA Section */}
      <div className=" hidden lg:flex lg:w-[740px] lg:h-[78px] rounded-[999px] mx-auto  items-center bg-[#212e62] justify-center gap-[10px]">
        <motion.p
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-[18px] text-[#9997A0]"
        >
          A Cyberpunk Dystopia With A Sprawling, Rain-Soaked Cityscape
        </motion.p>
        <motion.button

           initial={{ x: 30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          className={`w-[179px] h-[54px] bg-[#BDFF00] text-[18px]  rounded-full flex items-center justify-center gap-[8px]`}
        >
          <motion.img
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            src="/landing/starVector.svg"
            alt="star"
            className="w-[24px] h-[24px] object-contain"
          />
          <span
         
            className="text-[#1B1F3B]"
          >
            Create image
          </span>
        </motion.button>
      </div>

      {/* CTA Section Mobile*/}
    </div>
  );
}

export default HeroCTA;
