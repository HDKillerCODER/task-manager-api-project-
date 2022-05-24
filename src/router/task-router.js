const express = require('express');
const auth = require('../middleware/auth'); // the auth middleware for authentication
const Task = require('../models/task');
const app = new express.Router();

app.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try{
        await task.save();
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }

    // t.save().then((task) => {
    //     res.send(t);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
    //res.send('task web page working');
})

// second route for the fetching all the tasks from the database
app.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed)
    {
        if(req.query.completed === 'true')
        match.completed = true;
        else
        match.completed = false;
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match: match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e);
    }
    // task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })
})

// third route for fetching a particular task from the database with the logged in user
app.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try{
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
        if(!task)
        return res.status(404).send('No user find in the database');
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }

    // task.findById(_id).then((t) => {
    //     if(!t)
    //     return res.status(400).send('No task found')
    //     res.send(t);
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// fourth route for updating a particular task 

// in the mongoose finding and update method first one is id to grab it, second one is to update a paricular block and last one is for the options
app.patch('/tasks/:id', auth, async (req, res) => {
    //const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    
    if(!isValid)
    return res.status(400).send({error: 'Invalid update'});
    try{
        
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        //console.log(task);
        if(!task)
        return res.status(404).send('Task not found');
        
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        //const t = await task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!task)
        return res.status(404).send('Task not found');
        
        res.send(task);
    } catch(e) {
        res.send(e);
    }
})

// fifth route for deleting a particular task
app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task)
        return res.status(404).send('Task not found');

        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
})

module.exports = app;