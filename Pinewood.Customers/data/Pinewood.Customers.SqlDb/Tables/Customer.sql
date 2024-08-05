CREATE TABLE [dbo].[Customer] (
    [Id]            INT                IDENTITY (100, 1) NOT NULL,
    [Key]           NVARCHAR (40)      CONSTRAINT [DF_Customer_Key] DEFAULT ('cstmr_'+Trim(lower(replace(CONVERT([nvarchar](40),newid()),'-','')))) NOT NULL,
    [TypeId]        INT                CONSTRAINT [DF_Customer_TypeId] NOT NULL,
    [Title]         CHAR (10)          NULL,
    [FirstName]     NVARCHAR (40)      NULL,
    [LastName]      NVARCHAR (40)      NULL,
    [Email]         NVARCHAR (250)     NULL,
    [MobilePhone]   NVARCHAR (20)      NULL,
    [IsDisabled]    BIT                CONSTRAINT [DF_Customer_IsDisabled] DEFAULT ((0)) NOT NULL,
    [IsLocked]      BIT                CONSTRAINT [DF_Customer_IsLocked] DEFAULT ((0)) NOT NULL,
    [LockedOn]      DATETIMEOFFSET (7) NULL,
    [CreatedOn]     DATETIMEOFFSET (7) CONSTRAINT [DF_Customer_CreatedOn] DEFAULT (sysdatetimeoffset()) NOT NULL,
    [CreatedBy]     NVARCHAR (250)     CONSTRAINT [DF_Customer_CreatedBy] DEFAULT ('system') NOT NULL,
    [ModifiedOn]    DATETIMEOFFSET (7) CONSTRAINT [DF_Customer_ModifiedOn] DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedBy]    NVARCHAR (250)     CONSTRAINT [DF_Customer_ModifiedBy] DEFAULT ('system') NOT NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Customer_CustomerType] FOREIGN KEY ([TypeId]) REFERENCES [dbo].[CustomerType] ([Id]) ON DELETE CASCADE,
);


GO
CREATE NONCLUSTERED INDEX [IX_Customer_TypeId]
    ON [dbo].[Customer]([TypeId] ASC)
    INCLUDE([Id], [Key], [Title], [FirstName], [LastName], [Email], [MobilePhone], [IsDisabled], [IsLocked], [LockedOn], [ModifiedOn]);

GO
CREATE NONCLUSTERED INDEX [IX_Customer_Email]
    ON [dbo].[Customer]([Email] ASC)
    INCLUDE([Id], [Key], [TypeId], [Title], [FirstName], [LastName], [MobilePhone], [IsDisabled], [IsLocked], [LockedOn], [ModifiedOn]);

