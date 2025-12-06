import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SetGracePeriod, DefinePenaltyThreshold, DefineShortTimeRules } from '@/lib/mockFunctions';
import { Settings } from 'lucide-react';

interface AttendanceRulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AttendanceRulesDialog({ open, onOpenChange }: AttendanceRulesDialogProps) {
  const [gracePeriod, setGracePeriod] = useState('15');
  const [penaltyMinutes, setPenaltyMinutes] = useState('30');
  const [penaltyType, setPenaltyType] = useState('DEDUCTION');
  const [ruleName, setRuleName] = useState('');
  const [lateMinutes, setLateMinutes] = useState('15');
  const [earlyLeaveMinutes, setEarlyLeaveMinutes] = useState('15');
  const [shortTimePenalty, setShortTimePenalty] = useState('WARNING');

  const handleSaveGracePeriod = () => {
    SetGracePeriod(parseInt(gracePeriod));
  };

  const handleSavePenalty = () => {
    DefinePenaltyThreshold(parseInt(penaltyMinutes), penaltyType);
  };

  const handleSaveShortTime = () => {
    if (!ruleName) return;
    DefineShortTimeRules(ruleName, parseInt(lateMinutes), parseInt(earlyLeaveMinutes), shortTimePenalty);
    setRuleName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendance Time Rules Configuration</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="grace" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grace">Grace Period</TabsTrigger>
            <TabsTrigger value="penalty">Penalties</TabsTrigger>
            <TabsTrigger value="shorttime">Short Time</TabsTrigger>
          </TabsList>

          <TabsContent value="grace" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Grace Period (minutes)</Label>
                <Input
                  type="number"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  min="0"
                  max="60"
                />
                <p className="text-sm text-muted-foreground">
                  Employees can clock in within this many minutes of their shift start without penalty
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-semibold mb-2">Current Setting</h4>
                <p className="text-sm">
                  Grace period: <span className="font-medium">{gracePeriod} minutes</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Example: If shift starts at 9:00 AM, employees can clock in until 9:{gracePeriod} AM without penalty
                </p>
              </div>

              <Button onClick={handleSaveGracePeriod} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Save Grace Period
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="penalty" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Late Threshold (minutes)</Label>
                <Input
                  type="number"
                  value={penaltyMinutes}
                  onChange={(e) => setPenaltyMinutes(e.target.value)}
                  min="1"
                />
                <p className="text-sm text-muted-foreground">
                  Minutes late before penalty applies (after grace period)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Penalty Type</Label>
                <Select value={penaltyType} onValueChange={setPenaltyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEDUCTION">Salary Deduction</SelectItem>
                    <SelectItem value="WARNING">Warning</SelectItem>
                    <SelectItem value="LEAVE_DEDUCTION">Leave Balance Deduction</SelectItem>
                    <SelectItem value="PROGRESSIVE">Progressive Discipline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-semibold mb-2">Rule Summary</h4>
                <p className="text-sm">
                  Being late by <span className="font-medium">{penaltyMinutes}+ minutes</span> will result in:{' '}
                  <span className="font-medium">{penaltyType.replace('_', ' ')}</span>
                </p>
              </div>

              <Button onClick={handleSavePenalty} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Save Penalty Rules
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="shorttime" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g., Standard Short Time Rule"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Late Minutes Threshold</Label>
                  <Input
                    type="number"
                    value={lateMinutes}
                    onChange={(e) => setLateMinutes(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Early Leave Threshold</Label>
                  <Input
                    type="number"
                    value={earlyLeaveMinutes}
                    onChange={(e) => setEarlyLeaveMinutes(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Penalty Action</Label>
                <Select value={shortTimePenalty} onValueChange={setShortTimePenalty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WARNING">Warning Only</SelectItem>
                    <SelectItem value="DEDUCTION">Time Deduction</SelectItem>
                    <SelectItem value="REPORT">Flag for Manager Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-semibold mb-2">Short Time Rule</h4>
                <p className="text-sm">
                  Late by <span className="font-medium">{lateMinutes}+ min</span> or leaving{' '}
                  <span className="font-medium">{earlyLeaveMinutes}+ min early</span>
                  <br />
                  Action: <span className="font-medium">{shortTimePenalty.replace('_', ' ')}</span>
                </p>
              </div>

              <Button onClick={handleSaveShortTime} disabled={!ruleName} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Save Short Time Rule
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
