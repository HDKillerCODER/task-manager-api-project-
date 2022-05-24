// install the mongoose library
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true, useFindAndModify: false});


// Creating the user of user model in user.js
// if we insert the values not according to their type then it will be error
// const me = new User({
//     name: "harsh kumar dhiman",
//     age: 19,
//     email: "    HARSH@.cm",
//     pass: "passwordise"
// })
// upto this command line 19 user is not saved watch next and it returns promise
