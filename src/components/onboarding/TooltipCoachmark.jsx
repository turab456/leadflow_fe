import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

const TooltipCoachmark = ({ id, content, children }) => {
  const [viewCount, setViewCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const key = `coachmark_views_${id}`;
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    setViewCount(count);
  }, [id]);

  const handleInteraction = () => {
    if (viewCount < 5) {
      const nextCount = viewCount + 1;
      localStorage.setItem(`coachmark_views_${id}`, nextCount.toString());
      setViewCount(nextCount);
    }
  };

  const hasGlow = viewCount < 3; // Show highlight pulse only the first 3 times

  return (
    <div 
      className="relative inline-flex items-center gap-1 group"
      onMouseEnter={() => {
        setShowTooltip(true);
        handleInteraction();
      }}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleInteraction}
    >
      {/* Target Content */}
      {children}

      {/* Coachmark Indicator Badge */}
      {viewCount < 5 && (
        <span className="relative flex h-3 w-3 cursor-pointer">
          {hasGlow && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand/40 opacity-75"></span>
          )}
          <HelpCircle className="relative inline-flex rounded-full h-3 w-3 text-brand/70 stroke-2" />
        </span>
      )}

      {/* Tooltip Overlay popup */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white rounded-lg p-2.5 shadow-md text-[10px] font-normal leading-relaxed z-[999] pointer-events-none transition-opacity duration-200">
          <p>{content}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-width-4 border-style-solid border-color-slate-900 border-top-color-transparent border-left-color-transparent border-right-color-transparent">
            {/* Simple arrow marker custom styling */}
            <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TooltipCoachmark;
export { TooltipCoachmark };
