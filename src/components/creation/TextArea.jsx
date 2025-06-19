import React from "react";

const TextArea = ({ value, onChange }) => {
  return (
    <div>
      <textarea
        placeholder="Generate for me an image with lion under the tree"
        className="w-full pt-[14px] pb-[10px] h-[120px] font-normal px-[8px] text-[14px] text-[#A9A9AA] border resize-none border-[#DEDEDE] rounded-md focus:outline-none focus:border-[#C209C1]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
