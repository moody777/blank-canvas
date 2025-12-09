import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { getEmployees, getDepartments } from '@/lib/dataService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SendNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamMembers?: { id: string; name: string; avatar?: string }[];
}

export function SendNotificationDialog({ open, onOpenChange, teamMembers }: SendNotificationDialogProps) {
  const { toast } = useToast();
  const employees = getEmployees();
  const departments = getDepartments();
  
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    urgency: 'NORMAL',
    recipients: [] as string[],
    sendToAll: false,
  });

  // Use provided team members or fallback to all employees
  const availableRecipients = teamMembers || employees.map(e => ({
    id: String(e.employee_id),
    name: `${e.first_name} ${e.last_name}`,
    avatar: e.profile_image
  }));

  const handleRecipientToggle = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(employeeId)
        ? prev.recipients.filter(id => id !== employeeId)
        : [...prev.recipients, employeeId]
    }));
  };

  const handleSendToAllToggle = () => {
    setFormData(prev => ({
      ...prev,
      sendToAll: !prev.sendToAll,
      recipients: !prev.sendToAll ? availableRecipients.map(r => r.id) : []
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject.trim()) {
      toast({
        title: 'Subject Required',
        description: 'Please enter a subject for the notification.',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: 'Message Required',
        description: 'Please enter a message for the notification.',
        variant: 'destructive'
      });
      return;
    }

    if (formData.recipients.length === 0 && !formData.sendToAll) {
      toast({
        title: 'Recipients Required',
        description: 'Please select at least one recipient.',
        variant: 'destructive'
      });
      return;
    }

    const recipientCount = formData.sendToAll 
      ? availableRecipients.length 
      : formData.recipients.length;

    toast({
      title: 'Notification Sent',
      description: `Your notification has been sent to ${recipientCount} team member(s).`,
    });

    // Reset form
    setFormData({
      subject: '',
      message: '',
      urgency: 'NORMAL',
      recipients: [],
      sendToAll: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Notification to Team</DialogTitle>
          <DialogDescription>
            Send a customized notification to selected team members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Enter notification subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Enter your message..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => setFormData({...formData, urgency: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Recipients</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sendToAll"
                  checked={formData.sendToAll}
                  onCheckedChange={handleSendToAllToggle}
                />
                <Label htmlFor="sendToAll" className="text-sm font-normal cursor-pointer">
                  Send to all team members
                </Label>
              </div>
            </div>
            
            <ScrollArea className="h-48 border rounded-lg p-2">
              <div className="space-y-2">
                {availableRecipients.map(recipient => (
                  <div 
                    key={recipient.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      formData.recipients.includes(recipient.id) || formData.sendToAll
                        ? 'bg-primary/10'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => !formData.sendToAll && handleRecipientToggle(recipient.id)}
                  >
                    <Checkbox
                      checked={formData.recipients.includes(recipient.id) || formData.sendToAll}
                      disabled={formData.sendToAll}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={recipient.avatar} />
                      <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{recipient.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <p className="text-xs text-muted-foreground">
              {formData.sendToAll 
                ? `All ${availableRecipients.length} team members selected`
                : `${formData.recipients.length} recipient(s) selected`}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
