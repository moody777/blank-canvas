// Data Service - Provides data access layer using client.ts API clients
// This service manages local state and syncs with the backend

import { employeeClient, hrClient, managerClient, payrollClient, adminClient } from './client';
import type { 
  Employee, Department, Position, Attendance, LeaveRequest, 
  Mission, Payroll, ShiftSchedule, Contract, LeaveEntitlement, Reimbursement,
  ShiftType, ShiftName
} from '@/types/index';

// LeaveType interface (not exported from types)
export interface LeaveType {
  leave_id?: number;
  leave_type?: string;
  days_allowed?: number;
  description?: string;
}

// ============= Local State Management =============
let employeesCache: Employee[] = [];
let departmentsCache: Department[] = [];
let positionsCache: Position[] = [];
let attendanceCache: Attendance[] = [];
let leaveRequestsCache: LeaveRequest[] = [];
let leaveTypesCache: LeaveType[] = [];
let missionsCache: Mission[] = [];
let payrollCache: Payroll[] = [];
let shiftSchedulesCache: ShiftSchedule[] = [];
let contractsCache: Contract[] = [];
let leaveEntitlementsCache: LeaveEntitlement[] = [];
let reimbursementsCache: Reimbursement[] = [];
let shiftTypesCache: ShiftType[] = [];
let shiftNamesCache: ShiftName[] = [];

// ============= Data Fetching Functions =============
export function getEmployees(): Employee[] { return employeesCache; }
export function getDepartments(): Department[] { return departmentsCache; }
export function getPositions(): Position[] { return positionsCache; }
export function getAttendanceRecords(): Attendance[] { return attendanceCache; }
export function getLeaveRequests(): LeaveRequest[] { return leaveRequestsCache; }
export function getLeaveTypes(): LeaveType[] { return leaveTypesCache; }
export function getMissions(): Mission[] { return missionsCache; }
export function getPayrollRecords(): Payroll[] { return payrollCache; }
export function getShiftSchedules(): ShiftSchedule[] { return shiftSchedulesCache; }
export function getContracts(): Contract[] { return contractsCache; }
export function getLeaveEntitlements(): LeaveEntitlement[] { return leaveEntitlementsCache; }
export function getReimbursements(): Reimbursement[] { return reimbursementsCache; }
export function getShiftTypes(): ShiftType[] { return shiftTypesCache; }
export function getShiftNames(): ShiftName[] { return shiftNamesCache; }

// ============= Utility Functions =============
export function getShiftNameById(shiftId: number): string {
  const schedule = shiftSchedulesCache.find(s => s.shift_id === shiftId);
  return schedule?.nameNavigation?.name || `Shift ${shiftId}`;
}

export function getEmployeeById(employeeId: number): Employee | undefined {
  return employeesCache.find(e => e.employee_id === employeeId);
}

export function getDepartmentById(departmentId: number): Department | undefined {
  return departmentsCache.find(d => d.department_id === departmentId);
}

// ============= Trend Data for Charts =============
export function getNewsEvents() {
  return [
    { id: 1, title: 'Company Town Hall', description: 'Quarterly all-hands meeting', date: new Date().toISOString() },
    { id: 2, title: 'Benefits Enrollment', description: 'Open enrollment period begins', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 3, title: 'Holiday Schedule', description: 'Office closure dates announced', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() },
  ];
}

export function getPersonalAttendanceTrends() {
  return [
    { week: 'Week 1', present: 5, late: 0, absent: 0 },
    { week: 'Week 2', present: 4, late: 1, absent: 0 },
    { week: 'Week 3', present: 5, late: 0, absent: 0 },
    { week: 'Week 4', present: 4, late: 0, absent: 1 },
  ];
}

export function getTeamPerformanceTrends() {
  return [
    { date: 'Mon', attendance: 95, productivity: 88, satisfaction: 82 },
    { date: 'Tue', attendance: 92, productivity: 90, satisfaction: 85 },
    { date: 'Wed', attendance: 98, productivity: 92, satisfaction: 88 },
    { date: 'Thu', attendance: 94, productivity: 87, satisfaction: 84 },
    { date: 'Fri', attendance: 88, productivity: 85, satisfaction: 80 },
  ];
}

export function getPayrollTrends() {
  return [
    { month: 'Jul', net: 125000, base: 110000, adjustments: 20000, taxes: 5000 },
    { month: 'Aug', net: 128000, base: 112000, adjustments: 21000, taxes: 5000 },
    { month: 'Sep', net: 130000, base: 115000, adjustments: 20000, taxes: 5000 },
    { month: 'Oct', net: 132000, base: 118000, adjustments: 19000, taxes: 5000 },
    { month: 'Nov', net: 135000, base: 120000, adjustments: 20000, taxes: 5000 },
    { month: 'Dec', net: 140000, base: 125000, adjustments: 20000, taxes: 5000 },
  ];
}

export function getSystemActivityTrends() {
  return [
    { month: 'Jul', users: 45, departments: 5, activeShifts: 12 },
    { month: 'Aug', users: 48, departments: 5, activeShifts: 14 },
    { month: 'Sep', users: 52, departments: 6, activeShifts: 15 },
    { month: 'Oct', users: 55, departments: 6, activeShifts: 16 },
    { month: 'Nov', users: 58, departments: 7, activeShifts: 18 },
    { month: 'Dec', users: 60, departments: 7, activeShifts: 20 },
  ];
}

// ============= API Action Wrappers =============
export async function submitLeaveRequest(data: {
  employeeId: number;
  leaveTypeId: number;
  startDate: Date;
  endDate: Date;
  reason: string;
}) {
  return employeeClient.submitLeaveRequest(data.employeeId, data.leaveTypeId, data.startDate, data.endDate, data.reason);
}

export async function clockIn(employeeId: number, shiftId?: number) {
  const timeStr = new Date().toTimeString().slice(0, 5);
  return employeeClient.recordAttendance(employeeId, shiftId, timeStr, undefined);
}

export async function clockOut(employeeId: number) {
  const timeStr = new Date().toTimeString().slice(0, 5);
  return employeeClient.recordAttendance(employeeId, undefined, undefined, timeStr);
}

export async function updateEmployee(employeeId: number, data: Partial<Employee>) {
  return hrClient.updateEmployeeProfile(employeeId, data.phone, data.address);
}

export async function createContract(data: { type: string; start_date: Date; end_date?: Date }) {
  return hrClient.createContract(data.type, data.start_date, data.end_date);
}

export async function renewContract(contractId: number, newEndDate: Date) {
  return hrClient.renewContract(contractId, newEndDate);
}

export async function createEmployee(data: Partial<Employee>) {
  return hrClient.createEmployeeRecord(
    data.first_name,
    data.last_name,
    data.email,
    data.department_id,
    data.hire_date
  );
}

export async function submitReimbursement(employeeId: number, expenseType: string, amount: number) {
  return employeeClient.submitReimbursement(employeeId, expenseType, amount);
}

export async function submitCorrectionRequest(employeeId: number, date: Date, correctionType: string, reason: string) {
  return employeeClient.submitCorrectionRequest(employeeId, date, correctionType, reason);
}

export async function processPayroll(period: string) {
  console.log('Processing payroll for period:', period);
}

export async function generateReport(reportName: string) {
  console.log('Generating report:', reportName);
}

export async function initializeData() {
  console.log('Data service initialized');
}

export { employeeClient, hrClient, managerClient, payrollClient, adminClient };
