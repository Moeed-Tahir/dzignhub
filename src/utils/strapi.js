// utils/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const fetchLandingPageData = async () => {
  try {
    // Fetch with populate to get nested components and media
    const response = await fetch(
      `${STRAPI_URL}/api/landing-pages?populate[carousal_images][populate]=*&populate[stack][populate][card][populate]=*&populate[work_card][populate]=*&populate[templates][populate]=*&populate[download_section][populate]=*&populate[cards][populate]=*&populate[pricing_plans][populate][benefits][populate]=*&populate[testimonial_section][populate][testimonial][populate]=*&populate[assistant_section][populate][assistants][populate]=*`
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
        templates: landingPage.templates || [],
        downloadSection: landingPage.download_section || null,
        cards: landingPage.cards || [],
        pricingPlans: landingPage.pricing_plans || [],
        testimonialSection: landingPage.testimonial_section && landingPage.testimonial_section[0] ? landingPage.testimonial_section[0] : null,
        assistantSection: landingPage.assistant_section && landingPage.assistant_section[0] ? landingPage.assistant_section[0] : null
      };
    }
    
    // Return fallback data if no data from Strapi
    return {
      mainHeading: "Turn Your Words Into Stunning Visuals",
      mainDescription: "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
      carouselImages: [],
      stackSections: [],
      workCards: [],
      templates: [],
      downloadSection: null,
      cards: [],
      pricingPlans: [],
      testimonialSection: null,
      assistantSection: null
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
      templates: [],
      downloadSection: null,
      cards: [],
      pricingPlans: [],
      testimonialSection: null,
      assistantSection: null
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

// Fetch blog page data with all posts
export const fetchBlogPageData = async () => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-pages?populate[posts][populate][posts][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Blog page API response:', data);
    
    if (data.data && data.data.length > 0) {
      const blogPage = data.data[0];
      
      // Extract the nested posts structure
      const postsSection = blogPage.posts && blogPage.posts[0];
      const posts = postsSection?.posts || [];
      
      return {
        heroTitle: postsSection?.heroTitle || "Latest Blog",
        heroSubtitle: postsSection?.heroSubtitle || "News and articles",
        posts: posts
      };
    }
    
    return {
      heroTitle: "Latest Blog",
      heroSubtitle: "News and articles", 
      posts: []
    };
    
  } catch (error) {
    console.error('Error fetching blog page data from Strapi:', error);
    return {
      heroTitle: "Latest Blog",
      heroSubtitle: "News and articles",
      posts: []
    };
  }
};

// Fetch individual blog post by slug
export const fetchBlogPostBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-pages?populate[posts][populate][posts][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Blog post API response:', data);
    
    if (data.data && data.data.length > 0) {
      const blogPage = data.data[0];
      const postsSection = blogPage.posts && blogPage.posts[0];
      const posts = postsSection?.posts || [];
      
      // Find the post with matching slug
      const post = posts.find(p => p.slug === slug);
      
      if (post) {
        return post;
      }
    }
    
    return null;
    
  } catch (error) {
    console.error('Error fetching blog post from Strapi:', error);
    return null;
  }
};

// Fetch contact page data with form
export const fetchContactPageData = async () => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/contact-pages?populate[form][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Contact page API response:', data);
    
    if (data.data && data.data.length > 0) {
      const contactPage = data.data[0];
      
      return {
        form: contactPage.form || null
      };
    }
    
    return {
      form: null
    };
    
  } catch (error) {
    console.error('Error fetching contact page data from Strapi:', error);
    return {
      form: null
    };
  }
};
