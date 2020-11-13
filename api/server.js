// Use Express
var express = require('express');
var cors = require('cors');
require('./db/dbconnection')();
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route')
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Local port.
const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server Running');
})