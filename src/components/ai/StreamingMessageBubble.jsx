import React, { useState } from 'react';
import Image from 'next/image';
import SourcesModal from './SourcesModal';
import ToolDetailsModal from './ToolDetailsModal'; // New modal component

const StreamingMessageBubble = ({ message, aiIcon }) => {
  const { text, toolSteps = [], imageUrl, isLogo, thinkingProcess, searchResults, inspirationImages } = message;
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null); // For tool details modal

  // ✅ CHECK IF WE HAVE SEARCH RESULTS
  const hasSearchResults = searchResults && searchResults.results && searchResults.results.length > 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'thinking':
        return '🤔';
      case 'extracting_info':
        return '🔍';
      case 'auto_completing':
        return '🧠';
      case 'generating_asset':
        return '🎨';
      case 'running':
        return '⚡';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⚡';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'thinking':
      case 'extracting_info':
      case 'auto_completing':
      case 'generating_asset':
      case 'running':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // ✅ Function to get essential info for tool display
  const getToolEssentialInfo = (step) => {
    // Return only the most important info for each tool type
    if (step.name === 'Real Model Thinking') {
      return step.message || 'AI is thinking about your request...';
    }
    
    if (step.name === 'Brand Information Extraction') {
      return step.resultMessage || step.message || 'Extracting brand information...';
    }
    
    if (step.name === 'Auto-complete Missing Info') {
      return step.resultMessage || step.message || 'Completing missing brand details...';
    }
    
    if (step.name === 'Generating Asset') {
      return step.resultMessage || step.message || 'Creating your design...';
    }
    
    // Default for other tools
    return step.resultMessage || step.message || 'Processing...';
  };

  // ✅ Function to check if tool has detailed info
  const hasDetailedInfo = (step) => {
    // Check if tool has additional info worth showing in modal
    if (step.name === 'Real Model Thinking' && thinkingProcess) {
      return !!(thinkingProcess.thinking || thinkingProcess.reasoning || thinkingProcess.analysis || thinkingProcess.plan);
    }
    
    if (step.data && Object.keys(step.data).length > 0) {
      return true;
    }
    
    if (step.resultMessage && step.resultMessage !== step.message) {
      return true;
    }
    
    return false;
  };

  return (
    <>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0">
          <Image
            src={aiIcon}
            alt="AI"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>

        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-4">

            {/* ✅ SIMPLIFIED TOOL STEPS DISPLAY */}
            {toolSteps.length > 0 && (
              <div className="mb-4 space-y-2">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  🔧 Processing Steps
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {toolSteps.length}
                  </span>
                </h4>

                {toolSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${
                      step.status === 'completed'
                        ? 'bg-green-50 border-green-400'
                        : step.status === 'error'
                          ? 'bg-red-50 border-red-400'
                          : 'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <span className={`font-medium ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)} {step.name}
                        </span>

                        {step.status === 'running' && (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </div>

                      {/* ✅ VIEW DETAILS BUTTON - Only show if tool has detailed info */}
                      {hasDetailedInfo(step) && (
                        <button
                          onClick={() => setSelectedTool({...step, thinkingProcess: step.name === 'Real Model Thinking' ? thinkingProcess : null})}
                          className="ml-2 px-2 py-1 bg-white text-gray-600 rounded text-xs font-medium hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          View
                        </button>
                      )}
                    </div>

                    {/* ✅ ESSENTIAL INFO ONLY */}
                    <p className="text-sm text-gray-700 mt-1">
                      {getToolEssentialInfo(step)}
                    </p>

                    {/* ✅ SIMPLE STATUS INDICATOR */}
                    {step.timestamp && (
                      <div className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                        <span>{new Date(step.timestamp).toLocaleTimeString()}</span>
                        {step.status === 'completed' && (
                          <span className="text-green-600">• Completed</span>
                        )}
                        {step.status === 'running' && (
                          <span className="text-blue-600">• Processing...</span>
                        )}
                        {step.status === 'error' && (
                          <span className="text-red-600">• Error occurred</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Message Text */}
            {text && (
              <div className="text-gray-800 mb-3">
                <p className="whitespace-pre-wrap">{text}</p>
              </div>
            )}

            {/* ✅ SIMPLIFIED INSPIRATION IMAGES DISPLAY */}
            {inspirationImages && inspirationImages.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-800 flex items-center gap-2">
                    🎨 Design Inspiration
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {inspirationImages.length}
                    </span>
                  </h5>
                  <button
                    onClick={() => setSelectedTool({
                      name: 'Design Inspiration',
                      inspirationImages: inspirationImages,
                      type: 'inspiration'
                    })}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    View All
                  </button>
                </div>

                {/* ✅ SHOW ONLY FIRST 3 IMAGES */}
                <div className="grid grid-cols-3 gap-2">
                  {inspirationImages.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
                      onClick={() => window.open(image.link, '_blank')}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-blue-400">
                        <img
                          src={`/api/proxy-image?url=${encodeURIComponent(image.original)}`}
                          alt={image.title || 'Design inspiration'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (image.thumbnail && !e.target.src.includes(encodeURIComponent(image.thumbnail))) {
                              e.target.src = `/api/proxy-image?url=${encodeURIComponent(image.thumbnail)}`;
                            }
                          }}
                        />
                      </div>
                      <div className="absolute top-1 right-1">
                        <span className={`px-1 py-0.5 text-xs rounded ${
                          image.source === 'Behance' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-pink-600 text-white'
                        }`}>
                          {image.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {inspirationImages.length > 3 && (
                  <div className="mt-2 text-center">
                    <span className="text-xs text-gray-500">
                      +{inspirationImages.length - 3} more images available
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Generated Asset */}
            {imageUrl && (
              <div className="mt-3">
                <Image
                  src={imageUrl}
                  alt="Generated Asset"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                {isLogo && (
                  <p className="text-sm text-gray-600 mt-2">
                    🎨 Generated brand asset
                  </p>
                )}
              </div>
            )}

            {/* Action buttons */}
            {imageUrl && (
              <div className="mt-2 flex gap-2">
                {/* Download button */}
                <a
                  href={imageUrl}
                  download="generated-asset.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#BDFF00] text-black rounded-lg text-sm font-medium hover:bg-[#a8e600] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download
                </a>

                {/* Copy Link button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(imageUrl);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy Link
                </button>
              </div>
            )}

            {/* ✅ SHOW SOURCES BUTTON WHEN WE HAVE SEARCH RESULTS */}
            {hasSearchResults && (
              <div className="mt-2">
                <button
                  onClick={() => setIsSourcesModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Show Sources ({searchResults.results.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ✅ SOURCES MODAL */}
      <SourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        sources={searchResults?.results}
        searchKeywords={searchResults?.keywords}
      />

      {/* ✅ NEW TOOL DETAILS MODAL */}
      <ToolDetailsModal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        tool={selectedTool}
      />
    </>
  );
};

export default StreamingMessageBubble;