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
go