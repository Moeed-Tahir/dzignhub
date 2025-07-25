import { usePathname } from "next/navigation";
import React from "react";

function ContentCreation() {
   const pathname = usePathname();
    const slug = pathname?.split("/").pop();
  
    const slugToKeyMap = {
      "brand-designer": "brandDesigner",
      "content-writer": "contentWriter",
      "ui-ux":"ui_ux",
      "seo":"seo"
      // 
    }
    const currentKey = slugToKeyMap[slug];
  const flexData = {
    brandDesigner:[
    {
      id: 1,
      content:
        "Create professional brand visuals, logos, and style guides effortlessly using simple prompts. Let AI do the design heavy lifting while you stay focused on creativity.",
    },
    {
      id: 2,
      content:
        "From moodboards to brand books—generate consistent visual systems, adaptable across platforms, with just one idea.",
    },
    {
      id: 3,
      content:
        "Easily plug AI tools into your branding process. Collaborate, test variations, and export production-ready assets faster than ever.",
    },
  ],
  contentWriter:[
    {
      id: 1,
      content:
        "Turn simple prompts into blog posts, social media captions, or newsletters in seconds. Your AI handles structure, clarity, and tone—so you can focus on ideas.",
    },
    {
      id: 2,
      content:
        "From full articles to headlines and hashtags, generate content for every platform from a single idea—ready to publish.",
    },
    {
      id: 3,
      content:
        "Plug AI directly into your content pipeline. Plan, create, optimize, and collaborate in one smooth, intelligent flow.",
    },
  ],
   ui_ux:[
    {
      id: 1,
      content:
        "Go from idea to interface in seconds. Generate wireframes, page structures, and component layouts with smart prompts—your AI handles the logic while you focus on design.",
    },
    {
      id: 2,
      content:
        "Create seamless UX for every device. Adapt screens, flows, and spacing for any platform—all with consistent style and structure.",
    },
    {
      id: 3,
      content:
        "Get instant feedback on usability and flow. Make quick changes, test variations, and improve user experience with confidence.",
    },
  ],
  seo:[
    {
      id: 1,
      content:
        "Identify high-impact keywords, analyze competition, and generate data-driven insights in seconds. Let AI do the research while you focus on strategy.",
    },
    {
      id: 2,
      content:
        "Craft optimized titles, meta descriptions, and headings for every page—instantly aligned with search trends and ranking factors.",
    },
    {
      id: 3,
      content:
        "Track keyword performance, audit pages, and receive smart recommendations to improve visibility and stay ahead of algorithm updates.",
    },
  ]

};

  const assistants = {
    brandDesigner:{
    id: 1,
    title: "Brand Designer",
    image: "/ai-assistants/brand-designer.png",

    steps: [
      "Craft branded visuals effortlessly",
      "Design assets using AI generated templates",
      "Collaborate with creative AI partners",
    ],
  },
  contentWriter:{
    id: 2,
    title: "Content Writer",
    image: "/ai-assistants/content-writer.png",
    steps:[
      "Brainstorm ideas in seconds",
      "Write engaging your unique tone",
      "Automate edits, formatting"
    ]

  },
  ui_ux:{
    id: 3,
    title: "UI/UX Designer",
    image: "/ai-assistants/ui-ux-designer.png",
    steps:[
      "Generate user flows and wireframes",
      "Customize layouts  mobile, and more",
      "Test and iterate with AI-powered"
    ]

  },

  seo:{
    id: 4,
    title: "SEO Companion",
    image: "/ai-assistants/seo.png",
    steps:[
      "Discover top-performing keywords",
      "Generate SEO-friendly metadata",
      "Monitor ranking and boost visibility"
    ]

  }

}
  // Add more assistants here

  return (
    <div className="py-10  mx-auto flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[40px] lg:max-w-[75%] max-w-[90%] mx-auto  ">
        <div className="flex flex-col gap-[10px] text-center text-[#FFFFFF]">
          <div className="md:text-[48px] text-[24px] font-semibold ">
            <span>CREATING CONTENT WITH OUR </span>
            <span className="text-[#C209C1]">AI ASSISTANTS</span>
            <span> IS EASY</span>
          </div>
        </div>
          <div className="flex flex-col lg:flex-row gap-[20px] justify-between" >
            {assistants[currentKey].steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-[12px] text-[20px] lg:text-[18px]"
              >
                <p className="  text-[#BDFF00] w-[24px] h-[24px] rounded-[24px] bg-[#212e62] flex items-center justify-center text-center">
                  {index + 1}
                </p>
                <p className="text-white">{step}</p>
              </div>
            ))}
          </div>
        <div className="flex lg:flex-row flex-col-reverse gap-[30px] w-full mx-auto">
          <div key={assistants[currentKey].id} className="flex flex-col gap-[30px]">
            <img src={assistants[currentKey].image} className="object-cover h-full rounded-[24px]" />
          </div>

          <div className="flex gap-[16px] lg:flex-col overflow-x-auto flex-nowrap scrollbar-hide lg:overflow-visible lg:flex-wrap">
            {flexData[currentKey].map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-[24px]  lg:max-w-[421px] max-w-[368px] py-[16px] px-[24px]  bg-[#212e62] text-[#FFFFFF] flex-shrink-0 lg:flex-shrink lg:flex-grow"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCreation;
