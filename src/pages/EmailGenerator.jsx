import React, { useState } from 'react';
import { Mail, Sparkles, Copy, Check, Eye, Edit3, ArrowLeft, ArrowRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const EmailGenerator = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: 'LeadFlow Performance Promo',
    serviceType: 'Core Web Vitals Optimization',
    tone: 'Professional / Data-driven',
    audience: 'Mid-sized E-commerce Owners'
  });

  const [generated, setGenerated] = useState({
    subject: 'Improving website conversion rate on {{website}}',
    body: 'Hi {{decisionMaker.name}},\n\nI was looking at {{name}} and noticed that your homepage takes {{auditSummary.loadSpeed}} to load. According to Google\'s Lighthouse data, this could be driving away up to 15-20% of your potential sales.\n\nOur team specializes in optimizing performance for {{industry}} businesses. We\'ve helped platforms like yours improve load times by over 50%.\n\nBest regards,\n\n[Your Name]\nLeadFlow Operations'
  });

  const [isPreview, setIsPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      let subject = '';
      let body = '';

      if (formData.serviceType === 'Core Web Vitals Optimization') {
        subject = `Improving page load speed for {{website}}`;
        body = `Hi {{decisionMaker.name}},\n\nI was reviewing {{website}} and noticed that your mobile performance score is {{auditSummary.performanceScore}}/100, taking {{auditSummary.loadSpeed}} to load.\n\nWith ${formData.tone.toLowerCase()} strategies, we help ${formData.audience} businesses improve core web vitals and increase mobile organic conversions.\n\nWould you be open to a 10-minute audit review?\n\nBest regards,\n\n[Your Name]`;
      } else if (formData.serviceType === 'ADA Accessibility Remediation') {
        subject = `Accessibility compliance issues detected on {{website}}`;
        body = `Hi {{decisionMaker.name}},\n\nI conducted an automated ADA review on {{website}} and found that your accessibility score is {{auditSummary.accessibility}}/100.\n\nFailing WCAG guidelines risks compliance penalties and locks out customers. We offer custom accessibility remediation targeting your audience (${formData.audience}).\n\nLet me know if you would like to see a compliance review.\n\nSincerely,\n\n[Your Name]`;
      } else if (formData.serviceType === 'SSL Setup & Security Audit') {
        subject = `Urgent: Security Warning configuration on {{website}}`;
        body = `Hi {{decisionMaker.name}},\n\nI noticed that {{website}} contains some insecure protocol warnings (missing SSL settings).\n\nModern browsers flag these to your audience (${formData.audience}), causing high bounce rates. We can secure this setup in under 2 hours.\n\nBest,\n\n[Your Name]`;
      } else {
        subject = `Outranking local competitors for {{name}}`;
        body = `Hi {{decisionMaker.name}},\n\nI noticed that {{name}} is missing local schema tags on {{website}}.\n\nBy adding localized microdata, we help businesses like yours stand out in geographical searches. Let me know if you'd like a schema mockup.\n\nCheers,\n\n[Your Name]`;
      }

      setGenerated({ subject, body });
      setGenerating(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${generated.subject}\n\n${generated.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Outreach Email Builder" 
        description="Craft personalized cold email copy using predefined service packages, custom tones, and targeted audiences."
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-slate-800 text-xs font-medium">
        {/* Editor Form Panel */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-6 space-y-5">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Email Copy Parameters</h3>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 font-semibold">Campaign Reference Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-700"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 font-semibold">Pitch Service Type</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-bold text-slate-700"
              >
                <option value="Core Web Vitals Optimization">Core Web Vitals Optimization</option>
                <option value="ADA Accessibility Remediation">ADA Accessibility Remediation</option>
                <option value="SSL Setup & Security Audit">SSL Setup & Security Audit</option>
                <option value="Local SEO Schema Audit & Inject">Local SEO Schema & Listings</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 font-semibold">Tone of Communication</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-bold text-slate-700"
              >
                <option value="Professional / Data-driven">Professional / Data-driven</option>
                <option value="Helpful / Informative">Helpful / Informative</option>
                <option value="Urgent / Security Warnings">Urgent / Security Warnings</option>
                <option value="Friendly / Local SEO Partner">Friendly / Local SEO Partner</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 font-semibold">Audience Description</label>
              <input
                type="text"
                required
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brand text-white hover:bg-brand-dark rounded-lg shadow-sm font-bold text-xs transition-colors mt-6 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              {generating ? 'Compiling copy...' : 'Compile Outreach Template'}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-subtle p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">Generated Email Template</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg font-bold text-[10px] text-slate-600 transition-colors"
                >
                  {isPreview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {isPreview ? 'Editor view' : 'Client preview'}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-[10px] text-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-success-dark" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {isPreview ? (
              /* Preview Mode Envelope rendering */
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white font-normal text-slate-600">
                <div className="bg-slate-50 p-4 border-b border-slate-100 space-y-1">
                  <p className="text-[11px]"><span className="font-semibold text-slate-400">To:</span> contact@clientbusiness.com</p>
                  <p className="text-[11px]"><span className="font-semibold text-slate-400">From:</span> operations@youragency.com</p>
                  <p className="text-[11px]"><span className="font-semibold text-slate-400">Subject:</span> {generated.subject}</p>
                </div>
                <div className="p-5 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                  {generated.body}
                </div>
              </div>
            ) : (
              /* Normal view with fields */
              <div className="space-y-4 font-normal text-slate-600">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</span>
                  <input
                    type="text"
                    value={generated.subject}
                    onChange={(e) => setGenerated({ ...generated, subject: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Body</span>
                  <textarea
                    rows={8}
                    value={generated.body}
                    onChange={(e) => setGenerated({ ...generated, body: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand font-mono text-[11px] text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-3 bg-brand/5 border border-brand/10 rounded-xl flex items-start gap-2.5 text-slate-600 font-normal">
            <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Placeholders like <code className="font-mono text-[10px] bg-white border border-slate-200 px-1 rounded">&#123;&#123;website&#125;&#125;</code> and <code className="font-mono text-[10px] bg-white border border-slate-200 px-1 rounded">&#123;&#123;auditSummary.loadSpeed&#125;&#125;</code> will dynamically swap during campaign launches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
