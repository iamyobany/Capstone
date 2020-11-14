const router = require('express').Router()
const User = require('../models/user.schema')

router.post('/login', async (req, res) => {
    const data = req.body
    const user = await User.findOne({email: data.email, password:data.password})
    if(!user){
        res.status(401).json({error: 'Database Error: No User Found'})
    }
    res.status(200).json(user)
})

module.exports = router;