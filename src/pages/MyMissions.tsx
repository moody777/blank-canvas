import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getMissions, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plane, MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function MyMissions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userMissions = getMissions().filter(m => m.employeeId === user?.employeeId);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ASSIGNED': return 'bg-yellow-500';
      case 'IN_PROGRESS': return 'bg-blue-500';
      case 'COMPLETED': return 'bg-purple-500';
      case 'CANCELLED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Missions</h1>
        <p className="text-muted-foreground">View and track your business trips and assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Missions</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMissions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMissions.filter(m => m.status === 'IN_PROGRESS').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Plane className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMissions.filter(m => m.status === 'COMPLETED').length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userMissions.map((mission) => {
          const assignedBy = getProfiles().find(p => p.id === mission.managerId);
          return (
            <Card 
              key={mission.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigate(`/mission/${mission.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {mission.destination}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{mission.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={assignedBy?.profileImage} />
                    <AvatarFallback>{assignedBy?.firstName[0]}{assignedBy?.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Assigned by: {assignedBy ? `${assignedBy.firstName} ${assignedBy.lastName}` : 'Unknown'}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {userMissions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Plane className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No missions assigned</p>
            <p className="text-sm text-muted-foreground">Your business trips will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
