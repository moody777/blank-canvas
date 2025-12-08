import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { managerClient } from '@/lib/client';
import { toast } from 'sonner';

interface ManagerNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  employeeName: string;
}

export function ManagerNoteDialog({ open, onOpenChange, employeeId, employeeName }: ManagerNoteDialogProps) {
  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  const handleSubmit = async () => {
    if (!note.trim()) {
      toast.error('Please enter a note');
      return;
    }

    try {
      await managerClient.addManagerNotes(parseInt(employeeId), note, isPrivate);
      toast.success('Note added successfully');
      onOpenChange(false);
      setNote('');
      setIsPrivate(true);
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manager Note - {employeeName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea placeholder="Enter your note about this employee..." value={note} onChange={(e) => setNote(e.target.value)} rows={5} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Private Note</Label>
              <p className="text-sm text-muted-foreground">Only visible to HR Admin</p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
