import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getShifts, getProfiles, getDepartments, getShiftAssignments } from '@/lib/mockFunctions';
import { Plus, Calendar, RotateCw, Split } from 'lucide-react';
import { mockAssignShiftToEmployee, mockAssignShiftToDepartment, mockAssignCustomShift } from '@/lib/mockFunctions';
import { getShiftName, getEmployeeName } from '@/lib/dataAdapters';
import CreateShiftTypeDialog from '@/components/systemadmin/CreateShiftTypeDialog';
import SplitShiftDialog from '@/components/systemadmin/SplitShiftDialog';
import RotationalShiftDialog from '@/components/systemadmin/RotationalShiftDialog';

export default function ShiftManagement() {
  const [createShiftOpen, setCreateShiftOpen] = useState(false);
  const [splitShiftOpen, setSplitShiftOpen] = useState(false);
  const [rotationalShiftOpen, setRotationalShiftOpen] = useState(false);
  
  const shifts = getShifts();
  const profiles = getProfiles();
  const departments = getDepartments();
  const shiftAssignments = getShiftAssignments();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shift Management</h1>
          <p className="text-muted-foreground">Manage shifts and assignments</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCreateShiftOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Shift Type
          </Button>
          <Button variant="outline" onClick={() => setSplitShiftOpen(true)}>
            <Split className="h-4 w-4 mr-2" />
            Split Shift
          </Button>
          <Button variant="outline" onClick={() => setRotationalShiftOpen(true)}>
            <RotateCw className="h-4 w-4 mr-2" />
            Rotational Shift
          </Button>
        </div>
      </div>

      <Tabs defaultValue="shifts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="shifts">Shift Types</TabsTrigger>
          <TabsTrigger value="employee">Employee Assignments</TabsTrigger>
          <TabsTrigger value="department">Department Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="shifts">
          <Card>
            <CardHeader>
              <CardTitle>Available Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shift Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Break Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map(shift => (
                    <TableRow key={shift.id}>
                      <TableCell className="font-medium">{getShiftName(shift)}</TableCell>
                      <TableCell>Regular</TableCell>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                      <TableCell>{shift.breakDuration} min</TableCell>
                      <TableCell>
                        <Badge className={shift.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}>
                          {shift.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle>Employee Shift Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shiftAssignments.map(assignment => {
                    const employee = profiles.find(p => p.id === assignment.employeeId);
                    const shift = shifts.find(s => s.id === assignment.shiftId);
                    
                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {employee ? getEmployeeName(employee) : 'Unknown'}
                        </TableCell>
                        <TableCell>{shift ? getShiftName(shift) : 'Unknown'}</TableCell>
                        <TableCell>{assignment.startDate}</TableCell>
                        <TableCell>{assignment.endDate || 'Ongoing'}</TableCell>
                        <TableCell>
                          <Badge className={assignment.status === 'ACTIVE' ? 'bg-green-500' : ''}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => mockAssignShiftToEmployee(assignment.employeeId, '1', {})}>
                            Reassign
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

        <TabsContent value="department">
          <Card>
            <CardHeader>
              <CardTitle>Department Default Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map(dept => (
                  <div key={dept.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <h4 className="font-medium">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.employeeCount} employees</p>
                    </div>
                    <Button onClick={() => mockAssignShiftToDepartment(dept.id, '1', {})}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Assign Shift
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateShiftTypeDialog open={createShiftOpen} onOpenChange={setCreateShiftOpen} />
      <SplitShiftDialog open={splitShiftOpen} onOpenChange={setSplitShiftOpen} />
      <RotationalShiftDialog open={rotationalShiftOpen} onOpenChange={setRotationalShiftOpen} />
    </div>
  );
}
