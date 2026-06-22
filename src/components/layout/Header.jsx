import React, { useState } from 'react';
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle,
  Inbox
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuToggle, currentTab, setCurrentTab }) => {
  const { globalSearch, setGlobalSearch, notifications, markAllNotificationsRead } = useApp();
  console.log(globalSearch, "globalSearch")
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications?.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    markAllNotificationsRead();
  };

  const formatTabName = (tab) => {
    if (tab === 'saved') return 'Saved Leads';
    if (tab === 'audits') return 'Website Audits';
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200 shadow-sm md:px-6">
      {/* Left section: mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden items-center gap-1.5 text-sm text-slate-500 md:flex">
          <span className="font-medium text-slate-400">LeadFlow</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-700">{formatTabName(currentTab)}</span>
        </div>
      </div>

      {/* Middle section: Global search */}
      <div className="flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, domains, or industries..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right section: notification and user dropdown */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-dropdown z-20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                  <span className="text-xs font-bold text-slate-700">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[10px] font-semibold text-brand hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 text-xs transition-colors hover:bg-slate-50 ${!n.read ? 'bg-brand/5 font-medium' : ''}`}
                      >
                        <p className="text-slate-700 leading-snug">{n.text}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-400">
                      <Inbox className="w-8 h-8 mx-auto stroke-1 mb-1.5" />
                      <p className="text-xs">No notifications yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
              AR
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-dropdown z-20 py-1">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">Alex Rivera</p>
                  <p className="text-[10px] text-slate-400 truncate">alex@leadflow.io</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-3.5 h-3.5" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Settings
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-xs text-error hover:bg-error/5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
