import { apiFetch } from './client.js';

export const getTasksByLead = async (leadId) => apiFetch(`/api/leads/${leadId}/tasks`);
export const createTaskForLead = async (leadId, body) => apiFetch(`/api/leads/${leadId}/tasks`, { method: 'POST', body });
export const updateTask = async (taskId, body) => apiFetch(`/api/tasks/${taskId}`, { method: 'PATCH', body });
export const deleteTask = async (taskId) => apiFetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
