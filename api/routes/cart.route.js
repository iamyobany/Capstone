const router = require('express').Router()
const User = require('../models/user.schema')
const Product = require('../models/product.schema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

router.post('/carts/:userid/:productid', async (req, res) => {
    const userid = req.params.userid
    const productid = req.params.productid
    const user = await User.findOneAndUpdate({_id: new ObjectId(userid)}, {$push: {"cart": {_id:productid, count: 1}}}, {new:true})

    res.status(200).json(user.cart)
})

router.post('/carts/:userid/:productid', async (req, res) => {
    const userid = req.params.userid
    const productid = req.params.productid
    const user = await User.findOneAndUpdate({_id: new ObjectId(userid)}, {$pull: {"cart": {_id:productid, count: 1}}}, {new:true})

    res.status(200).json(user.cart)
})

module.exports = router;