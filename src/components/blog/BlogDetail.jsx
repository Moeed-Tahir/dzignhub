import React from "react";

function BlogDetail({ blog }) {
  return (
    <div className="flex flex-col gap-[40px] lg:col-span-2 ">
      <h1 className="md:text-[48px] text-[34px] font-semibold">Introduction</h1>
      <p className="text-[#3D4050]">{blog.content.intro}</p>
      <div className="flex flex-col gap-[10px]">
        <img
          src={blog.image1}
          className="lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px]  rounded-tr-[15px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[32px] "
        />
        <p className="text-[14px] text-[#3D4050]">{blog.image1Reference}</p>
      </div>
      <div className="py-[15px] px-[25px] flex flex-col gap-[40px] border-l-[2px] border-[#C209C1]">
        <h1 className="text-[24px] font-semibold">{blog.quote}</h1>
        <p className="text-[16px] text-[#3D4050]">{blog.quoteReference}</p>
      </div>

      <h1 className="lg:text-[30px] text-[34px] lg:font-medium font-semibold">
        Other Resources
      </h1>
      <div className="text-[18px] text-[#3D4050]">
        <p className="">{blog.content.afterQuote}</p>
        <ol className="list-decimal pl-5">
          {blog.content.resources.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-[10px]">
        <img
          src={blog.image2}
          className="lg:rounded-tl-[20px] lg:rounded-tr-[60px] lg:rounded-br-[20px] lg:rounded-bl-[20px] rounded-[12px]"
        />
        <p className="text-[14px] text-[#3D4050]">{blog.image2Reference}</p>
      </div>
      <p className="text-[18px] text-[#3D4050]">{blog.content.final}</p>
      <div className="bg-[#E4E7FA] lg:py-[40px] lg:px-[40px] px-[20px] py-[20px] rounded-[20px] lg:gap-[30px] gap-[20px] flex flex-col ">
        <h1 className="font-medium text-[30px]">Conclusion</h1>
        <p className="text-[18px] text-[#3D4050]">{blog.content.conclusion}</p>
      </div>
    </div>
  );
}

export default BlogDetail;
