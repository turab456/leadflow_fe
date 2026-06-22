import { apiFetch } from './client.js';

export const getActivities = async () => apiFetch('/api/activities');
