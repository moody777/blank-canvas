import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfiles, getDepartments, getPositions, getUsers, getSkills, getCertifications, getContracts } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, X, Plus, Phone, User, AlertTriangle } from 'lucide-react';
import { mockUpdateProfile, mockUploadProfilePicture } from '@/lib/mockFunctions';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const profiles = getProfiles();
  const allSkills = getSkills();
  const allCertifications = getCertifications();
  const departments = getDepartments();
  const positions = getPositions();
  const contracts = getContracts();
  
  const profile = profiles.find(p => p.id === user?.id);
  const userSkills = allSkills.filter(s => s.id); // For now, show all skills
  const userCerts = allCertifications.filter(c => c.id); // For now, show all certifications
  const department = departments.find(d => d.id === profile?.departmentId);
  const position = positions.find(p => p.id === profile?.positionId);
  const contract = contracts.find(c => c.id === profile?.contractId);
  const manager = profile?.managerId ? profiles.find(p => p.id === profile.managerId) : null;

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phone: profile?.phone || '',
    email: profile?.email || '',
    biography: profile?.biography || '',
    address: profile?.address || '',
    // Emergency Contact Fields
    emergencyContactName: profile?.emergencyContactName || '',
    emergencyContactPhone: profile?.emergencyContactPhone || '',
    relationship: profile?.relationship || '',
  });

  const handleSave = () => {
    mockUpdateProfile(formData);
    setIsEditing(false);
  };

  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.profileImage} />
              <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm" onClick={() => mockUploadProfilePicture()}>
                <Plus className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              {isEditing ? (
                <Input 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              ) : (
                <p className="text-sm">{profile.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              {isEditing ? (
                <Input 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              ) : (
                <p className="text-sm">{profile.lastName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>National ID</Label>
              <p className="text-sm">{profile.nationalId}</p>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <p className="text-sm">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <Label>Country of Birth</Label>
              <p className="text-sm">{profile.countryOfBirth}</p>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              {isEditing ? (
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="text-sm">{profile.phone}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Email</Label>
              {isEditing ? (
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              ) : (
                <p className="text-sm">{profile.email}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Biography</Label>
              {isEditing ? (
                <Textarea 
                  value={formData.biography}
                  onChange={(e) => setFormData({...formData, biography: e.target.value})}
                  rows={3}
                />
              ) : (
                <p className="text-sm">{profile.biography}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Employment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <p className="text-sm">{department?.name}</p>
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <p className="text-sm">{position?.title}</p>
            </div>
            <div className="space-y-2">
              <Label>Manager</Label>
              <p className="text-sm">{manager ? `${manager.firstName} ${manager.lastName}` : 'None'}</p>
            </div>
            <div className="space-y-2">
              <Label>Contract Type</Label>
              <Badge variant="outline" className="capitalize">{contract?.type || 'N/A'}</Badge>
            </div>
            <div className="space-y-2">
              <Label>Hiring Date</Label>
              <p className="text-sm">{new Date(profile.hireDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Badge className={profile.employmentStatus === 'ACTIVE' ? 'bg-green-500' : ''}>{profile.employmentStatus}</Badge>
            </div>
            <div className="space-y-2">
              <Label>Salary Type</Label>
              <Badge variant="secondary" className="capitalize">{profile.salaryTypeId || 'N/A'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Contact Name</Label>
              {isEditing ? (
                <Input 
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                  placeholder="Enter contact name"
                />
              ) : (
                <p className="text-sm">{profile.emergencyContactName || 'Not set'}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Contact Phone</Label>
              {isEditing ? (
                <Input 
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                  placeholder="+1 555 123 4567"
                />
              ) : (
                <p className="text-sm">{profile.emergencyContactPhone || 'Not set'}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Relationship</Label>
              {isEditing ? (
                <Select 
                  value={formData.relationship} 
                  onValueChange={(value) => setFormData({...formData, relationship: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm">{profile.relationship || 'Not set'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          {isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({ 
                title: "Add Skill", 
                description: "Skill addition form would open here." 
              })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userSkills.slice(0, 5).map(skill => (
              <Badge key={skill.id} variant="secondary" className="capitalize">
                {skill.skillName}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certifications</CardTitle>
          {isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({ 
                title: "Add Certification", 
                description: "Certification addition form would open here." 
              })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userCerts.slice(0, 3).map(cert => (
              <div key={cert.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">{cert.verificationType}</h4>
                <p className="text-sm text-muted-foreground">Issuer: {cert.issuer}</p>
                <p className="text-sm text-muted-foreground">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Validity: {cert.expiryPeriod}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
