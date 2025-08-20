// utils/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const fetchLandingPageData = async () => {
  try {
    // Fetch with populate to get nested components and media
    const response = await fetch(
      `${STRAPI_URL}/api/landing-pages?populate[hero_section][populate]=*&populate[carousal_images][populate]=*&populate[stack][populate][card][populate]=*&populate[work_card][populate]=*&populate[templates][populate]=*&populate[download_section][populate]=*&populate[cards][populate]=*&populate[pricing_plans][populate][benefits][populate]=*&populate[testimonial_section][populate][testimonial][populate]=*&populate[assistant_section][populate][assistants][populate]=*&populate[faq_section][populate][faqs][populate]=*`
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
        heroSection: landingPage.hero_section || null,
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
      heroSection: null,
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
      heroSection: null,
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

// Fetch login page data
export const fetchLoginPageData = async () => {
  try {
    const apiUrl = `${STRAPI_URL}/api/login-pages?populate[side][populate]=*&populate=googleIcon&populate=appleIcon`;
    
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    if (apiData.data && apiData.data.length > 0) {
      const loginPage = apiData.data[0];
      
      // Handle side as array (Strapi returns it as array)
      const sideData = loginPage.side && Array.isArray(loginPage.side) && loginPage.side.length > 0 
        ? loginPage.side[0] 
        : loginPage.side;
      
      return {
        heading: loginPage.heading || "Welcome back!",
        subheading: loginPage.subheading || "Sign in to your allmyai account to access all allmyai products.",
        emailLabel: loginPage.emailLabel || "Email Address",
        passwordLabel: loginPage.passwordLabel || "Password",
        rememberMeLabel: loginPage.rememberMeLabel || "Remember me",
        forgotPasswordText: loginPage.forgotPasswordText || "Forgot password?",
        loginButtonText: loginPage.loginButtonText || "Login",
        orText: loginPage.orText || "or",
        googleButtonText: loginPage.googleButtonText || "Google",
        googleIcon: loginPage.googleIcon,
        appleButtonText: loginPage.appleButtonText || "Apple",
        appleIcon: loginPage.appleIcon,
        signupText: loginPage.signupText || "Don't have an account? Create",
        side: sideData ? {
          brandTitle: sideData.brandTitle || "allmyai",
          brandIcon: sideData.brandIcon || null,
          slides: sideData.slides || [
            {
              title: "Your Ultimate advance AI assistance",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Powerful NLP Features",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Seamless Collaboration",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Always Learning, Always Improving",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            }
          ],
          backgroundImage: sideData.backgroundImage || null
        } : {
          brandTitle: "allmyai",
          brandIcon: null,
          slides: [
            {
              title: "Your Ultimate advance AI assistance",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Powerful NLP Features",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Seamless Collaboration",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            },
            {
              title: "Always Learning, Always Improving",
              description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
            }
          ],
          backgroundImage: null
        }
      };
    }
    
    // Return fallback data if no data from Strapi
    return {
      heading: "Welcome back!",
      subheading: "Sign in to your allmyai account to access all allmyai products.",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      rememberMeLabel: "Remember me",
      forgotPasswordText: "Forgot password?",
      loginButtonText: "Login",
      orText: "or",
      googleButtonText: "Google",
      googleIcon: null,
      appleButtonText: "Apple",
      appleIcon: null,
      signupText: "Don't have an account? Create",
      side: {
        brandTitle: "allmyai",
        brandIcon: null,
        slides: [
          {
            title: "Your Ultimate advance AI assistance",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Powerful NLP Features", 
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Seamless Collaboration",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Always Learning, Always Improving",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          }
        ],
        backgroundImage: null
      }
    };
    
  } catch (error) {
    console.error('Error fetching login page data:', error);
    
    // Return fallback data in case of error
    return {
      heading: "Welcome back!",
      subheading: "Sign in to your allmyai account to access all allmyai products.",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      rememberMeLabel: "Remember me",
      forgotPasswordText: "Forgot password?",
      loginButtonText: "Login",
      orText: "or",
      googleButtonText: "Google",
      googleIcon: null,
      appleButtonText: "Apple",
      appleIcon: null,
      signupText: "Don't have an account? Create",
      side: {
        brandTitle: "allmyai",
        brandIcon: null,
        slides: [
          {
            title: "Your Ultimate advance AI assistance",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Powerful NLP Features",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Seamless Collaboration", 
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          },
          {
            title: "Always Learning, Always Improving",
            description: "allmyai dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
          }
        ],
        backgroundImage: null
      }
    };
  }
};

export const fetchPricingPageData = async () => {
  try {
    const apiUrl = `${STRAPI_URL}/api/pricing-pages?populate[hero_section][populate]=*&populate[plan_section][populate]=*&populate[plans][populate][plan_header][populate]=*&populate[plans][populate][plan_sections][populate][features][populate]=*&populate[testimonials_section][populate][testimonial][populate]=*&populate[faq_section][populate][faqs][populate]=*`;
    
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    if (apiData.data && apiData.data.length > 0) {
      const pricingPage = apiData.data[0];
      
      // Handle hero_section as array or object
      const heroData = pricingPage.hero_section && Array.isArray(pricingPage.hero_section) && pricingPage.hero_section.length > 0 
        ? pricingPage.hero_section[0] 
        : pricingPage.hero_section;
      
      // Handle plan_section as array or object
      const planData = pricingPage.plan_section && Array.isArray(pricingPage.plan_section) 
        ? pricingPage.plan_section 
        : (pricingPage.plan_section ? [pricingPage.plan_section] : []);
      
      // Handle plans data
      const plansData = pricingPage.plans || null;
      
      // Handle testimonials_section as array or object
      const testimonialsData = pricingPage.testimonials_section && Array.isArray(pricingPage.testimonials_section) && pricingPage.testimonials_section.length > 0 
        ? pricingPage.testimonials_section[0] 
        : pricingPage.testimonials_section;
      
      // Handle faq_section as array or object
      const faqData = pricingPage.faq_section && Array.isArray(pricingPage.faq_section) && pricingPage.faq_section.length > 0 
        ? pricingPage.faq_section[0] 
        : pricingPage.faq_section;
      
      return {
        heroSection: heroData ? {
          title: heroData.title || "Pricing",
          subtitle: heroData.subtitle || "Subscriptions"
        } : {
          title: "Pricing",
          subtitle: "Subscriptions"
        },
        planSection: planData.map(plan => ({
          plan: plan.plan || "Plan",
          price: plan.price || "$0 /mo",
          benefits: plan.benefits || [],
          buttonLabel: plan.buttonLabel || "Get Started",
          link: plan.link || "#"
        })),
        plansData: plansData ? {
          title: plansData.title || "Compare plans",
          planHeaders: plansData.plan_header || [],
          planSections: plansData.plan_sections || []
        } : null,
        testimonialsSection: testimonialsData ? {
          headingPre: testimonialsData.headingPre || "What",
          headingMain: testimonialsData.headingMain || "Our Users Are Saying",
          testimonial: testimonialsData.testimonial || []
        } : null,
        faqSection: faqData ? {
          key: faqData.key || "pricing",
          title: faqData.title || "Have questions?",
          subtitle: faqData.subtitle || "Have questions about how our pricing works? Find the answers to the most common inquiries below.",
          faqs: faqData.faqs || []
        } : null
      };
    }
    
    // Return fallback data if no data from Strapi
    return {
      heroSection: {
        title: "Pricing",
        subtitle: "Subscriptions"
      },
      planSection: [],
      plansData: null,
      testimonialsSection: null,
      faqSection: null
    };
    
  } catch (error) {
    console.error('Error fetching pricing page data:', error);
    
    // Return fallback data in case of error
    return {
      heroSection: {
        title: "Pricing",
        subtitle: "Subscriptions"
      },
      planSection: [],
      plansData: null,
      testimonialsSection: null,
      faqSection: null
    };
  }
};

// Fetch footer data
export const fetchFooterData = async () => {
  try {
    const apiUrl = `${STRAPI_URL}/api/footers?populate[socialLinks][populate]=*&populate[footerSections][populate][links][populate]=*&populate[navigationItems][populate]=*&populate=logo`;
    
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    if (apiData.data && apiData.data.length > 0) {
      const footer = apiData.data[0];
      
      return {
        logo: footer.logo ? getStrapiImageUrl(footer.logo) : "/common/footer/logo-with-name.svg",
        logoAlt: footer.logoAlt || "Company Logo",
        socialLinks: footer.socialLinks ? footer.socialLinks.map(social => ({
          platform: social.platform || "Social",
          icon: social.icon ? getStrapiImageUrl(social.icon) : "/common/footer/facebook.svg",
          url: social.url || "#",
          alt: social.alt || social.platform || "Social"
        })) : [],
        footerSections: footer.footerSections ? footer.footerSections.map(section => ({
          title: section.title || "Section",
          links: section.links ? section.links.map(link => ({
            label: link.label || "Link",
            href: link.href || "#"
          })) : []
        })) : [],
        navigationItems: footer.navigationItems ? footer.navigationItems.map(nav => ({
          label: nav.label || "Nav",
          href: nav.href || "#"
        })) : [],
        copyrightText: footer.copyrightText || "© 2025 Copyright by",
        companyName: footer.companyName || "Aiyaiya"
      };
    }
    
    // Return fallback data if no data from Strapi
    return null;
    
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};

// Fetch signup page data
export const fetchSignupPageData = async () => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/signup-pages?populate[submitButton][populate]=*&populate[LoginLink][populate]=*&populate[email_field][populate]=*&populate[mobile_field][populate]=*&populate[password_field][populate]=*&populate[confirmpassword_field][populate]=*`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Signup page data structure:', JSON.stringify(data, null, 2));
    
    // Check if data exists and has at least one item (since it's a collection)
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.log('No signup page data found, using fallback');
      return getSignupPageFallbackData();
    }
    
    const signupPage = data.data[0];
    
    // Transform the data to match the expected structure
    return {
      pageTitle: signupPage.pageTitle || "Let's Create Your Account",
      pageDescription: signupPage.pageDescription || "Get started with allmyai and start using our AI assistance",
      submitButton: signupPage.submitButton ? {
        text: signupPage.submitButton.text || "Create Account",
        loadingText: signupPage.submitButton.loadingText || "Creating..."
      } : {
        text: "Create Account",
        loadingText: "Creating..."
      },
      termsText: signupPage.termsText || "By clicking the Create Account button, you acknowledge that you have read and agree to our Terms of Use and Privacy Policy.",
      loginLink: signupPage.LoginLink ? {
        preText: signupPage.LoginLink.preText || "Already have an account?",
        linkText: signupPage.LoginLink.linkText || "Login",
        url: signupPage.LoginLink.url || "/auth/login"
      } : {
        preText: "Already have an account?",
        linkText: "Login", 
        url: "/auth/login"
      },
      emailField: signupPage.email_field ? {
        label: signupPage.email_field.label || "Email Address",
        placeholder: signupPage.email_field.placeholder || "",
        type: signupPage.email_field.type || "email",
        required: signupPage.email_field.required !== undefined ? signupPage.email_field.required : true
      } : {
        label: "Email Address",
        placeholder: "",
        type: "email",
        required: true
      },
      mobileField: signupPage.mobile_field ? {
        label: signupPage.mobile_field.label || "Mobile Phone",
        placeholder: signupPage.mobile_field.placeholder || "Enter your mobile phone",
        type: signupPage.mobile_field.type || "text",
        required: signupPage.mobile_field.required !== undefined ? signupPage.mobile_field.required : true
      } : {
        label: "Mobile Phone",
        placeholder: "Enter your mobile phone",
        type: "text",
        required: true
      },
      passwordField: signupPage.password_field ? {
        label: signupPage.password_field.label || "Password",
        placeholder: signupPage.password_field.placeholder || "",
        type: signupPage.password_field.type || "password",
        required: signupPage.password_field.required !== undefined ? signupPage.password_field.required : true
      } : {
        label: "Password",
        placeholder: "",
        type: "password",
        required: true
      },
      confirmPasswordField: signupPage.confirmpassword_field ? {
        label: signupPage.confirmpassword_field.label || "Confirm Password",
        placeholder: signupPage.confirmpassword_field.placeholder || "",
        type: signupPage.confirmpassword_field.type || "password",
        required: signupPage.confirmpassword_field.required !== undefined ? signupPage.confirmpassword_field.required : true
      } : {
        label: "Confirm Password",
        placeholder: "",
        type: "password",
        required: true
      }
    };
  } catch (error) {
    console.error('Error fetching signup page data:', error);
    return getSignupPageFallbackData();
  }
};

// Fallback data for signup page
const getSignupPageFallbackData = () => {
  return {
    pageTitle: "Let's Create Your Account",
    pageDescription: "Get started with allmyai and start using our AI assistance",
    submitButton: {
      text: "Create Account",
      loadingText: "Creating..."
    },
    termsText: "By clicking the Create Account button, you acknowledge that you have read and agree to our Terms of Use and Privacy Policy.",
    loginLink: {
      preText: "Already have an account?",
      linkText: "Login",
      url: "/auth/login"
    },
    emailField: {
      label: "Email Address",
      placeholder: "",
      type: "email",
      required: true
    },
    mobileField: {
      label: "Mobile Phone",
      placeholder: "Enter your mobile phone",
      type: "text",
      required: true
    },
    passwordField: {
      label: "Password",
      placeholder: "",
      type: "password",
      required: true
    },
    confirmPasswordField: {
      label: "Confirm Password",
      placeholder: "",
      type: "password",
      required: true
    }
  };
};
