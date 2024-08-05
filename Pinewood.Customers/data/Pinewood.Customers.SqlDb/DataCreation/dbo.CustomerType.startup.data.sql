
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
	(3, 'Retail', 'Retail customer', 3, 0, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system'),
	(4, 'New', 'New customer', 4, 0, sysdatetimeoffset(), 'system', sysdatetimeoffset(), 'system')

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
go
