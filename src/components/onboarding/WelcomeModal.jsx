import React, { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Search, Globe, Mail, Compass, HelpCircle } from 'lucide-react';

const WelcomeModal = () => {
  const { showWelcome, startOnboarding, skipOnboarding } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState('Explore Everything');

  if (!showWelcome) return null;

  const goals = [
    { id: 'Find New Leads', label: 'Find New Leads', icon: Search, desc: 'Discover B2B business leads and contact details.' },
    { id: 'Audit Websites', label: 'Audit Websites', icon: Globe, desc: 'Analyze technical speed, SEO structure, and security.' },
    { id: 'Explore Everything', label: 'Explore Everything', icon: Compass, desc: 'Discover all capabilities of the LeadFlow workspace.' }
  ];

  const handleContinue = () => {
    startOnboarding(selectedGoal);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 flex flex-col transform scale-100 opacity-100 transition-all font-sans text-slate-800">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-2 border border-brand/20">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Welcome to LeadFlow</h2>
          <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto">
            Let's get your workspace customized. Select your primary goal to begin the quick tour.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goals.map((g) => {
            const Icon = g.icon;
            const isSelected = selectedGoal === g.id;
            return (
              <div
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`
                  p-4 border rounded-xl cursor-pointer transition-all flex flex-col text-left hover:border-slate-300
                  ${isSelected 
                    ? 'border-brand bg-brand/5 ring-1 ring-brand' 
                    : 'border-slate-200 bg-white'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold text-slate-800">{g.label}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-normal mt-1.5 leading-snug">{g.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
          <button
            onClick={skipOnboarding}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Skip setup
          </button>
          
          <button
            onClick={handleContinue}
            className="px-5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-md transition-colors"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
export { WelcomeModal };
