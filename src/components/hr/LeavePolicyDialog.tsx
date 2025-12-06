import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockManageLeaveTypes, mockConfigureLeaveEligibility, mockConfigureLeavePolicies } from '@/lib/mockFunctions';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

interface LeavePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'type' | 'eligibility' | 'rules';
}

export function LeavePolicyDialog({ open, onOpenChange, mode }: LeavePolicyDialogProps) {
  const { toast } = useToast();
  const [leaveName, setLeaveName] = useState('');
  const [daysAllowed, setDaysAllowed] = useState('');
  const [description, setDescription] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');

  const handleSubmit = () => {
    if (mode === 'type') {
      if (!leaveName || !daysAllowed) {
        toast({ title: 'Error', description: 'Please fill required fields', variant: 'destructive' });
        return;
      }
      mockManageLeaveTypes({ name: leaveName, daysAllowed: parseInt(daysAllowed), description });
    } else if (mode === 'eligibility') {
      if (!eligibilityCriteria) {
        toast({ title: 'Error', description: 'Please specify eligibility criteria', variant: 'destructive' });
        return;
      }
      mockConfigureLeaveEligibility({ criteria: eligibilityCriteria });
    } else {
      if (!maxDuration || !noticePeriod) {
        toast({ title: 'Error', description: 'Please fill required fields', variant: 'destructive' });
        return;
      }
      mockConfigureLeavePolicies({ maxDuration: parseInt(maxDuration), noticePeriod: parseInt(noticePeriod) });
    }
    
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setLeaveName('');
    setDaysAllowed('');
    setDescription('');
    setEligibilityCriteria('');
    setMaxDuration('');
    setNoticePeriod('');
  };

  const getTitle = () => {
    switch (mode) {
      case 'type': return 'Manage Leave Type';
      case 'eligibility': return 'Configure Eligibility';
      case 'rules': return 'Configure Leave Rules';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {mode === 'type' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="leaveName">Leave Type Name *</Label>
                <Input 
                  id="leaveName" 
                  placeholder="e.g., Annual Leave, Sick Leave" 
                  value={leaveName}
                  onChange={(e) => setLeaveName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysAllowed">Days Allowed *</Label>
                <Input 
                  id="daysAllowed" 
                  type="number" 
                  placeholder="e.g., 21" 
                  value={daysAllowed}
                  onChange={(e) => setDaysAllowed(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe this leave type..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {mode === 'eligibility' && (
            <div className="space-y-2">
              <Label htmlFor="eligibilityCriteria">Eligibility Criteria *</Label>
              <Select value={eligibilityCriteria} onValueChange={setEligibilityCriteria}>
                <SelectTrigger id="eligibilityCriteria">
                  <SelectValue placeholder="Select criteria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="fulltime">Full-time Only</SelectItem>
                  <SelectItem value="tenure-6m">6+ Months Tenure</SelectItem>
                  <SelectItem value="tenure-1y">1+ Year Tenure</SelectItem>
                  <SelectItem value="permanent">Permanent Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {mode === 'rules' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="maxDuration">Maximum Duration (days) *</Label>
                <Input 
                  id="maxDuration" 
                  type="number" 
                  placeholder="e.g., 14" 
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period (days) *</Label>
                <Input 
                  id="noticePeriod" 
                  type="number" 
                  placeholder="e.g., 7" 
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
