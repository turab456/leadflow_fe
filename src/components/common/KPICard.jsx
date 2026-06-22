import React from 'react';
import { ArrowUpRight, ArrowDownRight, Lock } from 'lucide-react';

const KPICard = ({ title, value, change, isPositive, icon: Icon, suffix = '', isLocked = false }) => {
  return (
    <div className={`p-6 border rounded-xl transition-all ${
      isLocked 
        ? 'bg-slate-50/50 border-slate-200/60 opacity-80 select-none' 
        : 'bg-white border-slate-200 shadow-subtle hover:shadow-card'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {isLocked ? (
          <div className="p-2 rounded-lg bg-slate-200/50 text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
        ) : (
          Icon && (
            <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
              <Icon className="w-5 h-5" />
            </div>
          )
        )}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        {isLocked ? (
          <span className="text-lg font-extrabold text-slate-400 tracking-tight">
            Locked
          </span>
        ) : (
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {value}{suffix}
          </span>
        )}
        {!isLocked && change !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            isPositive ? 'text-success-dark bg-success-light/30' : 'text-error-dark bg-error-light/30'
          } px-2 py-0.5 rounded-full`}>
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {change}%
          </span>
        )}
      </div>
      
      <p className="mt-1.5 text-xs text-slate-400 font-normal">
        {isLocked ? 'Outreach module active soon' : 'vs. previous month'}
      </p>
    </div>
  );
};

export default KPICard;
