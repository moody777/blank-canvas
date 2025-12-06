-- ================================================================
-- RECRUITMENT & HIRING MANAGEMENT SYSTEM
-- SQL Server DDL and Stored Procedures
-- ================================================================

-- ============================================================
-- TABLE DEFINITIONS
-- ============================================================

-- Jobs/Positions table
CREATE TABLE Jobs (
    JobID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    DepartmentID UNIQUEIDENTIFIER NOT NULL,
    Requirements NVARCHAR(MAX),
    Responsibilities NVARCHAR(MAX),
    SalaryRange NVARCHAR(100),
    EmploymentType NVARCHAR(50) CHECK (EmploymentType IN ('full-time', 'part-time', 'contract', 'internship')),
    Status NVARCHAR(20) CHECK (Status IN ('open', 'closed', 'on-hold')) DEFAULT 'open',
    PostedDate DATETIME2 DEFAULT GETDATE(),
    ClosingDate DATETIME2,
    ExperienceLevel NVARCHAR(20) CHECK (ExperienceLevel IN ('entry', 'mid', 'senior', 'executive')),
    Location NVARCHAR(200),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Job Applications table
CREATE TABLE JobApplications (
    ApplicationID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    JobID UNIQUEIDENTIFIER NOT NULL,
    ApplicantName NVARCHAR(200) NOT NULL,
    ApplicantEmail NVARCHAR(200) NOT NULL,
    ApplicantPhone NVARCHAR(50),
    CVUrl NVARCHAR(500) NOT NULL,
    CoverLetter NVARCHAR(MAX),
    Status NVARCHAR(20) CHECK (Status IN ('submitted', 'screening', 'interview', 'offer', 'rejected', 'withdrawn')) DEFAULT 'submitted',
    AppliedDate DATETIME2 DEFAULT GETDATE(),
    CurrentStage NVARCHAR(100),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (JobID) REFERENCES Jobs(JobID)
);

-- Interview Stages table
CREATE TABLE InterviewStages (
    InterviewID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ApplicationID UNIQUEIDENTIFIER NOT NULL,
    Stage NVARCHAR(50) CHECK (Stage IN ('phone-screen', 'technical', 'behavioral', 'final', 'hr-round')),
    ScheduledDate DATETIME2,
    CompletedDate DATETIME2,
    InterviewerIDs NVARCHAR(500),
    Notes NVARCHAR(MAX),
    Result NVARCHAR(20) CHECK (Result IN ('pass', 'fail', 'pending')),
    Feedback NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ApplicationID) REFERENCES JobApplications(ApplicationID)
);

-- Job Offers table
CREATE TABLE JobOffers (
    OfferID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ApplicationID UNIQUEIDENTIFIER NOT NULL,
    JobID UNIQUEIDENTIFIER NOT NULL,
    Salary DECIMAL(18, 2) NOT NULL,
    StartDate DATE NOT NULL,
    Benefits NVARCHAR(MAX),
    Status NVARCHAR(20) CHECK (Status IN ('pending', 'accepted', 'rejected', 'rescinded')) DEFAULT 'pending',
    OfferDate DATETIME2 DEFAULT GETDATE(),
    ExpiryDate DATE NOT NULL,
    TermsConditions NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ApplicationID) REFERENCES JobApplications(ApplicationID),
    FOREIGN KEY (JobID) REFERENCES Jobs(JobID)
);

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

-- Create Job Posting
GO
CREATE PROCEDURE CreateJobPosting
    @Title NVARCHAR(200),
    @Description NVARCHAR(MAX),
    @DepartmentID UNIQUEIDENTIFIER,
    @Requirements NVARCHAR(MAX),
    @Responsibilities NVARCHAR(MAX),
    @SalaryRange NVARCHAR(100),
    @EmploymentType NVARCHAR(50),
    @ExperienceLevel NVARCHAR(20),
    @Location NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Jobs (
        Title, Description, DepartmentID, Requirements, Responsibilities,
        SalaryRange, EmploymentType, ExperienceLevel, Location, Status
    )
    VALUES (
        @Title, @Description, @DepartmentID, @Requirements, @Responsibilities,
        @SalaryRange, @EmploymentType, @ExperienceLevel, @Location, 'open'
    );
    
    SELECT SCOPE_IDENTITY() AS JobID;
END;
GO

-- Submit Job Application
CREATE PROCEDURE SubmitJobApplication
    @JobID UNIQUEIDENTIFIER,
    @ApplicantName NVARCHAR(200),
    @ApplicantEmail NVARCHAR(200),
    @ApplicantPhone NVARCHAR(50),
    @CVUrl NVARCHAR(500),
    @CoverLetter NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check if job is still open
    IF NOT EXISTS (SELECT 1 FROM Jobs WHERE JobID = @JobID AND Status = 'open')
    BEGIN
        RAISERROR('This job position is no longer accepting applications', 16, 1);
        RETURN;
    END
    
    INSERT INTO JobApplications (
        JobID, ApplicantName, ApplicantEmail, ApplicantPhone, CVUrl, CoverLetter, Status
    )
    VALUES (
        @JobID, @ApplicantName, @ApplicantEmail, @ApplicantPhone, @CVUrl, @CoverLetter, 'submitted'
    );
    
    SELECT SCOPE_IDENTITY() AS ApplicationID;
END;
GO

-- Update Application Status
CREATE PROCEDURE UpdateApplicationStatus
    @ApplicationID UNIQUEIDENTIFIER,
    @Status NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE JobApplications
    SET Status = @Status, UpdatedAt = GETDATE()
    WHERE ApplicationID = @ApplicationID;
END;
GO

-- Schedule Interview
CREATE PROCEDURE ScheduleInterview
    @ApplicationID UNIQUEIDENTIFIER,
    @Stage NVARCHAR(50),
    @ScheduledDate DATETIME2,
    @InterviewerIDs NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO InterviewStages (
        ApplicationID, Stage, ScheduledDate, InterviewerIDs, Result
    )
    VALUES (
        @ApplicationID, @Stage, @ScheduledDate, @InterviewerIDs, 'pending'
    );
    
    -- Update application status to interview
    UPDATE JobApplications
    SET Status = 'interview', CurrentStage = @Stage, UpdatedAt = GETDATE()
    WHERE ApplicationID = @ApplicationID;
    
    SELECT SCOPE_IDENTITY() AS InterviewID;
END;
GO

-- Update Interview Result
CREATE PROCEDURE UpdateInterviewResult
    @InterviewID UNIQUEIDENTIFIER,
    @Result NVARCHAR(20),
    @Feedback NVARCHAR(MAX) = NULL,
    @Notes NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE InterviewStages
    SET Result = @Result,
        Feedback = @Feedback,
        Notes = @Notes,
        CompletedDate = GETDATE(),
        UpdatedAt = GETDATE()
    WHERE InterviewID = @InterviewID;
END;
GO

-- Create Job Offer
CREATE PROCEDURE CreateJobOffer
    @ApplicationID UNIQUEIDENTIFIER,
    @JobID UNIQUEIDENTIFIER,
    @Salary DECIMAL(18, 2),
    @StartDate DATE,
    @Benefits NVARCHAR(MAX),
    @ExpiryDate DATE,
    @TermsConditions NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO JobOffers (
        ApplicationID, JobID, Salary, StartDate, Benefits, ExpiryDate, TermsConditions, Status
    )
    VALUES (
        @ApplicationID, @JobID, @Salary, @StartDate, @Benefits, @ExpiryDate, @TermsConditions, 'pending'
    );
    
    -- Update application status to offer
    UPDATE JobApplications
    SET Status = 'offer', UpdatedAt = GETDATE()
    WHERE ApplicationID = @ApplicationID;
    
    SELECT SCOPE_IDENTITY() AS OfferID;
END;
GO

-- Rescind Offer
CREATE PROCEDURE RescindOffer
    @OfferID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE JobOffers
    SET Status = 'rescinded', UpdatedAt = GETDATE()
    WHERE OfferID = @OfferID;
    
    -- Get ApplicationID and update status
    DECLARE @ApplicationID UNIQUEIDENTIFIER;
    SELECT @ApplicationID = ApplicationID FROM JobOffers WHERE OfferID = @OfferID;
    
    UPDATE JobApplications
    SET Status = 'rejected', UpdatedAt = GETDATE()
    WHERE ApplicationID = @ApplicationID;
END;
GO

-- Withdraw Application
CREATE PROCEDURE WithdrawApplication
    @ApplicationID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE JobApplications
    SET Status = 'withdrawn', UpdatedAt = GETDATE()
    WHERE ApplicationID = @ApplicationID;
END;
GO

-- Get Active Jobs
CREATE PROCEDURE GetActiveJobs
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
    FROM Jobs
    WHERE Status = 'open'
    ORDER BY PostedDate DESC;
END;
GO

-- Get Applications for Job
CREATE PROCEDURE GetApplicationsForJob
    @JobID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
    FROM JobApplications
    WHERE JobID = @JobID
    ORDER BY AppliedDate DESC;
END;
GO

-- Get Interview Stages for Application
CREATE PROCEDURE GetInterviewStagesForApplication
    @ApplicationID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
    FROM InterviewStages
    WHERE ApplicationID = @ApplicationID
    ORDER BY ScheduledDate;
END;
GO

-- Get All Offers
CREATE PROCEDURE GetAllOffers
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        o.*,
        a.ApplicantName,
        a.ApplicantEmail,
        j.Title AS JobTitle
    FROM JobOffers o
    INNER JOIN JobApplications a ON o.ApplicationID = a.ApplicationID
    INNER JOIN Jobs j ON o.JobID = j.JobID
    ORDER BY o.OfferDate DESC;
END;
GO

-- Get Recruitment Statistics
CREATE PROCEDURE GetRecruitmentStatistics
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        (SELECT COUNT(*) FROM Jobs WHERE Status = 'open') AS ActiveJobs,
        (SELECT COUNT(*) FROM JobApplications) AS TotalApplications,
        (SELECT COUNT(*) FROM JobApplications WHERE Status = 'submitted') AS PendingReview,
        (SELECT COUNT(*) FROM JobApplications WHERE Status = 'interview') AS InInterview,
        (SELECT COUNT(*) FROM JobOffers WHERE Status = 'pending') AS PendingOffers,
        (SELECT COUNT(*) FROM JobOffers WHERE Status = 'accepted') AS AcceptedOffers;
END;
GO

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX IX_Jobs_Status ON Jobs(Status);
CREATE INDEX IX_Jobs_DepartmentID ON Jobs(DepartmentID);
CREATE INDEX IX_JobApplications_JobID ON JobApplications(JobID);
CREATE INDEX IX_JobApplications_Status ON JobApplications(Status);
CREATE INDEX IX_JobApplications_ApplicantEmail ON JobApplications(ApplicantEmail);
CREATE INDEX IX_InterviewStages_ApplicationID ON InterviewStages(ApplicationID);
CREATE INDEX IX_JobOffers_ApplicationID ON JobOffers(ApplicationID);
CREATE INDEX IX_JobOffers_Status ON JobOffers(Status);
