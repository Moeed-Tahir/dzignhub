// Sample Strapi data structure for testing
// This shows the expected format for the LandingPage collection data

export const sampleLandingPageData = {
  MainHeading: "Create Amazing Visuals with AI",
  MainDescription: "Transform your ideas into stunning visuals using our advanced AI technology. Perfect for designers, marketers, and creators.",
  
  carousal_images: [
    {
      images1: [
        { url: "/landing/carousel-1/1.webp" },
        { url: "/landing/carousel-1/2.webp" },
        { url: "/landing/carousel-1/3.jpg" }
      ],
      images2: [
        { url: "/landing/carousel-2/1.webp" },
        { url: "/landing/carousel-2/2.webp" },
        { url: "/landing/carousel-2/3.webp" }
      ]
    }
  ],
  
  stack: [
    {
      titleline1: "Endless",
      titleline2: "possibilities", 
      subtitle: "with AI art",
      card: [
        {
          heading: "Novi",
          type: "Content Creation",
          num: "01",
          para: "Digital transformation and automation improve efficiency, cut costs, and enable innovation through real-time insights for smarter decision-making.",
          image: { url: "/ai-assistants/brand-designer/zara.jpg" }
        },
        {
          heading: "Kano", 
          type: "Video Creation",
          num: "02",
          para: "Developing software that optimizes business and ensures a smooth user experience.",
          image: { url: "/ai-assistants/brand-designer/zara.jpg" }
        }
      ]
    }
  ],
  
  work_card: [
    {
      title: "Describe your idea",
      description: "Start your project by uploading assets or choosing a template. You control the direction from the very beginning, shaping your vision exactly the way you want.",
      mobileManualImage: { url: "/landing/work/mobile/manual-1.png" },
      desktopManualImage: { url: "/landing/work/desktop/manual-1.jpg" },
      mobileProImage: { url: "/landing/work/mobile/pro-1.jpg" },
      desktopProImage: { url: "/landing/work/desktop/pro-1.jpg" }
    },
    {
      title: "Let the System do your work", 
      description: "Access powerful manual tools for image editing, video creation, or content design. You guide the process — the platform provides the flexibility and tools you need.",
      mobileManualImage: { url: "/landing/work/mobile/manual-2.jpg" },
      desktopManualImage: { url: "/landing/work/desktop/manual-2.jpg" },
      mobileProImage: { url: "/landing/work/mobile/pro-2.jpg" },
      desktopProImage: { url: "/landing/work/desktop/pro-2.jpg" }
    },
    {
      title: "Customize & download",
      description: "Make final adjustments to suit your preferences. Once you're done, download your finished files and bring your project to life with confidence.",
      mobileManualImage: { url: "/landing/work/mobile/manual-3.jpg" },
      desktopManualImage: { url: "/landing/work/desktop/manual-3.jpg" },
      mobileProImage: { url: "/landing/work/mobile/pro-3.jpg" },
      desktopProImage: { url: "/landing/work/desktop/pro-3.jpg" }
    }
  ],
  
  templates: [
    {
      title: "Website",
      description: "Create gorgeous landing pages with a simple prompt.",
      layout: "website",
      images: [
        { url: "/landing/templates/1/1.jpg" },
        { url: "/landing/templates/1/2.jpg" },
        { url: "/landing/templates/1/3.jpg" },
        { url: "/landing/templates/1/4.jpg" },
        { url: "/landing/templates/1/5.jpg" },
        { url: "/landing/templates/1/6.jpg" }
      ]
    },
    {
      title: "Lummi",
      description: "Unlock 20,000+ AI-generated images made by global creators.",
      layout: "lummi",
      images: [
        { url: "/landing/templates/2/1.jpg" },
        { url: "/landing/templates/2/2.jpg" },
        { url: "/landing/templates/2/3.jpg" }
      ]
    },
    {
      title: "Brands",
      description: "Get on-brand, consistent designs with every iteration.",
      layout: "brands", 
      images: [
        { url: "/landing/templates/3/1.jpg" },
        { url: "/landing/templates/3/2.jpg" },
        { url: "/landing/templates/3/3.jpg" }
      ]
    },
    {
      title: "Social",
      description: "Streamline your content with our AI social media post generator",
      layout: "social",
      images: [
        { url: "/landing/templates/4/1.jpg" },
        { url: "/landing/templates/4/2.jpg" }
      ]
    },
    {
      title: "Slides",
      description: "Make convincing presentations and pitches in seconds.",
      layout: "slides",
      slides: [
        { url: "/landing/templates/5/1.jpg" },
        { url: "/landing/templates/5/1.jpg" },
        { url: "/landing/templates/5/1.jpg" }
      ]
    }
  ]
};
