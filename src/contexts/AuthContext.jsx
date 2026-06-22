import React, { createContext, useContext, useEffect, useState } from 'react';
import { authStorage } from '../api/client.js';
import { login as loginApi, signup as signupApi, logout as logoutApi, forgotPassword as forgotPasswordApi, resetPassword as resetPasswordApi, getProfile as getProfileApi } from '../api/auth.js';

const AuthContext = createContext(undefined);
const CURRENT_USER_KEY = 'leadflow_current_user';

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();
      const storedUser = getStoredUser();
      if (!token) {
        setUser(storedUser);
        setAuthReady(true);
        return;
      }

      try {
        const profile = await getProfileApi();
        setUser(profile);
        setStoredUser(profile);
      } catch (error) {
        authStorage.clearTokens();
        setUser(null);
        setStoredUser(null);
      } finally {
        setAuthReady(true);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi({ email, password });
    authStorage.setTokens({ token: data.token, refreshToken: data.refreshToken });
    setUser(data.user);
    setStoredUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password) => {
    const data = await signupApi({ name, email, password });
    authStorage.setTokens({ token: data.token, refreshToken: data.refreshToken });
    setUser(data.user);
    setStoredUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      authStorage.clearTokens();
      setUser(null);
      setStoredUser(null);
    }
  };

  const requestPasswordReset = async (email) => {
    return forgotPasswordApi({ email });
  };

  const resetPassword = async (email, password) => {
    return resetPasswordApi({ email, password });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        login,
        signup,
        logout,
        requestPasswordReset,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
