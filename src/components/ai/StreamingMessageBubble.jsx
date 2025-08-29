import React, { useState } from 'react';
import Image from 'next/image';
import SourcesModal from './SourcesModal';

const StreamingMessageBubble = ({ message, aiIcon }) => {
  const { text, toolSteps = [], imageUrl, isLogo, thinkingProcess, searchResults, inspirationImages } = message;
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

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

            {/* ✅ REAL THINKING PROCESS DISPLAY */}
            {thinkingProcess && (
              <div className="mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-700 font-semibold">🧠 Real Model Thinking</span>
                  <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {thinkingProcess.thinking && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">💭 Internal Reasoning:</h5>
                    <div className="text-sm text-purple-700 bg-white p-3 rounded border-l-4 border-purple-200">
                      <pre className="whitespace-pre-wrap font-mono text-xs">
                        {thinkingProcess.thinking}
                      </pre>
                    </div>
                  </div>
                )}

                {thinkingProcess.reasoning && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">🔍 Analysis:</h5>
                    <p className="text-sm text-purple-700 bg-white p-2 rounded">
                      {thinkingProcess.reasoning}
                    </p>
                  </div>
                )}

                {thinkingProcess.analysis && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">🎯 Understanding:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.analysis}</p>
                  </div>
                )}

                {thinkingProcess.plan && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">📋 Plan:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.plan}</p>
                  </div>
                )}

                {thinkingProcess.process && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">⚡ Process:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.process}</p>
                  </div>
                )}

                {thinkingProcess.findings && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">🔍 Findings:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.findings}</p>
                  </div>
                )}

                {thinkingProcess.strategy && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">🎯 Strategy:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.strategy}</p>
                  </div>
                )}

                {thinkingProcess.creative_process && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">🎨 Creative Process:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.creative_process}</p>
                  </div>
                )}

                {thinkingProcess.design_decisions && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">⚡ Design Decisions:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.design_decisions}</p>
                  </div>
                )}

                {thinkingProcess.evaluation && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">✨ Evaluation:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.evaluation}</p>
                  </div>
                )}

                {thinkingProcess.approach && (
                  <div className="mb-3">
                    <h5 className="font-medium text-purple-800 mb-1">📋 Approach:</h5>
                    <p className="text-sm text-purple-700">{thinkingProcess.approach}</p>
                  </div>
                )}
              </div>
            )}

            {/* ✅ SHOW ALL TOOL STEPS */}
            {toolSteps.length > 0 && (
              <div className="mb-4 space-y-3">
                <h4 className="font-medium text-gray-800 mb-2">🔧 Processing Steps:</h4>

                {toolSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${step.status === 'completed'
                        ? 'bg-green-50 border-green-400'
                        : step.status === 'error'
                          ? 'bg-red-50 border-red-400'
                          : 'bg-blue-50 border-blue-400'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)} {step.name}
                      </span>

                      {step.status === 'running' && (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-1">{step.message}</p>

                    {/* Show result message if completed */}
                    {step.resultMessage && step.resultMessage !== step.message && (
                      <p className="text-sm text-green-700 font-medium">{step.resultMessage}</p>
                    )}

                    {/* Show extracted data */}
                    {step.data && (
                      <div className="mt-2 text-xs bg-white p-2 rounded border">
                        <div className="text-gray-600">
                          <strong>Extracted Information:</strong>
                          <pre className="mt-1 overflow-x-auto">
                            {JSON.stringify(step.data, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Show timestamp for debugging */}
                    {step.timestamp && (
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(step.timestamp).toLocaleTimeString()}
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

            {/* ✅ ADD: INSPIRATION IMAGES DISPLAY DURING STREAMING */}
            {inspirationImages && inspirationImages.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-800 flex items-center gap-2">
                    🎨 Design Inspiration
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {inspirationImages.length} found
                    </span>
                    {/* ✅ Show streaming indicator during streaming */}
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      Live
                    </span>
                  </h5>
                  <div className="text-xs text-gray-500">
                    From Behance & Dribbble
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {inspirationImages.map((image, index) => {
                    console.log('🖼️ Streaming inspiration image:', index, image);
                    return (
                      <div
                        key={index}
                        className="relative group cursor-pointer hover:transform hover:scale-105 transition-all duration-200 animate-fade-in"
                        onClick={() => window.open(image.link, '_blank')}
                      >
                        {/* Main image */}
                        <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-blue-400">
                        <img
                          src={`/api/proxy-image?url=${encodeURIComponent(image.original)}`}
                          alt={image.title || 'Design inspiration'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to thumbnail via proxy
                            if (image.thumbnail && !e.target.src.includes(encodeURIComponent(image.thumbnail))) {
                              e.target.src = `/api/proxy-image?url=${encodeURIComponent(image.thumbnail)}`;
                            }
                          }}
                        />
                        </div>

                        {/* Source badge */}
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            image.source === 'Behance' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-pink-600 text-white'
                          }`}>
                            {image.source}
                          </span>
                        </div>

                        {/* Hover overlay with external link icon */}
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>

                        {/* Title tooltip */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs truncate">
                            {image.title || 'Design inspiration'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Click any image to view source</span>
                  {inspirationImages.length > 10 && (
                    <span>{inspirationImages.length - 10} more available</span>
                  )}
                </div>
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15V3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 13H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 9H9H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
    </>
  );
};

export default StreamingMessageBubble;