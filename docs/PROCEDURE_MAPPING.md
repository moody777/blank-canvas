# Procedure to Mock Function Mapping

This document maps the exact procedure names from procedures-2.pdf to the current mock function implementations.

## System Admin Procedures

1. **ViewEmployeeInfo** → mockViewEmployeeDetails (RENAME to mockViewEmployeeInfo)
2. **AddEmployee** → mockAddEmployee ✓
3. **UpdateEmployeeInfo** → mockEditEmployee (RENAME to mockUpdateEmployeeInfo)
4. **AssignRole** → mockAssignRole ✓
5. **GetDepartmentEmployeeStats** → NEW (needs implementation)
6. **ReassignManager** → mockReassignManager ✓
7. **ReassignHierarchy** → mockReassignHierarchy ✓
8. **NotifyStructureChange** → NEW (needs implementation)
9. **ViewOrgHierarchy** → NEW (needs implementation)
10. **AssignShiftToEmployee** → mockAssignShiftToEmployee ✓
11. **UpdateShiftStatus** → mockUpdateShiftStatus ✓
12. **AssignShiftToDepartment** → mockAssignShiftToDepartment ✓
13. **AssignCustomShift** → mockCreateCustomShift (RENAME to mockAssignCustomShift)
14. **ConfigureSplitShift** → mockConfigureSplitShift ✓
15. **EnableFirstInLastOut** → NEW (needs implementation)
16. **TagAttendanceSource** → mockTagAttendanceSource ✓
17. **SyncOfflineAttendance** → mockSyncOfflineAttendance ✓
18. **LogAttendanceEdit** → NEW (needs implementation)
19. **ApplyHolidayOverrides** → mockApplyHolidayOverrides ✓
20. **ManageUserAccounts** → NEW (needs implementation)

## HR Admin Procedures

21. **CreateContract** → mockCreateContract ✓
22. **RenewContract** → mockRenewContract ✓
23. **ApproveLeaveRequest** → mockApproveLeave (RENAME to mockApproveLeaveRequest)
24. **AssignMission** → mockAssignMission ✓
25. **ReviewReimbursement** → mockReviewReimbursement ✓
26. **GetActiveContracts** → NEW (needs implementation)
27. **GetTeamByManager** → NEW (needs implementation)
28. **UpdateLeavePolicy** → NEW (needs implementation)
29. **GetExpiringContracts** → NEW (needs implementation)
30. **AssignDepartmentHead** → NEW (needs implementation)
31. **CreateEmployeeProfile** → mockCreateEmployeeProfile ✓
32. **UpdateEmployeeProfile** → NEW (needs implementation)
33. **SetProfileCompleteness** → mockSetProfileCompleteness ✓
34. **GenerateProfileReport** → NEW (needs implementation)
35. **CreateShiftType** → mockCreateShiftType ✓
36. **CreateShiftName** → NEW (needs implementation)
37. **AssignRotationalShift** → NEW (needs implementation)
38. **NotifyShiftExpiry** → NEW (needs implementation)
39. **DefineShortTimeRules** → mockDefineShortTimeRules ✓
40. **SetGracePeriod** → mockSetGracePeriod ✓
41. **DefinePermissionLimits** → NEW (needs implementation)
42. **EscalatePendingRequests** → NEW (needs implementation)
43. **LinkVacationToShift** → NEW (needs implementation)
44. **ConfigureLeavePolicies** → mockConfigureLeavePolicies ✓
45. **AuthenticateLeaveAdmin** → NEW (needs implementation)
46. **ApplyLeaveConfiguration** → NEW (needs implementation)
47. **UpdateLeaveEntitlements** → NEW (needs implementation)
48. **ConfigureLeaveEligibility** → mockConfigureLeaveEligibility ✓
49. **ManageLeaveTypes** → mockManageLeaveTypes ✓
50. **AssignLeaveEntitlement** → mockAssignLeaveEntitlement ✓
51. **ConfigureLeaveRules** → NEW (needs implementation)
52. **ConfigureSpecialLeave** → NEW (needs implementation)
53. **SetLeaveYearRules** → NEW (needs implementation)
54. **AdjustLeaveBalance** → mockAdjustLeaveBalance ✓
55. **ManageLeaveRoles** → NEW (needs implementation)
56. **FinalizeLeaveRequest** → mockFinalizeLeaveRequest ✓
57. **OverrideLeaveDecision** → NEW (needs implementation)
58. **BulkProcessLeaveRequests** → mockBulkProcessLeaveRequests ✓
59. **VerifyMedicalLeave** → mockVerifyMedicalLeave ✓
60. **SyncLeaveBalances** → mockSyncLeaveBalances ✓
61. **ProcessLeaveCarryForward** → mockProcessLeaveCarryForward ✓
62. **SyncLeaveToPayroll** → mockSyncLeaveToPayroll ✓
63. **UpdateInsuranceBrackets** → mockUpdateInsuranceBrackets ✓
64. **ApprovePolicyUpdate** → mockApprovePolicyUpdate ✓

## Payroll Officer Procedures

65. **GeneratePayroll** → mockGeneratePayroll ✓
66. **AdjustPayrollItem** → mockAdjustPayrollItem ✓
67. **CalculateNetSalary** → NEW (needs implementation)
68. **ApplyPayrollPolicy** → NEW (needs implementation)
69. **GetMonthlyPayrollSummary** → NEW (needs implementation)
70. **AddAllowanceDeduction** → mockAddAllowance/mockAddDeduction (CONSOLIDATE)
71. **GetEmployeePayrollHistory** → NEW (needs implementation)
72. **GetBonusEligibleEmployees** → NEW (needs implementation)
73. **UpdateSalaryType** → NEW (needs implementation)
74. **GetPayrollByDepartment** → NEW (needs implementation)
75. **ValidateAttendanceBeforePayroll** → mockValidateAttendanceBeforePayroll ✓
76. **SyncAttendanceToPayroll** → mockSyncAttendanceToPayroll ✓
77. **SyncApprovedPermissionsToPayroll** → NEW (needs implementation)
78. **ConfigurePayGrades** → mockConfigurePayGrades ✓
79. **ConfigureShiftAllowances** → mockConfigureShiftAllowances ✓
80. **EnableMultiCurrencyPayroll** → mockEnableMultiCurrency (RENAME)
81. **ManageTaxRules** → mockManageTaxRules ✓
82. **ApprovePayrollConfigChanges** → NEW (needs implementation)
83. **ConfigureSigningBonus** → NEW (needs implementation)
84. **ConfigureTerminationBenefits** → NEW (needs implementation)
85. **ConfigureInsuranceBrackets** → mockConfigureInsuranceBrackets ✓
86. **ConfigurePayrollPolicies** → mockConfigurePayrollPolicies ✓
87. **DefinePayGrades** → mockDefinePayType (separate from ConfigurePayGrades)
88. **ConfigureEscalationWorkflow** → NEW (needs implementation)
89. **DefinePayType** → mockDefinePayType ✓
90. **ConfigureOvertimeRules** → mockConfigureOvertimeRules ✓
91. **ConfigureShiftAllowance** → mockConfigureShiftAllowances (already exists)
92. **ConfigureMultiCurrency** → mockEnableMultiCurrency (RENAME)
93. **ConfigureSigningBonusPolicy** → NEW (needs implementation)
94. **GenerateTaxStatement** → mockGenerateTaxStatement ✓
95. **ApprovePayrollConfiguration** → mockApprovePayrollConfiguration ✓
96. **ModifyPastPayroll** → mockModifyPastPayroll ✓

## Line Manager Procedures

97. **ReviewLeaveRequest** → mockReviewLeaveRequest ✓
98. **AssignShift** → mockAssignShift ✓
99. **ViewTeamAttendance** → mockViewTeamAttendance ✓
100. **SendTeamNotification** → NEW (needs implementation)
101. **ApproveMissionCompletion** → NEW (needs implementation)
102. **RequestReplacement** → mockRequestReplacement ✓
103. **ViewDepartmentSummary** → mockViewDepartmentSummary ✓
104. **ReassignShift** → mockReassignShift ✓
105. **GetPendingLeaveRequests** → NEW (needs implementation)
106. **GetTeamStatistics** → mockGetTeamStatistics ✓
107. **ViewTeamProfiles** → mockViewTeamProfiles ✓
108. **GetTeamSummary** → mockGetTeamSummary ✓
109. **FilterTeamProfiles** → mockFilterTeamProfiles ✓
110. **ViewTeamCertifications** → mockViewTeamCertifications ✓
111. **AddManagerNotes** → mockAddManagerNotes ✓
112. **RecordManualAttendance** → mockRecordManualAttendance ✓
113. **ReviewMissedPunches** → mockReviewMissedPunches ✓
114. **ApproveTimeRequest** → mockApproveTimeRequest ✓
115. **RejectLeaveRequest** → mockRejectLeave (RENAME to mockRejectLeaveRequest)
116. **DelegateLeaveApproval** → mockDelegateLeaveApproval ✓
117. **FlagIrregularLeave** → mockFlagIrregularLeave ✓
118. **NotifyNewLeaveRequest** → NEW (needs implementation)

## Employee Procedures

119. **SubmitLeaveRequest** → mockSubmitLeaveRequest ✓
120. **GetLeaveBalance** → NEW (needs implementation)
121. **RecordAttendance** → mockRecordAttendance ✓
122. **SubmitReimbursement** → mockSubmitReimbursement ✓
123. **AddEmployeeSkill** → mockAddEmployeeSkill ✓
124. **ViewAssignedShifts** → NEW (needs implementation)
125. **ViewMyContracts** → NEW (needs implementation)
126. **ViewMyPayrollHistory** → NEW (needs implementation)
127. **UpdateMyContactDetails** → NEW (needs implementation)
128. **ViewMyAssignedMissions** → NEW (needs implementation)
129. **ViewFullEmployeeProfile** → NEW (needs implementation)
130. **UpdateContactInformation** → mockUpdatePersonalDetails (RENAME)
131. **ViewEmploymentTimeline** → NEW (needs implementation)
132. **AddEmergencyContact** → mockUpdateEmergencyContact (RENAME to mockAddEmergencyContact)
133. **RequestEmploymentVerification** → mockRequestHRDocument (partial)
134. **NotifyProfileUpdate** → NEW (needs implementation)
135. **LogFlexibleAttendance** → mockLogFlexibleAttendance ✓
136. **NotifyMissedPunch** → NEW (needs implementation)
137. **RecordMultiplePunches** → mockRecordMultiplePunches ✓
138. **SubmitCorrectionRequest** → mockSubmitCorrectionRequest ✓
139. **ViewRequestStatus** → mockViewRequestStatus ✓
140. **AttachLeaveDocuments** → mockAttachLeaveDocuments ✓
141. **ModifyLeaveRequest** → mockModifyLeaveRequest ✓
142. **CancelLeaveRequest** → mockCancelLeaveRequest ✓
143. **ViewLeaveBalance** → NEW (needs implementation)
144. **ViewLeaveHistory** → NEW (needs implementation)
145. **SubmitLeaveAfterAbsence** → mockSubmitLeaveAfterAbsence ✓
146. **NotifyLeaveStatusChange** → NEW (needs implementation)

## Summary
- ✓ Implemented: 96 procedures
- RENAME: 8 procedures
- NEW: 50 procedures need implementation
- Total: 154 procedures
