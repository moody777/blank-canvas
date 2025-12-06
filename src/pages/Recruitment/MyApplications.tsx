import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Briefcase, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { jobApplications, jobs, interviewStages, jobOffers } from '@/data/mockData';
import { WithdrawApplication } from '@/lib/mockFunctions';
import { toast } from 'sonner';
import type { JobApplication, InterviewStage, JobOffer } from '@/types';

export default function MyApplications() {
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Filter applications for current user (mock: show all)
  const myApplications = jobApplications;
  const myOffers = jobOffers.filter(offer => 
    myApplications.some(app => app.id === offer.applicationId)
  );

  const getApplicationInterviews = (applicationId: string) => {
    return interviewStages.filter(stage => stage.applicationId === applicationId);
  };

  const getJob = (jobId: string) => {
    return jobs.find(j => j.id === jobId);
  };

  const handleWithdraw = async (applicationId: string) => {
    await WithdrawApplication(applicationId);
    toast.success('Application withdrawn successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'secondary';
      case 'screening': return 'default';
      case 'interview': return 'default';
      case 'offer': return 'default';
      case 'rejected': return 'destructive';
      case 'withdrawn': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track your job applications and offers</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications ({myApplications.length})</TabsTrigger>
          <TabsTrigger value="offers">Offers ({myOffers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {myApplications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">You haven't applied to any jobs yet</p>
                <Button className="mt-4" onClick={() => window.location.href = '/recruitment/jobs'}>
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myApplications.map((application) => {
                const job = getJob(application.jobId);
                const interviews = getApplicationInterviews(application.id);
                
                return (
                  <Card key={application.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{job?.title || 'Unknown Position'}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            Applied: {new Date(application.appliedDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          CV: {application.cvUrl}
                        </div>
                      </div>

                      {interviews.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Interview Progress</h4>
                          <div className="space-y-2">
                            {interviews.map((interview) => (
                              <div key={interview.id} className="flex items-center gap-2 text-sm">
                                {interview.result === 'pass' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : interview.result === 'fail' ? (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                ) : (
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="capitalize">{interview.stage.replace('-', ' ')}</span>
                                {interview.scheduledDate && (
                                  <span className="text-muted-foreground">
                                    - {new Date(interview.scheduledDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailsDialog(true);
                          }}
                        >
                          View Details
                        </Button>
                        {application.status === 'submitted' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleWithdraw(application.id)}
                          >
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          {myOffers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No offers yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myOffers.map((offer) => {
                const application = myApplications.find(app => app.id === offer.applicationId);
                const job = application ? getJob(application.jobId) : null;
                
                return (
                  <Card key={offer.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{job?.title || 'Unknown Position'}</CardTitle>
                          <CardDescription>
                            Offered on: {new Date(offer.offerDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant={offer.status === 'pending' ? 'default' : offer.status === 'accepted' ? 'default' : 'destructive'}>
                          {offer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Salary</p>
                          <p className="font-medium">${offer.salary.toLocaleString()}/year</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium">{new Date(offer.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Benefits</p>
                          <p className="font-medium">{offer.benefits}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Offer Expires</p>
                          <p className="font-medium">{new Date(offer.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      {offer.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button className="flex-1">Accept Offer</Button>
                          <Button variant="destructive" className="flex-1">Decline</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete information about your application
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Cover Letter</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.coverLetter || 'No cover letter provided'}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm space-y-1">
                  <p>Email: {selectedApplication.applicantEmail}</p>
                  <p>Phone: {selectedApplication.applicantPhone}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
