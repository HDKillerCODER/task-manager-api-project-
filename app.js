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