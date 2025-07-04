import React from "react";

function ContentCreation() {
  const flexData = [
    {
      id: 1,
      content:
        "Create stunning visuals, text, or videos in seconds using simple prompts. Let AI handle the heavy lifting while you focus on creativity.",
    },
    {
      id: 2,
      content:
        "From short videos to social media posts and branding kits — generate all your content in multiple formats with just one idea.",
    },
    {
      id: 3,
      content:
        "Easily integrate AI tools into your creative process. Collaborate, iterate, and publish faster with intuitive AI assistance.",
    },
  ];

  const assistants = [
    {
      id: 1,
      title: "Brand Designer",
      image: "/ai-assistants/brand-designer.png",
     
      steps: [
        "Craft branded visuals effortlessly",
        "Design assets using AI generated templates",
        "Collaborate with creative AI partners"
      ],
    },
    {
      id: 2,
      title: "Content Writer",
      image: "/ai-assistants/content-writer.png",
     
      steps: [
        "Generate content ideas with AI",
        "Edit videos with smart suggestions",
        "Streamline content workflows"
      ],
    },
    // Add more assistants here
  ];

  return (
    <div className="py-10  mx-auto flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[64px] lg:max-w-[75%] max-w-[90%] mx-auto  ">
        <div className="flex flex-col gap-[10px] text-center text-[#FFFFFF]">
          <div className="md:text-[48px] text-[24px] font-semibold ">
            <span>CREATING CONTENT WITH OUR </span>
            <span className="text-[#C209C1]">AI ASSISTANTS</span>
            <span> IS EASY</span>
          </div>
          <span className="text-[20px]">
            Effortlessly craft stunning content using our powerful manual tools
            or let our AI assistants speed up your creative process.
          </span>
        </div>
        <div className="flex gap-[16px] overflow-x-auto flex-nowrap scrollbar-hide lg:overflow-visible lg:flex-wrap">
          {flexData.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[24px] lg:max-w-[30%] max-w-[356px]  bg-[#212e62] text-[#FFFFFF] flex-shrink-0 lg:flex-shrink lg:flex-grow"
            >
              {item.content}
            </div>
          ))}
        </div>
        <div className="flex gap-[60px] md:flex-row flex-col ">
          {assistants.map((assistant) => (
            <div
              key={assistant.id}
              className="flex flex-col gap-[30px]"
            >
              <img
                src={assistant.image}
                className="object-cover"
              />

              <div
                className="flex flex-col gap-[20px] text-[#BDFF00]"
              >
                <h2 className="text-[24px]">{assistant.title}</h2>

                <div className="flex flex-col gap-[16px]">
                  {assistant.steps.map((step, index) => (
                    <div key={index} className="flex gap-[12px] text-[20px] lg:text-[18px]">
                      <p className="w-[24px] h-[24px] px-[9px] rounded-[24px] bg-[#212e62] text-center">
                        {index + 1}
                      </p>
                      <p className="text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentCreation;
