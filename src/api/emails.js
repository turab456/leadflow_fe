import { apiFetch } from './client.js';

export const sendEmail = async (body) => apiFetch('/api/emails/send', { method: 'POST', body });
export const bulkSendEmail = async (body) => apiFetch('/api/emails/bulk-send', { method: 'POST', body });
export const getEmailHistory = async () => apiFetch('/api/emails/history');
