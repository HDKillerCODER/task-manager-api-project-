Bank Application:

 

 

1.Account Details :This Module will consist of all the details which the user had entered during the time of registration.

It will include fields such as Name, Mobile Number, Email ID,Aadhar Card Number, Date of Birth,password. It will also contain The Residential Address and Permanent address and other fields if required. Including Occupational Details entered by the user. This is particularly useful in case the user wants to change or update any of his credentials.

 

 

Account Summary page: This page will contain all the financial details of the user in a summarised form. The page will display the account number, balance and recent transactions

 

AccountStatement page: The Account Statement Page will consist of a table that contains the columns like Account Number,Name,Account Type and Balance. To view the account statement during a specified time the user needs to select two dates and click on the submit button. The output will display a table with all the required information.

 

Change Password Page: If the user wishes to change his password due to security reasons, he/she can click on the change password button. Upon clicking this button(Option), the user will have to enter his new Login and Transaction password.

 

 

Fund Transfer

The following module has two buttons which redirects the user to respective page.

 

Add Payee page

Payee page includes adding a new payee or beneficiary. The user must enter the beneficiary name, beneficiary’s account number and confirm the same. In order to save the beneficiary’s details the user must click on save beneficiary. The field for nickname is optional.

Fund Transfer page

There are three modes for transferring the amount to the beneficiary’s account. They are –

1.Through NEFT

2. Through RTGS

3. Through IMPS

 

1.Through NEFT:  In order to initiate the payment through NEFT the user needs to fill their account number, the account number to which they want to transfer the amount and the amount they want to transfer. They can also add a new payee which will redirect them to add payee’s page.

 

2.Through RTGS:   In order to initiate the payment through RTGS the user needs to fill their account number, the account number to which they want to transfer the amount and the amount they want to transfer. They can also add a new payee which will redirect them to add payee’s page.

 

Through IMPS: In order to initiate the payment through IMPS the user needs to fill their account number, the account number to which they want to transfer the amount and the amount they want to transfer. They can also add a new payee which will redirect them to add payee’s page.
Print Transactions module should print all the transactions based account number
Deposit and withdraw are basic operations

 

 

Core Java Expected Sample using collections

 

Account Class Sample Properties

Transaction Class Sample Properties

 

 

Note : Add necessary classes and functionalities and improvise  based on understanding and time availability.

 




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
