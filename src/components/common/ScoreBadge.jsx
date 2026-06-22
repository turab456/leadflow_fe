import React from 'react';

const ScoreBadge = ({ score, size = 'md' }) => {
  if (score === null || score === undefined) {
    return (
      <span className="text-xs text-slate-400 font-normal italic">N/A</span>
    );
  }

  const getColors = (val) => {
    if (val >= 80) {
      return {
        bg: 'bg-success/10',
        text: 'text-success-dark',
        border: 'border-success/20',
        label: 'Good'
      };
    } else if (val >= 60) {
      return {
        bg: 'bg-warning/10',
        text: 'text-warning-dark',
        border: 'border-warning/20',
        label: 'Needs Imp.'
      };
    } else {
      return {
        bg: 'bg-error/10',
        text: 'text-error-dark',
        border: 'border-error/20',
        label: 'Critical'
      };
    }
  };

  const colors = getColors(score);
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs font-semibold' 
    : 'px-2.5 py-1 text-xs font-bold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {score}
      <span className="text-[10px] opacity-75 font-normal">({colors.label})</span>
    </span>
  );
};

export default ScoreBadge;
