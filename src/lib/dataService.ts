// Data Service - Provides data matching the API schema types (snake_case)
// This replaces mockData.ts and mockFunctions.ts with proper API-compatible types

import type {
  Employee, Department, Position, LeaveRequest, Leave, LeaveEntitlement,
  Mission, MissionTeam, MissionTask, Payroll, ShiftSchedule, ShiftType, ShiftName,
  Attendance, AttendanceCorrectionRequest, Contract, FullTimeContract,
  Reimbursement, ShiftAssignment, PayGrade, Device, ManagerNote,
  TimeRequest, HRDocument, TaxRule, Role, Permission, Notification
} from '@/types/index';
import { toast } from 'sonner';

// ============ Static Data ============

export const employees: Employee[] = [
  {
    employee_id: 1,
    first_name: 'Sarah',
    last_name: 'Johnson',
    full_name: 'Sarah Johnson',
    national_id: 'SSN-123-45-6789',
    date_of_birth: new Date('1978-05-15'),
    country_of_birth: 'USA',
    phone: '+1-555-0101',
    email: 'sarah.johnson@company.com',
    address: '123 Executive St, NYC',
    emergency_contact_name: 'Michael Johnson',
    emergency_contact_phone: '+1-555-0102',
    relationship: 'Spouse',
    biography: 'Visionary leader with 20 years experience',
    profile_image: '/placeholder.svg',
    employment_progress: 'COMPLETE',
    account_status: 'ACTIVE',
    employment_status: 'ACTIVE',
    hire_date: new Date('2020-01-15'),
    is_active: true,
    profile_completion: 100,
    department_id: 1,
    position_id: 1,
    contract_id: 1,
    tax_form_id: 1,
    salary_type_id: 1,
    pay_grade: 5
  },
  {
    employee_id: 2,
    first_name: 'David',
    last_name: 'Chen',
    full_name: 'David Chen',
    national_id: 'SSN-234-56-7890',
    date_of_birth: new Date('1982-08-22'),
    country_of_birth: 'USA',
    phone: '+1-555-0201',
    email: 'david.chen@company.com',
    address: '456 Tech Ave, San Francisco',
    emergency_contact_name: 'Lisa Chen',
    emergency_contact_phone: '+1-555-0202',
    relationship: 'Spouse',
    biography: 'Tech innovator and strategic thinker',
    profile_image: '/placeholder.svg',
    employment_progress: 'COMPLETE',
    account_status: 'ACTIVE',
    employment_status: 'ACTIVE',
    hire_date: new Date('2019-03-20'),
    is_active: true,
    profile_completion: 100,
    department_id: 2,
    position_id: 2,
    manager_id: 1,
    contract_id: 2,
    tax_form_id: 1,
    salary_type_id: 2,
    pay_grade: 5
  },
  {
    employee_id: 3,
    first_name: 'Maria',
    last_name: 'Rodriguez',
    full_name: 'Maria Rodriguez',
    national_id: 'SSN-345-67-8901',
    date_of_birth: new Date('1985-11-30'),
    country_of_birth: 'Mexico',
    phone: '+1-555-0301',
    email: 'maria.rodriguez@company.com',
    address: '789 HR Blvd, Austin',
    emergency_contact_name: 'Carlos Rodriguez',
    emergency_contact_phone: '+1-555-0302',
    relationship: 'Spouse',
    biography: 'People-focused HR professional',
    profile_image: '/placeholder.svg',
    employment_progress: 'COMPLETE',
    account_status: 'ACTIVE',
    employment_status: 'ACTIVE',
    hire_date: new Date('2021-06-01'),
    is_active: true,
    profile_completion: 100,
    department_id: 3,
    position_id: 3,
    manager_id: 1,
    contract_id: 3,
    tax_form_id: 2,
    salary_type_id: 3,
    pay_grade: 4
  },
];

export const departments: Department[] = [
  { department_id: 1, department_name: 'Executive', purpose: 'Company Leadership', department_head_id: 1 },
  { department_id: 2, department_name: 'Technology', purpose: 'IT and Development', department_head_id: 2 },
  { department_id: 3, department_name: 'Human Resources', purpose: 'Employee Management', department_head_id: 3 },
  { department_id: 4, department_name: 'Finance', purpose: 'Financial Operations', department_head_id: 3 },
  { department_id: 5, department_name: 'Marketing', purpose: 'Brand and Marketing', department_head_id: 1 },
  { department_id: 6, department_name: 'Sales', purpose: 'Revenue Generation', department_head_id: 1 },
];

export const positions: Position[] = [
  { position_id: 1, position_title: 'CEO', responsibilities: 'Executive Leadership', status: 'ACTIVE' },
  { position_id: 2, position_title: 'CTO', responsibilities: 'Technology Strategy', status: 'ACTIVE' },
  { position_id: 3, position_title: 'HR Director', responsibilities: 'Human Resources Management', status: 'ACTIVE' },
  { position_id: 4, position_title: 'IT Manager', responsibilities: 'IT Operations', status: 'ACTIVE' },
  { position_id: 5, position_title: 'Software Engineer', responsibilities: 'Software Development', status: 'ACTIVE' },
  { position_id: 6, position_title: 'Senior Developer', responsibilities: 'Lead Development Projects', status: 'ACTIVE' },
  { position_id: 7, position_title: 'HR Specialist', responsibilities: 'Recruitment and Onboarding', status: 'ACTIVE' },
  { position_id: 8, position_title: 'Payroll Manager', responsibilities: 'Payroll Processing', status: 'ACTIVE' },
];

export const leaveTypes: Leave[] = [
  { leave_id: 1, leave_type: 'VACATION', leave_description: 'Annual vacation leave for rest and recreation' },
  { leave_id: 2, leave_type: 'SICK', leave_description: 'Medical leave for illness or injury' },
  { leave_id: 3, leave_type: 'PROBATION', leave_description: 'Leave during probation period' },
  { leave_id: 4, leave_type: 'HOLIDAY', leave_description: 'National and company holidays' },
];

export const leaveRequests: LeaveRequest[] = [
  { request_id: 1, employee_id: 1, leave_id: 1, justification: 'Family vacation to Hawaii', duration: 7, start_date: new Date('2024-08-15'), end_date: new Date('2024-08-21'), submitted_at: new Date('2024-08-01T10:30:00'), approval_timing: new Date('2024-08-15T10:30:00'), approved_by: 2, status: 'APPROVED' },
  { request_id: 2, employee_id: 2, leave_id: 1, justification: 'Wedding anniversary trip', duration: 5, start_date: new Date('2024-09-20'), end_date: new Date('2024-09-24'), submitted_at: new Date('2024-09-05T14:15:00'), approval_timing: new Date('2024-09-20T14:15:00'), approved_by: 1, status: 'APPROVED' },
  { request_id: 3, employee_id: 3, leave_id: 2, justification: 'Flu and fever', duration: 3, start_date: new Date('2024-10-05'), end_date: new Date('2024-10-07'), submitted_at: new Date('2024-10-05T08:00:00'), approval_timing: new Date('2024-10-05T08:00:00'), approved_by: 1, status: 'APPROVED' },
];

export const leaveEntitlements: LeaveEntitlement[] = [
  { employee_id: 1, leave_type_id: 1, entitlement: 25, remaining: 20 },
  { employee_id: 2, leave_type_id: 1, entitlement: 25, remaining: 22 },
  { employee_id: 3, leave_type_id: 1, entitlement: 22, remaining: 18 },
  { employee_id: 1, leave_type_id: 2, entitlement: 10, remaining: 10 },
  { employee_id: 2, leave_type_id: 2, entitlement: 10, remaining: 10 },
  { employee_id: 3, leave_type_id: 2, entitlement: 10, remaining: 7 },
];

export const missions: Mission[] = [
  { mission_id: 1, destination: 'London Office', start_date: new Date('2024-10-01'), end_date: new Date('2024-10-15'), status: 'COMPLETED', employee_id: 2, manager_id: 1, purpose: 'Strategic Alignment', description: 'Annual strategic planning with UK branch.', budget: 5000, currency: 'GBP', accomodation: 'The Savoy', transportation: 'Uber Business' },
  { mission_id: 2, destination: 'Singapore Client Site', start_date: new Date('2024-11-10'), end_date: new Date('2024-11-20'), status: 'ASSIGNED', employee_id: 2, manager_id: 1, purpose: 'System Deployment', description: 'On-site deployment of the new HR module.', budget: 8000, currency: 'USD', accomodation: 'Marina Bay Sands', transportation: 'Local Taxi' },
];

export const shiftTypes: ShiftType[] = [
  { shift_type_id: 1, name: 'DAY_SHIFT', description: 'Standard daytime working hours' },
  { shift_type_id: 2, name: 'NIGHT_SHIFT', description: 'Overnight shift for 24/7 operations' },
  { shift_type_id: 3, name: 'FLEXIBLE', description: 'Flexible hours with core time' },
];

export const shiftNames: ShiftName[] = [
  { shift_name_id: 1, name: 'Morning Shift', shift_type_id: 1, description: '8 AM to 5 PM standard shift' },
  { shift_name_id: 2, name: 'Evening Shift', shift_type_id: 1, description: '1 PM to 10 PM shift' },
  { shift_name_id: 3, name: 'Night Operations', shift_type_id: 2, description: '10 PM to 6 AM overnight shift' },
];

export const shiftSchedules: ShiftSchedule[] = [
  { shift_id: 1, name: 1, type: 1, start_time: '08:00:00', end_time: '17:00:00', break_duration: 60, shift_date: new Date('2024-11-18'), status: 'ACTIVE' },
  { shift_id: 2, name: 1, type: 1, start_time: '08:00:00', end_time: '17:00:00', break_duration: 60, shift_date: new Date('2024-11-19'), status: 'ACTIVE' },
  { shift_id: 3, name: 2, type: 1, start_time: '13:00:00', end_time: '22:00:00', break_duration: 60, shift_date: new Date('2024-11-18'), status: 'ACTIVE' },
];

export const attendanceRecords: Attendance[] = [
  { attendance_id: 1, employee_id: 1, shift_id: 1, entry_time: new Date('2024-11-18T07:55:00'), exit_time: new Date('2024-11-18T17:10:00'), duration: 9, login_method: 'BIOMETRIC', logout_method: 'BIOMETRIC' },
  { attendance_id: 2, employee_id: 2, shift_id: 1, entry_time: new Date('2024-11-18T08:00:00'), exit_time: new Date('2024-11-18T17:05:00'), duration: 9, login_method: 'BIOMETRIC', logout_method: 'BIOMETRIC' },
  { attendance_id: 3, employee_id: 3, shift_id: 1, entry_time: new Date('2024-11-18T08:20:00'), exit_time: new Date('2024-11-18T17:00:00'), duration: 8.7, login_method: 'MANUAL', logout_method: 'BIOMETRIC', exception_id: 1 },
];

export const payrollRecords: Payroll[] = [
  { payroll_id: 1, employee_id: 1, taxes: 35000, period_start: new Date('2024-10-01'), period_end: new Date('2024-10-31'), base_amount: 180000, adjustments: 5000, contributions: 9000, actual_pay: 185000, net_salary: 141000, payment_date: new Date('2024-11-05'), status: 'PAID' },
  { payroll_id: 2, employee_id: 2, taxes: 32000, period_start: new Date('2024-10-01'), period_end: new Date('2024-10-31'), base_amount: 165000, adjustments: 3000, contributions: 8250, actual_pay: 168000, net_salary: 127750, payment_date: new Date('2024-11-05'), status: 'PAID' },
  { payroll_id: 3, employee_id: 3, taxes: 22000, period_start: new Date('2024-10-01'), period_end: new Date('2024-10-31'), base_amount: 110000, adjustments: 2000, contributions: 5500, actual_pay: 112000, net_salary: 84500, payment_date: new Date('2024-11-05'), status: 'PAID' },
];

export const contracts: Contract[] = [
  { contract_id: 1, type: 'FULL_TIME', start_date: new Date('2020-01-15'), current_state: 'ACTIVE' },
  { contract_id: 2, type: 'FULL_TIME', start_date: new Date('2019-03-20'), current_state: 'ACTIVE' },
  { contract_id: 3, type: 'FULL_TIME', start_date: new Date('2021-06-01'), current_state: 'ACTIVE' },
];

export const reimbursements: Reimbursement[] = [
  { reimbursement_id: 1, type: 'TRAVEL', claim_type: 'Flight and Hotel', approval_date: new Date('2024-10-20'), current_status: 'APPROVED', employee_id: 2, approved_by: 1, amount: 2500, description: 'Flight to London', submitted_at: new Date('2024-10-15T10:00:00') },
  { reimbursement_id: 2, type: 'MEALS', claim_type: 'Client Dinner', approval_date: new Date('2024-11-01'), current_status: 'APPROVED', employee_id: 2, approved_by: 1, amount: 350, description: 'Dinner with Singapore Client', submitted_at: new Date('2024-10-28T14:30:00') },
  { reimbursement_id: 3, type: 'EQUIPMENT', claim_type: 'Laptop Accessories', approval_date: new Date('2024-10-25'), current_status: 'APPROVED', employee_id: 1, approved_by: 2, amount: 450, description: 'External monitor and keyboard', submitted_at: new Date('2024-10-20T09:15:00') },
];

export const shiftAssignments: ShiftAssignment[] = [
  { assignment_id: 1, employee_id: 1, shift_id: 1, start_date: new Date('2024-11-18'), end_date: new Date('2024-11-22'), status: 'ACTIVE' },
  { assignment_id: 2, employee_id: 2, shift_id: 1, start_date: new Date('2024-11-18'), end_date: new Date('2024-11-22'), status: 'ACTIVE' },
  { assignment_id: 3, employee_id: 3, shift_id: 2, start_date: new Date('2024-11-18'), end_date: new Date('2024-11-22'), status: 'ACTIVE' },
];

export const payGrades: PayGrade[] = [
  { pay_grade_id: 1, grade_name: 'Entry Level', min_salary: 30000, max_salary: 45000 },
  { pay_grade_id: 2, grade_name: 'Junior', min_salary: 45000, max_salary: 65000 },
  { pay_grade_id: 3, grade_name: 'Mid-Level', min_salary: 65000, max_salary: 90000 },
  { pay_grade_id: 4, grade_name: 'Senior', min_salary: 90000, max_salary: 120000 },
  { pay_grade_id: 5, grade_name: 'Executive', min_salary: 120000, max_salary: 200000 },
];

export const notifications: Notification[] = [
  { notification_id: 1, message_content: 'Your leave request has been approved', timestamp: new Date('2024-11-15T10:00:00'), urgency: 'NORMAL', read_status: false, notification_type: 'LEAVE_APPROVAL' },
  { notification_id: 2, message_content: 'Payroll processed for October 2024', timestamp: new Date('2024-11-05T08:00:00'), urgency: 'NORMAL', read_status: true, notification_type: 'PAYROLL' },
  { notification_id: 3, message_content: 'Attendance correction request pending', timestamp: new Date('2024-11-18T09:30:00'), urgency: 'HIGH', read_status: false, notification_type: 'ATTENDANCE' },
];

export const roles: Role[] = [
  { role_id: 1, role_name: 'employee', purpose: 'Regular employee access' },
  { role_id: 2, role_name: 'line_manager', purpose: 'Team management access' },
  { role_id: 3, role_name: 'hr_admin', purpose: 'HR administration access' },
  { role_id: 4, role_name: 'payroll_specialist', purpose: 'Payroll management access' },
  { role_id: 5, role_name: 'system_admin', purpose: 'Full system access' },
];

// News and Events
export const newsEvents = [
  { id: 1, title: 'Team Building Event', description: 'Annual team building activities', date: '2024-12-05', type: 'EVENT' },
  { id: 2, title: 'Christmas Party', description: 'End of year celebration', date: '2024-12-20', type: 'EVENT' },
  { id: 3, title: 'New Policy Update', description: 'Updated remote work policy', date: '2024-11-25', type: 'NEWS' },
];

// Chart/Trends data
export const attendanceTrends = [
  { month: 'Jun', present: 92, late: 5, absent: 3 },
  { month: 'Jul', present: 94, late: 4, absent: 2 },
  { month: 'Aug', present: 91, late: 6, absent: 3 },
  { month: 'Sep', present: 95, late: 3, absent: 2 },
  { month: 'Oct', present: 93, late: 4, absent: 3 },
  { month: 'Nov', present: 94, late: 4, absent: 2 },
];

export const payrollTrends = [
  { month: 'Jun', net: 350000, base: 320000, adjustments: 15000, taxes: 85000 },
  { month: 'Jul', net: 355000, base: 322000, adjustments: 16000, taxes: 86000 },
  { month: 'Aug', net: 360000, base: 325000, adjustments: 17000, taxes: 87000 },
  { month: 'Sep', net: 365000, base: 328000, adjustments: 18000, taxes: 88000 },
  { month: 'Oct', net: 370000, base: 330000, adjustments: 19000, taxes: 89000 },
  { month: 'Nov', net: 375000, base: 332000, adjustments: 20000, taxes: 90000 },
];

export const personalAttendanceTrends = [
  { week: 'Week 1', present: 5, late: 0, absent: 0 },
  { week: 'Week 2', present: 4, late: 1, absent: 0 },
  { week: 'Week 3', present: 5, late: 0, absent: 0 },
  { week: 'Week 4', present: 4, late: 0, absent: 1 },
];

export const teamPerformanceTrends = [
  { date: 'Mon', attendance: 95, productivity: 88, satisfaction: 82 },
  { date: 'Tue', attendance: 92, productivity: 85, satisfaction: 80 },
  { date: 'Wed', attendance: 98, productivity: 90, satisfaction: 85 },
  { date: 'Thu', attendance: 94, productivity: 87, satisfaction: 83 },
  { date: 'Fri', attendance: 90, productivity: 82, satisfaction: 78 },
];

export const systemActivityTrends = [
  { month: 'Jun', users: 45, departments: 5, activeShifts: 12 },
  { month: 'Jul', users: 48, departments: 5, activeShifts: 14 },
  { month: 'Aug', users: 52, departments: 6, activeShifts: 15 },
  { month: 'Sep', users: 55, departments: 6, activeShifts: 16 },
  { month: 'Oct', users: 58, departments: 6, activeShifts: 18 },
  { month: 'Nov', users: 60, departments: 6, activeShifts: 20 },
];

// ============ Service Functions ============

// Employee functions
export const getEmployees = () => employees;
export const getEmployeeById = (id: number) => employees.find(e => e.employee_id === id);
export const getDepartments = () => departments;
export const getPositions = () => positions;

// Leave functions
export const getLeaveTypes = () => leaveTypes;
export const getLeaveRequests = () => leaveRequests;
export const getLeaveEntitlements = () => leaveEntitlements;

// Mission functions
export const getMissions = () => missions;

// Attendance functions
export const getAttendanceRecords = () => attendanceRecords;
export const getShiftSchedules = () => shiftSchedules;
export const getShiftTypes = () => shiftTypes;
export const getShiftNames = () => shiftNames;
export const getShiftAssignments = () => shiftAssignments;

// Payroll functions
export const getPayrollRecords = () => payrollRecords;
export const getPayGrades = () => payGrades;

// Contract functions
export const getContracts = () => contracts;

// Reimbursement functions
export const getReimbursements = () => reimbursements;

// Notification functions
export const getNotifications = () => notifications;
export const getNewsEvents = () => newsEvents;

// Role functions
export const getRoles = () => roles;

// Trend data functions
export const getAttendanceTrends = () => attendanceTrends;
export const getPayrollTrends = () => payrollTrends;
export const getPersonalAttendanceTrends = () => personalAttendanceTrends;
export const getTeamPerformanceTrends = () => teamPerformanceTrends;
export const getSystemActivityTrends = () => systemActivityTrends;

// ============ Action Functions ============

export const submitLeaveRequest = async (data: { employeeId: number; leaveTypeId: number; startDate: Date; endDate: Date; reason: string }) => {
  toast.success('Leave request submitted successfully');
  return { success: true };
};

export const approveLeaveRequest = async (requestId: number, approverId: number) => {
  toast.success('Leave request approved');
  return { success: true };
};

export const rejectLeaveRequest = async (requestId: number, reason: string) => {
  toast.success('Leave request rejected');
  return { success: true };
};

export const clockIn = async (employeeId: number, shiftId?: number) => {
  toast.success('Clocked in successfully');
  return { success: true };
};

export const clockOut = async (employeeId: number) => {
  toast.success('Clocked out successfully');
  return { success: true };
};

export const submitReimbursement = async (data: { employeeId: number; type: string; amount: number; description: string }) => {
  toast.success('Reimbursement submitted successfully');
  return { success: true };
};

export const approveReimbursement = async (reimbursementId: number, approverId: number) => {
  toast.success('Reimbursement approved');
  return { success: true };
};

export const createEmployee = async (data: Partial<Employee>) => {
  toast.success('Employee created successfully');
  return { success: true, employee_id: Date.now() };
};

export const updateEmployee = async (employeeId: number, data: Partial<Employee>) => {
  toast.success('Employee updated successfully');
  return { success: true };
};

export const assignMission = async (data: { employeeId: number; destination: string; startDate: Date; endDate: Date; purpose: string }) => {
  toast.success('Mission assigned successfully');
  return { success: true };
};

export const createContract = async (data: Partial<Contract>) => {
  toast.success('Contract created successfully');
  return { success: true };
};

export const renewContract = async (contractId: number, newEndDate: Date) => {
  toast.success('Contract renewed successfully');
  return { success: true };
};

export const assignShift = async (employeeId: number, shiftId: number, startDate: Date, endDate: Date) => {
  toast.success('Shift assigned successfully');
  return { success: true };
};

export const processPayroll = async (period: string) => {
  toast.success('Payroll processed successfully');
  return { success: true };
};

export const generateReport = async (reportType: string) => {
  toast.success(`${reportType} generated successfully`);
  return { success: true };
};

export const addManagerNote = async (employeeId: number, note: string, isPrivate: boolean) => {
  toast.success('Note added successfully');
  return { success: true };
};

export const submitCorrectionRequest = async (data: { employeeId: number; date: Date; correctionType: string; reason: string }) => {
  toast.success('Correction request submitted');
  return { success: true };
};

export const approveCorrectionRequest = async (requestId: number, approverId: number) => {
  toast.success('Correction request approved');
  return { success: true };
};

export const sendNotification = async (employeeId: number, message: string) => {
  toast.success('Notification sent');
  return { success: true };
};

// Helper functions
export const getShiftNameById = (shiftId: number): string => {
  const shift = shiftSchedules.find(s => s.shift_id === shiftId);
  if (!shift || !shift.name) return 'Unknown Shift';
  const name = shiftNames.find(n => n.shift_name_id === shift.name);
  return name?.name || 'Unknown Shift';
};

export const getEmployeeName = (employeeId: number): string => {
  const employee = employees.find(e => e.employee_id === employeeId);
  return employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown';
};

export const getDepartmentName = (departmentId: number): string => {
  const dept = departments.find(d => d.department_id === departmentId);
  return dept?.department_name || 'Unknown';
};

export const getPositionTitle = (positionId: number): string => {
  const pos = positions.find(p => p.position_id === positionId);
  return pos?.position_title || 'Unknown';
};
