import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { employeeClient } from '@/lib/client';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CorrectionRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CorrectionRequestDialog({ open, onOpenChange }: CorrectionRequestDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [correctionType, setCorrectionType] = useState('');
  const [date, setDate] = useState('');
  const [originalTime, setOriginalTime] = useState('');
  const [correctedTime, setCorrectedTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!correctionType || !date || !reason) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    try {
      const employeeId = user?.employeeId ? parseInt(user.employeeId) : undefined;
      await employeeClient.submitCorrectionRequest(
        employeeId,
        new Date(date),
        correctionType,
        reason
      );
      toast({ title: 'Correction Request Submitted', description: 'Your manager will review your request' });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to submit correction request', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setCorrectionType('');
    setDate('');
    setOriginalTime('');
    setCorrectedTime('');
    setReason('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Request Attendance Correction
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="correctionType">Correction Type *</Label>
            <Select value={correctionType} onValueChange={setCorrectionType}>
              <SelectTrigger id="correctionType">
                <SelectValue placeholder="Select correction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="missed-punch">Missed Punch</SelectItem>
                <SelectItem value="wrong-time">Wrong Time Recorded</SelectItem>
                <SelectItem value="forgot-clockout">Forgot to Clock Out</SelectItem>
                <SelectItem value="forgot-clockin">Forgot to Clock In</SelectItem>
                <SelectItem value="system-error">System Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input 
              id="date" 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {correctionType === 'wrong-time' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originalTime">Original Time</Label>
                <Input 
                  id="originalTime" 
                  type="time" 
                  value={originalTime}
                  onChange={(e) => setOriginalTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="correctedTime">Corrected Time *</Label>
                <Input 
                  id="correctedTime" 
                  type="time" 
                  value={correctedTime}
                  onChange={(e) => setCorrectedTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea 
              id="reason" 
              placeholder="Explain why this correction is needed..." 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Correction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
