import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Key, 
  Mail, 
  CreditCard, 
  Shield, 
  Plus, 
  Copy, 
  Check, 
  Trash2,
  Lock
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useOnboarding } from '../hooks/useOnboarding';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { resetOnboarding } = useOnboarding();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [copiedKey, setCopiedKey] = useState(null);
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 'k_1', name: 'Apollo Integration SDK', value: 'lf_live_9a72b8c9d0e1f2a3', created: '2026-06-01' },
    { id: 'k_2', name: 'Zapier Webhook Lead Sync', value: 'lf_live_0f9e8d7c6b5a4a3b', created: '2026-06-15' }
  ]);

  const handleCopy = (keyVal, id) => {
    navigator.clipboard.writeText(keyVal);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateKey = () => {
    const name = prompt("Enter a description for the new API Key:");
    if (!name) return;
    const randomHex = Math.random().toString(16).substr(2, 16);
    const newKey = {
      id: `k_${Date.now()}`,
      name,
      value: `lf_live_${randomHex}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleDeleteKey = (id) => {
    if (confirm("Are you sure you want to revoke this API key? Integrations relying on it will break.")) {
      setApiKeys(apiKeys.filter(k => k.id !== id));
    }
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'workspace', label: 'Workspace Info', icon: Building2 },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'api', label: 'Developer API Keys', icon: Key },
    { id: 'email', label: 'Email Integrations', icon: Mail },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
    { id: 'security', label: 'Security & Auth', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings & Workspace" 
        description="Configure your user account, edit workspace collaborations, register email SMTP pipelines, manage subscriptions, and generate API tokens."
      />

      <div className="flex flex-col lg:flex-row gap-6 text-slate-800 text-xs font-medium">
        {/* Left Side menu selectors */}
        <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-200 rounded-xl shadow-subtle p-3 h-fit space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center w-full gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
                `}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Side Settings Panels */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-subtle p-6 min-h-[400px]">
          
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">My Profile</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                  AR
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{user?.name || 'Alex Rivera'}</h4>
                  <p className="text-slate-400 font-normal text-[10px]">{user?.email || 'alex@leadflow.io'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">First Name</label>
                  <input type="text" defaultValue="Alex" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">Last Name</label>
                  <input type="text" defaultValue="Rivera" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">Email Address</label>
                  <input type="email" defaultValue={user?.email || 'alex@leadflow.io'} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">Role Name</label>
                  <input type="text" defaultValue="Operations Lead" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
              </div>
              
              <button 
                onClick={() => alert("Profile configurations saved.")}
                className="mt-4 px-4 py-2 bg-brand text-white hover:bg-brand-dark rounded-lg font-bold shadow-xs transition-colors"
              >
                Save Profile
              </button>

              <div className="border-t border-slate-100 pt-5 mt-5">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-slate-400">Workspace Guide</h4>
                <p className="text-[10px] text-slate-500 font-normal mb-3">If you need to review the product walkthrough and onboarding tour checklist, you can restart it here.</p>
                <button 
                  onClick={() => {
                    resetOnboarding();
                    alert("Onboarding data reset! Use the left sidebar to navigate and the floating checklist to track tasks.");
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-xs transition-colors"
                >
                  Restart Onboarding Tour
                </button>
              </div>
            </div>
          )}

          {/* Workspace Section */}
          {activeSection === 'workspace' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Workspace Configurations</h3>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 font-semibold">Workspace Name</label>
                <input type="text" defaultValue="Alex Rivera Personal Workspace" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
              </div>

              {/* Members mock */}
              <div className="space-y-3 mt-4">
                <h4 className="font-bold text-slate-700">Team Collaborators</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <p className="font-bold text-slate-800">Alex Rivera (You)</p>
                      <p className="text-[10px] text-slate-400 font-normal">alex@leadflow.io</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-full">Owner</span>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <p className="font-bold text-slate-800">Sarah Jenkins</p>
                      <p className="text-[10px] text-slate-400 font-normal">sarah@leadflow.io</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Editor</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="max-w-sm">
                    <h4 className="font-bold text-slate-700">Daily Digest Email</h4>
                    <p className="text-slate-400 font-normal text-[10px] mt-0.5">Receive summary digest reports of lead scores, new discoveries, and outreach replies.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4" />
                </div>

                <div className="flex items-start justify-between pt-4 border-t border-slate-100">
                  <div className="max-w-sm">
                    <h4 className="font-bold text-slate-700">Instant Alert Push</h4>
                    <p className="text-slate-400 font-normal text-[10px] mt-0.5">Trigger dashboard notifications immediately whenever a lead replies or an audit fails.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4" />
                </div>
              </div>
            </div>
          )}

          {/* API Keys Developer Section */}
          {activeSection === 'api' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Developer API Integrations</h3>
                <button
                  onClick={handleGenerateKey}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-bold text-[10px] shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Generate Key
                </button>
              </div>

              <div className="space-y-3">
                {apiKeys.length > 0 ? (
                  apiKeys.map((key) => (
                    <div key={key.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-slate-700">{key.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <code className="font-mono text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded text-[11px] font-bold">
                            {key.value}
                          </code>
                          <button
                            onClick={() => handleCopy(key.value, key.id)}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500"
                            title="Copy to clipboard"
                          >
                            {copiedKey === key.id ? <Check className="w-3.5 h-3.5 text-success-dark" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-normal mt-1">Created: {key.created}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-error hover:bg-error/5 hover:border-error/20"
                        title="Revoke API Key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 font-normal italic">No active API keys created.</p>
                )}
              </div>
            </div>
          )}

          {/* Email Integration Section */}
          {activeSection === 'email' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Email SMTP Integration</h3>
              <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center space-y-3">
                <Mail className="w-8 h-8 text-slate-400 mx-auto stroke-1" />
                <div>
                  <h4 className="font-bold text-slate-800">Connect Google Workspace or SMTP</h4>
                  <p className="text-slate-500 font-normal text-[10px] mt-0.5">Integrate SMTP routing servers to send high-delivery outreach emails from your domain name.</p>
                </div>
                <button
                  onClick={() => alert("Redirecting to SMTP Provider integration portal...")}
                  className="px-3 py-1.5 bg-brand text-white hover:bg-brand-dark rounded-md font-bold shadow-xs"
                >
                  Configure SMTP Server
                </button>
              </div>
            </div>
          )}

          {/* Plan and Billing Section */}
          {activeSection === 'billing' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Subscription Details</h3>
              
              <div className="p-5 border border-brand/20 bg-brand/5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider bg-white border border-brand/20 px-2 py-0.5 rounded-full">Current Plan</span>
                  <h4 className="text-base font-bold text-slate-800 mt-2">LeadFlow Pro Growth Plan</h4>
                  <p className="text-slate-500 font-normal text-[10px] mt-0.5">Includes 1,000 automated website audits/mo and unlimited email outreach campaigns.</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xl font-bold text-slate-800">$99</span>
                  <span className="text-slate-400 font-normal text-[10px]"> / month</span>
                  <p className="text-[10px] text-slate-400 font-normal mt-1">Next invoice: July 15, 2026</p>
                </div>
              </div>

              {/* Invoices mock list */}
              <div className="space-y-3 mt-4">
                <h4 className="font-bold text-slate-700">Billing History</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg text-[11px] font-normal text-slate-600">
                  <div className="flex justify-between items-center p-3">
                    <span>June 15, 2026</span>
                    <span className="font-bold text-slate-700">$99.00</span>
                    <span className="text-success-dark font-bold">Paid</span>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <span>May 15, 2026</span>
                    <span className="font-bold text-slate-700">$99.00</span>
                    <span className="text-success-dark font-bold">Paid</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security & Password reset */}
          {activeSection === 'security' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">Current Password</label>
                  <input type="password" placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">New Password</label>
                  <input type="password" placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 font-semibold">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand font-medium text-slate-800" />
                </div>
              </div>

              <button 
                onClick={() => alert("Password modified successfully.")}
                className="mt-4 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-bold shadow-xs transition-colors"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
