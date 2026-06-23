import { apiFetch } from './client.js';

export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  return apiFetch(
    `/api/leads${query ? `?${query}` : ''}`
  );
};

export const getOuterLeads = async (params = {}) => {
  const q = new URLSearchParams(params).toString();

  return apiFetch(
    `/api/leads/search${q ? `?${q}` : ''}`
  );
};
export const getLead = async (leadId) => apiFetch(`/api/leads/${leadId}`);
export const createLead = async (body) => apiFetch('/api/leads', { method: 'POST', body });
export const saveLead = async (body) => apiFetch(`/api/leads/save`, { method: 'POST', body });
export const deleteLead = async (leadId) => apiFetch(`/api/leads/${leadId}`, { method: 'DELETE' });
