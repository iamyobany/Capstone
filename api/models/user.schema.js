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
    role: {
        type: String
    },
    cart: {
        type: [String]
    },
    wishlist: {
        type: [String]
    }
});

module.exports = mongoose.model('users', userschema)