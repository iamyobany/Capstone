const router = require('express').Router()
const User = require('../models/user.schema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

//get all users
router.get('/users', async (req, res)=>{
    const users = await User.find();
    res.status(200).json(users)
})

//add a new user
router.post('/users', async (req, res)=>{
    const data = req.body;
    data.cart = []
    data.wishlist = []

    const user = await new User(data).save()
    res.json(user);
})

//get one user
router.get('/users/:"id', async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: new ObjectId(id)})
    res.status(200).json(user)
})

//update a user
router.put('/users/:id', async(req, res) => {
    const users = {}
    const id = req.params.id
    var fields = Object.keys(User.schema.paths);

    for (const field of fields) {
        if (req.body[field]){
            users[field] = req.body[field]
        }
    }

    const user = await User.findOneAndUpdate({_id: new ObjectId(id)}, {$set: user}, {new:true})
    res.json(user)
})

router.delete('/users', async (req, res) => {
    const id = req.params.id
    const user = await User.deleteOne({_id: new ObjectId(id)})
    res.status(200).json(user)
})

module.exports = router;