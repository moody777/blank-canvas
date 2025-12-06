import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isMsalAuthenticated = useIsAuthenticated();
  const { isAuthenticated: isLocalAuthenticated } = useAuth();

  const isAuthenticated = isMsalAuthenticated || isLocalAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
