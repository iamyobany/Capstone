// Use Express
var express = require('express');
var cors = require('cors');
require('./db/dbconnection')();

//routes
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route')
const cartRoutes = require('./routes/cart.route');
const wishlistRoutes = require('./routes/wishlist.route');
const authRoutes = require('./routes/auth.route');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', authRoutes);

// Local port.
const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server Running');
})