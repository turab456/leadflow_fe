import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getLeads as fetchLeads,
  getOuterLeads as fetchOuterLeads,
  createLead as createLeadApi,
  saveLead as saveLeadApi,
  deleteLead as deleteLeadApi,
} from "../api/leads.js";
import { createNoteForLead as createNoteApi } from "../api/notes.js";
import {
  createTaskForLead as createTaskApi,
  updateTask as updateTaskApi,
} from "../api/tasks.js";
import {
  getAudits as fetchAudits,
  createAudit as createAuditApi,
} from "../api/audits.js";
import { getActivities as fetchActivities } from "../api/activities.js";
import {
  getNotifications as fetchNotifications,
  markNotificationRead as markNotificationReadApi,
} from "../api/notifications.js";
import {
  getCampaigns as fetchCampaigns,
  createCampaign as createCampaignApi,
  updateCampaign as updateCampaignApi,
  startCampaign as startCampaignApi,
} from "../api/campaigns.js";
import {
  getOnboardingProgress,
  updateOnboardingProgress,
} from "../api/onboarding.js";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [outerLeads, setOuterLeads] = useState([]);
  const [audits, setAudits] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [kpis, setKpis] = useState({
    totalLeads: 0,
    savedLeads: 0,
    auditsCompleted: 0,
    campaignsSent: 0,
    responseRate: 0,
  });
  const [onboardingProgress, setOnboardingProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchingLeads, setIsSearchingLeads] = useState(false);
  const [auditingLeadIds, setAuditingLeadIds] = useState([]);
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [
          leadsResult,
          auditsResult,
          campaignsResult,
          activitiesResult,
          notificationsResult,
          onboardingResult,
        ] = await Promise.all([
          // fetchOuterLeads(),
          fetchLeads(),
          fetchAudits(),
          Promise.resolve([]),
          fetchActivities(),
          fetchNotifications(),
          getOnboardingProgress(),
        ]);
        // setOuterLeads(outerLeadsResult?.outerLeads || outerLeadsResult || [])
        setLeads(leadsResult?.leads || leadsResult || []);
        setAudits(auditsResult?.audits || auditsResult || []);
        setCampaigns(campaignsResult?.campaigns || campaignsResult || []);
        setActivities(activitiesResult?.activities || activitiesResult || []);
        setNotifications(
          notificationsResult?.notifications || notificationsResult || [],
        );
        setOnboardingProgress(onboardingResult || null);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const saved = leads?.filter((l) => l.status === "Saved").length;
    const completedAudits = audits.filter(
      (a) => a.status === "Completed",
    ).length;
    const sentCampaignsCount = campaigns.filter(
      (c) => c.status === "Running" || c.status === "Completed",
    ).length;

    const campaignsWithSent = campaigns.filter((c) => c.sentCount > 0);
    const totalSent = campaignsWithSent.reduce(
      (acc, c) => acc + c.sentCount,
      0,
    );
    const totalReplies = campaignsWithSent.reduce(
      (acc, c) => acc + c.repliedCount,
      0,
    );
    const responseRate =
      totalSent > 0
        ? parseFloat(((totalReplies / totalSent) * 100).toFixed(1))
        : 0;
    setKpis({
      totalLeads: leads.length || 0,
      savedLeads: saved || 0,
      auditsCompleted: completedAudits,
      campaignsSent: sentCampaignsCount,
      responseRate,
    });
  }, [leads, audits, campaigns]);

  const toggleSaveLead = async (lead) => {
    try {
      const isSaved = !!lead.id;

      if (isSaved) {
        await deleteLeadApi(lead.id);
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
        setOuterLeads((prev) =>
          prev.map((l) =>
            l.place_id === lead.place_id
              ? { ...l, id: null, status: "Discovered" }
              : l,
          ),
        );

        logActivity("lead", `Un-saved lead ${lead.name}.`);
      } else {
        const savedLead = await saveLeadApi({
          place_id: lead.place_id,
          name: lead.name,
          website: lead.website,
          phone: lead.phone || null,
          location: lead.location,
          industry: lead.industry || null,
          business_status: lead.business_status,
          maps_url: lead.maps_url || null,
        });
        setLeads((prev) => [savedLead, ...prev]);

        setOuterLeads((prev) =>
          prev.map((l) =>
            l.place_id === lead.place_id
              ? {
                  ...l,
                  ...savedLead,
                  status: "Saved",
                }
              : l,
          ),
        );

        logActivity("lead", `Saved lead ${lead.name}.`);
      }
    } catch (error) {
      console.error("Unable to save/unsave lead", error);
    }
  };

  const addLead = async (newLead) => {
    try {
      const createdLead = await createLeadApi({
        ...newLead,
        status: "Discovered",
        website_status: "Needs Audit",
      });
      setLeads((prev) => [createdLead, ...prev]);
      logActivity("lead", `Discovered new lead: ${createdLead.name}`);
      return createdLead;
    } catch (error) {
      console.error("Failed to create lead", error);
      throw error;
    }
  };

  const addNoteToLead = async (leadId, noteText, author = "Alex Rivera") => {
    try {
      const note = await createNoteApi(leadId, { text: noteText });
      setLeads((prevLeads) =>
        prevLeads.map((lead) => {
          if (lead.id !== leadId) return lead;
          const updatedNotes = [note, ...(lead.notes || [])];
          const updatedActivities = [
            {
              id: `a_${Date.now()}`,
              type: "Note Added",
              message: `${author} added a new note.`,
              created_at: new Date().toISOString(),
            },
            ...(lead.activities || []),
          ];
          return {
            ...lead,
            notes: updatedNotes,
            activities: updatedActivities,
          };
        }),
      );
      logActivity("note", `Note added on lead ${leadId}.`);
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  const addTaskToLead = async (leadId, taskTitle, dueDate) => {
    try {
      const task = await createTaskApi(leadId, {
        title: taskTitle,
        due_date: dueDate,
      });
      setLeads((prevLeads) =>
        prevLeads.map((lead) => {
          if (lead.id !== leadId) return lead;
          const updatedTasks = [...(lead.tasks || []), task];
          const updatedActivities = [
            {
              id: `a_${Date.now()}`,
              type: "Task Added",
              message: `Task added: ${taskTitle}`,
              created_at: new Date().toISOString(),
            },
            ...(lead.activities || []),
          ];
          return {
            ...lead,
            tasks: updatedTasks,
            activities: updatedActivities,
          };
        }),
      );
      logActivity("task", `Task added for lead ${leadId}.`);
      return task;
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const toggleTaskStatus = async (leadId, taskId) => {
    const lead = leads.find((l) => l.id === leadId);
    const task = lead?.tasks?.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const updatedTask = await updateTaskApi(taskId, {
        status: task.status === "Completed" ? "Pending" : "Completed",
      });
      setLeads((prevLeads) =>
        prevLeads.map((lead) => {
          if (lead.id !== leadId) return lead;
          const updatedTasks = lead.tasks.map((t) =>
            t.id === taskId ? { ...t, ...updatedTask } : t,
          );
          const updatedActivities = [
            {
              id: `a_${Date.now()}`,
              type: "Task Completed",
              message: `Task ${updatedTask.title} marked ${updatedTask.status}.`,
              created_at: new Date().toISOString(),
            },
            ...(lead.activities || []),
          ];
          return {
            ...lead,
            tasks: updatedTasks,
            activities: updatedActivities,
          };
        }),
      );
      logActivity("task", `Task status updated for lead ${leadId}.`);
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const runWebsiteAudit = async (leadId) => {
        setAuditingLeadIds(prev => [...prev, leadId]);

    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    try {
      const audit = await createAuditApi({
        lead_id: leadId,
        website: lead.website,
      });
      setAudits((prev) => [audit, ...prev]);

     setLeads(prevLeads =>
  prevLeads.map(l => {
    if (l.id !== leadId) return l;

    const updatedActivities = [
      {
        id: `a_${Date.now()}`,
        type: 'Audit Completed',
        message: `Audit completed for ${l.name}.`,
        created_at: new Date().toISOString()
      },
      ...(l.activities || [])
    ];

    return {
      ...l,
      audit: audit.audit || audit,
      activities: updatedActivities
    };
  })
);

      setNotifications((prev) => [
        {
          id: audit.id,
          message: `Website audit completed for ${lead.name}.`,
          read: false,
          created_at: audit.created_at,
        },
        ...prev,
      ]);
      logActivity("audit", `Audit queued for ${lead.name}.`);
    } catch (error) {
      console.error("Failed to run website audit", error);
    }
    finally {
      setAuditingLeadIds(prev =>
      prev.filter(id => id !== leadId)
    );
    }
  };

  const addCampaign = async (newCampaign) => {
    try {
      const campaign = await createCampaignApi(newCampaign);
      setCampaigns((prev) => [campaign, ...prev]);
      logActivity("campaign", `Created campaign: ${campaign.name}`);
      return campaign;
    } catch (error) {
      console.error("Failed to create campaign", error);
    }
  };

  const updateCampaignStatus = async (campaignId, status) => {
    try {
      let campaign = await updateCampaignApi(campaignId, { status });
      if (status === "Running") {
        campaign = await startCampaignApi(campaignId);
      }
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, ...campaign } : c)),
      );
      logActivity(
        "campaign",
        `Campaign ${campaignId} status updated to ${status}.`,
      );
    } catch (error) {
      console.error("Failed to update campaign", error);
    }
  };

  const markNotificationRead = async (id, read = true) => {
    try {
      await markNotificationReadApi(id, { read });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read } : n)),
      );
    } catch (error) {
      console.error("Failed to mark notification read", error);
    }
  };

  const logActivity = (type, text) => {
    const newAct = {
      id: `act_${Date.now()}`,
      type,
      text,
      time: "Just now",
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 15)]);
  };

  const searchLeadsAPI = async (queryParams) => {
    try {
      setIsLoading(true);
      const outrerleadsResult = await fetchOuterLeads(queryParams);
      setOuterLeads(outrerleadsResult.places || []);
    } catch (error) {
      console.error("Failed to search leads", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAllNotificationsRead = async () => {
    await Promise.all(
      notifications
        .filter((n) => !n.read)
        .map((notification) => markNotificationRead(notification.id)),
    );
  };

  return (
    <AppContext.Provider
      value={{
        leads,
        outerLeads,
        audits,
        campaigns,
        activities,
        notifications,
        kpis,
        selectedLeadId,
        setSelectedLeadId,
        globalSearch,
        setGlobalSearch,
        onboardingProgress,
        isLoading,
        toggleSaveLead,
        addLead,
        addNoteToLead,
        addTaskToLead,
        toggleTaskStatus,
        runWebsiteAudit,
        addCampaign,
        updateCampaignStatus,
        markAllNotificationsRead,
        logActivity,
        searchLeadsAPI,
        auditingLeadIds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
