# Strapi Integration Documentation

## Overview
This documentation covers the integration of landing page components with Strapi CMS for dynamic content management.

## Components Made Dynamic

### 1. Carousel Component ✅
- **Location**: `src/components/landing/Carousel/Carousel.jsx`
- **Strapi Field**: `carousel`
- **Data Structure**: Array of carousel items with image and text
- **Status**: Complete

### 2. StackingImages Component ✅
- **Location**: `src/components/landing/StackingImages/StackingImages.jsx`
- **Strapi Field**: `stackingImages`
- **Data Structure**: Array of stacking image items with image and optional text
- **Status**: Complete

### 3. Work Component ✅
- **Location**: `src/components/landing/Work/Work.jsx`
- **Strapi Field**: `work`
- **Data Structure**: Object with title, description, and features array
- **Status**: Complete

### 4. Templates Component ✅
- **Location**: `src/components/landing/Templates/Templates.jsx`
- **Strapi Field**: `templates`
- **Data Structure**: Object with title, description, and templates array
- **Status**: Complete

### 5. Download Component ✅
- **Location**: `src/components/landing/Download/Download.jsx`
- **Strapi Field**: `download`
- **Data Structure**: Object with title, description, app store links, and preview image
- **Status**: Complete

### 6. CardsAnimation Component ✅
- **Location**: `src/components/landing/CardsAnimation/CardsAnimation.jsx`
- **Strapi Field**: `cards`
- **Data Structure**: Array of card objects with title, description, image, borderImage, and features (text field)
- **Status**: Complete

### 7. Pricing Component ✅
- **Location**: `src/components/landing/Pricing.jsx`
- **Strapi Field**: `pricing_plans`
- **Data Structure**: Array of PlanItem objects with plan, price, benefits array, buttonLabel, and link
- **Status**: Complete

### 8. Testimonials Component ✅
- **Location**: `src/components/landing/Testimonials.jsx`
- **Strapi Field**: `testimonial_section`
- **Data Structure**: Object with headingPre, headingMain, and testimonials array (TestimonialItem components)
- **Status**: Complete

## API Integration

### Strapi API Utility
- **File**: `src/utils/strapi.js`
- **Main Function**: `fetchLandingPageData()`
- **Helper Function**: `getStrapiImageUrl()`

### API Query Structure
```javascript
const populate = {
  carousel: { populate: "*" },
  stackingImages: { populate: "*" },
  work: { populate: { features: { populate: "*" } } },
  templates: { populate: { templates: { populate: "*" } } },
  download: { populate: "*" },
  cards: { populate: "*" },
  pricing_plans: { populate: { benefits: { populate: "*" } } },
  testimonial_section: { populate: { testimonials: { populate: "*" } } }
};
```

## Data Flow

1. **Page Load**: `src/app/page.js` calls `fetchLandingPageData()`
2. **API Call**: Strapi API returns structured data with populated relationships
3. **Component Props**: Each component receives its data as props
4. **Fallback System**: Components use default data if Strapi data is unavailable

## Fallback Data System

Each component includes comprehensive fallback data to ensure the site functions even without Strapi:
- Default content for all text fields
- Placeholder images from `/public` directory
- Sample data that matches the expected structure

## Image Handling

### Configuration
- **File**: `next.config.mjs`
- **Domain**: `localhost` added for Strapi image URLs

### Image URL Processing
- `getStrapiImageUrl()` function handles URL construction
- Supports both absolute and relative Strapi image paths
- Graceful fallback to default images

## Component Patterns

### Common Structure
1. **Props**: Accept data array/object from parent
2. **Default Data**: Fallback content as constants
3. **Data Processing**: Map Strapi data to expected format
4. **Rendering**: Use processed data with original animations/styling

### Animation Preservation
- All GSAP and Framer Motion animations maintained
- Component structure preserved for CSS compatibility
- Interactive features remain functional

## Sample Data Files

- `src/data/carousel-sample-data.md`
- `src/data/stacking-images-sample-data.md`
- `src/data/work-sample-data.md`
- `src/data/templates-sample-data.md`
- `src/data/download-sample-data.md`
- `src/data/cards-sample-data.md`
- `src/data/pricing-sample-data.md`
- `src/data/testimonials-sample-data.md`

## Testing Checklist

### Frontend Testing
- [ ] Components render with Strapi data
- [ ] Components render with fallback data
- [ ] Images load correctly from Strapi
- [ ] Animations work properly
- [ ] Responsive design maintained

### Backend Testing
- [ ] Strapi content types created
- [ ] Sample data entered
- [ ] API endpoints returning data
- [ ] Image uploads working
- [ ] Populate queries functioning

## Known Issues & Solutions

### Image Domain Configuration
**Issue**: Next.js blocks external images by default
**Solution**: Added localhost to `next.config.mjs` domains

### Complex Populate Queries
**Issue**: Nested components require deep population
**Solution**: Used object syntax for precise populate control

### Animation Dependencies
**Issue**: GSAP animations need stable data structure
**Solution**: Consistent data mapping with proper fallbacks

## Future Enhancements

1. **Error Handling**: Add try-catch blocks for API failures
2. **Loading States**: Implement skeleton screens during data fetch
3. **Caching**: Add data caching for better performance
4. **Preview Mode**: Strapi preview integration for content editing
5. **Localization**: Multi-language content support

## Maintenance Notes

- Update populate queries when adding new fields
- Maintain fallback data when changing component structure
- Test both Strapi and fallback modes after changes
- Keep sample data documentation updated

## Cards Component Data Structure

### Expected Strapi Data Format:
```javascript
cards: [
  {
    title: "AI Marketing Assistant",
    description: "Transform your marketing strategy...",
    image: { url: "/uploads/feature1.png" },
    borderImage: { url: "/uploads/border.svg" },
    features: "Campaign Optimization\nContent Generation\nAudience Analysis"
  }
  // ... more cards
]
```

### Features Field Format:
The features field is a simple text field where each feature should be on a new line. The component automatically splits this text by newlines to create the bulleted list.

## Pricing Component Data Structure

### Expected Strapi Data Format:
```javascript
pricing_plans: [
  {
    plan: "Basic",
    price: "$0 /mo",
    buttonLabel: "Get started for free",
    link: "/auth/sign-up",
    benefits: [
      { text: "Up to 500 characters per conversion" },
      { text: "Access to basic voices" },
      { text: "Limited to 5 conversions per month" }
    ]
  }
  // ... more plans
]
```

### Benefits Structure:
Each benefit is a Benefit component with a single text field. The component automatically processes these into a bulleted list with checkmark icons.

## Testimonials Component Data Structure

### Expected Strapi Data Format:
```javascript
testimonial_section: {
  headingPre: "What",
  headingMain: "Our Users Are Saying",
  testimonials: [
    {
      name: "Jerry Tang",
      role: "Recent graduate, Marketing at Sweatpals",
      quote: "Using Text-to-Voice has saved me countless hours...",
      avatar: { url: "/uploads/jerry_avatar.png" },
      layoutVariant: "variant-1"
    }
    // ... more testimonials
  ]
}
```

### Layout Variants:
- **variant-1**: Standard padding with max height 357px
- **variant-2**: Top padding with max height 337px  
- **variant-3**: Bottom padding with max height 337px

The component displays 9 boxes in a scrolling animation, cycling through available testimonials.
