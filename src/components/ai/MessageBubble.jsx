import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({
  sender,
  text,
  options = [],
  onOptionSelect,
  selectedOptions = [],
  isLoading = false,
  typing = false,
  imageUrl = null,
  isLogo = false,
  isError = false
}) {
  const isAI = sender === "ai";
  const userIcon = "/avatar.png";
  const aiIcon = "/ai/ai-dp.png";
  const [selected, setSelected] = useState(null);
  const [displayedText, setDisplayedText] = useState(typing ? "" : text || "");

  useEffect(() => {
    if (typing && text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(text || "");
    }
  }, [text, typing]);

  const handleClick = (opt) => {
    setSelected(opt);
    if (onOptionSelect) onOptionSelect(opt);
  };

  // Custom markdown components for styling
  const markdownComponents = {
    h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-md font-medium mb-1">{children}</h3>,
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="ml-2">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children, inline }) => 
      inline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
      ) : (
        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">{children}</code>
        </pre>
      ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">{children}</blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  return (
    <div
      className={`flex max-w-[1280px] items-start ${isAI ? "justify-start " : "justify-end "
        } px-4 py-2`}
    >
      {isAI && (
        <div className="flex items-end mr-2">
          <Image
            src={aiIcon}
            alt="AI"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}

      <div
        className={`p-3 text-[#393E44] shadow-xs text-[16px] rounded-b-[12px] max-w-[70%] font-normal bg-white ${isAI
            ? "text-left rounded-tl-[4px] rounded-tr-[12px]"
            : "text-right rounded-tl-[12px] rounded-tr-[4px]"
          } ${isError ? "border border-red-200 bg-red-50" : ""}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="loader inline-block w-5 h-5 border-2 border-gray-300 border-t-[#BDFF00] rounded-full animate-spin"></span>
            <span className="text-gray-400 text-sm">Thinking...</span>
          </div>
        ) : (
          <>
            {/* Text content with markdown support */}
            {displayedText && (
              <div className={`prose prose-sm max-w-none ${isError ? "text-red-600" : ""}`}>
                <ReactMarkdown components={markdownComponents}>
                  {displayedText}
                </ReactMarkdown>
              </div>
            )}

            {/* Logo/Image display */}
            {imageUrl && (
              <div className={`mt-3 ${text ? "mt-3" : ""}`}>
                <div className="relative">
                  <Image
                    src={imageUrl}
                    alt={isLogo ? "Generated Logo" : "Generated Image"}
                    width={isLogo ? 300 : 400}
                    height={isLogo ? 300 : 400}
                    className="rounded-lg shadow-lg object-cover"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                  {isLogo && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      Logo
                    </div>
                  )}
                </div>

                {/* Download button for logos */}
                {isLogo && (
                  <div className="mt-2 flex gap-2">
                    <a
                      href={imageUrl}
                      download="generated-logo.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#BDFF00] text-black rounded-lg text-sm font-medium hover:bg-[#a8e600] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(imageUrl);
                        // You can add a toast notification here
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Options buttons */}
        {options.length > 0 && !isLoading && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleClick(opt)}
                disabled={selectedOptions.includes(opt)}
                className={`py-[12px] cursor-pointer text-[14px] font-normal px-[16px] bg-white border rounded-full hover:bg-gray-50 transition-colors ${selected === opt
                    ? "border-[#C209C1] bg-purple-50"
                    : "border-[#E8ECEF]"
                  } ${selectedOptions.includes(opt)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isAI && (
        <div className="flex items-end ml-2">
          <Image
            src={userIcon}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}

// Add loader animation styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .loader { 
      border-top-color: #BDFF00 !important; 
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `;
  if (!document.head.querySelector('style[data-loader]')) {
    style.setAttribute('data-loader', '');
    document.head.appendChild(style);
  }
}