import React, { useState } from "react";
import {
  Bookmark,
  LayoutGrid,
  List,
  Search,
  Mail,
  Globe,
  Trash2,
  ExternalLink,
  ChevronRight,
  Download,
  Play,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import ScoreBadge from "../components/common/ScoreBadge";

const SavedLeads = ({ onViewLead, setCurrentTab }) => {
  const { leads, toggleSaveLead, runWebsiteAudit, auditingLeadIds } = useApp();
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");

  // Filter leads that are Saved
  const savedLeads = leads.filter(
    (l) =>
      l.status === "Saved" &&
      (l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.website.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleBulkAction = (actionType) => {
    if (savedLeads.length === 0) return;

    if (actionType === "export") {
      alert(`Exporting ${savedLeads.length} leads in CSV format.`);
    } else if (actionType === "audit") {
      savedLeads.forEach((l) => {
        if (!l.audit) {
          runWebsiteAudit(l.id);
        }
      });
      alert(`Bulk website audit triggered for pending websites.`);
    } else if (actionType === "outreach") {
      setCurrentTab("campaigns");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Leads Pipeline"
        description="Manage qualified business opportunities, track audit status, organize tags, and trigger outreach workflows."
      >
        {savedLeads.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("export")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => handleBulkAction("audit")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Audit Pending
            </button>
            <button
              onClick={() => handleBulkAction("outreach")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Create outreach
            </button>
          </div>
        )}
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-subtle">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand focus:bg-white font-medium"
          />
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg border transition-colors ${
              viewMode === "grid"
                ? "bg-slate-100 border-slate-300 text-slate-800"
                : "bg-white border-slate-200 text-slate-400 hover:text-slate-700"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg border transition-colors ${
              viewMode === "list"
                ? "bg-slate-100 border-slate-300 text-slate-800"
                : "bg-white border-slate-200 text-slate-400 hover:text-slate-700"
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {savedLeads.length > 0 ? (
        viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white border border-slate-200 rounded-xl shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {lead.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-normal">
                        {lead.location} &bull; {lead.size}
                      </p>
                    </div>
                    {/* <ScoreBadge score={lead.leadScore} size="sm" /> */}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-md">
                      {lead.industry}
                    </span>
                    {lead.tags?.map((t) => (
                      <span
                        key={t}
                        className="inline-flex px-2 py-0.5 text-[10px] font-semibold text-brand bg-brand/5 border border-brand/10 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500 font-normal">
                    <div className="flex justify-between">
                      <span>Website:</span>
                      <a
                        href={`https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline flex items-center gap-1 font-medium max-w-[180px]"
                        title={lead.website}
                      >
                        <span className="truncate">{lead.website}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span>Audit Status:</span>

                      {auditingLeadIds.includes(lead.id) ? (
                        <span className="flex items-center gap-2 text-blue-600 font-semibold">
                          <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin" />
                          Auditing...
                        </span>
                      ) : (
                        <span
                          className={`font-semibold ${
                            lead.audit?.status === "Completed"
                              ? "text-success-dark"
                              : "text-slate-500"
                          }`}
                        >
                          {lead.audit?.status || "Not Audited"}
                        </span>
                      )}
                    </div>
                    {lead.audit && (
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2 mt-2 text-center text-[10px]">
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">
                            SEO
                          </span>
                          <span className="font-bold text-slate-700">
                            {lead.audit.seo_score}
                            /100
                          </span>
                        </div>
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">
                            Access.
                          </span>
                          <span className="font-bold text-slate-700">
                            {lead.audit.accessibility_score}
                            /100
                          </span>
                        </div>
                        <div>
                          <span className="block text-slate-400 font-semibold mb-0.5">
                            Speed
                          </span>
                          <span className="font-bold text-slate-700">
                            {lead.audit.load_speed}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
                  <button
                    onClick={() => onViewLead(lead.id)}
                    className="text-xs font-bold text-slate-600 hover:text-brand flex items-center gap-0.5 transition-colors"
                  >
                    View CRM Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={auditingLeadIds.includes(lead.id)}
                      onClick={() => runWebsiteAudit(lead.id)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                      title="Run Audit"
                    >
                      {auditingLeadIds.includes(lead.id) ? (
                        <div className="w-3.5 h-3.5 border border-slate-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSaveLead(lead.id)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-error hover:bg-error/5 hover:border-error/20"
                      title="Delete from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-subtle">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Business Name</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Website</th>
                  <th className="px-6 py-4">Audited</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {savedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {lead.name}
                        </p>
                        <p className="text-xs text-slate-400 font-normal">
                          {lead.location}
                        </p>
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
                      >
                        {lead.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium ${
                          lead.audit?.status === "Completed"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {lead.audit?.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewLead(lead.id)}
                          className="px-2.5 py-1.5 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          CRM Panel
                        </button>
                        <button
                          onClick={() => toggleSaveLead(lead.id)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-error hover:bg-error/5 hover:border-error/20"
                          title="Remove Saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <EmptyState
          title="Your pipeline is empty"
          description="Click on 'Lead Search' to query and save target business records into your pipelines."
          actionText="Search Leads Now"
          onAction={() => setCurrentTab("search")}
          icon={Bookmark}
        />
      )}
    </div>
  );
};

export default SavedLeads;
