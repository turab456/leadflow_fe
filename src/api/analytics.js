import { apiFetch } from './client.js';

export const getDashboard = async () => apiFetch('/api/analytics/dashboard');
export const getLeadsAnalytics = async () => apiFetch('/api/analytics/leads');
export const getCampaignsAnalytics = async () => apiFetch('/api/analytics/campaigns');
export const getFunnelAnalytics = async () => apiFetch('/api/analytics/funnel');
export const getIndustriesAnalytics = async () => apiFetch('/api/analytics/industries');
