import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hrClient } from '@/lib/client';
import type { Employee } from '@/types';
import { Plane } from 'lucide-react';
import { toast } from 'sonner';

interface FullMissionAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FullMissionAssignDialog({ open, onOpenChange }: FullMissionAssignDialogProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [managerId, setManagerId] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [accommodation, setAccommodation] = useState('');
  const [transportation, setTransportation] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (open) {
      hrClient.getEmployeeDirectory().then(setEmployees).catch(console.error);
    }
  }, [open]);

  const managers = employees.filter(e => e.manager_id);

  const handleSubmit = async () => {
    if (!employeeId || !managerId || !destination || !startDate || !endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await hrClient.assignMission(
        parseInt(employeeId),
        parseInt(managerId),
        destination,
        new Date(startDate),
        new Date(endDate)
      );

      toast.success('Mission assigned successfully');
      
      // Reset form
      setEmployeeId('');
      setManagerId('');
      setDestination('');
      setPurpose('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setBudget('');
      setCurrency('USD');
      setAccommodation('');
      setTransportation('');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to assign mission');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Mission to Employee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employee *</Label>
              <Select value={employeeId} onValueChange={setEmployeeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employee_id} value={String(employee.employee_id)}>
                      {employee.full_name || `${employee.first_name} ${employee.last_name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Supervising Manager *</Label>
              <Select value={managerId} onValueChange={setManagerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((manager) => (
                    <SelectItem key={manager.employee_id} value={String(manager.employee_id)}>
                      {manager.full_name || `${manager.first_name} ${manager.last_name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Mission Purpose</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Client Meeting, Training, Conference"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mission Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the mission objectives and details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date *</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date *</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-4">Budget & Logistics</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EGP">EGP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="accommodation">Accommodation Details</Label>
              <Input
                id="accommodation"
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                placeholder="Hotel name and booking details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation Details</Label>
              <Input
                id="transportation"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                placeholder="Flight details, rental car, etc."
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!employeeId || !managerId || !destination || !startDate || !endDate}
          >
            <Plane className="h-4 w-4 mr-2" />
            Assign Mission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
