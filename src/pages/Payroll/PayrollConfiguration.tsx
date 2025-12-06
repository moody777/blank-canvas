import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getPayGrades, getOvertimeRules, getTaxRules } from '@/lib/mockFunctions';
import { Plus, Settings } from 'lucide-react';
import { mockConfigurePayrollPolicies } from '@/lib/mockFunctions';
import { PayGradeDialog } from '@/components/payroll/PayGradeDialog';
import { AllowanceDialog } from '@/components/payroll/AllowanceDialog';
import { OvertimeRuleDialog } from '@/components/payroll/OvertimeRuleDialog';
import { TaxRuleDialog } from '@/components/payroll/TaxRuleDialog';

export default function PayrollConfiguration() {
  const payGrades = getPayGrades();
  const overtimeRules = getOvertimeRules();
  const taxRules = getTaxRules();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll Configuration</h1>
        <p className="text-muted-foreground">Configure pay grades, allowances, and payroll policies</p>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grades">Pay Grades</TabsTrigger>
          <TabsTrigger value="allowances">Shift Allowances</TabsTrigger>
          <TabsTrigger value="overtime">Overtime Rules</TabsTrigger>
          <TabsTrigger value="tax">Tax Rules</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="grades">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pay Grades</CardTitle>
              <PayGradeDialog
                trigger={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pay Grade
                  </Button>
                }
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade Name</TableHead>
                    <TableHead>Minimum Salary</TableHead>
                    <TableHead>Maximum Salary</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payGrades.map(grade => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.gradeName}</TableCell>
                      <TableCell>${grade.minSalary.toLocaleString()}</TableCell>
                      <TableCell>${grade.maxSalary.toLocaleString()}</TableCell>
                      <TableCell>USD</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allowances">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shift Allowances</CardTitle>
              <AllowanceDialog
                trigger={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Allowance
                  </Button>
                }
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Night Shift Allowance</h4>
                      <p className="text-sm text-muted-foreground">20% additional pay for night shifts</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Weekend Premium</h4>
                      <p className="text-sm text-muted-foreground">15% additional pay for weekend work</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overtime">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Overtime Rules</CardTitle>
              <OvertimeRuleDialog
                trigger={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                }
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day Type</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead>Max Hours</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overtimeRules.map(rule => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium capitalize">{rule.dayType}</TableCell>
                      <TableCell>{rule.multiplier}x</TableCell>
                      <TableCell>{rule.maxHours || 'Unlimited'}</TableCell>
                      <TableCell>
                        <OvertimeRuleDialog
                          initialData={rule}
                          trigger={
                            <Button size="sm" variant="ghost">
                              <Settings className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tax Rules</CardTitle>
              <TaxRuleDialog
                trigger={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tax Rule
                  </Button>
                }
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Exemption Threshold</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRules.map(rule => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.jurisdiction}</TableCell>
                      <TableCell>{(rule.taxRate * 100).toFixed(1)}%</TableCell>
                      <TableCell>${rule.exemptionThreshold.toLocaleString()}</TableCell>
                      <TableCell>{rule.currency}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">General Payroll Policies</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure general payroll processing policies and workflows
                  </p>
                  <Button onClick={() => mockConfigurePayrollPolicies({})}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Policies
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
