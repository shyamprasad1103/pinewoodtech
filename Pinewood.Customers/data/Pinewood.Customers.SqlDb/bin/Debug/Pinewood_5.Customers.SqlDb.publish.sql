﻿/*
Deployment script for PINEWOOD_CUSTOMERS_APP

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "PINEWOOD_CUSTOMERS_APP"
:setvar DefaultFilePrefix "PINEWOOD_CUSTOMERS_APP"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL16.LOCALSQL22\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL16.LOCALSQL22\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO


-- login creation for application use	
IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'pinewoodusr')
	BEGIN
		CREATE LOGIN [pinewoodusr] WITH PASSWORD = 'grassHopper!2', DEFAULT_DATABASE = [master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF;
		print 'pinewoodusr login created successfully';

		-- add to 'sysadmin' role
		ALTER SERVER ROLE [sysadmin] ADD MEMBER [pinewoodusr];
		print 'pinewoodusr login added to required role successfully';
	END
else
	print 'pinewoodusr login already exists';
GO

GO
/*
The column [dbo].[CustomerType].[IsSystem] is being dropped, data loss could occur.
*/

IF EXISTS (select top 1 1 from [dbo].[CustomerType])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
PRINT N'Dropping Index [dbo].[CustomerType].[IX_AccountType_Disabled]...';


GO
DROP INDEX [IX_AccountType_Disabled]
    ON [dbo].[CustomerType];


GO
PRINT N'Dropping Default Constraint [dbo].[DF_CustomerType_IsSystem]...';


GO
ALTER TABLE [dbo].[CustomerType] DROP CONSTRAINT [DF_CustomerType_IsSystem];


GO
PRINT N'Altering Table [dbo].[CustomerType]...';


GO
ALTER TABLE [dbo].[CustomerType] DROP COLUMN [IsSystem];


GO
PRINT N'Creating Index [dbo].[CustomerType].[IX_AccountType_Disabled]...';


GO
CREATE NONCLUSTERED INDEX [IX_AccountType_Disabled]
    ON [dbo].[CustomerType]([IsDisabled] ASC)
    INCLUDE([Id], [Name], [Description], [OrderIndex], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]);


GO





-- drop temporary table if it exists
If OBJECT_ID('tempdb..#CustomerType_box') is not null
	begin
		drop table #CustomerType_box
	end;

-- get all the information into a temporary table
select * into #CustomerType_box from [dbo].[CustomerType] where 0 = 1;   -- (create table structure only)]

-- insert the new items into the temporary table
set identity_insert #CustomerType_box on;

begin tran

insert into #CustomerType_box 
	(
		[Id], 
		[Name], 
		[Description], 
		[OrderIndex], 
		[IsDisabled], 
		[CreatedOn], 
		[CreatedBy], 
		[ModifiedOn], 
		[ModifiedBy]
	)
values
	(1, 'Internal', 'Internal customer', 1, 0, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'), 
	(2, 'Business', 'Business customer', 2, 0, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'), 
	(3, 'Retail', 'Retail customer', 3, 0, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system')

--rollback
commit;
set identity_insert #CustomerType_box off;
set identity_insert [dbo].[CustomerType] on;

-- merge items back into the physical table from the temp table
merge [dbo].[CustomerType] as dst
using
	(
		select [Id], [Name], [Description], [OrderIndex], [IsDisabled], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]
		from #CustomerType_box
	) as src
on dst.[Id] = src.[Id]
when not matched then
	insert 
	(
		[Id], 
		[Name], 
		[Description], 
		[OrderIndex],
		[IsDisabled], 
		[CreatedOn], 
		[CreatedBy], 
		[ModifiedOn], 
		[ModifiedBy]
	)

	values 
	(
		src.[Id], 
		src.[Name], 
		src.[Description], 
		src.[OrderIndex],
		src.[IsDisabled], 
		src.[CreatedOn], 
		src.[CreatedBy], 
		src.[ModifiedOn], 
		src.[ModifiedBy]
	)
when matched then
	update set
			dst.[ModifiedOn] = src.[ModifiedOn],
			dst.[ModifiedBy] = src.[ModifiedBy]
;

set identity_insert [dbo].[CustomerType] off;

drop table #CustomerType_box;
GO


GO

GO
PRINT N'Update complete.';


GO
