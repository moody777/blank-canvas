import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockConfigurePayGrades } from '@/lib/mockFunctions';
import { toast } from 'sonner';

interface PayGradeDialogProps {
  trigger: React.ReactNode;
  initialData?: {
    name: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
  };
}

export const PayGradeDialog = ({ trigger, initialData }: PayGradeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialData?.name || '');
  const [minSalary, setMinSalary] = useState(initialData?.minSalary.toString() || '');
  const [maxSalary, setMaxSalary] = useState(initialData?.maxSalary.toString() || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockConfigurePayGrades({
      name,
      minSalary: parseFloat(minSalary),
      maxSalary: parseFloat(maxSalary),
      currency
    });
    toast.success(`Pay grade ${initialData ? 'updated' : 'created'} successfully`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Pay Grade' : 'Add Pay Grade'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Grade Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Senior, Manager"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary">Minimum Salary</Label>
              <Input
                id="minSalary"
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="50000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSalary">Maximum Salary</Label>
              <Input
                id="maxSalary"
                type="number"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="80000"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            {initialData ? 'Update' : 'Create'} Pay Grade
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
