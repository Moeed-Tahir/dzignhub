import React from "react";

function Workflow() {
  const workflowFeatures = [
    {
      id: 1,
      icon: "/ai-assistants/workflow/1.svg",
      text: "State-of-the-art algorithms",
    },
    {
      id: 2,
      icon: "/ai-assistants/workflow/2.svg",
      text: "Customizable Solutions",
    },
    {
      id: 3,
      icon: "/ai-assistants/workflow/3.svg",
      text: "Real-time insights",
    },
     {
      id: 4,
      icon: "/ai-assistants/workflow/4.svg",
      text: "Integration capabilities",
    },
     {
      id: 5,
      icon: "/ai-assistants/workflow/5.svg",
      text: "Continuous improvements",
    },
    // Add more if needed
  ];

  return (
    <div className="mx-auto md:max-w-[70%] max-w-[95%] py-10">
      <div className="flex flex-col gap-[35px]">
        <div className="flex flex-col gap-[9px]">
          <div className="md:font-medium md:text-[30px] text-[24px]  font-semibold text-center">
            <span className="text-[#C209C1]">AI Companions </span>
            <span>for Every Creative Workflow</span>
          </div>
          <p className="md:text-[18px] text-[20px] text-[#1B1F3B] lg:max-w-[60%] text-center mx-auto">
            Meet your intelligent design partners—built to support brand
            designers, UI/UX experts, content creators, and SEO specialists.
            Whether you’re crafting visuals, building interfaces, writing copy,
            or optimizing for search.
          </p>
        </div>
        <div className="flex gap-[24px] md:justify-center justify-normal  flex-wrap">
          <div className="flex flex-wrap flex-col w-full lg:flex-row gap-4 justify-center">
            {workflowFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-[#1B1F3B] flex text-[#FFFFFF] rounded-[16px] p-1.5"
              >
                <img src={feature.icon} alt="" />
                <p className="px-[15px] flex items-center">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workflow;
