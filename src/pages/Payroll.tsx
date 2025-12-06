import { getPayrollRecords, getAllowances, getDeductions, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, DollarSign, TrendingUp, TrendingDown, Play } from 'lucide-react';
import { mockProcessPayroll } from '@/lib/mockFunctions';

export default function Payroll() {
  const payrollRecords = getPayrollRecords();
  const allowances = getAllowances();
  const deductions = getDeductions();
  const profiles = getProfiles();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'processed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-muted-foreground">Process and manage employee payroll</p>
        </div>
        <Button onClick={() => mockProcessPayroll()}>
          <Play className="h-4 w-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payrollRecords.reduce((sum, p) => sum + p.netSalary, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Employees Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollRecords.filter(p => p.status === 'PAID').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Allowances</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${allowances.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${deductions.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Payroll Records</TabsTrigger>
          <TabsTrigger value="allowances">Allowances</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollRecords.map(record => {
                  const profile = profiles.find(p => p.id === record.employeeId);
                  return (
                    <div key={record.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={profile?.profileImage} />
                          <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground">Period: {new Date(record.periodStart).toLocaleDateString()} - {new Date(record.periodEnd).toLocaleDateString()}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>Base: ${record.baseAmount.toLocaleString()}</span>
                            <span>Adjustments: ${record.adjustments.toLocaleString()}</span>
                            <span>Taxes: ${record.taxes.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ${record.netSalary.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allowances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Allowances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allowances.map(allowance => {
                  const profile = profiles.find(p => p.id === allowance.employeeId);
                  return (
                    <div key={allowance.adjustmentId} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={profile?.profileImage} />
                          <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground">{allowance.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          +${allowance.amount} {allowance.currency}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deductions.map(deduction => {
                  const profile = profiles.find(p => p.id === deduction.employeeId);
                  return (
                    <div key={deduction.adjustmentId} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={profile?.profileImage} />
                          <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground">{deduction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-red-600">
                          -${deduction.amount} {deduction.currency}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
