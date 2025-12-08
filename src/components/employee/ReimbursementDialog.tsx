import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { employeeClient } from '@/lib/client';
import { useToast } from '@/hooks/use-toast';
import { DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ReimbursementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReimbursementDialog({ open, onOpenChange }: ReimbursementDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!expenseType || !amount || !date || !description) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    try {
      const employeeId = user?.employeeId ? parseInt(user.employeeId) : undefined;
      await employeeClient.submitReimbursement(
        employeeId,
        expenseType,
        parseFloat(amount)
      );
      toast({ title: 'Reimbursement Submitted', description: 'Your claim will be reviewed by HR' });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to submit reimbursement', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setExpenseType('');
    setAmount('');
    setDate('');
    setDescription('');
    setReceipt(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Submit Reimbursement Claim
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="expenseType">Expense Type *</Label>
            <Select value={expenseType} onValueChange={setExpenseType}>
              <SelectTrigger id="expenseType">
                <SelectValue placeholder="Select expense type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="meals">Meals</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="supplies">Office Supplies</SelectItem>
                <SelectItem value="training">Training & Development</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input 
                id="amount" 
                type="number" 
                step="0.01"
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Expense Date *</Label>
              <Input 
                id="date" 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Provide details about this expense..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt">Receipt/Invoice *</Label>
            <Input 
              id="receipt" 
              type="file" 
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              accept="image/*,.pdf"
            />
            <p className="text-xs text-muted-foreground">Upload receipt or invoice (required for claims)</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Claim</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
