import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getLeaveRequests, getLeaveTypes, getLeaveBalances, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CheckCircle, XCircle, FileText, Plus, Edit, X } from 'lucide-react';
import { LeaveRequestDialog } from '@/components/employee/LeaveRequestDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockCancelLeaveRequest, mockModifyLeaveRequest } from '@/lib/mockFunctions';
import { useToast } from '@/hooks/use-toast';

export default function MyLeave() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modifyReason, setModifyReason] = useState('');

  const userRequests = getLeaveRequests().filter(r => r.employeeId === user?.employeeId);
  const userBalance = getLeaveBalances().find(lb => lb.employeeId === user?.employeeId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCancelRequest = (requestId: string) => {
    mockCancelLeaveRequest(requestId);
    toast({ title: 'Leave Request Cancelled', description: 'Your leave request has been cancelled' });
  };

  const handleModifyRequest = () => {
    if (!selectedRequest || !modifyReason) {
      toast({ title: 'Error', description: 'Please provide a reason for modification', variant: 'destructive' });
      return;
    }
    mockModifyLeaveRequest(selectedRequest.id, '', '', modifyReason);
    toast({ title: 'Request Modified', description: 'Your leave request has been updated' });
    setModifyDialogOpen(false);
    setModifyReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Leave</h1>
          <p className="text-muted-foreground">Manage your leave requests and view balance</p>
        </div>
        <Button onClick={() => setLeaveDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Request Leave
        </Button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Entitlement</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBalance?.entitlement || 0}</div>
            <p className="text-xs text-muted-foreground">Days per year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Used</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBalance ? (userBalance.entitlement - userBalance.remaining) : 0}</div>
            <p className="text-xs text-muted-foreground">Days taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBalance?.remaining || 0}</div>
            <p className="text-xs text-muted-foreground">Days available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userRequests.filter(r => r.status === 'PENDING').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Types Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Types Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getLeaveTypes().map(type => (
              <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium capitalize">{type.leaveType.toLowerCase()}</p>
                  <p className="text-sm text-muted-foreground">{type.leaveDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userRequests.map(request => {
                  const leaveType = getLeaveTypes().find(lt => lt.id === request.leaveId);
                  return (
                    <div key={request.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <p className="font-medium capitalize">{leaveType?.leaveType.toLowerCase()}</p>
                          <Badge className={getStatusColor(request.status.toLowerCase())}>{request.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm">{request.justification}</p>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'PENDING' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedRequest(request);
                                setModifyDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                {userRequests.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No leave requests found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {userRequests.filter(r => r.status === 'PENDING').map(request => {
                  const leaveType = getLeaveTypes().find(lt => lt.id === request.leaveId);
                  return (
                    <div key={request.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <p className="font-medium capitalize">{leaveType?.leaveType.toLowerCase()}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedRequest(request);
                          setModifyDialogOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCancelRequest(request.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {userRequests.filter(r => r.status === 'APPROVED').map(request => {
                  const leaveType = getLeaveTypes().find(lt => lt.id === request.leaveId);
                  return (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <p className="font-medium capitalize">{leaveType?.leaveType.toLowerCase()}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {userRequests.filter(r => r.status === 'REJECTED').map(request => {
                  const leaveType = getLeaveTypes().find(lt => lt.id === request.leaveId);
                  return (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <p className="font-medium capitalize">{leaveType?.leaveType.toLowerCase()}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <LeaveRequestDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen} />
      
      <Dialog open={modifyDialogOpen} onOpenChange={setModifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Leave Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for Modification</Label>
              <Textarea 
                placeholder="Explain why you need to modify this request..." 
                value={modifyReason}
                onChange={(e) => setModifyReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModifyDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleModifyRequest}>Submit Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
