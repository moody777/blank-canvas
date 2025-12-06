import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDepartments, getPositions, getProfiles } from '@/lib/mockFunctions';
import { mockCreateContract, mockRenewContract } from '@/lib/mockFunctions';
import { useToast } from '@/hooks/use-toast';

interface ContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'renew';
  contractId?: string;
}

export function ContractDialog({ open, onOpenChange, mode, contractId }: ContractDialogProps) {
  const { toast } = useToast();
  const profiles = getProfiles();
  const departments = getDepartments();
  const positions = getPositions();
  const [employeeId, setEmployeeId] = useState('');
  const [contractType, setContractType] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [positionId, setPositionId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salaryType, setSalaryType] = useState('');

  const handleSubmit = () => {
    if (mode === 'create') {
      if (!employeeId || !contractType || !departmentId || !positionId || !startDate) {
        toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
        return;
      }
      mockCreateContract({
        employeeId,
        contractType,
        departmentId,
        positionId,
        startDate,
        endDate,
        salaryType
      });
    } else {
      if (!endDate) {
        toast({ title: 'Error', description: 'Please select new end date', variant: 'destructive' });
        return;
      }
      mockRenewContract(contractId!, { endDate });
    }
    
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setEmployeeId('');
    setContractType('');
    setDepartmentId('');
    setPositionId('');
    setStartDate('');
    setEndDate('');
    setSalaryType('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Contract' : 'Renew Contract'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {mode === 'create' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="employee">Employee *</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {profiles.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.firstName} {profile.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractType">Contract Type *</Label>
                  <Select value={contractType} onValueChange={setContractType}>
                    <SelectTrigger id="contractType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryType">Salary Type *</Label>
                  <Select value={salaryType} onValueChange={setSalaryType}>
                    <SelectTrigger id="salaryType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={departmentId} onValueChange={setDepartmentId}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Select value={positionId} onValueChange={setPositionId}>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(pos => (
                        <SelectItem key={pos.id} value={pos.id}>{pos.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            {mode === 'create' && (
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date {mode === 'create' ? '(Optional)' : '*'}</Label>
              <Input 
                id="endDate" 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {mode === 'create' ? 'Create Contract' : 'Renew Contract'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
