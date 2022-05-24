// const express = require('express');
// const User = require('../models/user');
// const app = express.Router();
// const bcrypt = require('bcrypt'); // this is for the password hashing
// const auth = require('../middleware/auth.js'); // requiring the auth.js file for running express middleware to display the users only when our function is executed

// // this route is for creating a new user
// app.post('/users', async (req, res) => {
//     const user = new User(req.body);
    
//     try{
//         //await user.save();
//         const token = await user.generateAuthTokens();
//         res.status(201).send({user, token});
//     } catch(e) {
//         res.status(500).send(e);
//     }

//     // user.save().then((user) => {
//     //     res.send(user);
//     // }).catch((error) => {
//     //     res.status(400).send(error)
//     // })
// })

// // logging in user
// app.post('/users/login', async (req, res) => {
//     // this is one way of doing this
//     // const email = req.body.email
//     // const user = await User.findOne({email: email});
//     // if(!user)
//     // return res.status(400).send('Invalid email');

//     // const password = req.body.password;
//     // // console.log(password);
//     // // console.log(user.password);
//     // const isMatch = await bcrypt.compare(password, user.password);

//     // if(!isMatch)
//     // return res.status(400).send('Wrong Password');

//     // res.send(user);

//     //2. way is to create function here and define it in the user model
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//     const user = await User.findCredentials(email, password);// function made in user.js
//     const token = await user.generateAuthTokens(); // made a method in user.js file
//     //console.log(user);
//     res.send(user);
//     } catch(e) {
//         res.status(500).send(e);
//     }
// })

// // second route for the user to fetch all the users from the database
// app.get('/users/me', auth, async (req, res) => {

//     res.status(200).send(req.user);
//     // try{
//     //     res.send(req.user);
//     // } catch(e) {
//     //     res.status(500).send(e);
//     // }

//     // User.find({}).then((users) => {
//     //     res.send(users);
//     // }).catch((error) => {
//     //     res.status(400).send(error);
//     // })
// })

// // third route for the user to fetch a particular user from the database
// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try{
//         const user = await User.findById(_id)
//         if(!user)
//         return res.status(404).send('No user found in the database');
//         res.send(user);
//     } catch(e) {
//         res.status(500).send(e);
//     }

//     // User.findById(_id).then((user) => {
//     //     if(!user)
//     //     return res.status(400).send('No user found in the database');
//     //     res.send(user);
//     // }).catch((error) => {
//     //     res.status(500).send('Error invalid id');
//     // })
// })

// // fourth route for updating a particular user

// // new: true is used so that the we can get the latest updated user from the database
// // runValidators is used so that we can can run all our validations
// app.patch('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     const updates = Object.keys(req.body); // getting the first thing of object
//     const allowedUpdates = ['name', 'email', 'age', 'password'];

//     const isValid = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     })

//     if(!isValid)
//     return res.status(400).send({'Operation' : "Not allowed"});
    
    
//     try{

//         const user = await User.findById(_id);
//         // now we have the user and we can update it
//         //user.name = "something"; // but this is hard-coded we want it to be dynamic

//         updates.forEach((update) => {
//             user[update] = req.body[update]; user[name] = 'jess'
//         })

//         // now calling the middleware so that we can run that function
//         user.save();

//         //const user = await User.findByIdAndUpdate(_id, (req.body), { new: true, runValidators: true});
//         if(!user)
//         return res.status(404).send('User not found');

//         res.send(user);
//     } catch(e) {
//         res.status(500).send(e);
//     }
// })

// // fifth route for deleting a particular user with its id
// app.delete('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try{
//         const user = await User.findByIdAndDelete(_id)
//         if(!user)
//         return res.status(404).send('User not found');

//         res.send(user);
//     } catch(e) {
//         res.status(500).send(e);
//     }
// })

// module.exports = app;

const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const multer = require('multer');
const sharp = require('sharp')
const { checkCollectionName } = require('mongodb/lib/utils');

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthTokens()// this is created for every newly created user and user and token is sent back 
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        //console.log(req.body.email, req.body.password)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthTokens()
        //console.log(user)
        res.send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})
// tokn 2

// this router is to logout the user with the last token used
router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((tokens) => {   // tokens have id and token
            console.log(tokens) // all the earlier tokens
            console.log(req.token) // the latest token made
            if(tokens.token != req.token)
            return true // if the req.token does not match with token stored already it means that token was not used for authentication and will be staying in the original array
            return false // it means we found the token // here the token is deleted
        })
        await req.user.save() // we have to save the user after token is deleted
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// this router is to logout the user with all tokens
router.post('/users/logoutAll', auth, async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// router.get('/users', auth, async (req, res) => { // the middle argument auth will trigger the middleware and further code will run if next() is called otherwise not
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/users/me', auth, async (req, res) => { // the middle argument auth will trigger the middleware and further code will run if next() is called otherwise not
    res.send(req.user)
})

// this router is no more needed because the above route can perform that and this comment is made during 113 video 
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// the above router is updated to the below route so that the user is updated only when he is authenticated
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates! '})
    }

    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e)
    {
    res.status(400).send(e)
    }
})

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// the above router is updated to the below route because now if the user is authenticated then only we want to delete it
router.delete('/users/me', auth, async(req, res) => {
    try{
        await req.user.remove();
        res.send(req.user)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

// setting the upload middleware and destination is images folder
const upload = multer({
    //dest: 'images', // name of the folder to store images 
    limits: {
        fileSize: 1000000 // maximum file limit
    },
    fileFilter(req, file, cb) { // req is for getting data, file stores the file information and cb is the call back function

        // this if condition was for only pdf supported files
        // if(!file.originalname.endsWith('.pdf'))
        // {
        //     return cb('File format supported is only pdf')
        // }

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        return cb('File format for uploading files not supported')


        cb(undefined, true) // undefined means no error and true is that the file is uploaded
    }
})

//using the upload middleware 
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // the sharp takes file input buffer and converts into a buffer with toBuffer method and in between we resize the image and converts all supported image type to png
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    //console.log(buffer)
    req.user.avatar = buffer
    //console.log(req.user.avatar)
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({'error': error.message})
})

// this route is for serving up the avatar for the particular user by their id and finding the associated user
router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar)
        throw new Error()

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(400).send(e)
    }
})

// deleting the user profile picture
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router