// utils/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const fetchLandingPageData = async () => {
  try {
    // Fetch with populate to get nested components and media
    const response = await fetch(
      `${STRAPI_URL}/api/landing-pages?populate[carousal_images][populate]=*&populate[stack][populate][card][populate]=*&populate[work_card][populate]=*&populate[templates][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the first landing page data if available
    if (data.data && data.data.length > 0) {
      const landingPage = data.data[0];
      
      return {
        mainHeading: landingPage.MainHeading || "Turn Your Words Into Stunning Visuals",
        mainDescription: landingPage.MainDescription || "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
        carouselImages: landingPage.carousal_images || [],
        stackSections: landingPage.stack || [],
        workCards: landingPage.work_card || [],
        templates: landingPage.templates || []
      };
    }
    
    // Return fallback data if no data from Strapi
    return {
      mainHeading: "Turn Your Words Into Stunning Visuals",
      mainDescription: "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
      carouselImages: [],
      stackSections: [],
      workCards: [],
      templates: []
    };
    
  } catch (error) {
    console.error('Error fetching landing page data from Strapi:', error);
    
    // Return fallback data in case of error
    return {
      mainHeading: "Turn Your Words Into Stunning Visuals",
      mainDescription: "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
      carouselImages: [],
      stackSections: [],
      workCards: [],
      templates: []
    };
  }
};

// Helper function to get full image URL from Strapi
export const getStrapiImageUrl = (image) => {
  if (!image) return null;
  
  // Handle both direct URL and Strapi media object
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${STRAPI_URL}${image}`;
  }
  
  if (image.url) {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  return null;
};
