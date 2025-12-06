import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Users, Calendar, CheckCircle, XCircle, Clock, Plus, Eye, Download } from 'lucide-react';
import { jobs, jobApplications, interviewStages, departments } from '@/data/mockData';
import { getProfiles, getPositions, getDepartments } from '@/lib/mockFunctions';
import { CreateJobPosting, UpdateApplicationStatus, ScheduleInterview, UpdateInterviewResult } from '@/lib/mockFunctions';
import { toast } from 'sonner';
import type { Job, JobApplication } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

export default function HRJobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    departmentId: '',
    requirements: '',
    responsibilities: '',
    salaryRange: '',
    employmentType: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    experienceLevel: 'mid' as 'entry' | 'mid' | 'senior' | 'executive',
    location: '',
  });

  const [interviewForm, setInterviewForm] = useState({
    stage: 'phone-screen' as 'phone-screen' | 'technical' | 'behavioral' | 'final' | 'hr-round',
    scheduledDate: '',
    interviewerIds: [] as string[],
  });

  const profiles = getProfiles();
  const positions = getPositions();
  const depts = getDepartments();
  
  const interviewers = profiles.filter(p => {
    const position = positions.find(pos => pos.id === p.positionId);
    const posTitle = position?.title?.toLowerCase() || '';
    return p.employmentStatus === 'ACTIVE' && 
           (posTitle.includes('manager') || 
            posTitle.includes('lead') ||
            posTitle.includes('hr'));
  });

  const getApplicationsForJob = (jobId: string) => {
    return jobApplications.filter(app => app.jobId === jobId);
  };

  const getInterviewsForApplication = (applicationId: string) => {
    return interviewStages.filter(stage => stage.applicationId === applicationId);
  };

  const handleCreateJob = async () => {
    if (!jobForm.title || !jobForm.departmentId || !jobForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    await CreateJobPosting(
      jobForm.title,
      jobForm.description,
      jobForm.departmentId,
      jobForm.requirements,
      jobForm.responsibilities,
      jobForm.salaryRange,
      jobForm.employmentType,
      jobForm.experienceLevel,
      jobForm.location
    );

    toast.success('Job posted successfully!');
    setShowJobDialog(false);
    setJobForm({
      title: '',
      description: '',
      departmentId: '',
      requirements: '',
      responsibilities: '',
      salaryRange: '',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      location: '',
    });
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
    await UpdateApplicationStatus(applicationId, status);
    toast.success('Application status updated');
  };

  const handleScheduleInterview = async () => {
    if (!selectedApplication || !interviewForm.scheduledDate || interviewForm.interviewerIds.length === 0) {
      toast.error('Please fill in all required fields and select at least one interviewer');
      return;
    }

    await ScheduleInterview(
      selectedApplication.id,
      interviewForm.stage,
      interviewForm.scheduledDate,
      interviewForm.interviewerIds
    );

    toast.success('Interview scheduled successfully');
    setShowInterviewDialog(false);
    setInterviewForm({ stage: 'phone-screen', scheduledDate: '', interviewerIds: [] });
  };

  const handleDownloadCV = (cvUrl: string, applicantName: string) => {
    // In a real app, this would trigger an actual download
    toast.success(`Downloading CV for ${applicantName}`);
    // window.open(cvUrl, '_blank');
  };

  const toggleInterviewer = (interviewerId: string) => {
    setInterviewForm(prev => ({
      ...prev,
      interviewerIds: prev.interviewerIds.includes(interviewerId)
        ? prev.interviewerIds.filter(id => id !== interviewerId)
        : [...prev.interviewerIds, interviewerId]
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recruitment Management</h1>
          <p className="text-muted-foreground">Manage job postings and track applications</p>
        </div>
        <Button onClick={() => setShowJobDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.filter(j => j.status === 'open').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobApplications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Interview</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobApplications.filter(app => app.status === 'interview').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobApplications.filter(app => app.status === 'submitted').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage all job openings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => {
                    const applications = getApplicationsForJob(job.id);
                    const dept = departments.find(d => d.id === job.departmentId);
                    
                    return (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{dept?.name}</TableCell>
                        <TableCell className="capitalize">{job.employmentType}</TableCell>
                        <TableCell>{applications.length}</TableCell>
                        <TableCell>
                          <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedJob(job);
                              setShowApplicationDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View ({applications.length})
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Review and manage candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Interviews</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.map((application) => {
                    const job = jobs.find(j => j.id === application.jobId);
                    const interviews = getInterviewsForApplication(application.id);
                    
                    return (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{application.applicantName}</p>
                            <p className="text-sm text-muted-foreground">{application.applicantEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{job?.title}</TableCell>
                        <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={application.status}
                            onValueChange={(value) => handleUpdateApplicationStatus(application.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="submitted">Submitted</SelectItem>
                              <SelectItem value="screening">Screening</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="offer">Offer</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {interviews.map(int => (
                              <div key={int.id} className="inline-flex">
                                {int.result === 'pass' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : int.result === 'fail' ? (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                ) : (
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadCV(application.cvUrl, application.applicantName)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowInterviewDialog(true);
                            }}
                          >
                            Schedule
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>Create a new job posting</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={jobForm.departmentId} onValueChange={(value) => setJobForm({ ...jobForm, departmentId: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select value={jobForm.employmentType} onValueChange={(value: any) => setJobForm({ ...jobForm, employmentType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select value={jobForm.experienceLevel} onValueChange={(value: any) => setJobForm({ ...jobForm, experienceLevel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryRange">Salary Range *</Label>
                <Input
                  id="salaryRange"
                  value={jobForm.salaryRange}
                  onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                  placeholder="$50,000 - $70,000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements *</Label>
              <Textarea
                id="requirements"
                value={jobForm.requirements}
                onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                value={jobForm.responsibilities}
                onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateJob}>Post Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInterviewDialog} onOpenChange={setShowInterviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule an interview for {selectedApplication?.applicantName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Interview Stage *</Label>
              <Select value={interviewForm.stage} onValueChange={(value: any) => setInterviewForm({ ...interviewForm, stage: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone-screen">Phone Screen</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="hr-round">HR Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date *</Label>
              <Input
                id="scheduledDate"
                type="datetime-local"
                value={interviewForm.scheduledDate}
                onChange={(e) => setInterviewForm({ ...interviewForm, scheduledDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Select Interviewers *</Label>
              <div className="border rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto bg-background">
                {interviewers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No interviewers available</p>
                ) : (
                  interviewers.map(interviewer => {
                    const position = positions.find(p => p.id === interviewer.positionId);
                    const dept = depts.find(d => d.id === interviewer.departmentId);
                    return (
                      <div key={interviewer.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interviewer-${interviewer.id}`}
                          checked={interviewForm.interviewerIds.includes(interviewer.id)}
                          onCheckedChange={() => toggleInterviewer(interviewer.id)}
                        />
                        <label
                          htmlFor={`interviewer-${interviewer.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {interviewer.firstName} {interviewer.lastName}
                          <span className="text-muted-foreground ml-2">
                            ({position?.title || dept?.name || 'Staff'})
                          </span>
                        </label>
                      </div>
                    );
                  })
                )}
              </div>
              {interviewForm.interviewerIds.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {interviewForm.interviewerIds.length} interviewer(s) selected
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInterviewDialog(false)}>Cancel</Button>
            <Button onClick={handleScheduleInterview}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Applications for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Review all applications for this position
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getApplicationsForJob(selectedJob.id).map(app => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.applicantName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{app.applicantEmail}</p>
                        <p className="text-muted-foreground">{app.applicantPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
