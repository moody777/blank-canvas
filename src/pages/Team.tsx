import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getProfiles, getDepartments, getPositions, getLeaveRequests, getSkills, getCertifications } from '@/lib/mockFunctions';
import { Users, Calendar, Clock, Award, Search, StickyNote, UserPlus, Bell } from 'lucide-react';
import { ShiftAssignmentDialog } from '@/components/manager/ShiftAssignmentDialog';
import { ManagerNoteDialog } from '@/components/manager/ManagerNoteDialog';
import { SendNotificationDialog } from '@/components/manager/SendNotificationDialog';

export default function Team() {
  const managerId = '1'; // This would come from auth context
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftDialogOpen, setShiftDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);

  const profiles = getProfiles();
  const departments = getDepartments();
  const positions = getPositions();
  const leaveRequests = getLeaveRequests();
  const allSkills = getSkills();
  const allCertifications = getCertifications();

  const teamMembers = profiles.filter(profile => profile.managerId === managerId);
  
  const filteredMembers = teamMembers.filter(member => 
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const teamLeaves = leaveRequests.filter(req =>
    teamMembers.some(member => member.id === req.employeeId) && req.status === 'PENDING'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Team</h1>
          <p className="text-muted-foreground">Manage and monitor your team members</p>
        </div>
        <Button onClick={() => setNotificationDialogOpen(true)}>
          <Bell className="h-4 w-4 mr-2" />
          Send Notification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamLeaves.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.employmentStatus === 'ACTIVE').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 yrs</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredMembers.map(member => {
              const dept = departments.find(d => d.id === member.departmentId);
              const pos = positions.find(p => p.id === member.positionId);
              const memberSkills = allSkills.slice(0, 3); // Show sample skills
              const memberCerts = allCertifications.slice(0, 2); // Show sample certs
              
              return (
                <div key={member.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-lg">{member.firstName} {member.lastName}</p>
                      <p className="text-sm text-muted-foreground">
                        {pos?.title} • {dept?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined {new Date(member.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={member.employmentStatus === 'ACTIVE' ? 'default' : 'secondary'}>
                      {member.employmentStatus}
                    </Badge>
                  </div>

                  {memberSkills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {memberSkills.map(skill => (
                          <Badge key={skill.id} variant="outline">
                            {skill.skillName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {memberCerts.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {memberCerts.map(cert => (
                          <Badge key={cert.id} variant="outline" className="bg-blue-500/10">
                            {cert.verificationType}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedEmployee({ id: member.id, name: `${member.firstName} ${member.lastName}` });
                        setShiftDialogOpen(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Shift
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedEmployee({ id: member.id, name: `${member.firstName} ${member.lastName}` });
                        setNoteDialogOpen(true);
                      }}
                    >
                      <StickyNote className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedEmployee && (
        <>
          <ShiftAssignmentDialog
            open={shiftDialogOpen}
            onOpenChange={setShiftDialogOpen}
            employeeId={selectedEmployee.id}
            employeeName={selectedEmployee.name}
          />
          <ManagerNoteDialog
            open={noteDialogOpen}
            onOpenChange={setNoteDialogOpen}
            employeeId={selectedEmployee.id}
            employeeName={selectedEmployee.name}
          />
        </>
      )}
      
      <SendNotificationDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
        teamMembers={teamMembers.map(m => ({
          id: m.id,
          name: `${m.firstName} ${m.lastName}`,
          avatar: m.profileImage
        }))}
      />
    </div>
  );
}
