CREATE TABLE [dbo].[CustomerType]
(
    [Id]            INT                IDENTITY (101, 1) NOT NULL,
    [Name]          NVARCHAR (100)     CONSTRAINT [DF_CustomerType_Name] NOT NULL,
    [Description]   NVARCHAR (250)     CONSTRAINT [DF_CustomerType_Description] DEFAULT ('') NOT NULL,
    [OrderIndex]    INT                CONSTRAINT [DF_CustomerType_OrderIndex] DEFAULT ((0)) NOT NULL,
    [IsDisabled]    BIT                CONSTRAINT [DF_CustomerType_IsDisabled] DEFAULT ((0)) NOT NULL,
    [CreatedOn]     DATETIMEOFFSET (7) CONSTRAINT [DF_CustomerType_CreatedOn] DEFAULT (sysdatetimeoffset()) NOT NULL,
    [CreatedBy]     NVARCHAR (100)     CONSTRAINT [DF_CustomerType_CreatedBy] DEFAULT ('system') NOT NULL,
    [ModifiedOn]    DATETIMEOFFSET (7) CONSTRAINT [DF_CustomerType_ModifiedOn] DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedBy]    NVARCHAR (100)     CONSTRAINT [DF_CustomerType_ModifiedBy] DEFAULT ('system') NOT NULL,
    CONSTRAINT [PK_CustomerType]      PRIMARY KEY CLUSTERED ([Id] ASC)
)

GO


CREATE NONCLUSTERED INDEX [IX_AccountType_Disabled]
    ON [dbo].[CustomerType]([IsDisabled] ASC)
    INCLUDE([Id], [Name], [Description], [OrderIndex], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]);
GO
