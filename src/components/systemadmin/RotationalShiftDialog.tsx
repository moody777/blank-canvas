import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssignRotationalShift } from '@/lib/mockFunctions';
import { getShifts, getProfiles } from '@/lib/mockFunctions';
import { getEmployeeName, getShiftName } from '@/lib/dataAdapters';
import { RotateCw } from 'lucide-react';

interface RotationalShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RotationalShiftDialog({ open, onOpenChange }: RotationalShiftDialogProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [shiftCycle, setShiftCycle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cycleDuration, setCycleDuration] = useState('7');

  const shifts = getShifts();
  const profiles = getProfiles();

  const handleSubmit = () => {
    if (!employeeId || !shiftCycle || !startDate) {
      return;
    }

    AssignRotationalShift(employeeId, shiftCycle, startDate, endDate);

    setEmployeeId('');
    setShiftCycle('');
    setStartDate('');
    setEndDate('');
    setCycleDuration('7');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Rotational Shift</DialogTitle>
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

          <div className="space-y-2">
            <Label>Shift Cycle Pattern *</Label>
            <Input
              value={shiftCycle}
              onChange={(e) => setShiftCycle(e.target.value)}
              placeholder="e.g., Morning-Afternoon-Night or 1-2-3"
            />
            <p className="text-sm text-muted-foreground">
              Define the rotation pattern (e.g., "Morning-Evening-Night" or "1-2-3")
            </p>
          </div>

          <div className="space-y-2">
            <Label>Cycle Duration (days)</Label>
            <Input
              type="number"
              value={cycleDuration}
              onChange={(e) => setCycleDuration(e.target.value)}
              min="1"
            />
            <p className="text-sm text-muted-foreground">
              How many days before the cycle repeats
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-semibold mb-2">Rotation Preview</h4>
            <p className="text-sm text-muted-foreground">
              Employee will rotate through: <span className="font-medium">{shiftCycle || 'Pattern not set'}</span>
              <br />
              Cycle repeats every: <span className="font-medium">{cycleDuration} days</span>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!employeeId || !shiftCycle || !startDate}>
            <RotateCw className="h-4 w-4 mr-2" />
            Configure Rotation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
