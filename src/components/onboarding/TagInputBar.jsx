// TagInputBar.jsx
import React, { useState } from 'react';

const TagInputBar = ({ onTagsChange, maxTags = 3 }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    if (tags.includes(trimmedTag)) {
      setError("Same word can't be added");
      return;
    }
    if (tags.length < maxTags) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setInputValue('');
      setError('');
      // Call parent callback
      if (onTagsChange) {
        onTagsChange(newTags);
      }
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    setError('');
    // Call parent callback
    if (onTagsChange) {
      onTagsChange(newTags);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[50px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
            >
              ×
            </button>
          </span>
        ))}
        {tags.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setError(''); }}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            placeholder={tags.length === 0 ? 'Write a word and press enter ' : ''}
            className="outline-none bg-transparent flex-1 min-w-[120px] text-sm"
          />
        )}
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default TagInputBar;