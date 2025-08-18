// utils/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const fetchLandingPageData = async () => {
  try {
    // Fetch with populate to get nested components and media
    const response = await fetch(
      `${STRAPI_URL}/api/landing-pages?populate[carousal_images][populate]=*&populate[stack][populate][card][populate]=*&populate[work_card][populate]=*&populate[templates][populate]=*&populate[download_section][populate]=*&populate[cards][populate]=*&populate[pricing_plans][populate][benefits][populate]=*&populate[testimonial_section][populate][testimonial][populate]=*&populate[assistant_section][populate][assistants][populate]=*&populate[faq_section][populate][faqs][populate]=*`
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
        assistantSection: landingPage.assistant_section && landingPage.assistant_section[0] ? landingPage.assistant_section[0] : null,
        faqSection: landingPage.faq_section && landingPage.faq_section[0] ? landingPage.faq_section[0] : null
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
      assistantSection: null,
      faqSection: null
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
      `${STRAPI_URL}/api/contact-pages?populate[form][populate]=*&populate[faq_section][populate][faqs][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Contact page API response:', data);
    
    if (data.data && data.data.length > 0) {
      const contactPage = data.data[0];
      
      return {
        form: contactPage.form || null,
        faqSection: contactPage.faq_section && contactPage.faq_section[0] ? contactPage.faq_section[0] : null
      };
    }
    
    return {
      form: null,
      faqSection: null
    };
    
  } catch (error) {
    console.error('Error fetching contact page data from Strapi:', error);
    return {
      form: null,
      faqSection: null
    };
  }
};

// Fetch assistant page data with hero sections, work sections, image cards, content sections, and workflow sections
export const fetchAssistantPageData = async () => {
  try {
    console.log('Strapi: Starting API call to fetch assistant data...');
    const response = await fetch(
      `${STRAPI_URL}/api/assistant-pages?populate[hero_section][populate]=*&populate[work_section][populate][cards][populate]=*&populate[image_card][populate]=*&populate[content_section][populate][steps][populate]=*&populate[content_section][populate][flexCards][populate]=*&populate[workflow_section][populate][workflow][populate]=*&populate[smartsupport_section][populate][features][populate]=*&populate[faq_section][populate][faqs][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Strapi: API response received:', data);
    
    if (data.data && data.data.length > 0) {
      // Create a map of key to sections data for easy lookup
      const assistantData = {};
      data.data.forEach(item => {
        console.log('Strapi: Processing item:', item);
        
        // Process hero_section array
        if (item.hero_section && item.hero_section.length > 0) {
          item.hero_section.forEach(heroSection => {
            if (heroSection.key) {
              if (!assistantData[heroSection.key]) {
                assistantData[heroSection.key] = {};
              }
              assistantData[heroSection.key].hero = heroSection;
            }
          });
        }
        
        // Process work_section array
        if (item.work_section && item.work_section.length > 0) {
          item.work_section.forEach(workSection => {
            if (workSection.key) {
              if (!assistantData[workSection.key]) {
                assistantData[workSection.key] = {};
              }
              assistantData[workSection.key].work = workSection;
            }
          });
        }
        
        // Process image_card array
        if (item.image_card && item.image_card.length > 0) {
          item.image_card.forEach(imageCard => {
            if (imageCard.key) {
              if (!assistantData[imageCard.key]) {
                assistantData[imageCard.key] = {};
              }
              assistantData[imageCard.key].imageCard = imageCard;
            }
          });
        }
        
        // Process content_section array
        if (item.content_section && item.content_section.length > 0) {
          item.content_section.forEach(contentSection => {
            if (contentSection.key) {
              if (!assistantData[contentSection.key]) {
                assistantData[contentSection.key] = {};
              }
              assistantData[contentSection.key].contentSection = contentSection;
            }
          });
        }
        
        // Process workflow_section array
        if (item.workflow_section && item.workflow_section.length > 0) {
          item.workflow_section.forEach(workflowSection => {
            if (workflowSection.key) {
              if (!assistantData[workflowSection.key]) {
                assistantData[workflowSection.key] = {};
              }
              assistantData[workflowSection.key].workflowSection = workflowSection;
            }
          });
        }
        
        // Process smartsupport_section array
        if (item.smartsupport_section && item.smartsupport_section.length > 0) {
          item.smartsupport_section.forEach(smartSupportSection => {
            if (smartSupportSection.key) {
              if (!assistantData[smartSupportSection.key]) {
                assistantData[smartSupportSection.key] = {};
              }
              assistantData[smartSupportSection.key].smartSupportSection = smartSupportSection;
            }
          });
        }

        // Process faq_section array
        if (item.faq_section && item.faq_section.length > 0) {
          item.faq_section.forEach(faqSection => {
            if (faqSection.key) {
              if (!assistantData[faqSection.key]) {
                assistantData[faqSection.key] = {};
              }
              assistantData[faqSection.key].faqSection = {
                title: faqSection.title,
                subtitle: faqSection.subtitle,
                faqs: faqSection.faqs || []
              };
            }
          });
        }
      });
      console.log('Strapi: Final assistant data:', assistantData);
      return assistantData;
    }
    
    console.log('Strapi: No data found, returning empty object');
    return {};
    
  } catch (error) {
    console.error('Strapi: Error fetching assistant page data:', error);
    return {};
  }
};

// Fetch media page data with hero sections and scroll sections
export const fetchMediaPageData = async () => {
  try {
    console.log('Strapi: Starting API call to fetch media page data...');
    const response = await fetch(
      `${STRAPI_URL}/api/media-pages?populate[hero_section][populate]=*&populate[scroll_section][populate][cards][populate]=*&populate[creation_section][populate][cards][populate]=*&populate[toolkit_section][populate][tabs][populate]=*&populate[faq_section][populate][faqs][populate]=*&populate[download_section][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Strapi: Media page API response received:', data);
    
    if (data.data && data.data.length > 0) {
      // Create a map of key to sections data for easy lookup
      const mediaData = {};
      data.data.forEach(item => {
        console.log('Strapi: Processing media page item:', item);
        
        // Process hero_section array
        if (item.hero_section && item.hero_section.length > 0) {
          item.hero_section.forEach(heroSection => {
            if (heroSection.key) {
              if (!mediaData[heroSection.key]) {
                mediaData[heroSection.key] = {};
              }
              mediaData[heroSection.key].hero = {
                title: heroSection.title,
                subtitle: heroSection.subtitle,
                placeholderPrompt: heroSection.placeholderPrompt,
                ctaLabel: heroSection.ctaLabel,
                mainImage: heroSection.mainImage,
                leftImage: heroSection.leftImage,
                rightImage: heroSection.rightImage
              };
            }
          });
        }
        
        // Process scroll_section array
        if (item.scroll_section && item.scroll_section.length > 0) {
          item.scroll_section.forEach(scrollSection => {
            if (scrollSection.key) {
              if (!mediaData[scrollSection.key]) {
                mediaData[scrollSection.key] = {};
              }
              mediaData[scrollSection.key].scroll = {
                title: scrollSection.title,
                cards: scrollSection.cards || []
              };
            }
          });
        }
        
        // Process creation_section array
        if (item.creation_section && item.creation_section.length > 0) {
          item.creation_section.forEach(creationSection => {
            if (creationSection.key) {
              if (!mediaData[creationSection.key]) {
                mediaData[creationSection.key] = {};
              }
              mediaData[creationSection.key].creation = {
                titlePre: creationSection.title_pre,
                titleHighlight: creationSection.title_highlight,
                titlePost: creationSection.title_post,
                subtitle: creationSection.subtitle,
                cards: creationSection.cards || [],
                ctaLabel: creationSection.cta_label,
                ctaSecondaryLabel: creationSection.cta_secondary_label,
                statsImage: creationSection.stats_image,
                statsHeading: creationSection.stats_heading,
                statsParagraph: creationSection.stats_paragraph
              };
            }
          });
        }

        // Process toolkit_section array
        if (item.toolkit_section && item.toolkit_section.length > 0) {
          item.toolkit_section.forEach(toolkitSection => {
            if (toolkitSection.key) {
              if (!mediaData[toolkitSection.key]) {
                mediaData[toolkitSection.key] = {};
              }
              mediaData[toolkitSection.key].toolkit = {
                heading: toolkitSection.heading,
                tabs: toolkitSection.tabs || []
              };
            }
          });
        }

        // Process faq_section array
        if (item.faq_section && item.faq_section.length > 0) {
          item.faq_section.forEach(faqSection => {
            if (faqSection.key) {
              if (!mediaData[faqSection.key]) {
                mediaData[faqSection.key] = {};
              }
              mediaData[faqSection.key].faq = {
                title: faqSection.title,
                subtitle: faqSection.subtitle,
                faqs: faqSection.faqs || []
              };
            }
          });
        }

        // Process download_section array
        if (item.download_section && item.download_section.length > 0) {
          item.download_section.forEach(downloadSection => {
            if (downloadSection.key) {
              if (!mediaData[downloadSection.key]) {
                mediaData[downloadSection.key] = {};
              }
              mediaData[downloadSection.key].download = {
                title: downloadSection.title,
                subtitle: downloadSection.subtitle,
                ctaLabel: downloadSection.cta_label,
                ctaLink: downloadSection.cta_link,
                backgroundImage: downloadSection.background_image,
                arrowImage: downloadSection.arrow_image,
                heroImage: downloadSection.hero_image
              };
            }
          });
        }
      });
      console.log('Strapi: Final media data:', mediaData);
      return mediaData;
    }
    
    console.log('Strapi: No media data found, returning empty object');
    return {};
    
  } catch (error) {
    console.error('Strapi: Error fetching media page data:', error);
    return {};
  }
};

// Fetch FAQ data from Global collection
export const fetchFAQData = async (pageKey) => {
  try {
    console.log('Strapi: Starting API call to fetch FAQ data for page:', pageKey);
    const response = await fetch(
      `${STRAPI_URL}/api/global?populate[faq_section][populate][faqs][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Strapi: FAQ API response received:', data);
    
    // Find FAQ section that matches the pageKey
    if (data.data?.faq_section && data.data.faq_section.length > 0) {
      const matchingFAQ = data.data.faq_section.find(faq => faq.key === pageKey);
      if (matchingFAQ) {
        return {
          title: matchingFAQ.title,
          subtitle: matchingFAQ.subtitle,
          faqs: matchingFAQ.faqs || []
        };
      }
    }
    
    console.log('Strapi: No FAQ data found for key:', pageKey);
    return null;
    
  } catch (error) {
    console.error('Strapi: Error fetching FAQ data:', error);
    return null;
  }
};
