import { toast } from '@/hooks/use-toast';

export type NotificationType = 
  | 'leave_approved'
  | 'leave_rejected'
  | 'shift_assigned'
  | 'mission_assigned'
  | 'contract_expiring'
  | 'reimbursement_status'
  | 'attendance_correction_approved'
  | 'payroll_processed'
  | 'profile_updated'
  | 'department_change'
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'event';

interface NotificationData {
  id: string;
  employeeId: string;
  employeeName: string;
  type: NotificationType;
  title: string;
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
  readStatus: boolean;
  timestamp: string;
  eventDateTime?: string;
  eventLocation?: string;
}

// Global notification store (simulated - in production this would be in a database)
const notificationStore: NotificationData[] = [];

// Helper to generate unique IDs
const generateId = () => `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const sendNotification = (data: Omit<NotificationData, 'id' | 'readStatus' | 'timestamp'>): NotificationData => {
  const notification: NotificationData = {
    ...data,
    id: generateId(),
    urgency: data.urgency || 'medium',
    readStatus: false,
    timestamp: new Date().toISOString()
  };

  // Store notification
  notificationStore.push(notification);

  // Show toast to user
  toast({
    title: notification.title,
    description: notification.message,
  });

  console.log('Notification sent:', notification);
  return notification;
};

export const sendLeaveApprovalNotification = (
  employeeId: string,
  employeeName: string,
  leaveType: string,
  startDate: string,
  endDate: string
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'leave_approved',
    title: 'Leave Request Approved',
    message: `Your ${leaveType} leave from ${startDate} to ${endDate} has been approved.`,
    urgency: 'medium',
    metadata: { leaveType, startDate, endDate }
  });
};

export const sendLeaveRejectionNotification = (
  employeeId: string,
  employeeName: string,
  leaveType: string,
  reason: string
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'leave_rejected',
    title: 'Leave Request Rejected',
    message: `Your ${leaveType} leave request was rejected. Reason: ${reason}`,
    urgency: 'high',
    metadata: { leaveType, reason }
  });
};

export const sendShiftAssignmentNotification = (
  employeeId: string,
  employeeName: string,
  shiftName: string,
  startDate: string
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'shift_assigned',
    title: 'New Shift Assignment',
    message: `You have been assigned to ${shiftName} starting ${startDate}.`,
    urgency: 'medium',
    metadata: { shiftName, startDate }
  });
};

export const sendMissionAssignmentNotification = (
  employeeId: string,
  employeeName: string,
  destination: string,
  startDate: string,
  endDate: string
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'mission_assigned',
    title: 'Mission Assignment',
    message: `You have been assigned a mission to ${destination} from ${startDate} to ${endDate}.`,
    urgency: 'high',
    metadata: { destination, startDate, endDate }
  });
};

export const sendContractExpiryNotification = (
  employeeId: string,
  employeeName: string,
  expiryDate: string,
  daysRemaining: number
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'contract_expiring',
    title: 'Contract Expiring Soon',
    message: `Your contract expires on ${expiryDate} (${daysRemaining} days remaining). Please contact HR.`,
    urgency: 'urgent',
    metadata: { expiryDate, daysRemaining }
  });
};

export const sendReimbursementStatusNotification = (
  employeeId: string,
  employeeName: string,
  status: 'approved' | 'rejected',
  amount: number,
  reason?: string
) => {
  const message = status === 'approved'
    ? `Your reimbursement claim of ${amount} has been approved.`
    : `Your reimbursement claim of ${amount} was rejected. Reason: ${reason}`;

  return sendNotification({
    employeeId,
    employeeName,
    type: 'reimbursement_status',
    title: `Reimbursement ${status === 'approved' ? 'Approved' : 'Rejected'}`,
    message,
    urgency: status === 'approved' ? 'medium' : 'high',
    metadata: { status, amount, reason }
  });
};

export const sendAttendanceCorrectionNotification = (
  employeeId: string,
  employeeName: string,
  date: string,
  status: 'approved' | 'rejected'
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'attendance_correction_approved',
    title: `Attendance Correction ${status === 'approved' ? 'Approved' : 'Rejected'}`,
    message: `Your attendance correction request for ${date} has been ${status}.`,
    urgency: 'medium',
    metadata: { date, status }
  });
};

export const sendPayrollProcessedNotification = (
  employeeId: string,
  employeeName: string,
  period: string,
  amount: number
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'payroll_processed',
    title: 'Payroll Processed',
    message: `Your payroll for ${period} has been processed. Amount: ${amount}`,
    urgency: 'medium',
    metadata: { period, amount }
  });
};

export const sendProfileUpdateNotification = (
  employeeId: string,
  employeeName: string,
  updatedBy: string,
  fields: string[]
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'profile_updated',
    title: 'Profile Updated',
    message: `Your profile was updated by ${updatedBy}. Updated fields: ${fields.join(', ')}`,
    urgency: 'low',
    metadata: { updatedBy, fields }
  });
};

export const sendDepartmentChangeNotification = (
  employeeId: string,
  employeeName: string,
  oldDepartment: string,
  newDepartment: string,
  newManager: string
) => {
  return sendNotification({
    employeeId,
    employeeName,
    type: 'department_change',
    title: 'Department Transfer',
    message: `You have been transferred from ${oldDepartment} to ${newDepartment}. Your new manager is ${newManager}.`,
    urgency: 'high',
    metadata: { oldDepartment, newDepartment, newManager }
  });
};

// Get notifications for an employee
export const getEmployeeNotifications = (employeeId: string): NotificationData[] => {
  return notificationStore.filter(n => n.employeeId === employeeId);
};

// Get all notifications (for admin/demo purposes)
export const getAllNotifications = (): NotificationData[] => {
  return [...notificationStore];
};

// Mark notification as read
export const markNotificationAsRead = (notificationId: string): boolean => {
  const notification = notificationStore.find(n => n.id === notificationId);
  if (notification) {
    notification.readStatus = true;
    console.log('Notification marked as read:', notificationId);
    return true;
  }
  return false;
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = (employeeId: string): void => {
  notificationStore
    .filter(n => n.employeeId === employeeId)
    .forEach(n => n.readStatus = true);
  console.log('All notifications marked as read for employee:', employeeId);
};
