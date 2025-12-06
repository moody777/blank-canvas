import { Users, Calendar, Briefcase, FileText, ArrowRight, FileCheck, CreditCard, Shield, Monitor, BarChart3 } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getNewsEvents } from '@/lib/mockFunctions';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const HRDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const locationData = [
    { name: 'Remote', count: 122, color: 'hsl(var(--chart-1))' },
    { name: 'France', count: 38, color: 'hsl(var(--chart-2))' },
    { name: 'India', count: 27, color: 'hsl(var(--chart-3))' },
    { name: 'USA', count: 14, color: 'hsl(var(--chart-4))' },
  ];

  const hiringApplicants = [
    { name: 'Harper Lee', location: 'France', role: 'Creative Lead', avatar: '/placeholder.svg' },
    { name: 'Francis Degas', location: 'USA', role: 'Front End Developer', avatar: '/placeholder.svg' },
    { name: 'Leonora Carington', location: 'USA', role: 'Product Manager', avatar: '/placeholder.svg' },
    { name: 'Andrew Hunt', location: 'India', role: 'Creative Lead', avatar: '/placeholder.svg' },
  ];

  const quickActions = [
    { label: 'Contracts', icon: FileCheck, route: '/hr/contracts' },
    { label: 'Payroll', icon: CreditCard, route: '/payroll' },
    { label: 'Roles', icon: Shield, route: '/hr/roles' },
    { label: 'Reports', icon: BarChart3, route: '/reports' },
    { label: 'Leave', icon: Calendar, route: '/hr/leave-policies' },
    { label: 'Settings', icon: Monitor, route: '/settings' },
  ];

  const handleSendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: "Appraisal reminders have been sent to all employees.",
    });
  };

  const handleShareApplicants = () => {
    toast({
      title: "Share Link Created",
      description: "Hiring applications link copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <p className="text-sm">
            ⚡ <strong>Take Action:</strong> The appraisal cycle is around the corner. Let's get started.
          </p>
          <Button onClick={handleSendReminders}>Send Reminders</Button>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Employees" value={289} icon={Users} color="purple" />
        <MetricCard label="On Leave" value="08" icon={Calendar} color="green" />
        <MetricCard label="Hiring Roles" value="03" icon={Briefcase} color="orange" />
        <MetricCard label="Requests" value={28} icon={FileText} color="blue" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Employee Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Employees" },
                Remote: { label: "Remote", color: "hsl(var(--chart-1))" },
                France: { label: "France", color: "hsl(var(--chart-2))" },
                India: { label: "India", color: "hsl(var(--chart-3))" },
                USA: { label: "USA", color: "hsl(var(--chart-4))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* News & Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">News & Events</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {getNewsEvents().slice(0, 4).map((event) => (
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
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hiring Applications */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Hiring Applications</CardTitle>
            <Button variant="secondary" size="sm" onClick={handleShareApplicants}>Share</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {hiringApplicants.map((applicant, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={applicant.avatar} />
                    <AvatarFallback>{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{applicant.name}</div>
                    <div className="text-sm text-muted-foreground">{applicant.location}</div>
                  </div>
                </div>
                <Badge variant="secondary">{applicant.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hiring Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div 
                className="flex items-center justify-between rounded-lg bg-secondary p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => toast({ title: "Feature Coming Soon", description: "Shortlisted candidates view is under development." })}
              >
                <span className="text-sm font-medium">Shortlisted Candidates</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <div 
                className="flex items-center justify-between rounded-lg bg-secondary p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => toast({ title: "Feature Coming Soon", description: "Upcoming interviews view is under development." })}
              >
                <span className="text-sm font-medium">Upcoming Interviews</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <div 
                className="flex items-center justify-between rounded-lg bg-secondary p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => toast({ title: "Feature Coming Soon", description: "Rejected applications view is under development." })}
              >
                <span className="text-sm font-medium">Rejected Applications</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto flex flex-col items-center gap-2 p-3"
                    onClick={() => navigate(action.route)}
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-xs text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};