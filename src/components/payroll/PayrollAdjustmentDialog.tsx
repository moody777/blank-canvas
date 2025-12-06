import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAdjustPayrollItem } from '@/lib/mockFunctions';
import { toast } from 'sonner';

interface PayrollAdjustmentDialogProps {
  payrollId: string;
  trigger: React.ReactNode;
}

export const PayrollAdjustmentDialog = ({ payrollId, trigger }: PayrollAdjustmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [itemType, setItemType] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockAdjustPayrollItem(payrollId, itemType, parseFloat(amount));
    toast.success('Payroll adjustment applied successfully');
    setOpen(false);
    setItemType('');
    setAmount('');
    setReason('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Payroll Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemType">Adjustment Type</Label>
            <Select value={itemType} onValueChange={setItemType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allowance">Allowance</SelectItem>
                <SelectItem value="deduction">Deduction</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="overtime">Overtime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain the adjustment"
              required
            />
          </div>

          <Button type="submit" className="w-full">Apply Adjustment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
