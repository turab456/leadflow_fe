import { apiFetch } from './client.js';

export const getOnboardingProgress = async () => apiFetch('/api/onboarding');
export const updateOnboardingProgress = async (body) => apiFetch('/api/onboarding', { method: 'PATCH', body });
