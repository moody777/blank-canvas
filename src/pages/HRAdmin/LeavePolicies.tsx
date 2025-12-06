import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getLeaveTypes, getLeaveBalances, getProfiles } from '@/lib/mockFunctions';
import { Plus, Settings, Calendar } from 'lucide-react';
import {
  mockManageLeaveTypes,
  mockConfigureLeaveEligibility,
  mockAssignLeaveEntitlement,
  mockProcessLeaveCarryForward
} from '@/lib/mockFunctions';
import { LeavePolicyDialog } from '@/components/hr/LeavePolicyDialog';

export default function LeavePolicies() {
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  const [policyMode, setPolicyMode] = useState<'type' | 'eligibility' | 'rules'>('type');
  
  const leaveTypes = getLeaveTypes();
  const leaveBalances = getLeaveBalances();
  const profiles = getProfiles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Policies & Configuration</h1>
        <p className="text-muted-foreground">Configure leave types, eligibility, and entitlements</p>
      </div>

      <Tabs defaultValue="types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="types">Leave Types</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility Rules</TabsTrigger>
          <TabsTrigger value="entitlements">Entitlements</TabsTrigger>
          <TabsTrigger value="carryforward">Carry Forward</TabsTrigger>
        </TabsList>

        <TabsContent value="types">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Leave Types</CardTitle>
              <Button onClick={() => mockManageLeaveTypes({})}>
                <Plus className="h-4 w-4 mr-2" />
                Add Leave Type
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Days Allowed</TableHead>
                    <TableHead>Requires Approval</TableHead>
                    <TableHead>Paid Leave</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveTypes.map(type => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium capitalize">{type.leaveType}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge variant='default'>
                          Yes
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant='default'>
                          Yes
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => mockManageLeaveTypes({ id: type.id })}>
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

        <TabsContent value="eligibility">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Tenure-based Eligibility</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure minimum tenure requirements for leave types
                  </p>
                  <Button onClick={() => mockConfigureLeaveEligibility({ type: 'tenure' })}>
                    Configure Rules
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Contract Type Eligibility</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set leave eligibility based on employment contract type
                  </p>
                  <Button onClick={() => mockConfigureLeaveEligibility({ type: 'contract' })}>
                    Configure Rules
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Department-specific Rules</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define special leave rules for specific departments
                  </p>
                  <Button onClick={() => mockConfigureLeaveEligibility({ type: 'department' })}>
                    Configure Rules
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entitlements">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Entitlements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveBalances.map(balance => {
                    const profile = profiles.find(p => p.id === balance.employeeId);
                    const leaveType = leaveTypes.find(lt => lt.id === balance.leaveTypeId);
                    
                    return (
                      <TableRow key={`${balance.employeeId}-${balance.leaveTypeId}`}>
                        <TableCell className="font-medium">
                          {profile ? `${profile.firstName} ${profile.lastName}` : 'Unknown'}
                        </TableCell>
                        <TableCell className="capitalize">{leaveType?.leaveType}</TableCell>
                        <TableCell>{balance.entitlement}</TableCell>
                        <TableCell>{balance.entitlement - balance.remaining}</TableCell>
                        <TableCell>{balance.remaining}</TableCell>
                        <TableCell>{new Date().getFullYear()}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => mockAssignLeaveEntitlement(balance.employeeId)}
                          >
                            Adjust
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carryforward">
          <Card>
            <CardHeader>
              <CardTitle>Leave Carry Forward</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Year-end Carry Forward</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Process carry forward of unused leave to the next year. This action will:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                    <li>Calculate unused leave for all employees</li>
                    <li>Apply carry forward limits per policy</li>
                    <li>Update balances for the new year</li>
                    <li>Generate audit reports</li>
                  </ul>
                  <Button onClick={() => mockProcessLeaveCarryForward()}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Process Carry Forward
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Policy Dialog */}
      <LeavePolicyDialog 
        open={policyDialogOpen} 
        onOpenChange={setPolicyDialogOpen}
        mode={policyMode}
      />
    </div>
  );
}
