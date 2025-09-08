import React, { useState } from "react";

const PitchDeckPreview = ({ slideUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // If no slideUrl provided, show empty state
  if (!slideUrl) {
    return (
      <div className="w-2/3 bg-gray-50 rounded-lg shadow-md flex flex-col items-center justify-center">
        <div className="text-center p-6">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No slides created yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Ask the assistant to create a pitch deck for you
          </p>
        </div>
      </div>
    );
  }

  // Extract Gamma document ID
  const extractGammaId = (url) => {
    // Handle various URL formats
    if (url.includes('/export/pptx/')) {
      return url.split('/export/pptx/')[1].split('/')[0];
    } else if (url.includes('gamma.app/view/')) {
      return url.split('gamma.app/view/')[1].split('?')[0]; // Remove query params if any
    } else if (url.includes('gamma.app/docs/')) {
      return url.split('gamma.app/docs/')[1].split('?')[0]; // Remove query params if any
    }
    return null;
  };
  
  const gammaId = extractGammaId(slideUrl);
  
  // Always use the Gamma viewer URL (more reliable and no PowerPoint logo)
  const gammaViewUrl = gammaId 
    ? `https://gamma.app/embed/${gammaId}?mode=doc` // Use embed mode for cleaner UI
    : slideUrl;
  
  // Public share URL for "Open in Gamma" link
  const publicShareUrl = gammaId 
    ? `https://gamma.app/view/${gammaId}`
    : slideUrl;
  
  return (
    <div className="w-2/3 bg-white rounded-lg shadow-md flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">
          Generated Pitch Deck
        </h2>
        
        <div className="flex space-x-2">
          {/* <a
            href={publicShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Open in Gamma
          </a> */}
          <a
            href={"/edit-slides?slideUrl=" + encodeURIComponent(slideUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Open In Edit Mode
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
              <p className="mt-2 text-gray-600">Loading presentation...</p>
            </div>
          </div>
        )}
        
        <div className="flex-1" style={{ height: "70vh" }}>
          {/* Always use Gamma's viewer */}
          <iframe
            src={gammaViewUrl}
            className="w-full h-full rounded border"
            title="Gamma Presentation"
            allow="fullscreen"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-3 border-t flex justify-center space-x-4">
        {slideUrl.includes('/export/pptx/') && (
          <a 
            href={slideUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            download
          >
            Download PPTX
          </a>
        )}
        
        <a 
          href={publicShareUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View Full Screen
        </a>
      </div>
    </div>
  );
};

export default PitchDeckPreview;