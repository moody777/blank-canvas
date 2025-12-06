import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfigureSplitShift } from '@/lib/mockFunctions';
import { getShifts, getProfiles } from '@/lib/mockFunctions';
import { getEmployeeName, getShiftName } from '@/lib/dataAdapters';
import { CalendarClock } from 'lucide-react';

interface SplitShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SplitShiftDialog({ open, onOpenChange }: SplitShiftDialogProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [firstShiftId, setFirstShiftId] = useState('');
  const [firstStart, setFirstStart] = useState('');
  const [firstEnd, setFirstEnd] = useState('');
  const [secondShiftId, setSecondShiftId] = useState('');
  const [secondStart, setSecondStart] = useState('');
  const [secondEnd, setSecondEnd] = useState('');
  const [breakBetween, setBreakBetween] = useState('60');

  const shifts = getShifts();
  const profiles = getProfiles();

  const handleSubmit = () => {
    if (!employeeId || !firstShiftId || !secondShiftId) {
      return;
    }

    ConfigureSplitShift({
      employeeId,
      firstShift: { shiftId: firstShiftId, startTime: firstStart, endTime: firstEnd },
      secondShift: { shiftId: secondShiftId, startTime: secondStart, endTime: secondEnd },
      breakBetweenShifts: parseInt(breakBetween)
    });

    setEmployeeId('');
    setFirstShiftId('');
    setSecondShiftId('');
    setBreakBetween('60');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Split Shift</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Employee *</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {getEmployeeName(profile)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-semibold">First Shift</h4>
            <div className="space-y-2">
              <Label>Shift Type</Label>
              <Select value={firstShiftId} onValueChange={setFirstShiftId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift.id} value={shift.id}>
                      {getShiftName(shift)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={firstStart}
                  onChange={(e) => setFirstStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={firstEnd}
                  onChange={(e) => setFirstEnd(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Break Between Shifts (minutes)</Label>
            <Input
              type="number"
              value={breakBetween}
              onChange={(e) => setBreakBetween(e.target.value)}
              min="0"
            />
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-semibold">Second Shift</h4>
            <div className="space-y-2">
              <Label>Shift Type</Label>
              <Select value={secondShiftId} onValueChange={setSecondShiftId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift.id} value={shift.id}>
                      {getShiftName(shift)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={secondStart}
                  onChange={(e) => setSecondStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={secondEnd}
                  onChange={(e) => setSecondEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!employeeId || !firstShiftId || !secondShiftId}>
            <CalendarClock className="h-4 w-4 mr-2" />
            Configure Split Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
