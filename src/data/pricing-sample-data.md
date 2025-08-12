# Pricing Plans Sample Data for Strapi

## Component Structure
The Pricing component expects:
- pricingPlans: Array of PlanItem objects

## PlanItem Object Structure
Each plan should have:
- plan: String (e.g., "Basic", "Pro Plan", "Enterprise Plan")
- price: String (e.g., "$0 /mo", "$19.99 /mo", "Custom (Contact Us)")
- benefits: Array of Benefit components (each with text field)
- buttonLabel: String (CTA text, e.g., "Get started for free", "Upgrade to Pro")
- link: String (URL or internal path, e.g., "/auth/sign-up", "/pricing")

## Benefit Component Structure
Each benefit should have:
- text: String (e.g., "Up to 500 characters per conversion")

## Sample Data for Testing

### Plan 1: Basic (Free Tier)
- Plan: "Basic"
- Price: "$0 /mo"
- Button Label: "Get started for free"
- Link: "/auth/sign-up"
- Benefits:
  - "Up to 500 characters per conversion"
  - "Access to basic voices"
  - "Limited to 5 conversions per month"
  - "No API access"
  - "24/7 support for onboarding"

### Plan 2: Pro Plan (Highlighted)
- Plan: "Pro Plan"
- Price: "$19.99 /mo"
- Button Label: "Upgrade to Pro"
- Link: "/pricing"
- Benefits:
  - "Up to 50,000 characters per conversion"
  - "Access to premium voices (multiple accents)"
  - "Unlimited conversions"
  - "Priority customer support"
  - "API integration"
  - "24/7 support for onboarding"

### Plan 3: Enterprise (Custom Pricing)
- Plan: "Enterprise Plan"
- Price: "Custom (Contact Us)"
- Button Label: "Contact us"
- Link: "/contact-us"
- Benefits:
  - "Unlimited characters per conversion"
  - "Custom voice creation"
  - "Dedicated account manager"
  - "Advanced API access"
  - "SLA-backed performance guarantees"
  - "24/7 premium support"
  - "Priority customer support"

## Design Notes

### Highlighting Logic
- The component automatically applies special styling to plans with "Pro" in the name
- Pro plans get a gradient background and highlighted appearance
- This is handled automatically in the component code

### Price Field Flexibility
- Price can be any string, allowing for creative pricing like "Custom (Contact Us)"
- Recommended formats: "$X /mo", "$X /year", "Free", "Custom (Contact Us)"

### Link Field Options
- Internal paths: "/auth/sign-up", "/pricing", "/contact-us"
- External URLs: "https://example.com"
- Anchor links: "#pricing"

## Expected Benefits Format
Each benefit should be entered as a separate Benefit component in Strapi:
1. Create Benefit component with text: "Up to 500 characters per conversion"
2. Create Benefit component with text: "Access to basic voices"
3. And so on...

## Responsive Behavior
- Mobile: Cards stack vertically
- Desktop: Cards display in a horizontal row
- All animations and hover effects are preserved

## Fallback System
- Component includes complete default pricing data
- Gracefully handles missing Strapi data
- Maintains all visual styling and animations
