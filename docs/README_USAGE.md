# HRMS - Complete User Guide

## Quick Start

### Login Credentials
Use any of these usernames (any password works):

| Username | Role | Access Level |
|----------|------|--------------|
| `john.doe` | Employee | Basic self-service |
| `sarah.manager` | Line Manager | Team management + employee features |
| `hr.admin` | HR Administrator | Full HR operations |
| `payroll.specialist` | Payroll Specialist | Payroll & compensation |
| `system.admin` | System Administrator | Complete system control |

## Feature Overview by Role

### 🔵 EMPLOYEE (john.doe)
**What you can do:**
1. **Attendance**
   - Clock in/out daily
   - View attendance history
   - Submit correction requests
   - View assigned shifts

2. **Leave Management**
   - Submit leave requests
   - Check leave balance
   - Attach medical documents
   - Cancel/modify pending requests
   - View leave history

3. **Personal Profile**
   - Update contact details
   - Add emergency contacts
   - Manage skills & certifications
   - View employment timeline
   - Update profile picture

4. **Missions**
   - View assigned missions
   - Track mission todos
   - Submit expense claims

5. **Reimbursements**
   - Submit expense claims
   - Track claim status
   - View reimbursement history

6. **Documents**
   - Request HR documents
   - View contracts
   - View payroll history

### 🟢 LINE MANAGER (sarah.manager)
**Everything an employee can do, PLUS:**

1. **Team Overview**
   - View team members
   - See team statistics
   - Filter by skill/role
   - View certifications

2. **Leave Approval**
   - Approve/reject leave requests
   - Delegate approval authority
   - Flag irregular patterns
   - Receive notifications

3. **Shift Management**
   - Assign shifts to team members
   - Reassign shifts
   - Request replacements

4. **Attendance Monitoring**
   - View team attendance
   - Review missed punches
   - Approve time requests
   - Record manual attendance

5. **Manager Notes**
   - Add private notes (HR-visible)
   - Track team issues
   - Document concerns

### 🟡 HR ADMINISTRATOR (hr.admin)
**Everything a manager can do, PLUS:**

1. **Employee Management**
   - Create employee profiles
   - Update employee information
   - View complete employee directory
   - Manage employee lifecycle

2. **Contract Management**
   - Create employment contracts
   - Renew contracts
   - View active contracts
   - Track expiring contracts

3. **Leave Administration**
   - Configure leave policies
   - Manage leave types
   - Set eligibility rules
   - Assign leave entitlements
   - Adjust leave balances
   - Process carry-forward
   - Verify medical leave
   - Bulk approve requests

4. **Mission Management**
   - Assign missions
   - Approve mission completion
   - Track mission budgets

5. **Reimbursement Review**
   - Review claims
   - Approve/reject reimbursements
   - Track reimbursement queue

6. **Organization Structure**
   - Manage departments
   - Define positions
   - Assign department heads
   - View org hierarchy

7. **Shift Configuration**
   - Create shift types
   - Define shift rules
   - Set grace periods
   - Configure split shifts

8. **Insurance & Benefits**
   - Configure insurance brackets
   - Update contribution rates
   - Approve policy updates

### 🟠 PAYROLL SPECIALIST (payroll.specialist)
**Focused on compensation:**

1. **Payroll Generation**
   - Generate monthly payroll
   - Validate attendance records
   - Sync leave data
   - Process payroll run

2. **Salary Management**
   - Add allowances
   - Apply deductions
   - Adjust payroll items
   - Calculate net salary

3. **Payroll Configuration**
   - Configure pay grades
   - Set salary bands
   - Define overtime rules
   - Configure shift allowances

4. **Tax Management**
   - Manage tax rules
   - Generate tax statements
   - Configure tax brackets
   - Multi-currency setup

5. **Payroll Policies**
   - Configure policies
   - Define pay types
   - Set escalation workflows
   - Approve configuration changes

6. **Reports & Statements**
   - Monthly payroll summary
   - Department payroll
   - Employee payroll history
   - Bonus eligibility

7. **Compliance**
   - Insurance contributions
   - Termination benefits
   - Signing bonuses
   - Payroll audit trail

### 🔴 SYSTEM ADMINISTRATOR (system.admin)
**Complete system control:**

1. **Employee Directory**
   - Full CRUD operations
   - Bulk operations
   - Advanced filtering
   - Export capabilities

2. **Organization Hierarchy**
   - Reassign managers
   - Restructure departments
   - Update reporting lines
   - View complete org chart

3. **Shift Management**
   - Create shift types
   - Assign shifts (individual/dept)
   - Configure custom shifts
   - Update shift statuses
   - Set up rotational shifts

4. **Attendance Infrastructure**
   - Configure attendance devices
   - Tag attendance sources
   - Sync offline data
   - Apply holiday overrides
   - Log attendance edits
   - Enable first-in/last-out

5. **Role Management**
   - Assign system roles
   - Remove roles
   - Manage permissions
   - Create user accounts

6. **System Configuration**
   - Global settings
   - Integration setup
   - Notification rules
   - Security settings

7. **Reports & Analytics**
   - Generate compliance reports
   - Department statistics
   - Diversity reports
   - Custom reports

## Common Workflows

### 📋 Submit a Leave Request (Employee)
1. Go to **My Leave** page
2. Click **Request Leave** button
3. Fill in:
   - Leave type (Vacation/Sick/etc)
   - Start and end dates
   - Reason
4. Attach medical documents if needed
5. Submit request
6. Track status in notifications

### ✅ Approve Leave Request (Manager)
1. Go to **Leave** page
2. View pending requests
3. Click on request to review
4. Check:
   - Leave balance
   - Team coverage
   - Date conflicts
5. Approve or reject with comments
6. Employee gets notified automatically

### 💰 Process Payroll (Payroll Specialist)
1. Go to **Payroll Run Center**
2. Select pay period
3. Validate attendance
4. Review attendance issues
5. Generate payroll
6. Review calculated amounts
7. Make adjustments if needed
8. Approve payroll
9. Generate payslips

### 👤 Onboard New Employee (System Admin)
1. Go to **Employee Directory**
2. Click **Add Employee**
3. Fill basic info:
   - Name, email, phone
   - Department & position
   - Hire date
4. Save profile

Then as **HR Admin**:
5. Go to **Contracts**
6. Create employment contract
7. Assign insurance plan
8. Set up leave entitlements

Then as **System Admin**:
9. Go to **Shift Management**
10. Assign appropriate shift
11. Go to **Role Management**
12. Assign system roles

### ⏰ Clock In/Out (Employee)
1. Go to **My Attendance**
2. Click **Clock In** button when arriving
3. Click **Clock Out** button when leaving
4. View daily/monthly attendance summary
5. Submit corrections if needed

### 🔄 Reassign Employee (System Admin)
1. Go to **Org Hierarchy**
2. Find employee in tree
3. Click **Reassign**
4. Select new:
   - Department
   - Manager
   - Position
5. Confirm changes
6. Affected parties notified

## Navigation Guide

### Main Menu Structure

**Everyone sees:**
- Dashboard
- My Profile
- My Attendance
- My Leave (redirected based on role)
- My Missions
- Notifications

**Line Managers see:**
- Team Management
- Team Attendance
- Leave (team requests)

**HR Admins see:**
- Employees
- Organization
- Attendance (all)
- Leave (all requests)
- Missions (all)
- Contracts
- Leave Policies
- Reimbursements

**Payroll Specialists see:**
- Payroll Overview
- Payroll Center
- Payroll Config

**System Admins see:**
- Employee Directory
- Org Hierarchy
- Shift Management
- Attendance Infra
- Role Management
- Settings
- Reports

## Tips & Best Practices

### For Employees
- ✅ Clock in/out daily
- ✅ Submit leave requests in advance
- ✅ Keep profile information updated
- ✅ Check notifications regularly
- ✅ Attach documents for medical leave

### For Managers
- ✅ Review leave requests promptly
- ✅ Monitor team attendance weekly
- ✅ Use delegation when unavailable
- ✅ Add notes for important observations
- ✅ Approve time corrections quickly

### For HR Admins
- ✅ Review contracts before expiry
- ✅ Update leave policies annually
- ✅ Process reimbursements within SLA
- ✅ Maintain accurate org structure
- ✅ Verify medical leave documents

### For Payroll Specialists
- ✅ Validate attendance before payroll
- ✅ Review anomalies in calculations
- ✅ Update tax rules when laws change
- ✅ Generate reports for audit
- ✅ Backup payroll data monthly

### For System Admins
- ✅ Perform regular data audits
- ✅ Review and update roles quarterly
- ✅ Monitor system usage
- ✅ Test attendance devices
- ✅ Generate compliance reports

## Data Reference

### Leave Types
- **Vacation**: 20 days/year, requires approval, paid
- **Sick Leave**: 10 days/year, no approval needed, paid
- **Probation Leave**: 5 days, requires approval, unpaid

### Shift Types
- **Morning Shift**: 9:00 AM - 5:00 PM
- **Evening Shift**: 2:00 PM - 10:00 PM
- **Night Shift**: 10:00 PM - 6:00 AM
- **Flexible**: Vary based on employee needs

### Departments
- Engineering (45 employees)
- Human Resources (12 employees)
- Sales (28 employees)
- Marketing (18 employees)
- Finance (15 employees)

## Troubleshooting

### Can't log in?
- Verify username spelling
- Try any password (system is mock)
- Clear browser cache
- Check console for errors

### Don't see expected menu items?
- Verify your role in profile
- Some features are role-restricted
- Log out and back in
- Contact system admin

### Leave request not showing?
- Check if it was submitted
- Look in notifications
- Verify it's not in drafts
- Ask your manager

### Clock in/out not working?
- Check if shift is assigned
- Verify current time
- Look for error messages
- Submit manual correction

### Payroll not generating?
- Ensure attendance is validated
- Check for unresolved punches
- Verify pay period dates
- Review system logs

## Support & Help

### Quick Help
- Hover over elements for tooltips
- Check notification bell for updates
- Use search to find employees
- Export data for reporting

### System Status
- All features using mock data
- No real backend calls
- LocalStorage for auth only
- Safe to test all features

### Known Behaviors
- Data resets on page reload (except auth)
- No file uploads processed
- No emails sent
- No real-time sync between sessions

## Future Enhancements
When connecting to real backend:
- Real database persistence
- File upload/storage
- Email notifications
- Real-time updates
- Mobile app
- Advanced analytics
- API integrations
- Single sign-on (SSO)
