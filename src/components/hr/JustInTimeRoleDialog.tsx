import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Clock, CalendarIcon, AlertCircle } from 'lucide-react';
import { format, addHours, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface JustInTimeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    id: string;
    name: string;
    currentRole: string;
  } | null;
  availableRoles: Array<{ id: string; name: string; }>;
  onRoleAssigned: () => void;
}

export function JustInTimeRoleDialog({ 
  open, 
  onOpenChange, 
  employee,
  availableRoles,
  onRoleAssigned 
}: JustInTimeRoleDialogProps) {
  const [temporaryRole, setTemporaryRole] = useState('');
  const [duration, setDuration] = useState('1');
  const [durationType, setDurationType] = useState<'hours' | 'days'>('hours');
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [reason, setReason] = useState('');

  const calculateExpiry = () => {
    const now = new Date();
    const durationNum = parseInt(duration);
    
    if (durationType === 'hours') {
      return addHours(now, durationNum);
    } else {
      return addDays(now, durationNum);
    }
  };

  const handleSubmit = () => {
    if (!temporaryRole) {
      toast.error('Please select a temporary role');
      return;
    }

    if (!duration || parseInt(duration) <= 0) {
      toast.error('Please provide a valid duration');
      return;
    }

    if (!reason.trim()) {
      toast.error('Please provide a reason for temporary role assignment');
      return;
    }

    const expiry = calculateExpiry();
    const roleName = availableRoles.find(r => r.id === temporaryRole)?.name;

    toast.success(
      `Temporary role ${roleName} assigned until ${format(expiry, 'PPpp')}`
    );
    
    onRoleAssigned();
    onOpenChange(false);
    setTemporaryRole('');
    setDuration('1');
    setReason('');
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <DialogTitle>Just-in-Time Role Assignment</DialogTitle>
              <DialogDescription>Assign a temporary role with automatic expiration</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">{employee.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Current Role:</span>
              <Badge variant="outline" className="text-xs">
                {employee.currentRole}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temporaryRole">Temporary Role *</Label>
            <Select value={temporaryRole} onValueChange={setTemporaryRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select temporary role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map(role => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This role will be automatically revoked after the specified duration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationType">Unit</Label>
              <Select value={durationType} onValueChange={(v) => setDurationType(v as 'hours' | 'days')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {duration && parseInt(duration) > 0 && (
            <div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/20 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">Expires on:</p>
                  <p>{format(calculateExpiry(), 'PPpp')}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Justification *</Label>
            <Textarea
              id="reason"
              placeholder="Explain why temporary elevated access is needed..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Temporary role assignments are audited and will be logged.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Assign Temporary Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
