import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockEditAttendanceRecord } from '@/lib/mockFunctions';
import { useToast } from '@/hooks/use-toast';
import type { AttendanceRecord } from '@/types';
import { getAttendanceDate, getAttendanceStatus } from '@/lib/dataAdapters';

interface AttendanceEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: AttendanceRecord | null;
}

export function AttendanceEditDialog({ open, onOpenChange, record }: AttendanceEditDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [status, setStatus] = useState('');
  const [loginMethod, setLoginMethod] = useState('');

  useEffect(() => {
    if (record) {
      const recordDate = getAttendanceDate(record);
      setDate(new Date(recordDate));
      setEntryTime(record.entryTime ?? '');
      setExitTime(record.exitTime ?? '');
      setStatus(getAttendanceStatus(record));
      setLoginMethod(record.loginMethod);
    }
  }, [record]);

  const handleSave = () => {
    if (!record || !date) return;

    mockEditAttendanceRecord(record.id);
    
    toast({
      title: 'Success',
      description: 'Attendance record updated successfully',
    });
    
    onOpenChange(false);
  };

  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Attendance Record</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entryTime">Entry Time</Label>
            <Input
              id="entryTime"
              type="time"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exitTime">Exit Time</Label>
            <Input
              id="exitTime"
              type="time"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Login Method</Label>
            <Select value={loginMethod} onValueChange={setLoginMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="biometric">Biometric</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
