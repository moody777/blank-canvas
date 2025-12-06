import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { UserCog } from 'lucide-react';

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    id: string;
    name: string;
    currentRole: string;
  } | null;
  availableRoles: Array<{ id: string; name: string; }>;
  onRoleChanged: () => void;
}

export function ChangeRoleDialog({ 
  open, 
  onOpenChange, 
  employee,
  availableRoles,
  onRoleChanged 
}: ChangeRoleDialogProps) {
  const [newRole, setNewRole] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!newRole) {
      toast.error('Please select a new role');
      return;
    }

    if (!reason.trim()) {
      toast.error('Please provide a reason for the role change');
      return;
    }

    // Mock function call
    toast.success(`Role changed to ${availableRoles.find(r => r.id === newRole)?.name}`);
    onRoleChanged();
    onOpenChange(false);
    setNewRole('');
    setReason('');
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            <DialogTitle>Change Employee Role</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Employee</Label>
            <p className="text-sm font-medium">{employee.name}</p>
          </div>

          <div className="space-y-2">
            <Label>Current Role</Label>
            <Badge variant="outline" className="text-sm">
              {employee.currentRole}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newRole">New Role *</Label>
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select new role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles
                  .filter(role => role.name !== employee.currentRole)
                  .map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Change *</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this role change is necessary..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              This will be logged in the employee's audit trail.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Change Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
