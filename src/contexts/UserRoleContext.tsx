import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";
import type { UserRole } from '@/types';

// Map of email/username to roles for demo purposes
// In production, this would come from your database or Azure AD groups
const userRoleMapping: Record<string, UserRole[]> = {
  // System Admin users
  'admin@': ['employee', 'system_admin'],
  'sysadmin@': ['employee', 'system_admin'],
  'system.admin@': ['employee', 'system_admin'],
  
  // HR Admin users
  'hr@': ['employee', 'hr_admin'],
  'hradmin@': ['employee', 'hr_admin'],
  'hr.admin@': ['employee', 'hr_admin'],
  
  // Line Manager users
  'manager@': ['employee', 'line_manager'],
  'linemanager@': ['employee', 'line_manager'],
  'team.lead@': ['employee', 'line_manager'],
  
  // Payroll users
  'payroll@': ['employee', 'payroll_specialist'],
  'payroll.admin@': ['employee', 'payroll_specialist'],
  
  // Default: all authenticated users get employee role
};

interface UserRoleContextType {
  account: AccountInfo | null;
  roles: UserRole[];
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isLoading: boolean;
  displayName: string;
  email: string;
  userId: string;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

// Determine roles based on email patterns or Azure AD claims
const getRolesFromAccount = (account: AccountInfo | null): UserRole[] => {
  if (!account) return [];
  
  const email = (account.username || '').toLowerCase();
  const idTokenClaims = account.idTokenClaims as Record<string, any> | undefined;
  
  // Check for Azure AD roles/groups in claims
  const azureRoles = idTokenClaims?.roles as string[] | undefined;
  if (azureRoles && azureRoles.length > 0) {
    const mappedRoles: UserRole[] = ['employee'];
    azureRoles.forEach(role => {
      const lowerRole = role.toLowerCase();
      if (lowerRole.includes('admin') && lowerRole.includes('system')) {
        mappedRoles.push('system_admin');
      } else if (lowerRole.includes('admin') && (lowerRole.includes('hr') || lowerRole.includes('human'))) {
        mappedRoles.push('hr_admin');
      } else if (lowerRole.includes('manager') || lowerRole.includes('lead')) {
        mappedRoles.push('line_manager');
      } else if (lowerRole.includes('payroll')) {
        mappedRoles.push('payroll_specialist');
      }
    });
    return [...new Set(mappedRoles)];
  }
  
  // Check email patterns for role mapping
  for (const [pattern, roles] of Object.entries(userRoleMapping)) {
    if (email.startsWith(pattern)) {
      return roles;
    }
  }
  
  // Default: authenticated users are employees
  // For demo: give all users multiple roles to test functionality
  return ['employee', 'line_manager', 'hr_admin', 'system_admin', 'payroll_specialist'];
};

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accounts } = useMsal();
  const isMsalAuthenticated = useIsAuthenticated();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const account = accounts[0] || null;

  // Function to check localStorage and update roles
  const syncFromLocalStorage = useCallback(() => {
    const storedUser = localStorage.getItem('hrms_user');
    const storedAuthType = localStorage.getItem('hrms_auth_type');
    
    if (storedUser && storedAuthType === 'local') {
      try {
        const parsed = JSON.parse(storedUser);
        setRoles(parsed.roles || ['employee']);
        setIsLoading(false);
        return true; // Local user found
      } catch {
        // Invalid JSON, clear it
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('hrms_auth_type');
      }
    }
    return false; // No local user
  }, []);

  // Initial sync and polling for local auth changes
  useEffect(() => {
    // Check immediately
    const hasLocalUser = syncFromLocalStorage();
    
    if (!hasLocalUser) {
      // Handle MSAL auth
      if (isMsalAuthenticated && account) {
        const userRoles = getRolesFromAccount(account);
        setRoles(userRoles);
      } else {
        setRoles([]);
      }
      setIsLoading(false);
    }

    // Poll for localStorage changes (handles same-tab updates)
    const interval = setInterval(() => {
      syncFromLocalStorage();
    }, 100);

    // Also listen for storage events from other tabs
    const handleStorageChange = () => syncFromLocalStorage();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isMsalAuthenticated, account, syncFromLocalStorage]);

  const hasRole = useCallback((role: UserRole): boolean => {
    return roles.includes(role);
  }, [roles]);

  const hasAnyRole = useCallback((checkRoles: UserRole[]): boolean => {
    return checkRoles.some(role => roles.includes(role));
  }, [roles]);

  // Get user info from localStorage or MSAL
  const getLocalUser = () => {
    try {
      const stored = localStorage.getItem('hrms_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const localUser = getLocalUser();
  const displayName = localUser?.username || account?.name || account?.username?.split('@')[0] || 'User';
  const email = localUser?.email || account?.username || '';
  const userId = localUser?.id || account?.localAccountId || account?.homeAccountId || '';

  return (
    <UserRoleContext.Provider value={{
      account,
      roles,
      hasRole,
      hasAnyRole,
      isLoading,
      displayName,
      email,
      userId
    }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within UserRoleProvider');
  }
  return context;
};
