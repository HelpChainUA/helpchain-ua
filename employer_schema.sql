create table EmployerLoginDetail(
	Id int primary key,
	Email nvarchar(100) not null,
	Password nvarchar(300),
	constraint UQ_UserEmail unique (Email),	
)

create table EmployerUser(
	Id int primary key,
	FirstName nvarchar(30) not null,
	LastName nvarchar(30) not null,
	JobTitle nvarchar(50),
	PhoneNumber varchar(20)	
)

create table Companies(
	Id smallint primary key,
	[Name] nvarchar(30),
	Website nvarchar(30),
	Industry smallint,
	[Size] smallint,
	constraint FK_Companies foreign key(Industry) references CompanyIndustry(Id),
	constraint FK_Companies foreign key(CompanySize) references CompanySize(Id)
)

create table CompanySize(
	Id smallint primary key,
	SizeValue varchar
)

create table CompanyIndustry(
	Id smallint primary key,
	SizeValue varchar
)

create table CompanyLocation(
	CompanyId int,
	LocationId smallint,
	constraint FK_CompanyLocation_Company foreign key(CompanyId) references Companies(Id),
	constraint FK_CompanyLocation_Location foreign key(LocationId) references Locations(Id)	
)

create table CompanyContactPerson(
	CompanyId int,
	UserId int,
	constraint FK_CompanyContactPerson_Company foreign key(CompanyId) references Companies(Id),
	constraint FK_CCompanyContactPerson_User foreign key(UserId) references EmployerUser(Id)	
)

create table CompanyLogin(
	CompanyId int,
	LoginId int,
	constraint FK_CompanyLogin_Company foreign key(CompanyId) references Companies(Id),
	constraint FK_CompanyLogin_Login foreign key(LoginId) references EmployerLoginDetail(Id)
)