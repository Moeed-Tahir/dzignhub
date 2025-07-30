import React from "react";

function Workflow({currentKey}) {
  const workflowFeatures ={
    brandDesigner:{
      text:"Meet your intelligent brand companion—built to support designers in creating logos, color palettes, and full brand systems. Whether you’re launching a startup or refreshing a legacy, this AI brings clarity and creativity to every design.",
      workflow:[{
      id: 1,
      icon: "/ai-assistants/workflow/brand-designer/1.svg",
      text: "Advanced branding intelligence",
    },
    {
      id: 2,
      icon: "/ai-assistants/workflow/brand-designer/2.svg",
      text: "Flexible style and tone presets",
    },
    {
      id: 3,
      icon: "/ai-assistants/workflow/brand-designer/3.svg",
      text: "Instant visual mockups",
    },
     {
      id: 4,
      icon: "/ai-assistants/workflow/brand-designer/4.svg",
      text: "Seamless design tool sync",
    },
     {
      id: 5,
      icon: "/ai-assistants/workflow/brand-designer/5.svg",
      text: "Learns from brand trends",
    },
    // Add more if needed
  ]},
 contentWriter:{
      text:"Meet your intelligent writing partner—built to support marketers, bloggers, and content creators. Whether you’re writing product pages, blogs, or ads, this AI helps you craft words that resonate and perform",
      workflow:[{
      id: 1,
      icon: "/ai-assistants/workflow/content-writer/1.svg",
      text: "AI-powered copy generation",
    },
    {
      id: 2,
      icon: "/ai-assistants/workflow/content-writer/2.svg",
      text: "Adjustable tone and length",
    },
    {
      id: 3,
      icon: "/ai-assistants/workflow/content-writer/3.svg",
      text: "Live readability scoring",
    },
     {
      id: 4,
      icon: "/ai-assistants/workflow/content-writer/4.svg",
      text: "CMS & publishing integration",
    },
     {
      id: 5,
      icon: "/ai-assistants/workflow/content-writer/5.svg",
      text: "Learn from audience behavior",
    },
    // Add more if needed
  ]},
  ui_ux:{
      text:"Meet your intelligent design assistant—built to support UI/UX experts in creating wireframes, flows, and final designs. Whether you're building web apps or mobile platforms, this AI keeps things simple, smart, and user-friendly.",
      workflow:[{
      id: 1,
      icon: "/ai-assistants/workflow/ui-ux/1.svg",
      text: "Smart layout generation",
    },
    {
      id: 2,
      icon: "/ai-assistants/workflow/ui-ux/2.svg",
      text: "Component-level flexibility",
    },
    {
      id: 3,
      icon: "/ai-assistants/workflow/ui-ux/3.svg",
      text: "Real-time usability feedback",
    },
     {
      id: 4,
      icon: "/ai-assistants/workflow/ui-ux/4.svg",
      text: "Connects Figma & Zeplin",
    },
     {
      id: 5,
      icon: "/ai-assistants/workflow/ui-ux/5.svg",
      text: "Improves with interaction data",
    },
    // Add more if needed
  ]},
  seo:{
      text:"Meet your intelligent SEO expert—built to support specialists in optimizing visibility and traffic. Whether you’re targeting keywords, fixing technical issues, or tracking rankings, this AI brings clarity to your SEO game.",
      workflow:[{
      id: 1,
      icon: "/ai-assistants/workflow/seo/1.svg",
      text: "Data-driven keyword analysis",
    },
    {
      id: 2,
      icon: "/ai-assistants/workflow/seo/2.svg",
      text: "Tailored optimization tactics",
    },
    {
      id: 3,
      icon: "/ai-assistants/workflow/seo/3.svg",
      text: "Live performance monitoring",
    },
     {
      id: 4,
      icon: "/ai-assistants/workflow/seo/4.svg",
      text: "Syncs with analytics tools",
    },
     {
      id: 5,
      icon: "/ai-assistants/workflow/seo/5.svg",
      text: "Adapts to algorithm updates",
    },
    // Add more if needed
  ]},
}


  return (
    <div className="mx-auto md:max-w-[70%] max-w-[95%] py-10">
      <div className="flex flex-col gap-[35px]">
        <div className="flex flex-col gap-[9px]">
          <div className="md:font-medium md:text-[30px] text-[24px]  font-semibold text-center">
            <span className="text-[#C209C1]">AI Companions </span>
            <span>for Every Creative Workflow</span>
          </div>
          <p className="md:text-[18px] text-[20px] text-[#1B1F3B] lg:max-w-[60%] text-center mx-auto">
            {workflowFeatures[currentKey].text}
          </p>
        </div>
        <div className="flex gap-[24px] md:justify-center justify-normal  flex-wrap">
          <div className="flex flex-wrap flex-col w-full lg:flex-row gap-4 justify-center">
            {workflowFeatures[currentKey].workflow.map((feature) => (
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
