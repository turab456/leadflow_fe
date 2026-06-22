import { apiFetch } from './client.js';

export const getNotifications = async () => apiFetch('/api/notifications');
export const markNotificationRead = async (id, body) => apiFetch(`/api/notifications/${id}`, { method: 'PATCH', body });
