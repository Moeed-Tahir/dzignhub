# Testimonials Section Sample Data for Strapi

## Component Structure
The Testimonials component expects:
- testimonial_section: Object with headingPre, headingMain, and testimonials array

## Testimonial Section Object Structure
The testimonial section should have:
- headingPre: String (e.g., "What")
- headingMain: String (e.g., "Our Users Are Saying")
- testimonials: Array of TestimonialItem objects

## TestimonialItem Object Structure
Each testimonial should have:
- name: String (e.g., "Jerry Tang")
- role: String (e.g., "Recent graduate, Marketing at Sweatpals")
- quote: Rich Text (testimonial body - supports HTML formatting)
- avatar: Media (single image file)
- layoutVariant: Enumeration (variant-1, variant-2, variant-3)

## Layout Variants
- **variant-1**: Standard padding (pt-[20px]) with max height 357px
- **variant-2**: Top padding (pt-[60px]) with max height 337px  
- **variant-3**: Bottom padding (pb-[60px]) with max height 337px

## Sample Data for Testing

### Testimonial Section
- Heading Pre: "What"
- Heading Main: "Our Users Are Saying"

### Testimonial 1
- Name: "Jerry Tang"
- Role: "Recent graduate, Marketing at Sweatpals"
- Quote: "Using Text-to-Voice has saved me countless hours. The multilingual support allows me to reach students around the world with high-quality audio narrations."
- Avatar: Upload user avatar image
- Layout Variant: variant-1

### Testimonial 2
- Name: "Sarah Johnson"
- Role: "Content Creator, Digital Marketing"
- Quote: "The quality of voice generation is incredible. It's revolutionized how I create content for my clients across different industries."
- Avatar: Upload user avatar image
- Layout Variant: variant-2

### Testimonial 3
- Name: "Mike Chen"
- Role: "Product Manager, Tech Startup"
- Quote: "Our team productivity has increased dramatically since implementing this solution. The API integration was seamless and the results are outstanding."
- Avatar: Upload user avatar image
- Layout Variant: variant-3

### Testimonial 4
- Name: "Emily Rodriguez"
- Role: "Educational Content Producer"
- Quote: "Perfect for creating accessible learning materials. The voice quality is so natural that students can't tell it's AI-generated."
- Avatar: Upload user avatar image
- Layout Variant: variant-1

### Testimonial 5
- Name: "David Park"
- Role: "Podcast Host & Audio Producer"
- Quote: "Game-changer for our podcast production workflow. We can now create multi-language versions of our content effortlessly."
- Avatar: Upload user avatar image
- Layout Variant: variant-2

## Design Notes

### Scrolling Animation
- The component displays 9 testimonial boxes in a horizontal scrolling animation
- If you have fewer than 9 testimonials, they will repeat cyclically to fill all boxes
- Each box uses the layoutVariant from its testimonial to determine styling

### Quote Field (Rich Text)
- Supports HTML formatting for emphasis, line breaks, etc.
- Will be rendered using dangerouslySetInnerHTML
- Keep quotes concise for better visual appearance

### Avatar Images
- Recommended size: Square format (1:1 aspect ratio)
- Images will be displayed as 56x56px rounded circles
- Alt text comes from the Media record in Strapi

### Responsive Behavior
- Desktop: Shows full heading layout with gradient fades
- Mobile: Compact heading layout
- Scrolling animation works on both screen sizes

## Fallback System
- Component includes complete default testimonial data
- Uses 3 default testimonials with different layout variants
- Gracefully handles missing Strapi data
- Maintains all animations and visual effects

## Expected Avatar Images
Upload square profile images for each testimonial. The component will automatically:
- Resize to 56x56 pixels
- Apply rounded borders
- Add hover animations (scale and slight rotation)
