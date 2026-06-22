import React, { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Globe,
  Eye,
  Phone,
  Mail,
  ExternalLink,
  ArrowUpDown,
  Laptop
} from 'lucide-react';
import ScoreBadge from '../common/ScoreBadge';
import { useApp } from '../../contexts/AppContext';

const LeadTable = ({ leads, onLeadClick, loading = false }) => {
  console.log(leads, "table")
  const { toggleSaveLead, runWebsiteAudit } = useApp();
  const [sortField, setSortField] = useState('leadScore');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'name') {
      aVal = a.name.toLowerCase();
      bVal = b.name.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 w-full bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block overflow-hidden bg-white border border-slate-200 rounded-xl shadow-subtle">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1.5">
                  Business Name
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Website</th>
              {/* <th className="px-6 py-4">Contact Info</th> */}
              {/* <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('leadScore')}>
                <div className="flex items-center gap-1.5">
                  Lead Score
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th> */}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedLeads.map((lead) => {
              const isSaved = lead.status === 'Saved';
              return (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-500 font-normal">{lead.location} &bull; {lead.size}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md">
                      {lead.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://${lead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {lead.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  {/* <td className="px-6 py-4">
                    <div className="space-y-0.5 text-xs text-slate-500 font-normal">
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {lead.email}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {lead.phone}
                      </p>
                    </div>
                  </td> */}
                  {/* <td className="px-6 py-4">
                    <ScoreBadge score={lead.leadScore} />
                  </td> */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* Save Button */}
                      <button
                        onClick={() => toggleSaveLead(lead.id)}
                        className={`p-1.5 rounded-lg border transition-all ${isSaved
                          ? 'bg-brand/10 border-brand/20 text-brand'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                        title={isSaved ? "Saved" : "Save Lead"}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {/* Website Audit Button */}
                      <button
                        onClick={() => runWebsiteAudit(lead.id)}
                        disabled={lead.websiteStatus === 'Auditing'}
                        className={`p-1.5 rounded-lg border transition-all ${lead.websiteStatus === 'Audited'
                          ? 'bg-success/10 border-success/20 text-success-dark'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                        title={lead.websiteStatus === 'Audited' ? "Website Audited" : "Run Website Audit"}
                      >
                        <Globe className="w-4 h-4" />
                      </button>

                      {/* Details Button */}
                      <button
                        onClick={() => onLeadClick(lead.id)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {sortedLeads.map((lead) => {
          const isSaved = lead.status === 'Saved';
          return (
            <div
              key={lead.id}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-subtle hover:border-slate-300 transition-colors"
              onClick={() => onLeadClick(lead.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{lead.name}</h4>
                  <p className="text-xs text-slate-500 font-normal">{lead.location} &bull; {lead.size}</p>
                </div>
                <ScoreBadge score={lead.leadScore} size="sm" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500 border-t border-b border-slate-100 py-3 font-normal">
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Industry</span>
                  <span className="text-slate-800 font-medium">{lead.industry}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Website</span>
                  <a
                    href={`https://${lead.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline font-medium break-all flex items-center gap-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lead.website}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</span>
                  <span className="text-slate-700 truncate block">{lead.email}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</span>
                  <span className="text-slate-700">{lead.phone}</span>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between mt-4" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs font-semibold text-slate-400">
                  Status: <span className={lead.websiteStatus === 'Audited' ? 'text-success-dark font-bold' : 'text-slate-500'}>
                    {lead.websiteStatus}
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveLead(lead.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${isSaved
                      ? 'bg-brand/10 border-brand/20 text-brand'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    {isSaved ? "Saved" : "Save"}
                  </button>

                  <button
                    onClick={() => runWebsiteAudit(lead.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${lead.websiteStatus === 'Audited'
                      ? 'bg-success/10 border-success/20 text-success-dark'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Audit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadTable;
