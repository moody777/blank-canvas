import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getAttendanceDevices, getAttendanceRecords, getHolidays } from '@/lib/mockFunctions';
import { RefreshCw, MapPin, Smartphone, Settings, WifiOff, Wifi } from 'lucide-react';
import { mockSyncOfflineAttendance, mockApplyHolidayOverrides } from '@/lib/mockFunctions';
import AttendanceRulesDialog from '@/components/systemadmin/AttendanceRulesDialog';
import { toast } from '@/hooks/use-toast';

export default function AttendanceInfrastructure() {
  const [rulesDialogOpen, setRulesDialogOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<string[]>([]);
  
  const attendanceDevices = getAttendanceDevices();
  const holidays = getHolidays();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Connection Restored',
        description: 'You are back online. Syncing pending data...',
      });
      // Auto-sync when coming back online
      if (pendingSync.length > 0) {
        pendingSync.forEach(deviceId => {
          mockSyncOfflineAttendance(deviceId);
        });
        setPendingSync([]);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'Connection Lost',
        description: 'You are offline. Attendance will sync when connection is restored.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSync]);

  const handleManualSync = (deviceId: string) => {
    if (!isOnline) {
      setPendingSync(prev => [...prev, deviceId]);
      toast({
        title: 'Offline Mode',
        description: 'Sync queued. Will execute when connection is restored.',
      });
    } else {
      mockSyncOfflineAttendance(deviceId);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Infrastructure</h1>
          <p className="text-muted-foreground">Manage devices, sources, and data integrity</p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge variant={isOnline ? 'default' : 'destructive'} className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Button onClick={() => setRulesDialogOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Configure Rules
          </Button>
        </div>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Devices & Sources</TabsTrigger>
          <TabsTrigger value="sync">Offline Sync</TabsTrigger>
          <TabsTrigger value="holidays">Holiday Overrides</TabsTrigger>
          <TabsTrigger value="audit">Edit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceDevices.map(device => (
                    <TableRow key={device.id}>
                      <TableCell className="font-mono">{device.id}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {device.deviceType === 'GPS' && <MapPin className="h-4 w-4" />}
                        {device.deviceType === 'MOBILE' && <Smartphone className="h-4 w-4" />}
                        <span className="capitalize">{device.deviceType?.toLowerCase()}</span>
                      </TableCell>
                      <TableCell>{device.terminalId || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>Recently Synced</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Offline Attendance Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceDevices.map(device => (
                  <div key={device.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <h4 className="font-medium">{device.terminalId || 'Device ' + device.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        {device.id} • Last sync: Recently
                        {pendingSync.includes(device.id) && (
                          <Badge variant="outline" className="ml-2">Pending</Badge>
                        )}
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleManualSync(device.id)}
                      disabled={!isOnline && !pendingSync.includes(device.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays">
          <Card>
            <CardHeader>
              <CardTitle>Holiday Overrides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holidays.map(holiday => (
                  <div key={holiday.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <h4 className="font-medium">{holiday.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(holiday.date).toLocaleDateString()} • {holiday.category}
                      </p>
                    </div>
                    <Button onClick={() => mockApplyHolidayOverrides(holiday.id)}>
                      Apply Overrides
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Edit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Edited By</TableHead>
                    <TableHead>Field Changed</TableHead>
                    <TableHead>Old Value</TableHead>
                    <TableHead>New Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-01-16</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Sarah Manager</TableCell>
                    <TableCell>Exit Time</TableCell>
                    <TableCell>--:--</TableCell>
                    <TableCell>18:00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AttendanceRulesDialog open={rulesDialogOpen} onOpenChange={setRulesDialogOpen} />
    </div>
  );
}
