# CardsAnimation Sample Data for Strapi

## Component Structure
The CardsAnimation component expects:
- cards: Array of card objects

## Card Object Structure
Each card should have:
- title: String (e.g., "AI Marketing Assistant")
- description: Rich text/String (HTML formatted)
- image: Media (Image file)
- borderImage: Media (Image file, optional - defaults to /Border.svg)
- features: Text field (each feature on a new line)

## Features Field Format
The features field should be a simple text field where each feature is on a new line:
```
Campaign Optimization
Content Generation
Audience Analysis
```

## Sample Data for Testing

### Card 1: AI Marketing Assistant
- Title: "AI Marketing Assistant"
- Description: "Transform your marketing strategy with AI-powered insights and automated content creation that drives engagement and conversions."
- Image: Upload feature image 1
- Border Image: Upload border.svg or leave empty for default
- Features: 
```
Campaign Optimization
Content Generation
Audience Analysis
```

### Card 2: SEO Intelligence
- Title: "SEO Intelligence"
- Description: "Boost your search rankings with intelligent SEO recommendations and real-time optimization strategies."
- Image: Upload feature image 2
- Border Image: Upload border.svg or leave empty for default
- Features:
```
Keyword Research
Content Optimization
Rank Tracking
```

### Card 3: UI/UX Design Tool
- Title: "UI/UX Design Tool"
- Description: "Create stunning user interfaces with AI-driven design suggestions and user experience optimization."
- Image: Upload feature image 3
- Border Image: Upload border.svg or leave empty for default
- Features:
```
Design Systems
User Testing
Prototyping
```

### Card 4: Image Generation
- Title: "Image Generation"
- Description: "Generate professional-quality images and graphics with advanced AI models tailored to your brand."
- Image: Upload feature image 4
- Border Image: Upload border.svg or leave empty for default
- Features:
```
Custom Styles
Brand Consistency
High Resolution
```

## Expected Images Needed
- 4 feature images (landscape/square format)
- Border.svg icon (optional - component has fallback)

## Notes
- Features are displayed as a bulleted list
- Description supports HTML formatting
- All animations and styling are preserved from original component
- Component gracefully handles missing Strapi data with fallbacks
