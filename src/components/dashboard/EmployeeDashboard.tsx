import { useState } from 'react';
import { Calendar, Briefcase, Bell, Clock, LogIn, Plus, DollarSign, FileText } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getNewsEvents, getLeaveBalances, getMissions, getAttendanceRecords, getPersonalAttendanceTrends } from '@/lib/mockFunctions';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClockInOutDialog } from '@/components/employee/ClockInOutDialog';
import { LeaveRequestDialog } from '@/components/employee/LeaveRequestDialog';
import { ReimbursementDialog } from '@/components/employee/ReimbursementDialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clockDialogOpen, setClockDialogOpen] = useState(false);
  const [clockType, setClockType] = useState<'in' | 'out'>('in');
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [reimbursementDialogOpen, setReimbursementDialogOpen] = useState(false);

  // Get user-specific data
  const leaveBalances = getLeaveBalances();
  const missions = getMissions();
  const attendanceRecords = getAttendanceRecords();
  const newsEvents = getNewsEvents();
  const personalAttendanceTrends = getPersonalAttendanceTrends();
  
  const userLeaveBalance = leaveBalances.find(lb => lb.employeeId === user?.id);
  const userMissions = missions.filter(m => m.employeeId === user?.id && m.status !== 'COMPLETED' && m.status !== 'CANCELLED');
  const userAttendance = attendanceRecords.filter(a => a.employeeId === user?.id);
  const thisMonthAttendance = userAttendance.filter(a => 
    a.entryTime && new Date(a.entryTime).getMonth() === new Date().getMonth()
  );
  const presentDays = thisMonthAttendance.filter(a => a.loginMethod && true).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-muted-foreground">
            Here's your overview for today
          </p>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          label="Days Present" 
          value={presentDays} 
          icon={Calendar} 
          color="green" 
        />
        <MetricCard 
          label="Leave Balance" 
          value={userLeaveBalance?.remaining || 0} 
          icon={Clock} 
          color="blue" 
        />
        <MetricCard 
          label="Active Missions" 
          value={userMissions.length} 
          icon={Briefcase} 
          color="orange" 
        />
        <MetricCard 
          label="Pending Actions" 
          value={userMissions.filter(m => m.status === 'ASSIGNED' || m.status === 'IN_PROGRESS').length} 
          icon={Bell} 
          color="purple" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Attendance - Last 4 Weeks</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                present: {
                  label: "Present",
                  color: "hsl(var(--chart-2))",
                },
                late: {
                  label: "Late",
                  color: "hsl(var(--chart-3))",
                },
                absent: {
                  label: "Absent",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personalAttendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="present" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="late" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="hsl(var(--chart-4))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* My Missions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">My Active Missions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/my-missions')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {userMissions.length > 0 ? (
              userMissions.slice(0, 3).map((mission) => (
                <div 
                  key={mission.id} 
                  className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => navigate(`/mission/${mission.id}`)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{mission.destination}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant={
                    mission.status === 'COMPLETED' ? 'default' :
                    (mission.status === 'ASSIGNED' || mission.status === 'IN_PROGRESS') ? 'secondary' : 'outline'
                  }>
                    {mission.status.toLowerCase()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No active missions</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* News & Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">News & Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {newsEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-secondary text-xs">
                  <div className="font-semibold">{new Date(event.date).getDate()}</div>
                  <div className="text-muted-foreground">
                    {new Date(event.date).toLocaleString('en', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">{event.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button 
              className="h-auto flex flex-col gap-2 py-4" 
              onClick={() => {
                setClockType('in');
                setClockDialogOpen(true);
              }}
            >
              <LogIn className="h-5 w-5" />
              <span className="text-sm">Clock In</span>
            </Button>
            <Button 
              className="h-auto flex flex-col gap-2 py-4"
              onClick={() => setLeaveDialogOpen(true)}
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm">Request Leave</span>
            </Button>
            <Button 
              className="h-auto flex flex-col gap-2 py-4"
              onClick={() => setReimbursementDialogOpen(true)}
            >
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Reimbursement</span>
            </Button>
            <Button 
              className="h-auto flex flex-col gap-2 py-4" 
              onClick={() => navigate('/profile')}
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm">My Profile</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <ClockInOutDialog open={clockDialogOpen} onOpenChange={setClockDialogOpen} type={clockType} />
      <LeaveRequestDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen} />
      <ReimbursementDialog open={reimbursementDialogOpen} onOpenChange={setReimbursementDialogOpen} />
    </div>
  );
};
