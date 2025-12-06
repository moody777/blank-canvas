import { EmployeeDashboard } from '@/components/dashboard/EmployeeDashboard';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
import { PayrollDashboard } from '@/components/dashboard/PayrollDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { HRDashboard } from '@/components/dashboard/HRDashboard';
import { useUserRole } from '@/contexts/UserRoleContext';

export default function Dashboard() {
  const { hasRole } = useUserRole();

  // Route to role-specific dashboard (priority order)
  if (hasRole('system_admin')) {
    return <AdminDashboard />;
  }
  
  if (hasRole('hr_admin')) {
    return <HRDashboard />;
  }
  
  if (hasRole('payroll_specialist')) {
    return <PayrollDashboard />;
  }
  
  if (hasRole('line_manager')) {
    return <ManagerDashboard />;
  }
  
  // Default: employee dashboard
  return <EmployeeDashboard />;
}