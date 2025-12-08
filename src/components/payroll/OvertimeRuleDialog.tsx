import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { payrollClient } from '@/lib/client';
import { toast } from 'sonner';

interface OvertimeRuleDialogProps {
  trigger: React.ReactNode;
  initialData?: { dayType: string; multiplier: number; maxHours?: number };
}

export const OvertimeRuleDialog = ({ trigger, initialData }: OvertimeRuleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [dayType, setDayType] = useState(initialData?.dayType || '');
  const [multiplier, setMultiplier] = useState(initialData?.multiplier.toString() || '');
  const [maxHours, setMaxHours] = useState(initialData?.maxHours?.toString() || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await payrollClient.configureOvertimeRules(dayType, parseFloat(multiplier), maxHours ? parseInt(maxHours) : undefined);
      toast.success(`Overtime rule ${initialData ? 'updated' : 'created'} successfully`);
      setOpen(false);
    } catch (error) {
      toast.error('Failed to save overtime rule');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Overtime Rule' : 'Add Overtime Rule'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dayType">Day Type</Label>
            <Select value={dayType} onValueChange={setDayType} required>
              <SelectTrigger><SelectValue placeholder="Select day type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday">Weekday</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="multiplier">Pay Multiplier</Label>
            <Input id="multiplier" type="number" step="0.1" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} placeholder="1.5" required />
            <p className="text-xs text-muted-foreground">e.g., 1.5 = time and a half, 2.0 = double time</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxHours">Max Hours (Optional)</Label>
            <Input id="maxHours" type="number" value={maxHours} onChange={(e) => setMaxHours(e.target.value)} placeholder="Leave empty for unlimited" />
          </div>
          <Button type="submit" className="w-full">{initialData ? 'Update' : 'Create'} Rule</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
