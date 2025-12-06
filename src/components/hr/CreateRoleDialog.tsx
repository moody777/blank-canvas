import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Shield, Plus } from 'lucide-react';
import { z } from 'zod';

// Input validation schema
const roleSchema = z.object({
  name: z.string()
    .trim()
    .min(3, { message: "Role name must be at least 3 characters" })
    .max(50, { message: "Role name must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Role name can only contain letters, numbers, and spaces" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(200, { message: "Description must be less than 200 characters" }),
});

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleCreated: (newRole: { id: string; name: string; description: string; permissions: string[] }) => void;
}

export function CreateRoleDialog({ 
  open, 
  onOpenChange, 
  onRoleCreated 
}: CreateRoleDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const validateForm = () => {
    try {
      roleSchema.parse({ name, description });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { name?: string; description?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as 'name' | 'description'] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    // Create new role object
    const newRole = {
      id: `role_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      permissions: [] // Start with no permissions
    };

    toast.success(`Role "${name}" created successfully`);
    
    // Pass the new role to parent and close
    onRoleCreated(newRole);
    onOpenChange(false);
    
    // Reset form
    setName('');
    setDescription('');
    setErrors({});
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new system role with custom permissions</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Regional Manager, Team Lead"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                // Clear error when user starts typing
                if (errors.name) {
                  setErrors({ ...errors, name: undefined });
                }
              }}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Choose a clear, descriptive name for this role
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the responsibilities and scope of this role..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                // Clear error when user starts typing
                if (errors.description) {
                  setErrors({ ...errors, description: undefined });
                }
              }}
              rows={4}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Provide a clear description of what this role can do
            </p>
          </div>

          <div className="rounded-md bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium">Next Steps</p>
            <p className="text-xs text-muted-foreground">
              After creation, you can configure specific permissions for this role in the Role Management page.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
