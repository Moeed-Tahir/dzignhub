"use client";
import React, { useState } from "react";

const CustomSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition bg-[#C209C1] flex items-center ${
      checked ? "justify-end" : "justify-start"
    } px-1`}
    aria-checked={checked}
    role="switch"
  >
    <span className="w-5 h-5 bg-white rounded-full shadow" />
  </button>
);

const CustomCheckbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
      checked ? "bg-[#C209C1] border-[#C209C1]" : "bg-white border-[#E3E9EE]"
    }`}
    aria-checked={checked}
    role="checkbox"
  >
    {checked && (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M5 9.5L8 12.5L13 7.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);

const page = () => {
  const [allEnabled, setAllEnabled] = useState(true);
  const [checks, setChecks] = useState([false, true, false]);

  const handleCheck = (idx, value) => {
    setChecks((prev) => prev.map((c, i) => (i === idx ? value : c)));
  };

  return (
    <div className="bg-white flex-1 min-h-screen px-[160px] py-[80px] flex flex-col items-start">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-[#2A0856] text-[34px] font-semibold mb-8">
          Notifications
        </h1>
        <div className="w-full flex justify-end mb-8">
          <CustomSwitch checked={allEnabled} onChange={setAllEnabled} />
        </div>
      </div>
      <hr className="w-full border-[#E3E9EE] mb-10" />
      <div className="w-full max-w-[600px]">
        <div className="text-[24px] font-semibold text-[#2A0856] mb-6">allmyai</div>
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              New notifications
            </span>
            <CustomCheckbox
              checked={checks[0]}
              onChange={(v) => handleCheck(0, v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              Software Updates and Newsletter
            </span>
            <CustomCheckbox
              checked={checks[1]}
              onChange={(v) => handleCheck(1, v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#393E44] text-[14px]">
              New messages from bots
            </span>
            <CustomCheckbox
              checked={checks[2]}
              onChange={(v) => handleCheck(2, v)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-2">
         <button
            type="submit"
            className="bg-[#D0FF00] hover:bg-[#b8e600] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] transition"
          >
            Save change
          </button>
             <button
            type="button"
            className="border border-[#E3E9EE] text-[#1B1F3B] font-medium rounded-full text-[14px] w-[130px] h-[44px] bg-white hover:bg-[#F6F6F6] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
