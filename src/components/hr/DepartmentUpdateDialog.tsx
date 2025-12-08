import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { hrClient } from '@/lib/client';
import { toast } from '@/hooks/use-toast';

interface Department {
  id: string;
  name: string;
  purpose: string;
  managerId?: string;
}

interface DepartmentUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
  onDepartmentUpdated?: () => void;
}

export function DepartmentUpdateDialog({
  open,
  onOpenChange,
  department,
  onDepartmentUpdated
}: DepartmentUpdateDialogProps) {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (department) {
      setName(department.name);
      setPurpose(department.purpose);
    }
  }, [department]);

  const handleSubmit = async () => {
    if (!department || !name.trim()) {
      toast({
        title: "Error",
        description: "Department name is required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await hrClient.updateDepartment(
        parseInt(department.id),
        name,
        purpose,
        department.managerId ? parseInt(department.managerId) : undefined
      );
      
      toast({
        title: "Success",
        description: `Department "${name}" has been updated successfully`
      });
      
      onDepartmentUpdated?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dept-name">Department Name</Label>
            <Input
              id="dept-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter department name"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept-purpose">Purpose / Description</Label>
            <Textarea
              id="dept-purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the department's purpose"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? 'Updating...' : 'Update Department'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
