import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { hrClient } from '@/lib/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, FileCheck } from 'lucide-react';

interface LeaveApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
}

export function LeaveApprovalDialog({ open, onOpenChange, request }: LeaveApprovalDialogProps) {
  const { toast } = useToast();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleApprove = async () => {
    try {
      await hrClient.finalApproveLeave(request.id, 1);
      toast({ 
        title: 'Leave Approved', 
        description: 'The leave request has been approved and synced with attendance records' 
      });
      onOpenChange(false);
    } catch (error) {
      toast({ 
        title: 'Error',
        description: 'Failed to approve leave request', 
        variant: 'destructive' 
      });
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      toast({ title: 'Error', description: 'Please provide a reason for rejection', variant: 'destructive' });
      return;
    }
    try {
      await hrClient.escalateLeaveRequest(request.id, 1, rejectionReason);
      toast({ title: 'Leave Rejected', description: 'The leave request has been rejected' });
      onOpenChange(false);
      setShowRejectForm(false);
      setRejectionReason('');
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to reject leave request', 
        variant: 'destructive' 
      });
    }
  };

  const handleVerifyMedical = () => {
    toast({ title: 'Medical Leave Verified', description: 'Medical documentation has been verified' });
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Leave Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Employee</Label>
            <p className="text-sm">{request.employeeName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Leave Type</Label>
              <p className="text-sm">{request.leaveType}</p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Badge>{request.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <p className="text-sm">{new Date(request.startDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <p className="text-sm">{new Date(request.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason</Label>
            <p className="text-sm border rounded-md p-2 bg-muted/50">{request.reason}</p>
          </div>

          {request.leaveType === 'Medical' && (
            <Button variant="outline" onClick={handleVerifyMedical} className="w-full">
              <FileCheck className="h-4 w-4 mr-2" />
              Verify Medical Documentation
            </Button>
          )}

          {showRejectForm && (
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason *</Label>
              <Textarea 
                id="rejectionReason" 
                placeholder="Explain why this leave is being rejected..." 
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex gap-2">
          {!showRejectForm ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button variant="outline" onClick={() => setShowRejectForm(true)}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => {
                setShowRejectForm(false);
                setRejectionReason('');
              }}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Confirm Rejection
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
