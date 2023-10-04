-- Create Voter table
CREATE TABLE Voter (
    Voterld INT PRIMARY KEY,
    Votername VARCHAR(50),
    Address VARCHAR(100),
    Gender CHAR(1),
    Age INT
);

-- Create Booth table
CREATE TABLE Booth (
    Boothid INT PRIMARY KEY,
    BIncharge VARCHAR(50),
    Location VARCHAR(100)
);

-- Create VoterBooth table
CREATE TABLE VoterBooth (
    Voterld INT,
    Boothid INT,
    Checkvote INT,
    FOREIGN KEY (Voterld) REFERENCES Voter(Voterld),
    FOREIGN KEY (Boothid) REFERENCES Booth(Boothid)
);

-- a) Display the Voter details of Booth with id 2010.
SELECT v.*
FROM Voter v
JOIN VoterBooth vb ON v.Voterld = vb.Voterld
WHERE vb.Boothid = 2010;

-- b) List the Boothid and number of voters in each Booth.
SELECT vb.Boothid, COUNT(*) AS VoterCount
FROM VoterBooth vb
GROUP BY vb.Boothid;

-- c) Display the overall count of voters voted in the election.
SELECT COUNT(*) AS VotedCount
FROM VoterBooth
WHERE Checkvote = 1;

-- d) Display the Boothid in which "Geetha" has to vote.
SELECT vb.Boothid
FROM Voter v
JOIN VoterBooth vb ON v.Voterld = vb.Voterld
WHERE v.Votername = 'Geetha';

-- e) Write a function to return the Votername if Voterld is given.
DELIMITER //
CREATE FUNCTION GetVoterNameByVoterID(Voter_ID INT)
RETURNS VARCHAR(50)
BEGIN
    DECLARE VoterName VARCHAR(50);
    SELECT Votername INTO VoterName FROM Voter WHERE Voterld = Voter_ID;
    RETURN VoterName;
END;
//
DELIMITER ;

-- f) Create a procedure to print the booth details in location "north".
DELIMITER //
CREATE PROCEDURE PrintNorthBooths()
BEGIN
    SELECT * FROM Booth WHERE Location = 'north';
END;
//
DELIMITER ;



=================================
SELECT A.Title AS AlbumTitle, COUNT(T.TrackId) AS NoOfTracks
FROM Album A
LEFT JOIN Track T ON A.AlbumId = T.AlbumId
GROUP BY A.AlbumId, A.Title
ORDER BY NoOfTracks ASC;


SELECT A.Name AS ArtistName, AL.Title AS AlbumTitle
FROM Artist A
INNER JOIN Album AL ON A.ArtistId = AL.ArtistId
WHERE A.Name LIKE '%m'
ORDER BY A.Name;




-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Create the tables
CREATE TABLE Artist (
    ArtistId INT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Genre (
    GenreId INT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Album (
    AlbumId INT PRIMARY KEY,
    Title VARCHAR(255),
    ArtistId INT,
    FOREIGN KEY (ArtistId) REFERENCES Artist(ArtistId)
);

CREATE TABLE Track (
    TrackId INT PRIMARY KEY,
    AlbumId INT,
    GenreId INT,
    Composer VARCHAR(255),
    FOREIGN KEY (AlbumId) REFERENCES Album(AlbumId),
    FOREIGN KEY (GenreId) REFERENCES Genre(GenreId)
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;




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
