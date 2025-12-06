import { useState } from 'react';
import { getReimbursements, getProfiles } from '@/lib/mockFunctions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { ReimbursementReviewDialog } from '@/components/hr/ReimbursementReviewDialog';

export default function ReimbursementsQueue() {
  const reimbursements = getReimbursements();
  const profiles = getProfiles();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedReimbursement, setSelectedReimbursement] = useState<any>(null);

  const filteredReimbursements = reimbursements.filter(r => {
    const profile = profiles.find(p => p.id === r.employeeId);
    const matchesSearch = profile && (
      profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = filterType === 'all' || r.claimType === filterType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      case 'paid': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const pending = filteredReimbursements.filter(r => r.currentStatus === 'PENDING');
  const approved = filteredReimbursements.filter(r => r.currentStatus === 'APPROVED');
  const rejected = filteredReimbursements.filter(r => r.currentStatus === 'REJECTED');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reimbursements Queue</h1>
        <p className="text-muted-foreground">Review and process employee reimbursement claims</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approved.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejected.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredReimbursements.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Expense Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="meals">Meals</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pending.map(reimbursement => {
                  const profile = profiles.find(p => p.id === reimbursement.employeeId);
                  return (
                    <div key={reimbursement.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                        <p className="text-sm text-muted-foreground capitalize">{reimbursement.claimType}</p>
                        <p className="text-xs text-muted-foreground">{new Date(reimbursement.submittedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold">${reimbursement.amount.toFixed(2)}</p>
                        <Badge className={getStatusColor(reimbursement.currentStatus.toLowerCase())}>{reimbursement.currentStatus}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedReimbursement({
                            ...reimbursement,
                            employeeName: `${profile?.firstName} ${profile?.lastName}`
                          });
                          setReviewDialogOpen(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {pending.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No pending claims</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {approved.map(reimbursement => {
                  const profile = profiles.find(p => p.id === reimbursement.employeeId);
                  return (
                    <div key={reimbursement.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                        <p className="text-sm text-muted-foreground capitalize">{reimbursement.claimType}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold">${reimbursement.amount.toFixed(2)}</p>
                        <Badge className={getStatusColor(reimbursement.currentStatus.toLowerCase())}>{reimbursement.currentStatus}</Badge>
                      </div>
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
                {rejected.map(reimbursement => {
                  const profile = profiles.find(p => p.id === reimbursement.employeeId);
                  return (
                    <div key={reimbursement.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                        <p className="text-sm text-muted-foreground capitalize">{reimbursement.claimType}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold">${reimbursement.amount.toFixed(2)}</p>
                        <Badge className={getStatusColor(reimbursement.currentStatus.toLowerCase())}>{reimbursement.currentStatus}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReimbursementReviewDialog 
        open={reviewDialogOpen} 
        onOpenChange={setReviewDialogOpen}
        reimbursement={selectedReimbursement}
      />
    </div>
  );
}
