import { useState } from 'react';
import { getDepartments, getProfiles, getSystemRoles, getPositions, getContracts } from '@/lib/mockFunctions';
import type { Role } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, Plus, Edit, Trash2, Shield, UserCog, Clock, Settings, Users,
  Search, UserPlus, FileText, Download, ChevronRight, ChevronDown, ArrowRightLeft
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  mockAddDepartment, 
  mockEditDepartment, 
  mockDeleteDepartment,
  mockAddEmployee,
  mockViewEmployeeInfo,
  mockExportReport
} from '@/lib/mockFunctions';
import { ChangeRoleDialog } from '@/components/hr/ChangeRoleDialog';
import { JustInTimeRoleDialog } from '@/components/hr/JustInTimeRoleDialog';
import { ManageRolePermissionsDialog } from '@/components/hr/ManageRolePermissionsDialog';
import { ReAuthenticationDialog } from '@/components/hr/ReAuthenticationDialog';
import { CreateRoleDialog } from '@/components/hr/CreateRoleDialog';
import { EmployeeEditDialog } from '@/components/employee/EmployeeEditDialog';
import { DepartmentUpdateDialog } from '@/components/hr/DepartmentUpdateDialog';
import { EmployeeCreationDialog } from '@/components/admin/EmployeeCreationDialog';
import { EmployeeReassignDialog } from '@/components/hr/EmployeeReassignDialog';
import HREmployeeEditDialog from '@/components/hr/HREmployeeEditDialog';
import { useUserRole } from '@/contexts/UserRoleContext';

const MOCK_EMPLOYEES = getProfiles().slice(0, 10).map((profile, index) => ({
  id: profile.id,
  name: `${profile.firstName} ${profile.lastName}`,
  email: profile.email,
  currentRole: getSystemRoles()[index % getSystemRoles().length].roleName,
  roleId: getSystemRoles()[index % getSystemRoles().length].id,
  avatar: profile.profileImage,
  department: 'Engineering',
  temporaryRole: index === 0 ? { role: 'HR Administrator', expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) } : null
}));

export default function Organization() {
  const { hasAnyRole } = useUserRole();
  const canEdit = hasAnyRole(['hr_admin', 'system_admin']);
  
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showChangeRoleDialog, setShowChangeRoleDialog] = useState(false);
  const [showJITDialog, setShowJITDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [showReauthDialog, setShowReauthDialog] = useState(false);
  const [showCreateRoleDialog, setShowCreateRoleDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [roles, setRoles] = useState(getSystemRoles());
  const [showDepartmentUpdateDialog, setShowDepartmentUpdateDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<ReturnType<typeof getDepartments>[0] | null>(null);
  
  // Employee filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [employeeCreationDialogOpen, setEmployeeCreationDialogOpen] = useState(false);
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [reassignEmployee, setReassignEmployee] = useState<{
    id: string;
    name: string;
    currentDepartment: string;
    currentManager?: string;
    avatar?: string;
  } | null>(null);
  const [hrEditDialogOpen, setHrEditDialogOpen] = useState(false);
  const [selectedEmployeeForHR, setSelectedEmployeeForHR] = useState<string>('');
  
  // Hierarchy state
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);

  const requireReauth = (action: () => void) => {
    setPendingAction(() => action);
    setShowReauthDialog(true);
  };

  const handleReauthSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleChangeRole = (employee: typeof MOCK_EMPLOYEES[0]) => {
    setSelectedEmployee(employee);
    requireReauth(() => setShowChangeRoleDialog(true));
  };

  const handleJITRole = (employee: typeof MOCK_EMPLOYEES[0]) => {
    setSelectedEmployee(employee);
    requireReauth(() => setShowJITDialog(true));
  };

  const handleManagePermissions = (role: Role) => {
    setSelectedRole(role);
    requireReauth(() => setShowPermissionsDialog(true));
  };

  const handleCreateRole = () => {
    requireReauth(() => setShowCreateRoleDialog(true));
  };

  const handleRoleCreated = (newRole: { id: string; name: string; description: string; permissions: string[] }) => {
    const roleWithDefaults: Role = {
      id: newRole.id,
      roleName: newRole.name,
      purpose: newRole.description,
    };
    
    setRoles([...roles, roleWithDefaults]);
    setSelectedRole(roleWithDefaults);
    setShowPermissionsDialog(true);
  };

  const toggleDept = (deptId: string) => {
    setExpandedDepts(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const filteredProfiles = getProfiles().filter(profile => {
    const matchesSearch = 
      profile.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = filterDept === 'all' || profile.departmentId === filterDept;
    const matchesStatus = filterStatus === 'all' || profile.accountStatus?.toUpperCase() === filterStatus.toUpperCase();
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const hierarchyLevels = new Set(getProfiles().map(p => {
    let level = 1;
    let currentProfile = p;
    while (currentProfile.managerId) {
      level++;
      currentProfile = getProfiles().find(prof => prof.id === currentProfile.managerId) || currentProfile;
      if (level > 10) break;
    }
    return level;
  })).size;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization</h1>
        <p className="text-muted-foreground">Manage organizational structure, employees, and roles</p>
      </div>

      <Tabs defaultValue="hierarchy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hierarchy">Org Hierarchy</TabsTrigger>
          {canEdit && <TabsTrigger value="employees">Employees</TabsTrigger>}
          {canEdit && <TabsTrigger value="roles">Role Management</TabsTrigger>}
        </TabsList>

        {/* EMPLOYEES TAB */}
        <TabsContent value="employees" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Employee Directory</div>
            <Button onClick={() => setEmployeeCreationDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterDept} onValueChange={setFilterDept}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {getDepartments().map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employees ({filteredProfiles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProfiles.map(profile => {
                  const dept = getDepartments().find(d => d.id === profile.departmentId);
                  const pos = getPositions().find(p => p.id === profile.positionId);
                  
                  return (
                    <div key={profile.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={profile.profileImage} />
                          <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                          <p className="text-sm text-muted-foreground">{pos?.title} • {dept?.name}</p>
                          <p className="text-xs text-muted-foreground">{profile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={profile.employmentStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}>
                          {profile.employmentStatus.toLowerCase()}
                        </Badge>
                        {profile.contractId && (
                          <Badge variant="outline" className="capitalize">
                            {getContracts().find(c => c.id === profile.contractId)?.type.toLowerCase().replace('_', ' ') || 'N/A'}
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSelectedEmployeeId(profile.id);
                            setEditDialogOpen(true);
                          }}
                          title="Self Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSelectedEmployeeForHR(profile.id);
                            setHrEditDialogOpen(true);
                          }}
                          title="HR Edit"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => mockViewEmployeeInfo(profile.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const dept = getDepartments().find(d => d.id === profile.departmentId);
                            const manager = profile.managerId ? getProfiles().find(p => p.id === profile.managerId) : null;
                            setReassignEmployee({
                              id: profile.id,
                              name: `${profile.firstName} ${profile.lastName}`,
                              currentDepartment: dept?.name || 'Unknown',
                              currentManager: manager ? `${manager.firstName} ${manager.lastName}` : undefined,
                              avatar: profile.profileImage
                            });
                            setReassignDialogOpen(true);
                          }}
                        >
                          <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROLE MANAGEMENT TAB */}
        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Role Management</div>
            <Button onClick={handleCreateRole}>
              <Shield className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getProfiles().length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active JIT Roles</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {MOCK_EMPLOYEES.filter(e => e.temporaryRole).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Privileged Roles</CardTitle>
                <Settings className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {roles.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="system-roles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="system-roles">System Roles</TabsTrigger>
              <TabsTrigger value="assignments">Employee Assignments</TabsTrigger>
              <TabsTrigger value="temporary">Temporary Roles</TabsTrigger>
            </TabsList>

            <TabsContent value="system-roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Roles</CardTitle>
                  <CardDescription>
                    Configure roles and their associated permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roles.map(role => (
                      <div 
                        key={role.id} 
                        className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{role.roleName}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{role.purpose}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManagePermissions(role)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Permissions
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Role Assignments</CardTitle>
                  <CardDescription>
                    View and modify employee role assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Current Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_EMPLOYEES.map(employee => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback>{employee.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{employee.name}</p>
                                <p className="text-xs text-muted-foreground">{employee.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{employee.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{employee.currentRole}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleChangeRole(employee)}
                              >
                                <UserCog className="h-4 w-4 mr-1" />
                                Change
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleJITRole(employee)}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                JIT
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="temporary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Temporary Roles</CardTitle>
                  <CardDescription>
                    Just-in-time role assignments with automatic expiration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {MOCK_EMPLOYEES.filter(e => e.temporaryRole).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No active temporary role assignments</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {MOCK_EMPLOYEES.filter(e => e.temporaryRole).map(employee => (
                        <div 
                          key={employee.id} 
                          className="flex items-center justify-between border rounded-lg p-4"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {employee.currentRole}
                                </Badge>
                                <span className="text-xs text-muted-foreground">→</span>
                                <Badge className="bg-amber-500 text-xs">
                                  {employee.temporaryRole?.role}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Expires: {employee.temporaryRole?.expiresAt.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ORG HIERARCHY TAB */}
        <TabsContent value="hierarchy" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Organizational Hierarchy</div>
            <div className="flex gap-2">
              {canEdit && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Department
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Department</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">Department form would go here</p>
                        <Button onClick={() => mockAddDepartment()} className="w-full">
                          Add Department
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" onClick={() => setEmployeeCreationDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </>
              )}
              <Button onClick={() => mockExportReport('hierarchy', 'pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getDepartments().length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getProfiles().length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hierarchy Levels</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hierarchyLevels}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getDepartments().map(dept => {
                  const deptEmployees = getProfiles().filter(p => p.departmentId === dept.id);
                  const deptPositions = getPositions();
                  const isExpanded = expandedDepts.includes(dept.id);
                  
                  return (
                    <div key={dept.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleDept(dept.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                          <Building2 className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{dept.name}</h3>
                            <p className="text-sm text-muted-foreground">{dept.purpose}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{deptEmployees.length} employees</Badge>
                          {canEdit && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDepartment(dept);
                                  setShowDepartmentUpdateDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  mockDeleteDepartment(dept.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="border-t bg-muted/20 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Positions ({deptPositions.length})
                              </h4>
                              <ul className="space-y-2">
                                {deptPositions.map(pos => {
                                  const posCount = deptEmployees.filter(e => e.positionId === pos.id).length;
                                  return (
                                    <li key={pos.id} className="flex items-center justify-between text-sm border rounded p-2 bg-card">
                                      <span>{pos.title}</span>
                                      <Badge variant="outline" className="text-xs">{posCount}</Badge>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Team Members ({deptEmployees.length})
                              </h4>
                              <div className="space-y-2">
                                {deptEmployees.map(emp => {
                                  const pos = getPositions().find(p => p.id === emp.positionId);
                                  const manager = getProfiles().find(p => p.id === emp.managerId);
                                   return (
                                     <div key={emp.id} className="flex items-center gap-3 border rounded p-2 bg-card">
                                       <Avatar className="h-8 w-8">
                                         <AvatarImage src={emp.profileImage} />
                                         <AvatarFallback>{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
                                       </Avatar>
                                       <div className="flex-1 min-w-0">
                                         <p className="text-sm font-medium truncate">
                                           {emp.firstName} {emp.lastName}
                                         </p>
                                         <p className="text-xs text-muted-foreground truncate">
                                           {pos?.title}
                                         </p>
                                         {manager && (
                                           <p className="text-xs text-muted-foreground">
                                             Reports to: {manager.firstName} {manager.lastName}
                                           </p>
                                         )}
                                       </div>
                                        <div className="flex items-center gap-2">
                                          <Badge 
                                            variant={emp.employmentStatus === 'ACTIVE' ? 'default' : 'secondary'}
                                            className="text-xs"
                                          >
                                            {emp.employmentStatus.toLowerCase()}
                                          </Badge>
                                          {canEdit && (
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => {
                                                setSelectedEmployeeId(emp.id);
                                                setEditDialogOpen(true);
                                              }}
                                            >
                                              <Edit className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                     </div>
                                   );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChangeRoleDialog
        open={showChangeRoleDialog}
        onOpenChange={setShowChangeRoleDialog}
        employee={selectedEmployee ? {
          id: selectedEmployee.id,
          name: selectedEmployee.name,
          currentRole: selectedEmployee.currentRole
        } : null}
        availableRoles={roles.map(r => ({ id: r.id, name: r.roleName }))}
        onRoleChanged={() => {}}
      />

      <JustInTimeRoleDialog
        open={showJITDialog}
        onOpenChange={setShowJITDialog}
        employee={selectedEmployee ? {
          id: selectedEmployee.id,
          name: selectedEmployee.name,
          currentRole: selectedEmployee.currentRole
        } : null}
        availableRoles={roles.map(r => ({ id: r.id, name: r.roleName }))}
        onRoleAssigned={() => {}}
      />

      <ManageRolePermissionsDialog
        open={showPermissionsDialog}
        onOpenChange={setShowPermissionsDialog}
        role={selectedRole ? { id: selectedRole.id, name: selectedRole.roleName, permissions: [] } : null}
        onPermissionsUpdated={() => {}}
      />

      <CreateRoleDialog
        open={showCreateRoleDialog}
        onOpenChange={setShowCreateRoleDialog}
        onRoleCreated={handleRoleCreated}
      />

      <ReAuthenticationDialog
        open={showReauthDialog}
        onOpenChange={setShowReauthDialog}
        onSuccess={handleReauthSuccess}
        actionDescription="This privileged action requires you to verify your identity."
      />

      <EmployeeEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        employeeId={selectedEmployeeId}
      />

      <DepartmentUpdateDialog
        open={showDepartmentUpdateDialog}
        onOpenChange={setShowDepartmentUpdateDialog}
        department={selectedDepartment}
        onDepartmentUpdated={() => {}}
      />

      <EmployeeCreationDialog
        open={employeeCreationDialogOpen}
        onOpenChange={setEmployeeCreationDialogOpen}
      />

      <EmployeeReassignDialog
        open={reassignDialogOpen}
        onOpenChange={setReassignDialogOpen}
        employee={reassignEmployee}
      />

      <HREmployeeEditDialog
        open={hrEditDialogOpen}
        onOpenChange={setHrEditDialogOpen}
        employee={getProfiles().find(p => p.id === selectedEmployeeForHR) || null}
      />
    </div>
  );
}
