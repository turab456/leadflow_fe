import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  Bookmark, 
  BookmarkCheck, 
  Phone, 
  Mail, 
  ExternalLink, 
  Calendar, 
  Plus, 
  Check, 
  TrendingUp, 
  Cpu, 
  User, 
  FileText,
  AlertTriangle,
  Sparkles,
  ClipboardList,
  Building2
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PageHeader from '../components/common/PageHeader';
import ScoreBadge from '../components/common/ScoreBadge';

const LeadDetails = ({ leadId, onBack }) => {
  const { leads, toggleSaveLead, runWebsiteAudit, addNoteToLead, addTaskToLead, toggleTaskStatus } = useApp();
  const [noteText, setNoteText] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const lead = leads.find(l => l.id === leadId);

  if (!lead) {
    return (
      <div className="p-12 text-center text-slate-500 font-normal">
        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-warning" />
        <p>Lead record not found or has been deleted.</p>
        <button onClick={onBack} className="mt-4 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 border rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  const isSaved = lead.status === 'Saved';

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNoteToLead(lead.id, noteText);
    setNoteText('');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDueDate) return;
    addTaskToLead(lead.id, taskTitle, taskDueDate);
    setTaskTitle('');
    setTaskDueDate('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title={lead.name} 
        description={`CRM Opportunity Profile • ${lead.industry}`}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={() => toggleSaveLead(lead.id)}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
            isSaved 
              ? 'bg-brand/10 border-brand/20 text-brand' 
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          {isSaved ? "Saved" : "Save Opportunity"}
        </button>

        <button
          onClick={() => {
            runWebsiteAudit(lead.id);
            alert("Audit report generation triggered!");
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg shadow-sm transition-colors"
        >
          <Globe className="w-4 h-4" />
          Run Website Audit
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-800 text-xs font-medium">
        
        {/* Left Column: Business details and Contact info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Section 1: Business Information */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              Business Profile
            </h3>
            
            <div className="space-y-3 font-normal text-slate-600">
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Opportunity Score</span>
                <div className="mt-1">
                  <ScoreBadge score={lead.leadScore} />
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Headquarters</span>
                <span className="text-slate-800 font-semibold">{lead.location}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Company Size</span>
                <span className="text-slate-800 font-semibold">{lead.size}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Estimated Revenue</span>
                <span className="text-slate-800 font-semibold">{lead.revenue || "N/A"}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Website URL</span>
                <a 
                  href={`https://${lead.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand hover:underline font-bold flex items-center gap-0.5 mt-0.5"
                >
                  {lead.website}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">Summary Description</span>
                <p className="mt-1 text-slate-500 leading-relaxed text-[11px]">{lead.description || "No description provided."}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              Contact details
            </h3>
            
            <div className="space-y-3 font-normal text-slate-600">
              {lead.decisionMaker ? (
                <>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Primary Contact</span>
                    <span className="text-slate-800 font-semibold">{lead.decisionMaker.name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Job Title</span>
                    <span className="text-slate-800 font-semibold">{lead.decisionMaker.role}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Direct Email</span>
                    <a href={`mailto:${lead.decisionMaker.email}`} className="text-brand hover:underline font-semibold flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {lead.decisionMaker.email}
                    </a>
                  </div>
                  {lead.decisionMaker.linkedin && (
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase">LinkedIn Profile</span>
                      <a href={`https://${lead.decisionMaker.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold flex items-center gap-1">
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                        LinkedIn URL
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-400 italic">No contact information available.</p>
              )}
              
              <div className="border-t border-slate-100 pt-3 space-y-2 mt-2">
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Corporate Line</span>
                  <p className="flex items-center gap-1 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {lead.phone}
                  </p>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Corporate Email</span>
                  <p className="flex items-center gap-1 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {lead.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Website Audit + AI Insights + CRM Tasks/Notes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 3: Website Audit Summary */}
<div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-6 space-y-5">
  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
    <Globe className="w-4 h-4 text-slate-400" />
    Website Audit Summary
  </h3>

  {lead.audit ? (
    <div className="space-y-4">
      {/* Audit Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Audit Status
        </span>
        <span
          className={`text-xs font-semibold ${
            lead.audit.status === 'Completed'
              ? 'text-green-600'
              : 'text-amber-600'
          }`}
        >
          {lead.audit.status}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
          <span className="block text-[9px] font-bold text-slate-400 uppercase">
            SEO Score
          </span>
          <span className="block mt-1 font-bold text-slate-800 text-sm">
            {lead.audit.seo_score}/100
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
          <span className="block text-[9px] font-bold text-slate-400 uppercase">
            Access.
          </span>
          <span className="block mt-1 font-bold text-slate-800 text-sm">
            {lead.audit.accessibility_score}/100
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
          <span className="block text-[9px] font-bold text-slate-400 uppercase">
            Performance
          </span>
          <span className="block mt-1 font-bold text-slate-800 text-sm">
            {lead.audit.performance_score}/100
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
          <span className="block text-[9px] font-bold text-slate-400 uppercase">
            Load Speed
          </span>
          <span className="block mt-1 font-bold text-slate-800 text-sm">
            {lead.audit.load_speed}
          </span>
        </div>
      </div>

      {/* SSL & Mobile */}
      <div className="grid grid-cols-2 gap-4 text-slate-600">
        <p>
          <span className="font-bold text-slate-700">
            SSL Status:
          </span>{' '}
          <span
            className={
              lead.audit.ssl
                ? 'text-green-600 font-bold'
                : 'text-red-600 font-bold'
            }
          >
            {lead.audit.ssl
              ? 'Secure HTTPS'
              : 'SSL Not Enabled'}
          </span>
        </p>

        <p>
          <span className="font-bold text-slate-700">
            Mobile Friendly:
          </span>{' '}
          <span
            className={
              lead.audit.mobile_responsive
                ? 'text-green-600 font-bold'
                : 'text-red-600 font-bold'
            }
          >
            {lead.audit.mobile_responsive
              ? 'Responsive'
              : 'Not Responsive'}
          </span>
        </p>
      </div>

      {/* Issues */}
      {lead.audit.issues?.length > 0 && (
        <div className="space-y-2 mt-2">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">
            Identified Issues
          </span>

          <ul className="list-disc pl-5 space-y-1 text-slate-500">
            {lead.audit.issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
      <p className="text-slate-400">
        No audit performed on this website yet.
      </p>

      <button
        onClick={() => runWebsiteAudit(lead.id)}
        className="mt-3 px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
      >
        Run Audit Scan
      </button>
    </div>
  )}
</div>

          {/* Double column lower details: Tasks & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Notes Section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5 flex flex-col justify-between h-fit">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">Notes & Reminders</h3>
                
                {/* Note Logger Form */}
                <form onSubmit={handleAddNote} className="mb-4">
                  <textarea
                    rows={2}
                    placeholder="Log conversation details or update info..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-[10px]"
                  >
                    Save Note
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {lead.notes && lead.notes.length > 0 ? (
                    lead.notes.map((note) => (
                      <div key={note.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg font-normal text-slate-600">
                        <p className="leading-relaxed text-[10px]">{note.text}</p>
                        <div className="flex justify-between items-center mt-2 text-[9px] text-slate-400 font-semibold">
                          <span>{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 italic text-center py-4">No notes created.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5 flex flex-col justify-between h-fit">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
                  <span>CRM Task Reminders</span>
                  <ClipboardList className="w-4 h-4 text-slate-400" />
                </h3>
                
                {/* Task Form */}
                <form onSubmit={handleAddTask} className="mb-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Task details (e.g. Schedule call)..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full text-[10px] bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
                  />
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full text-[10px] bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
                  />
                  <button
                    type="submit"
                    className="w-full py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-[10px]"
                  >
                    Add Task
                  </button>
                </form>

                {/* Tasks list checkbox */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {lead.tasks && lead.tasks.length > 0 ? (
                    lead.tasks.map((task) => {
                      const isDone = task.status === 'Completed';
                      return (
                        <div 
                          key={task.id} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md cursor-pointer"
                          onClick={() => toggleTaskStatus(lead.id, task.id)}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}} // Controlled by outer click
                            className="rounded border-slate-300 text-brand focus:ring-brand h-3.5 w-3.5"
                          />
                          <div className="min-w-0 flex-1 font-normal text-xs text-slate-600">
                            <p className={`truncate leading-tight ${isDone ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                              {task.title}
                            </p>
                            <span className="text-[9px] text-slate-400 font-semibold">Due: {task.dueDate}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-slate-400 italic text-center py-4">No tasks pending.</p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Section 5: Activity Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Lead Activity History</h3>
            <div className="relative pl-5 space-y-4 before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-0.5 before:bg-slate-200">
              {lead.activities && lead.activities.length > 0 ? (
                lead.activities.map((act) => (
                  <div key={act.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-7 top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white ring-4 ring-white bg-slate-100 text-[9px] font-bold text-slate-500">
                      &bull;
                    </span>
                    <div className="text-xs font-normal">
                      <p className="font-semibold text-slate-700">{act.description}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{new Date(act.date).toLocaleDateString()} {new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic text-center py-2">No activity timeline recorded.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LeadDetails;
