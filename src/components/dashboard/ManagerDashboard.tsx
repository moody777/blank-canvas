import { Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getEmployees, getLeaveRequests, getMissions, getAttendanceRecords, getTeamPerformanceTrends } from '@/lib/dataService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

export const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const employees = getEmployees();
  const leaveRequests = getLeaveRequests();
  const missions = getMissions();
  const attendanceRecords = getAttendanceRecords();
  const teamPerformanceTrends = getTeamPerformanceTrends();

  const userId = user?.id ? parseInt(user.id) : 0;
  
  // Get team members (those who report to this manager)
  const teamMembers = employees.filter(p => p.manager_id === userId);
  const teamMemberIds = teamMembers.map(tm => tm.employee_id);

  // Team-related metrics
  const pendingLeaveRequests = leaveRequests.filter(
    lr => teamMemberIds.includes(lr.employee_id) && lr.status === 'PENDING'
  );
  
  const teamMissions = missions.filter(
    m => teamMemberIds.includes(m.employee_id) && m.status !== 'COMPLETED'
  );

  const todayAttendance = attendanceRecords.filter(a =>
    teamMemberIds.includes(a.employee_id) && 
    a.entry_time && new Date(a.entry_time).toDateString() === new Date().toDateString()
  );
  const presentToday = todayAttendance.length;

  return (
    <div className="space-y-6">
      {/* Manager Alert Banner */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <p className="text-sm">
            📋 <strong>Team Update:</strong> You have {pendingLeaveRequests.length} pending leave requests to review.
          </p>
          <Button onClick={() => navigate('/team')}>Review Team</Button>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          label="Team Members" 
          value={teamMembers.length} 
          icon={Users} 
          color="purple" 
        />
        <MetricCard 
          label="Present Today" 
          value={presentToday} 
          icon={CheckCircle} 
          color="green" 
        />
        <MetricCard 
          label="Pending Requests" 
          value={pendingLeaveRequests.length} 
          icon={AlertCircle} 
          color="orange" 
        />
        <MetricCard 
          label="Active Missions" 
          value={teamMissions.length} 
          icon={Calendar} 
          color="blue" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Team Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Performance - This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                attendance: {
                  label: "Attendance %",
                  color: "hsl(var(--chart-2))",
                },
                productivity: {
                  label: "Productivity %",
                  color: "hsl(var(--chart-1))",
                },
                satisfaction: {
                  label: "Satisfaction %",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="attendance" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="productivity" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pending Leave Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Leave Requests</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/team')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaveRequests.length > 0 ? (
              pendingLeaveRequests.slice(0, 4).map((request) => {
                const employee = employees.find(p => p.employee_id === request.employee_id);
                return (
                  <div key={request.request_id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee?.profile_image} />
                        <AvatarFallback>
                          {employee?.first_name?.[0]}{employee?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {employee?.first_name} {employee?.last_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {request.start_date ? new Date(request.start_date).toLocaleDateString() : ''} - {request.end_date ? new Date(request.end_date).toLocaleDateString() : ''}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No pending requests</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        {/* Team Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Team Members</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/team')}>
              Manage Team
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.slice(0, 6).map((member) => {
              const attendance = todayAttendance.find(a => a.employee_id === member.employee_id);
              return (
                <div key={member.employee_id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.profile_image} />
                      <AvatarFallback>
                        {member.first_name?.[0]}{member.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {member.first_name} {member.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        FULL-TIME
                      </div>
                    </div>
                  </div>
                  <Badge variant={attendance ? 'default' : 'secondary'}>
                    {attendance ? 'present' : 'absent'}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/team')}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">View Team</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/team')}
            >
              <CheckCircle className="h-6 w-6" />
              <span className="text-sm">Approve Requests</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/missions')}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Assign Mission</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/team')}
            >
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Team Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};