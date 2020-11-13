const mongoose = require('mongoose')
var userschema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String, select: false
    },
    type: {
        type: String
    },
    cart: {
        type: [Object]
    },
    wishlist: {
        type: [Object]
    }
});

module.exports = mongoose.model('users', userschema)