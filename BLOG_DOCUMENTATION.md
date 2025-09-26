# DzignHub Blog System - Strapi Integration

## Overview

The blog system has been updated to work dynamically with Strapi CMS. The new structure supports a rich content management experience with auto-generated slugs and comprehensive SEO features.

## Strapi Content Structure

### BlogPage Collection

The blog system uses a `BlogPage` collection with the following structure:

```
BlogPage Collection:
├── posts (Non-repeatable Component)
    ├── heroTitle (Text)
    ├── heroSubtitle (Text)
    └── posts (Repeatable Component)
        ├── title (Text)
        ├── slug (Text) - Auto-generated as article-1, article-2, etc.
        ├── description (Text)
        ├── cover (Media)
        ├── author (Text)
        ├── publishDate (Date)
        ├── hint (Text)
        ├── categories (Enumeration)
        ├── introduction (Rich Text Block)
        ├── quotes (Repeatable Component)
        │   └── text (Text)
        ├── media (Multiple Media)
        ├── conclusion (Rich Text Block)
        ├── metaTitle (Text)
        └── metaDescription (Text)
```

## Auto-Generated Slugs

The system automatically generates slugs in the format `article-1`, `article-2`, etc. The slug generation:

1. Fetches existing posts from Strapi
2. Finds the highest article number
3. Increments by 1 for the new slug

### API Endpoint for Slug Generation

```
GET /api/blog/generate-slug
```

Returns:
```json
{
  "success": true,
  "slug": "article-5"
}
```

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.jsx                    # Main blog listing page
│   │   ├── [slug]/
│   │   │   └── page.jsx                # Dynamic blog post page
│   └── api/
│       └── blog/
│           ├── route.js                # Blog API endpoints
│           └── generate-slug/
│               └── route.js            # Slug generation endpoint
├── components/
│   └── blog/
│       ├── Card.jsx                    # Blog post card component
│       ├── BlogPostMeta.jsx            # Post metadata display
│       └── BlogStructuredData.jsx      # SEO structured data
└── utils/
    └── strapi.js                       # Strapi utility functions
```

## Key Features

### 1. Dynamic Content Loading
- Fetches content from Strapi CMS
- Fallback data when Strapi is unavailable
- Error handling and graceful degradation

### 2. SEO Optimization
- Dynamic meta titles and descriptions
- Open Graph tags
- Structured data (JSON-LD)
- Article schema markup

### 3. Rich Content Support
- Rich text content with proper HTML rendering
- Multiple media attachments
- Quote blocks
- Author and category information

### 4. Responsive Design
- Mobile-first approach
- Smooth animations with Framer Motion
- Optimized images with proper loading

## Usage

### Creating New Blog Posts in Strapi

1. Go to your Strapi admin panel
2. Navigate to BlogPage collection
3. Edit the existing BlogPage entry
4. In the `posts` component:
   - Set `heroTitle` and `heroSubtitle` for the blog page
   - Add new posts to the `posts` repeatable component
5. For each post:
   - Add title, description, and content
   - Upload cover image
   - Set author, publish date, and categories
   - Use auto-generated slug (article-1, article-2, etc.)
   - Add rich text content in introduction and conclusion
   - Add quotes and media as needed

### API Endpoints

#### Get All Blog Posts
```
GET /api/blog
```

Optional parameters:
- `page`: Page number for pagination
- `limit`: Number of posts per page

#### Get Single Blog Post
```
GET /api/blog?slug=article-1
```

### Components Usage

#### BlogPostMeta Component
```jsx
<BlogPostMeta
  author="John Doe"
  publishDate="2025-01-01"
  categories="technology"
  hint="Featured"
  readingTime={5}
/>
```

#### BlogStructuredData Component
```jsx
<BlogStructuredData 
  blog={blogPost} 
  siteUrl="https://dzignhub.com" 
/>
```

## Development Notes

### Environment Variables
Make sure to set your Strapi URL in your environment:
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
```

### Image Handling
The system automatically handles Strapi image URLs using the `getStrapiImageUrl` utility function.

### Error Handling
The system includes comprehensive error handling:
- Network failures fall back to static content
- Missing posts show 404 pages
- Invalid slugs are handled gracefully

## Content Guidelines

### Slug Format
- Auto-generated as `article-1`, `article-2`, etc.
- Sequential numbering based on existing posts
- Can be customized if needed

### Image Sizes
- Cover images: Recommended 1200x630px
- Media attachments: Optimize for web (WebP preferred)
- Alt text should be descriptive

### Content Structure
- Keep introduction concise (150-200 words)
- Use quotes for impactful statements
- Conclusion should summarize key points
- Categories should be consistent

## Future Enhancements

Potential improvements that could be added:
- Tag system in addition to categories
- Related posts suggestions
- Comment system integration
- Search functionality
- RSS feed generation
- Social sharing buttons
- Reading progress indicator

## Troubleshooting

### Common Issues

1. **Posts not loading**: Check Strapi URL and API connectivity
2. **Images not displaying**: Verify Strapi media settings and CORS
3. **Slug conflicts**: Use the auto-generation API to ensure uniqueness
4. **SEO tags missing**: Ensure metaTitle and metaDescription are set in Strapi

### Debug Mode
Set `NODE_ENV=development` to see detailed console logs for Strapi API calls.