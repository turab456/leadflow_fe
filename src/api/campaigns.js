import { apiFetch } from './client.js';

export const getCampaigns = async () => apiFetch('/api/campaigns');
export const getCampaign = async (campaignId) => apiFetch(`/api/campaigns/${campaignId}`);
export const createCampaign = async (body) => apiFetch('/api/campaigns', { method: 'POST', body });
export const updateCampaign = async (campaignId, body) => apiFetch(`/api/campaigns/${campaignId}`, { method: 'PATCH', body });
export const deleteCampaign = async (campaignId) => apiFetch(`/api/campaigns/${campaignId}`, { method: 'DELETE' });
export const startCampaign = async (campaignId) => apiFetch(`/api/campaigns/${campaignId}/start`, { method: 'POST' });
