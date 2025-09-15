import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useUserStore } from "@/store/store";
import StreamingMessageBubble from "./StreamingMessageBubble";
import SourcesModal from "./SourcesModal";
import ToolDetailsModal from "./ToolDetailsModal";

export default function MessageBubble({
  sender,
  text,
  bgColor,
  isPitch,
  options = [],
  onOptionSelect,
  selectedOptions = [],
  isLoading = false,
  typing = false,
  aiIcon,
  imageUrl = null,
  isLogo = false,
  isError = false,
  status,
  toolInfo,
  toolSteps = [],
  isStreaming,
  thinkingProcess,
  searchResults,
  inspirationImages,
  shouldTypeText = false,
}) {
  const { Avatar } = useUserStore();
  console.log("[DEBUG MessageBubble] Received props:");
  console.log("- sender:", sender);
  console.log("- searchResults:", searchResults);
  console.log("- searchResults type:", typeof searchResults);
  console.log("- searchResults.results:", searchResults?.results);
  console.log("- searchResults.keywords:", searchResults?.keywords);
  console.log("- inspirationImages:", inspirationImages);
  console.log("- inspirationImages length:", inspirationImages?.length);
  // ✅ ADD: Simple typing effect hook - ONLY THIS IS NEW
  const useTypingEffect = (text, speed = 25, enabled = true) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (!text || !enabled) {
        setDisplayedText(text || "");
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setDisplayedText("");

      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, speed);

      return () => {
        clearInterval(timer);
        setIsTyping(false);
      };
    }, [text, speed, enabled]);

    return { displayedText, isTyping };
  };

  const isAI = sender !== "user";
  const userIcon = Avatar || "/avatar.png";
  const [selected, setSelected] = useState(null);

  // ✅ ADD: State for tool details modal
  const [selectedTool, setSelectedTool] = useState(null);

  // ✅ ADD: Typing effect for initial text - ONLY THIS IS NEW
  const shouldUseTyping =
    shouldTypeText && text && sender !== "user" && isStreaming;
  const { displayedText: typedText, isTyping } = useTypingEffect(
    text,
    25, // Speed: 25ms per character
    shouldUseTyping
  );

  // ✅ KEEP: Original typing effect for existing functionality - UNCHANGED
  const [displayedText, setDisplayedText] = useState(typing ? "" : text || "");

  // ✅ ADD SOURCES MODAL STATE - UNCHANGED
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  // ✅ CHECK IF WE HAVE SEARCH RESULTS TO SHOW SOURCES BUTTON - UNCHANGED
  const hasSearchResults =
    searchResults && searchResults.results && searchResults.results.length > 0;

  // ✅ ADD: Helper functions for tool steps display
  const getStatusIcon = (status) => {
    switch (status) {
      case "thinking":
        return "🤔";
      case "extracting_info":
        return "🔍";
      case "auto_completing":
        return "🧠";
      case "generating_asset":
        return "🎨";
      case "running":
        return "⚡";
      case "completed":
        return "✅";
      case "error":
        return "❌";
      default:
        return "⚡";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "thinking":
      case "extracting_info":
      case "auto_completing":
      case "generating_asset":
      case "running":
        return "text-gray-300";
      case "completed":
        return "text-gray-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

  // ✅ Function to get essential info for tool display
  const getToolEssentialInfo = (step) => {
    // Return only the most important info for each tool type
    if (step.name === "Real Model Thinking") {
      return step.message || "AI is thinking about your request...";
    }

    if (step.name === "Brand Information Extraction") {
      return (
        step.resultMessage || step.message || "Extracting brand information..."
      );
    }

    if (step.name === "Auto-complete Missing Info") {
      return (
        step.resultMessage ||
        step.message ||
        "Completing missing brand details..."
      );
    }

    if (step.name === "Generating Asset") {
      return step.resultMessage || step.message || "Creating your design...";
    }

    // Default for other tools
    return step.resultMessage || step.message || "Processing...";
  };

  // ✅ Function to check if tool has detailed info
  const hasDetailedInfo = (step) => {
    // Check if tool has additional info worth showing in modal
    if (step.name === "Real Model Thinking" && thinkingProcess) {
      return !!(
        thinkingProcess.thinking ||
        thinkingProcess.reasoning ||
        thinkingProcess.analysis ||
        thinkingProcess.plan
      );
    }

    if (step.data && Object.keys(step.data).length > 0) {
      return true;
    }

    if (step.resultMessage && step.resultMessage !== step.message) {
      return true;
    }

    return false;
  };

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

  // Custom markdown components for styling - UNCHANGED
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-md font-medium mb-1">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children, inline }) =>
      inline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">{children}</code>
        </pre>
      ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  // ✅ KEEP: StreamingMessageBubble logic - UNCHANGED
  if (isStreaming && sender === "ai" && status !== "complete") {
    return (
      <StreamingMessageBubble
        message={{
          text: shouldUseTyping ? typedText : text, // ✅ ONLY CHANGE: Use typed text if typing enabled
          status,
          toolInfo,
          toolSteps,
          imageUrl,
          isLogo,
          thinkingProcess,
          searchResults,
          inspirationImages,
          isTyping: shouldUseTyping ? isTyping : false, // ✅ PASS typing state
        }}
        aiIcon={aiIcon}
      />
    );
  }

  // ✅ DECIDE: Which text to show - ONLY THIS IS NEW
  const finalTextToShow = shouldUseTyping ? typedText : displayedText;

  // ✅ EVERYTHING BELOW IS EXACTLY THE SAME - NO CHANGES
  return (
    <>
      <div
        className={`flex w-[100%] items-start ${
          isAI ? "justify-start " : "justify-end "
        } px-4 py-2`}
      >
        {!isPitch && isAI ? (
          <div className="flex items-end mr-2">
            <Image
              src={aiIcon}
              alt="AI"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </div>
        ) : isPitch && isAI ? (
          <div
            className="   w-10 h-10 flex justify-center items-center rounded-full mr-2"
            style={{
              backgroundColor: bgColor ? `#${bgColor}` : "transparent",
            }}
          >
            <Image
              src={aiIcon}
              alt="AI"
              width={28}
              height={28}
              // className="rounded-full object-contain"
            />
          </div>
        ) : null}

        <div
          className={`p-3 flex-1 w-full text-[#393E44] shadow-xs text-[16px] rounded-b-[12px] ${
            !isPitch ? "max-w-[70%]" : "max-w-[100%]"
          } font-normal bg-white ${
            isAI
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
              {/* ✅ REORDERED: Tool steps display FIRST
              /* ✅ UPDATED: Tool steps display with full width */}
              {isAI && toolSteps && toolSteps.length > 0 && (
                <div className="mt-2 -mx-3 -mb-3">
                  {" "}
                  {/* Negative margins to extend full width */}
                  <div className="bg-gray-50 rounded-b-[12px] p-4 min-h-[60px]">
                    {" "}
                    {/* Full width background */}
                    <div className="space-y-3">
                      {toolSteps.map((step, index) => (
                        <>
                          <div
                            key={index}
                            className={`w-[100%] rounded-lg border font-medium text-[14px] transition-all duration-200 ${
                              step.status === "completed"
                                ? "bg-white border-[#ececec] shadow-sm"
                                : step.status === "error"
                                ? "bg-red-50 border-red-400"
                                : "bg-white border-[#ececec] shadow-sm"
                            }`}
                          >
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3 flex-1">
                                <span
                                  className={`font-xl ${getStatusColor(
                                    step.status
                                  )}`}
                                >
                                  <b>Using tool</b> {step.name}
                                </span>
                                {step.status === "running" && (
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                )}
                              </div>
                              {hasDetailedInfo(step) && (
                                <button
                                  onClick={() =>
                                    setSelectedTool({
                                      ...step,
                                      thinkingProcess:
                                        step.name === "Real Model Thinking"
                                          ? thinkingProcess
                                          : null,
                                    })
                                  }
                                  className="ml-2 px-3 py-1.5 bg-white text-gray-600 rounded-md text-xs font-medium hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-1 border border-gray-200"
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    />
                                    <path
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                  View Details
                                </button>
                              )}
                            </div>

                            {/* Add conversational text if available */}
                            {/* {step.conversationalText && (
                              <div className="px-3 pb-3 border-t border-gray-100 pt-2">
                                <p className="text-sm text-gray-700">
                                  💬 {step.conversationalText}
                                </p>
                              </div>
                            )} */}
                          </div>

                          {/* ✅ UPDATED: Inspiration images with full width */}
                          {(step.name == "Design Inspiration Finder" ||
                            step.name == "Slide Design Inspiration Finder") &&
                            isAI &&
                            inspirationImages &&
                            inspirationImages.length > 0 && (
                              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-medium text-gray-800 flex items-center gap-2">
                                      🎨 Design Inspiration
                                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                        {inspirationImages.length} found
                                      </span>
                                    </h5>
                                    <div className="text-xs text-gray-500">
                                      From Behance & Dribbble
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {inspirationImages.map((image, index) => (
                                      <div
                                        key={index}
                                        className="relative group cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
                                        onClick={() =>
                                          window.open(image.link, "_blank")
                                        }
                                      >
                                        <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-blue-400">
                                          <img
                                            src={`/api/proxy-image?url=${encodeURIComponent(
                                              image.original
                                            )}`}
                                            alt={
                                              image.title ||
                                              "Design inspiration"
                                            }
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                              if (
                                                image.thumbnail &&
                                                !e.target.src.includes(
                                                  encodeURIComponent(
                                                    image.thumbnail
                                                  )
                                                )
                                              ) {
                                                e.target.src = `/api/proxy-image?url=${encodeURIComponent(
                                                  image.thumbnail
                                                )}`;
                                              }
                                            }}
                                          />
                                        </div>
                                        <div className="absolute top-2 right-2">
                                          <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                              image.source === "Behance"
                                                ? "bg-blue-600 text-white"
                                                : "bg-pink-600 text-white"
                                            }`}
                                          >
                                            {image.source}
                                          </span>
                                        </div>
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg
                                              className="w-6 h-6 text-white"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                          <p className="text-white text-xs truncate">
                                            {image.title ||
                                              "Design inspiration"}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                    <span>Click any image to view source</span>
                                    {inspirationImages.length > 10 && (
                                      <span>
                                        {inspirationImages.length - 10} more
                                        available
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ UPDATED: Text rendering with proper spacing when tool steps are present */}
              {finalTextToShow && (
                <div
                  className={`prose prose-sm max-w-none ${
                    isError ? "text-red-600" : ""
                  } ${toolSteps && toolSteps.length > 0 ? "mt-4" : ""}`}
                >
                  <ReactMarkdown components={markdownComponents}>
                    {finalTextToShow.replace(/\\n/g, "\n")}
                  </ReactMarkdown>
                  {shouldTypeText && isTyping && (
                    <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                  )}
                </div>
              )}

              {/* ✅ REORDERED: Image display FOURTH (after text) */}
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
                  </div>
                  {(isLogo || imageUrl) && (
                    <div className="mt-2 flex gap-2 flex-wrap">
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
                            d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
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
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ✅ UNCHANGED: Sources button */}
              {isAI &&
                searchResults &&
                searchResults.results &&
                searchResults.results.length > 0 && (
                  <div className="mt-3 flex gap-2">
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

              {/* ✅ UNCHANGED: Options buttons */}
              {options.length > 0 && !isLoading && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleClick(opt)}
                      disabled={selectedOptions.includes(opt)}
                      className={`py-[12px] cursor-pointer text-[14px] font-normal px-[16px] bg-white border rounded-full hover:bg-gray-50 transition-colors ${
                        selected === opt
                          ? "border-[#C209C1] bg-purple-50"
                          : "border-[#E8ECEF]"
                      } ${
                        selectedOptions.includes(opt)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </>
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

      {/* ✅ UNCHANGED: Modals */}
      <SourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        sources={searchResults?.results}
        searchKeywords={searchResults?.keywords}
      />
      <ToolDetailsModal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        tool={selectedTool}
      />
    </>
  );
}

// Add loader animation styles
if (typeof window !== "undefined") {
  const style = document.createElement("style");
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
  if (!document.head.querySelector("style[data-loader]")) {
    style.setAttribute("data-loader", "");
    document.head.appendChild(style);
  }
}
