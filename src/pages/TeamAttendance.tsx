import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getAttendanceRecords, getProfiles, getTimeRequests, getCorrectionRequests } from '@/lib/mockFunctions';
import { ManualAttendanceDialog } from '@/components/manager/ManualAttendanceDialog';
import { TimeRequestApprovalDialog } from '@/components/manager/TimeRequestApprovalDialog';
import { TimeRequest } from '@/types/index';
import { getAttendanceDate, getAttendanceStatus } from '@/lib/dataAdapters';

export default function TeamAttendance() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [manualAttendanceOpen, setManualAttendanceOpen] = useState(false);
  const [timeRequestOpen, setTimeRequestOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: number; name: string } | null>(null);
  const [selectedTimeRequest, setSelectedTimeRequest] = useState<TimeRequest | null>(null);

  const profiles = getProfiles();
  const attendanceRecords = getAttendanceRecords();
  const correctionRequests = getCorrectionRequests();
  const timeRequests = getTimeRequests();

  const managerId = 1; // Current manager
  const teamMembers = profiles.filter(p => p.manager_id === managerId);
  
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const teamAttendance = attendanceRecords.filter(
    record => getAttendanceDate(record) === dateStr && teamMembers.some(m => m.employee_id === record.employeeId)
  );

  const missedPunches = teamAttendance.filter(record => !record.exitTime);
  const pendingCorrections = correctionRequests.filter(req => req.status === 'PENDING');
  const pendingTimeRequests = timeRequests.filter(req => req.status === 'PENDING');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-500"><XCircle className="h-3 w-3 mr-1" />Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />Late</Badge>;
      case 'half-day':
        return <Badge className="bg-orange-500"><Clock className="h-3 w-3 mr-1" />Half Day</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Attendance</h1>
        <p className="text-muted-foreground">Monitor and manage your team's attendance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Missed Punches</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{missedPunches.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Corrections</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCorrections.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Requests</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTimeRequests.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Date Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Attendance ({teamAttendance.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamAttendance.map(record => {
              const profile = profiles.find(p => p.employee_id === record.employeeId);
              return (
                <div key={record.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.entryTime ? `In: ${record.entryTime}` : 'No entry'} 
                      {record.exitTime ? ` • Out: ${record.exitTime}` : ' • Missing exit'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(getAttendanceStatus(record))}
                    <Badge variant="outline">{record.loginMethod}</Badge>
                    {!record.exitTime && (
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedEmployee({ id: record.employeeId, name: `${profile?.first_name} ${profile?.last_name}` });
                          setManualAttendanceOpen(true);
                        }}
                      >
                        Record Exit
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            {teamAttendance.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No attendance records for this date</p>
            )}
          </div>
        </CardContent>
      </Card>

      {pendingTimeRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Time Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTimeRequests.map(request => {
                const profile = profiles.find(p => p.employee_id === request.employee_id);
                return (
                  <div key={request.employee_id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.request_type} • {new Date(request.request_date).toLocaleDateString()} • {Math.round(request.duration_minutes / 60)}h
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedEmployee({ id: request.employee_id, name: `${profile?.first_name} ${profile?.last_name}` });
                        setSelectedTimeRequest(request);
                        setTimeRequestOpen(true);
                      }}
                    >
                      Review
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedEmployee && (
        <>
          <ManualAttendanceDialog
            open={manualAttendanceOpen}
            onOpenChange={setManualAttendanceOpen}
            employeeId={selectedEmployee.id}
            employeeName={selectedEmployee.name}
          />
          <TimeRequestApprovalDialog
            open={timeRequestOpen}
            onOpenChange={setTimeRequestOpen}
            request={selectedTimeRequest}
            employeeName={selectedEmployee.name}
          />
        </>
      )}
    </div>
  );
}
