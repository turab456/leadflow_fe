import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Bookmark, 
  Globe, 
  Mail, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  X,
  TrendingUp
} from 'lucide-react';

const Sidebar = ({ currentTab, setCurrentTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Lead Search', icon: Search },
    { id: 'saved', label: 'Saved Leads', icon: Bookmark },
    { id: 'audits', label: 'Website Audits', icon: Globe },
    { id: 'campaigns', label: 'Campaigns', icon: Mail, isLocked: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800
        transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-white shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              Lead<span className="text-brand">Flow</span>
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`tour-${item.id}-nav`}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false); // Close on mobile navigation
                }}
                className={`
                  flex items-center w-full gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-brand text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.isLocked && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand/20 text-brand border border-brand/35">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800">
          <div className="space-y-1">
            <button 
              onClick={() => {
                alert("LeadFlow v1.0.0 Help Center.\nDocumentation, API schemas, and support resources.");
              }}
              className="flex items-center w-full gap-3 px-4 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
          </div>
          
          {/* Workspace Info Card */}
          <div className="flex items-center gap-3 p-3 mt-4 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-xs font-semibold text-white">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Alex Rivera</p>
              <p className="text-[10px] text-slate-400 truncate">Workspace: Personal</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
