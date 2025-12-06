import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPayrollRecords, getProfiles } from '@/lib/mockFunctions';
import { AlertCircle, Play, FileText, Settings } from 'lucide-react';
import {
  mockValidateAttendanceBeforePayroll,
  mockSyncAttendanceToPayroll,
  mockGeneratePayroll,
  mockGeneratePayslip
} from '@/lib/mockFunctions';
import { PayrollAdjustmentDialog } from '@/components/payroll/PayrollAdjustmentDialog';

export default function PayrollRunCenter() {
  const [period, setPeriod] = useState('2024-01');
  const payrollRecords = getPayrollRecords();
  const profiles = getProfiles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll Run Center</h1>
        <p className="text-muted-foreground">Generate and manage payroll periods</p>
      </div>

      <Tabs defaultValue="run" className="space-y-4">
        <TabsList>
          <TabsTrigger value="run">New Payroll Run</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
        </TabsList>

        <TabsContent value="run">
          <Card>
            <CardHeader>
              <CardTitle>Generate Payroll</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Pay Period</Label>
                <Input
                  type="month"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-medium mb-3">Pre-flight Checks</h4>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => mockValidateAttendanceBeforePayroll()}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Validate Attendance Records
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => mockSyncAttendanceToPayroll()}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Sync Attendance to Payroll
                  </Button>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full"
                onClick={() => mockGeneratePayroll(period)}
              >
                <Play className="h-4 w-4 mr-2" />
                Generate Payroll for {period}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary for {period}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Adjustments</TableHead>
                    <TableHead>Taxes</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollRecords.map(record => {
                    const profile = profiles.find(p => p.id === record.employeeId);
                    
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {profile ? `${profile.firstName} ${profile.lastName}` : 'Unknown'}
                        </TableCell>
                        <TableCell>${record.baseAmount.toLocaleString()}</TableCell>
                        <TableCell className={record.adjustments >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {record.adjustments >= 0 ? '+' : ''}{record.adjustments}
                        </TableCell>
                        <TableCell>-${record.taxes.toLocaleString()}</TableCell>
                        <TableCell className="font-bold">
                          ${record.netSalary.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            record.status === 'PAID' ? 'bg-green-500' :
                            record.status === 'PROCESSED' ? 'bg-blue-500' : ''
                          }>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => mockGeneratePayslip(record.id)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Payslip
                            </Button>
                            <PayrollAdjustmentDialog
                              payrollId={record.id}
                              trigger={
                                <Button size="sm" variant="ghost">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Past Payroll Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Total Gross</TableHead>
                    <TableHead>Total Net</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-01</TableCell>
                    <TableCell>{profiles.length}</TableCell>
                    <TableCell>
                      ${payrollRecords.reduce((sum, r) => sum + r.baseAmount, 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ${payrollRecords.reduce((sum, r) => sum + r.netSalary, 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Paid</Badge>
                    </TableCell>
                    <TableCell>2024-01-31</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
