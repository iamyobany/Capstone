require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async() => {
  try {
    const option = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    const dbConn = await mongoose.connect(process.env.URI, option);
    console.log(`DB Connection Successful: ${dbConn.connection.host}`);
  } catch (err) {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};