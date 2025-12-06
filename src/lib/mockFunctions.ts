import { toast } from '@/hooks/use-toast';
import { 
  users, profiles, departments, positions, attendanceRecords, shifts, holidays,
  leaveRequests, leaveTypes, leaveBalances, missions, payrollRecords,
  allowances, deductions, contracts, insurancePlans, taxForms, notifications,
  newsEvents, skills, certifications, reimbursements, shiftAssignments, payGrades,
  attendanceDevices, managerNotes, correctionRequests, timeRequests, hrDocuments,
  overtimeRules, taxRules, systemRoles, permissions, availableRoles,
  attendanceTrends, payrollTrends, personalAttendanceTrends, teamPerformanceTrends,
  systemActivityTrends, jobs, jobApplications, interviewStages, jobOffers
} from '@/data/mockData';

// GET functions - Simple pass-through to mockData
export const getUsers = () => users;
export const getProfiles = () => profiles;
export const getDepartments = () => departments;
export const getPositions = () => positions;
export const getAttendanceRecords = () => attendanceRecords;
export const getShifts = () => shifts;
export const getHolidays = () => holidays;
export const getLeaveRequests = () => leaveRequests;
export const getLeaveTypes = () => leaveTypes;
export const getLeaveBalances = () => leaveBalances;
export const getMissions = () => missions;
export const getPayrollRecords = () => payrollRecords;
export const getAllowances = () => allowances;
export const getDeductions = () => deductions;
export const getContracts = () => contracts;
export const getInsurancePlans = () => insurancePlans;
export const getTaxForms = () => taxForms;
export const getNotifications = () => notifications;
export const getNewsEvents = () => newsEvents;
export const getSkills = () => skills;
export const getCertifications = () => certifications;
export const getReimbursements = () => reimbursements;
export const getShiftAssignments = () => shiftAssignments;
export const getPayGrades = () => payGrades;
export const getAttendanceDevices = () => attendanceDevices;
export const getManagerNotes = () => managerNotes;
export const getCorrectionRequests = () => correctionRequests;
export const getTimeRequests = () => timeRequests;
export const getHRDocuments = () => hrDocuments;
export const getOvertimeRules = () => overtimeRules;
export const getTaxRules = () => taxRules;
export const getSystemRoles = () => systemRoles;
export const getPermissions = () => permissions;
export const getAvailableRoles = () => availableRoles;
export const getAttendanceTrends = () => attendanceTrends;
export const getPayrollTrends = () => payrollTrends;
export const getPersonalAttendanceTrends = () => personalAttendanceTrends;
export const getTeamPerformanceTrends = () => teamPerformanceTrends;
export const getSystemActivityTrends = () => systemActivityTrends;

// =============================================
// SYSTEM ADMIN PROCEDURES
// =============================================

export const ViewEmployeeInfo = (employeeId: string) => {
  toast({ title: 'Loading Details', description: 'Employee details will be displayed here.' });
  return { success: true };
};

export const AddEmployee = (data?: any) => {
  toast({ title: 'Employee Added', description: 'New employee has been successfully added to the system.' });
  return { success: true, id: `emp_${Date.now()}` };
};

// Legacy hasRole function - kept for backward compatibility
// Components should use useUserRole hook instead
let currentUserRoles: string[] = ['employee', 'line_manager', 'hr_admin', 'system_admin', 'payroll_specialist'];

export const setCurrentUserRoles = (roles: string[]) => {
  currentUserRoles = roles;
};

export const hasRole = (role?: string): boolean => {
  if (!role) return false;
  return currentUserRoles.includes(role);
};

export const UpdateEmployeeInfo = (employeeId: string, data?: any) => {
  toast({ title: 'Employee Updated', description: 'Employee information has been successfully updated.' });
  return { success: true };
};

export const AssignRole = (employeeId: string, roleId: string) => {
  toast({ title: 'Role Assigned', description: 'Role has been assigned successfully.' });
  return { success: true };
};

export const GetDepartmentEmployeeStats = () => {
  return { success: true, stats: [] };
};

export const ReassignManager = (employeeId: string, newManagerId: string) => {
  toast({ title: 'Manager Reassigned', description: 'Manager has been reassigned successfully.' });
  return { success: true };
};

export const ReassignHierarchy = (employeeId: string, newDepartmentId: string, newManagerId: string) => {
  toast({ title: 'Hierarchy Updated', description: 'Employee hierarchy has been updated.' });
  return { success: true };
};

export const NotifyStructureChange = (affectedEmployees: string[], message: string) => {
  toast({ title: 'Notification Sent', description: 'Structure change notification sent.' });
  return { success: true };
};

export const ViewOrgHierarchy = () => {
  return { success: true, hierarchy: [] };
};

export const AssignShiftToEmployee = (employeeId: string, shiftId?: string, startDate?: string | any, endDate?: string) => {
  toast({ title: 'Shift Assigned', description: 'Shift has been assigned successfully.' });
  // Trigger notification
  import('@/utils/notificationService').then(({ sendShiftAssignmentNotification }) => {
    const profile = profiles.find(p => p.id === employeeId);
    const shift = shifts.find(s => s.id === shiftId);
    if (profile && shift) {
      sendShiftAssignmentNotification(employeeId, `${profile.firstName} ${profile.lastName}`, shift.startTime, startDate || new Date().toISOString());
    }
  });
  return { success: true };
};

export const UpdateShiftStatus = (shiftAssignmentId: string, status: string) => {
  toast({ title: 'Shift Status Updated', description: 'Shift status has been updated.' });
  return { success: true };
};

export const AssignShiftToDepartment = (departmentId: string, shiftId: string, data?: any) => {
  toast({ title: 'Department Shift Assigned', description: 'Shift assigned to entire department.' });
  return { success: true };
};

export const AssignCustomShift = (data?: any) => {
  toast({ title: 'Custom Shift Created', description: 'Custom shift has been created and assigned.' });
  return { success: true };
};

export const ConfigureSplitShift = (data: any) => {
  toast({ title: 'Split Shift Configured', description: 'Split shift schedule has been configured.' });
  return { success: true };
};

export const EnableFirstInLastOut = (enable: boolean) => {
  toast({ title: 'Setting Updated', description: 'First In/Last Out setting has been updated.' });
  return { success: true };
};

export const TagAttendanceSource = (attendanceId: string, sourceType: string, deviceId: string, latitude?: number, longitude?: number) => {
  toast({ title: 'Source Tagged', description: 'Attendance source has been tagged.' });
  return { success: true };
};

export const SyncOfflineAttendance = (deviceId: string) => {
  toast({ title: 'Syncing Attendance', description: 'Offline attendance is being synced.' });
  return { success: true };
};

export const LogAttendanceEdit = (attendanceId: string, editedBy: string, oldValue: any, newValue: any) => {
  toast({ title: 'Edit Logged', description: 'Attendance edit has been logged.' });
  return { success: true };
};

export const ApplyHolidayOverrides = (holidayId: string) => {
  toast({ title: 'Overrides Applied', description: 'Holiday overrides have been applied.' });
  return { success: true };
};

export const ManageUserAccounts = (userId: string, role: string, action: string) => {
  toast({ title: 'Account Managed', description: `User account has been ${action.toLowerCase()}.` });
  return { success: true };
};

// =============================================
// HR ADMIN PROCEDURES
// =============================================

export const CreateContract = (employeeId?: string | any, type?: string, startDate?: string, endDate?: string) => {
  toast({ title: 'Contract Created', description: 'Contract has been created successfully.' });
  return { success: true };
};

export const RenewContract = (contractId: string, newEndDate?: string | any) => {
  toast({ title: 'Contract Renewed', description: 'Contract has been renewed successfully.' });
  return { success: true };
};

export const ApproveLeaveRequest = (leaveRequestId: string, approverId?: string, status?: string) => {
  toast({ title: 'Leave Approved', description: 'The leave request has been approved successfully.' });
  return { success: true };
};

export const AssignMission = (employeeId: string, managerId: string, destination: string, startDate: string, endDate: string) => {
  toast({ title: 'Mission Assigned', description: 'Mission has been assigned successfully.' });
  // Trigger notification
  import('@/utils/notificationService').then(({ sendMissionAssignmentNotification }) => {
    const profile = profiles.find(p => p.id === employeeId);
    if (profile) {
      sendMissionAssignmentNotification(employeeId, `${profile.firstName} ${profile.lastName}`, destination, startDate, endDate);
    }
  });
  return { success: true };
};

export const ReviewReimbursement = (claimId: string, approverId?: string, decision?: string) => {
  toast({ title: 'Reimbursement Reviewed', description: `Reimbursement has been ${decision?.toLowerCase() || 'reviewed'}.` });
  return { success: true };
};

export const GetActiveContracts = () => {
  // Contract doesn't have status field in new schema, filter by endDate
  const now = new Date();
  return { success: true, contracts: contracts.filter(c => !c.endDate || new Date(c.endDate) >= now) };
};

export const GetTeamByManager = (managerId: string) => {
  return { success: true, team: profiles.filter(p => p.managerId === managerId) };
};

export const UpdateLeavePolicy = (policyId: string, eligibilityRules: string, noticePeriod: number) => {
  toast({ title: 'Policy Updated', description: 'Leave policy has been updated successfully.' });
  return { success: true };
};

export const GetExpiringContracts = (daysBefore: number) => {
  return { success: true, contracts: [] };
};

export const AssignDepartmentHead = (departmentId: string, managerId: string) => {
  toast({ title: 'Department Head Assigned', description: 'Department head has been assigned.' });
  return { success: true };
};

export const CreateEmployeeProfile = (data: any) => {
  toast({ title: 'Profile Created', description: 'Employee profile has been created.' });
  return { success: true, id: `emp_${Date.now()}` };
};

export const UpdateEmployeeProfile = (employeeId: string, fieldName: string, newValue: string) => {
  toast({ title: 'Profile Updated', description: 'Employee profile has been updated.' });
  return { success: true };
};

export const SetProfileCompleteness = (employeeId: string, completeness: number) => {
  return { success: true };
};

export const GenerateProfileReport = (filterField: string, filterValue: string) => {
  toast({ title: 'Generating Report', description: 'Profile report is being generated.' });
  return { success: true };
};

export const CreateShiftType = (name: string, description: string) => {
  toast({ title: 'Shift Type Created', description: 'Shift type has been created.' });
  return { success: true };
};

export const CreateShiftName = (shiftName: string, shiftTypeId: string, description: string) => {
  toast({ title: 'Shift Name Created', description: 'Shift name has been created.' });
  return { success: true };
};

export const AssignRotationalShift = (employeeId: string, shiftCycle: string, startDate: string, endDate: string) => {
  toast({ title: 'Rotational Shift Assigned', description: 'Rotational shift has been assigned.' });
  return { success: true };
};

export const NotifyShiftExpiry = (employeeId: string, shiftAssignmentId: string, expiryDate: string) => {
  toast({ title: 'Notification Sent', description: 'Shift expiry notification has been sent.' });
  return { success: true };
};

export const DefineShortTimeRules = (ruleName: string, lateMinutes: number, earlyLeaveMinutes: number, penaltyType: string) => {
  toast({ title: 'Rules Defined', description: 'Short time rules have been defined.' });
  return { success: true };
};

export const SetGracePeriod = (minutes: number) => {
  toast({ title: 'Grace Period Set', description: 'Grace period has been set successfully.' });
  return { success: true };
};

export const DefinePenaltyThreshold = (lateMinutes: number, deductionType: string) => {
  toast({ title: 'Penalty Threshold Defined', description: 'Penalty threshold has been defined.' });
  return { success: true };
};

export const DefinePermissionLimits = (minHours: number, maxHours: number) => {
  toast({ title: 'Permission Limits Defined', description: 'Permission limits have been set.' });
  return { success: true };
};

export const LinkVacationToShift = (vacationPackageId: string, employeeId: string) => {
  toast({ title: 'Vacation Linked', description: 'Vacation package has been linked.' });
  return { success: true };
};

export const ConfigureLeavePolicies = (data?: any) => {
  toast({ title: 'Configuration Started', description: 'Leave policy configuration has been initiated.' });
  return { success: true };
};

export const AuthenticateLeaveAdmin = (adminId: string, password: string) => {
  return { success: true, authenticated: true };
};

export const ApplyLeaveConfiguration = () => {
  toast({ title: 'Configuration Applied', description: 'Leave configuration has been applied.' });
  return { success: true };
};

export const UpdateLeaveEntitlements = (employeeId: string) => {
  toast({ title: 'Entitlements Updated', description: 'Leave entitlements have been updated.' });
  return { success: true };
};

export const ConfigureLeaveEligibility = (leaveType?: string | any, minTenure?: number, employeeType?: string) => {
  toast({ title: 'Eligibility Configured', description: 'Leave eligibility has been configured.' });
  return { success: true };
};

export const ManageLeaveTypes = (leaveType?: string | any, description?: string) => {
  toast({ title: 'Leave Type Managed', description: 'Leave type has been managed.' });
  return { success: true };
};

export const AssignLeaveEntitlement = (employeeId?: string | any, leaveType?: string, entitlement?: number) => {
  toast({ title: 'Entitlement Assigned', description: 'Leave entitlement has been assigned.' });
  return { success: true };
};

export const ConfigureLeaveRules = (leaveType: string, maxDuration: number, noticePeriod: number, workflowType: string) => {
  toast({ title: 'Rules Configured', description: 'Leave rules have been configured.' });
  return { success: true };
};

export const ConfigureSpecialLeave = (leaveType: string, rules: string) => {
  toast({ title: 'Special Leave Configured', description: 'Special leave has been configured.' });
  return { success: true };
};

export const SetLeaveYearRules = (startDate: string, endDate: string) => {
  toast({ title: 'Leave Year Set', description: 'Leave year rules have been set.' });
  return { success: true };
};

export const AdjustLeaveBalance = (employeeId: string, leaveType: string, adjustment: number) => {
  toast({ title: 'Balance Adjusted', description: 'Leave balance has been adjusted.' });
  return { success: true };
};

export const ManageLeaveRoles = (roleId: string, permissions: string) => {
  toast({ title: 'Roles Managed', description: 'Leave roles have been managed.' });
  return { success: true };
};

export const FinalizeLeaveRequest = (leaveRequestId: string) => {
  toast({ title: 'Request Finalized', description: 'Leave request has been finalized.' });
  return { success: true };
};

export const OverrideLeaveDecision = (leaveRequestId: string, reason: string) => {
  toast({ title: 'Decision Overridden', description: 'Leave decision has been overridden.' });
  return { success: true };
};

export const BulkProcessLeaveRequests = (leaveRequestIds: string[]) => {
  toast({ title: 'Bulk Processing', description: `Processing ${leaveRequestIds.length} leave requests.` });
  return { success: true };
};

export const VerifyMedicalLeave = (leaveRequestId: string, documentId?: string) => {
  toast({ title: 'Medical Leave Verified', description: 'Medical leave has been verified.' });
  return { success: true };
};

export const SyncLeaveBalances = (leaveRequestId: string) => {
  toast({ title: 'Balances Synced', description: 'Leave balances have been synced.' });
  return { success: true };
};

export const ProcessLeaveCarryForward = (year?: number | any) => {
  toast({ title: 'Carry Forward Processed', description: 'Leave carry forward has been processed.' });
  return { success: true };
};

export const SyncLeaveToAttendance = (leaveRequestId: string) => {
  toast({ title: 'Synced to Attendance', description: 'Leave has been synced to attendance.' });
  return { success: true };
};

export const UpdateInsuranceBrackets = (bracketId: string, data: any) => {
  toast({ title: 'Insurance Updated', description: 'Insurance brackets have been updated.' });
  return { success: true };
};

export const ApprovePolicyUpdate = (policyId: string, approvedBy: string) => {
  toast({ title: 'Policy Approved', description: 'Policy update has been approved.' });
  return { success: true };
};

// =============================================
// PAYROLL SPECIALIST PROCEDURES
// =============================================

export const GeneratePayroll = (period?: any) => {
  toast({ title: 'Processing Payroll', description: 'Payroll is being processed. This may take a few moments.' });
  return { success: true };
};

export const AdjustPayrollItem = (payrollId: string, type?: string, amount?: number) => {
  toast({ title: 'Item Adjusted', description: 'Payroll item has been adjusted.' });
  return { success: true };
};

export const CalculateNetSalary = (payrollId: string) => {
  return { success: true, netSalary: 0 };
};

export const ApplyPayrollPolicy = (policyId: string, payrollId: string) => {
  toast({ title: 'Policy Applied', description: 'Payroll policy has been applied.' });
  return { success: true };
};

export const GetMonthlyPayrollSummary = (month: number, year: number) => {
  return { success: true, summary: {} };
};

export const GetEmployeePayrollHistory = (employeeId: string) => {
  return { success: true, history: [] };
};

export const GetBonusEligibleEmployees = (month: number, year: number) => {
  return { success: true, employees: [] };
};

export const UpdateSalaryType = (employeeId: string, salaryTypeId: string) => {
  toast({ title: 'Salary Type Updated', description: 'Salary type has been updated.' });
  return { success: true };
};

export const GetPayrollByDepartment = (departmentId: string, month: number, year: number) => {
  return { success: true, payroll: [] };
};

export const ValidateAttendanceBeforePayroll = (payrollPeriodId?: string) => {
  return { success: true, validation: [] };
};

export const SyncAttendanceToPayroll = (syncDate?: string) => {
  toast({ title: 'Attendance Synced', description: 'Attendance has been synced to payroll.' });
  return { success: true };
};

export const SyncApprovedPermissionsToPayroll = (payrollPeriodId: string) => {
  toast({ title: 'Permissions Synced', description: 'Approved permissions have been synced to payroll.' });
  return { success: true };
};

export const ConfigurePayGrades = (gradeName?: string | any, minSalary?: number, maxSalary?: number) => {
  toast({ title: 'Pay Grade Configured', description: 'Pay grade has been configured.' });
  return { success: true };
};

export const ConfigureShiftAllowances = (shiftType?: string | any, allowanceName?: string, amount?: number) => {
  toast({ title: 'Allowance Configured', description: 'Shift allowance has been configured.' });
  return { success: true };
};

export const EnableMultiCurrencyPayroll = (currencyCode: string, exchangeRate: number) => {
  toast({ title: 'Currency Enabled', description: 'Multi-currency payroll has been enabled.' });
  return { success: true };
};

export const ManageTaxRules = (taxRuleName?: string | any, countryCode?: string, rate?: number, exemption?: number) => {
  toast({ title: 'Tax Rules Managed', description: 'Tax rules have been managed.' });
  return { success: true };
};

export const ApprovePayrollConfigChanges = (configId: string, approverId: string, status: string) => {
  toast({ title: 'Configuration Approved', description: 'Payroll configuration changes have been approved.' });
  return { success: true };
};

export const ConfigureSigningBonus = (employeeId: string, bonusAmount: number, effectiveDate: string) => {
  toast({ title: 'Signing Bonus Configured', description: 'Signing bonus has been configured.' });
  return { success: true };
};

export const ConfigureTerminationBenefits = (employeeId: string, compensationAmount: number, effectiveDate: string, reason: string) => {
  toast({ title: 'Termination Benefits Configured', description: 'Termination benefits have been configured.' });
  return { success: true };
};

export const ConfigureInsuranceBrackets = (insuranceType: string, minSalary: number, maxSalary: number, employeeContribution: number, employerContribution: number) => {
  toast({ title: 'Insurance Brackets Configured', description: 'Insurance brackets have been configured.' });
  return { success: true };
};

export const ConfigurePayrollPolicies = (policyType?: string | any, policyDetails?: string, createdBy?: string) => {
  toast({ title: 'Payroll Policies Configured', description: 'Payroll policies have been configured.' });
  return { success: true };
};

export const DefinePayGrades = (gradeName: string, minSalary: number, maxSalary: number, createdBy: string) => {
  toast({ title: 'Pay Grades Defined', description: 'Pay grades have been defined.' });
  return { success: true };
};

export const ConfigureEscalationWorkflow = (thresholdAmount: number, approverRole: string, createdBy: string) => {
  toast({ title: 'Workflow Configured', description: 'Escalation workflow has been configured.' });
  return { success: true };
};

export const DefinePayType = (employeeId: string, payType: string, effectiveDate: string) => {
  toast({ title: 'Pay Type Defined', description: 'Pay type has been defined.' });
  return { success: true };
};

export const ConfigureOvertimeRules = (dayType?: string | any, multiplier?: number, createdBy?: string) => {
  toast({ title: 'Overtime Rules Configured', description: 'Overtime rules have been configured.' });
  return { success: true };
};

export const ConfigureShiftAllowance = (shiftType: string, allowanceAmount: number, createdBy: string) => {
  toast({ title: 'Shift Allowance Configured', description: 'Shift allowance has been configured.' });
  return { success: true };
};

export const ConfigureSigningBonusPolicy = (bonusType: string, amount: number, eligibilityCriteria: string) => {
  toast({ title: 'Signing Bonus Policy Configured', description: 'Signing bonus policy has been configured.' });
  return { success: true };
};

export const GenerateTaxStatement = (employeeId: string, taxYear: number) => {
  toast({ title: 'Tax Statement Generating', description: 'Tax statement is being generated.' });
  return { success: true };
};

export const ApprovePayrollConfiguration = (configId: string, approvedBy: string) => {
  toast({ title: 'Configuration Approved', description: 'Payroll configuration has been approved.' });
  return { success: true };
};

export const ModifyPastPayroll = (payrollRunId: string, employeeId: string, fieldName: string, newValue: number, modifiedBy: string) => {
  toast({ title: 'Payroll Modified', description: 'Past payroll has been modified.' });
  return { success: true };
};

// =============================================
// EMPLOYEE PROCEDURES
// =============================================

export const SubmitLeaveRequest = (employeeId?: string | any, leaveTypeId?: string, startDate?: string, endDate?: string, reason?: string) => {
  toast({ title: 'Leave Request Submitted', description: 'Your leave request has been submitted for approval.' });
  return { success: true, id: `leave_${Date.now()}` };
};

export const GetLeaveBalance = (employeeId: string) => {
  return { success: true, balance: leaveBalances };
};

export const RecordAttendance = (employeeId: string, shiftId: string, entryTime: string, exitTime: string) => {
  toast({ title: 'Attendance Recorded', description: 'Attendance has been recorded successfully.' });
  return { success: true };
};

export const SubmitReimbursement = (employeeId: string, expenseType: string, amount: number | string) => {
  toast({ title: 'Reimbursement Submitted', description: 'Reimbursement claim has been submitted.' });
  return { success: true };
};

export const AddEmployeeSkill = (employeeId: string, skillName: string) => {
  toast({ title: 'Skill Added', description: 'Skill has been added to your profile.' });
  return { success: true };
};

export const ViewAssignedShifts = (employeeId: string) => {
  return { success: true, shifts: shiftAssignments.filter(s => s.employeeId === employeeId) };
};

export const ViewMyContracts = (employeeId: string) => {
  return { success: true, contracts: contracts };
};

export const ViewMyPayroll = (employeeId: string) => {
  return { success: true, payroll: payrollRecords };
};

export const UpdatePersonalDetails = (employeeId: string, phone: string, address: string) => {
  toast({ title: 'Details Updated', description: 'Personal details have been updated.' });
  return { success: true };
};

export const ViewMyMissions = (employeeId: string) => {
  return { success: true, missions: missions };
};

export const ViewEmployeeProfile = (employeeId: string) => {
  return { success: true, profile: profiles.find(p => p.id === employeeId) };
};

export const UpdateContactInformation = (employeeId: string, requestType: string, newValue: string) => {
  toast({ title: 'Contact Information Updated', description: 'Contact information has been updated.' });
  return { success: true };
};

export const ViewEmploymentTimeline = (employeeId: string) => {
  return { success: true, timeline: [] };
};

export const UpdateEmergencyContact = (employeeId: string, contactName: string, relation: string, phone: string) => {
  toast({ title: 'Emergency Contact Updated', description: 'Emergency contact has been updated.' });
  return { success: true };
};

export const RequestHRDocument = (employeeId: string, documentType: string) => {
  toast({ title: 'Document Requested', description: 'HR document request has been submitted.' });
  return { success: true };
};

export const NotifyProfileUpdate = (employeeId: string, notificationType: string) => {
  return { success: true };
};

export const LogFlexibleAttendance = (employeeId: string, date: string, checkIn: string, checkOut: string) => {
  toast({ title: 'Flexible Attendance Logged', description: 'Flexible attendance has been logged.' });
  return { success: true };
};

export const NotifyMissedPunch = (employeeId: string, date: string) => {
  return { success: true };
};

export const RecordMultiplePunches = (employeeId: string, clockInOutTime: string, type: string) => {
  toast({ title: 'Punch Recorded', description: 'Multiple punch has been recorded.' });
  return { success: true };
};

export const SubmitCorrectionRequest = (employeeId: string, date?: string, correctionType?: string, reason?: string) => {
  toast({ title: 'Correction Request Submitted', description: 'Attendance correction request has been submitted.' });
  return { success: true };
};

export const ViewRequestStatus = (employeeId?: string) => {
  return { success: true, requests: correctionRequests };
};

export const AttachLeaveDocuments = (leaveRequestId: string, filePath?: string | any) => {
  toast({ title: 'Documents Attached', description: 'Documents have been attached to leave request.' });
  return { success: true };
};

export const ModifyLeaveRequest = (leaveRequestId: string, startDate?: string, endDate?: string, reason?: string) => {
  toast({ title: 'Leave Request Modified', description: 'Leave request has been modified.' });
  return { success: true };
};

export const CancelLeaveRequest = (leaveRequestId: string) => {
  toast({ title: 'Leave Request Cancelled', description: 'Leave request has been cancelled.' });
  return { success: true };
};

export const ViewLeaveBalance = (employeeId: string) => {
  return { success: true, balance: leaveBalances };
};

export const ViewLeaveHistory = (employeeId: string) => {
  return { success: true, history: leaveRequests };
};

export const SubmitLeaveAfterAbsence = (employeeId: string, leaveTypeId: string, startDate: string, endDate: string, reason: string) => {
  toast({ title: 'Late Leave Request Submitted', description: 'Leave request after absence has been submitted.' });
  return { success: true };
};

export const NotifyLeaveStatusChange = (employeeId: string, requestId: string, status: string) => {
  return { success: true };
};

// =============================================
// ADDITIONAL OPERATIONS
// =============================================

export const AddDepartment = (departmentName?: string, purpose?: string, departmentHeadId?: string) => {
  toast({ title: 'Department Created', description: 'New department has been successfully created.' });
  return { success: true, id: `dept_${Date.now()}` };
};

export const EditDepartment = (departmentId: string, departmentName?: string, purpose?: string) => {
  toast({ title: 'Department Updated', description: 'Department information has been successfully updated.' });
  return { success: true };
};

export const DeleteDepartment = (departmentId: string) => {
  toast({ title: 'Department Deleted', description: 'Department has been removed from the system.', variant: 'destructive' });
  return { success: true };
};

export const AddPosition = (positionTitle: string, responsibilities: string, status: string) => {
  toast({ title: 'Position Created', description: 'New position has been successfully created.' });
  return { success: true, id: `pos_${Date.now()}` };
};

export const EditPosition = (positionId: string, positionTitle: string, responsibilities: string, status: string) => {
  toast({ title: 'Position Updated', description: 'Position information has been successfully updated.' });
  return { success: true };
};

export const DeletePosition = (positionId: string) => {
  toast({ title: 'Position Deleted', description: 'Position has been removed from the system.', variant: 'destructive' });
  return { success: true };
};

export const AddAttendanceRecord = (employeeId?: string, shiftId?: string, entryTime?: string, exitTime?: string, reason?: string) => {
  toast({ title: 'Attendance Recorded', description: 'Attendance record has been successfully added.' });
  return { success: true, id: `att_${Date.now()}` };
};

export const EditAttendanceRecord = (attendanceId: string, entryTime?: string, exitTime?: string) => {
  toast({ title: 'Attendance Updated', description: 'Attendance record has been successfully updated.' });
  return { success: true };
};

export const AddShift = (data?: any) => {
  toast({ title: 'Shift Created', description: 'New shift schedule has been successfully created.' });
  return { success: true, id: `shift_${Date.now()}` };
};

export const ReassignShift = (employeeId: string, oldShiftId: string, newShiftId: string, effectiveDate: string) => {
  toast({ title: 'Shift Reassigned', description: 'Shift has been reassigned successfully.' });
  return { success: true };
};

export const AddException = (exceptionName: string, category: string, exceptionDate: string, status: string) => {
  toast({ title: 'Exception Added', description: 'Exception has been added successfully.' });
  return { success: true };
};

export const RejectLeaveRequest = (leaveRequestId: string, approverId?: string, reason?: string) => {
  toast({ title: 'Leave Rejected', description: reason || 'The leave request has been rejected.', variant: 'destructive' });
  return { success: true };
};

export const ReviewLeaveRequest = (requestId: string) => {
  return { success: true, request: leaveRequests.find(r => r.id === requestId) };
};

export const DelegateLeaveApproval = (requestId: string, newApproverId: string) => {
  toast({ title: 'Approval Delegated', description: 'Leave approval has been delegated.' });
  return { success: true };
};

export const FlagIrregularLeave = (employeeId: string, pattern: string) => {
  toast({ title: 'Leave Pattern Flagged', description: 'Irregular leave pattern has been flagged.' });
  return { success: true };
};

export const SyncLeaveToPayroll = () => {
  toast({ title: 'Leave Synced', description: 'Leave data has been synced to payroll.' });
  return { success: true };
};

export const CreateMission = (data?: any) => {
  toast({ title: 'Mission Created', description: 'New mission has been successfully created.' });
  return { success: true, id: `mission_${Date.now()}` };
};

export const UpdateMission = (missionId: string, data: any) => {
  toast({ title: 'Mission Updated', description: 'Mission details have been successfully updated.' });
  return { success: true };
};

export const ApproveMission = (missionId: string) => {
  toast({ title: 'Mission Approved', description: 'The mission has been approved successfully.' });
  return { success: true };
};

export const RejectMission = (missionId: string, reason?: string) => {
  toast({ title: 'Mission Rejected', description: reason || 'The mission has been rejected.', variant: 'destructive' });
  return { success: true };
};

export const CompleteMissionTodo = (todoId: string) => {
  toast({ title: 'Task Completed', description: 'Mission task has been marked as completed.' });
  return { success: true };
};

export const AddMissionTodo = (missionId: string, title: string, description: string, dueDate: string) => {
  toast({ title: 'Task Added', description: 'New task has been added to the mission.' });
  return { success: true, id: `todo_${Date.now()}` };
};

export const AddMissionTeamMember = (missionId: string, employeeId: string, role: string) => {
  toast({ title: 'Team Member Added', description: 'Team member has been added to the mission.' });
  return { success: true };
};

export const MarkNotificationRead = (notificationId: string, employeeId?: string) => {
  return { success: true };
};

export const MarkAllNotificationsRead = (employeeId?: string) => {
  toast({ title: 'All Notifications Read', description: 'All notifications have been marked as read.' });
  return { success: true };
};

export const DeleteNotification = (notificationId: string, employeeId: string) => {
  toast({ title: 'Notification Deleted', description: 'Notification has been removed.' });
  return { success: true };
};

export const GenerateReport = (reportType: string, startDate?: string, endDate?: string) => {
  toast({ title: 'Generating Report', description: `${reportType} report is being generated.` });
  return { success: true, reportId: `report_${Date.now()}` };
};

export const ExportReport = (reportId: string, format: string) => {
  toast({ title: 'Exporting Report', description: `Report is being exported as ${format.toUpperCase()}.` });
  return { success: true };
};

export const UpdateProfile = (employeeId?: string | any, phone?: string, address?: string, biography?: string) => {
  toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
  return { success: true };
};

export const UploadProfilePicture = (employeeId?: string | any, pictureURL?: string) => {
  toast({ title: 'Photo Uploaded', description: 'Your profile picture has been updated.' });
  return { success: true, url: pictureURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` };
};

export const UpdateSettings = (settingName?: string | any, settingValue?: boolean) => {
  toast({ title: 'Settings Updated', description: 'Your settings have been successfully saved.' });
  return { success: true };
};

export const ResetSettings = () => {
  toast({ title: 'Settings Reset', description: 'Settings have been reset to defaults.', variant: 'destructive' });
  return { success: true };
};

export const SearchEmployees = (searchQuery: string) => {
  return { success: true, employees: profiles.filter(p => 
    p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )};
};

export const FilterData = (tableName: string, filterField: string, filterValue: string) => {
  return { success: true, data: [] };
};

export const ClockIn = (employeeId?: string, shiftId?: string) => {
  toast({ title: 'Clocked In', description: `Clocked in successfully at ${new Date().toLocaleTimeString()}.` });
  return { success: true };
};

export const ClockOut = (employeeId?: string) => {
  toast({ title: 'Clocked Out', description: `Clocked out successfully at ${new Date().toLocaleTimeString()}.` });
  return { success: true };
};

export const DeleteEmployee = (employeeId: string) => {
  toast({ title: 'Employee Deactivated', description: 'Employee has been deactivated successfully.', variant: 'destructive' });
  return { success: true };
};

export const ApproveCorrectionRequest = (requestId: string, approverId: string) => {
  toast({ title: 'Request Approved', description: 'Correction request has been approved.' });
  return { success: true };
};

export const SubmitReimbursementClaim = (employeeId: string, claimType: string, amount: number, description: string) => {
  toast({ title: 'Reimbursement Submitted', description: 'Reimbursement claim has been submitted.' });
  return { success: true, id: `reimb_${Date.now()}` };
};

export const AttachReimbursementFile = (reimbursementId: string, filePath: string, fileName: string) => {
  toast({ title: 'File Attached', description: 'File has been attached to reimbursement.' });
  return { success: true };
};

export const ProcessPayroll = (startDate?: string, endDate?: string) => {
  toast({ title: 'Processing Payroll', description: 'Payroll is being processed.' });
  return { success: true };
};

export const ApprovePayroll = (payrollId: string) => {
  toast({ title: 'Payroll Approved', description: 'Payroll record has been approved for payment.' });
  return { success: true };
};

export const GeneratePayslip = (payrollId: string) => {
  toast({ title: 'Payslip Generated', description: 'Payslip has been generated.' });
  return { success: true };
};

export const AddAllowance = (payrollId: string, employeeId: string, allowanceType: string, amount: number, currency: string) => {
  toast({ title: 'Allowance Added', description: 'Employee allowance has been successfully added.' });
  return { success: true, id: `allow_${Date.now()}` };
};

export const AddDeduction = (payrollId: string, employeeId: string, deductionType: string, amount: number, currency: string) => {
  toast({ title: 'Deduction Added', description: 'Employee deduction has been successfully added.' });
  return { success: true, id: `deduct_${Date.now()}` };
};

export const RequestReplacement = (employeeId: string, shiftDate: string, reason: string) => {
  toast({ title: 'Replacement Requested', description: 'Shift replacement request has been submitted.' });
  return { success: true };
};

export const ViewTeamAttendance = (managerId: string, startDate: string, endDate: string) => {
  return { success: true, attendance: attendanceRecords };
};

export const ReviewMissedPunches = (managerId: string, attendanceDate: string) => {
  return { success: true, missedPunches: [] };
};

export const ViewTeamProfiles = (managerId: string) => {
  return { success: true, profiles: profiles.filter(p => p.managerId === managerId) };
};

export const GetTeamSummary = (managerId: string) => {
  return { success: true, summary: {} };
};

export const FilterTeamProfiles = (managerId: string, filterField: string, filterValue: string) => {
  return { success: true, profiles: [] };
};

export const AddManagerNotes = (employeeId: string, noteOrManagerId: string, noteContentOrIsPrivate?: string | boolean, createdAtOrNote?: string) => {
  toast({ title: 'Note Added', description: 'Manager note has been added.' });
  return { success: true, id: `note_${Date.now()}` };
};

export const ViewDepartmentSummary = (departmentId: string) => {
  return { success: true, summary: {} };
};

export const GetTeamStatistics = (managerId: string) => {
  return { success: true, stats: {} };
};

export const LinkVacationToEmployee = (vacationPackageId: string, employeeId: string) => {
  toast({ title: 'Vacation Linked', description: 'Vacation package has been linked.' });
  return { success: true };
};

export const SubmitTimeRequest = (employeeId: string, requestType: string, requestDate: string, durationMinutes: number, reason: string) => {
  toast({ title: 'Time Request Submitted', description: 'Time request has been submitted.' });
  return { success: true, id: `time_${Date.now()}` };
};

export const ApproveTimeRequest = (requestId: number, approverId: string, comments: string) => {
  toast({ title: 'Request Approved', description: 'Time request has been approved.' });
  return { success: true };
};

export const RejectTimeRequest = (requestId: string, approverId: string, comments: string) => {
  toast({ title: 'Request Rejected', description: 'Time request has been rejected.', variant: 'destructive' });
  return { success: true };
};

export const RemoveRole = (employeeId: string, roleId: string) => {
  toast({ title: 'Role Removed', description: 'Role has been removed from employee.' });
  return { success: true };
};

export const SendTeamNotification = (managerId: string, message: string, urgency: string) => {
  toast({ title: 'Notification Sent', description: 'Team notification has been sent.' });
  return { success: true };
};

export const GetPendingLeaveRequests = (managerId: string) => {
  return { success: true, requests: leaveRequests.filter(r => r.status === 'PENDING') };
};

export const CreateCurrency = (currencyCode: string, currencyName: string, exchangeRate: number) => {
  toast({ title: 'Currency Created', description: 'Currency has been created.' });
  return { success: true };
};

export const CreatePayrollPeriod = (payrollId: string, startDate: string, endDate: string, status: string) => {
  toast({ title: 'Payroll Period Created', description: 'Payroll period has been created.' });
  return { success: true };
};

export const AddHoliday = (data?: any) => {
  toast({ title: 'Holiday Added', description: 'New holiday has been added to the calendar.' });
  return { success: true, id: `holiday_${Date.now()}` };
};

// Backwards compatibility - keep old names as aliases
export const mockAddEmployee = AddEmployee;
export const mockUpdateEmployeeInfo = UpdateEmployeeInfo;
export const mockViewEmployeeInfo = ViewEmployeeInfo;
export const mockDeleteEmployee = DeleteEmployee;
export const mockAddDepartment = AddDepartment;
export const mockEditDepartment = EditDepartment;
export const mockDeleteDepartment = DeleteDepartment;
export const mockAddPosition = AddPosition;
export const mockEditPosition = EditPosition;
export const mockDeletePosition = DeletePosition;
export const mockAddAttendanceRecord = AddAttendanceRecord;
export const mockEditAttendanceRecord = EditAttendanceRecord;
export const mockAddShift = AddShift;
export const mockAddHoliday = AddHoliday;
export const mockApproveLeaveRequest = ApproveLeaveRequest;
export const mockRejectLeaveRequest = RejectLeaveRequest;
export const mockCancelLeaveRequest = CancelLeaveRequest;
export const mockRequestLeave = SubmitLeaveRequest;
export const mockReviewLeaveRequest = ReviewLeaveRequest;
export const mockDelegateLeaveApproval = DelegateLeaveApproval;
export const mockFlagIrregularLeave = FlagIrregularLeave;
export const mockAssignShift = AssignShiftToEmployee;
export const mockReassignShift = ReassignShift;
export const mockRequestReplacement = RequestReplacement;
export const mockViewTeamAttendance = ViewTeamAttendance;
export const mockReviewMissedPunches = ReviewMissedPunches;
export const mockApproveTimeRequest = ApproveTimeRequest;
export const mockRecordManualAttendance = AddAttendanceRecord;
export const mockViewTeamProfiles = ViewTeamProfiles;
export const mockGetTeamSummary = GetTeamSummary;
export const mockFilterTeamProfiles = FilterTeamProfiles;
export const mockViewTeamCertifications = () => ({ success: true, certifications: [] });
export const mockAddManagerNotes = AddManagerNotes;
export const mockViewDepartmentSummary = ViewDepartmentSummary;
export const mockGetTeamStatistics = GetTeamStatistics;
export const mockSubmitLeaveRequest = SubmitLeaveRequest;
export const mockModifyLeaveRequest = ModifyLeaveRequest;
export const mockAttachLeaveDocuments = AttachLeaveDocuments;
export const mockViewRequestStatus = ViewRequestStatus;
export const mockSubmitCorrectionRequest = SubmitCorrectionRequest;
export const mockRecordMultiplePunches = RecordMultiplePunches;
export const mockSubmitReimbursement = SubmitReimbursement;
export const mockProcessPayroll = ProcessPayroll;
export const mockApprovePayroll = ApprovePayroll;
export const mockGeneratePayslip = GeneratePayslip;
export const mockAddAllowance = AddAllowance;
export const mockAddDeduction = AddDeduction;
export const mockCreateMission = CreateMission;
export const mockUpdateMission = UpdateMission;
export const mockApproveMission = ApproveMission;
export const mockRejectMission = RejectMission;
export const mockCompleteMissionTodo = CompleteMissionTodo;
export const mockAddMissionTodo = AddMissionTodo;
export const mockMarkNotificationRead = MarkNotificationRead;
export const mockMarkAllNotificationsRead = MarkAllNotificationsRead;
export const mockDeleteNotification = DeleteNotification;
export const mockGenerateReport = GenerateReport;
export const mockExportReport = ExportReport;
export const mockUpdateProfile = UpdateProfile;
export const mockChangePassword = (data?: any) => {
  toast({ title: 'Password Changed', description: 'Your password has been successfully changed.' });
  return { success: true };
};
export const mockUploadProfilePicture = UploadProfilePicture;
export const mockUpdateSettings = UpdateSettings;
export const mockResetSettings = ResetSettings;
export const mockValidateAttendanceBeforePayroll = ValidateAttendanceBeforePayroll;
export const mockSyncAttendanceToPayroll = SyncAttendanceToPayroll;
export const mockGeneratePayroll = GeneratePayroll;
export const mockAssignShiftToEmployee = AssignShiftToEmployee;
export const mockAssignShiftToDepartment = AssignShiftToDepartment;
export const mockAssignCustomShift = AssignCustomShift;
export const mockSyncOfflineAttendance = SyncOfflineAttendance;
export const mockApplyHolidayOverrides = ApplyHolidayOverrides;

// Additional mock* aliases for missing exports
export const mockClockIn = ClockIn;
export const mockClockOut = ClockOut;
export const mockCreateContract = CreateContract;
export const mockRenewContract = RenewContract;
export const mockVerifyMedicalLeave = VerifyMedicalLeave;
export const mockFinalizeLeaveRequest = FinalizeLeaveRequest;
export const mockManageLeaveTypes = ManageLeaveTypes;
export const mockConfigureLeaveEligibility = ConfigureLeaveEligibility;
export const mockConfigureLeavePolicies = ConfigureLeavePolicies;
export const mockAssignLeaveEntitlement = AssignLeaveEntitlement;
export const mockProcessLeaveCarryForward = ProcessLeaveCarryForward;
export const mockReviewReimbursement = ReviewReimbursement;
export const mockConfigureShiftAllowances = ConfigureShiftAllowances;
export const mockConfigureOvertimeRules = ConfigureOvertimeRules;
export const mockConfigurePayGrades = ConfigurePayGrades;
export const mockAdjustPayrollItem = AdjustPayrollItem;
export const mockManageTaxRules = ManageTaxRules;
export const mockConfigurePayrollPolicies = ConfigurePayrollPolicies;

// ============================================================
// RECRUITMENT & HIRING MANAGEMENT
// ============================================================

export const CreateJobPosting = async (
  title: string,
  description: string,
  departmentId: string,
  requirements: string,
  responsibilities: string,
  salaryRange: string,
  employmentType: string,
  experienceLevel: string,
  location: string
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Job posting created:', title);
  return { success: true };
};

export const SubmitJobApplication = async (
  jobId: string,
  applicantName: string,
  applicantEmail: string,
  applicantPhone: string,
  cvUrl: string,
  coverLetter?: string
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Application submitted:', applicantName);
  return { success: true };
};

export const UpdateApplicationStatus = async (applicationId: string, status: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Application status updated:', status);
  return { success: true };
};

export const ScheduleInterview = async (
  applicationId: string,
  stage: string,
  scheduledDate: string,
  interviewerIds: string[]
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Interview scheduled:', stage);
  return { success: true };
};

export const UpdateInterviewResult = async (
  interviewId: string,
  result: string,
  feedback?: string,
  notes?: string
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Interview result updated:', result);
  return { success: true };
};

export const CreateJobOffer = async (
  applicationId: string,
  jobId: string,
  salary: number,
  startDate: string,
  benefits: string,
  expiryDate: string,
  termsConditions?: string
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Job offer created');
  return { success: true };
};

export const RescindOffer = async (offerId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Offer rescinded:', offerId);
  return { success: true };
};

export const WithdrawApplication = async (applicationId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Application withdrawn:', applicationId);
  return { success: true };
};
