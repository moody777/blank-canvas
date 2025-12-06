import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { mockConfigureShiftAllowances } from '@/lib/mockFunctions';
import { toast } from 'sonner';

interface AllowanceDialogProps {
  trigger: React.ReactNode;
}

export const AllowanceDialog = ({ trigger }: AllowanceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockConfigureShiftAllowances({
      name,
      percentage: parseFloat(percentage),
      description,
      active
    });
    toast.success('Shift allowance created successfully');
    setOpen(false);
    setName('');
    setPercentage('');
    setDescription('');
    setActive(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Shift Allowance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Allowance Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Night Shift Allowance"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage">Percentage (%)</Label>
            <Input
              id="percentage"
              type="number"
              step="0.1"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional pay for night shifts"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={active}
              onCheckedChange={setActive}
            />
          </div>

          <Button type="submit" className="w-full">Create Allowance</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
