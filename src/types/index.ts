export interface Contract {
    contract_id?: number;
    type?: string | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    current_state?: string | undefined;
    consultantContract?: ConsultantContract | undefined;
    employees?: Employee[];
    fullTimeContract?: FullTimeContract | undefined;
    internshipContract?: InternshipContract | undefined;
    partTimeContract?: PartTimeContract | undefined;
    terminations?: Termination[];
}

export interface ConsultantContract {
    contract_id?: number;
    project_scope?: string | undefined;
    fees?: number | undefined;
    payment_schedule?: string | undefined;
    contract?: Contract;
}

export interface Employee {
    employee_id?: number;
    first_name?: string | undefined;
    last_name?: string | undefined;
    full_name?: string | undefined;
    national_id?: string | undefined;
    date_of_birth?: Date | undefined;
    country_of_birth?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    emergency_contact_name?: string | undefined;
    emergency_contact_phone?: string | undefined;
    relationship?: string | undefined;
    biography?: string | undefined;
    profile_image?: string | undefined;
    employment_progress?: string | undefined;
    account_status?: string | undefined;
    employment_status?: string | undefined;
    hire_date?: Date | undefined;
    is_active?: boolean | undefined;
    profile_completion?: number | undefined;
    department_id?: number | undefined;
    position_id?: number | undefined;
    manager_id?: number | undefined;
    contract_id?: number | undefined;
    tax_form_id?: number | undefined;
    salary_type_id?: number | undefined;
    pay_grade?: number | undefined;
    allowanceDeductions?: AllowanceDeduction[];
    attendanceCorrectionRequestemployees?: AttendanceCorrectionRequest[];
    attendanceCorrectionRequestrecorded_byNavigations?: AttendanceCorrectionRequest[];
    attendanceLogs?: AttendanceLog[];
    attendances?: Attendance[];
    departments?: Department[];
    devices?: Device[];
    employeeHierarchyemployees?: EmployeeHierarchy[];
    employeeHierarchymanagers?: EmployeeHierarchy[];
    employee_Notifications?: Employee_Notification[];
    employee_Roles?: Employee_Role[];
    employee_Skills?: Employee_Skill[];
    hrAdministrator?: HRAdministrator | undefined;
    hrDocumentemployees?: HRDocument[];
    hrDocumentissued_byNavigations?: HRDocument[];
    inversemanager?: Employee[];
    leaveEntitlements?: LeaveEntitlement[];
    leaveRequestapproved_byNavigations?: LeaveRequest[];
    leaveRequestassigned_toNavigations?: LeaveRequest[];
    leaveRequestemployees?: LeaveRequest[];
    lineManager?: LineManager | undefined;
    managerNoteemployees?: ManagerNote[];
    managerNotemanagers?: ManagerNote[];
    missionTeams?: MissionTeam[];
    missionemployees?: Mission[];
    missionmanagers?: Mission[];
    password?: Password | undefined;
    payrollPolicies?: PayrollPolicy[];
    payrollSpecialist?: PayrollSpecialist | undefined;
    payrolls?: Payroll[];
    reimbursementapproved_byNavigations?: Reimbursement[];
    reimbursementemployees?: Reimbursement[];
    shiftAssignments?: ShiftAssignment[];
    systemAdministrator?: SystemAdministrator | undefined;
    timeRequestapproved_byNavigations?: TimeRequest[];
    timeRequestemployees?: TimeRequest[];
    contract?: Contract | undefined;
    department?: Department | undefined;
    manager?: Employee | undefined;
    pay_gradeNavigation?: PayGrade | undefined;
    position?: Position | undefined;
    salary_type?: SalaryType | undefined;
    tax_form?: TaxForm | undefined;
    exceptions?: Exception[];
    vacations?: VacationPackage[];
    verifications?: Verification[];
}

export interface AllowanceDeduction {
    adjustment_id?: number;
    payroll_id?: number;
    employee_id?: number;
    type?: string | undefined;
    amount?: number | undefined;
    currency?: string | undefined;
    duration?: number | undefined;
    timezone?: string | undefined;
    currencyNavigation?: Currency | undefined;
    employee?: Employee;
    payroll?: Payroll;
}

export interface Currency {
    currencyCode?: string;
    currencyName?: string | undefined;
    exchangeRate?: number | undefined;
    createdDate?: Date | undefined;
    lastUpdated?: Date | undefined;
    allowanceDeductions?: AllowanceDeduction[];
    missions?: Mission[];
    salaryTypes?: SalaryType[];
    taxRules?: TaxRule[];
}

export interface Mission {
    mission_id?: number;
    destination?: string | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    status?: string | undefined;
    employee_id?: number | undefined;
    manager_id?: number | undefined;
    purpose?: string | undefined;
    description?: string | undefined;
    budget?: number | undefined;
    currency?: string | undefined;
    accomodation?: string | undefined;
    transportation?: string | undefined;
    missionTasks?: MissionTask[];
    missionTeams?: MissionTeam[];
    currencyNavigation?: Currency | undefined;
    employee?: Employee | undefined;
    manager?: Employee | undefined;
}

export interface MissionTask {
    task_id?: number;
    mission_id?: number | undefined;
    title?: string | undefined;
    description?: string | undefined;
    due_date?: Date | undefined;
    completed?: boolean | undefined;
    completed_at?: Date | undefined;
    mission?: Mission | undefined;
}

export interface MissionTeam {
    mission_id?: number;
    employee_id?: number;
    role?: string | undefined;
    employee?: Employee;
    mission?: Mission;
}

export interface SalaryType {
    salary_type_id?: number;
    type?: string | undefined;
    payment_frequency?: string | undefined;
    currency?: string | undefined;
    contractSalaryType?: ContractSalaryType | undefined;
    employees?: Employee[];
    hourlySalaryType?: HourlySalaryType | undefined;
    monthlySalaryType?: MonthlySalaryType | undefined;
    currencyNavigation?: Currency | undefined;
}

export interface ContractSalaryType {
    salary_type_id?: number;
    contract_value?: number | undefined;
    installment_details?: string | undefined;
    salary_type?: SalaryType;
}

export interface HourlySalaryType {
    salary_type_id?: number;
    hourly_rate?: number | undefined;
    max_monthly_hours?: number | undefined;
    salary_type?: SalaryType;
}

export interface MonthlySalaryType {
    salary_type_id?: number;
    tax_rule?: string | undefined;
    contribution_scheme?: string | undefined;
    salary_type?: SalaryType;
}

export interface TaxRule {
    tax_rule_id?: number;
    jurisdiction?: string | undefined;
    tax_rate?: number | undefined;
    exemption_threshold?: number | undefined;
    currency?: string | undefined;
    effective_from?: Date | undefined;
    effective_to?: Date | undefined;
    currencyNavigation?: Currency | undefined;
}

export interface Payroll {
    payroll_id?: number;
    employee_id?: number | undefined;
    taxes?: number | undefined;
    period_start?: Date | undefined;
    period_end?: Date | undefined;
    base_amount?: number | undefined;
    adjustments?: number | undefined;
    contributions?: number | undefined;
    actual_pay?: number | undefined;
    net_salary?: number | undefined;
    payment_date?: Date | undefined;
    status?: string | undefined;
    allowanceDeductions?: AllowanceDeduction[];
    payrollPeriods?: PayrollPeriod[];
    payroll_Logs?: Payroll_Log[];
    employee?: Employee | undefined;
    policies?: PayrollPolicy[];
}

export interface PayrollPeriod {
    payroll_period_id?: number;
    payroll_id?: number | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    status?: string | undefined;
    payroll?: Payroll | undefined;
}

export interface Payroll_Log {
    payroll_log_id?: number;
    payroll_id?: number | undefined;
    actor?: string | undefined;
    change_date?: Date | undefined;
    modification_type?: string | undefined;
    payroll?: Payroll | undefined;
}

export interface PayrollPolicy {
    policy_id?: number;
    effective_date?: Date | undefined;
    approved_by?: number | undefined;
    type?: string | undefined;
    description?: string | undefined;
    bonusPolicy?: BonusPolicy | undefined;
    deductionPolicy?: DeductionPolicy | undefined;
    latenessPolicy?: LatenessPolicy | undefined;
    overtimePolicy?: OvertimePolicy | undefined;
    approved_byNavigation?: Employee | undefined;
    payrolls?: Payroll[];
}

export interface BonusPolicy {
    policy_id?: number;
    bonus_type?: string | undefined;
    eligibility_criteria?: string | undefined;
    policy?: PayrollPolicy;
}

export interface DeductionPolicy {
    policy_id?: number;
    deduction_reason?: string | undefined;
    calculation_mode?: string | undefined;
    policy?: PayrollPolicy;
}

export interface LatenessPolicy {
    policy_id?: number;
    grace_period_mins?: number | undefined;
    deduction_rate?: number | undefined;
    late_threshold_mins?: number | undefined;
    early_leave_mins?: number | undefined;
    penalty_type?: string | undefined;
    policy?: PayrollPolicy;
}

export interface OvertimePolicy {
    policy_id?: number;
    weekday_rate_multiplier?: number | undefined;
    weekend_rate_multiplier?: number | undefined;
    max_hours_per_month?: number | undefined;
    policy?: PayrollPolicy;
}

export interface AttendanceCorrectionRequest {
    request_id?: number;
    employee_id?: number | undefined;
    date?: Date | undefined;
    correction_type?: string | undefined;
    reason?: string | undefined;
    status?: string | undefined;
    recorded_by?: number | undefined;
    employee?: Employee | undefined;
    recorded_byNavigation?: Employee | undefined;
}

export interface AttendanceLog {
    attendance_log_id?: number;
    attendance_id?: number;
    modified_by?: number | undefined;
    old_timestamp?: Date | undefined;
    timestamp?: Date | undefined;
    new_timestamp?: Date | undefined;
    action?: string | undefined;
    attendance?: Attendance;
    modified_byNavigation?: Employee | undefined;
}

export interface Attendance {
    attendance_id?: number;
    employee_id?: number | undefined;
    shift_id?: number | undefined;
    entry_time?: Date | undefined;
    exit_time?: Date | undefined;
    duration?: number | undefined;
    login_method?: string | undefined;
    logout_method?: string | undefined;
    exception_id?: number | undefined;
    attendanceLogs?: AttendanceLog[];
    attendanceSources?: AttendanceSource[];
    employee?: Employee | undefined;
    exception?: Exception | undefined;
    shift?: ShiftSchedule | undefined;
}

export interface AttendanceSource {
    attendance_id?: number;
    device_id?: number;
    source_type?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    recorded_at?: Date | undefined;
    attendance?: Attendance;
    device?: Device;
}

export interface Device {
    device_id?: number;
    device_type?: string | undefined;
    terminal_id?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    employee_id?: number | undefined;
    attendanceSources?: AttendanceSource[];
    employee?: Employee | undefined;
}

export interface Exception {
    exception_id?: number;
    name?: string | undefined;
    category?: string | undefined;
    date?: Date | undefined;
    status?: string | undefined;
    attendances?: Attendance[];
    employees?: Employee[];
}

export interface ShiftSchedule {
    shift_id?: number;
    name?: number | undefined;
    type?: number | undefined;
    start_time?: string | undefined;
    end_time?: string | undefined;
    break_duration?: number | undefined;
    shift_date?: Date | undefined;
    status?: string | undefined;
    attendances?: Attendance[];
    shiftAssignments?: ShiftAssignment[];
    shiftCycleAssignments?: ShiftCycleAssignment[];
    nameNavigation?: ShiftName | undefined;
    typeNavigation?: ShiftType | undefined;
}

export interface ShiftAssignment {
    assignment_id?: number;
    employee_id?: number | undefined;
    shift_id?: number | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    status?: string | undefined;
    employee?: Employee | undefined;
    shift?: ShiftSchedule | undefined;
}

export interface ShiftCycleAssignment {
    cycle_id?: number;
    shift_id?: number;
    order_number?: number | undefined;
    cycle?: ShiftCycle;
    shift?: ShiftSchedule;
}

export interface ShiftCycle {
    cycle_id?: number;
    cycle_name?: string | undefined;
    description?: string | undefined;
    shiftCycleAssignments?: ShiftCycleAssignment[];
}

export interface ShiftName {
    shift_name_id?: number;
    name?: string | undefined;
    shift_type_id?: number;
    description?: string | undefined;
    shiftSchedules?: ShiftSchedule[];
    shift_type?: ShiftType;
}

export interface ShiftType {
    shift_type_id?: number;
    name?: string | undefined;
    description?: string | undefined;
    shiftNames?: ShiftName[];
    shiftSchedules?: ShiftSchedule[];
}

export interface Department {
    department_id?: number;
    department_name?: string | undefined;
    purpose?: string | undefined;
    department_head_id?: number | undefined;
    employees?: Employee[];
    department_head?: Employee | undefined;
}

export interface EmployeeHierarchy {
    employee_id?: number;
    manager_id?: number;
    hierarchy_level?: number | undefined;
    employee?: Employee;
    manager?: Employee;
}

export interface Employee_Notification {
    employee_id?: number;
    notification_id?: number;
    delivery_status?: string | undefined;
    is_read?: boolean | undefined;
    delivered_at?: Date | undefined;
    employee?: Employee;
    notification?: Notification;
}

export interface Notification {
    notification_id?: number;
    message_content?: string | undefined;
    timestamp?: Date | undefined;
    urgency?: string | undefined;
    read_status?: boolean | undefined;
    notification_type?: string | undefined;
    employee_Notifications?: Employee_Notification[];
}

export interface Employee_Role {
    employee_id?: number;
    role_id?: number;
    assigned_date?: Date | undefined;
    employee?: Employee;
    role?: Role;
}

export interface Role {
    role_id?: number;
    role_name?: string | undefined;
    purpose?: string | undefined;
    approvalWorkflowSteps?: ApprovalWorkflowStep[];
    employee_Roles?: Employee_Role[];
    rolePermissions?: RolePermission[];
}

export interface ApprovalWorkflowStep {
    workflow_id?: number;
    step_number?: number;
    role_id?: number | undefined;
    action_required?: string | undefined;
    role?: Role | undefined;
    workflow?: ApprovalWorkflow;
}

export interface ApprovalWorkflow {
    workflow_id?: number;
    workflow_type?: string | undefined;
    threshold_amount?: number | undefined;
    approver_role?: string | undefined;
    created_by?: number | undefined;
    status?: string | undefined;
    approvalWorkflowSteps?: ApprovalWorkflowStep[];
}

export interface RolePermission {
    role_id?: number;
    permission_id?: number;
    allowed_action?: string | undefined;
    permission?: Permission;
    role?: Role;
}

export interface Permission {
    permission_id?: number;
    name?: string | undefined;
    description?: string | undefined;
    rolePermissions?: RolePermission[];
}

export interface Employee_Skill {
    employee_id?: number;
    skill_id?: number;
    proficiency_level?: string | undefined;
    employee?: Employee;
    skill?: Skill;
}

export interface Skill {
    skill_id?: number;
    skill_name?: string | undefined;
    description?: string | undefined;
    employee_Skills?: Employee_Skill[];
}

export interface HRAdministrator {
    employee_id?: number;
    approval_level?: string | undefined;
    record_access_scope?: string | undefined;
    document_validation_rights?: string | undefined;
    employee?: Employee;
}

export interface HRDocument {
    document_id?: number;
    employee_id?: number | undefined;
    document_type?: string | undefined;
    title?: string | undefined;
    file_path?: string | undefined;
    issued_date?: Date | undefined;
    issued_by?: number | undefined;
    created_at?: Date | undefined;
    employee?: Employee | undefined;
    issued_byNavigation?: Employee | undefined;
}

export interface LeaveEntitlement {
    employee_id?: number;
    leave_type_id?: number;
    entitlement?: number | undefined;
    remaining?: number | undefined;
    employee?: Employee;
    leave_type?: Leave;
}

export interface Leave {
    leave_id?: number;
    leave_type?: string | undefined;
    leave_description?: string | undefined;
    holidayLeave?: HolidayLeave | undefined;
    leaveEntitlements?: LeaveEntitlement[];
    leaveRequests?: LeaveRequest[];
    probationLeave?: ProbationLeave | undefined;
    sickLeave?: SickLeave | undefined;
    vacationLeave?: VacationLeave | undefined;
}

export interface HolidayLeave {
    leave_id?: number;
    holiday_name?: string | undefined;
    official_recognition?: boolean | undefined;
    regional_scope?: string | undefined;
    leave?: Leave;
}

export interface LeaveRequest {
    request_id?: number;
    employee_id?: number | undefined;
    leave_id?: number | undefined;
    assigned_to?: number | undefined;
    justification?: string | undefined;
    duration?: number | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    submitted_at?: Date | undefined;
    approval_timing?: Date | undefined;
    approved_by?: number | undefined;
    status?: string | undefined;
    leaveDocuments?: LeaveDocument[];
    approved_byNavigation?: Employee | undefined;
    assigned_toNavigation?: Employee | undefined;
    employee?: Employee | undefined;
    leave?: Leave | undefined;
}

export interface LeaveDocument {
    document_id?: number;
    leave_request_id?: number | undefined;
    file_path?: string | undefined;
    uploaded_at?: Date | undefined;
    leave_request?: LeaveRequest | undefined;
}

export interface ProbationLeave {
    leave_id?: number;
    eligibility_start_date?: Date | undefined;
    probation_period?: number | undefined;
    leave?: Leave;
}

export interface SickLeave {
    leave_id?: number;
    medical_cert_required?: boolean | undefined;
    physician_id?: number | undefined;
    leave?: Leave;
}

export interface VacationLeave {
    leave_id?: number;
    carry_over_days?: number | undefined;
    approving_manager?: number | undefined;
    leave?: Leave;
}

export interface LineManager {
    employee_id?: number;
    team_size?: number | undefined;
    supervised_departments?: string | undefined;
    approval_limit?: number | undefined;
    employee?: Employee;
}

export interface ManagerNote {
    note_id?: number;
    employee_id?: number | undefined;
    manager_id?: number | undefined;
    note_content?: string | undefined;
    created_at?: Date | undefined;
    employee?: Employee | undefined;
    manager?: Employee | undefined;
}

export interface Password {
    employee_id?: number;
    password?: string | undefined;
    reset_on?: Date | undefined;
    employee?: Employee;
}

export interface PayrollSpecialist {
    employee_id?: number;
    assigned_region?: string | undefined;
    processing_frequency?: string | undefined;
    last_processed_period?: Date | undefined;
    employee?: Employee;
}

export interface Reimbursement {
    reimbursement_id?: number;
    type?: string | undefined;
    claim_type?: string | undefined;
    approval_date?: Date | undefined;
    current_status?: string | undefined;
    employee_id?: number | undefined;
    approved_by?: number | undefined;
    amount?: number | undefined;
    description?: string | undefined;
    submitted_at?: Date | undefined;
    reimbursementAttachments?: ReimbursementAttachment[];
    approved_byNavigation?: Employee | undefined;
    employee?: Employee | undefined;
}

export interface ReimbursementAttachment {
    attachment_id?: number;
    reimbursement_id?: number | undefined;
    file_path?: string | undefined;
    file_name?: string | undefined;
    uploaded_at?: Date | undefined;
    reimbursement?: Reimbursement | undefined;
}

export interface SystemAdministrator {
    employee_id?: number;
    system_privilege_level?: string | undefined;
    configurable_fields?: string | undefined;
    audit_visibility_scope?: string | undefined;
    employee?: Employee;
}

export interface TimeRequest {
    request_id?: number;
    employee_id?: number | undefined;
    request_type?: string | undefined;
    request_date?: Date | undefined;
    duration_minutes?: number | undefined;
    reason?: string | undefined;
    comments?: string | undefined;
    status?: string | undefined;
    submitted_at?: Date | undefined;
    approved_by?: number | undefined;
    approved_at?: Date | undefined;
    approved_byNavigation?: Employee | undefined;
    employee?: Employee | undefined;
}

export interface PayGrade {
    pay_grade_id?: number;
    grade_name?: string | undefined;
    min_salary?: number | undefined;
    max_salary?: number | undefined;
    employees?: Employee[];
}

export interface Position {
    position_id?: number;
    position_title?: string | undefined;
    responsibilities?: string | undefined;
    status?: string | undefined;
    employees?: Employee[];
}

export interface TaxForm {
    tax_form_id?: number;
    jurisdiction?: string | undefined;
    validity_period?: string | undefined;
    form_content?: string | undefined;
    employees?: Employee[];
}

export interface VacationPackage {
    vacation_id?: number;
    name?: string | undefined;
    description?: string | undefined;
    days_included?: number | undefined;
    eligibility_criteria?: string | undefined;
    employees?: Employee[];
}

export interface Verification {
    verification_id?: number;
    verification_type?: string | undefined;
    issuer?: string | undefined;
    issue_date?: Date | undefined;
    expiry_period?: string | undefined;
    employees?: Employee[];
}

export interface FullTimeContract {
    contract_id?: number;
    leave_entitlement?: number | undefined;
    insurance_eligibility?: boolean | undefined;
    weekly_working_hours?: number | undefined;
    contract?: Contract;
}

export interface InternshipContract {
    contract_id?: number;
    mentoring?: string | undefined;
    evaluation?: string | undefined;
    stipend_related?: string | undefined;
    contract?: Contract;
}

export interface PartTimeContract {
    contract_id?: number;
    working_hours?: number | undefined;
    hourly_rate?: number | undefined;
    contract?: Contract;
}

export interface Termination {
    termination_id?: number;
    date?: Date | undefined;
    reason?: string | undefined;
    contract_id?: number | undefined;
    contract?: Contract | undefined;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}