import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, DollarSign, Calendar, Plus, XCircle } from 'lucide-react';
import { jobOffers, jobApplications, jobs } from '@/data/mockData';
import { CreateJobOffer, RescindOffer } from '@/lib/mockFunctions';
import { toast } from 'sonner';

export default function HROffers() {
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [offerForm, setOfferForm] = useState({
    salary: '',
    startDate: '',
    benefits: '',
    expiryDate: '',
    termsConditions: '',
  });

  const handleCreateOffer = async () => {
    if (!selectedApplicationId || !offerForm.salary || !offerForm.startDate || !offerForm.expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const application = jobApplications.find(app => app.id === selectedApplicationId);
    if (!application) return;

    await CreateJobOffer(
      selectedApplicationId,
      application.jobId,
      parseFloat(offerForm.salary),
      offerForm.startDate,
      offerForm.benefits,
      offerForm.expiryDate,
      offerForm.termsConditions
    );

    toast.success('Job offer created successfully!');
    setShowOfferDialog(false);
    setOfferForm({ salary: '', startDate: '', benefits: '', expiryDate: '', termsConditions: '' });
  };

  const handleRescind = async (offerId: string) => {
    if (confirm('Are you sure you want to rescind this offer?')) {
      await RescindOffer(offerId);
      toast.success('Offer rescinded');
    }
  };

  const pendingOffers = jobOffers.filter(o => o.status === 'pending');
  const acceptedOffers = jobOffers.filter(o => o.status === 'accepted');
  const rejectedOffers = jobOffers.filter(o => o.status === 'rejected');
  const rescindedOffers = jobOffers.filter(o => o.status === 'rescinded');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Offer Management</h1>
          <p className="text-muted-foreground">Create and manage job offers</p>
        </div>
        <Button onClick={() => setShowOfferDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Offers</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOffers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedOffers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedOffers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rescinded</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rescindedOffers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Job Offers</CardTitle>
          <CardDescription>Manage all job offers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Offer Date</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobOffers.map((offer) => {
                const application = jobApplications.find(app => app.id === offer.applicationId);
                const job = jobs.find(j => j.id === offer.jobId);
                
                return (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application?.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{application?.applicantEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>${offer.salary.toLocaleString()}</TableCell>
                    <TableCell>{new Date(offer.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(offer.offerDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(offer.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          offer.status === 'pending' ? 'default' :
                          offer.status === 'accepted' ? 'default' :
                          offer.status === 'rejected' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {offer.status === 'pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRescind(offer.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rescind
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Job Offer</DialogTitle>
            <DialogDescription>Create a new job offer for a candidate</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="application">Select Application *</Label>
              <select
                id="application"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedApplicationId}
                onChange={(e) => setSelectedApplicationId(e.target.value)}
              >
                <option value="">Select an application</option>
                {jobApplications
                  .filter(app => app.status === 'interview')
                  .map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return (
                      <option key={app.id} value={app.id}>
                        {app.applicantName} - {job?.title}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary (Annual) *</Label>
                <Input
                  id="salary"
                  type="number"
                  value={offerForm.salary}
                  onChange={(e) => setOfferForm({ ...offerForm, salary: e.target.value })}
                  placeholder="50000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={offerForm.startDate}
                  onChange={(e) => setOfferForm({ ...offerForm, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="expiryDate">Offer Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={offerForm.expiryDate}
                  onChange={(e) => setOfferForm({ ...offerForm, expiryDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits *</Label>
              <Textarea
                id="benefits"
                value={offerForm.benefits}
                onChange={(e) => setOfferForm({ ...offerForm, benefits: e.target.value })}
                placeholder="Health insurance, 401k, etc."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea
                id="terms"
                value={offerForm.termsConditions}
                onChange={(e) => setOfferForm({ ...offerForm, termsConditions: e.target.value })}
                placeholder="Additional terms and conditions..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOfferDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateOffer}>Create Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
