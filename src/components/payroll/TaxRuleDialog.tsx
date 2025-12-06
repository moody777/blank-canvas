import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockManageTaxRules } from '@/lib/mockFunctions';
import { toast } from 'sonner';

interface TaxRuleDialogProps {
  trigger: React.ReactNode;
  initialData?: {
    jurisdiction: string;
    rate: number;
    exemptionThreshold: number;
    currency: string;
  };
}

export const TaxRuleDialog = ({ trigger, initialData }: TaxRuleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [jurisdiction, setJurisdiction] = useState(initialData?.jurisdiction || '');
  const [rate, setRate] = useState(initialData ? (initialData.rate * 100).toString() : '');
  const [exemptionThreshold, setExemptionThreshold] = useState(initialData?.exemptionThreshold.toString() || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockManageTaxRules({
      jurisdiction,
      rate: parseFloat(rate) / 100,
      exemptionThreshold: parseFloat(exemptionThreshold),
      currency
    });
    toast.success(`Tax rule ${initialData ? 'updated' : 'created'} successfully`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Tax Rule' : 'Add Tax Rule'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input
              id="jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              placeholder="e.g., Federal, State"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Tax Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="22"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exemptionThreshold">Exemption Threshold</Label>
            <Input
              id="exemptionThreshold"
              type="number"
              value={exemptionThreshold}
              onChange={(e) => setExemptionThreshold(e.target.value)}
              placeholder="12000"
              required
            />
            <p className="text-xs text-muted-foreground">
              Income below this amount is tax-exempt
            </p>
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
            {initialData ? 'Update' : 'Create'} Tax Rule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
