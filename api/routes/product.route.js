const router = require('express').Router()
const Product = require('../models/product.schema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

//get all products
router.get('/products', async (req, res)=>{
    const products = await Product.find();
    res.status(200).json(products)
})

//add a new product
router.post('/products', async (req, res)=>{
    const data = req.body;
    const product = await new Product(data).save()
    res.json(product);
})

//get one product
router.get('/products/:id', async(req, res) => {
    const id = req.params.id
    const product = await Product.findOne({_id: new ObjectId(id)})
    res.status(200).json(product)
})

//update a product
router.put('/products/:id', async(req, res) => {
    const products = {}
    const id = req.params.id
    
    products.name = req.body.name;
    products.brand = req.body.brand;
    products.price = req.body.price;
    products.quantity = req.body.quantity;

    const product = await Product.findOneAndUpdate({_id: new ObjectId(id)}, {$set: products}, {new:true})
    res.json(product)
})

router.delete('/products/:id', async (req, res) => {
    const id = req.params.id
    const product = await Product.deleteOne({_id: new ObjectId(id)})
    res.status(200).json(product)
})

module.exports = router;