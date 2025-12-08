import { Users, Settings, Shield, Database } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getEmployees, getDepartments, getShiftSchedules, getLeaveTypes, getSystemActivityTrends } from '@/lib/dataService';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const employees = getEmployees();
  const departments = getDepartments();
  const shifts = getShiftSchedules();
  const leaveTypes = getLeaveTypes();
  const systemActivityTrends = getSystemActivityTrends();

  const activeEmployees = employees.filter(p => p.employment_status === 'ACTIVE').length;
  const activeDepartments = departments.length;
  const activeShifts = shifts.filter(s => s.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <p className="text-sm">
            🔧 <strong>System Status:</strong> All systems operational. Database backup completed.
          </p>
          <Button onClick={() => navigate('/settings')}>Manage Settings</Button>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          label="Total Users" 
          value={employees.length} 
          icon={Users} 
          color="purple" 
        />
        <MetricCard 
          label="Active Employees" 
          value={activeEmployees} 
          icon={Database} 
          color="green" 
        />
        <MetricCard 
          label="Departments" 
          value={activeDepartments} 
          icon={Shield} 
          color="orange" 
        />
        <MetricCard 
          label="Active Shifts" 
          value={activeShifts} 
          icon={Settings} 
          color="blue" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Growth Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Growth - Last 6 Months</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Total Users",
                  color: "hsl(var(--chart-1))",
                },
                departments: {
                  label: "Departments",
                  color: "hsl(var(--chart-2))",
                },
                activeShifts: {
                  label: "Active Shifts",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={systemActivityTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="departments" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="activeShifts" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80" onClick={() => navigate('/employees')}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Employee Management</div>
                  <div className="text-sm text-muted-foreground">{employees.length} total employees</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80" onClick={() => navigate('/organization')}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Organization Structure</div>
                  <div className="text-sm text-muted-foreground">{departments.length} departments</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80" onClick={() => navigate('/attendance')}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Attendance System</div>
                  <div className="text-sm text-muted-foreground">{activeShifts} active shifts</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80" onClick={() => navigate('/settings')}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">System Settings</div>
                  <div className="text-sm text-muted-foreground">Configure policies & rules</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        {/* System Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium">Leave Types Configured</span>
                <span className="font-bold">{leaveTypes.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium">Shift Templates</span>
                <span className="font-bold">{shifts.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium">Active Departments</span>
                <span className="font-bold">{activeDepartments}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm font-medium">System Roles</span>
                <span className="font-bold">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/employees')}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/reports')}
            >
              <Database className="h-6 w-6" />
              <span className="text-sm">Reports</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/settings')}
            >
              <Shield className="h-6 w-6" />
              <span className="text-sm">Security</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};