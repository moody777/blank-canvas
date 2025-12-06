import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, TrendingUp, Users, Calendar, DollarSign, BarChart3, Search, ShieldCheck, UserCheck } from 'lucide-react';
import { getProfiles, getAttendanceRecords, getPayrollRecords, getDepartments, getAttendanceTrends } from '@/lib/mockFunctions';
import { mockGenerateReport, mockExportReport } from '@/lib/mockFunctions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { getAttendanceStatus, getAttendanceDate } from '@/lib/dataAdapters';
import { useToast } from '@/hooks/use-toast';

export default function Reports() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('hr');
  const [timePeriod, setTimePeriod] = useState('month');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [searchTerm, setSearchTerm] = useState('');
  
  const profiles = getProfiles();
  const attendanceRecords = getAttendanceRecords();
  const payrollRecords = getPayrollRecords();
  const departments = getDepartments();
  const attendanceTrends = getAttendanceTrends();
  
  const totalEmployees = profiles.length;
  const activeEmployees = profiles.filter(p => p.employmentStatus === 'ACTIVE').length;
  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(a => getAttendanceStatus(a) === 'present').length;
  const totalPayroll = payrollRecords.reduce((sum, p) => sum + p.netSalary, 0);

  const attendanceRate = ((presentCount / totalAttendance) * 100).toFixed(1);

  // Diversity data (mock)
  const diversityData = [
    { name: 'Male', value: 60, color: 'hsl(var(--chart-1))' },
    { name: 'Female', value: 35, color: 'hsl(var(--chart-2))' },
    { name: 'Other', value: 5, color: 'hsl(var(--chart-3))' },
  ];

  // Compliance data (mock)
  const complianceData = [
    { category: 'Training Completed', compliant: 85, nonCompliant: 15 },
    { category: 'Document Verification', compliant: 92, nonCompliant: 8 },
    { category: 'Policy Acknowledgment', compliant: 78, nonCompliant: 22 },
    { category: 'Safety Certifications', compliant: 95, nonCompliant: 5 },
  ];

  const handleGenerateComplianceReport = () => {
    toast({
      title: 'Generating Compliance Report',
      description: 'Your compliance report is being generated...',
    });
    setTimeout(() => {
      toast({
        title: 'Report Ready',
        description: 'Compliance report has been generated and is ready for download.',
      });
    }, 2000);
  };

  const handleGenerateDiversityReport = () => {
    toast({
      title: 'Generating Diversity Report',
      description: 'Your diversity report is being generated...',
    });
    setTimeout(() => {
      toast({
        title: 'Report Ready',
        description: 'Diversity report has been generated and is ready for download.',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view organizational reports</p>
        </div>
        <Button onClick={() => mockExportReport('current', 'pdf')}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">{activeEmployees} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Tabs defaultValue="custom" className="space-y-4">
        <TabsList>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="diversity">Diversity Reports</TabsTrigger>
          <TabsTrigger value="department">Department Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">HR Analytics</SelectItem>
                      <SelectItem value="attendance">Attendance Summary</SelectItem>
                      <SelectItem value="payroll">Payroll Report</SelectItem>
                      <SelectItem value="department">Department Analysis</SelectItem>
                      <SelectItem value="employee">Employee Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => {
                  mockGenerateReport(`${reportType} - ${timePeriod}`);
                  setTimeout(() => mockExportReport('generated', reportFormat as 'pdf' | 'excel' | 'csv'), 1000);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search compliance records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={handleGenerateComplianceReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Compliance Report
                </Button>
              </div>
              
              <ChartContainer
                config={{
                  compliant: { label: "Compliant", color: "hsl(var(--chart-2))" },
                  nonCompliant: { label: "Non-Compliant", color: "hsl(var(--chart-4))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceData} layout="vertical" margin={{ left: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} className="text-xs" />
                    <YAxis dataKey="category" type="category" className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="compliant" stackId="a" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="nonCompliant" stackId="a" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diversity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-500" />
                Diversity Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handleGenerateDiversityReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Diversity Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Gender Distribution</h4>
                  <ChartContainer
                    config={{
                      value: { label: "Count", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diversityData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {diversityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Statistics Summary</h4>
                  {diversityData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{item.name}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Employee Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  employeeCount: {
                    label: "Employees",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departments} layout="vertical" margin={{ left: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="employeeCount" fill="hsl(var(--chart-1))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Attendance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends - Last 7 Days</CardTitle>
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
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrends}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area type="monotone" dataKey="present" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorPresent)" />
                <Area type="monotone" dataKey="late" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorLate)" />
                <Area type="monotone" dataKey="absent" stroke="hsl(var(--chart-4))" fillOpacity={1} fill="url(#colorAbsent)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
