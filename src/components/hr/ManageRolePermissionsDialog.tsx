import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPermissions } from '@/lib/mockFunctions';
// Permission type is defined inline in mockData
type Permission = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: any;
};

interface ManageRolePermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: {
    id: string;
    name: string;
    permissions: string[];
  } | null;
  onPermissionsUpdated: () => void;
}

export function ManageRolePermissionsDialog({ 
  open, 
  onOpenChange, 
  role,
  onPermissionsUpdated 
}: ManageRolePermissionsDialogProps) {
  const permissions = getPermissions();
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(role?.permissions || [])
  );
  const [initialPermissions, setInitialPermissions] = useState<Set<string>>(
    new Set(role?.permissions || [])
  );

  // Update permissions when role changes
  useState(() => {
    if (role) {
      const newPerms = new Set(role.permissions);
      setSelectedPermissions(newPerms);
      setInitialPermissions(newPerms);
    }
  });

  const togglePermission = (permissionId: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
  };

  const handleSubmit = () => {
    // Calculate what changed
    const added = Array.from(selectedPermissions).filter(p => !initialPermissions.has(p));
    const removed = Array.from(initialPermissions).filter(p => !selectedPermissions.has(p));
    
    let message = `Permissions updated for ${role?.name}`;
    const details: string[] = [];
    
    if (added.length > 0) {
      details.push(`Added ${added.length} permission${added.length > 1 ? 's' : ''}`);
    }
    if (removed.length > 0) {
      details.push(`Removed ${removed.length} permission${removed.length > 1 ? 's' : ''}`);
    }
    
    if (details.length > 0) {
      message += `: ${details.join(', ')}`;
    }
    
    toast.success(message, {
      description: `Total: ${selectedPermissions.size} of ${permissions.length} permissions enabled`,
    });
    
    onPermissionsUpdated();
    onOpenChange(false);
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <DialogTitle>Manage Permissions - {role.name}</DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6 py-4">
            {Object.entries(groupedPermissions as Record<string, Permission[]>).map(([category, perms]) => {
              const Icon = perms[0].icon;
              return (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {category}
                  </h3>
                  <div className="space-y-3 pl-6">
                    {perms.map((permission) => (
                      <div 
                        key={permission.id} 
                        className="flex items-start justify-between gap-4 py-2"
                      >
                        <div className="flex-1 space-y-1">
                          <Label 
                            htmlFor={permission.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                         <Switch
                          id={permission.id}
                          checked={selectedPermissions.has(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">
                {selectedPermissions.size} of {permissions.length} permissions enabled
              </p>
              {(selectedPermissions.size !== initialPermissions.size) && (
                <p className="text-xs">
                  {selectedPermissions.size > initialPermissions.size 
                    ? `+${selectedPermissions.size - initialPermissions.size} permissions added` 
                    : `${initialPermissions.size - selectedPermissions.size} permissions removed`
                  }
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Save Permissions
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
