import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = ({ 
  title = "No results found", 
  description = "Try adjusting your filters or search terms to find what you are looking for.", 
  icon: Icon = Search,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
        <Icon className="w-6 h-6 stroke-1.5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1.5 text-xs text-slate-500 max-w-xs font-normal leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-3 py-1.5 text-xs font-medium text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
