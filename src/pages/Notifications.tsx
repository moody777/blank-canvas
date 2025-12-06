import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getEmployeeNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/utils/notificationService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle, Calendar as CalendarIcon, MapPin, Clock, List } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, isSameDay } from 'date-fns';

export default function Notifications() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventView, setEventView] = useState<'list' | 'calendar'>('list');

  // Load notifications from the service
  useEffect(() => {
    if (user?.id) {
      const userNotifications = getEmployeeNotifications(user.id);
      setNotifs(userNotifications);
    }
  }, [user]);

  const regularNotifs = notifs.filter((n: any) => n.type !== 'event');
  const eventNotifs = notifs.filter((n: any) => n.type === 'event');
  
  const unreadCount = regularNotifs.filter((n: any) => !n.readStatus).length;
  const unreadEventCount = eventNotifs.filter((n: any) => !n.readStatus).length;

  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifs(notifs.map((n: any) => n.id === id ? { ...n, readStatus: true } : n));
  };

  const markAllAsRead = () => {
    if (user?.id) {
      markAllNotificationsAsRead(user.id);
      setNotifs(notifs.map((n: any) => ({ ...n, readStatus: true })));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'event': return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      case 'leave_approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'leave_rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'shift_assigned': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'mission_assigned': return <MapPin className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const renderNotifications = (filterRead: boolean | null) => {
    const filtered = filterRead === null ? regularNotifs : regularNotifs.filter((n: any) => n.readStatus === filterRead);
    
    return (
      <div className="space-y-3">
        {filtered.map((notif: any) => (
          <Card key={notif.id} className={notif.readStatus ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {getIcon(notif.type)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold">{notif.title}</h4>
                      <p className="text-sm text-muted-foreground">{notif.message}</p>
                    </div>
                    <Badge className={getUrgencyColor(notif.urgency)} variant="secondary">
                      {notif.urgency}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                    {!notif.readStatus && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notif.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No notifications</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderEventsList = () => {
    const sortedEvents = [...eventNotifs].sort((a, b) => {
      const dateA = a.eventDateTime ? new Date(a.eventDateTime).getTime() : 0;
      const dateB = b.eventDateTime ? new Date(b.eventDateTime).getTime() : 0;
      return dateA - dateB;
    });

    return (
      <div className="space-y-3">
        {sortedEvents.map((event: any) => (
          <Card key={event.id} className={event.readStatus ? 'opacity-60' : 'border-l-4 border-l-purple-500'}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {getIcon(event.type)}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-lg">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.message}</p>
                    </div>
                    <Badge className={getUrgencyColor(event.urgency)} variant="secondary">
                      {event.urgency}
                    </Badge>
                  </div>
...
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                      Added {new Date(event.timestamp).toLocaleDateString()}
                    </span>
                    {!event.readStatus && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(event.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {sortedEvents.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No events scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCalendarView = () => {
    // Get events for selected date
    const eventsOnDate = selectedDate 
      ? eventNotifs.filter(e => e.eventDateTime && isSameDay(parseISO(e.eventDateTime), selectedDate))
      : [];

    // Get all dates with events for highlighting
    const eventDates = eventNotifs
      .filter(e => e.eventDateTime)
      .map(e => parseISO(e.eventDateTime!));

    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasEvent: eventDates
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate 
                ? `Events on ${format(selectedDate, 'PPP')}`
                : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsOnDate.length > 0 ? (
              <div className="space-y-3">
                {eventsOnDate.map((event: any) => (
                <div key={event.id}>
                  <Card key={event.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge className={`${getUrgencyColor(event.urgency)} text-xs`} variant="secondary">
                            {event.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.message}</p>
...
                        {!event.readStatus && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => markAsRead(event.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mb-2" />
                <p className="text-sm">No events on this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''} 
            {unreadEventCount > 0 && ` and ${unreadEventCount} unread event${unreadEventCount !== 1 ? 's' : ''}`}
          </p>
        </div>
        {(unreadCount > 0 || unreadEventCount > 0) && (
          <Button onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({regularNotifs.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({regularNotifs.length - unreadCount})</TabsTrigger>
          <TabsTrigger value="events">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Events ({eventNotifs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderNotifications(null)}
        </TabsContent>

        <TabsContent value="unread">
          {renderNotifications(false)}
        </TabsContent>

        <TabsContent value="read">
          {renderNotifications(true)}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={eventView === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setEventView('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
            <Button
              variant={eventView === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setEventView('calendar')}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
          
          {eventView === 'list' ? renderEventsList() : renderCalendarView()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
