import React, { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { CheckSquare, Square, ChevronUp, ChevronDown, CheckCircle, Zap } from 'lucide-react';

const ChecklistWidget = () => {
  const { onboardingCompleted, completedTasks } = useOnboarding();
  const [isOpen, setIsOpen] = useState(true);

  if (onboardingCompleted) return null;

  const tasks = [
    { id: 'search_lead', label: 'Search First Lead' },
    { id: 'save_lead', label: 'Save First Lead' },
    { id: 'run_audit', label: 'Run First Audit' }
  ];

  const completedCount = tasks.filter(t => completedTasks.includes(t.id)).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="fixed bottom-4 left-4 z-[10000] bg-white  rounded-xl shadow-lg w-72 transition-all duration-300 font-sans text-slate-800 text-xs">
      {/* Widget Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-900 text-white rounded-t-xl cursor-pointer select-none"
      >
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-warning fill-current" />
          <span className="font-bold tracking-tight">Getting Started ({progressPercent}%)</span>
        </div>
        <button className="p-0.5 hover:bg-slate-800 rounded">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Widget Body */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>{completedCount} of {tasks.length} tasks</span>
              <span>{progressPercent}% Complete</span>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {tasks.map((t) => {
              const isChecked = completedTasks.includes(t.id);
              return (
                <div 
                  key={t.id} 
                  className={`flex items-start gap-2.5 py-0.5 transition-colors ${isChecked ? 'text-slate-400 font-normal' : 'text-slate-700 font-semibold'}`}
                >
                  <span className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckCircle className="w-4 h-4 text-success-dark fill-success/15" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </span>
                  <span className={isChecked ? 'line-through' : ''}>{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistWidget;
export { ChecklistWidget };
