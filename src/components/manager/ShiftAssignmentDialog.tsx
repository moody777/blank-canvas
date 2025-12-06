import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockAssignShift, mockReassignShift } from '@/lib/mockFunctions';
import { getShifts } from '@/lib/mockFunctions';
import { getShiftName } from '@/lib/dataAdapters';
import { toast } from 'sonner';

interface ShiftAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  employeeName: string;
  mode?: 'assign' | 'reassign';
  currentShiftId?: string;
}

export function ShiftAssignmentDialog({ 
  open, 
  onOpenChange, 
  employeeId, 
  employeeName,
  mode = 'assign',
  currentShiftId
}: ShiftAssignmentDialogProps) {
  const shifts = getShifts();
  const [shiftId, setShiftId] = useState(currentShiftId || '');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = async () => {
    if (!shiftId || !startDate) {
      toast.error('Please select a shift and start date');
      return;
    }

    try {
      if (mode === 'reassign' && currentShiftId) {
        await mockReassignShift(employeeId, currentShiftId, shiftId, format(startDate, 'yyyy-MM-dd'));
        toast.success('Shift reassigned successfully');
      } else {
        await mockAssignShift(employeeId, shiftId, format(startDate, 'yyyy-MM-dd'), endDate ? format(endDate, 'yyyy-MM-dd') : undefined);
        toast.success('Shift assigned successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to assign shift');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'reassign' ? 'Reassign' : 'Assign'} Shift - {employeeName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Shift</Label>
            <Select value={shiftId} onValueChange={setShiftId}>
              <SelectTrigger>
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                {shifts.map(shift => {
                  const shiftName = getShiftName(shift);
                  return (
                    <SelectItem key={shift.id} value={shift.id}>
                      {shiftName} ({shift.startTime} - {shift.endTime})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left", !startDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left", !endDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(date) => startDate ? date < startDate : false} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Assign Shift</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
