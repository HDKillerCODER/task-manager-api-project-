const express = require('express');
const app = express();
require('./db/mongoose.js'); //requiring the mongoose database setups

const routerUser = require('./router/user-router.js'); // requiring the user-routers
const routerTask = require('./router/task-router'); // requiring the task-routers

const Task = require('./models/task.js');  // requiring the task model

const User = require('./models/user.js');  // requiring the user model
 
const port = process.env.PORT ;



// this was for practice only
// Express middleware  :: this middleware will run for every route and we do not want it
// app.use((req, res, next) => {
//     if(req.method == 'GET')
//     res.status(503).send('GET methods unavailable')
//     else
//     next();
// })

// app.use((req, res, next) => {
//     const method = req.method
//     if(method === 'GET' || method === 'POST' || method === 'PATCH' || method === 'DELETE')
//     res.status(503).send('Maintainance work')
//     else
//     next()
// })

// the code below for multer for understanding it with the help of app.post uploads route
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/uploads', upload.single('upload'), (req, res) => {
//     res.send()
// })

app.use(express.json()); // this line is for parsing the json data otherwise it will print undefined data
app.use(routerUser); // making it to use all the users router
app.use(routerTask); // making it to use all the tasks router

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})



// const main = async () => {
//     const user = await User.findById('62891cd85f22dd14258c9ad7');
//     await user.populate('tasks').execPopulate()
//     console.log(user)
// }
// main()

// this below code is for practice
// bcrypt is a method to store the password using hashing

// const bcrypt = require('bcrypt');

// const myfunction = async () => {
//     const password = 'harsh12345';
//     // bcrypt.hash returns a promise and accepts two arguments first is password and second is the number of times we want to apply that algorithm
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     // we can compare password to hashedPassword 
//     const isMatch = await bcrypt.compare('harsH12345', hashedPassword);
//     console.log(isMatch);
// }

// myfunction();

//const jwt = require('jsonwebtoken');

// const myfunction = async () => {
//     // jwt.sign() accepts two arguments one is the unique identifier and the other one is anytype of secret code
//     // it also accepts third argument as an option of expiring the authentication
//     // third argu. is how much time we need or token to be valid
//     //const token = await jwt.sign({ _id: "abc123"}, 'thisismyclass');
//     // if anyone having the middle part of token then they need to access the secret code also
//     const token = await jwt.sign({_id: "thisismyclass"}, 'thisismyclass', { expiresIn: '2sec'});

//     console.log(token);

//     // if the verification is failed it will throw an error otherwise it will return id
//     const data = jwt.verify(token, 'thisismyclass');
//     console.log(data);

// }
// myfunction();
// sudo lsof -iTCP -sTCP:LISTEN -n -P
// sudo kill <mongo_command_pid>
// mongod