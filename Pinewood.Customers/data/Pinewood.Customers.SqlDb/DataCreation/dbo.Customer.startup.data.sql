
-- drop temporary table if it exists
If OBJECT_ID('tempdb..#Customer_box') is not null
	begin
		drop table #Customer_box
	end;

-- get all the information into a temporary table
select * into #Customer_box from [dbo].[Customer] where 0 = 1;   -- (create table structure only)]

-- insert the new items into the temporary table
set identity_insert #Customer_box on;

begin tran

insert into #Customer_box 
	(
		[Id], 
		[Key], 
		[TypeId], 
		[Title], 
		[FirstName], 
		[LastName], 
		[Email], 
		[MobilePhone], 
		[IsDisabled], 
		[IsLocked], 
		[LockedOn], 
		[CreatedOn], 
		[CreatedBy], 
		[ModifiedOn], 
		[ModifiedBy]
	)
values
	(101, 'cstmr_sysgenrated101', 1, 'Sir', 'Robert', 'Walpole', 'Robert.Walpole@gmail.com', '0772545101', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(102, 'cstmr_sysgenrated102', 2, 'Mr', 'Spencer', 'Perceval', 'Spencer.Perceval@gmail.com', '0772545102', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(103, 'cstmr_sysgenrated103', 3, 'Mr', 'Charles', 'Abbot', 'Charles.Abbot@gmail.com', '0772545103', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(104, 'cstmr_sysgenrated104', 4, 'Mr', 'Henry', 'Addington', 'Henry.Addington@gmail.com', '0772545104', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(105, 'cstmr_sysgenrated105', 1, 'Mr', 'William', 'Elder', 'William.Elder@gmail.com', '0772545105', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(106, 'cstmr_sysgenrated106', 1, 'Mr', 'William', 'Younger', 'William.Younger@gmail.com', '0772545106', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(107, 'cstmr_sysgenrated107', 2, 'Mr', 'William', 'Grenville ', 'William.Grenville@gmail.com', '0772545107', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(108, 'cstmr_sysgenrated108', 2, 'Mr', 'George', 'Canning', 'George.Canning@gmail.com', '0772545108', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(109, 'cstmr_sysgenrated109', 3, 'Mr', 'Frederick', 'Robinson', 'Frederick.Robinson@gmail.com', '0772545109', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(110, 'cstmr_sysgenrated110', 3, 'Mr', 'Charles', 'Grey', 'Charles.Grey@gmail.com', '0772545110', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(111, 'cstmr_sysgenrated111', 4, 'Mr', 'William', 'Lamb', 'William.Lamb@gmail.com', '0772545111', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(112, 'cstmr_sysgenrated112', 4, 'Sir', 'Robert', 'Peel', 'Robert.Peel@gmail.com', '0772545112', 0, 0, null, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system')

--rollback
commit;
set identity_insert #Customer_box off;
set identity_insert [dbo].[Customer] on;

-- merge items back into the physical table from the temp table
merge [dbo].[Customer] as dst
using
	(
		select 
			[Id], 
			[Key], 
			[TypeId], 
			[Title], 
			[FirstName], 
			[LastName], 
			[Email], 
			[MobilePhone], 
			[IsDisabled], 
			[IsLocked], 
			[LockedOn], 
			[CreatedOn], 
			[CreatedBy], 
			[ModifiedOn], 
			[ModifiedBy]
	
		from #Customer_box
	) as src
on dst.[Id] = src.[Id]
when not matched then
	insert 
	(
			[Id], 
			[Key], 
			[TypeId], 
			[Title], 
			[FirstName], 
			[LastName], 
			[Email], 
			[MobilePhone], 
			[IsDisabled], 
			[IsLocked], 
			[LockedOn], 
			[CreatedOn], 
			[CreatedBy], 
			[ModifiedOn], 
			[ModifiedBy]
	)

	values 
	(
			src.[Id], 
			src.[Key], 
			src.[TypeId], 
			src.[Title], 
			src.[FirstName], 
			src.[LastName], 
			src.[Email], 
			src.[MobilePhone], 
			src.[IsDisabled], 
			src.[IsLocked], 
			src.[LockedOn], 
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

set identity_insert [dbo].[Customer] off;

drop table #Customer_box;
go
