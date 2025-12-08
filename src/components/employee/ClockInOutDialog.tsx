import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getShiftSchedules, getShiftNameById, clockIn, clockOut } from '@/lib/dataService';
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
  const shifts = getShiftSchedules();

  const handleClock = async () => {
    const userId = user?.id ? parseInt(user.id) : 0;
    if (type === 'in') {
      await clockIn(userId, shiftId ? parseInt(shiftId) : undefined);
      toast({ title: 'Clocked In', description: 'Your attendance has been recorded' });
    } else {
      await clockOut(userId);
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
                    const shiftName = getShiftNameById(shift.shift_id || 0);
                    return (
                      <SelectItem key={shift.shift_id} value={String(shift.shift_id)}>
                        {shiftName} ({shift.start_time} - {shift.end_time})
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