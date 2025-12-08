import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@hrms.com', roles: ['hr_admin', 'system_admin'], employeeId: '1' },
  { id: '2', username: 'manager', email: 'manager@hrms.com', roles: ['line_manager'], employeeId: '2' },
  { id: '3', username: 'employee', email: 'employee@hrms.com', roles: ['employee'], employeeId: '3' },
  { id: '4', username: 'payroll', email: 'payroll@hrms.com', roles: ['payroll_specialist'], employeeId: '4' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authType, setAuthType] = useState<'local' | 'msal' | null>(null);
  const { instance, accounts } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const storedUser = localStorage.getItem('hrms_user');
    const storedAuthType = localStorage.getItem('hrms_auth_type');
    if (storedUser && storedAuthType === 'local') {
      setUser(JSON.parse(storedUser));
      setAuthType('local');
    }
  }, []);

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
    const foundUser = demoUsers.find(u => u.username === username);
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
    setUser(null);
    setAuthType(null);
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_auth_type');
    if (wasAuthType === 'msal' || isMsalAuthenticated) {
      instance.logoutPopup().catch(e => console.error("MSAL logout failed:", e));
    }
  }, [authType, isMsalAuthenticated, instance]);

  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    return user.roles?.includes(role) ?? false;
  }, [user]);

  const isAuthenticated = !!user || isMsalAuthenticated;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
