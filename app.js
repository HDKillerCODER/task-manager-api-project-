-- Create User table
CREATE TABLE User (
    Userid INT PRIMARY KEY,
    Name VARCHAR(50),
    Dept VARCHAR(50),
    Bookid INT,
    Accdate DATE
);

-- Create Book table
CREATE TABLE Book (
    Bookid INT PRIMARY KEY,
    Book_name VARCHAR(50),
    Author VARCHAR(50)
);

-- Create PublisherDet table
CREATE TABLE PublisherDet (
    Bookid INT PRIMARY KEY,
    Publisher_Name VARCHAR(50),
    Year INT,
    Price DECIMAL(10, 2)
);

-- a) List the details of the users whose name starts with the letter M.
SELECT * FROM User WHERE Name LIKE 'M%';

-- b) List the userid and the number of books accessed by the user.
SELECT Userid, COUNT(Bookid) AS NumberOfBooksAccessed
FROM User
GROUP BY Userid;

-- c) List the publisher name of books published by Silberschatz.
SELECT DISTINCT p.Publisher_Name
FROM Book b
JOIN PublisherDet p ON b.Bookid = p.Bookid
WHERE b.Author = 'Silberschatz';

-- d) Create a view to list the bookids in the range Rs.500 and Rs.1000.
CREATE VIEW ExpensiveBooks AS
SELECT Bookid
FROM PublisherDet
WHERE Price BETWEEN 500 AND 1000;

-- e) Write a PL/SQL procedure to print the details of the book with Bookid 10.
DELIMITER //
CREATE PROCEDURE GetBookDetails(IN Book_ID INT)
BEGIN
    SELECT b.*, p.Publisher_Name, p.Year, p.Price
    FROM Book b
    JOIN PublisherDet p ON b.Bookid = p.Bookid
    WHERE b.Bookid = Book_ID;
END;
//
DELIMITER ;

-- f) Write a function to return the username when the id of the user is given.
DELIMITER //
CREATE FUNCTION GetUserNameById(User_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE UserName VARCHAR(50);
    SELECT Name INTO UserName FROM User WHERE Userid = User_ID;
    RETURN UserName;
END;
//
DELIMITER ;

===========================================

-- Create Customer table
CREATE TABLE Customer (
    Custid INT PRIMARY KEY,
    Custname VARCHAR(50),
    Addr VARCHAR(100),
    City VARCHAR(50),
    Phno VARCHAR(15),
    Panno VARCHAR(15)
);

-- Create Loan table
CREATE TABLE Loan (
    Loanid INT PRIMARY KEY,
    Amount DECIMAL(10, 2),
    Interest DECIMAL(5, 2),
    Custid INT,
    FOREIGN KEY (Custid) REFERENCES Customer(Custid)
);

-- Create Account table
CREATE TABLE Account (
    Acctno INT PRIMARY KEY,
    Accbal DECIMAL(10, 2),
    Custid INT,
    FOREIGN KEY (Custid) REFERENCES Customer(Custid)
);

-- a) Display the Account balance of a particular customer "ARUN".
SELECT Accbal FROM Account WHERE Custid = (SELECT Custid FROM Customer WHERE Custname = 'ARUN');

-- b) Display the Loanid of Customer with id 1000.
SELECT Loanid FROM Loan WHERE Custid = 1000;

-- c) Create a View with Acctno and balance of all Customers.
CREATE VIEW CustomerAccountBalances AS
SELECT Acctno, Accbal FROM Account;

-- d) Display the balance along with the number of customers having that balance.
SELECT Accbal, COUNT(*) AS CustomerCount
FROM Account
GROUP BY Accbal;

-- e) Write a PL/SQL procedure to display the Name of the Customers from Chennai.
DELIMITER //
CREATE PROCEDURE GetCustomersFromChennai()
BEGIN
    SELECT Custname FROM Customer WHERE City = 'Chennai';
END;
//
DELIMITER ;

-- f) Write a function to return the amount when Loanid is given.
DELIMITER //
CREATE FUNCTION GetLoanAmountByLoanID(Loan_ID INT)
RETURNS DECIMAL(10, 2)
BEGIN
    DECLARE LoanAmount DECIMAL(10, 2);
    SELECT Amount INTO LoanAmount FROM Loan WHERE Loanid = Loan_ID;
    RETURN LoanAmount;
END;
//
DELIMITER ;


=========================================================

-- Create Customer table
CREATE TABLE Customer (
    Custid INT PRIMARY KEY,
    Custname VARCHAR(50),
    Phno VARCHAR(15),
    Pan VARCHAR(15),
    DOB DATE
);

-- Create HomeLoan table
CREATE TABLE HomeLoan (
    Hloanid INT PRIMARY KEY,
    Amount DECIMAL(10, 2),
    Custid INT,
    FOREIGN KEY (Custid) REFERENCES Customer(Custid)
);

-- Create VehicleLoan table
CREATE TABLE VehicleLoan (
    Vloanid INT PRIMARY KEY,
    Amount DECIMAL(10, 2),
    Custid INT,
    FOREIGN KEY (Custid) REFERENCES Customer(Custid)
);

-- a) List the total number of customers.
SELECT COUNT(*) AS TotalCustomers FROM Customer;

-- b) Create a view to list the Custid of the customers who do not have a housing loan.
CREATE VIEW CustomersWithoutHomeLoan AS
SELECT c.Custid
FROM Customer c
LEFT JOIN HomeLoan hl ON c.Custid = hl.Custid
WHERE hl.Custid IS NULL;

-- c) Display the HomeLoanid and amount of "Reena".
SELECT hl.Hloanid, hl.Amount
FROM HomeLoan hl
JOIN Customer c ON hl.Custid = c.Custid
WHERE c.Custname = 'Reena';

-- d) Display the housing loan amount and the number of customers who availed that loan amount.
SELECT Amount, COUNT(*) AS CustomerCount
FROM HomeLoan
GROUP BY Amount;

-- e) Write a PL/SQL function to display the Name of the Customer if Customerid is given.
DELIMITER //
CREATE FUNCTION GetCustomerNameById(Customer_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE CustomerName VARCHAR(50);
    SELECT Custname INTO CustomerName FROM Customer WHERE Custid = Customer_ID;
    RETURN CustomerName;
END;
//
DELIMITER ;

-- f) Write a PL/SQL procedure to display the vehicle loan details of vehicle loan with an amount greater than 75,000.
DELIMITER //
CREATE PROCEDURE GetVehicleLoanDetails()
BEGIN
    SELECT * FROM VehicleLoan WHERE Amount > 75000;
END;
//
DELIMITER ;

==============================================================

-- Create FacultyDetails table
CREATE TABLE FacultyDetails (
    FacultyID INT PRIMARY KEY,
    FacultyName VARCHAR(50),
    Dept VARCHAR(50)
);

-- Create SubjectDetails table
CREATE TABLE SubjectDetails (
    Subcode VARCHAR(10) PRIMARY KEY,
    Subtitle VARCHAR(50),
    Dept VARCHAR(50),
    Year INT
);

-- Create SubjectAllocated table
CREATE TABLE SubjectAllocated (
    Subcode VARCHAR(10),
    Year INT,
    Dept VARCHAR(50),
    FacultyID INT,
    FOREIGN KEY (Subcode) REFERENCES SubjectDetails(Subcode),
    FOREIGN KEY (Year) REFERENCES SubjectDetails(Year),
    FOREIGN KEY (Dept) REFERENCES SubjectDetails(Dept),
    FOREIGN KEY (FacultyID) REFERENCES FacultyDetails(FacultyID)
);

-- a) Display the details of IT faculty.
SELECT * FROM FacultyDetails WHERE Dept = 'IT';

-- b) Display the name of the faculty who handles MG6088.
SELECT FacultyName
FROM FacultyDetails f
JOIN SubjectAllocated sa ON f.FacultyID = sa.FacultyID
JOIN SubjectDetails sd ON sa.Subcode = sd.Subcode
WHERE sd.Subcode = 'MG6088';

-- c) Display the department and the number of subjects studied by the students.
SELECT Dept, COUNT(*) AS NumberOfSubjects
FROM SubjectDetails
GROUP BY Dept;

-- d) Create a view to display the subject code of the Communication subject.
CREATE VIEW CommunicationSubject AS
SELECT Subcode
FROM SubjectDetails
WHERE Subtitle = 'Communication';

-- e) Develop a PL/SQL procedure that displays subject details of the BT department.
DELIMITER //
CREATE PROCEDURE GetSubjectDetailsBT()
BEGIN
    SELECT * FROM SubjectDetails WHERE Dept = 'BT';
END;
//
DELIMITER ;

-- f) Write a PL/SQL function to display the Name of the faculty if FacultyID is given.
DELIMITER //
CREATE FUNCTION GetFacultyNameById(Faculty_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE FacultyName VARCHAR(50);
    SELECT FacultyName INTO FacultyName FROM FacultyDetails WHERE FacultyID = Faculty_ID;
    RETURN FacultyName;
END;
//
DELIMITER ;


=================================================

-- Create Driver table
CREATE TABLE Driver (
    driver_ID INT PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(100),
    city VARCHAR(50)
);

-- Create Owns table
CREATE TABLE Owns (
    driver_id INT,
    regno INT,
    model VARCHAR(50),
    year INT,
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_ID)
);

-- Create Accident table
CREATE TABLE Accident (
    driver_id INT,
    regno INT,
    report_number INT PRIMARY KEY,
    ace_date DATE,
    location VARCHAR(100),
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_ID)
);

-- a) Display the details of the driver whose name ends with 'n'.
SELECT * FROM Driver WHERE name LIKE '%n';

-- b) Display the model of the cars owned by Hema.
SELECT DISTINCT o.model
FROM Owns o
JOIN Driver d ON o.driver_id = d.driver_ID
WHERE d.name = 'Hema';

-- c) Display the year and the total number of people involved in accidents.
SELECT a.year, COUNT(*) AS TotalPeopleInvolved
FROM Accident a
GROUP BY a.year;

-- d) Write a PL/SQL procedure to display the details of the drivers from Kolkata.
DELIMITER //
CREATE PROCEDURE GetDriversFromKolkata()
BEGIN
    SELECT * FROM Driver WHERE city = 'Kolkata';
END;
//
DELIMITER ;

-- e) Create a view to display the accident details of report 1010.
CREATE VIEW AccidentDetails1010 AS
SELECT *
FROM Accident
WHERE report_number = 1010;

-- f) Write a PL/SQL function to display the id of the driver with registration number 5010.
DELIMITER //
CREATE FUNCTION GetDriverIdByRegNo(RegNo INT)
RETURNS INT
BEGIN
    DECLARE DriverId INT;
    SELECT driver_id INTO DriverId FROM Owns WHERE regno = RegNo;
    RETURN DriverId;
END;
//
DELIMITER ;


=================================================

-- Create StudDetails table
CREATE TABLE StudDetails (
    regno INT PRIMARY KEY,
    name VARCHAR(50),
    dept VARCHAR(50),
    percentage DECIMAL(5, 2)
);

-- Create Company table
CREATE TABLE Company (
    companyID INT PRIMARY KEY,
    name VARCHAR(50),
    noOfVacancy INT
);

-- Create Placed table
CREATE TABLE Placed (
    regno INT,
    companyID INT,
    Sal DECIMAL(10, 2),
    FOREIGN KEY (regno) REFERENCES StudDetails(regno),
    FOREIGN KEY (companyID) REFERENCES Company(companyID)
);

-- a) List the students who satisfy the eligibility criteria - Above 70%.
SELECT * FROM StudDetails WHERE percentage > 70.00;

-- b) Display the student who has been placed with the highest salary.
SELECT s.name, p.Sal
FROM StudDetails s
JOIN Placed p ON s.regno = p.regno
ORDER BY p.Sal DESC
LIMIT 1;

-- c) Create a view to list the details of companies with more than 50 vacancies.
CREATE VIEW CompaniesWith50PlusVacancies AS
SELECT * FROM Company WHERE noOfVacancy > 50;

-- d) List the companyid along with the average salary.
SELECT p.companyID, AVG(p.Sal) AS AverageSalary
FROM Placed p
GROUP BY p.companyID;

-- e) Write a procedure to display the placement details with salary in the range 50,000 & 60,000.
DELIMITER //
CREATE PROCEDURE GetPlacementDetailsInRange()
BEGIN
    SELECT s.name, p.companyID, p.Sal
    FROM StudDetails s
    JOIN Placed p ON s.regno = p.regno
    WHERE p.Sal BETWEEN 50000 AND 60000;
END;
//
DELIMITER ;

-- f) Write a PL/SQL function to display the name of the company with id 780.
DELIMITER //
CREATE FUNCTION GetCompanyNameById(Company_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE CompanyName VARCHAR(50);
    SELECT name INTO CompanyName FROM Company WHERE companyID = Company_ID;
    RETURN CompanyName;
END;
//
DELIMITER ;


============================================

-- Create Administration table
CREATE TABLE Administration (
    Month VARCHAR(10) PRIMARY KEY,
    employee_salary DECIMAL(10, 2),
    development_cost DECIMAL(10, 2),
    fund_amount DECIMAL(10, 2),
    turn_over DECIMAL(10, 2)
);

-- Create Employee table
CREATE TABLE Employee (
    emp_no INT PRIMARY KEY,
    emp_name VARCHAR(50),
    DOB DATE,
    address VARCHAR(100),
    doj DATE,
    mobile_no VARCHAR(15),
    salary DECIMAL(10, 2)
);

-- Create Dept table
CREATE TABLE Dept (
    emp_no INT,
    dept_no INT,
    FOREIGN KEY (emp_no) REFERENCES Employee(emp_no)
);

-- a) Display the salary amount and development cost of the employees.
SELECT e.salary, ad.development_cost
FROM Employee e
JOIN Administration ad ON e.emp_no = ad.employee_salary;

-- b) Display the name of the department in which "Donald" works.
SELECT d.dept_no
FROM Employee e
JOIN Dept d ON e.emp_no = d.emp_no
WHERE e.emp_name = 'Donald';

-- c) Display the department number and the number of employees working in that department.
SELECT d.dept_no, COUNT(*) AS NumberOfEmployees
FROM Dept d
GROUP BY d.dept_no;

-- d) Develop a PL/SQL function to display the fund amount spent during June.
DELIMITER //
CREATE FUNCTION GetFundAmountForJune()
RETURNS DECIMAL(10, 2)
BEGIN
    DECLARE FundAmount DECIMAL(10, 2);
    SELECT fund_amount INTO FundAmount FROM Administration WHERE Month = 'June';
    RETURN FundAmount;
END;
//
DELIMITER ;

-- e) Create a view to display the details of employees who receive a salary above 50,000.
CREATE VIEW HighSalaryEmployees AS
SELECT * FROM Employee WHERE salary > 50000;

-- f) Create a procedure to display the empname of the employee with empno 101.
DELIMITER //
CREATE PROCEDURE GetEmployeeNameByEmpNo()
BEGIN
    SELECT emp_name FROM Employee WHERE emp_no = 101;
END;
//
DELIMITER ;


==================================================

-- Create Bus table
CREATE TABLE Bus (
    ROUTENO INT PRIMARY KEY,
    SOURCE VARCHAR(50),
    DESTINATION VARCHAR(50)
);

-- Create Passenger table
CREATE TABLE Passenger (
    PID INT PRIMARY KEY,
    PNAME VARCHAR(50),
    YOB INT,
    GENDER VARCHAR(10)
);

-- Create BookTicket table
CREATE TABLE BookTicket (
    PID INT,
    ROUTENO INT,
    JOURNEY_DATE DATE,
    SEAT_NO INT,
    FOREIGN KEY (PID) REFERENCES Passenger(PID),
    FOREIGN KEY (ROUTENO) REFERENCES Bus(ROUTENO)
);

-- a) Display the source and destination of the route with ROUTENO 99.
SELECT SOURCE, DESTINATION FROM Bus WHERE ROUTENO = 99;

-- b) Display the PID of passengers who have booked the journey from Mumbai to Chennai.
SELECT PID
FROM Passenger p
JOIN BookTicket bt ON p.PID = bt.PID
JOIN Bus b ON bt.ROUTENO = b.ROUTENO
WHERE b.SOURCE = 'Mumbai' AND b.DESTINATION = 'Chennai';

-- c) Display the Gender and the person count in that Gender.
SELECT GENDER, COUNT(*) AS PersonCount
FROM Passenger
GROUP BY GENDER;

-- d) Create a View that displays the ROUTENO, source, and destination of journeys planned today (7.6.2022).
CREATE VIEW TodaysJourneys AS
SELECT b.ROUTENO, b.SOURCE, b.DESTINATION
FROM Bus b
JOIN BookTicket bt ON b.ROUTENO = bt.ROUTENO
WHERE bt.JOURNEY_DATE = '2022-06-07';

-- e) Develop a PL/SQL procedure to display details of passengers who were born in the year 1974.
DELIMITER //
CREATE PROCEDURE GetPassengersBornInYear1974()
BEGIN
    SELECT * FROM Passenger WHERE YOB = 1974;
END;
//
DELIMITER ;

-- f) Write a PL/SQL function to display the Source city of ROUTENO 6.
DELIMITER //
CREATE FUNCTION GetSourceCityByRouteNo(RouteNo INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE SourceCity VARCHAR(50);
    SELECT SOURCE INTO SourceCity FROM Bus WHERE ROUTENO = RouteNo;
    RETURN SourceCity;
END;
//
DELIMITER ;


======================================================

-- Create Sailor table
CREATE TABLE Sailor (
    sid INT PRIMARY KEY,
    sname VARCHAR(50),
    rating INT,
    age INT
);

-- Create Boats table
CREATE TABLE Boats (
    bid INT PRIMARY KEY,
    bname VARCHAR(50),
    colour VARCHAR(50)
);

-- Create Reserves table
CREATE TABLE Reserves (
    sid INT,
    bid INT,
    day DATE,
    FOREIGN KEY (sid) REFERENCES Sailor(sid),
    FOREIGN KEY (bid) REFERENCES Boats(bid)
);

-- a) List the sailors in the descending order of their rating.
SELECT * FROM Sailor ORDER BY rating DESC;

-- b) Create a view to list the sailors with a rating greater than 3.
CREATE VIEW HighRatedSailors AS
SELECT * FROM Sailor WHERE rating > 3;

-- c) Write a procedure to list the details of "Blue" colour boats.
DELIMITER //
CREATE PROCEDURE GetBlueBoats()
BEGIN
    SELECT * FROM Boats WHERE colour = 'Blue';
END;
//
DELIMITER ;

-- d) List the colour of the boats along with the number of boats with that colour.
SELECT colour, COUNT(*) AS NumberOfBoats
FROM Boats
GROUP BY colour;

-- e) Create a PL/SQL Function that accepts SID and returns the name of the sailor.
DELIMITER //
CREATE FUNCTION GetSailorNameById(Sailor_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE SailorName VARCHAR(50);
    SELECT sname INTO SailorName FROM Sailor WHERE sid = Sailor_ID;
    RETURN SailorName;
END;
//
DELIMITER ;

-- f) List the dates in which the green colour boat is reserved.
SELECT day FROM Reserves
WHERE bid IN (SELECT bid FROM Boats WHERE colour = 'Green');



=============================================





// const express = require("express");
// const app = express();

// //install express in every folder for running app.methods()
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient; // connecting to the client
// // const ObjectID = mongodb.ObjectID;
// // const id = new ObjectID();  create new object id which we can assign to the documents
// // console.log(id);

// const ConnectionUrl = "mongodb://localhost:27017"; // setting up the connection 
// const databaseName = "task-manager";

// MongoClient.connect(ConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//     if(error)
//     return console.log("Error: error");
    
//     const db = client.db(databaseName);
//     // database is a collection of collections which consists of documents

//     // db.collection('users').insertOne(
//     //     {
//     //         _id: id,
//     //         name: "harsh",
//     //         age: 17
//     //     }, (error, result) => {
//     //         if(error)
//     //         return console.log("error");
//     //         console.log(result.ops);
//     //     }
//     // )

//     // deleting the doc with age 18 using delete
//     // db.collection('users').deleteOne({age: 18})

//     //deleting the docs with age 18 using deleteMany
//     // db.collection('users').deleteMany({age: 18});

//     // db.collection('users').insertMany([
//     //     {
//     //         name: "harsh",
//     //         age: 18
//     //     },
//     //     {
//     //         name: "vansh",
//     //         age: 16
//     //     }
//     // ], (error, result) => {
//     //     if(error)
//     //     return console.log(error);
//     //     console.log(result.ops)
//     // })


//     // if we provide invalid data to search for in the database then it will log null
//     // db.collection('users').findOne({name: "harshit"}, (error, result) => {
//     //     if(error)
//     //     return console.log("error");
//     //     console.log(result);
//     // });

//     // find multiple documents cursor has the option for multiple fields
//     // db.collection('users').find({name: "harsh"}).toArray((error, user) => {
//     //     if(error)
//     //     return console.log(error);
//     //     console.log(user);
//     // })

//     // db.collection('users').find({name: "vansh"}).count( (error, count) => {
//     //     if(error)
//     //     return console.log(error);
//     //     console.log(count);
//     // })

//     db.collection('users').updateOne({name: "harsh"}, {$set: {name: "dk"}})

// }) 


// app.listen(27017, () => {
//     console.log("Server started successfully");
// })
