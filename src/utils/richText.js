/**
 * Utility functions for handling Strapi rich text content
 */

/**
 * Extract plain text from Strapi rich text content
 * @param {*} content - Strapi rich text content (array of blocks or string)
 * @returns {string} - Plain text string
 */
export const extractTextFromRichText = (content) => {
  if (!content) return '';
  
  // If it's already a string, return it
  if (typeof content === 'string') return content;
  
  // If it's Strapi rich text format (array of blocks)
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph') {
        return block.children.map(child => child.text || '').join('');
      } else if (block.type === 'heading') {
        return block.children.map(child => child.text || '').join('');
      } else if (block.type === 'list') {
        return block.children.map(item => 
          item.children.map(child => child.text || '').join('')
        ).join(' ');
      }
      return '';
    }).join(' ');
  }
  
  return String(content);
};

/**
 * Render Strapi rich text content as HTML
 * @param {*} content - Strapi rich text content (array of blocks or string)
 * @returns {string} - HTML string
 */
export const renderRichTextAsHTML = (content) => {
  if (!content) return '';
  
  // If it's already a string, return it
  if (typeof content === 'string') return content;
  
  // If it's Strapi rich text format (array of blocks)
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph') {
        return `<p>${block.children.map(child => {
          let text = child.text || '';
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.underline) text = `<u>${text}</u>`;
          if (child.strikethrough) text = `<s>${text}</s>`;
          if (child.code) text = `<code>${text}</code>`;
          return text;
        }).join('')}</p>`;
      } else if (block.type === 'heading') {
        const level = Math.min(Math.max(block.level || 2, 1), 6); // Ensure level is between 1-6
        return `<h${level}>${block.children.map(child => child.text || '').join('')}</h${level}>`;
      } else if (block.type === 'list') {
        const listItems = block.children.map(item => 
          `<li>${item.children.map(child => child.text || '').join('')}</li>`
        ).join('');
        return block.format === 'ordered' ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
      } else if (block.type === 'quote') {
        return `<blockquote>${block.children.map(child => child.text || '').join('')}</blockquote>`;
      } else if (block.type === 'code') {
        return `<pre><code>${block.children.map(child => child.text || '').join('')}</code></pre>`;
      }
      return '';
    }).join('');
  }
  
  return String(content);
};

/**
 * Calculate reading time for text content
 * @param {*} content - Text content or rich text content
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} - Estimated reading time in minutes
 */
export const calculateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return 0;
  
  const text = extractTextFromRichText(content);
  const words = text.split(' ').filter(word => word.length > 0).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Get word count from text content
 * @param {*} content - Text content or rich text content
 * @returns {number} - Number of words
 */
export const getWordCount = (content) => {
  if (!content) return 0;
  
  const text = extractTextFromRichText(content);
  return text.split(' ').filter(word => word.length > 0).length;
};

/**
 * Get excerpt from rich text content
 * @param {*} content - Rich text content
 * @param {number} maxLength - Maximum length of excerpt (default: 160)
 * @returns {string} - Excerpt string
 */
export const getExcerpt = (content, maxLength = 160) => {
  const text = extractTextFromRichText(content);
  if (text.length <= maxLength) return text;
  
  // Find the last space before maxLength to avoid cutting words
  const lastSpace = text.lastIndexOf(' ', maxLength);
  const cutPoint = lastSpace > 0 ? lastSpace : maxLength;
  
  return text.substring(0, cutPoint) + '...';
};