import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Settings as SettingsIcon, FileText, Clock, DollarSign, Plus, Edit } from 'lucide-react';
import { getInsurancePlans, getTaxForms, getLeaveTypes, getShifts } from '@/lib/mockFunctions';
import { mockUpdateSettings } from '@/lib/mockFunctions';

export default function Settings() {
  const leaveTypes = getLeaveTypes();
  const insurancePlans = getInsurancePlans();
  const taxForms = getTaxForms();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and policies</p>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="leave">Leave Policies</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Policies</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Plans</TabsTrigger>
          <TabsTrigger value="tax">Tax Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                User Roles & Permissions
              </CardTitle>
              <Button onClick={() => mockUpdateSettings({ type: 'role' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['employee', 'line_manager', 'hr_admin', 'payroll_specialist', 'system_admin'].map(role => (
                  <div key={role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold capitalize">{role.replace('_', ' ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          Access level configuration for {role.replace('_', ' ')}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ role })}>
                        <Edit className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Leave Policies
              </CardTitle>
              <Button onClick={() => mockUpdateSettings({ type: 'leave_policy' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveTypes.map(type => (
              <div key={type.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold capitalize">{type.leaveType} Leave Policy</h3>
                  <Badge variant="secondary">Leave Type</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{type.leaveDescription || 'No description'}</p>
                <div className="flex gap-3 mb-3">
                  <Badge variant="outline">
                    Policy Configuration
                  </Badge>
                </div>
                    <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ leaveType: type.id })}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Policy
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payroll Policies
              </CardTitle>
              <Button onClick={() => mockUpdateSettings({ type: 'payroll_policy' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Overtime Rate', value: '1.5x base rate', description: 'Applied after 40 hours/week' },
                  { name: 'Lateness Deduction', value: '15 min grace period', description: 'Deduction after grace period' },
                  { name: 'Bonus Calculation', value: 'Performance-based', description: 'Quarterly evaluation' },
                  { name: 'Tax Withholding', value: 'Federal + State', description: 'Based on jurisdiction' }
                ].map((policy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.description}</p>
                        <Badge variant="secondary" className="mt-2">{policy.value}</Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ policy: policy.name })}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Salary Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Hourly', 'Monthly', 'Contract-Based'].map(type => (
                  <div key={type} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{type}</p>
                      <p className="text-sm text-muted-foreground">Configuration for {type.toLowerCase()} salary calculation</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ salaryType: type })}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Insurance Plans</CardTitle>
              <Button onClick={() => mockUpdateSettings({ type: 'insurance_plan' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurancePlans.map(plan => (
                  <div key={plan.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{plan.type}</h3>
                      <Badge variant="secondary">{plan.contributionRate}% contribution</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{plan.coverage || 'No coverage details'}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ plan: plan.id })}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tax Forms
              </CardTitle>
              <Button onClick={() => mockUpdateSettings({ type: 'tax_form' })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Form
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxForms.map(form => (
                  <div key={form.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{form.jurisdiction}</h3>
                        <p className="text-sm text-muted-foreground">Tax Form</p>
                      </div>
                      <Badge variant="secondary">{form.validityPeriod || 'Active'}</Badge>
                    </div>
                    <p className="text-sm mb-3">{form.formContent || 'No content'}</p>
                    <Button variant="outline" size="sm" onClick={() => mockUpdateSettings({ form: form.id })}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Form
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
