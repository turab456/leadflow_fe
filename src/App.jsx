import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { WelcomeModal } from './components/onboarding/WelcomeModal';
import { TourProvider } from './components/onboarding/TourProvider';
import { CompletionModal } from './components/onboarding/CompletionModal';
import { ChecklistWidget } from './components/onboarding/ChecklistWidget';

// Pages
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import LeadSearch from './pages/LeadSearch';
import SavedLeads from './pages/SavedLeads';
import WebsiteAudits from './pages/WebsiteAudits';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import LeadDetails from './pages/LeadDetails';

const AppContent = () => {
  const { user, authReady } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState(null);
  const [previousTab, setPreviousTab] = useState('dashboard');

  const handleViewLead = (leadId) => {
    setPreviousTab(currentTab);
    setActiveLeadId(leadId);
  };

  const handleCloseLeadDetail = () => {
    setActiveLeadId(null);
    setCurrentTab(previousTab);
  };

  const renderContent = () => {
    // If a lead is being inspected, override rendering to show the CRM Lead Details Page!
    if (activeLeadId) {
      return (
        <LeadDetails 
          leadId={activeLeadId} 
          onBack={handleCloseLeadDetail} 
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        return <Dashboard setCurrentTab={setCurrentTab} />;
      case 'search':
        return <LeadSearch onViewLead={handleViewLead} />;
      case 'saved':
        return <SavedLeads onViewLead={handleViewLead} setCurrentTab={setCurrentTab} />;
      case 'audits':
        return <WebsiteAudits />;
      case 'campaigns':
      case 'email-generator':
        return <Campaigns />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setCurrentTab={setCurrentTab} />;
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm font-medium">
        Loading authentication...
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => setCurrentTab('dashboard')} />;
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Sidebar Navigation */}
        <Sidebar 
          currentTab={activeLeadId ? 'search' : currentTab} 
          setCurrentTab={(tab) => {
            setActiveLeadId(null);
            setCurrentTab(tab);
          }}
          isOpen={mobileSidebarOpen}
          setIsOpen={setMobileSidebarOpen}
        />

        {/* Main content body wrapper */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          
          {/* Header toolbar */}
          <Header 
            onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
            currentTab={activeLeadId ? 'Lead Profile' : currentTab}
            setCurrentTab={(tab) => {
              setActiveLeadId(null);
              setCurrentTab(tab);
            }}
          />

          {/* Scrollable workspace viewport */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {renderContent()}
            </div>
          </main>

        </div>
      </div>
      <WelcomeModal />
      <TourProvider />
      <CompletionModal />
      <ChecklistWidget />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <OnboardingProvider>
          <AppContent />
        </OnboardingProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
