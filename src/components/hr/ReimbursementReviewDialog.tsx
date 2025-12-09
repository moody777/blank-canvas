import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { hrClient } from '@/lib/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface ReimbursementReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reimbursement: any;
}

export function ReimbursementReviewDialog({ open, onOpenChange, reimbursement }: ReimbursementReviewDialogProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = async () => {
    if (action === 'reject' && !notes) {
      toast({ title: 'Error', description: 'Please provide a reason for rejection', variant: 'destructive' });
      return;
    }

    try {
      await hrClient.reviewReimbursement(reimbursement.id, 1, action === 'approve' ? 'APPROVED' : 'REJECTED');
      toast({ 
        title: action === 'approve' ? 'Reimbursement Approved' : 'Reimbursement Rejected',
        description: `The reimbursement claim has been ${action}d`
      });
      onOpenChange(false);
      setNotes('');
      setAction(null);
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to process reimbursement', 
        variant: 'destructive' 
      });
    }
  };

  if (!reimbursement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Review Reimbursement Claim
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Employee</Label>
            <p className="text-sm font-medium">{reimbursement.employeeName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expense Type</Label>
              <p className="text-sm">{reimbursement.expenseType}</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <p className="text-lg font-bold">${reimbursement.amount?.toFixed(2) || '0.00'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <p className="text-sm">{new Date(reimbursement.date).toLocaleDateString()}</p>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm border rounded-md p-2 bg-muted/50">{reimbursement.description}</p>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Badge variant={reimbursement.status === 'approved' ? 'default' : 'secondary'}>
              {reimbursement.status}
            </Badge>
          </div>

          {action && (
            <div className="space-y-2">
              <Label htmlFor="notes">{action === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason *'}</Label>
              <Textarea 
                id="notes" 
                placeholder={action === 'approve' ? 'Add any notes...' : 'Explain why this claim is rejected...'} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex gap-2">
          {!action ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button variant="outline" onClick={() => setAction('reject')}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => setAction('approve')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => {
                setAction(null);
                setNotes('');
              }}>
                Back
              </Button>
              <Button 
                variant={action === 'reject' ? 'destructive' : 'default'}
                onClick={handleSubmit}
              >
                Confirm {action === 'approve' ? 'Approval' : 'Rejection'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
