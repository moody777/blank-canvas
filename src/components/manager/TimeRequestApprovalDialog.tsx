import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockApproveTimeRequest } from '@/lib/mockFunctions';
import { toast } from 'sonner';
import { TimeRequest } from '@/types/index';

interface TimeRequestApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: TimeRequest | null;
  employeeName: string;
}

export function TimeRequestApprovalDialog({ open, onOpenChange, request, employeeName }: TimeRequestApprovalDialogProps) {
  const [comments, setComments] = useState('');

  if (!request) return null;

  const handleApprove = async () => {
    try {
      await mockApproveTimeRequest(request.request_id, 'approved', comments);
      toast.success('Time request approved');
      onOpenChange(false);
      setComments('');
    } catch (error) {
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async () => {
    if (!comments.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      await mockApproveTimeRequest(request.request_id, 'rejected', comments);
      toast.success('Time request rejected');
      onOpenChange(false);
      setComments('');
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'overtime': return <Badge className="bg-blue-500">Overtime</Badge>;
      case 'permission': return <Badge className="bg-purple-500">Permission</Badge>;
      case 'early_leave': return <Badge className="bg-orange-500">Early Leave</Badge>;
      default: return <Badge>{type}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Time Request - {employeeName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Request Type</Label>
            <div>{getTypeBadge(request.request_type)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <p className="text-sm">{new Date(request.request_date).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <p className="text-sm">{(request.duration_minutes / 60).toFixed(1)} hours</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason</Label>
            <p className="text-sm border rounded-md p-3 bg-muted/50">{request.reason}</p>
          </div>

          <div className="space-y-2">
            <Label>Submitted</Label>
            <p className="text-sm text-muted-foreground">{new Date(request.submitted_at).toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <Label>Comments (optional for approval, required for rejection)</Label>
            <Textarea
              placeholder="Add your comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleReject}>Reject</Button>
          <Button onClick={handleApprove}>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
