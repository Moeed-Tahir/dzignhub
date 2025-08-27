import React from 'react';
import Image from 'next/image';

const StreamingMessageBubble = ({ message, aiIcon }) => {
  const { text, toolSteps = [], imageUrl, isLogo } = message;

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
          
          {/* ✅ SHOW ALL TOOL STEPS */}
          {toolSteps.length > 0 && (
            <div className="mb-4 space-y-3">
              <h4 className="font-medium text-gray-800 mb-2">🔧 Processing Steps:</h4>
              
              {toolSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border-l-4 ${
                    step.status === 'completed' 
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
        </div>
      </div>
    </div>
  );
};

export default StreamingMessageBubble;