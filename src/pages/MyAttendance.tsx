import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAttendanceRecords, getShifts } from '@/lib/mockFunctions';
import { getAttendanceDate, getAttendanceStatus, getShiftName } from '@/lib/dataAdapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, LogIn, LogOut, AlertCircle, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClockInOutDialog } from '@/components/employee/ClockInOutDialog';
import { CorrectionRequestDialog } from '@/components/employee/CorrectionRequestDialog';

export default function MyAttendance() {
  const { user } = useAuth();
  const [clockDialogOpen, setClockDialogOpen] = useState(false);
  const [clockType, setClockType] = useState<'in' | 'out'>('in');
  const [correctionDialogOpen, setCorrectionDialogOpen] = useState(false);
  
  const userAttendance = getAttendanceRecords().filter(a => a.employeeId === user?.employeeId);
  const userShift = getShifts().find(s => s.id === userAttendance[0]?.shiftId);
  
  const thisMonthAttendance = userAttendance.filter(a => 
    new Date(getAttendanceDate(a)).getMonth() === new Date().getMonth()
  );
  const presentDays = thisMonthAttendance.filter(a => getAttendanceStatus(a) === 'present').length;
  const lateDays = thisMonthAttendance.filter(a => getAttendanceStatus(a) === 'late').length;
  const absentDays = thisMonthAttendance.filter(a => getAttendanceStatus(a) === 'absent').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      case 'half-day': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance and work hours</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setClockType('in');
              setClockDialogOpen(true);
            }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Clock In
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setClockType('out');
              setClockDialogOpen(true);
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Clock Out
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCorrectionDialogOpen(true)}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Request Correction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentDays}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Late Days</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lateDays}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{absentDays}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Shift</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{userShift ? getShiftName(userShift) : 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {userShift ? `${userShift.startTime} - ${userShift.endTime}` : 'Not assigned'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="all">All History</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {thisMonthAttendance.slice(0, 10).map((record) => {
                  const status = getAttendanceStatus(record);
                  return (
                  <div key={record.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{new Date(getAttendanceDate(record)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.entryTime ? `In: ${record.entryTime}` : 'No entry'} • {record.exitTime ? `Out: ${record.exitTime}` : 'No exit'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(status)}>{status}</Badge>
                  </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userAttendance.map((record) => {
                  const status = getAttendanceStatus(record);
                  return (
                  <div key={record.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{new Date(getAttendanceDate(record)).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.entryTime ? `In: ${record.entryTime}` : 'No entry'} • {record.exitTime ? `Out: ${record.exitTime}` : 'No exit'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(status)}>{status}</Badge>
                  </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ClockInOutDialog open={clockDialogOpen} onOpenChange={setClockDialogOpen} type={clockType} />
      <CorrectionRequestDialog open={correctionDialogOpen} onOpenChange={setCorrectionDialogOpen} />
    </div>
  );
}
