import React from 'react';
import { ShieldCheck, ShieldAlert, Check, X, FileText, Calendar } from 'lucide-react';
import ScoreBadge from '../common/ScoreBadge';

const AuditHistoryTable = ({ audits, onViewDetails }) => {
  return (
    <div className="w-full">
      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block overflow-hidden bg-white border border-slate-200 rounded-xl shadow-subtle">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Business & Domain</th>
              <th className="px-6 py-4">SSL</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">SEO</th>
              <th className="px-6 py-4">Access.</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Speed</th>
              <th className="px-6 py-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {audits.map((audit) => {
              const isSSLSecure = audit.ssl === 'Secure';
              const isMobileResponsive = audit.mobileResponsive === 'Responsive';
              return (
                <tr key={audit.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{audit.businessName}</p>
                      <p className="text-xs text-slate-500 font-normal">{audit.website}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isSSLSecure ? 'bg-success/10 text-success-dark' : 'bg-error/10 text-error-dark'
                    }`}>
                      {isSSLSecure ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                      {audit.ssl}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isMobileResponsive ? 'bg-success/10 text-success-dark' : 'bg-error/10 text-error-dark'
                    }`}>
                      {isMobileResponsive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {audit.mobileResponsive}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={audit.seoScore} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={audit.accessibility} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={audit.performanceScore} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-700">{audit.loadSpeed}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewDetails(audit)}
                      className="inline-flex items-center gap-1 text-xs text-brand hover:underline font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {audits.map((audit) => {
          const isSSLSecure = audit.ssl === 'Secure';
          const isMobileResponsive = audit.mobileResponsive === 'Responsive';
          return (
            <div 
              key={audit.id} 
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-subtle hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{audit.businessName}</h4>
                  <p className="text-xs text-slate-500 font-normal">{audit.website}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-normal">
                  <Calendar className="w-3.5 h-3.5" />
                  {audit.date}
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isSSLSecure ? 'bg-success/10 text-success-dark' : 'bg-error/10 text-error-dark'
                }`}>
                  {isSSLSecure ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                  SSL: {audit.ssl}
                </span>

                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isMobileResponsive ? 'bg-success/10 text-success-dark' : 'bg-error/10 text-error-dark'
                }`}>
                  {isMobileResponsive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  Mobile: {audit.mobileResponsive}
                </span>
              </div>

              {/* Scores Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="text-center">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">SEO</span>
                  <ScoreBadge score={audit.seoScore} size="sm" />
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Access.</span>
                  <ScoreBadge score={audit.accessibility} size="sm" />
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Perf.</span>
                  <ScoreBadge score={audit.performanceScore} size="sm" />
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-normal">
                  Load Speed: <span className="font-semibold text-slate-800">{audit.loadSpeed}</span>
                </span>
                <button
                  onClick={() => onViewDetails(audit)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditHistoryTable;
