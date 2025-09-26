import React from 'react';
import { getStrapiImageUrl } from '@/utils/strapi';
import { getWordCount, extractTextFromRichText } from '@/utils/richText';

const BlogStructuredData = ({ blog, siteUrl = 'https://dzignhub.com' }) => {
  if (!blog) return null;

  // Calculate word count from introduction and conclusion
  const calculateWordCount = () => {
    const introText = extractTextFromRichText(blog.introduction);
    const textBody = extractTextFromRichText(blog.text);
    const conclusionText = extractTextFromRichText(blog.conclusion);
    const fullText = `${introText} ${textBody} ${conclusionText}`.trim();
    return getWordCount(fullText);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.metaDescription || blog.description,
    "image": blog.cover ? getStrapiImageUrl(blog.cover) : null,
    "author": {
      "@type": "Person",
      "name": blog.author || "DzignHub Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DzignHub",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": blog.publishDate,
    "dateModified": blog.publishDate, // Could be separate field in Strapi
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${blog.slug}`
    },
    "articleSection": blog.categories,
    "keywords": blog.categories,
    "wordCount": calculateWordCount()
  };

  // Remove undefined values
  Object.keys(structuredData).forEach(key => {
    if (structuredData[key] === undefined || structuredData[key] === null) {
      delete structuredData[key];
    }
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default BlogStructuredData;