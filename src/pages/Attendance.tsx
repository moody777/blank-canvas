import { useState } from 'react';
import { getAttendanceRecords, getProfiles, getShifts, getHolidays } from '@/lib/mockFunctions';
import { getAttendanceDate, getAttendanceStatus, getShiftName } from '@/lib/dataAdapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, Search, Plus, Edit, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockAddAttendanceRecord, mockAddShift, mockAddHoliday } from '@/lib/mockFunctions';
import { AttendanceEditDialog } from '@/components/attendance/AttendanceEditDialog';
import type { AttendanceRecord } from '@/types';

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  // Filter attendance records
  const filteredRecords = getAttendanceRecords().filter(record => {
    const profile = getProfiles().find(p => p.id === record.employeeId);
    const recordDate = new Date(getAttendanceDate(record));
    
    // Search filter
    const matchesSearch = !searchTerm || 
      `${profile?.firstName} ${profile?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || getAttendanceStatus(record) === statusFilter;
    
    // Date range filter
    const matchesFromDate = !fromDate || recordDate >= fromDate;
    const matchesToDate = !toDate || recordDate <= toDate;
    
    return matchesSearch && matchesStatus && matchesFromDate && matchesToDate;
  });

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
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground">Track and manage employee attendance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredRecords.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CalendarIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredRecords.filter(a => getAttendanceStatus(a) === 'present').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredRecords.filter(a => getAttendanceStatus(a) === 'late').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <CalendarIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredRecords.filter(a => getAttendanceStatus(a) === 'absent').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="holidays">Holidays</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <CardTitle>All Attendance Records</CardTitle>
                  <Button onClick={() => mockAddAttendanceRecord()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="half-day">Half Day</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-[150px] justify-start text-left font-normal", !fromDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, "PPP") : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-[150px] justify-start text-left font-normal", !toDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, "PPP") : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  {(statusFilter !== 'all' || fromDate || toDate || searchTerm) && (
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setStatusFilter('all');
                        setFromDate(undefined);
                        setToDate(undefined);
                        setSearchTerm('');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No attendance records found</p>
                  </div>
                ) : (
                  filteredRecords.map(record => {
                  const profile = getProfiles().find(p => p.id === record.employeeId);
                  const recordDate = getAttendanceDate(record);
                  return (
                    <div key={record.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={profile?.profileImage} />
                          <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground">{new Date(recordDate).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {record.entryTime} - {record.exitTime} • {record.loginMethod}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(getAttendanceStatus(record))}>{getAttendanceStatus(record)}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSelectedRecord(record);
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shift Schedules</h2>
            <Button onClick={() => mockAddShift()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shift
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getShifts().map(shift => {
              const shiftName = getShiftName(shift);
              return (
                <Card key={shift.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{shiftName}</CardTitle>
                      <Badge className="capitalize">Shift</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Time</p>
                        <p className="font-semibold">{shift.startTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Time</p>
                        <p className="font-semibold">{shift.endTime}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Break Duration</p>
                      <p className="font-semibold">{shift.breakDuration} minutes</p>
                    </div>
                    <Badge className={shift.status === 'ACTIVE' ? 'bg-green-500' : ''}>
                      {shift.status}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="holidays" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Holidays & Exceptions</h2>
            <Button onClick={() => mockAddHoliday()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Holiday
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {getHolidays().map(holiday => (
                  <div key={holiday.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{holiday.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(holiday.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">{holiday.category}</Badge>
                      <Badge className={holiday.status === 'active' ? 'bg-green-500' : ''}>
                        {holiday.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AttendanceEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        record={selectedRecord}
      />
    </div>
  );
}
