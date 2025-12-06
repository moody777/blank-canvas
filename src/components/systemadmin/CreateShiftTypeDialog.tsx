import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateShiftType, CreateShiftName } from '@/lib/mockFunctions';
import { Plus } from 'lucide-react';

interface CreateShiftTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateShiftTypeDialog({ open, onOpenChange }: CreateShiftTypeDialogProps) {
  const [shiftTypeName, setShiftTypeName] = useState('');
  const [shiftTypeDesc, setShiftTypeDesc] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [shiftNameDesc, setShiftNameDesc] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakDuration, setBreakDuration] = useState('60');

  const handleSubmit = () => {
    if (!shiftTypeName || !shiftName) {
      return;
    }

    // Create shift type and shift name
    CreateShiftType(shiftTypeName, shiftTypeDesc);
    CreateShiftName(shiftName, '1', shiftNameDesc);

    // Reset form
    setShiftTypeName('');
    setShiftTypeDesc('');
    setShiftName('');
    setShiftNameDesc('');
    setStartTime('09:00');
    setEndTime('17:00');
    setBreakDuration('60');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Shift Type</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shift-type-name">Shift Type Name *</Label>
            <Input
              id="shift-type-name"
              value={shiftTypeName}
              onChange={(e) => setShiftTypeName(e.target.value)}
              placeholder="e.g., Regular, Night, Weekend"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shift-type-desc">Shift Type Description</Label>
            <Textarea
              id="shift-type-desc"
              value={shiftTypeDesc}
              onChange={(e) => setShiftTypeDesc(e.target.value)}
              placeholder="Describe the shift type..."
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-4">Shift Details</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shift-name">Shift Name *</Label>
                <Input
                  id="shift-name"
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                  placeholder="e.g., Morning Shift, Night Shift"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift-name-desc">Shift Description</Label>
                <Textarea
                  id="shift-name-desc"
                  value={shiftNameDesc}
                  onChange={(e) => setShiftNameDesc(e.target.value)}
                  placeholder="Describe this specific shift..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="break-duration">Break (minutes)</Label>
                  <Input
                    id="break-duration"
                    type="number"
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!shiftTypeName || !shiftName}>
            <Plus className="h-4 w-4 mr-2" />
            Create Shift Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
