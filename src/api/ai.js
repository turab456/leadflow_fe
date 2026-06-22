import { apiFetch } from './client.js';

export const analyzeLead = async (body) => apiFetch('/api/ai/analyze-lead', { method: 'POST', body });
export const getLeadInsights = async (leadId) => apiFetch(`/api/ai/lead/${leadId}`);
