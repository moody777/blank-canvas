// Data adapters to provide backwards compatibility with UI components
import type { AttendanceRecord, Employee, Leave, ShiftSchedule, ShiftName } from '@/types';
import { shiftNames } from '@/data/mockData';

// Helper to compute date from attendance entry time
export function getAttendanceDate(record: AttendanceRecord): string {
  if (record.entryTime) {
    return record.entryTime.split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

// Helper to compute attendance status based on times and exceptions
export function getAttendanceStatus(record: AttendanceRecord): 'present' | 'absent' | 'late' | 'half-day' {
  if (!record.entryTime) return 'absent';
  if (record.exceptionId === '1') return 'late'; // Late arrival exception
  if (record.duration && record.duration < 6) return 'half-day';
  return 'present';
}

// Helper to get employee full name
export function getEmployeeName(employee: Employee): string {
  return `${employee.firstName} ${employee.lastName}`;
}

// Helper to get shift name from ShiftSchedule
export function getShiftName(shift: ShiftSchedule): string {
  const name = shiftNames.find(n => n.id === shift.nameId);
  return name?.name || 'Unknown Shift';
}

// Helper to get employee employment status
export function getEmployeeStatus(employee: Employee): 'active' | 'inactive' | 'terminated' {
  if (employee.employmentStatus === 'ACTIVE') return 'active';
  if (employee.employmentStatus === 'TERMINATED') return 'terminated';
  return 'inactive';
}

// Helper to get contract type from employee
export function getEmployeeContractType(employee: Employee): 'full-time' | 'part-time' | 'contract' | 'temporary' {
  // This would need to be looked up from contracts, for now return a default
  return 'full-time';
}

// Helper to normalize status values for comparison
export function normalizeStatus<T extends string>(status: T): string {
  return status.toUpperCase();
}

// Helper to check if status matches (case-insensitive)
export function statusMatches(status1: string, status2: string): boolean {
  return status1.toUpperCase() === status2.toUpperCase();
}

// Helper to get leave type name
export function getLeaveTypeName(leave: Leave): string {
  return leave.leaveType;
}

// Helper to get default days allowed for leave type
export function getLeaveTypeDaysAllowed(leave: Leave): number {
  const defaults: Record<string, number> = {
    'VACATION': 20,
    'SICK': 10,
    'PROBATION': 5,
    'HOLIDAY': 0
  };
  return defaults[leave.leaveType] || 0;
}

// Helper to get contract status (Contract doesn't have status field in new schema)
export function getContractStatus(contract: any): 'active' | 'expired' | 'terminated' {
  const now = new Date();
  const endDate = contract.endDate ? new Date(contract.endDate) : null;
  
  if (endDate && endDate < now) return 'expired';
  return 'active';
}

// Helper for Notification read status (Notification type doesn't have read field)
export function isNotificationRead(notification: any): boolean {
  // Assuming notifications don't track read status in new schema
  return false;
}

// Helper to normalize TimeRequest date field
export function getTimeRequestDate(request: any): string {
  return request.requestDate || new Date().toISOString().split('T')[0];
}
