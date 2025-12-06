import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getShifts } from '@/lib/mockFunctions';
import { mockClockIn, mockClockOut, mockRecordMultiplePunches } from '@/lib/mockFunctions';
import { getShiftName } from '@/lib/dataAdapters';
import { useToast } from '@/hooks/use-toast';
import { Clock, LogIn, LogOut } from 'lucide-react';

interface ClockInOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'in' | 'out';
}

export function ClockInOutDialog({ open, onOpenChange, type }: ClockInOutDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [shiftId, setShiftId] = useState('');
  const shifts = getShifts();

  const handleClock = () => {
    if (type === 'in') {
      mockClockIn();
      toast({ title: 'Clocked In', description: 'Your attendance has been recorded' });
    } else {
      mockClockOut();
      toast({ title: 'Clocked Out', description: 'Your exit time has been recorded' });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'in' ? <LogIn className="h-5 w-5" /> : <LogOut className="h-5 w-5" />}
            Clock {type === 'in' ? 'In' : 'Out'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Time</Label>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Clock className="h-6 w-6" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {type === 'in' && (
            <div className="space-y-2">
              <Label>Select Shift</Label>
              <Select value={shiftId} onValueChange={setShiftId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your shift" />
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
          )}

          <Button onClick={handleClock} className="w-full" size="lg">
            Confirm Clock {type === 'in' ? 'In' : 'Out'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
