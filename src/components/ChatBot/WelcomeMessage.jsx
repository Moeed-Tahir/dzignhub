"use client";

export default function WelcomeMessage({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="-left-[510px] absolute  -bottom-[75px] w-[428px] h-[80px] transform transition-all duration-500 ease-out animate-in slide-in-from-right-5 fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-4   border border-gray-100 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <p className="text-[16px] font-medium text-[#393E44] leading-relaxed">
            👋🏻 Hello! I'm Ann – ready to help you explore Allmyai. Let's get
            started!
          </p>
        </div>
      </div>
    </div>
  );
}
