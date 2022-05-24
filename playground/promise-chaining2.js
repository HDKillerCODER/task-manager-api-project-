require('../src/db/mongoose');
const Task = require('../src/models/task');

// this promise chaining connects multiple promises then and catch functions

// Task.findByIdAndDelete('5f6453376ca52506b74d2871').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const findbyidanddelete = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    console.log(task);
    const count = await Task.countDocuments({completed});
    return count;
}

findbyidanddelete('5f64700005bdbc084ccf0550', true).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})