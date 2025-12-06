import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyAttendance from "./pages/MyAttendance";
import MyLeave from "./pages/MyLeave";
import MyMissions from "./pages/MyMissions";
import Notifications from "./pages/Notifications";
import Team from "./pages/Team";
import TeamAttendance from "./pages/TeamAttendance";
import Organization from "./pages/Organization";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Missions from "./pages/Missions";
import MissionDetail from "./pages/MissionDetail";
import Payroll from "./pages/Payroll";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import ShiftManagement from "./pages/SystemAdmin/ShiftManagement";
import AttendanceInfrastructure from "./pages/SystemAdmin/AttendanceInfrastructure";
import ContractsManagement from "./pages/HRAdmin/ContractsManagement";
import LeavePolicies from "./pages/HRAdmin/LeavePolicies";
import ReimbursementsQueue from "./pages/HRAdmin/ReimbursementsQueue";
import PayrollRunCenter from "./pages/Payroll/PayrollRunCenter";
import PayrollConfiguration from "./pages/Payroll/PayrollConfiguration";
import JobBoard from "./pages/Recruitment/JobBoard";
import MyApplications from "./pages/Recruitment/MyApplications";
import HRJobs from "./pages/Recruitment/HRJobs";
import HROffers from "./pages/Recruitment/HROffers";
import React, { useEffect, useState } from "react";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
    authority: import.meta.env.VITE_REACT_APP_AUTHORITY || "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

const pca = new PublicClientApplication(configuration);

const queryClient = new QueryClient();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    pca.initialize().then(() => {
      setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={pca}>
        <UserRoleProvider>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/recruitment/jobs" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Public Recruitment Routes - No Auth Required */}
                <Route element={<PublicLayout />}>
                  <Route path="/recruitment/jobs" element={<JobBoard />} />
                  <Route path="/recruitment/my-applications" element={<MyApplications />} />
                </Route>
                
                {/* Protected Routes - Auth Required */}
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-attendance" element={<MyAttendance />} />
                  <Route path="/my-leave" element={<MyLeave />} />
                  <Route path="/my-missions" element={<MyMissions />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/team-attendance" element={<TeamAttendance />} />
                  <Route path="/organization" element={<Organization />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="/missions" element={<Missions />} />
                  <Route path="/mission/:id" element={<MissionDetail />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/reports" element={<Reports />} />
                  
                  {/* System Admin Routes */}
                  <Route path="/admin/organization" element={<Organization />} />
                  <Route path="/admin/shifts" element={<ShiftManagement />} />
                  <Route path="/admin/attendance-infra" element={<AttendanceInfrastructure />} />
                  
                  {/* HR Admin Routes */}
                  <Route path="/hr/contracts" element={<ContractsManagement />} />
                  <Route path="/hr/leave-policies" element={<LeavePolicies />} />
                  <Route path="/hr/reimbursements" element={<ReimbursementsQueue />} />
                  
                  {/* Payroll Routes */}
                  <Route path="/payroll/run" element={<PayrollRunCenter />} />
                  <Route path="/payroll/config" element={<PayrollConfiguration />} />
                  
                  {/* Protected Recruitment Routes - HR Admin Only */}
                  <Route path="/recruitment/manage" element={<HRJobs />} />
                  <Route path="/recruitment/offers" element={<HROffers />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </UserRoleProvider>
      </MsalProvider>
    </QueryClientProvider>
  );
};

export default App;
