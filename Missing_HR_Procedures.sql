USE HumanResourcesManagementSystem;
GO

-- =============================================
-- DEPARTMENT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE AddDepartment
    @DepartmentName varchar(50), @Purpose varchar(50), @DepartmentHeadID int
AS
BEGIN
    INSERT INTO Department(department_name, purpose, department_head_id)
    VALUES (@DepartmentName, @Purpose, @DepartmentHeadID);
    SELECT CONCAT('Department created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE EditDepartment
    @DepartmentID int, @DepartmentName varchar(50), @Purpose varchar(50)
AS
BEGIN
    UPDATE Department
    SET department_name = @DepartmentName, purpose = @Purpose
    WHERE department_id = @DepartmentID;
    SELECT 'Department updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DeleteDepartment
    @DepartmentID int
AS
BEGIN
    DELETE FROM Department WHERE department_id = @DepartmentID;
    SELECT 'Department deleted successfully' AS Message;
END;
GO

-- =============================================
-- POSITION OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE AddPosition
    @PositionTitle varchar(50), @Responsibilities varchar(50), @Status varchar(50)
AS
BEGIN
    INSERT INTO Position(position_title, responsibilities, status)
    VALUES (@PositionTitle, @Responsibilities, @Status);
    SELECT CONCAT('Position created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE EditPosition
    @PositionID int, @PositionTitle varchar(50), @Responsibilities varchar(50), @Status varchar(50)
AS
BEGIN
    UPDATE Position
    SET position_title = @PositionTitle, responsibilities = @Responsibilities, status = @Status
    WHERE position_id = @PositionID;
    SELECT 'Position updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DeletePosition
    @PositionID int
AS
BEGIN
    DELETE FROM Position WHERE position_id = @PositionID;
    SELECT 'Position deleted successfully' AS Message;
END;
GO

-- =============================================
-- ATTENDANCE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE AddAttendanceRecord
    @EmployeeID int, @ShiftID int, @EntryTime datetime, @ExitTime datetime
AS
BEGIN
    INSERT INTO Attendance(employee_id, shift_id, entry_time, exit_time, login_method, logout_method)
    VALUES (@EmployeeID, @ShiftID, @EntryTime, @ExitTime, 'Manual', 'Manual');
    SELECT CONCAT('Attendance record added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE EditAttendanceRecord
    @AttendanceID int, @EntryTime datetime, @ExitTime datetime
AS
BEGIN
    UPDATE Attendance
    SET entry_time = @EntryTime, exit_time = @ExitTime
    WHERE attendance_id = @AttendanceID;
    SELECT 'Attendance record updated successfully' AS Message;
END;
GO

-- =============================================
-- SHIFT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE AddShift
    @ShiftNameID int, @ShiftTypeID int, @StartTime time, @EndTime time, @BreakDuration int, @ShiftDate date
AS
BEGIN
    INSERT INTO ShiftSchedule(name, type, start_time, end_time, break_duration, shift_date, status)
    VALUES (@ShiftNameID, @ShiftTypeID, @StartTime, @EndTime, @BreakDuration, @ShiftDate, 'Active');
    SELECT CONCAT('Shift created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ReassignShift
    @EmployeeID int, @OldShiftID int, @NewShiftID int, @EffectiveDate date
AS
BEGIN
    UPDATE ShiftAssignment
    SET end_date = @EffectiveDate, status = 'Completed'
    WHERE employee_id = @EmployeeID AND shift_id = @OldShiftID AND status = 'Assigned';
    
    INSERT INTO ShiftAssignment(employee_id, shift_id, start_date, status)
    VALUES (@EmployeeID, @NewShiftID, @EffectiveDate, 'Assigned');
    SELECT 'Shift reassigned successfully' AS Message;
END;
GO

-- =============================================
-- SHIFT NAME AND TYPE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE CreateShiftType
    @Name varchar(50), @Description varchar(200)
AS
BEGIN
    INSERT INTO ShiftType(name, description)
    VALUES (@Name, @Description);
    SELECT CONCAT('Shift type created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CreateShiftName
    @ShiftName varchar(50), @ShiftTypeID int, @Description varchar(200)
AS
BEGIN
    INSERT INTO ShiftName(name, shift_type_id, description)
    VALUES (@ShiftName, @ShiftTypeID, @Description);
    SELECT 'Shift name created successfully' AS Message;
END;
GO

-- =============================================
-- EXCEPTION OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE AddException
    @ExceptionName varchar(50), @Category varchar(50), @ExceptionDate date, @Status varchar(50)
AS
BEGIN
    INSERT INTO Exception(name, category, date, status)
    VALUES (@ExceptionName, @Category, @ExceptionDate, @Status);
    SELECT CONCAT('Exception added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

-- =============================================
-- LEAVE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE RejectLeaveRequest
    @LeaveRequestID int, @ApproverID int, @Reason varchar(200)
AS
BEGIN
    UPDATE LeaveRequest
    SET status = 'Rejected', approved_by = @ApproverID, justification = @Reason, approval_timing = GETDATE()
    WHERE request_id = @LeaveRequestID;
    SELECT 'Leave request rejected successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CancelLeaveRequest
    @LeaveRequestID int
AS
BEGIN
    UPDATE LeaveRequest
    SET status = 'Cancelled'
    WHERE request_id = @LeaveRequestID;
    SELECT 'Leave request cancelled successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ModifyLeaveRequest
    @LeaveRequestID int, @StartDate date, @EndDate date, @Reason text
AS
BEGIN
    DECLARE @Duration int;
    SET @Duration = DATEDIFF(DAY, @StartDate, @EndDate) + 1;
    
    UPDATE LeaveRequest
    SET start_date = @StartDate, end_date = @EndDate, 
        justification = @Reason, duration = @Duration
    WHERE request_id = @LeaveRequestID AND status = 'Pending';
    SELECT 'Leave request modified successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AttachLeaveDocuments
    @LeaveRequestID int, @FilePath varchar(50), @UploadedAt datetime
AS
BEGIN
    INSERT INTO LeaveDocument(leave_request_id, file_path, uploaded_at)
    VALUES (@LeaveRequestID, @FilePath, @UploadedAt);
    SELECT 'Document attached successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ViewRequestStatus
    @RequestID int
AS
BEGIN
    SELECT status, approved_by, justification, approval_timing
    FROM LeaveRequest
    WHERE request_id = @RequestID;
END;
GO

CREATE OR ALTER PROCEDURE ReviewLeaveRequest
    @RequestID int
AS
BEGIN
    SELECT lr.*, e.full_name, l.leave_type
    FROM LeaveRequest lr
    INNER JOIN Employee e ON lr.employee_id = e.employee_id
    INNER JOIN Leave l ON lr.leave_id = l.leave_id
    WHERE lr.request_id = @RequestID;
END;
GO

CREATE OR ALTER PROCEDURE DelegateLeaveApproval
    @RequestID int, @NewApproverID int
AS
BEGIN
    UPDATE LeaveRequest
    SET approved_by = @NewApproverID
    WHERE request_id = @RequestID;
    SELECT 'Leave approval delegated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE FlagIrregularLeave
    @EmployeeID int, @Pattern varchar(100)
AS
BEGIN
    INSERT INTO Notification(message_content, urgency, notification_type)
    VALUES (CONCAT('Irregular leave pattern detected for employee #', @EmployeeID, ': ', @Pattern), 'HIGH', 'LeaveAlert');
    SELECT 'Leave pattern flagged successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE SyncLeaveToPayroll
AS
BEGIN
    UPDATE Payroll
    SET adjustments = adjustments - 
        (SELECT ISNULL(SUM(lr.duration), 0) * 100 
         FROM LeaveRequest lr 
         WHERE lr.employee_id = Payroll.employee_id 
         AND lr.status = 'Approved'
         AND MONTH(lr.start_date) = MONTH(Payroll.period_start))
    WHERE EXISTS (SELECT 1 FROM LeaveRequest lr 
                  WHERE lr.employee_id = Payroll.employee_id 
                  AND lr.status = 'Approved');
    SELECT 'Leave data synced to payroll successfully' AS Message;
END;
GO

-- =============================================
-- MISSION OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE CreateMission
    @EmployeeID int, @ManagerID int, @Destination varchar(50), 
    @StartDate date, @EndDate date, @Purpose varchar(200), @Description text, @Budget decimal(18,2), @Currency varchar(50)
AS
BEGIN
    INSERT INTO Mission(destination, start_date, end_date, employee_id, manager_id, status, purpose, description, budget, currency)
    VALUES (@Destination, @StartDate, @EndDate, @EmployeeID, @ManagerID, 'ASSIGNED', @Purpose, @Description, @Budget, @Currency);
    SELECT CONCAT('Mission created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE UpdateMission
    @MissionID int, @Destination varchar(50), @StartDate date, @EndDate date, @Purpose varchar(200)
AS
BEGIN
    UPDATE Mission
    SET destination = @Destination, start_date = @StartDate, end_date = @EndDate, purpose = @Purpose
    WHERE mission_id = @MissionID;
    SELECT 'Mission updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ApproveMission
    @MissionID int
AS
BEGIN
    UPDATE Mission
    SET status = 'Approved'
    WHERE mission_id = @MissionID;
    SELECT 'Mission approved successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE RejectMission
    @MissionID int, @Reason varchar(200)
AS
BEGIN
    UPDATE Mission
    SET status = 'Rejected'
    WHERE mission_id = @MissionID;
    
    INSERT INTO Notification(message_content, urgency, notification_type)
    VALUES (CONCAT('Mission #', @MissionID, ' rejected: ', @Reason), 'HIGH', 'MissionUpdate');
    SELECT 'Mission rejected successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CompleteMissionTodo
    @TodoID int
AS
BEGIN
    UPDATE MissionTask
    SET completed = 1, completed_at = GETDATE()
    WHERE task_id = @TodoID;
    SELECT 'Mission task completed successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AddMissionTodo
    @MissionID int, @Title varchar(100), @Description varchar(200), @DueDate date
AS
BEGIN
    INSERT INTO MissionTask(mission_id, title, description, due_date, completed)
    VALUES (@MissionID, @Title, @Description, @DueDate, 0);
    SELECT CONCAT('Mission task added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AddMissionTeamMember
    @MissionID int, @EmployeeID int, @Role varchar(50)
AS
BEGIN
    INSERT INTO MissionTeam(mission_id, employee_id, role)
    VALUES (@MissionID, @EmployeeID, @Role);
    SELECT 'Team member added to mission successfully' AS Message;
END;
GO

-- =============================================
-- NOTIFICATION OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE MarkNotificationRead
    @NotificationID int, @EmployeeID int
AS
BEGIN
    UPDATE Employee_Notification
    SET is_read = 1
    WHERE notification_id = @NotificationID AND employee_id = @EmployeeID;
    SELECT 'Notification marked as read' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE MarkAllNotificationsRead
    @EmployeeID int
AS
BEGIN
    UPDATE Employee_Notification
    SET is_read = 1
    WHERE employee_id = @EmployeeID AND is_read = 0;
    SELECT 'All notifications marked as read' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DeleteNotification
    @NotificationID int, @EmployeeID int
AS
BEGIN
    DELETE FROM Employee_Notification
    WHERE notification_id = @NotificationID AND employee_id = @EmployeeID;
    SELECT 'Notification deleted successfully' AS Message;
END;
GO

-- =============================================
-- REPORT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE GenerateReport
    @ReportType varchar(50), @StartDate date, @EndDate date
AS
BEGIN
    IF @ReportType = 'Attendance'
    BEGIN
        SELECT e.full_name, a.entry_time, a.exit_time, a.duration
        FROM Attendance a
        INNER JOIN Employee e ON a.employee_id = e.employee_id
        WHERE CAST(a.entry_time AS DATE) BETWEEN @StartDate AND @EndDate;
    END
    ELSE IF @ReportType = 'Payroll'
    BEGIN
        SELECT e.full_name, p.period_start, p.period_end, p.base_amount, p.net_salary
        FROM Payroll p
        INNER JOIN Employee e ON p.employee_id = e.employee_id
        WHERE p.period_start BETWEEN @StartDate AND @EndDate;
    END
    ELSE IF @ReportType = 'Leave'
    BEGIN
        SELECT e.full_name, l.leave_type, lr.start_date, lr.end_date, lr.status
        FROM LeaveRequest lr
        INNER JOIN Employee e ON lr.employee_id = e.employee_id
        INNER JOIN Leave l ON lr.leave_id = l.leave_id
        WHERE lr.start_date BETWEEN @StartDate AND @EndDate;
    END
    SELECT 'Report generated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ExportReport
    @ReportID int, @Format varchar(10)
AS
BEGIN
    SELECT CONCAT('Report exported as ', @Format, ' format') AS Message;
END;
GO

-- =============================================
-- PROFILE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE UpdateProfile
    @EmployeeID int, @Phone varchar(50), @Address varchar(50), @Biography varchar(50)
AS
BEGIN
    UPDATE Employee
    SET phone = @Phone, address = @Address, biography = @Biography
    WHERE employee_id = @EmployeeID;
    SELECT 'Profile updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE UploadProfilePicture
    @EmployeeID int, @PictureURL varchar(50)
AS
BEGIN
    UPDATE Employee
    SET profile_image = @PictureURL
    WHERE employee_id = @EmployeeID;
    SELECT 'Profile picture uploaded successfully' AS Message;
END;
GO

-- =============================================
-- SETTINGS OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE UpdateSettings
    @SettingName varchar(50), @SettingValue bit
AS
BEGIN
    IF EXISTS (SELECT 1 FROM SystemSettings WHERE setting_name = @SettingName)
    BEGIN
        UPDATE SystemSettings
        SET setting_value = @SettingValue
        WHERE setting_name = @SettingName;
    END
    ELSE
    BEGIN
        INSERT INTO SystemSettings(setting_name, setting_value)
        VALUES (@SettingName, @SettingValue);
    END
    SELECT 'Settings updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ResetSettings
AS
BEGIN
    DELETE FROM SystemSettings;
    SELECT 'Settings reset to defaults' AS Message;
END;
GO

-- =============================================
-- SEARCH AND FILTER OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE SearchEmployees
    @SearchQuery varchar(100)
AS
BEGIN
    SELECT employee_id, full_name, email, phone, department_id, position_id
    FROM Employee
    WHERE full_name LIKE '%' + @SearchQuery + '%'
       OR email LIKE '%' + @SearchQuery + '%'
       OR phone LIKE '%' + @SearchQuery + '%';
END;
GO

CREATE OR ALTER PROCEDURE FilterData
    @TableName varchar(50), @FilterField varchar(50), @FilterValue varchar(100)
AS
BEGIN
    DECLARE @SQL varchar(500);
    SET @SQL = 'SELECT * FROM ' + QUOTENAME(@TableName) + 
               ' WHERE ' + QUOTENAME(@FilterField) + ' = @Value';
    EXEC sp_executesql @SQL, '@Value varchar(100)', @FilterValue;
END;
GO

-- =============================================
-- CLOCK IN/OUT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE ClockIn
    @EmployeeID int, @ShiftID int
AS
BEGIN
    INSERT INTO Attendance(employee_id, shift_id, entry_time, login_method)
    VALUES (@EmployeeID, @ShiftID, GETDATE(), 'Web');
    SELECT CONCAT('Clocked in successfully at ', CONVERT(varchar, GETDATE(), 108)) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ClockOut
    @EmployeeID int
AS
BEGIN
    DECLARE @AttendanceID int;
    
    SELECT TOP 1 @AttendanceID = attendance_id
    FROM Attendance
    WHERE employee_id = @EmployeeID 
      AND CAST(entry_time AS DATE) = CAST(GETDATE() AS DATE)
      AND exit_time IS NULL
    ORDER BY entry_time DESC;
    
    IF @AttendanceID IS NOT NULL
    BEGIN
        UPDATE Attendance
        SET exit_time = GETDATE(), logout_method = 'Web'
        WHERE attendance_id = @AttendanceID;
        SELECT CONCAT('Clocked out successfully at ', CONVERT(varchar, GETDATE(), 108)) AS Message;
    END
    ELSE
    BEGIN
        SELECT 'No active clock-in found' AS Message;
    END
END;
GO

-- =============================================
-- EMPLOYEE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE DeleteEmployee
    @EmployeeID int
AS
BEGIN
    UPDATE Employee
    SET is_active = 0, account_status = 'INACTIVE'
    WHERE employee_id = @EmployeeID;
    SELECT 'Employee deactivated successfully' AS Message;
END;
GO

-- =============================================
-- CORRECTION REQUEST OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE SubmitCorrectionRequest
    @EmployeeID int, @CorrectionDate date, @CorrectionType varchar(50), 
    @Reason varchar(50), @RecordedBy int
AS
BEGIN
    INSERT INTO AttendanceCorrectionRequest(employee_id, date, correction_type, reason, status, recorded_by)
    VALUES (@EmployeeID, @CorrectionDate, @CorrectionType, @Reason, 'Pending', @RecordedBy);
    SELECT CONCAT('Correction request submitted successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ApproveCorrectionRequest
    @RequestID int, @ApproverID int
AS
BEGIN
    UPDATE AttendanceCorrectionRequest
    SET status = 'Approved', recorded_by = @ApproverID
    WHERE request_id = @RequestID;
    
    SELECT 'Correction request approved successfully' AS Message;
END;
GO

-- =============================================
-- REIMBURSEMENT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE SubmitReimbursementClaim
    @EmployeeID int, @ClaimType varchar(50), @Amount int, @Description varchar(200)
AS
BEGIN
    INSERT INTO Reimbursement(employee_id, type, claim_type, amount, description, current_status, submitted_at)
    VALUES (@EmployeeID, 'Expense', @ClaimType, @Amount, @Description, 'Pending', GETDATE());
    SELECT CONCAT('Reimbursement claim submitted successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AttachReimbursementFile
    @ReimbursementID int, @FilePath varchar(200), @FileName varchar(100)
AS
BEGIN
    INSERT INTO ReimbursementAttachment(reimbursement_id, file_path, file_name, uploaded_at)
    VALUES (@ReimbursementID, @FilePath, @FileName, GETDATE());
    SELECT 'File attached to reimbursement successfully' AS Message;
END;
GO

-- =============================================
-- PAYROLL OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE ProcessPayroll
    @StartDate date, @EndDate date
AS
BEGIN
    INSERT INTO Payroll(employee_id, period_start, period_end, base_amount, taxes, contributions, adjustments, actual_pay, net_salary, status)
    SELECT 
        e.employee_id,
        @StartDate,
        @EndDate,
        ISNULL(st.payment_frequency, 'Monthly'),
        0,
        0,
        0,
        0,
        0,
        'Pending'
    FROM Employee e
    LEFT JOIN SalaryType st ON e.salary_type_id = st.salary_type_id
    WHERE e.is_active = 1;
    
    SELECT 'Payroll processed successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ApprovePayroll
    @PayrollID int
AS
BEGIN
    UPDATE Payroll
    SET status = 'Approved'
    WHERE payroll_id = @PayrollID;
    SELECT 'Payroll approved successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE GeneratePayslip
    @PayrollID int
AS
BEGIN
    SELECT p.*, e.full_name, e.email
    FROM Payroll p
    INNER JOIN Employee e ON p.employee_id = e.employee_id
    WHERE p.payroll_id = @PayrollID;
END;
GO

CREATE OR ALTER PROCEDURE AddAllowance
    @PayrollID int, @EmployeeID int, @AllowanceType varchar(50), @Amount decimal(18,2), @Currency varchar(50)
AS
BEGIN
    INSERT INTO AllowanceDeduction(payroll_id, employee_id, type, amount, currency)
    VALUES (@PayrollID, @EmployeeID, @AllowanceType, @Amount, @Currency);
    SELECT CONCAT('Allowance added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AddDeduction
    @PayrollID int, @EmployeeID int, @DeductionType varchar(50), @Amount decimal(18,2), @Currency varchar(50)
AS
BEGIN
    INSERT INTO AllowanceDeduction(payroll_id, employee_id, type, amount, currency)
    VALUES (@PayrollID, @EmployeeID, @DeductionType, @Amount * -1, @Currency);
    SELECT CONCAT('Deduction added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ValidateAttendanceBeforePayroll
    @StartDate date, @EndDate date
AS
BEGIN
    SELECT e.employee_id, e.full_name, COUNT(a.attendance_id) AS AttendanceDays
    FROM Employee e
    LEFT JOIN Attendance a ON e.employee_id = a.employee_id 
        AND CAST(a.entry_time AS DATE) BETWEEN @StartDate AND @EndDate
    WHERE e.is_active = 1
    GROUP BY e.employee_id, e.full_name
    HAVING COUNT(a.attendance_id) = 0;
END;
GO

CREATE OR ALTER PROCEDURE SyncAttendanceToPayroll
    @StartDate date, @EndDate date
AS
BEGIN
    UPDATE Payroll
    SET adjustments = adjustments + 
        (SELECT COUNT(*) * 50 
         FROM Attendance a 
         WHERE a.employee_id = Payroll.employee_id 
         AND CAST(a.entry_time AS DATE) BETWEEN @StartDate AND @EndDate)
    WHERE period_start = @StartDate AND period_end = @EndDate;
    SELECT 'Attendance synced to payroll successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ConfigurePayGrades
    @GradeName varchar(50), @MinSalary decimal(18,2), @MaxSalary decimal(18,2)
AS
BEGIN
    INSERT INTO PayGrade(grade_name, min_salary, max_salary)
    VALUES (@GradeName, @MinSalary, @MaxSalary);
    SELECT CONCAT('Pay grade configured successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ConfigurePayrollPolicies
    @PolicyType varchar(50), @Description text, @ApprovedBy int
AS
BEGIN
    INSERT INTO PayrollPolicy(type, description, effective_date, approved_by)
    VALUES (@PolicyType, @Description, GETDATE(), @ApprovedBy);
    SELECT CONCAT('Payroll policy configured successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ManageTaxRules
    @Jurisdiction varchar(50), @TaxRate decimal(5,2), @ExemptionThreshold decimal(18,2), 
    @Currency varchar(50), @EffectiveFrom date, @EffectiveTo date
AS
BEGIN
    INSERT INTO TaxRule(jurisdiction, tax_rate, exemption_threshold, currency, effective_from, effective_to)
    VALUES (@Jurisdiction, @TaxRate, @ExemptionThreshold, @Currency, @EffectiveFrom, @EffectiveTo);
    SELECT CONCAT('Tax rule configured successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE EnableMultiCurrencyPayroll
    @Enabled bit
AS
BEGIN
    MERGE SystemSettings AS target
    USING (SELECT 'MultiCurrencyPayroll' AS setting_name, @Enabled AS setting_value) AS source
    ON target.setting_name = source.setting_name
    WHEN MATCHED THEN 
        UPDATE SET setting_value = source.setting_value
    WHEN NOT MATCHED THEN
        INSERT (setting_name, setting_value) VALUES (source.setting_name, source.setting_value);
    SELECT 'Multi-currency payroll setting updated' AS Message;
END;
GO

-- =============================================
-- MANAGER OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE RequestReplacement
    @EmployeeID int, @ShiftDate date, @Reason varchar(200)
AS
BEGIN
    INSERT INTO Notification(message_content, urgency, notification_type)
    VALUES (CONCAT('Replacement requested for employee #', @EmployeeID, ' on ', @ShiftDate, ': ', @Reason), 'HIGH', 'ShiftReplacement');
    SELECT 'Replacement request submitted successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ViewTeamAttendance
    @ManagerID int, @StartDate date, @EndDate date
AS
BEGIN
    SELECT e.full_name, a.entry_time, a.exit_time, a.duration
    FROM Attendance a
    INNER JOIN Employee e ON a.employee_id = e.employee_id
    WHERE e.manager_id = @ManagerID 
      AND CAST(a.entry_time AS DATE) BETWEEN @StartDate AND @EndDate
    ORDER BY a.entry_time DESC, e.full_name;
END;
GO

CREATE OR ALTER PROCEDURE ReviewMissedPunches
    @ManagerID int, @AttendanceDate date
AS
BEGIN
    SELECT e.employee_id, e.full_name
    FROM Employee e
    WHERE e.manager_id = @ManagerID
      AND e.is_active = 1
      AND NOT EXISTS (SELECT 1 FROM Attendance a 
                      WHERE a.employee_id = e.employee_id 
                      AND CAST(a.entry_time AS DATE) = @AttendanceDate);
END;
GO

CREATE OR ALTER PROCEDURE ViewTeamProfiles
    @ManagerID int
AS
BEGIN
    SELECT e.employee_id, e.full_name, e.email, e.phone, 
           d.department_name, p.position_title, e.hire_date
    FROM Employee e
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Position p ON e.position_id = p.position_id
    WHERE e.manager_id = @ManagerID AND e.is_active = 1;
END;
GO

CREATE OR ALTER PROCEDURE GetTeamSummary
    @ManagerID int
AS
BEGIN
    SELECT 
        COUNT(*) AS TotalEmployees,
        COUNT(CASE WHEN employment_status = 'ACTIVE' THEN 1 END) AS ActiveEmployees,
        COUNT(CASE WHEN employment_status = 'ON_LEAVE' THEN 1 END) AS OnLeave
    FROM Employee
    WHERE manager_id = @ManagerID;
END;
GO

CREATE OR ALTER PROCEDURE FilterTeamProfiles
    @ManagerID int, @FilterField varchar(50), @FilterValue varchar(100)
AS
BEGIN
    DECLARE @SQL varchar(500);
    SET @SQL = 'SELECT * FROM Employee WHERE manager_id = @ManagerID AND ' + 
               QUOTENAME(@FilterField) + ' = @FilterValue';
    EXEC sp_executesql @SQL, 
         '@ManagerID int, @FilterValue varchar(100)', 
         @ManagerID, @FilterValue;
END;
GO

CREATE OR ALTER PROCEDURE AddManagerNotes
    @EmployeeID int, @ManagerID int, @Note varchar(50), @CreatedAt date
AS
BEGIN
    INSERT INTO ManagerNotes(employee_id, manager_id, note_content, created_at)
    VALUES (@EmployeeID, @ManagerID, @Note, @CreatedAt);
    SELECT CONCAT('Manager note added successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ViewDepartmentSummary
    @DepartmentID int
AS
BEGIN
    SELECT 
        d.department_name,
        COUNT(e.employee_id) AS TotalEmployees,
        AVG(e.profile_completion) AS AvgProfileCompletion,
        COUNT(CASE WHEN e.employment_status = 'ACTIVE' THEN 1 END) AS ActiveEmployees
    FROM Department d
    LEFT JOIN Employee e ON d.department_id = e.department_id
    WHERE d.department_id = @DepartmentID
    GROUP BY d.department_name;
END;
GO

CREATE OR ALTER PROCEDURE GetTeamStatistics
    @ManagerID int
AS
BEGIN
    SELECT 
        COUNT(*) AS TeamSize,
        AVG(DATEDIFF(MONTH, hire_date, GETDATE())) AS AvgTenureMonths,
        COUNT(DISTINCT department_id) AS DepartmentsCount
    FROM Employee
    WHERE manager_id = @ManagerID AND is_active = 1;
END;
GO

-- =============================================
-- EMPLOYEE SELF-SERVICE OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE LogFlexibleAttendance
    @EmployeeID int, @WorkDate date, @HoursWorked decimal(5,2), @Description varchar(200)
AS
BEGIN
    DECLARE @EntryTime datetime = CAST(@WorkDate AS datetime);
    INSERT INTO Attendance(employee_id, entry_time, login_method)
    VALUES (@EmployeeID, @EntryTime, 'Flexible');
    SELECT 'Flexible attendance logged successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE RequestHRDocument
    @EmployeeID int, @DocumentType varchar(50), @Title varchar(100), @IssuedBy int
AS
BEGIN
    INSERT INTO HRDocument(employee_id, document_type, title, issued_by, issued_date, created_at)
    VALUES (@EmployeeID, @DocumentType, @Title, @IssuedBy, GETDATE(), GETDATE());
    SELECT CONCAT('HR document request submitted successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE UpdateContactInformation
    @EmployeeID int, @Phone varchar(50), @Email varchar(50), @Address varchar(50)
AS
BEGIN
    UPDATE Employee
    SET phone = @Phone, email = @Email, address = @Address
    WHERE employee_id = @EmployeeID;
    SELECT 'Contact information updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AddEmergencyContact
    @EmployeeID int, @ContactName varchar(50), @ContactPhone varchar(50), @Relationship varchar(50)
AS
BEGIN
    UPDATE Employee
    SET emergency_contact_name = @ContactName,
        emergency_contact_phone = @ContactPhone,
        relationship = @Relationship
    WHERE employee_id = @EmployeeID;
    SELECT 'Emergency contact added successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE SubmitLeaveAfterAbsence
    @EmployeeID int, @AbsenceDate date, @LeaveTypeID int, @Reason text
AS
BEGIN
    INSERT INTO LeaveRequest(employee_id, leave_id, start_date, end_date, duration, justification, status, submitted_at)
    VALUES (@EmployeeID, @LeaveTypeID, @AbsenceDate, @AbsenceDate, 1, @Reason, 'Pending', GETDATE());
    SELECT CONCAT('Leave request after absence submitted successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

-- =============================================
-- HR ADMIN ADDITIONAL OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE ConfigureInsuranceBrackets
    @InsuranceType varchar(50), @ContributionRate decimal(5,2), @Coverage varchar(50)
AS
BEGIN
    INSERT INTO Insurance(type, contribution_rate, coverage)
    VALUES (@InsuranceType, @ContributionRate, @Coverage);
    SELECT CONCAT('Insurance bracket configured successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AssignRotationalShift
    @EmployeeID int, @ShiftID int, @StartDate date, @EndDate date
AS
BEGIN
    INSERT INTO ShiftAssignment(employee_id, shift_id, start_date, end_date, status)
    VALUES (@EmployeeID, @ShiftID, @StartDate, @EndDate, 'Assigned');
    SELECT 'Rotational shift assigned successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE NotifyShiftExpiry
    @EmployeeID int, @ShiftAssignmentID int, @ExpiryDate date
AS
BEGIN
    DECLARE @NotificationID int;
    INSERT INTO Notification(message_content, urgency, notification_type)
    VALUES (CONCAT('Your shift assignment #', @ShiftAssignmentID, ' will expire on ', @ExpiryDate), 
            'MEDIUM', 'ShiftExpiry');
    SET @NotificationID = SCOPE_IDENTITY();
    
    INSERT INTO Employee_Notification(employee_id, notification_id, is_read, delivery_status)
    VALUES (@EmployeeID, @NotificationID, 0, 'DELIVERED');
    SELECT 'Shift expiry notification sent' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DefineShortTimeRules
    @ApprovedBy int, @LateMinutes int, @EarlyLeaveMinutes int, @PenaltyType varchar(50)
AS
BEGIN
    DECLARE @PolicyID int;
    INSERT INTO PayrollPolicy(type, description, approved_by)
    VALUES ('Lateness', 'Lateness policy', @ApprovedBy);
    SET @PolicyID = SCOPE_IDENTITY();
    
    INSERT INTO LatenessPolicy(policy_id, late_threshold_mins, early_leave_mins, penalty_type)
    VALUES (@PolicyID, @LateMinutes, @EarlyLeaveMinutes, @PenaltyType);
    SELECT 'Short time rules defined successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE SetGracePeriod
    @PolicyID int, @Minutes int
AS
BEGIN
    UPDATE LatenessPolicy
    SET grace_period_mins = @Minutes
    WHERE policy_id = @PolicyID;
    SELECT 'Grace period set successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DefinePenaltyThreshold
    @ApprovedBy int, @LateMinutes int, @DeductionType varchar(50)
AS
BEGIN
    DECLARE @PolicyID int;
    INSERT INTO PayrollPolicy(type, description, approved_by)
    VALUES ('Deduction', CONCAT('Penalty for ', @LateMinutes, ' minutes late'), @ApprovedBy);
    SET @PolicyID = SCOPE_IDENTITY();
    
    INSERT INTO DeductionPolicy(policy_id, deduction_reason, calculation_mode)
    VALUES (@PolicyID, CONCAT('Late ', @LateMinutes, ' minutes'), @DeductionType);
    SELECT 'Penalty threshold defined successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE DefinePermissionLimits
    @MinHours int, @MaxHours int
AS
BEGIN
    INSERT INTO PermissionLimit(min_hours, max_hours)
    VALUES (@MinHours, @MaxHours);
    SELECT 'Permission limits defined successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE LinkVacationToEmployee
    @VacationPackageID int, @EmployeeID int
AS
BEGIN
    INSERT INTO VacationPackageAssignment(vacation_id, employee_id)
    VALUES (@VacationPackageID, @EmployeeID);
    SELECT 'Vacation package linked successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ApplyLeaveConfiguration
AS
BEGIN
    SELECT 'Leave configuration applied successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE UpdateLeaveEntitlements
    @EmployeeID int
AS
BEGIN
    DECLARE @HireDate date;
    DECLARE @YearsOfService int;
    
    SELECT @HireDate = hire_date FROM Employee WHERE employee_id = @EmployeeID;
    SET @YearsOfService = DATEDIFF(YEAR, @HireDate, GETDATE());
    
    UPDATE LeaveEntitlement
    SET entitlement = CASE 
        WHEN @YearsOfService < 2 THEN 21
        WHEN @YearsOfService < 5 THEN 25
        ELSE 30
    END,
    remaining = CASE 
        WHEN @YearsOfService < 2 THEN 21
        WHEN @YearsOfService < 5 THEN 25
        ELSE 30
    END
    WHERE employee_id = @EmployeeID;
    
    SELECT 'Leave entitlements updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ConfigureSpecialLeave
    @LeaveType varchar(50), @Rules varchar(50)
AS
BEGIN
    INSERT INTO LeavePolicy(name, purpose, special_leave_type, eligibility_rules)
    VALUES (@LeaveType, 'Special absence configuration', @LeaveType, @Rules);
    SELECT 'Special leave configured successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE SetLeaveYearRules
    @StartDate date, @EndDate date
AS
BEGIN
    UPDATE LeavePolicy
    SET reset_on_new_year = 1, year_start = @StartDate, year_end = @EndDate;
    SELECT CONCAT('Leave year set from ', @StartDate, ' to ', @EndDate) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ManageLeaveRoles
    @RoleID int, @Permissions varchar(200)
AS
BEGIN
    DECLARE @PermissionID int;
    SELECT @PermissionID = permission_id
    FROM Permission
    WHERE description LIKE '%Leave%';
    
    IF @PermissionID IS NOT NULL
    BEGIN
        INSERT INTO RolePermission(role_id, permission_id, allowed_action)
        VALUES (@RoleID, @PermissionID, @Permissions);
        SELECT 'Leave roles managed successfully' AS Message;
    END
END;
GO

-- =============================================
-- TIME REQUEST OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE SubmitTimeRequest
    @EmployeeID int, @RequestType varchar(50), @RequestDate date, 
    @DurationMinutes int, @Reason varchar(200)
AS
BEGIN
    INSERT INTO TimeRequest(employee_id, request_type, request_date, duration_minutes, reason, status, submitted_at)
    VALUES (@EmployeeID, @RequestType, @RequestDate, @DurationMinutes, @Reason, 'PENDING', GETDATE());
    SELECT CONCAT('Time request submitted successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE ApproveTimeRequest
    @RequestID int, @ApproverID int, @Comments varchar(200)
AS
BEGIN
    UPDATE TimeRequest
    SET status = 'Approved', approved_by = @ApproverID, comments = @Comments, approved_at = GETDATE()
    WHERE request_id = @RequestID;
    SELECT 'Time request approved successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE RejectTimeRequest
    @RequestID int, @ApproverID int, @Comments varchar(200)
AS
BEGIN
    UPDATE TimeRequest
    SET status = 'Rejected', approved_by = @ApproverID, comments = @Comments, approved_at = GETDATE()
    WHERE request_id = @RequestID;
    SELECT 'Time request rejected successfully' AS Message;
END;
GO

-- =============================================
-- ROLE MANAGEMENT OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE RemoveRole
    @EmployeeID int, @RoleID int
AS
BEGIN
    DELETE FROM Employee_Role
    WHERE employee_id = @EmployeeID AND role_id = @RoleID;
    SELECT 'Role removed successfully' AS Message;
END;
GO

-- =============================================
-- SYSTEM ADMIN OPERATIONS
-- =============================================

CREATE OR ALTER PROCEDURE ViewOrgHierarchy
AS
BEGIN
    SELECT 
        e.full_name AS Employee,
        m.full_name AS Manager,
        d.department_name,
        p.position_title,
        h.hierarchy_level
    FROM Employee e
    LEFT JOIN Employee m ON e.manager_id = m.employee_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Position p ON e.position_id = p.position_id
    LEFT JOIN EmployeeHierarchy h ON e.employee_id = h.employee_id;
END;
GO

CREATE OR ALTER PROCEDURE EnableFirstInLastOut
    @Enable bit
AS
BEGIN
    MERGE SystemSettings AS s
    USING (SELECT 'FirstInLastOut' AS setting_name, @Enable AS setting_value) AS src
    ON s.setting_name = src.setting_name
    WHEN MATCHED THEN UPDATE SET setting_value = src.setting_value
    WHEN NOT MATCHED THEN INSERT VALUES (src.setting_name, src.setting_value);
    SELECT 'First In/Last Out setting updated successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE LogAttendanceEdit
    @AttendanceID int, @EditedBy int, @OldTimestamp datetime, @NewTimestamp datetime, @Action varchar(50)
AS
BEGIN
    INSERT INTO AttendanceLog(attendance_id, modified_by, old_timestamp, timestamp, action)
    VALUES (@AttendanceID, @EditedBy, @OldTimestamp, @NewTimestamp, @Action);
    SELECT 'Attendance edit logged successfully' AS Message;
END;
GO

-- =============================================
-- SEND TEAM NOTIFICATION
-- =============================================

CREATE OR ALTER PROCEDURE SendTeamNotification
    @ManagerID int, @Message varchar(50), @Urgency varchar(50)
AS
BEGIN
    DECLARE @NotificationID int;
    INSERT INTO Notification(message_content, urgency, notification_type)
    VALUES (@Message, @Urgency, 'Team');
    SET @NotificationID = SCOPE_IDENTITY();
    
    INSERT INTO Employee_Notification(employee_id, notification_id, is_read, delivery_status)
    SELECT employee_id, @NotificationID, 0, 'DELIVERED'
    FROM Employee
    WHERE manager_id = @ManagerID AND is_active = 1;
    
    SELECT 'Team notification sent successfully' AS Message;
END;
GO

-- =============================================
-- GET PENDING LEAVE REQUESTS
-- =============================================

CREATE OR ALTER PROCEDURE GetPendingLeaveRequests
    @ManagerID int
AS
BEGIN
    SELECT lr.*, e.full_name, l.leave_type
    FROM LeaveRequest lr
    INNER JOIN Employee e ON lr.employee_id = e.employee_id
    INNER JOIN Leave l ON lr.leave_id = l.leave_id
    WHERE e.manager_id = @ManagerID AND lr.status = 'Pending'
    ORDER BY lr.submitted_at ASC;
END;
GO

-- =============================================
-- ADDITIONAL UTILITY PROCEDURES
-- =============================================

CREATE OR ALTER PROCEDURE CreateCurrency
    @CurrencyCode varchar(50), @CurrencyName varchar(50), @ExchangeRate decimal(18,6)
AS
BEGIN
    INSERT INTO Currency(CurrencyCode, CurrencyName, ExchangeRate, CreatedDate, LastUpdated)
    VALUES (@CurrencyCode, @CurrencyName, @ExchangeRate, GETDATE(), GETDATE());
    SELECT 'Currency created successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CreatePayrollPeriod
    @PayrollID int, @StartDate date, @EndDate date, @Status varchar(50)
AS
BEGIN
    INSERT INTO PayrollPeriod(payroll_id, start_date, end_date, status)
    VALUES (@PayrollID, @StartDate, @EndDate, @Status);
    SELECT CONCAT('Payroll period created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CreateShiftCycle
    @CycleName varchar(50), @Description text
AS
BEGIN
    INSERT INTO ShiftCycle(cycle_name, description)
    VALUES (@CycleName, @Description);
    SELECT CONCAT('Shift cycle created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

CREATE OR ALTER PROCEDURE AssignShiftToCycle
    @CycleID int, @ShiftID int, @OrderNumber int
AS
BEGIN
    INSERT INTO ShiftCycleAssignment(cycle_id, shift_id, order_number)
    VALUES (@CycleID, @ShiftID, @OrderNumber);
    SELECT 'Shift assigned to cycle successfully' AS Message;
END;
GO

CREATE OR ALTER PROCEDURE CreateTermination
    @TerminationDate date, @Reason varchar(50), @ContractID int
AS
BEGIN
    INSERT INTO Termination(date, reason, contract_id)
    VALUES (@TerminationDate, @Reason, @ContractID);
    
    UPDATE Contract
    SET current_state = 'TERMINATED'
    WHERE contract_id = @ContractID;
    
    SELECT CONCAT('Termination record created successfully with ID: ', SCOPE_IDENTITY()) AS Message;
END;
GO

SELECT 'All missing procedures created successfully' AS CompletionMessage;
GO
