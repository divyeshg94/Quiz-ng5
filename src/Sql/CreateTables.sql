create table Associates(
	ID int NOT NULL IDENTITY,
	FirstName NVARCHAR(64),
	LastName NVARCHAR(64),
	EmailId NVARCHAR(100),
	DOB Date,
)

Create table Quiz(
	ID int NOT NULL IDENTITY,
	QuestionNo int,
	QDate Date,
	Associate NVARCHAR(100),
	IsAnswerRight bit,
	Answer NVARCHAR(255)
)

Create Table Questions(
	ID int NOT NULL IDENTITY,
	Question NVARCHAR(MAX),
	Options NVARCHAR(MAX),
	Answer NVARCHAR(MAX),
	QuestionDate Date,
	IsLastDayOfMonth bit,
	Explanation NVARCHAR(MAX),
	Info NVARCHAR(MAX)
)
