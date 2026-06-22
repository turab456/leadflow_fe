import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';

const OnboardingContext = createContext(undefined);

export const OnboardingProvider = ({ children }) => {
  const { leads, audits, campaigns, globalSearch } = useApp();

  // Keep track of initial states on boot to only trigger completion for new actions
  const [initialSavedIds] = useState(() => leads?.filter(l => l.status === 'Saved').map(l => l.id));
  const [initialAuditCount] = useState(() => audits.length);
  const [initialCampaignCount] = useState(() => campaigns.length);
  const [initialRunningCount] = useState(() => campaigns?.filter(c => c.status === 'Running').length);
  // 1. Load Initial State from localStorage
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('onboarding_completed') === 'true';
  });

  const [onboardingStarted, setOnboardingStarted] = useState(() => {
    return localStorage.getItem('onboarding_started') === 'true';
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('completed_tasks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedGoal, setSelectedGoal] = useState(() => {
    return localStorage.getItem('onboarding_goal') || null;
  });

  // Tour State
  const [runTour, setRunTour] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  // Welcome Modal / Completion Modal states
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Check onboarding status on boot
  useEffect(() => {
    if (!onboardingCompleted) {
      if (!onboardingStarted) {
        // First-time user, trigger Welcome Modal
        setShowWelcome(true);
      } else {
        // Started but not completed, check if tour was running or needs auto-run
        // We run the tour if they started but haven't finished
        setRunTour(true);
      }
    }
  }, [onboardingCompleted, onboardingStarted]);

  // 1. Search Lead Task Observer
  useEffect(() => {
    if (globalSearch && globalSearch.trim().length > 0) {
      completeTask('search_lead', 'Search First Lead');
    }
  }, [globalSearch]);

  // // 2. Save Lead Task Observer
  // useEffect(() => {
  //   const currentSaved = leads?.filter(l => l.status === 'Saved').map(l => l.id);
  //   const newlySaved = currentSaved?.filter(id => !initialSavedIds.includes(id));
  //   if (newlySaved?.length > 0) {
  //     completeTask('save_lead', 'Save First Lead');
  //   }
  // }, [leads, initialSavedIds]);

  // 3. Run Audit Task Observer
  useEffect(() => {
    if (audits?.length > initialAuditCount) {
      completeTask('run_audit', 'Run First Audit');
    }
  }, [audits, initialAuditCount]);

  // 4. Create Campaign Task Observer
  useEffect(() => {
    if (campaigns?.length > initialCampaignCount) {
      completeTask('create_campaign', 'Create Campaign');
    }
  }, [campaigns, initialCampaignCount]);

  // 5. Send Outreach Task Observer
  useEffect(() => {
    const runningCount = campaigns?.filter(c => c.status === 'Running').length;
    if (runningCount > initialRunningCount) {
      completeTask('send_outreach', 'Send First Outreach');
    }
  }, [campaigns, initialRunningCount]);

  // Synchronizers to localStorage
  const saveCompletedTasks = (tasks) => {
    setCompletedTasks(tasks);
    localStorage.setItem('completed_tasks', JSON.stringify(tasks));
  };

  const handleStartOnboarding = (goal) => {
    localStorage.setItem('onboarding_started', 'true');
    localStorage.setItem('onboarding_goal', goal);
    setOnboardingStarted(true);
    setSelectedGoal(goal);
    setShowWelcome(false);

    // Auto start the tour
    setRunTour(true);
    setTourStepIndex(0);

    showToast("Setup Started", `Workspace optimized for goal: ${goal}`, "success");
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem('onboarding_started', 'true');
    localStorage.setItem('onboarding_completed', 'true');
    setOnboardingStarted(true);
    setOnboardingCompleted(true);
    setShowWelcome(false);
    setRunTour(false);
    showToast("Onboarding Skipped", "You can restart the tour from Settings.", "info");
  };

  const completeTask = (taskId, taskLabel) => {
    if (onboardingCompleted) return;

    setCompletedTasks((prev) => {
      if (prev.includes(taskId)) return prev;
      const nextTasks = [...prev, taskId];
      localStorage.setItem('completed_tasks', JSON.stringify(nextTasks));

      // Trigger Shadcn-like Toast
      showToast(`${taskLabel} Completed!`, "Onboarding progress updated.", "success");

      // Check if all 5 onboarding tasks are completed
      // Tasks: search_lead, save_lead, run_audit, create_campaign, send_outreach
      const required = ['search_lead', 'save_lead', 'run_audit'];
      const allCompleted = required.every(t => nextTasks.includes(t));

      if (allCompleted) {
        setTimeout(() => {
          setShowCompletion(true);
        }, 1000);
      }

      return nextTasks;
    });
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setOnboardingCompleted(true);
    setShowCompletion(false);
    setRunTour(false);
    showToast("Onboarding Complete", "Workspace setup successfully finalized!", "success");
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('onboarding_started');
    localStorage.removeItem('completed_tasks');
    localStorage.removeItem('onboarding_goal');

    setOnboardingCompleted(false);
    setOnboardingStarted(true); // set true so welcome modal is skipped and tour starts directly or vice-versa. Wait! Let's show welcome modal again on manual restart!
    setCompletedTasks([]);
    setSelectedGoal(null);

    // Reset and trigger welcome modal
    setShowWelcome(true);
    setRunTour(false);
    setTourStepIndex(0);
    setShowCompletion(false);
  };

  // Toast Management
  const showToast = (title, description, type = "success") => {
    const id = `toast_${Date.now()}`;
    const newToast = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <OnboardingContext.Provider value={{
      onboardingCompleted,
      onboardingStarted,
      completedTasks,
      selectedGoal,
      runTour,
      setRunTour,
      tourStepIndex,
      setTourStepIndex,
      showWelcome,
      setShowWelcome,
      showCompletion,
      setShowCompletion,
      toasts,
      showToast,
      dismissToast,
      startOnboarding: handleStartOnboarding,
      skipOnboarding: handleSkipOnboarding,
      completeTask,
      completeOnboarding,
      resetOnboarding
    }}>
      {children}

      {/* Floating Toast Notification Area (mimics Shadcn Toast Viewport) */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              pointer-events-auto flex flex-col p-4 rounded-xl border shadow-lg bg-white transition-all duration-300 transform translate-y-0
              ${t.type === 'success' ? 'border-success/30 bg-success-light/10 text-slate-800' : ''}
              ${t.type === 'info' ? 'border-brand/20 bg-brand-subtle text-slate-800' : ''}
              ${t.type === 'warning' ? 'border-warning/30 bg-warning-light/10 text-slate-800' : ''}
            `}
          >
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-slate-900">{t.title}</p>
              <button
                onClick={() => dismissToast(t.id)}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-bold ml-3"
              >
                ✕
              </button>
            </div>
            {t.description && (
              <p className="text-[10px] text-slate-500 font-normal mt-1 leading-snug">{t.description}</p>
            )}
          </div>
        ))}
      </div>
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
