const mongoose = require('mongoose');
require('dotenv').config();


function connectDB() {
    // Database connection
   mongoose.connect(process.env.MONGO_CONNECT_URL, {});

    const connection = mongoose.connection;

    connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;