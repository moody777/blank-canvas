import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { getUsers } from '@/lib/mockFunctions';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authType, setAuthType] = useState<'local' | 'msal' | null>(null);
  const { instance, accounts } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();

  // Restore local user from storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('hrms_user');
    const storedAuthType = localStorage.getItem('hrms_auth_type');
    if (storedUser && storedAuthType === 'local') {
      setUser(JSON.parse(storedUser));
      setAuthType('local');
    }
  }, []);

  // Sync MSAL user to local state (only if not locally authenticated)
  useEffect(() => {
    if (isMsalAuthenticated && accounts.length > 0 && authType !== 'local') {
      const msalAccount = accounts[0];
      const msalUser: User = {
        id: msalAccount.localAccountId,
        username: msalAccount.username || msalAccount.name || 'msal-user',
        email: msalAccount.username || '',
        roles: ['employee'] as UserRole[],
        employeeId: msalAccount.localAccountId,
      };
      setUser(msalUser);
      setAuthType('msal');
      localStorage.setItem('hrms_user', JSON.stringify(msalUser));
      localStorage.setItem('hrms_auth_type', 'msal');
    }
  }, [isMsalAuthenticated, accounts, authType]);

  const login = useCallback(async (username: string, _password: string): Promise<boolean> => {
    // Find demo user
    const foundUser = getUsers().find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      setAuthType('local');
      localStorage.setItem('hrms_user', JSON.stringify(foundUser));
      localStorage.setItem('hrms_auth_type', 'local');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    const wasAuthType = authType;
    
    // Clear local state and storage
    setUser(null);
    setAuthType(null);
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_auth_type');
    
    // If logged in via MSAL, also logout from Microsoft
    if (wasAuthType === 'msal' || isMsalAuthenticated) {
      instance.logoutPopup().catch(e => {
        console.error("MSAL logout failed:", e);
      });
    }
  }, [authType, isMsalAuthenticated, instance]);

  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    return user.roles?.includes(role) ?? false;
  }, [user]);

  const isAuthenticated = !!user || isMsalAuthenticated;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      hasRole,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
