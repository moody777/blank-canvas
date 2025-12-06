import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar, DollarSign, User } from 'lucide-react';
import type { Mission } from '@/types';

interface MissionApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mission: Mission | null;
  employeeName: string;
  onApprove: (missionId: string, notes: string) => void;
  onReject: (missionId: string, reason: string) => void;
}

export function MissionApprovalDialog({ 
  open, 
  onOpenChange, 
  mission,
  employeeName,
  onApprove,
  onReject
}: MissionApprovalDialogProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = () => {
    if (!mission) return;

    if (action === 'reject' && !notes.trim()) {
      toast({
        title: 'Rejection Reason Required',
        description: 'Please provide a reason for rejecting this mission.',
        variant: 'destructive'
      });
      return;
    }

    if (action === 'approve') {
      onApprove(mission.id, notes);
      toast({
        title: 'Mission Approved',
        description: `Mission to ${mission.destination} has been approved.`,
      });
    } else if (action === 'reject') {
      onReject(mission.id, notes);
      toast({
        title: 'Mission Rejected',
        description: `Mission to ${mission.destination} has been rejected.`,
      });
    }

    setNotes('');
    setAction(null);
    onOpenChange(false);
  };

  if (!mission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Mission Request</DialogTitle>
          <DialogDescription>
            Approve or reject this mission request from {employeeName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Mission Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{mission.destination}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
              </span>
            </div>
            
            {mission.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Budget: {mission.currency} {mission.budget.toLocaleString()}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Requested by: {employeeName}</span>
            </div>
          </div>

          {/* Purpose */}
          <div>
            <Label className="text-sm font-medium">Purpose</Label>
            <p className="text-sm text-muted-foreground mt-1">{mission.purpose}</p>
          </div>

          {/* Description */}
          {mission.description && (
            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-muted-foreground mt-1">{mission.description}</p>
            </div>
          )}

          {/* Current Status */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Status:</Label>
            <Badge variant={mission.status === 'ASSIGNED' ? 'secondary' : 'default'}>
              {mission.status}
            </Badge>
          </div>

          {/* Notes/Reason */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              {action === 'reject' ? 'Rejection Reason *' : 'Notes (Optional)'}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={action === 'reject' 
                ? 'Provide a reason for rejection...' 
                : 'Add any notes or comments...'}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              setAction('reject');
              if (notes.trim()) handleSubmit();
              else setAction('reject');
            }}
          >
            Reject
          </Button>
          <Button 
            onClick={() => {
              setAction('approve');
              handleSubmit();
            }}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
