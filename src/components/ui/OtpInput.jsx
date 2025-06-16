"use client";
import React, { useRef } from "react";

const OtpInput = ({ length , onChange }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // Only digits allowed

    e.target.value = value.slice(0, 1); // Limit to 1 digit

    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    const otpValue = inputs.current.map(input => input.value).join("");
    onChange(otpValue);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C209C1] text-xl"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
