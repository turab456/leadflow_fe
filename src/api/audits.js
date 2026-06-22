import { apiFetch } from './client.js';

export const getAudits = async () => apiFetch('/api/audits');
export const getAudit = async (auditId) => apiFetch(`/api/audits/${auditId}`);
export const createAudit = async (body) => apiFetch('/api/audits', { method: 'POST', body });
export const deleteAudit = async (auditId) => apiFetch(`/api/audits/${auditId}`, { method: 'DELETE' });
