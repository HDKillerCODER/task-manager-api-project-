require('../src/db/mongoose');

const User = require('../src/models/user');

// User.findByIdAndUpdate('5f632e7c157177238e5f50c1', { age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

// this is using async and await 
const findbyidandupdate = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age})
    const count = await User.countDocuments({age: 18});
    return count;
}

findbyidandupdate('5f632e7c157177238e5f50c1', 2).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})
//sudo lsof -iTCP -sTCP:LISTEN -n -P