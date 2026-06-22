import { apiFetch, authStorage } from './client.js';

export const signup = async (body) => {
  const data = await apiFetch('/api/auth/signup', { method: 'POST', body });
  if (data.token && data.refreshToken) {
    authStorage.setTokens({ token: data.token, refreshToken: data.refreshToken });
  }
  return data;
};

export const login = async (body) => {
  const data = await apiFetch('/api/auth/login', { method: 'POST', body });
  if (data.token && data.refreshToken) {
    authStorage.setTokens({ token: data.token, refreshToken: data.refreshToken });
  }
  return data;
};

export const logout = async () => {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } finally {
    authStorage.clearTokens();
  }
};

export const forgotPassword = async (body) => apiFetch('/api/auth/forgot-password', { method: 'POST', body });
export const resetPassword = async (body) => apiFetch('/api/auth/reset-password', { method: 'POST', body });
export const getProfile = async () => apiFetch('/api/auth/profile');
export const updateProfile = async (body) => apiFetch('/api/auth/profile', { method: 'PATCH', body });
