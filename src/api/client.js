const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const AUTH_TOKEN_KEY = 'leadflow_token';
const REFRESH_TOKEN_KEY = 'leadflow_refresh_token';

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
const setAuthTokens = ({ token, refreshToken }) => {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};
const clearAuthTokens = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  console.log(data)
  if (!response.ok) {
    const message = data?.error || data?.message || response.statusText;
    throw new Error(message);
  }
  return data;
};

const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('Session expired');
  const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  const data = await parseResponse(response);
  setAuthTokens({ token: data.token, refreshToken: data.refreshToken });
  window.dispatchEvent(new Event('leadflow-auth-changed'));
  return data.token;
};

export const apiFetch = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 401 && getRefreshToken()) {
    const nextToken = await refreshAuthToken();
    const retryHeaders = { ...headers, Authorization: `Bearer ${nextToken}` };
    const retryResponse = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: retryHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    return parseResponse(retryResponse);
  }

  return parseResponse(response);
};

export const authStorage = {
  getToken: getAuthToken,
  getRefreshToken: getRefreshToken,
  setTokens: setAuthTokens,
  clearTokens: clearAuthTokens
};
