create table Associates(
	Id Int,
	FirstName NVARCHAR(64),
	LastName NVARCHAR(64),
	EmailId NVARCHAR(100),
	DOB Date,
)

Create table Quiz(
	Id int,
	QuestionNo int,
	QDate Date,
	Associate NVARCHAR(100),
	IsAnserRight bit,
	Answer NVARCHAR(255)
)