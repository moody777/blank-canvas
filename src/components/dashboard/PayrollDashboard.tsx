import { DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPayrollRecords, getEmployees, getPayrollTrends, processPayroll, generateReport } from '@/lib/dataService';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

export const PayrollDashboard = () => {
  const navigate = useNavigate();

  const payrollRecords = getPayrollRecords();
  const employees = getEmployees();
  const payrollTrends = getPayrollTrends();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthPayroll = payrollRecords.filter(pr => {
    const periodStart = pr.period_start ? new Date(pr.period_start).toISOString().slice(0, 7) : '';
    return periodStart === currentMonth;
  });
  const processedPayroll = thisMonthPayroll.filter(pr => pr.status === 'PROCESSED');
  const draftPayroll = thisMonthPayroll.filter(pr => pr.status === 'CREATED');
  const totalPayroll = thisMonthPayroll.reduce((sum, pr) => sum + (pr.net_salary || 0), 0);

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <p className="text-sm">
            💰 <strong>Payroll Cycle:</strong> Current payroll processing for {new Date().toLocaleString('en', { month: 'long', year: 'numeric' })} is in progress.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/payroll/run')}>
              Go to Payroll Center
            </Button>
            <Button variant="outline" onClick={() => processPayroll(currentMonth)}>
              Process Current Period
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          label="Total Payroll" 
          value={`$${(totalPayroll / 1000).toFixed(0)}K`} 
          icon={DollarSign} 
          color="purple" 
        />
        <MetricCard 
          label="Employees Paid" 
          value={processedPayroll.length} 
          icon={CheckCircle} 
          color="green" 
        />
        <MetricCard 
          label="Pending" 
          value={draftPayroll.length} 
          icon={AlertCircle} 
          color="orange" 
        />
        <MetricCard 
          label="Total Employees" 
          value={employees.length} 
          icon={Users} 
          color="blue" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payroll Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Payroll Status - {new Date().toLocaleString('en', { month: 'long' })}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/payroll')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {thisMonthPayroll.slice(0, 5).map((record) => {
              const employee = employees.find(p => p.employee_id === record.employee_id);
              return (
                <div key={record.payroll_id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {employee?.first_name} {employee?.last_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Net: ${(record.net_salary || 0).toLocaleString()}
                    </div>
                  </div>
                  <Badge variant={
                    record.status === 'PAID' ? 'default' :
                    record.status === 'PROCESSED' ? 'secondary' : 'outline'
                  }>
                    {record.status?.toLowerCase()}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Payroll Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payroll Trends - Last 6 Months</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                net: {
                  label: "Net Payroll",
                  color: "hsl(var(--chart-1))",
                },
                base: {
                  label: "Base Salary",
                  color: "hsl(var(--chart-2))",
                },
                adjustments: {
                  label: "Adjustments",
                  color: "hsl(var(--chart-3))",
                },
                taxes: {
                  label: "Taxes",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="net" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="base" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="adjustments" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="taxes" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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
              onClick={() => navigate('/payroll/run')}
            >
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Payroll Center</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/payroll/config')}
            >
              <CheckCircle className="h-6 w-6" />
              <span className="text-sm">Configuration</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate('/payroll')}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">View Records</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => generateReport('Payroll Report')}
            >
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};