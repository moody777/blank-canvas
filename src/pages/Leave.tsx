import { useState } from 'react';
import { getLeaveRequests, getLeaveTypes, getLeaveBalances, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Calendar, CheckCircle, XCircle, Clock, AlertTriangle, RotateCcw, Flag } from 'lucide-react';
import { mockApproveLeaveRequest, mockRejectLeaveRequest } from '@/lib/mockFunctions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Leave() {
  const { toast } = useToast();
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [flaggedEmployees, setFlaggedEmployees] = useState<string[]>([]);

  // Calculate irregular leave patterns (employees with 3+ consecutive days or frequent short leaves)
  const leaveRequests = getLeaveRequests();
  const irregularPatterns = getProfiles().filter(profile => {
    const employeeLeaves = leaveRequests.filter(r => r.employeeId === profile.id);
    const shortLeaves = employeeLeaves.filter(r => r.duration <= 2).length;
    const hasIrregular = shortLeaves >= 3 || employeeLeaves.some(r => r.duration > 5);
    return hasIrregular && employeeLeaves.length > 0;
  });

  const handleOverrideDecision = (newStatus: 'APPROVED' | 'REJECTED') => {
    if (!selectedRequest || !overrideReason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for overriding this decision.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Decision Overridden',
      description: `Leave request has been ${newStatus.toLowerCase()} by HR Admin.`,
    });
    setOverrideDialogOpen(false);
    setOverrideReason('');
    setSelectedRequest(null);
  };

  const handleFlagEmployee = (employeeId: string, employeeName: string) => {
    if (flaggedEmployees.includes(employeeId)) {
      setFlaggedEmployees(prev => prev.filter(id => id !== employeeId));
      toast({
        title: 'Flag Removed',
        description: `${employeeName} has been unflagged for irregular leave patterns.`,
      });
    } else {
      setFlaggedEmployees(prev => [...prev, employeeId]);
      toast({
        title: 'Employee Flagged',
        description: `${employeeName} has been flagged for irregular leave patterns.`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-muted-foreground">Manage leave requests and policies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeaveRequests().length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLeaveRequests().filter(r => r.status === 'PENDING').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLeaveRequests().filter(r => r.status === 'APPROVED').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLeaveRequests().filter(r => r.status === 'REJECTED').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="irregular">Irregular Patterns</TabsTrigger>
          <TabsTrigger value="types">Leave Types</TabsTrigger>
          <TabsTrigger value="balances">Employee Balances</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map(request => {
                  const profile = getProfiles().find(p => p.id === request.employeeId);
                  const leaveType = getLeaveTypes().find(lt => lt.id === request.leaveId);
                  const isFlagged = flaggedEmployees.includes(request.employeeId);
                  return (
                    <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={profile?.profileImage} />
                            <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                          </Avatar>
                          {isFlagged && (
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full flex items-center justify-center">
                              <Flag className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground capitalize">{leaveType?.leaveType} Leave</p>
                          <p className="text-sm">
                            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{request.justification}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        {request.status === 'PENDING' && (
                          <>
                            <Button size="sm" onClick={() => mockApproveLeaveRequest(request.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => mockRejectLeaveRequest(request.id)}>
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {/* HR Admin Override Button */}
                        {(request.status === 'APPROVED' || request.status === 'REJECTED') && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(request);
                              setOverrideDialogOpen(true);
                            }}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Override
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Irregular Patterns Tab */}
        <TabsContent value="irregular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Irregular Leave Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Employees with frequent short leaves or extended absences that may require attention.
              </p>
              <div className="space-y-4">
                {irregularPatterns.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No irregular patterns detected</p>
                ) : (
                  irregularPatterns.map(profile => {
                    const employeeLeaves = leaveRequests.filter(r => r.employeeId === profile.id);
                    const isFlagged = flaggedEmployees.includes(profile.id);
                    return (
                      <div key={profile.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={profile.profileImage} />
                            <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                            <p className="text-sm text-muted-foreground">
                              {employeeLeaves.length} leave requests • 
                              {employeeLeaves.filter(r => r.duration <= 2).length} short leaves
                            </p>
                          </div>
                        </div>
                        <Button
                          variant={isFlagged ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleFlagEmployee(profile.id, `${profile.firstName} ${profile.lastName}`)}
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          {isFlagged ? 'Unflag' : 'Flag'}
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Types & Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getLeaveTypes().map(type => (
                  <div key={type.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold capitalize">{type.leaveType} Leave</h3>
                      <Badge variant="secondary">Leave Type</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{type.leaveDescription}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getLeaveBalances().map((balance, idx) => {
                  const profile = getProfiles().find(p => p.id === balance.employeeId);
                  const leaveType = getLeaveTypes().find(lt => lt.id === balance.leaveTypeId);
                  return (
                    <div key={`${balance.employeeId}_${balance.leaveTypeId}_${idx}`} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={profile?.profileImage} />
                          <AvatarFallback>{profile?.firstName[0]}{profile?.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                          <p className="text-sm text-muted-foreground capitalize">{leaveType?.leaveType} Leave - {new Date().getFullYear()}</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-semibold">{balance.entitlement}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Used</p>
                          <p className="font-semibold">{balance.entitlement - balance.remaining}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Remaining</p>
                          <p className="font-semibold text-green-500">{balance.remaining}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Override Dialog */}
      <Dialog open={overrideDialogOpen} onOpenChange={setOverrideDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Override Leave Decision</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                Current Status: <Badge className={getStatusColor(selectedRequest?.status || '')}>{selectedRequest?.status}</Badge>
              </p>
            </div>
            <div className="space-y-2">
              <Label>Reason for Override *</Label>
              <Textarea
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="Provide a detailed reason for overriding this decision..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOverrideDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleOverrideDecision('REJECTED')}
            >
              Override to Rejected
            </Button>
            <Button onClick={() => handleOverrideDecision('APPROVED')}>
              Override to Approved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
