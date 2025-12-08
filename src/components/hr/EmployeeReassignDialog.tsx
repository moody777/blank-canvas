import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getDepartments, getEmployees } from '@/lib/dataService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building2 } from 'lucide-react';

interface EmployeeReassignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    id: string;
    name: string;
    currentDepartment: string;
    currentManager?: string;
    avatar?: string;
  } | null;
}

export function EmployeeReassignDialog({ open, onOpenChange, employee }: EmployeeReassignDialogProps) {
  const { toast } = useToast();
  const departments = getDepartments();
  const employees = getEmployees();
  
  const [formData, setFormData] = useState({
    newDepartmentId: '',
    newManagerId: '',
    reason: '',
    effectiveDate: '',
    sendNotification: true,
  });

  // Filter potential managers (excluding the employee being reassigned)
  const potentialManagers = employees.filter(p => String(p.employee_id) !== employee?.id);

  const handleSubmit = () => {
    if (!formData.newDepartmentId && !formData.newManagerId) {
      toast({
        title: 'Selection Required',
        description: 'Please select a new department or manager.',
        variant: 'destructive'
      });
      return;
    }

    const newDept = departments.find(d => String(d.department_id) === formData.newDepartmentId);
    const newManager = employees.find(p => String(p.employee_id) === formData.newManagerId);

    let description = `${employee?.name} has been reassigned`;
    if (newDept) description += ` to ${newDept.department_name}`;
    if (newManager) description += ` under ${newManager.first_name} ${newManager.last_name}`;

    toast({
      title: 'Employee Reassigned Successfully',
      description,
    });

    // Reset form
    setFormData({
      newDepartmentId: '',
      newManagerId: '',
      reason: '',
      effectiveDate: '',
      sendNotification: true,
    });
    onOpenChange(false);
  };

  if (!employee) return null;

  const currentDept = departments.find(d => d.department_name === employee.currentDepartment);
  const currentManager = employees.find(p => `${p.first_name} ${p.last_name}` === employee.currentManager);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reassign Employee</DialogTitle>
          <DialogDescription>
            Move employee to a new department or assign a new manager
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Employee Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback>{employee.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-muted-foreground">
                  {employee.currentDepartment} • Reports to: {employee.currentManager || 'None'}
                </p>
              </div>
            </div>
          </div>

          {/* Reassignment Visual */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-2">
                <Building2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="text-sm font-medium">{employee.currentDepartment}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">New</p>
              <p className="text-sm font-medium">
                {formData.newDepartmentId 
                  ? departments.find(d => String(d.department_id) === formData.newDepartmentId)?.department_name 
                  : 'Select...'}
              </p>
            </div>
          </div>

          {/* New Department */}
          <div className="space-y-2">
            <Label htmlFor="newDepartment">New Department</Label>
            <Select 
              value={formData.newDepartmentId} 
              onValueChange={(value) => setFormData({...formData, newDepartmentId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem 
                    key={dept.department_id} 
                    value={String(dept.department_id)}
                    disabled={currentDept?.department_id === dept.department_id}
                  >
                    {dept.department_name} {currentDept?.department_id === dept.department_id && '(Current)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Manager */}
          <div className="space-y-2">
            <Label htmlFor="newManager">New Manager</Label>
            <Select 
              value={formData.newManagerId} 
              onValueChange={(value) => setFormData({...formData, newManagerId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Manager</SelectItem>
                {potentialManagers.map(manager => (
                  <SelectItem 
                    key={manager.employee_id} 
                    value={String(manager.employee_id)}
                    disabled={currentManager?.employee_id === manager.employee_id}
                  >
                    {manager.first_name} {manager.last_name} 
                    {currentManager?.employee_id === manager.employee_id && ' (Current)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Effective Date */}
          <div className="space-y-2">
            <Label htmlFor="effectiveDate">Effective Date</Label>
            <input
              type="date"
              id="effectiveDate"
              value={formData.effectiveDate}
              onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Reassignment</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Provide a reason for this reassignment..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Confirm Reassignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}