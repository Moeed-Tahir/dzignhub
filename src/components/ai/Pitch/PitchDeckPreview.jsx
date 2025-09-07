import React from "react";

const PitchDeckPreview = ({ slides = [], currentSlide = 0, onSlideChange }) => {
  if (slides.length === 0) {
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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-2/3 bg-white rounded-lg shadow-md flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">
          {currentSlideData.title || "Pitch Deck"}
        </h2>
        <div className="text-sm text-gray-500">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 flex flex-col">
        {currentSlideData.type === "gamma" ? (
          <div className="flex-1 w-full">
            <iframe
              src={currentSlideData.url}
              className="w-full h-full rounded border"
              title="Gamma Presentation"
              allow="fullscreen"
            ></iframe>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded p-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">{currentSlideData.title}</h3>
              <p className="text-gray-700">{currentSlideData.content}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex justify-center">
        <div className="flex space-x-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideChange(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-purple-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PitchDeckPreview;