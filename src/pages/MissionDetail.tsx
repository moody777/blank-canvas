import { useParams, useNavigate } from 'react-router-dom';
import { getMissions, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, MapPin, Calendar, DollarSign, Plane, 
  Hotel, Users, CheckCircle, Clock 
} from 'lucide-react';
import { mockCompleteMissionTodo } from '@/lib/mockFunctions';

export default function MissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const mission = getMissions().find(m => m.id === id);
  const assignedBy = mission ? getProfiles().find(p => p.id === mission.managerId) : null;
  const mainUser = mission ? getProfiles().find(p => p.id === mission.employeeId) : null;

  if (!mission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-xl font-semibold mb-4">Mission not found</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

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

  const handleTodoToggle = (todoId: string) => {
    mockCompleteMissionTodo(todoId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{mission.destination}</h1>
            <p className="text-muted-foreground">{mission.purpose}</p>
          </div>
        </div>
        <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{mission.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">
                      {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm font-medium">{mission.destination}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">
                      {mission.budget?.toLocaleString()} {mission.currency}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transportation</p>
                    <p className="text-sm font-medium">{mission.transportation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hotel className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Accommodation</p>
                    <p className="text-sm font-medium">{mission.accommodation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned By</p>
                    <p className="text-sm font-medium">
                      {assignedBy?.firstName} {assignedBy?.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for Mission Tasks - would be loaded from MissionTask table */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">No tasks assigned</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Structure */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Team Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Mission Lead</p>
                  {mainUser && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar>
                        <AvatarImage src={mainUser.profileImage} />
                        <AvatarFallback>{mainUser.firstName[0]}{mainUser.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mainUser.firstName} {mainUser.lastName}</p>
                        <p className="text-xs text-muted-foreground">{mainUser.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Placeholder for team members - would be loaded from MissionTeam table */}

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Assigned By</p>
                  {assignedBy && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={assignedBy.profileImage} />
                        <AvatarFallback>{assignedBy.firstName[0]}{assignedBy.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{assignedBy.firstName} {assignedBy.lastName}</p>
                        <p className="text-xs text-muted-foreground">Manager</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
