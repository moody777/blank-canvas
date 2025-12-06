import type {
  User, Employee, Department, Position, AttendanceRecord, ShiftSchedule, ShiftType, ShiftName, Exception,
  LeaveRequest, Leave, LeavePolicy, LeaveEntitlement, Mission, MissionTeam, MissionTask, PayrollRecord,
  AllowanceDeduction, SalaryType, Contract, FullTimeContract, InsurancePlan, TaxForm, Notification,
  NewsEvent, Skill, EmployeeSkill, Verification, EmployeeVerification, Job, JobApplication, InterviewStage, JobOffer,
  Role, Permission, RolePermission, EmployeeRole, Currency, EmployeeNotification
} from '@/types';
import type { 
  Reimbursement, ReimbursementAttachment, ShiftAssignment, PayGrade, Device, AttendanceSource,
  ManagerNote, AttendanceCorrectionRequest, TimeRequest, HRDocument, TaxRule,
  PayrollPolicy, OvertimePolicy, VacationPackage, ApprovalWorkflow
} from '@/types/index';
import { Shield, Users, Calendar, DollarSign, FileText, Settings } from 'lucide-react';

// Users
export const users: User[] = [
  { id: '1', username: 'john.doe', email: 'john.doe@company.com', roles: ['employee'], employeeId: '1' },
  { id: '2', username: 'sarah.johnson', email: 'sarah.johnson@company.com', roles: ['employee', 'line_manager'], employeeId: '1' },
  { id: '3', username: 'hr.admin', email: 'maria.rodriguez@company.com', roles: ['employee', 'hr_admin'], employeeId: '3' },
  { id: '4', username: 'payroll.specialist', email: 'lisa.anderson@company.com', roles: ['employee', 'payroll_specialist'], employeeId: '8' },
  { id: '5', username: 'system.admin', email: 'daniel.kim@company.com', roles: ['employee', 'system_admin'], employeeId: '14' },
  { id: '6', username: 'david.chen', email: 'david.chen@company.com', roles: ['employee', 'line_manager'], employeeId: '2' },
  { id: '7', username: 'sarah.manager', email: 'sarah.manager@company.com', roles: ['employee', 'line_manager'], employeeId: '1' },
];

// Currencies
export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', exchangeRate: 1.0, createdDate: '2024-01-01', lastUpdated: '2024-01-01' },
  { code: 'EUR', name: 'Euro', exchangeRate: 0.92, createdDate: '2024-01-01', lastUpdated: '2024-01-01' },
  { code: 'GBP', name: 'British Pound', exchangeRate: 0.79, createdDate: '2024-01-01', lastUpdated: '2024-01-01' },
  { code: 'EGP', name: 'Egyptian Pound', exchangeRate: 30.9, createdDate: '2024-01-01', lastUpdated: '2024-01-01' },
];

// Departments
export const departments: Department[] = [
  { id: '1', name: 'Executive', purpose: 'Company Leadership', departmentHeadId: '1', employeeCount: 2 },
  { id: '2', name: 'Technology', purpose: 'IT and Development', departmentHeadId: '2', employeeCount: 8 },
  { id: '3', name: 'Human Resources', purpose: 'Employee Management', departmentHeadId: '3', employeeCount: 4 },
  { id: '4', name: 'Finance', purpose: 'Financial Operations', departmentHeadId: '3', employeeCount: 2 },
  { id: '5', name: 'Marketing', purpose: 'Brand and Marketing', departmentHeadId: '10', employeeCount: 2 },
  { id: '6', name: 'Sales', purpose: 'Revenue Generation', departmentHeadId: '11', employeeCount: 2 },
];

// Positions
export const positions: Position[] = [
  { id: '1', title: 'CEO', responsibilities: 'Executive Leadership', status: 'ACTIVE' },
  { id: '2', title: 'CTO', responsibilities: 'Technology Strategy', status: 'ACTIVE' },
  { id: '3', title: 'HR Director', responsibilities: 'Human Resources Management', status: 'ACTIVE' },
  { id: '4', title: 'IT Manager', responsibilities: 'IT Operations', status: 'ACTIVE' },
  { id: '5', title: 'Software Engineer', responsibilities: 'Software Development', status: 'ACTIVE' },
  { id: '6', title: 'Senior Developer', responsibilities: 'Lead Development Projects', status: 'ACTIVE' },
  { id: '7', title: 'HR Specialist', responsibilities: 'Recruitment and Onboarding', status: 'ACTIVE' },
  { id: '8', title: 'Payroll Manager', responsibilities: 'Payroll Processing', status: 'ACTIVE' },
];

// Employees (replaces Profiles)
export const profiles: Employee[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Johnson',
    nationalId: 'SSN-123-45-6789',
    dateOfBirth: '1978-05-15',
    countryOfBirth: 'USA',
    phone: '+1-555-0101',
    email: 'sarah.johnson@company.com',
    address: '123 Executive St, NYC',
    emergencyContactName: 'Michael Johnson',
    emergencyContactPhone: '+1-555-0102',
    relationship: 'Spouse',
    biography: 'Visionary leader with 20 years experience',
    profileImage: '/placeholder.svg',
    employmentProgress: 'COMPLETE',
    accountStatus: 'ACTIVE',
    employmentStatus: 'ACTIVE',
    hireDate: '2020-01-15',
    isActive: true,
    profileCompletion: 100,
    departmentId: '1',
    positionId: '1',
    contractId: '1',
    taxFormId: '1',
    salaryTypeId: '1',
    payGrade: '5'
  },
  {
    id: '2',
    firstName: 'David',
    lastName: 'Chen',
    fullName: 'David Chen',
    nationalId: 'SSN-234-56-7890',
    dateOfBirth: '1982-08-22',
    countryOfBirth: 'USA',
    phone: '+1-555-0201',
    email: 'david.chen@company.com',
    address: '456 Tech Ave, San Francisco',
    emergencyContactName: 'Lisa Chen',
    emergencyContactPhone: '+1-555-0202',
    relationship: 'Spouse',
    biography: 'Tech innovator and strategic thinker',
    profileImage: '/placeholder.svg',
    employmentProgress: 'COMPLETE',
    accountStatus: 'ACTIVE',
    employmentStatus: 'ACTIVE',
    hireDate: '2019-03-20',
    isActive: true,
    profileCompletion: 100,
    departmentId: '2',
    positionId: '2',
    managerId: '1',
    contractId: '2',
    taxFormId: '1',
    salaryTypeId: '2',
    payGrade: '5'
  },
  {
    id: '3',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    fullName: 'Maria Rodriguez',
    nationalId: 'SSN-345-67-8901',
    dateOfBirth: '1985-11-30',
    countryOfBirth: 'Mexico',
    phone: '+1-555-0301',
    email: 'maria.rodriguez@company.com',
    address: '789 HR Blvd, Austin',
    emergencyContactName: 'Carlos Rodriguez',
    emergencyContactPhone: '+1-555-0302',
    relationship: 'Spouse',
    biography: 'People-focused HR professional',
    profileImage: '/placeholder.svg',
    employmentProgress: 'COMPLETE',
    accountStatus: 'ACTIVE',
    employmentStatus: 'ACTIVE',
    hireDate: '2021-06-01',
    isActive: true,
    profileCompletion: 100,
    departmentId: '3',
    positionId: '3',
    managerId: '1',
    contractId: '3',
    taxFormId: '2',
    salaryTypeId: '3',
    payGrade: '4'
  },
];

// Skills
export const skills: Skill[] = [
  { id: '1', skillName: 'Leadership', description: 'Team management and strategic planning' },
  { id: '2', skillName: 'Python', description: 'Python programming language' },
  { id: '3', skillName: 'Java', description: 'Java programming language' },
  { id: '4', skillName: 'SQL', description: 'Database query language' },
  { id: '5', skillName: 'Project Management', description: 'PMP and Agile methodologies' },
];

// Employee Skills
export const employeeSkills: EmployeeSkill[] = [
  { employeeId: '1', skillId: '1', proficiencyLevel: 'EXPERT' },
  { employeeId: '1', skillId: '5', proficiencyLevel: 'EXPERT' },
  { employeeId: '2', skillId: '1', proficiencyLevel: 'EXPERT' },
  { employeeId: '2', skillId: '4', proficiencyLevel: 'ADVANCED' },
];

// Verifications (replaces Certifications)
export const verifications: Verification[] = [
  { id: '1', verificationType: 'Background Check', issuer: 'SecureCheck Inc.', issueDate: '2024-01-15', expiryPeriod: '3 years' },
  { id: '2', verificationType: 'Degree Verification', issuer: 'National Student Clearinghouse', issueDate: '2024-02-01', expiryPeriod: 'Permanent' },
  { id: '3', verificationType: 'Professional Certification', issuer: 'PMI', issueDate: '2023-06-15', expiryPeriod: '3 years' },
];

// Shift Types
export const shiftTypes: ShiftType[] = [
  { id: '1', name: 'DAY_SHIFT', description: 'Standard daytime working hours' },
  { id: '2', name: 'NIGHT_SHIFT', description: 'Overnight shift for 24/7 operations' },
  { id: '3', name: 'FLEXIBLE', description: 'Flexible hours with core time' },
];

// Shift Names
export const shiftNames: ShiftName[] = [
  { id: '1', name: 'Morning Shift', shiftTypeId: '1', description: '8 AM to 5 PM standard shift' },
  { id: '2', name: 'Evening Shift', shiftTypeId: '1', description: '1 PM to 10 PM shift' },
  { id: '3', name: 'Night Operations', shiftTypeId: '2', description: '10 PM to 6 AM overnight shift' },
];

// Shift Schedules
export const shifts: ShiftSchedule[] = [
  { id: '1', nameId: '1', typeId: '1', startTime: '08:00:00', endTime: '17:00:00', breakDuration: 60, shiftDate: '2024-11-18', status: 'ACTIVE' },
  { id: '2', nameId: '1', typeId: '1', startTime: '08:00:00', endTime: '17:00:00', breakDuration: 60, shiftDate: '2024-11-19', status: 'ACTIVE' },
  { id: '3', nameId: '2', typeId: '1', startTime: '13:00:00', endTime: '22:00:00', breakDuration: 60, shiftDate: '2024-11-18', status: 'ACTIVE' },
];

// Exceptions
export const exceptions: Exception[] = [
  { id: '1', name: 'Late Arrival', category: 'TARDINESS', date: '2024-11-15', status: 'RECORDED' },
  { id: '2', name: 'Early Departure', category: 'EARLY_LEAVE', date: '2024-11-16', status: 'RECORDED' },
  { id: '3', name: 'Overtime', category: 'EXTRA_HOURS', date: '2024-11-14', status: 'APPROVED' },
];

// Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: '1', shiftId: '1', entryTime: '2024-11-18T07:55:00', exitTime: '2024-11-18T17:10:00', duration: 9, loginMethod: 'BIOMETRIC', logoutMethod: 'BIOMETRIC' },
  { id: '2', employeeId: '2', shiftId: '1', entryTime: '2024-11-18T08:00:00', exitTime: '2024-11-18T17:05:00', duration: 9, loginMethod: 'BIOMETRIC', logoutMethod: 'BIOMETRIC' },
  { id: '3', employeeId: '3', shiftId: '1', entryTime: '2024-11-18T08:20:00', exitTime: '2024-11-18T17:00:00', duration: 8.7, loginMethod: 'MANUAL', logoutMethod: 'BIOMETRIC', exceptionId: '1' },
];

// Leave Types
export const leaveTypes: Leave[] = [
  { id: '1', leaveType: 'VACATION', leaveDescription: 'Annual vacation leave for rest and recreation' },
  { id: '2', leaveType: 'SICK', leaveDescription: 'Medical leave for illness or injury' },
  { id: '3', leaveType: 'PROBATION', leaveDescription: 'Leave during probation period' },
  { id: '4', leaveType: 'HOLIDAY', leaveDescription: 'National and company holidays' },
];

// Leave Policies
export const leavePolicies: LeavePolicy[] = [
  { id: '1', name: 'Standard Vacation Policy', purpose: 'Annual leave entitlement', eligibilityRules: 'All full-time employees', noticePeriod: 14, specialLeaveType: 'VACATION', resetOnNewYear: true, yearStart: '2024-01-01', yearEnd: '2024-12-31' },
  { id: '2', name: 'Sick Leave Policy', purpose: 'Medical leave', eligibilityRules: 'All employees', noticePeriod: 0, specialLeaveType: 'SICK', resetOnNewYear: false, yearStart: '2024-01-01', yearEnd: '2024-12-31' },
];

// Leave Requests
export const leaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '1', leaveId: '1', justification: 'Family vacation to Hawaii', duration: 7, startDate: '2024-08-15', endDate: '2024-08-21', submittedAt: '2024-08-01T10:30:00', approvalTiming: '2024-08-15T10:30:00', approvedBy: '2', status: 'APPROVED' },
  { id: '2', employeeId: '2', leaveId: '1', justification: 'Wedding anniversary trip', duration: 5, startDate: '2024-09-20', endDate: '2024-09-24', submittedAt: '2024-09-05T14:15:00', approvalTiming: '2024-09-20T14:15:00', approvedBy: '1', status: 'APPROVED' },
  { id: '3', employeeId: '3', leaveId: '2', justification: 'Flu and fever', duration: 3, startDate: '2024-10-05', endDate: '2024-10-07', submittedAt: '2024-10-05T08:00:00', approvalTiming: '2024-10-05T08:00:00', approvedBy: '1', status: 'APPROVED' },
];

// Leave Entitlements
export const leaveEntitlements: LeaveEntitlement[] = [
  { employeeId: '1', leaveTypeId: '1', entitlement: 25, remaining: 20 },
  { employeeId: '2', leaveTypeId: '1', entitlement: 25, remaining: 22 },
  { employeeId: '3', leaveTypeId: '1', entitlement: 22, remaining: 18 },
  { employeeId: '1', leaveTypeId: '2', entitlement: 10, remaining: 10 },
  { employeeId: '2', leaveTypeId: '2', entitlement: 10, remaining: 10 },
  { employeeId: '3', leaveTypeId: '2', entitlement: 10, remaining: 7 },
];

// Missions
export const missions: Mission[] = [
  { id: '1', destination: 'London Office', startDate: '2024-10-01', endDate: '2024-10-15', status: 'COMPLETED', employeeId: '2', managerId: '1', purpose: 'Strategic Alignment', description: 'Annual strategic planning with UK branch.', budget: 5000, currency: 'GBP', accommodation: 'The Savoy', transportation: 'Uber Business' },
  { id: '2', destination: 'Singapore Client Site', startDate: '2024-11-10', endDate: '2024-11-20', status: 'ASSIGNED', employeeId: '2', managerId: '1', purpose: 'System Deployment', description: 'On-site deployment of the new HR module.', budget: 8000, currency: 'USD', accommodation: 'Marina Bay Sands', transportation: 'Local Taxi' },
];

// Mission Teams
export const missionTeams: MissionTeam[] = [
  { missionId: '1', employeeId: '2', role: 'LEAD' },
  { missionId: '2', employeeId: '2', role: 'LEAD' },
  { missionId: '2', employeeId: '1', role: 'MEMBER' },
];

// Mission Tasks
export const missionTasks: MissionTask[] = [
  { id: '1', missionId: '2', title: 'Initial Setup', description: 'Server configuration and environment setup', dueDate: '2024-11-11', completed: true, completedAt: '2024-11-11T14:00:00' },
  { id: '2', missionId: '2', title: 'User Training', description: 'Train local staff on new module', dueDate: '2024-11-15', completed: false },
];

// Payroll Records
export const payrollRecords: PayrollRecord[] = [
  { id: '1', employeeId: '1', taxes: 35000, periodStart: '2024-10-01', periodEnd: '2024-10-31', baseAmount: 180000, adjustments: 5000, contributions: 9000, actualPay: 185000, netSalary: 141000, paymentDate: '2024-11-05', status: 'PAID' },
  { id: '2', employeeId: '2', taxes: 32000, periodStart: '2024-10-01', periodEnd: '2024-10-31', baseAmount: 165000, adjustments: 3000, contributions: 8250, actualPay: 168000, netSalary: 127750, paymentDate: '2024-11-05', status: 'PAID' },
  { id: '3', employeeId: '3', taxes: 22000, periodStart: '2024-10-01', periodEnd: '2024-10-31', baseAmount: 110000, adjustments: 2000, contributions: 5500, actualPay: 112000, netSalary: 84500, paymentDate: '2024-11-05', status: 'PAID' },
];

// Allowances and Deductions
export const allowancesDeductions: AllowanceDeduction[] = [
  { adjustmentId: '1', payrollId: '1', employeeId: '1', type: 'HOUSING_ALLOWANCE', amount: 3000, currency: 'USD', duration: 30, timezone: 'EST' },
  { adjustmentId: '2', payrollId: '1', employeeId: '1', type: 'TRANSPORT_ALLOWANCE', amount: 2000, currency: 'USD', duration: 30, timezone: 'EST' },
  { adjustmentId: '3', payrollId: '2', employeeId: '2', type: 'HOUSING_ALLOWANCE', amount: 2000, currency: 'USD', duration: 30, timezone: 'PST' },
];

// Contracts
export const contracts: Contract[] = [
  { id: '1', type: 'FULL_TIME', startDate: '2020-01-15', currentState: 'ACTIVE' },
  { id: '2', type: 'FULL_TIME', startDate: '2019-03-20', currentState: 'ACTIVE' },
  { id: '3', type: 'FULL_TIME', startDate: '2021-06-01', currentState: 'ACTIVE' },
];

// Insurance Plans
export const insurancePlans: InsurancePlan[] = [
  { id: '1', type: 'Health', contributionRate: 5.5, coverage: 'Medical and Dental' },
  { id: '2', type: 'Life', contributionRate: 1.0, coverage: 'Life Insurance' },
  { id: '3', type: 'Disability', contributionRate: 2.0, coverage: 'Short and Long Term Disability' },
];

// Tax Forms
export const taxForms: TaxForm[] = [
  { id: '1', jurisdiction: 'Federal - USA', validityPeriod: '2024-2025', formContent: 'W-4 Form' },
  { id: '2', jurisdiction: 'State - California', validityPeriod: '2024', formContent: 'CA State Tax Form' },
  { id: '3', jurisdiction: 'State - New York', validityPeriod: '2024', formContent: 'NY State Tax Form' },
];

// Pay Grades
export const payGrades: PayGrade[] = [
  { id: '1', gradeName: 'Entry Level', minSalary: 30000, maxSalary: 45000 },
  { id: '2', gradeName: 'Junior', minSalary: 45000, maxSalary: 65000 },
  { id: '3', gradeName: 'Mid-Level', minSalary: 65000, maxSalary: 90000 },
  { id: '4', gradeName: 'Senior', minSalary: 90000, maxSalary: 120000 },
  { id: '5', gradeName: 'Executive', minSalary: 120000, maxSalary: 200000 },
];

// Notifications
export const notifications: Notification[] = [
  { id: '1', messageContent: 'Your leave request has been approved', timestamp: '2024-11-15T10:00:00', urgency: 'NORMAL', readStatus: false, notificationType: 'LEAVE_APPROVAL' },
  { id: '2', messageContent: 'Payroll processed for October 2024', timestamp: '2024-11-05T08:00:00', urgency: 'NORMAL', readStatus: true, notificationType: 'PAYROLL' },
  { id: '3', messageContent: 'Attendance correction request pending', timestamp: '2024-11-18T09:30:00', urgency: 'HIGH', readStatus: false, notificationType: 'ATTENDANCE' },
  { id: '4', messageContent: 'Team Building Event', timestamp: '2024-11-21T12:00:00', urgency: 'NORMAL', readStatus: false, notificationType: 'EVENT', eventDateTime: '2024-12-05T14:00:00', eventLocation: 'Conference Room A' },
  { id: '5', messageContent: 'Christmas Party', timestamp: '2024-11-22T10:00:00', urgency: 'NORMAL', readStatus: false, notificationType: 'EVENT', eventDateTime: '2024-12-20T18:00:00', eventLocation: 'Grand Ballroom' },
];

// Reimbursements
export const reimbursements: Reimbursement[] = [
  { id: '1', type: 'TRAVEL', claimType: 'Flight and Hotel', approvalDate: '2024-10-20', currentStatus: 'APPROVED', employeeId: '2', approvedBy: '1', amount: 2500, description: 'Flight to London', submittedAt: '2024-10-15T10:00:00' },
  { id: '2', type: 'MEALS', claimType: 'Client Dinner', approvalDate: '2024-11-01', currentStatus: 'APPROVED', employeeId: '2', approvedBy: '1', amount: 350, description: 'Dinner with Singapore Client', submittedAt: '2024-10-28T14:30:00' },
  { id: '3', type: 'EQUIPMENT', claimType: 'Laptop Accessories', approvalDate: '2024-10-25', currentStatus: 'APPROVED', employeeId: '1', approvedBy: '2', amount: 450, description: 'External monitor and keyboard', submittedAt: '2024-10-20T09:15:00' },
];

// Shift Assignments
export const shiftAssignments: ShiftAssignment[] = [
  { id: '1', employeeId: '1', shiftId: '1', startDate: '2024-11-18', endDate: '2024-11-22', status: 'ACTIVE' },
  { id: '2', employeeId: '2', shiftId: '1', startDate: '2024-11-18', endDate: '2024-11-22', status: 'ACTIVE' },
  { id: '3', employeeId: '3', shiftId: '1', startDate: '2024-11-18', endDate: '2024-11-22', status: 'ACTIVE' },
];

// Attendance Correction Requests
export const correctionRequests: AttendanceCorrectionRequest[] = [
  { id: '1', employeeId: '3', date: '2024-11-18', correctionType: 'LATE_ENTRY', reason: 'Traffic jam on highway', status: 'APPROVED', recordedBy: '3' },
  { id: '2', employeeId: '2', date: '2024-11-19', correctionType: 'EARLY_EXIT', reason: 'Medical appointment', status: 'APPROVED', recordedBy: '3' },
];

// Time Requests
export const timeRequests: TimeRequest[] = [
  { id: '1', employeeId: '1', requestType: 'EARLY_LEAVE', requestDate: '2024-11-25', durationMinutes: 120, reason: 'Dentist Appointment', status: 'APPROVED', submittedAt: '2024-11-20T09:00:00', approvedBy: '2', approvedAt: '2024-11-20T10:00:00' },
  { id: '2', employeeId: '2', requestType: 'OVERTIME', requestDate: '2024-11-26', durationMinutes: 180, reason: 'Urgent Project Deadline', status: 'PENDING', submittedAt: '2024-11-24T16:00:00' },
];

// Manager Notes
export const managerNotes: ManagerNote[] = [
  { id: '1', employeeId: '1', managerId: '2', noteContent: 'Excellent performance on AI project', createdAt: '2024-11-10' },
  { id: '2', employeeId: '2', managerId: '1', noteContent: 'Great leadership in London mission', createdAt: '2024-11-12' },
];

// HR Documents
export const hrDocuments: HRDocument[] = [
  { id: '1', employeeId: '2', documentType: 'CERTIFICATE', title: '10 Year Service Award', filePath: '/docs/certs/emp2_10yr.pdf', issuedDate: '2024-03-20', issuedBy: '1', createdAt: '2024-03-20T10:00:00' },
  { id: '2', employeeId: '2', documentType: 'APPRAISAL', title: 'Annual Performance Review 2024', filePath: '/docs/reviews/emp2_2024.pdf', issuedDate: '2024-10-15', issuedBy: '1', createdAt: '2024-10-15T14:00:00' },
];

// Tax Rules
export const taxRules: TaxRule[] = [
  { id: '1', jurisdiction: 'Federal - USA', taxRate: 22.0, exemptionThreshold: 12000, currency: 'USD', effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31' },
  { id: '2', jurisdiction: 'State - California', taxRate: 9.3, exemptionThreshold: 0, currency: 'USD', effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31' },
];

// Devices
export const devices: Device[] = [
  { id: '1', deviceType: 'BIOMETRIC_TERMINAL', terminalId: 'TERM-NYC-001', latitude: 40.712776, longitude: -74.005974 },
  { id: '2', deviceType: 'BIOMETRIC_TERMINAL', terminalId: 'TERM-SF-001', latitude: 37.774929, longitude: -122.419418 },
  { id: '3', deviceType: 'MOBILE_DEVICE', terminalId: 'MOB-EMP001', employeeId: '1' },
];

// News Events
export const newsEvents: NewsEvent[] = [
  { id: '1', title: 'Company All-Hands Meeting', description: 'Quarterly results and future plans', date: '2024-11-30', category: 'Company' },
  { id: '2', title: 'New Product Launch', description: 'Exciting new feature release', date: '2024-12-15', category: 'Product' },
  { id: '3', title: 'Holiday Party', description: 'Annual celebration event', date: '2024-12-20', category: 'Social' },
];

// Recruitment Jobs
export const jobs: Job[] = [
  { id: '1', title: 'Senior Full Stack Developer', description: 'We are looking for an experienced full stack developer...', departmentId: '2', requirements: '5+ years experience, React, Node.js', responsibilities: 'Develop and maintain web applications', salaryRange: '$120,000 - $160,000', employmentType: 'full-time', status: 'open', postedDate: '2024-11-01', experienceLevel: 'senior', location: 'San Francisco, CA' },
  { id: '2', title: 'HR Coordinator', description: 'Join our HR team to support employee operations...', departmentId: '3', requirements: '2+ years HR experience', responsibilities: 'Support recruitment and onboarding', salaryRange: '$55,000 - $75,000', employmentType: 'full-time', status: 'open', postedDate: '2024-11-10', experienceLevel: 'mid', location: 'Austin, TX' },
];

// Job Applications
export const jobApplications: JobApplication[] = [
  { id: '1', jobId: '1', applicantName: 'Alex Thompson', applicantEmail: 'alex.thompson@email.com', applicantPhone: '+1-555-1234', cvUrl: '/resumes/alex_thompson.pdf', status: 'screening', appliedDate: '2024-11-05', currentStage: 'Initial Review' },
  { id: '2', jobId: '2', applicantName: 'Jessica Brown', applicantEmail: 'jessica.brown@email.com', applicantPhone: '+1-555-5678', cvUrl: '/resumes/jessica_brown.pdf', status: 'interview', appliedDate: '2024-11-12', currentStage: 'Phone Screen' },
];

// Roles
export const roles: Role[] = [
  { id: '1', roleName: 'CEO', purpose: 'Chief Executive Officer' },
  { id: '2', roleName: 'CTO', purpose: 'Chief Technology Officer' },
  { id: '3', roleName: 'HR_DIRECTOR', purpose: 'Human Resources Director' },
  { id: '4', roleName: 'MANAGER', purpose: 'Department Manager' },
  { id: '5', roleName: 'EMPLOYEE', purpose: 'Regular Employee' },
];

// Missing exports for backwards compatibility
export const holidays = exceptions;
export const leaveBalances = leaveEntitlements;
export const allowances = allowancesDeductions.filter(a => a.type.includes('ALLOWANCE'));
export const deductions = allowancesDeductions.filter(a => a.type.includes('DEDUCTION'));
export const certifications = verifications;
export const attendanceDevices = devices;
export const overtimeRules: any[] = [];
export const systemRoles = roles;
export const permissions: any[] = [];
export const availableRoles = roles;
export const attendanceTrends: any[] = [];
export const payrollTrends: any[] = [];
export const personalAttendanceTrends: any[] = [];
export const teamPerformanceTrends: any[] = [];
export const systemActivityTrends: any[] = [];
export const interviewStages: any[] = [];
export const jobOffers: any[] = [];

// Dashboard metric icons
export const dashboardIcons = {
  team: Users,
  leave: Calendar,
  payroll: DollarSign,
  policies: FileText,
  security: Shield,
  settings: Settings,
};
