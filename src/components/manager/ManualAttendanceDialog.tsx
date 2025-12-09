import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { managerClient } from '@/lib/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface ManualAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number;
  employeeName: string;
}

export function ManualAttendanceDialog({ open, onOpenChange, employeeId, employeeName }: ManualAttendanceDialogProps) {
  const [date, setDate] = useState<Date>();
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!date || !entryTime || !reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await managerClient.recordManualAttendance(
        employeeId,
        date,
        entryTime,
        exitTime || undefined,
        1 // recorded by manager ID would come from context
      );
      toast.success('Manual attendance recorded successfully');
      onOpenChange(false);
      setDate(undefined);
      setEntryTime('');
      setExitTime('');
      setReason('');
    } catch (error) {
      toast.error('Failed to record attendance');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Manual Attendance - {employeeName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Entry Time *</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="time" 
                value={entryTime} 
                onChange={(e) => setEntryTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Exit Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="time" 
                value={exitTime} 
                onChange={(e) => setExitTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason *</Label>
            <Textarea
              placeholder="Explain why manual attendance is being recorded..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Record Attendance</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
