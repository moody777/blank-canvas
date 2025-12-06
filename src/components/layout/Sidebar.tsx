import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, Calendar, Plane, 
  Bell, UserCog, Wallet, Settings, FileText, LogOut,
  UsersRound, Briefcase, Play, Cog, FileCheck, Shield,
  Network, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  label: string;
  icon: any;
  path: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Profile', icon: UserCog, path: '/profile' },
  { label: 'My Attendance', icon: Calendar, path: '/my-attendance' },
  { label: 'My Missions', icon: Plane, path: '/my-missions' },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
  
  // Recruitment (Applicants)
  { label: 'Job Board', icon: Briefcase, path: '/recruitment/jobs', roles: ['applicant'] },
  { label: 'My Applications', icon: FileText, path: '/recruitment/my-applications', roles: ['applicant'] },
  
  // Line Manager
  { label: 'Team Management', icon: UsersRound, path: '/team', roles: ['line_manager'] },
  { label: 'Team Attendance', icon: Calendar, path: '/team-attendance', roles: ['line_manager'] },
  
  // All users can view org hierarchy
  { label: 'Organization', icon: Building2, path: '/organization' },
  
  // HR Admin
  { label: 'Attendance', icon: Calendar, path: '/attendance', roles: ['hr_admin'] },
  { label: 'Leave', icon: Briefcase, path: '/leave', roles: ['hr_admin'] },
  { label: 'Missions', icon: Plane, path: '/missions', roles: ['hr_admin'] },
  { label: 'Contracts', icon: FileCheck, path: '/hr/contracts', roles: ['hr_admin'] },
  { label: 'Leave Policies', icon: FileText, path: '/hr/leave-policies', roles: ['hr_admin'] },
  { label: 'Reimbursements', icon: Wallet, path: '/hr/reimbursements', roles: ['hr_admin'] },
  { label: 'Recruitment', icon: Users, path: '/recruitment/manage', roles: ['hr_admin'] },
  { label: 'Job Offers', icon: FileCheck, path: '/recruitment/offers', roles: ['hr_admin'] },
  
  // Payroll Specialist
  { label: 'Payroll Overview', icon: Wallet, path: '/payroll', roles: ['payroll_specialist'] },
  { label: 'Payroll Center', icon: Play, path: '/payroll/run', roles: ['payroll_specialist'] },
  { label: 'Payroll Config', icon: Cog, path: '/payroll/config', roles: ['payroll_specialist'] },
  
  // System Admin
  { label: 'Organization', icon: Building2, path: '/admin/organization', roles: ['system_admin'] },
  { label: 'Shift Management', icon: Clock, path: '/admin/shifts', roles: ['system_admin'] },
  { label: 'Attendance Infra', icon: Settings, path: '/admin/attendance-infra', roles: ['system_admin'] },
  { label: 'Settings', icon: Settings, path: '/settings', roles: ['system_admin'] },
  { label: 'Reports', icon: FileText, path: '/reports', roles: ['system_admin'] },
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const { hasRole, displayName, email } = useUserRole();

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.some(role => hasRole(role as any));
  });

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar-background">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <div className="h-6 w-6 rounded-full border-2 border-background" />
        </div>
        <span className="text-xl font-bold">HRMS</span>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-secondary'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};
