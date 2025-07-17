create table Users(
	Id int primary key,
	FirstName nvarchar(30) not null,
	LastName nvarchar(30) not null,
	Email nvarchar(100) not null,
	Password nvarchar(300),
	Age int,
	Gender varchar(6),
	LocationId smallint,
	SalaryRangeId smallint,
	CreateTime datetime default current_timestamp,
	IsReceiveEmails tinyint not null default 0,
	IsActive tinyint not null default 1,
	constraint UQ_UserEmail unique (Email),
	constraint FK_User_SalaryRange foreign key(SalaryRangeId) references SalaryRanges(Id),
	constraint FK_User_Location foreign key(LocationId) references Locations(Id)
)

create table Languages(
	Id smallint primary key,
	LangName varchar(30)
)

create table Skills(
	Id smallint primary key,
	SkillName nvarchar(50)
)

create table Roles(
	Id smallint primary key,
	RoleName nvarchar(100)
)

create table Locations(
	Id smallint primary key,
	LocName varchar(100)
)

create table SalaryRanges(
	Id smallint primary key,
	SalRange varchar(30)
)

create table LanguageLevels(
	Id smallint primary key,
	LevelName varchar(30)
)

create table UserLangLevel(
	UserId int,
	LangId varchar(30),
	LangLevId smallint,
	constraint FK_UserLanguage_User foreign key(UserId) references Users(Id),
	constraint FK_UserLanguage_Lang foreign key(LangId) references Languages(Id),
	constraint FK_UserLanguage_LangLev foreign key(LangLevId) references LanguageLevel(Id)
)

create table UserCurrentRole(
	UserId int,
	RoleId smallint,
	constraint FK_UserCurrentRole_User foreign key(UserId) references Users(Id),
	constraint FK_UserCurrentRole_Role foreign key(RoleId) references Roles(Id)
)

create table UserDesireRole(
	UserId int,
	RoleId smallint,
	constraint FK_UserDesireRole_User foreign key(UserId) references Users(Id),
	constraint FK_UserDesireRole_Role foreign key(RoleId) references Roles(Id)
)

create table UserSkills(
	UserId int,
	SkillId smallint,
	constraint FK_UserSkill_User foreign key(UserId) references Users(Id),
	constraint FK_UserSkill_Role foreign key(SkillId) references Skills(Id)
)