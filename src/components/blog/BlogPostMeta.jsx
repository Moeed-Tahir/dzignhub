import React from "react";

const BlogPostMeta = ({ 
  author, 
  publishDate, 
  categories, 
  hint, 
  readingTime 
}) => {
  // Format date for display
  const formattedDate = publishDate 
    ? new Date(publishDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : '';

  // Calculate reading time if not provided
  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-b border-gray-200">
      {author && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">By</span>
          <span className="text-sm font-medium text-gray-900">{author}</span>
        </div>
      )}
      
      {formattedDate && (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>
      )}
      
      {readingTime && (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600">{readingTime} min read</span>
        </div>
      )}
      
      {categories && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {categories}
          </span>
        </div>
      )}
      
      {hint && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {hint}
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogPostMeta;