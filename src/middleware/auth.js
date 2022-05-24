const jwt = require('jsonwebtoken'); // this is required here to verify the required token
const User = require('../models/user'); // taking the user model to verify the token first and then we will take the user id from it and we will search it in the user model

// in the express middleware next is used to signify that the middleware work is done
const auth = async (req, res, next) => {
    try{
        console.log('auth running')
        const token = req.header('Authorization').replace('Bearer ', ''); // grabbing the token of the user profile from the headers section and then under Authorization key
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifying the token with the secret code
        const id = decoded._id;
        const user = await User.findOne({ _id: id , 'tokens.token': token })// this will find user from database and will check the tokens array that whether that token is created or not
        
        if( !user)
        throw new Error()

        req.token = token
        req.user = user
        next();
        
    } catch (e) {
        res.status(401).send('Please Authenticate again!');
    }
}
module.exports = auth

// const auth = async(req, res, next) => {
//     try {
//             const token = req.header('Authorization').replace('Bearer ', '');
//             // Once we get that token, then we need to verify the token with the secret code
//             const decode = jwt.verify(token, 'thisismynewcourse');
//             const id = decode._id;
//             const user = await User.findOne({ _id : id });
            
//             // if the user is not there 
//             if(!user)
//             return res.send('User not present, please authenticate again');

//             req.user = user// this is written as we will use this in the login router where we need to send the user which is requested over here

//             next();
//     } catch (e) {
//         return res.status(500).send('Please Authenticate again');
//     }
// }
// const newMiddleware = async (req, res, next) => {
//     console.log('New request is by ' + req.method + ' and the post method is ' + req.path);
//     next();
// }

