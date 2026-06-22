import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Sparkles, 
  Clock, 
  Send, 
  Check, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Campaigns = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader 
        title="Outreach Campaigns" 
        description="Launch hyper-targeted cold outreach sequences powered by your business intelligence and SEO audit metrics."
      />

      {/* Main Showcase Hero Container */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Animated Lock badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-semibold text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            Coming Soon to LeadFlow
          </div>

          <div className="flex justify-center">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand to-indigo-500 text-white shadow-lg animate-bounce-slow">
              <Mail className="w-10 h-10" />
              <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-900 text-slate-300">
                <Lock className="w-4 h-4 text-brand" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Automated outreach meets <span className="bg-gradient-to-r from-brand via-indigo-400 to-purple-400 bg-clip-text text-transparent">data-driven personalization</span>
          </h2>
          
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-normal">
            Currently, our engineering team is assembling the outreach core. Soon, you will be able to convert saved leads directly into high-converting email sequences, injecting live audit data points automatically.
          </p>

          {/* Waitlist Subscription form */}
          <div className="max-w-md mx-auto pt-4">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl shadow-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Request Beta Access
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-left animate-scale-up">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">You're on the list!</p>
                  <p className="text-[10px] text-slate-400 font-normal">We'll alert you as soon as beta invites are dispatched.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid Mockup (Premium Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-slate-800/60 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="group p-5 bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/60 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-4 group-hover:text-brand group-hover:border-brand/30 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-2">AI Pitch Generator</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
              Auto-generate deeply customized pitches injecting technical audit values like SEO scoring, accessibility issues, and mobile responsiveness metrics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-5 bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/60 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-4 group-hover:text-brand group-hover:border-brand/30 transition-colors">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-2">Smart Sequencing</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
              Create multi-day automated follow-up sequences. Automate delivery based on open rate intelligence and positive reply markers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-5 bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/60 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mb-4 group-hover:text-brand group-hover:border-brand/30 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-2">Deliverability Suite</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
              Domain warmup integrations, SPF/DKIM verification checks, and spam filter detection algorithms to guarantee inbox placement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
