const mongoose = require('mongoose'); // for setting up the mongoose model
const validator = require('validator');
const brcypt = require('bcrypt');
//const { response } = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/task')
// setting up the user model and it accepts two arguments (name of database, type)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, age: {
        required: true,
        type: Number,
        validate(value) {
            if(value < 18)
            throw new Error('age too short for sign in');
        }
    }, email: {
        required: true,
        unique: true, // so that only unique emails are registered no duplicates
        type: String,
        validate(value) {
            if(!validator.isEmail(value))
            throw new Error('Email is invalid');
        }
    }, password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if(value.includes('password'))
            throw new Error('Password must not contain "password"');
        }
    }, tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true // contains both created at and updated at
})

userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

// this method was to send the private data deleting password and all the tokens 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // so that original user remains same and changes are made to userObject

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// // methods is used on instances(here particular user not all user collections) and we cannot use arrow functions that is for the single document in the collection
userSchema.methods.generateAuthTokens = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET); // generating a token
    // user._id is object id, so we have to convert it into a string
    user.tokens = user.tokens.concat({token: token}); // adding token to the user document
    await user.save() // saving the user to the database
    return token;

}
//function for checking the credential for logging in the user :: statics use on model:: other way, it is used for the whole collection
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email: email});
    if(!user)
    throw new Error('unable to login')

    const isMatch = await brcypt.compare(password, user.password);
    if(!isMatch)
    throw new Error('unable to login')


    //console.log(user);

    return user;
}

// newUser.statics.findCredentials = async (email, password) => {
//     const user = User.findOne({email: email});
//     // If the user is not found
//     if(!user)
//     return response.status(400).send('There is no user in the database');

//     // The user exists now we have to check for the password
//     const isMatch = await brcypt.compare(password, user.password);

//     if(!isMatch)
//     return response.status(400).send('Unable to login');

//     // Here the details are verified and the user you were searching is found

//     return user;
// }

// this is a middleware where we hashed the password 
userSchema.pre('save', async function(next) {

    const user = this;

    console.log('Just before saving');

    // we need to hash the password which is plain text and we have to check the password should not be hashed
    if(user.isModified('password'))
    {
        user.password = await brcypt.hash(user.password, 8);
    }

    next(); // if we don't call this the function will be hanging over here only
    //sconsole.log('after next');
} )

// this is another mongoose middleware which will run before the user is deleted so that its created tasks are also deleted;
userSchema.pre('remove', async function(req, res, next) {
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})

// in the background it converts the second argument to schema but now we have done it above
const User = mongoose.model('User', userSchema);

module.exports = User