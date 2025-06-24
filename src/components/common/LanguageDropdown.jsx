import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = ["English", "Urdu", "Spanish", "French", "German"];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
  };

  return (
    <div className="relative w-[199px] h-[40px] font-roboto font-semibold text-[13.78px] text-white">
      {/* Custom Styled Button */}
      <button
        onClick={toggleOpen}
        className="w-full h-full bg-[#2d314b] border-t border-white/10 rounded-full relative"
      >
        {/* Left Icon */}
        <img
          src="/common/footer/lang-icon.svg"
          alt="Language Icon"
          className="absolute w-[20px] h-[20px] top-[10px] left-[13px]"
        />

        {/* Language Text */}
        <span className="absolute top-[10px] left-[41px]">
          {selected}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`absolute w-[20px] h-[20px] top-[10px] left-[163px] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="white"
          viewBox="0 0 12 8"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-[#1B1F3B] border border-white/10 rounded-xl z-10 overflow-hidden"
          >
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => handleSelect(lang)}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
              >
                {lang}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    
    </div>
  );
}
