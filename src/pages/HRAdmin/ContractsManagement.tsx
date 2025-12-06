import { useState } from 'react';
import { getContracts, getProfiles, getDepartments, getPositions } from '@/lib/mockFunctions';
import { getContractStatus } from '@/lib/dataAdapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Plus, RefreshCw, Eye } from 'lucide-react';
import { ContractDialog } from '@/components/hr/ContractDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function ContractsManagement() {
  const contracts = getContracts();
  const profiles = getProfiles();
  const departments = getDepartments();
  const positions = getPositions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [contractMode, setContractMode] = useState<'create' | 'renew'>('create');
  const [selectedContractId, setSelectedContractId] = useState<string>();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const filteredContracts = contracts.filter(contract => {
    const profile = profiles.find(p => p.contractId === contract.id);
    const matchesSearch = profile && (
      profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = filterType === 'all' || contract.type === filterType;
    const contractStatus = getContractStatus(contract);
    const matchesStatus = filterStatus === 'all' || contractStatus === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'expiring': return 'bg-yellow-500';
      case 'expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts Management</h1>
          <p className="text-muted-foreground">Manage employee contracts and renewals</p>
        </div>
        <Button onClick={() => {
          setContractMode('create');
          setContractDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Contract
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter(c => getContractStatus(c) === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter(c => {
                const endDate = new Date(c.endDate);
                const thirtyDaysFromNow = new Date();
                thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                return getContractStatus(c) === 'active' && endDate <= thirtyDaysFromNow;
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter(c => getContractStatus(c) === 'expired').length}
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
                <SelectValue placeholder="Contract Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contracts List ({filteredContracts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContracts.map(contract => {
              const profile = profiles.find(p => p.contractId === contract.id);
              const dept = departments.find(d => d.id === profile?.departmentId);
              const pos = positions.find(p => p.id === profile?.positionId);
              const contractStatus = getContractStatus(contract);
              
              return (
                <div key={contract.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
                    <p className="text-sm text-muted-foreground">{pos?.title} • {dept?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(contract.startDate).toLocaleDateString()} - {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(contractStatus)}>{contractStatus}</Badge>
                    <Badge variant="outline" className="capitalize">{contract.type.toLowerCase().replace('_', ' ')}</Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedContract(contract);
                        setViewDialogOpen(true);
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedContractId(contract.id);
                        setContractMode('renew');
                        setContractDialogOpen(true);
                      }}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ContractDialog 
        open={contractDialogOpen} 
        onOpenChange={setContractDialogOpen} 
        mode={contractMode}
        contractId={selectedContractId}
      />

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employee</Label>
                  <p className="text-sm">{profiles.find(p => p.id === selectedContract.employeeId)?.firstName} {profiles.find(p => p.id === selectedContract.employeeId)?.lastName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Contract Type</Label>
                  <p className="text-sm capitalize">{selectedContract.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <p className="text-sm">{new Date(selectedContract.startDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <p className="text-sm">{selectedContract.endDate ? new Date(selectedContract.endDate).toLocaleDateString() : 'Ongoing'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Badge className={getStatusBadge(getContractStatus(selectedContract))}>{getContractStatus(selectedContract)}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
