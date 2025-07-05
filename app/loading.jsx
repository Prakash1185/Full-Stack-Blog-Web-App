import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        {/* Main Spinner */}
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-muted-foreground/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-transparent border-r-primary/50 rounded-full animate-spin animation-delay-200"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold">Loading...</h2>
        
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
