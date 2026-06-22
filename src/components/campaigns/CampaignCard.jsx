import React from 'react';
import { Mail, Calendar, Play, Pause, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const CampaignCard = ({ campaign, onSelect }) => {
  const { updateCampaignStatus } = useApp();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/10 text-success-dark border border-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Active
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand/10 text-brand border border-brand/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      default: // Draft
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">
            Draft
          </span>
        );
    }
  };

  const openRate = campaign.sentCount > 0 ? Math.round((campaign.openedCount / campaign.sentCount) * 100) : 0;
  const replyRate = campaign.sentCount > 0 ? Math.round((campaign.repliedCount / campaign.sentCount) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-subtle hover:border-slate-300 transition-colors flex flex-col h-full">
      {/* Top Section */}
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between">
          {getStatusBadge(campaign.status)}
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {campaign.createdDate}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mt-3 line-clamp-1">{campaign.name}</h3>
        <p className="text-xs text-slate-500 mt-1 font-normal">Service: <span className="font-semibold text-slate-700">{campaign.serviceType}</span></p>

        {/* Audience Detail */}
        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-2.5 space-y-1 text-xs text-slate-500 font-normal">
          <p><span className="font-semibold text-slate-600">Audience:</span> {campaign.audience}</p>
          <p><span className="font-semibold text-slate-600">Tone:</span> {campaign.tone}</p>
        </div>

        {/* Stats Section if Running / Completed */}
        {(campaign.status === 'Running' || campaign.status === 'Completed' || campaign.sentCount > 0) ? (
          <div className="mt-5 space-y-3">
            {/* Counts Row */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 border border-slate-100 rounded-lg py-2">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Sent</span>
                <span className="font-bold text-slate-700">{campaign.sentCount}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg py-2">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Opens</span>
                <span className="font-bold text-slate-700">{campaign.openedCount} <span className="text-[10px] text-slate-400">({openRate}%)</span></span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg py-2">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Replies</span>
                <span className="font-bold text-slate-700">{campaign.repliedCount} <span className="text-[10px] text-slate-400">({replyRate}%)</span></span>
              </div>
            </div>

            {/* Performance bars */}
            <div className="space-y-1.5 text-xs font-normal">
              <div className="flex justify-between text-slate-500">
                <span>Open Rate</span>
                <span className="font-bold text-slate-700">{openRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand h-full rounded-full" style={{ width: `${openRate}%` }} />
              </div>

              <div className="flex justify-between text-slate-500 pt-1">
                <span>Reply Rate</span>
                <span className="font-bold text-slate-700">{replyRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-success h-full rounded-full" style={{ width: `${replyRate}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-6 text-center">
            <Mail className="w-8 h-8 text-slate-300 stroke-1 mb-1.5" />
            <p className="text-xs text-slate-500 font-normal">Campaign is in scheduling stage.</p>
            <p className="text-[10px] text-slate-400 font-normal mt-0.5">{campaign.leadsCount} targeted leads.</p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
        <button
          onClick={() => onSelect(campaign)}
          className="text-xs font-bold text-slate-600 hover:text-brand flex items-center gap-0.5 transition-colors"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {campaign.status === 'Draft' && (
          <button
            onClick={() => updateCampaignStatus(campaign.id, 'Running')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-md shadow-xs transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            Launch
          </button>
        )}
        {campaign.status === 'Running' && (
          <button
            onClick={() => updateCampaignStatus(campaign.id, 'Draft')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md shadow-xs transition-colors"
          >
            <Pause className="w-3 h-3 fill-current" />
            Pause
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
