import React, { useState } from 'react';
import {
  Globe,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PageHeader from '../components/common/PageHeader';
import AuditHistoryTable from '../components/audits/AuditHistoryTable';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import ScoreBadge from '../components/common/ScoreBadge';

const WebsiteAudits = () => {
  const { audits, leads, runWebsiteAudit } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRunAuditModal, setShowRunAuditModal] = useState(false);

  // Filter audits
  const filteredAudits = audits.filter(a =>
    a.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.website?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate Average Metrics
  const totalAudits = audits.length;
  const avgSEO = totalAudits > 0 ? Math.round(audits.reduce((acc, a) => acc + a.seoScore, 0) / totalAudits) : 0;
  const avgPerformance = totalAudits > 0 ? Math.round(audits.reduce((acc, a) => acc + a.performanceScore, 0) / totalAudits) : 0;
  const avgAccessibility = totalAudits > 0 ? Math.round(audits.reduce((acc, a) => acc + a.accessibility, 0) / totalAudits) : 0;
  const sslSecurePct = totalAudits > 0 ? Math.round((audits.filter(a => a.ssl === 'Secure').length / totalAudits) * 100) : 0;
  const mobileResponsivePct = totalAudits > 0 ? Math.round((audits.filter(a => a.mobileResponsive === 'Responsive').length / totalAudits) * 100) : 0;

  const handleOpenReport = (audit) => {
    // Find the full lead details to pull AI insights and issues list
    const lead = leads.find(l => l.website === audit.website);
    const mergedAudit = {
      ...audit,
      issues: lead?.auditSummary?.issues || [
        "Optimize large visual images for better compression ratios",
        "Implement browser caching policies on static assets",
        "Add missing meta descriptive keyword tags"
      ],
      aiInsights: lead?.aiInsights || {
        opportunityScore: 85,
        painPoints: "Slow speed on mobile booking pages prevents client signups.",
        suggestedHook: "Pitch performance optimization to lift bookings by 10%.",
        valueProp: "Core performance audit upgrades.",
        recommendedServices: ["Web Perf Tuning", "Mobile Optimization"]
      }
    };
    setSelectedAudit(mergedAudit);
    setShowDetailModal(true);
  };

  const handleRunNewAudit = (leadId) => {
    runWebsiteAudit(leadId);
    setShowRunAuditModal(false);
    alert("Audit completed successfully! View details in the table.");
  };

  // Leads that need audits
  const unauditedLeads = leads.filter(l => l.websiteStatus === 'Needs Audit');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technical Website Audits"
        description="Analyze site responsiveness, SSL security configurations, SEO architectures, and accessibility scores."
      >
        <button
          onClick={() => setShowRunAuditModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
        >
          <Cpu className="w-4 h-4" />
          Audit Website
        </button>
      </PageHeader>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Performance */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-subtle text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Performance</span>
          <span className="block text-2xl font-bold text-slate-800 mt-1">{avgPerformance}/100</span>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 max-w-[120px] mx-auto">
            <div className="bg-warning h-full rounded-full" style={{ width: `${avgPerformance}%` }} />
          </div>
        </div>

        {/* SEO */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-subtle text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg SEO Score</span>
          <span className="block text-2xl font-bold text-slate-800 mt-1">{avgSEO}/100</span>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 max-w-[120px] mx-auto">
            <div className="bg-success h-full rounded-full" style={{ width: `${avgSEO}%` }} />
          </div>
        </div>

        {/* Accessibility */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-subtle text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Accessibility</span>
          <span className="block text-2xl font-bold text-slate-800 mt-1">{avgAccessibility}/100</span>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 max-w-[120px] mx-auto">
            <div className="bg-error h-full rounded-full" style={{ width: `${avgAccessibility}%` }} />
          </div>
        </div>

        {/* SSL Security */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-subtle text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SSL Security</span>
          <span className="block text-2xl font-bold text-slate-800 mt-1">{sslSecurePct}%</span>
          <span className="text-[10px] text-slate-400 font-normal block mt-2">Secure domains</span>
        </div>

        {/* Mobile Responsive */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-subtle text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Friendly</span>
          <span className="block text-2xl font-bold text-slate-800 mt-1">{mobileResponsivePct}%</span>
          <span className="text-[10px] text-slate-400 font-normal block mt-2">Adaptive viewports</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-subtle">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audits by business or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand focus:bg-white font-medium"
          />
        </div>
      </div>

      {/* Audit Log */}
      {filteredAudits.length > 0 ? (
        <AuditHistoryTable audits={filteredAudits} onViewDetails={handleOpenReport} />
      ) : (
        <EmptyState
          title="No audits conducted"
          description="Click on 'Audit Website' above to queue audits for any of your saved leads."
          actionText="Open Auditor Trigger"
          onAction={() => setShowRunAuditModal(true)}
          icon={Globe}
        />
      )}

      {/* AUDIT DETAILS SUMMARY MODAL */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={selectedAudit ? `Audit Report: ${selectedAudit.businessName} (${selectedAudit.website})` : ''}
        size="lg"
      >
        {selectedAudit && (
          <div className="space-y-6 text-slate-800 text-xs font-medium">
            {/* Top row: SSL and Responsive Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center gap-3">
                {selectedAudit.ssl === 'Secure' ? (
                  <div className="p-2 rounded-lg bg-success/15 text-success-dark">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-error/15 text-error-dark">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-700">SSL Certificate Status</h4>
                  <p className="text-slate-500 font-normal mt-0.5">
                    {selectedAudit.ssl === 'Secure'
                      ? 'Valid SHA-256 SSL connection active.'
                      : 'Missing or expired SSL certificate configuration.'}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center gap-3">
                {selectedAudit.mobileResponsive === 'Responsive' ? (
                  <div className="p-2 rounded-lg bg-success/15 text-success-dark">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-error/15 text-error-dark">
                    <Smartphone className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-700">Viewport Responsiveness</h4>
                  <p className="text-slate-500 font-normal mt-0.5">
                    {selectedAudit.mobileResponsive === 'Responsive'
                      ? 'Mobile media queries and layouts validated.'
                      : 'Severe responsive breaks and horizontal scrolls detected.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle row: Visual Scores */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 py-6">
              <div className="text-center space-y-1.5">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEO Audit</span>
                <ScoreBadge score={selectedAudit.seoScore} />
              </div>
              <div className="text-center space-y-1.5">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accessibility</span>
                <ScoreBadge score={selectedAudit.accessibility} />
              </div>
              <div className="text-center space-y-1.5">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance</span>
                <ScoreBadge score={selectedAudit.performanceScore} />
              </div>
            </div>

            {/* List of identified technical issues */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Technical Issues Identified ({selectedAudit.issues.length})
              </h4>
              <ul className="space-y-2 pl-5 list-disc text-slate-600 font-normal">
                {selectedAudit.issues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">{issue}</li>
                ))}
              </ul>
            </div>

            {/* Opportunity insights */}
            <div className="bg-brand/5 border border-brand/10 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-brand flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                AI Outreach Intelligence Suggestions
              </h4>
              <div className="space-y-2 text-slate-700 font-normal leading-relaxed">
                <p><span className="font-bold text-slate-800">Pain Points:</span> {selectedAudit.aiInsights.painPoints}</p>
                <p><span className="font-bold text-slate-800">Suggested Outreach Hook:</span> {selectedAudit.aiInsights.suggestedHook}</p>
                <p><span className="font-bold text-slate-800">Proposed Upgrade Packages:</span></p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {selectedAudit.aiInsights.recommendedServices.map(srv => (
                    <span key={srv} className="inline-flex px-2 py-1 bg-white border border-brand/20 text-brand rounded-md font-bold text-[10px] shadow-xs">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* RUN AUDIT LAUNCHER MODAL */}
      <Modal
        isOpen={showRunAuditModal}
        onClose={() => setShowRunAuditModal(false)}
        title="Select Target Lead to Audit"
        size="md"
      >
        <div className="space-y-4 text-slate-800 text-xs font-medium">
          {unauditedLeads.length > 0 ? (
            <div className="space-y-3">
              <p className="text-slate-500 font-normal">Choose one of your saved target businesses to perform instant background site checks:</p>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto border border-slate-200 rounded-xl">
                {unauditedLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">{lead.name}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{lead.website}</p>
                    </div>
                    <button
                      onClick={() => handleRunNewAudit(lead.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-brand text-white hover:bg-brand-dark rounded-md font-semibold shadow-xs"
                    >
                      Audit
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-500 font-normal">No pending leads require audit. All saved targets are already analyzed!</p>
              <button
                onClick={() => setShowRunAuditModal(false)}
                className="mt-4 px-3 py-2 bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default WebsiteAudits;
