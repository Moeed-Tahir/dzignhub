import React from 'react';

const ToolDetailsModal = ({ isOpen, onClose, tool }) => {
  if (!isOpen || !tool) return null;

  const renderThinkingDetails = () => {
    if (!tool.thinkingProcess) return null;

    const { thinkingProcess } = tool;
    
    return (
      <div className="space-y-4">
        {thinkingProcess.thinking && (
          <div>
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              💭 Internal Reasoning
            </h4>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <pre className="whitespace-pre-wrap font-mono text-sm text-purple-700">
                {thinkingProcess.thinking}
              </pre>
            </div>
          </div>
        )}

        {thinkingProcess.reasoning && (
          <div>
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              🔍 Analysis
            </h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-200">
              <p className="text-sm text-purple-700">{thinkingProcess.reasoning}</p>
            </div>
          </div>
        )}

        {thinkingProcess.analysis && (
          <div>
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              🎯 Understanding
            </h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-200">
              <p className="text-sm text-purple-700">{thinkingProcess.analysis}</p>
            </div>
          </div>
        )}

        {thinkingProcess.plan && (
          <div>
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              📋 Plan
            </h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-200">
              <p className="text-sm text-purple-700">{thinkingProcess.plan}</p>
            </div>
          </div>
        )}

        {/* Add other thinking process fields */}
        {Object.entries(thinkingProcess).map(([key, value]) => {
          if (['thinking', 'reasoning', 'analysis', 'plan'].includes(key) || !value) return null;
          
          const keyDisplay = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          return (
            <div key={key}>
              <h4 className="font-medium text-purple-800 mb-2">
                {keyDisplay}
              </h4>
              <div className="bg-white p-3 rounded border-l-4 border-purple-200">
                <p className="text-sm text-purple-700">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderInspirationImages = () => {
    if (!tool.inspirationImages) return null;

    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          Found {tool.inspirationImages.length} design inspirations from Behance & Dribbble
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tool.inspirationImages.map((image, index) => (
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

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <div className="mt-2">
                <p className="text-xs text-gray-700 truncate font-medium">
                  {image.title || 'Design inspiration'}
                </p>
                <p className="text-xs text-gray-500">
                  {image.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderToolData = () => {
    if (!tool.data || Object.keys(tool.data).length === 0) return null;

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 mb-2">📊 Extracted Data</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(tool.data, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  const getModalIcon = (toolName) => {
    switch (toolName) {
      case 'Real Model Thinking':
        return '🧠';
      case 'Brand Information Extraction':
        return '🔍';
      case 'Auto-complete Missing Info':
        return '🧠';
      case 'Generating Asset':
        return '🎨';
      case 'Design Inspiration':
        return '🎨';
      default:
        return '🔧';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getModalIcon(tool.name)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {tool.name || 'Tool Details'}
              </h3>
              {tool.timestamp && (
                <p className="text-sm text-gray-500">
                  {new Date(tool.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Basic Info */}
          {tool.message && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">📝 Summary</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{tool.message}</p>
            </div>
          )}

          {tool.resultMessage && tool.resultMessage !== tool.message && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">✅ Result</h4>
              <p className="text-green-700 bg-green-50 p-3 rounded">{tool.resultMessage}</p>
            </div>
          )}

          {/* Thinking Process Details */}
          {tool.name === 'Real Model Thinking' && renderThinkingDetails()}

          {/* Inspiration Images */}
          {tool.type === 'inspiration' && renderInspirationImages()}

          {/* Tool Data */}
          {renderToolData()}

          {/* Status */}
          {tool.status && (
            <div className="mt-6 p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-600">Status: </span>
              <span className={`text-sm font-medium ${
                tool.status === 'completed' ? 'text-green-600' :
                tool.status === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailsModal;