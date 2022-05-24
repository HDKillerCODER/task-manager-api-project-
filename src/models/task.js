const mongoose = require('mongoose');   // for setting up the mongoose model


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    }, completed: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Task = mongoose.model('task', taskSchema)

module.exports = Task;
