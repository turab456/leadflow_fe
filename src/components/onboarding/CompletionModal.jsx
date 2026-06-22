import React from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Award, Compass, ArrowRight } from 'lucide-react';

const CompletionModal = () => {
  const { showCompletion, completeOnboarding } = useOnboarding();

  if (!showCompletion) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 flex flex-col text-center transform scale-100 opacity-100 transition-all font-sans text-slate-800">
        
        {/* Confetti-like icon header */}
        <div className="w-16 h-16 bg-success/10 text-success-dark rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20 animate-bounce">
          <Award className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-slate-900">Congratulations! 🎉</h2>
        <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto mt-2 leading-relaxed">
          Your LeadFlow workspace setup is complete. You have successfully discovered leads, run audits, designed templates, and prepared outreach pipelines.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center border-t border-slate-100 pt-6">
          <button
            onClick={completeOnboarding}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
          >
            Go To Dashboard
          </button>
          
          <button
            onClick={completeOnboarding}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            Explore Features
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompletionModal;
export { CompletionModal };
