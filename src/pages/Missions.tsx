import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMissions, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plane, MapPin, Calendar, User, Plus, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockCreateMission } from '@/lib/mockFunctions';
import { MissionApprovalDialog } from '@/components/manager/MissionApprovalDialog';
import { useToast } from '@/hooks/use-toast';
import type { Mission } from '@/types';
import FullMissionAssignDialog from '@/components/hr/FullMissionAssignDialog';

export default function Missions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
  const [missionAssignDialogOpen, setMissionAssignDialogOpen] = useState(false);

  const handleApproveMission = (missionId: string, notes: string) => {
    toast({ title: 'Mission Approved', description: 'The mission has been approved successfully.' });
  };

  const handleRejectMission = (missionId: string, reason: string) => {
    toast({ title: 'Mission Rejected', description: 'The mission has been rejected.' });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mission Management</h1>
          <p className="text-muted-foreground">Manage business trips and assignments</p>
        </div>
        <Dialog open={missionAssignDialogOpen} onOpenChange={setMissionAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Mission
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMissions().length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Plane className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getMissions().filter(m => m.status === 'ASSIGNED').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Plane className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getMissions().filter(m => m.status === 'IN_PROGRESS').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getMissions().filter(m => m.status === 'IN_PROGRESS').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Plane className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getMissions().filter(m => m.status === 'COMPLETED').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getMissions().map(mission => {
              const employee = getProfiles().find(p => p.id === mission.employeeId);
              const assignedBy = getProfiles().find(p => p.id === mission.managerId);
              return (
                <div 
                  key={mission.id} 
                  className="flex items-center justify-between border-b pb-4 last:border-0 hover:bg-muted/50 transition-colors rounded-lg p-4 cursor-pointer"
                  onClick={() => navigate(`/mission/${mission.id}`)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar>
                      <AvatarImage src={employee?.profileImage} />
                      <AvatarFallback>{employee?.firstName[0]}{employee?.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee?.firstName} {employee?.lastName}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {mission.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{mission.purpose}</p>
                      <p className="text-xs text-muted-foreground">
                        Assigned by: {assignedBy?.firstName} {assignedBy?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
                    {mission.status === 'ASSIGNED' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMission(mission);
                            setSelectedEmployeeName(`${employee?.firstName} ${employee?.lastName}`);
                            setApprovalDialogOpen(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <MissionApprovalDialog
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        mission={selectedMission}
        employeeName={selectedEmployeeName}
        onApprove={handleApproveMission}
        onReject={handleRejectMission}
      />

      <FullMissionAssignDialog
        open={missionAssignDialogOpen}
        onOpenChange={setMissionAssignDialogOpen}
      />
    </div>
  );
}
